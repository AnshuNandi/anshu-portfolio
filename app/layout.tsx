import type { Metadata, Viewport } from 'next'
import { Archivo_Black, JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
const _spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-sans' })
const _archivoBlack = Archivo_Black({ subsets: ['latin'], weight: '400', variable: '--font-display' })
const _jetBrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'Anshu Nandi — Agentic AI & Full-Stack Engineer',
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
  openGraph: {
    title: 'Anshu Nandi — Agentic AI & Full-Stack Engineer',
    description:
      'Architecting enterprise-grade Agentic AI systems & distributed full-stack applications.',
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
  return (
    <html lang="en" className="bg-background" suppressHydrationWarning>
      <body className={`${_spaceGrotesk.variable} ${_archivoBlack.variable} ${_jetBrainsMono.variable} antialiased overflow-x-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
