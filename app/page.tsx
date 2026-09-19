import { headers } from 'next/headers'
import { SiteNav } from '@/components/site-nav'
import { Hero } from '@/components/hero'
import { Marquee } from '@/components/marquee'
import { About } from '@/components/about'
import { Skills } from '@/components/skills'
import { Experience } from '@/components/experience'
import { Projects } from '@/components/projects'
import { Awards } from '@/components/awards'
import { Contact } from '@/components/contact'
import { SiteFooter } from '@/components/site-footer'

export default async function Page() {
  // Next.js 15: headers() is async — must await to read nonce for CSP compliance
  const headersList = await headers()
  const nonce = headersList.get('x-nonce') || ''

  // ProfilePage schema references the Person already defined in layout.tsx via @id
  // This avoids duplicate Person schemas on the same page which confuses Google's parser
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    dateCreated: '2023-01-01T12:00:00+00:00',
    dateModified: '2025-06-01T12:00:00+00:00',
    mainEntity: {
      '@id': '#person',  // References the @id defined in layout.tsx, no duplication
    }
  }

  return (
    <>
      {/* nonce required: our nonce-based CSP blocks all inline scripts without it */}
      <script
        type="application/ld+json"
        nonce={nonce}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteNav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Marquee reverse />
        <Awards />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
