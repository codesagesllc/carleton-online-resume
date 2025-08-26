// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Rate limiting storage (in production, use Redis or database)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

// Enhanced validation schema
const ContactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters')
    .regex(/^[a-zA-Z\s\-']+$/, 'Name contains invalid characters'),
  email: z
    .string()
    .email('Invalid email format')
    .max(255, 'Email cannot exceed 255 characters')
    .toLowerCase(),
  phone: z
    .string()
    .optional()
    .nullable()
    .refine(
      (val) => !val || /^[\+]?[1-9][\d]{0,15}$/.test(val.replace(/[\s\-\(\)]/g, '')),
      'Invalid phone number format'
    ),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message cannot exceed 5000 characters')
    .refine((val) => val.trim().length >= 10, 'Message cannot be only whitespace'),
});

// Security utilities
class SecurityUtils {
  static getClientIp(request: NextRequest): string {
    const forwarded = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const connecting = request.headers.get('cf-connecting-ip');
    
    if (forwarded) return forwarded.split(',')[0].trim();
    if (realIp) return realIp.trim();
    if (connecting) return connecting.trim();
    
    return 'unknown';
  }

  static isRateLimited(ip: string): boolean {
    const now = Date.now();
    const windowMs = 15 * 60 * 1000; // 15 minutes
    const maxRequests = 5; // Max 5 requests per window
    
    const clientData = rateLimitMap.get(ip);
    
    if (!clientData) {
      rateLimitMap.set(ip, { count: 1, lastReset: now });
      return false;
    }
    
    if (now - clientData.lastReset > windowMs) {
      clientData.count = 1;
      clientData.lastReset = now;
      return false;
    }
    
    if (clientData.count >= maxRequests) {
      return true;
    }
    
    clientData.count++;
    return false;
  }

  static sanitizeInput(input: string): string {
    return input.replace(/[<>]/g, '').trim();
  }
}

// Response utilities
class ApiResponse {
  static success(message: string, data?: any) {
    return NextResponse.json(
      { 
        success: true, 
        message,
        data,
        timestamp: new Date().toISOString()
      },
      { status: 200 }
    );
  }

  static error(message: string, status: number = 400, code?: string) {
    return NextResponse.json(
      { 
        success: false, 
        error: message,
        code,
        timestamp: new Date().toISOString()
      },
      { status }
    );
  }

  static rateLimited() {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Too many requests. Please try again later.',
        retryAfter: 15 * 60 * 1000
      },
      { 
        status: 429,
        headers: { 'Retry-After': '900' }
      }
    );
  }
}

// Zapier webhook utility
class WebhookService {
  private static readonly WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/18877515/26lzlrk/';
  private static readonly MAX_RETRIES = 3;
  private static readonly RETRY_DELAY = 1000;

  static async sendToZapier(data: any): Promise<boolean> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= this.MAX_RETRIES; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const response = await fetch(this.WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Carleton-Resume-App/1.0',
          },
          body: JSON.stringify({
            ...data,
            source: 'carleton-resume-contact-form',
            submittedAt: new Date().toISOString(),
            attempt: attempt,
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          console.log(`Zapier webhook sent successfully on attempt ${attempt}`);
          return true;
        } else {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
      } catch (error) {
        lastError = error as Error;
        console.warn(`Zapier webhook attempt ${attempt} failed:`, error);
        
        if (attempt < this.MAX_RETRIES) {
          await new Promise(resolve => setTimeout(resolve, this.RETRY_DELAY * attempt));
        }
      }
    }

    console.error('All Zapier webhook attempts failed:', lastError);
    return false;
  }
}

// Optional database saving
async function saveToDatabase(data: any): Promise<number | null> {
  // Only try to use database if environment variable is set
  if (!process.env.DATABASE_URL) {
    console.log('No DATABASE_URL found, skipping database save');
    return null;
  }

  try {
    // Dynamic import to avoid build errors if db modules aren't available
    const { db } = await import('@/lib/db');
    const { contacts } = await import('@/lib/db/schema');
    
    const result = await db.insert(contacts).values({
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
    }).returning({ id: contacts.id });

    return result[0].id;
  } catch (error) {
    console.error('Database save failed (non-blocking):', error);
    return null;
  }
}

// Main POST handler
export async function POST(request: NextRequest) {
  try {
    const clientIp = SecurityUtils.getClientIp(request);
    
    // Rate limiting
    if (SecurityUtils.isRateLimited(clientIp)) {
      console.warn(`Rate limit exceeded for IP: ${clientIp}`);
      return ApiResponse.rateLimited();
    }

    // Content-Type validation
    const contentType = request.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      return ApiResponse.error('Invalid content type', 400, 'INVALID_CONTENT_TYPE');
    }

    // Parse and validate request body
    let rawData: any;
    try {
      rawData = await request.json();
    } catch (error) {
      return ApiResponse.error('Invalid JSON payload', 400, 'INVALID_JSON');
    }

    // Validate against schema
    const validationResult = ContactFormSchema.safeParse(rawData);
    if (!validationResult.success) {
      return ApiResponse.error(
        `Validation failed: ${validationResult.error.errors.map(e => e.message).join(', ')}`,
        400,
        'VALIDATION_ERROR'
      );
    }

    const { name, email, phone, message } = validationResult.data;

    // Sanitize inputs
    const sanitizedData = {
      name: SecurityUtils.sanitizeInput(name),
      email: SecurityUtils.sanitizeInput(email),
      phone: phone ? SecurityUtils.sanitizeInput(phone) : null,
      message: SecurityUtils.sanitizeInput(message),
    };

    // Generate contact ID
    const contactId = Date.now();
    
    console.log(`Contact form submitted - ID: ${contactId}, IP: ${clientIp}`, {
      name: sanitizedData.name,
      email: sanitizedData.email,
      phone: sanitizedData.phone,
      messageLength: sanitizedData.message.length,
      timestamp: new Date().toISOString()
    });

    // Try to save to database (optional, non-blocking)
    saveToDatabase(sanitizedData).catch(error => {
      console.error('Database save failed (non-blocking):', error);
    });

    // Send to Zapier (non-blocking)
    const webhookData = {
      ...sanitizedData,
      contactId,
      submittedFrom: clientIp,
      userAgent: request.headers.get('user-agent'),
    };

    WebhookService.sendToZapier(webhookData).catch(error => {
      console.error('Zapier webhook failed (non-blocking):', error);
    });

    return ApiResponse.success('Thank you for your message! I\'ll get back to you within 24 hours.', {
      contactId,
    });

  } catch (error) {
    console.error('Unexpected error in contact API:', error);
    return ApiResponse.error(
      'An unexpected error occurred. Please try again later or email me directly at carletoncabarrus@gmail.com',
      500,
      'INTERNAL_ERROR'
    );
  }
}

// Handle unsupported HTTP methods
export async function GET() {
  return ApiResponse.error('Method not allowed', 405, 'METHOD_NOT_ALLOWED');
}

export async function PUT() {
  return ApiResponse.error('Method not allowed', 405, 'METHOD_NOT_ALLOWED');
}

export async function DELETE() {
  return ApiResponse.error('Method not allowed', 405, 'METHOD_NOT_ALLOWED');
}

export async function PATCH() {
  return ApiResponse.error('Method not allowed', 405, 'METHOD_NOT_ALLOWED');
}