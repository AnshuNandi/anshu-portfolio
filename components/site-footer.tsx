'use client'

import { ArrowUp } from 'lucide-react'
import { navLinks, profile } from '@/lib/data'
import { GoogleBar } from './brutal'

export function SiteFooter() {
  return (
    <footer className="bg-ink text-paper dark:bg-zinc-950 dark:text-zinc-50">
      <GoogleBar className="h-2" />
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="font-display text-[clamp(2rem,7vw,4.5rem)] leading-[0.85] uppercase">
            <span className="text-goog-blue">Let&apos;s</span>{' '}
            <span className="text-goog-red">make</span>{' '}
            <span className="text-goog-yellow">something</span>{' '}
            <span className="text-goog-green">loud.</span>
          </p>
          <p className="mt-4 max-w-md text-pretty leading-relaxed text-paper/70 dark:text-zinc-50/70">
            {profile.role} · {profile.location}
          </p>
        </div>

        <div className="flex flex-col gap-6 lg:items-end">
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 lg:justify-end">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="font-mono text-xs font-bold tracking-widest uppercase text-paper/70 transition-colors hover:text-goog-yellow dark:text-zinc-50/70"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="brut-press inline-flex w-fit items-center gap-2 border-[3px] border-paper bg-transparent px-4 py-2.5 font-display text-sm uppercase transition-colors hover:bg-goog-yellow hover:text-ink-static dark:border-zinc-50"
          >
            Back to top
            <ArrowUp className="size-4" strokeWidth={3} />
          </button>
        </div>
      </div>

      <div className="border-t-[3px] border-paper/30 dark:border-zinc-50/30">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-5 font-mono text-[11px] tracking-widest uppercase text-paper/60 dark:text-zinc-50/60 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} {profile.name}. Built with Next.js &amp; Tailwind.</p>
          <p>Neo-brutalism · Google palette</p>
        </div>
      </div>
    </footer>
  )
}
