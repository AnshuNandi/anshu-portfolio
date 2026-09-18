import { Brain, Cloud, LayoutTemplate, Terminal } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { skillGroups, swatch } from '@/lib/data'
import { Section, SectionHeading } from './brutal'
import { cn } from '@/lib/utils'

const icons: Record<string, LucideIcon> = {
  brain: Brain,
  layout: LayoutTemplate,
  cloud: Cloud,
  terminal: Terminal,
}

export function Skills() {
  return (
    <Section id="skills" className="relative border-b-[3px] border-ink bg-muted overflow-hidden">
      {/* backdrop */}
      <div aria-hidden="true" className="dots absolute inset-0 opacity-50" />
      
      <div className="relative z-10 flex flex-col gap-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading index="02" kicker="Toolbox" title="Stack & skills" color="red" />
          <p className="max-w-sm text-pretty leading-relaxed text-muted-foreground">
            Four disciplines, one pipeline — from tensors and agent graphs all the way to
            containers, queues and pixel-perfect frontends.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {skillGroups.map((g) => {
            const Icon = icons[g.icon] ?? Terminal
            return (
              <div key={g.title} className="brut brut-hover bg-card">
                <div
                  className={cn(
                    'flex items-center gap-3 border-b-[3px] border-ink px-4 py-3',
                    swatch[g.color].bg,
                    g.color === 'yellow' ? 'text-ink-static' : 'text-primary-foreground',
                  )}
                >
                  <span className="grid size-9 shrink-0 place-items-center border-2 border-ink bg-paper text-ink">
                    <Icon className="size-4" strokeWidth={2.75} />
                  </span>
                  <h3 className="font-display text-base uppercase leading-none sm:text-lg">
                    {g.title}
                  </h3>
                  <span className="ml-auto font-mono text-xs font-bold">
                    {String(g.items.length).padStart(2, '0')}
                  </span>
                </div>
                <ul className="flex flex-wrap gap-2 p-4">
                  {g.items.map((s) => (
                    <li
                      key={s}
                      className="border-2 border-ink bg-background px-2 py-1 font-mono text-[11px] font-bold transition-colors hover:bg-ink hover:text-paper"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
