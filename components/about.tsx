import { GraduationCap, Quote } from 'lucide-react'
import { about, education, profile, swatch } from '@/lib/data'
import { Card, Section, SectionHeading, Tag } from './brutal'
import { cn } from '@/lib/utils'

export function About() {
  return (
    <Section id="about" className="relative border-b-[3px] border-ink overflow-hidden">
      {/* backdrop */}
      <div aria-hidden="true" className="diagonal-grid absolute inset-0 z-0" />
      
      {/* Google I/O Authentic Graphics - Edge Anchored (Responsive) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Yellow Quarter Circle pushed to the absolute bottom left corner */}
        <div className="absolute -bottom-[25px] md:-bottom-[50px] -left-[25px] md:-left-[50px] w-[150px] md:w-[300px] h-[150px] md:h-[300px] bg-[var(--goog-yellow)] opacity-30 rounded-tr-full" />
        
        {/* Subtle hollow green circle anchoring the top right margin */}
        <div className="absolute top-[10%] -right-[100px] md:-right-[150px] w-[200px] md:w-[300px] h-[200px] md:h-[300px] rounded-full border-[4px] md:border-[8px] border-[var(--goog-green)] opacity-30" />
        
        {/* Subtle red plus grid on the bottom right edge */}
        <div className="absolute -bottom-[10%] -right-[5%] w-[150px] md:w-[300px] h-[150px] md:h-[300px] opacity-[0.15] bg-[length:18px_18px] md:bg-[length:30px_30px]"
             style={{ 
               backgroundImage: `url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30'%3E%3Cpath d='M13 7v16h4V7zM7 13v4h16v-4z' fill='%23ea4335' /%3E%3C/svg%3E")`
             }} />
      </div>
      
      <div className="relative z-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div className="flex flex-col gap-6">
          <SectionHeading index="01" kicker="Who am I" title="About the human" color="blue" />
          <Card hover className="bg-goog-blue p-5 text-primary-foreground">
            <Quote className="size-7" strokeWidth={3} />
            <p className="mt-3 font-display text-xl leading-tight uppercase text-balance">
              Ship systems that are as well-designed on the inside as they look on the outside.
            </p>
          </Card>
          <Card hover className="flex items-start gap-4 p-5">
            <span className="brut-sm grid size-11 shrink-0 place-items-center bg-goog-green text-primary-foreground">
              <GraduationCap className="size-5" strokeWidth={2.5} />
            </span>
            <div>
              {education.map((e) => (
                <div key={e.school} itemScope itemType="https://schema.org/EducationalOccupationalCredential" className="flex flex-col gap-1">
                  <h3 itemProp="name" className="font-display text-base uppercase leading-tight">{e.degree}</h3>
                  <p itemProp="recognizedBy" className="text-sm font-medium">{e.school}</p>
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <Tag className="bg-goog-yellow text-ink-static">
                      <time itemProp="temporal">{e.period}</time>
                    </Tag>
                    <Tag>{e.detail}</Tag>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <div className="brut brut-hover bg-card p-5 sm:p-7">
            {about.paragraphs.map((p, i) => (
              <p
                key={i}
                className={cn(
                  'text-pretty leading-relaxed',
                  i === 0 &&
                    'text-lg first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-6xl first-letter:leading-[0.8] first-letter:text-goog-red',
                  i > 0 && 'mt-4 text-muted-foreground',
                )}
              >
                {p}
              </p>
            ))}
            <div className="mt-6 flex flex-wrap gap-2">
              <Tag className="bg-goog-blue text-primary-foreground">{profile.pronouns}</Tag>
              <Tag className="bg-goog-red text-primary-foreground">2× contest podium</Tag>
              <Tag className="bg-goog-yellow text-ink-static">graphic design nerd</Tag>
              <Tag className="bg-goog-green text-primary-foreground">chess &amp; CP</Tag>
            </div>
          </div>

          {/* Semantic dl/dt/dd for key-value facts — correct HTML5 element per spec */}
          <div className="grid gap-4 sm:grid-cols-2">
            {about.facts.map((f) => (
              <div key={f.k} className="brut brut-hover bg-card flex flex-col">
                <div className={cn('h-2 border-b-[3px] border-ink shrink-0', swatch[f.color].bg)} aria-hidden="true" />
                <dl className="p-4 m-0">
                  <dt className="font-mono text-[11px] font-bold tracking-widest uppercase text-muted-foreground">
                    {f.k}
                  </dt>
                  <dd className="mt-1 font-display text-sm leading-snug uppercase">{f.v}</dd>
                </dl>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
