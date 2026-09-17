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

export default function Page() {
  return (
    <>
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
