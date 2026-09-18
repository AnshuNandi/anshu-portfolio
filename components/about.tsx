import { GraduationCap, Quote } from 'lucide-react'
import { about, education, profile, swatch } from '@/lib/data'
import { Card, Section, SectionHeading, Tag } from './brutal'
import { cn } from '@/lib/utils'

export function About() {
  return (
    <Section id="about" className="relative border-b-[3px] border-ink overflow-hidden">
      {/* backdrop */}
      <div aria-hidden="true" className="diagonal-grid absolute inset-0" />
      
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
                <div key={e.school} className="flex flex-col gap-1">
                  <h3 className="font-display text-base uppercase leading-tight">{e.degree}</h3>
                  <p className="text-sm font-medium">{e.school}</p>
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <Tag className="bg-goog-yellow text-ink-static">{e.period}</Tag>
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

          <ul className="grid gap-4 sm:grid-cols-2">
            {about.facts.map((f) => (
              <li key={f.k} className="brut brut-hover bg-card">
                <div className={cn('h-2 border-b-[3px] border-ink', swatch[f.color].bg)} />
                <div className="p-4">
                  <p className="font-mono text-[11px] font-bold tracking-widest uppercase text-muted-foreground">
                    {f.k}
                  </p>
                  <p className="mt-1 font-display text-sm leading-snug uppercase">{f.v}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
