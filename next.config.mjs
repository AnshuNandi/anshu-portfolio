/** @type {import('next').NextConfig} */
const nextConfig = {
  // TypeScript errors should NEVER be ignored in a production CI/CD pipeline
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  // Image optimization is critical for SEO (LCP). We must use Vercel's native image optimization.
  // images: {
  //   unoptimized: true,
  // },

  // Security: Never reveal the tech stack to attackers via response headers
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          // Must be DENY to be consistent with CSP frame-ancestors 'none' in middleware
          { key: 'X-Frame-Options', value: 'DENY' },
          // DEPRECATED & DANGEROUS: The XSS Auditor was removed from Chrome in 2019 and
          // can be weaponized to cause XSS. OWASP mandates disabling it with '0'.
          { key: 'X-XSS-Protection', value: '0' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
          // Spectre side-channel attack mitigation: prevents cross-origin window references
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          // Prevents other origins from loading this site's resources (images, fonts, etc.)
          { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
        ],
      },
    ]
  },
}

export default nextConfig
