// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

// Security configuration
const SECURITY_CONFIG = {
  rateLimit: {
    maxRequests: 100, // requests per window
    windowMs: 15 * 60 * 1000, // 15 minutes
  },
  blockedUserAgents: [
    /bot/i,
    /crawler/i,
    /spider/i,
    /scraper/i,
    // Add more patterns as needed
  ],
  allowedOrigins: [
    'http://localhost:3000',
    'https://carleton-resume.vercel.app',
    'https://your-domain.com', // Replace with your actual domain
  ],
  secureHeaders: {
    'X-DNS-Prefetch-Control': 'on',
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
};

// In-memory store for rate limiting (use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Security utilities
class MiddlewareSecurity {
  static getClientIp(request: NextRequest): string {
    const xForwardedFor = request.headers.get('x-forwarded-for');
    const xRealIp = request.headers.get('x-real-ip');
    
    if (xForwardedFor) {
      return xForwardedFor.split(',')[0].trim();
    }
    if (xRealIp) {
      return xRealIp.trim();
    }
    
    return 'unknown';
  }

  static isRateLimited(ip: string): boolean {
    const now = Date.now();
    const windowMs = SECURITY_CONFIG.rateLimit.windowMs;
    const maxRequests = SECURITY_CONFIG.rateLimit.maxRequests;
    
    const clientData = rateLimitStore.get(ip);
    
    // Clean up expired entries periodically
    if (rateLimitStore.size > 1000) {
      this.cleanupExpiredEntries();
    }
    
    if (!clientData) {
      rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
      return false;
    }
    
    if (now > clientData.resetTime) {
      rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
      return false;
    }
    
    if (clientData.count >= maxRequests) {
      return true;
    }
    
    clientData.count++;
    return false;
  }

  static cleanupExpiredEntries(): void {
    const now = Date.now();
    for (const [ip, data] of rateLimitStore.entries()) {
      if (now > data.resetTime) {
        rateLimitStore.delete(ip);
      }
    }
  }

  static isBlockedUserAgent(userAgent: string | null): boolean {
    if (!userAgent) return true; // Block requests without user agent
    
    return SECURITY_CONFIG.blockedUserAgents.some(pattern => 
      pattern.test(userAgent)
    );
  }

  static validateOrigin(request: NextRequest): boolean {
    // Allow direct navigation (no origin header)
    const origin = request.headers.get('origin');
    const referer = request.headers.get('referer');
    
    // For navigation requests, origin might be null
    if (!origin && !referer) {
      // Allow if it's a navigation request (GET method to pages)
      if (request.method === 'GET' && !request.nextUrl.pathname.startsWith('/api/')) {
        return true;
      }
      return false;
    }
    
    const requestOrigin = origin || (referer ? new URL(referer).origin : '');
    return SECURITY_CONFIG.allowedOrigins.includes(requestOrigin);
  }

  static isSuspiciousPath(pathname: string): boolean {
    const suspiciousPatterns = [
      /\.php$/,
      /\.asp$/,
      /\.jsp$/,
      /wp-admin/,
      /wp-login/,
      /admin/,
      /config/,
      /\.env/,
      /\.git/,
      /\.svn/,
      /backup/,
      /test/,
      /debug/,
    ];
    
    return suspiciousPatterns.some(pattern => pattern.test(pathname));
  }
}

// Main middleware function
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get('user-agent');
  const clientIp = MiddlewareSecurity.getClientIp(request);
  
  // Skip middleware for Next.js internal routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname === '/favicon.ico' ||
    pathname.startsWith('/__nextjs')
  ) {
    return NextResponse.next();
  }
  
  // Block suspicious paths
  if (MiddlewareSecurity.isSuspiciousPath(pathname)) {
    console.warn(`Blocked suspicious path: ${pathname} from IP: ${clientIp}`);
    return new NextResponse('Not Found', { status: 404 });
  }
  
  // Block malicious user agents for API routes
  if (pathname.startsWith('/api/') && MiddlewareSecurity.isBlockedUserAgent(userAgent)) {
    console.warn(`Blocked suspicious user agent: ${userAgent} from IP: ${clientIp}`);
    return new NextResponse('Forbidden', { status: 403 });
  }
  
  // Rate limiting
  if (MiddlewareSecurity.isRateLimited(clientIp)) {
    console.warn(`Rate limit exceeded for IP: ${clientIp} on path: ${pathname}`);
    return new NextResponse(
      JSON.stringify({ 
        error: 'Rate limit exceeded',
        retryAfter: SECURITY_CONFIG.rateLimit.windowMs / 1000
      }),
      { 
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(SECURITY_CONFIG.rateLimit.windowMs / 1000),
        }
      }
    );
  }
  
  // Origin validation for API routes
  if (pathname.startsWith('/api/') && request.method !== 'GET') {
    if (!MiddlewareSecurity.validateOrigin(request)) {
      console.warn(`Invalid origin for API request from IP: ${clientIp}`);
      return new NextResponse('Forbidden', { status: 403 });
    }
  }
  
  // Create response with security headers
  const response = NextResponse.next();
  
  // Add security headers
  Object.entries(SECURITY_CONFIG.secureHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  
  // Add CSP header with nonce for inline scripts (if needed)
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // You may want to restrict this further
    "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
    "font-src 'self' fonts.gstatic.com",
    "img-src 'self' data: https:",
    "connect-src 'self' hooks.zapier.com",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "base-uri 'self'",
  ].join('; ');
  
  response.headers.set('Content-Security-Policy', csp);
  
  // Log successful requests for monitoring
  if (process.env.NODE_ENV === 'production') {
    console.log(`Request: ${request.method} ${pathname} from ${clientIp}`);
  }
  
  return response;
}

// Configuration for which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    {
      source: '/((?!_next/static|_next/image|favicon.ico|public/).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};