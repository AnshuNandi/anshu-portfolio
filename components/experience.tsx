import { Briefcase, CircleDot } from 'lucide-react'
import { experience, swatch } from '@/lib/data'
import { Section, SectionHeading, Tag } from './brutal'
import { cn } from '@/lib/utils'

export function Experience() {
  return (
    <Section id="work" className="relative border-b-[3px] border-ink overflow-hidden">
      {/* backdrop */}
      <div aria-hidden="true" className="diagonal-grid absolute inset-0 opacity-50" />

      <div className="relative z-10 flex flex-col gap-12">
        <SectionHeading index="03" kicker="Experience" title="Where I've built" color="green" />

        <ol className="relative flex flex-col gap-8 border-l-[3px] border-ink pl-6 sm:pl-10">
          {experience.map((e) => (
            <li key={e.org} className="relative">
              <span
                aria-hidden="true"
                className={cn(
                  'absolute top-6 -left-[calc(1.5rem+9px)] grid size-4 place-items-center border-[3px] border-ink sm:-left-[calc(2.5rem+9px)]',
                  swatch[e.color].bg,
                )}
              />
              <article className="brut brut-hover bg-card">
                <div className="flex flex-wrap items-center gap-3 border-b-[3px] border-ink bg-goog-blue px-4 py-3 text-primary-foreground">
                  <Briefcase className="size-5 shrink-0" strokeWidth={2.75} />
                  <h3 className="font-display text-base uppercase leading-tight sm:text-xl">
                    {e.role}
                  </h3>
                  <span className="ml-auto border-2 border-ink bg-goog-yellow px-2 py-0.5 font-mono text-[11px] font-bold text-ink-static">
                    {e.period}
                  </span>
                </div>
                <div className="p-4 sm:p-6">
                  <p className="font-display text-sm uppercase leading-snug">{e.org}</p>
                  <p className="font-mono text-xs text-muted-foreground">{e.dept}</p>

                  <ul className="mt-5 flex flex-col gap-3">
                    {e.bullets.map((b, i) => (
                      <li key={i} className="flex gap-3">
                        <CircleDot
                          aria-hidden="true"
                          className={cn(
                            'mt-1 size-4 shrink-0',
                            ['text-goog-blue', 'text-goog-red', 'text-goog-yellow', 'text-goog-green'][
                              i % 4
                            ],
                          )}
                          strokeWidth={3}
                        />
                        <p className="text-pretty text-sm leading-relaxed">{b}</p>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2 border-t-[3px] border-ink pt-4">
                    {e.stack.map((s) => (
                      <Tag key={s} className="bg-muted">
                        {s}
                      </Tag>
                    ))}
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
