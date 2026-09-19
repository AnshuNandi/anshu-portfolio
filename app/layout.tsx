import type { Metadata, Viewport } from 'next'
import { Archivo_Black, JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import { headers } from 'next/headers'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
const _spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-sans' })
const _archivoBlack = Archivo_Black({ subsets: ['latin'], weight: '400', variable: '--font-display' })
const _jetBrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
};
const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    template: '%s | Anshu Nandi',
    default: 'Anshu Nandi — Agentic AI & Full-Stack Engineer',
  },
  description:
    'Portfolio of Anshu Nandi — Agentic AI & Full-Stack Engineer from Kolkata, India. Architecting scalable ML systems, LangGraph agents, MLOps pipelines and intelligent web apps.',

  keywords: [
    'Anshu Nandi',
    'Agentic AI Engineer',
    'Full-Stack Engineer',
    'LangGraph',
    'MLOps',
    'Machine Learning',
    'Next.js',
    'FastAPI',
    'Portfolio',
  ],
  authors: [{ name: 'Anshu Nandi', url: 'https://github.com/AnshuNandi' }],
  creator: 'Anshu Nandi',
  alternates: {
    canonical: '/',
  },
  // Controls how Google renders this page in search results.
  // Without these, Google uses conservative defaults that hurt click-through rates.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',  // Allow large image previews in search results
      'max-snippet': -1,              // Allow full-length description snippets
      'max-video-preview': -1,        // No video cap (no videos on this site, future-proof)
    },
  },
  openGraph: {
    title: 'Anshu Nandi — Agentic AI & Full-Stack Engineer',
    description:
      'Architecting enterprise-grade Agentic AI systems & distributed full-stack applications.',
    url: baseUrl,
    siteName: 'Anshu Nandi Portfolio',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/opengraph-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Anshu Nandi — Agentic AI & Full-Stack Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anshu Nandi — Agentic AI & Full-Stack Engineer',
    description:
      'Architecting enterprise-grade Agentic AI systems & distributed full-stack applications.',
    creator: '@Anshu_Nandi007',
  },
}

export const viewport: Viewport = {
  themeColor: '#4285F4',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Read the nonce to opt the entire layout into dynamic rendering.
  // Next.js 15 breaking change: headers() is now async!
  const headersList = await headers();
  const nonce = headersList.get('x-nonce') || '';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: baseUrl,
        name: 'Anshu Nandi Portfolio',
        description: 'Portfolio of Anshu Nandi — Agentic AI & Full-Stack Engineer',
        inLanguage: 'en-US',
      },
      {
        '@type': 'Person',
        '@id': `${baseUrl}/#person`,
        name: 'Anshu Nandi',
        url: baseUrl,
        jobTitle: 'Agentic AI & Full-Stack Engineer',
        image: `${baseUrl}/opengraph-image.jpg`,
        sameAs: [
          'https://github.com/AnshuNandi',
          'https://www.linkedin.com/in/anshu-nandi/',
          'https://leetcode.com/u/anshunandi/',
          'https://x.com/Anshu_Nandi007',
          'https://www.instagram.com/anshu.nandi07/',
        ],
        alumniOf: 'RCC Institute of Information Technology',
        knowsAbout: ['Agentic AI', 'Machine Learning', 'Full-Stack Development', 'React', 'Next.js', 'Python', 'MLOps'],
      },
    ],
  }

  return (
    <html lang="en" className="bg-background" suppressHydrationWarning>
      <head>
        {/* nonce required: CSP blocks inline scripts without it */}
        <script
          type="application/ld+json"
          nonce={nonce}
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${_spaceGrotesk.variable} ${_archivoBlack.variable} ${_jetBrainsMono.variable} antialiased overflow-x-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
