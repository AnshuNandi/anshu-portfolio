import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.split(' ')[1];
    const expectedToken = process.env.REVALIDATION_TOKEN;

    if (!expectedToken) {
      return NextResponse.json(
        { message: 'Server is missing REVALIDATION_TOKEN environment variable.' },
        { status: 500 }
      );
    }

    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized. Missing revalidation token.' },
        { status: 401 }
      );
    }

    // --- CYBERSECURITY PATCH: PREVENT TIMING ATTACKS ---
    // Standard string comparisons fail early and leak length/character data via microsecond delays.
    // We enforce exact length checking and constant-time cryptographic comparison.
    if (token.length !== expectedToken.length) {
       return NextResponse.json(
        { message: 'Unauthorized. Invalid revalidation token.' },
        { status: 401 }
      );
    }

    const isAuthorized = crypto.timingSafeEqual(
      Buffer.from(token),
      Buffer.from(expectedToken)
    );

    if (!isAuthorized) {
      return NextResponse.json(
        { message: 'Unauthorized. Invalid revalidation token.' },
        { status: 401 }
      );
    }
    // ---------------------------------------------------

    // Revalidate the Next.js cache tag for github-stats
    revalidateTag('github-stats');

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    console.error('Revalidation error:', err);
    return NextResponse.json(
      { message: 'Error revalidating' },
      { status: 500 }
    );
  }
}
