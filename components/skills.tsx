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
      <div aria-hidden="true" className="dots absolute inset-0 opacity-50 z-0" />
      
      {/* Google I/O Authentic Graphics - Edge Anchored (Responsive) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Massive, faint blue glow anchored to the bottom edge */}
        <div className="absolute -bottom-[200px] md:-bottom-[300px] left-1/2 -translate-x-1/2 w-[400px] md:w-[800px] h-[300px] md:h-[400px] rounded-[100%] bg-[var(--goog-blue)] opacity-[0.15] blur-3xl" />
        
        {/* Subtle green plus grid tucked into the top left corner */}
        <div className="absolute top-[5%] left-[2%] w-[100px] md:w-[200px] h-[100px] md:h-[200px] opacity-[0.20] bg-[length:24px_24px] md:bg-[length:40px_40px]"
             style={{ 
               backgroundImage: `url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M18 10v20h4V10zM10 18v4h20v-4z' fill='%2334a853' /%3E%3C/svg%3E")`
             }} />
             
        {/* Subtle yellow quarter circle top right */}
        <div className="absolute -top-[25px] md:-top-[50px] -right-[25px] md:-right-[50px] w-[100px] md:w-[200px] h-[100px] md:h-[200px] rounded-bl-full border-[2px] md:border-[4px] border-[var(--goog-yellow)] opacity-[0.25]" />
      </div>
      
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
