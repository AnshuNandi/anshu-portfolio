import { ArrowUpRight, Star } from 'lucide-react'
import { profile, projects, swatch } from '@/lib/data'
import { Section, SectionHeading, Tag } from './brutal'
import { cn } from '@/lib/utils'

export function Projects() {
  return (
    <Section id="projects" className="relative border-b-[3px] border-ink bg-muted overflow-hidden">
      <div aria-hidden="true" className="grid-paper pointer-events-none absolute inset-0 z-0" />
      
      {/* Google I/O Authentic Graphics - Edge Anchored (Responsive) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Faint yellow quarter circle tucked into the top right corner */}
        <div className="absolute -top-[50px] md:-top-[100px] -right-[50px] md:-right-[100px] w-[150px] md:w-[300px] h-[150px] md:h-[300px] bg-[var(--goog-yellow)] opacity-30 rounded-bl-full" />
        
        {/* Subtle green plus grid center right edge */}
        <div className="absolute top-[50%] -right-[2%] w-[75px] md:w-[150px] h-[75px] md:h-[150px] opacity-40 bg-[length:18px_18px] md:bg-[length:30px_30px]"
             style={{ 
               backgroundImage: `url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30'%3E%3Cpath d='M14 6v18h2V6zM6 14v2h18v-2z' fill='%2334a853' /%3E%3C/svg%3E")`
             }} />
        {/* Subtle blue hollow circle on far left edge */}
        <div className="absolute top-[20%] -left-[50px] md:-left-[100px] w-[100px] md:w-[200px] h-[100px] md:h-[200px] rounded-full border-[3px] md:border-[6px] border-[var(--goog-blue)] opacity-30" />
        
        {/* Subtle red plus grid on the bottom left edge */}
        <div className="absolute bottom-[5%] left-[2%] w-[75px] md:w-[150px] h-[75px] md:h-[150px] opacity-30 bg-[length:18px_18px] md:bg-[length:30px_30px]"
             style={{ 
               backgroundImage: `url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30'%3E%3Cpath d='M14 6v18h2V6zM6 14v2h18v-2z' fill='%23ea4335' /%3E%3C/svg%3E")`
             }} />
      </div>

      <div className="relative flex flex-col gap-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading index="04" kicker="Selected work" title="Engineering portfolio" color="yellow" />
          <a
            href={`${profile.github}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View all GitHub repositories for Anshu Nandi"
            className="brut-sm brut-hover brut-press inline-flex w-fit items-center gap-1.5 bg-ink px-3 py-2 font-display text-xs uppercase text-paper"
          >
            View all repos
            <ArrowUpRight className="size-3.5" strokeWidth={3} />
          </a>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <article
              key={p.title}
              itemScope
              itemType="https://schema.org/SoftwareSourceCode"
              className={cn(
                'brut brut-hover flex flex-col bg-card',
                p.featured && 'md:col-span-2 md:flex-row',
              )}
            >
              {/* colored index panel */}
              <div
                className={cn(
                  'flex items-center justify-between gap-4 border-b-[3px] border-ink px-4 py-3',
                  swatch[p.color].bg,
                  p.color === 'yellow' ? 'text-ink-static' : 'text-primary-foreground',
                  p.featured &&
                    'md:w-52 md:shrink-0 md:flex-col md:items-start md:justify-between md:border-r-[3px] md:border-b-0 md:py-5',
                )}
              >
                <span className="font-display text-3xl leading-none md:text-5xl">{p.n}</span>
                {p.featured ? (
                  <span className="inline-flex items-center gap-1.5 border-2 border-ink bg-paper px-2 py-0.5 font-mono text-[10px] font-bold tracking-widest uppercase text-ink">
                    <Star className="size-3" strokeWidth={3} /> Flagship
                  </span>
                ) : (
                  <span className="border-2 border-ink bg-paper px-2 py-0.5 font-mono text-[10px] font-bold tracking-widest uppercase text-ink">
                    Project
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col gap-4 p-4 sm:p-6">
                <div>
                  <h3 itemProp="name" className="font-display text-2xl uppercase leading-none sm:text-3xl">
                    {p.title}
                  </h3>
                  <p className={cn('mt-1 font-mono text-xs font-bold uppercase', swatch[p.color].text)}>
                    <span itemProp="description">{p.subtitle}</span>
                  </p>
                </div>

                <p className="text-pretty text-sm leading-relaxed text-muted-foreground">{p.blurb}</p>

                <ul className="grid gap-1.5 sm:grid-cols-2">
                  {p.highlights.map((h, i) => (
                    <li key={h} className="flex items-center gap-2 text-sm font-medium">
                      <span
                        aria-hidden="true"
                        className={cn(
                          'size-2.5 shrink-0 border-2 border-ink',
                          ['bg-goog-blue', 'bg-goog-red', 'bg-goog-yellow', 'bg-goog-green'][i % 4],
                        )}
                      />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap items-center gap-2 border-t-[3px] border-ink pt-4">
                  {p.stack.map((s) => (
                    <Tag key={s} className="bg-muted">
                      {s}
                    </Tag>
                  ))}
                  {p.repo && (
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      itemProp="codeRepository"
                      aria-label={`View source code for ${p.title} on GitHub`}
                      className="brut-sm brut-press ml-auto inline-flex items-center gap-1.5 bg-ink px-2.5 py-1.5 font-mono text-[11px] font-bold uppercase text-paper"
                    >
                      Code
                      <ArrowUpRight className="size-3" strokeWidth={3} />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  )
}
