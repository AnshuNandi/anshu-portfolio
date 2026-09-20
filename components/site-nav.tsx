'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navLinks, profile } from '@/lib/data'
import { GithubIcon, LinkedinIcon } from './brand-icons'
import { GoogleBar } from './brutal'
import { cn } from '@/lib/utils'
import { ThemeToggle } from './theme-toggle'

export function SiteNav() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>('')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1))
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: [0.1, 0.4, 0.8] },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <header className="sticky top-0 z-50">
      <div className="border-b-[3px] border-ink bg-background/95 backdrop-blur-sm">
        <nav
          aria-label="Main"
          className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6"
        >
          <a
            href="#top"
            className="brut-sm brut-hover brut-press flex shrink-0 items-center gap-2 bg-ink px-2 py-1"
          >
            <span className="font-display text-lg leading-none text-paper">AN</span>
            <span className="hidden font-mono text-[10px] leading-tight font-bold tracking-widest text-goog-yellow sm:block">
              ANSHU
              <br />
              NANDI
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((l, i) => {
              const colors = ['bg-goog-blue', 'bg-goog-red', 'bg-goog-yellow', 'bg-goog-green']
              const c = colors[i % 4]
              const isActive = active === l.href.slice(1)
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'relative block border-2 border-transparent px-3 py-1.5 font-mono text-xs font-bold tracking-widest uppercase transition-colors',
                      isActive ? 'border-ink bg-ink text-paper' : 'hover:border-ink',
                    )}
                  >
                    {l.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute inset-x-2 bottom-0.5 h-1 origin-left scale-x-0 transition-transform duration-200 group-hover:scale-x-100',
                        c,
                        isActive && 'scale-x-100',
                      )}
                    />
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub profile"
              className="brut-sm brut-hover brut-press hidden size-9 place-items-center bg-goog-blue text-primary-foreground sm:grid"
            >
              <GithubIcon className="size-4" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn profile"
              className="brut-sm brut-hover brut-press hidden size-9 place-items-center bg-goog-green text-primary-foreground sm:grid"
            >
              <LinkedinIcon className="size-4" />
            </a>
            <a
              href="#contact"
              className="brut-sm brut-hover brut-press hidden bg-goog-yellow px-3 py-2 font-mono text-xs font-bold tracking-widest uppercase text-ink-static lg:block"
            >
              Hire me
            </a>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="brut-sm brut-hover brut-press grid size-9 place-items-center bg-goog-red text-primary-foreground md:hidden"
            >
              {open ? <X className="size-4" strokeWidth={3} /> : <Menu className="size-4" strokeWidth={3} />}
            </button>
          </div>
        </nav>
      </div>
      <GoogleBar className="h-1.5" />

      {/* scroll progress */}
      <div
        aria-hidden="true"
        className="h-1.5 origin-left bg-ink"
        style={{ transform: `scaleX(${progress / 100})` }}
      />

      {open ? (
        <div
          id="mobile-menu"
          className="border-b-[3px] border-ink bg-background md:hidden"
        >
          <ul className="mx-auto grid max-w-6xl gap-2 p-4">
            {navLinks.map((l, i) => {
              const colors = ['bg-goog-blue', 'bg-goog-red', 'bg-goog-yellow', 'bg-goog-green']
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="brut-sm flex items-center gap-3 bg-card px-3 py-3 font-display text-lg uppercase"
                  >
                    <span className={cn('size-4 border-2 border-ink', colors[i % 4])} />
                    {l.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      ) : null}
    </header>
  )
}
