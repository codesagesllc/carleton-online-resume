// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { contacts } from '@/lib/db/schema';

export async function POST(request: Request) {
  const data = await request.json();

  try {
    // Insert data into the database using Drizzle ORM
    await db.insert(contacts).values({
      name: data.name,
      email: data.email,
      phone:data.phone,
      message: data.message,
    }); 

    const response = await fetch('https://hooks.zapier.com/hooks/catch/18877515/26lzlrk/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return NextResponse.json({ message: 'Your message has been sent successfully!' });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return new NextResponse('An error occurred while submitting the form', { status: 500 });
  }
}