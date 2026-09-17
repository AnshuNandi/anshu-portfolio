import Image from 'next/image'
import { ArrowDown, ArrowUpRight, MapPin, Sparkles } from 'lucide-react'
import { profile, stats, swatch } from '@/lib/data'
import { cn } from '@/lib/utils'
import { Typewriter } from './typewriter'
import { getGithubStats } from '@/lib/github'

export async function Hero() {
  const ghStats = await getGithubStats();
  
  const displayStats = stats.map((s, i) => {
    if (i === 0 && ghStats.totalContributions) return { ...s, value: `${ghStats.totalContributions}+` };
    if (i === 1 && ghStats.totalRepos) return { ...s, value: ghStats.totalRepos.toString() };
    return s;
  });

  return (
    <section id="top" className="relative overflow-hidden border-b-[3px] border-ink">
      {/* backdrop */}
      <div aria-hidden="true" className="grid-paper absolute inset-0" />
      <div
        aria-hidden="true"
        className="absolute -top-24 -left-24 hidden size-56 rotate-12 border-[3px] border-ink bg-goog-yellow/60 lg:block"
      />
      <div
        aria-hidden="true"
        className="dots absolute right-6 bottom-6 hidden size-40 lg:block"
      />

      <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-12 lg:py-24">
        {/* left */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="brut-sm inline-flex items-center gap-2 bg-goog-green px-2.5 py-1 font-mono text-[11px] font-bold tracking-widest uppercase text-primary-foreground">
              <span className="size-2 animate-pulse rounded-full bg-paper" />
              Open to opportunities
            </span>
            <span className="brut-sm inline-flex items-center gap-1.5 bg-card px-2.5 py-1 font-mono text-[11px] font-bold tracking-widest uppercase">
              <MapPin className="size-3" strokeWidth={3} />
              {profile.location}
            </span>
          </div>

          <div>
            <p className="font-mono text-sm font-bold tracking-[0.25em] uppercase text-muted-foreground">
              Hello, I build things
            </p>
            <h1 className="mt-2 font-display text-[clamp(2.75rem,11vw,6.5rem)] leading-[0.85] tracking-tighter uppercase">
              <span className="block">
                <span className="text-goog-blue">A</span>
                <span className="text-goog-red">N</span>
                <span className="text-goog-yellow">S</span>
                <span className="text-goog-blue">H</span>
                <span className="text-goog-green">U</span>
              </span>
              <span className="mt-1 block text-stroke">NANDI</span>
            </h1>
          </div>

          <div className="brut bg-card p-4 sm:p-5">
            <p className="flex min-h-[2.5em] items-start font-display text-lg leading-tight uppercase sm:min-h-[2.2em] sm:text-2xl">
              <Typewriter />
            </p>
            <p className="mt-3 max-w-xl text-pretty leading-relaxed text-muted-foreground">
              {profile.tagline}{' '}Ex-ML Intern at Webel (Govt. of West Bengal). CSE &apos;27 @ RCCIIT.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="#projects"
              className="brut brut-hover brut-press inline-flex items-center gap-2 bg-goog-blue px-5 py-3 font-display text-sm uppercase tracking-wide text-primary-foreground"
            >
              See my work
              <ArrowDown className="size-4" strokeWidth={3} />
            </a>
            <a
              href="#contact"
              className="brut brut-hover brut-press inline-flex items-center gap-2 bg-goog-red px-5 py-3 font-display text-sm uppercase tracking-wide text-primary-foreground"
            >
              Let&apos;s talk
              <ArrowUpRight className="size-4" strokeWidth={3} />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              className="brut brut-hover brut-press inline-flex items-center gap-2 bg-card px-5 py-3 font-display text-sm uppercase tracking-wide"
            >
              GitHub
              <ArrowUpRight className="size-4" strokeWidth={3} />
            </a>
          </div>
        </div>

        {/* right — portrait */}
        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute -top-4 -right-3 z-10 hidden rotate-6 border-[3px] border-ink bg-goog-yellow px-3 py-1.5 font-mono text-xs font-bold uppercase text-ink-static sm:block"
          >
            <Sparkles className="mr-1 inline size-3.5" strokeWidth={3} /> LangGraph pilot
          </div>
          <div className="brut-lg relative overflow-hidden bg-goog-blue">
            <Image
              src="/images/portrait.png"
              alt="Illustrated portrait of Anshu Nandi"
              width={800}
              height={800}
              priority
              className="aspect-square w-full object-cover"
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute -bottom-5 -left-4 hidden -rotate-6 border-[3px] border-ink bg-goog-green px-3 py-1.5 font-mono text-xs font-bold uppercase text-primary-foreground sm:block"
          >
            {ghStats.totalContributions ? `${ghStats.totalContributions}+ commits / yr` : '550+ commits / yr'}
          </div>
        </div>
      </div>

      {/* stats strip */}
      <div className="relative border-t-[3px] border-ink">
        <dl className="mx-auto grid w-full max-w-6xl grid-cols-2 lg:grid-cols-4">
          {displayStats.map((s, i) => (
            <div
              key={s.label}
              className={cn(
                'flex flex-col gap-1 px-4 py-5 sm:px-6',
                i % 2 === 1 && 'border-l-[3px] border-ink',
                i > 1 && 'border-t-[3px] border-ink lg:border-t-0',
                i === 2 && 'lg:border-l-[3px]',
                i === 3 && 'lg:border-l-[3px]',
              )}
            >
              <dt className="font-mono text-[11px] font-bold tracking-widest uppercase text-muted-foreground">
                {s.label}
              </dt>
              <dd className={cn('font-display text-3xl leading-none sm:text-4xl', swatch[s.color].text)}>
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
