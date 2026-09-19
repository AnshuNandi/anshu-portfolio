import type { Metadata, Viewport } from 'next'
import { Archivo_Black, JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
const _spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-sans' })
const _archivoBlack = Archivo_Black({ subsets: ['latin'], weight: '400', variable: '--font-display' })
const _jetBrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  metadataBase: new URL('https://anshunandi.vercel.app'),
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
  openGraph: {
    title: 'Anshu Nandi — Agentic AI & Full-Stack Engineer',
    description:
      'Architecting enterprise-grade Agentic AI systems & distributed full-stack applications.',
    url: 'https://anshunandi.vercel.app',
    siteName: 'Anshu Nandi Portfolio',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anshu Nandi — Agentic AI & Full-Stack Engineer',
    description:
      'Architecting enterprise-grade Agentic AI systems & distributed full-stack applications.',
  },
}

export const viewport: Viewport = {
  themeColor: '#4285F4',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://anshunandi.vercel.app/#website',
        url: 'https://anshunandi.vercel.app',
        name: 'Anshu Nandi Portfolio',
        description: 'Portfolio of Anshu Nandi — Agentic AI & Full-Stack Engineer',
        inLanguage: 'en-US',
      },
      {
        '@type': 'Person',
        '@id': 'https://anshunandi.vercel.app/#person',
        name: 'Anshu Nandi',
        url: 'https://anshunandi.vercel.app',
        jobTitle: 'Agentic AI & Full-Stack Engineer',
        image: 'https://anshunandi.vercel.app/opengraph-image.jpg',
        sameAs: [
          'https://github.com/AnshuNandi',
          'https://linkedin.com/in/anshu-nandi',
          'https://leetcode.com/u/anshunandi/',
        ],
        alumniOf: 'RCC Institute of Information Technology',
        knowsAbout: ['Agentic AI', 'Machine Learning', 'Full-Stack Development', 'React', 'Next.js', 'Python', 'MLOps'],
      },
    ],
  }

  return (
    <html lang="en" className="bg-background" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
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
