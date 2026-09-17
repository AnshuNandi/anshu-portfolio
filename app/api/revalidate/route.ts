import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

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

    if (!token || token !== expectedToken) {
      return NextResponse.json(
        { message: 'Unauthorized. Invalid or missing revalidation token.' },
        { status: 401 }
      );
    }

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
