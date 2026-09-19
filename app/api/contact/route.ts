import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Remove global instantiation to prevent build-time crashes when env vars are missing

// Simple memory-based rate limiter (best effort for serverless)
const rateLimit = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 3;

export async function POST(request: Request) {
  try {
    // --- CSRF / ORIGIN VALIDATION ---
    const origin = request.headers.get('origin');
    const host = request.headers.get('host');
    
    // In production, strictly enforce that the request comes from the exact same domain
    if (process.env.NODE_ENV === 'production' && host) {
      const expectedOrigin = `https://${host}`;
      if (!origin || origin !== expectedOrigin) {
        console.warn(`Blocked CSRF attempt from origin: ${origin}. Expected: ${expectedOrigin}`);
        return NextResponse.json({ error: 'Unauthorized origin' }, { status: 403 });
      }
    }
    // --------------------------------
    // --- RATE LIMITING ---
    // Cybersecurity Fix: 'x-forwarded-for' can be spoofed by malicious clients. 
    // We MUST use 'x-real-ip' which Vercel strictly overwrites at the edge.
    const ip = request.headers.get('x-real-ip') || request.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';
    const now = Date.now();
    const windowStart = now - RATE_LIMIT_WINDOW;
    
    // Clean up expired entries periodically
    for (const [key, value] of rateLimit.entries()) {
      if (value.timestamp < windowStart) {
        rateLimit.delete(key);
      }
    }
    
    const userRateData = rateLimit.get(ip);
    if (userRateData) {
      if (userRateData.count >= MAX_REQUESTS) {
          // RFC 6585: Retry-After tells clients exactly when they can retry
          return NextResponse.json(
            { error: 'Too many requests. Please try again later.' },
            { status: 429, headers: { 'Retry-After': '60', 'X-RateLimit-Limit': String(MAX_REQUESTS) } }
          );
        }
      userRateData.count += 1;
      rateLimit.set(ip, userRateData);
    } else {
      rateLimit.set(ip, { count: 1, timestamp: now });
    }
    // ----------------------

    const { name, email, message } = await request.json();

    // --- INPUT VALIDATION ---
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Length checks to prevent payload exhaustion
    if (name.length > 100 || email.length > 100 || message.length > 5000) {
      return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
    }

    // Strict email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }
    // ------------------------

    // Lazy instantiation of Resend to ensure build-time safety
    if (!process.env.RESEND_API_KEY) {
      console.error('CRITICAL: Missing RESEND_API_KEY in environment variables');
      return NextResponse.json({ error: 'Internal Server Configuration Error' }, { status: 500 });
    }
    if (!process.env.CONTACT_EMAIL) {
      console.error('CRITICAL: Missing CONTACT_EMAIL in environment variables');
      return NextResponse.json({ error: 'Internal Server Configuration Error' }, { status: 500 });
    }
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      // CONTACT_FROM_EMAIL must be a verified domain in Resend (e.g. noreply@yourdomain.com)
      // Fallback to Resend's sandbox address for local dev only
      from: process.env.CONTACT_FROM_EMAIL || 'Portfolio Contact Form <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `New message from ${name} via Portfolio`,
      text: `You have received a new message from your portfolio website.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    if (error) {
      console.error('Resend Error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
