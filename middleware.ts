import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Save edge compute: skip CSP generation for Next.js client-side prefetches
  if (request.headers.has('x-middleware-prefetch')) {
    return NextResponse.next()
  }

  // Generate a random cryptographic nonce using pure Web Standard APIs (100% Edge compatible)
  const nonce = btoa(crypto.randomUUID())
  
  // In production, we strictly ban 'unsafe-eval' to meet enterprise compliance.
  // In development, Next.js requires it for hot-reloading.
  const isDev = process.env.NODE_ENV === 'development'
  const unsafeEval = isDev ? "'unsafe-eval'" : ""

  // Construct the truly strict industry-standard Content Security Policy
  // nonce + strict-dynamic: 'unsafe-inline' is NOT needed and weakens the policy.
  // 'strict-dynamic' causes modern browsers to IGNORE 'unsafe-inline', but it still
  // signals weakness to scanners and is bad practice to include.
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' ${unsafeEval} https:;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https:;
    font-src 'self' data:;
    connect-src 'self' https://vitals.vercel-insights.com https://*.vercel-scripts.com;
    media-src 'none';
    worker-src 'none';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `
  
  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, ' ')
    .trim()

  const requestHeaders = new Headers(request.headers)
  
  // Set the nonce header so Next.js can read it and inject it into its scripts
  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue
  )

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
  
  // Ensure the browser receives the CSP header
  response.headers.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue
  )

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (static metadata files)
     * - all static image and media files (.svg, .png, .jpg, etc)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
