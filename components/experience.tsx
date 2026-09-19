import { Briefcase, CircleDot } from 'lucide-react'
import { experience, swatch } from '@/lib/data'
import { Section, SectionHeading, Tag } from './brutal'
import { cn } from '@/lib/utils'

export function Experience() {
  return (
    <Section id="work" className="relative border-b-[3px] border-ink overflow-hidden">
      {/* backdrop */}
      <div aria-hidden="true" className="diagonal-grid absolute inset-0 z-0" />
      
      {/* Google I/O Authentic Graphics - Edge Anchored (Responsive) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Subtle red hollow pill on the top right edge */}
        <div className="absolute top-[10%] -right-[25px] md:-right-[50px] w-[75px] md:w-[150px] h-[150px] md:h-[300px] rounded-full border-[3px] md:border-[6px] border-[var(--goog-red)] opacity-30" />
        
        {/* Faint blue hollow circle anchoring the bottom left */}
        <div className="absolute -bottom-[50px] md:-bottom-[100px] -left-[50px] md:-left-[100px] w-[150px] md:w-[300px] h-[150px] md:h-[300px] rounded-full border-[4px] md:border-[8px] border-[var(--goog-blue)] opacity-[0.25]" />
        
        {/* Green plus grid subtle on bottom right */}
        <div className="absolute bottom-[5%] right-[2%] w-[75px] md:w-[150px] h-[75px] md:h-[150px] opacity-[0.25]"
             style={{ 
               backgroundImage: `url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30'%3E%3Cpath d='M14 6v18h2V6zM6 14v2h18v-2z' fill='%2334a853' /%3E%3C/svg%3E")`, 
               backgroundSize: '30px 30px' 
             }} />
      </div>

      <div className="relative z-10 flex flex-col gap-12">
        <SectionHeading index="03" kicker="Experience" title="Where I've built" color="green" />

        <ol itemScope itemType="https://schema.org/ItemList" className="relative flex flex-col gap-8 border-l-[3px] border-ink pl-6 sm:pl-10">
          {experience.map((e, index) => (
            <li key={e.org} itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem" className="relative">
              <meta itemProp="position" content={`${index + 1}`} />
              <span
                aria-hidden="true"
                className={cn(
                  'absolute top-6 -left-[calc(1.5rem+9px)] grid size-4 place-items-center border-[3px] border-ink sm:-left-[calc(2.5rem+9px)]',
                  swatch[e.color].bg,
                )}
              />
              <article itemScope itemType="https://schema.org/Organization" className="brut brut-hover bg-card">
                <div className="flex flex-wrap items-center gap-3 border-b-[3px] border-ink bg-goog-blue px-4 py-3 text-primary-foreground">
                  <Briefcase className="size-5 shrink-0" strokeWidth={2.75} />
                  <h3 className="font-display text-base uppercase leading-tight sm:text-xl">
                    {e.role}
                  </h3>
                  <span className="ml-auto border-2 border-ink bg-goog-yellow px-2 py-0.5 font-mono text-[11px] font-bold text-ink-static">
                    <time>{e.period}</time>
                  </span>
                </div>
                <div className="p-4 sm:p-6">
                  <p itemProp="name" className="font-display text-sm uppercase leading-snug">{e.org}</p>
                  <p itemProp="department" className="font-mono text-xs text-muted-foreground">{e.dept}</p>

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
                        <p itemProp="description" className="text-pretty text-sm leading-relaxed">{b}</p>
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
