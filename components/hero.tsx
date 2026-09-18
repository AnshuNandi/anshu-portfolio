import Image from 'next/image'
import { ArrowDown, ArrowUpRight, MapPin, Settings, Sparkles } from 'lucide-react'
import { profile, stats, swatch } from '@/lib/data'
import { cn } from '@/lib/utils'
import { Typewriter } from './typewriter'
import { getGithubStats } from '@/lib/github'

export async function Hero() {
  const ghStats = await getGithubStats();
  
  const displayStats = stats.map((s, i) => {
    if (i === 0 && ghStats.totalContributions) return { ...s, value: `${ghStats.totalContributions}` };
    if (i === 1 && ghStats.totalRepos) return { ...s, value: ghStats.totalRepos.toString() };
    return s;
  });

  return (
    <section id="top" className="relative overflow-hidden border-b-[3px] border-ink">
      {/* backdrop */}
      <div aria-hidden="true" className="grid-paper absolute inset-0" />
      
      {/* Animated Corner Papers */}
      <div
        aria-hidden="true"
        className="absolute -top-4 -left-4 hidden size-36 -rotate-12 border-[3px] border-ink bg-goog-yellow paper-shadow lg:block animate-float"
        style={{ animationDelay: '0s' }}
      />
      
      <div
        aria-hidden="true"
        className="absolute top-12 -right-12 hidden size-32 rotate-12 border-[3px] border-ink bg-goog-blue paper-shadow lg:block animate-float"
        style={{ animationDelay: '1.5s' }}
      />
      
      <div
        aria-hidden="true"
        className="absolute top-[65%] -left-12 hidden size-36 -rotate-6 border-[3px] border-ink bg-goog-green paper-shadow lg:block animate-float"
        style={{ animationDelay: '2.5s' }}
      />
      
      <div
        aria-hidden="true"
        className="absolute top-[65%] -right-8 hidden lg:flex size-48 items-center justify-center gear-shadow"
      >
        <svg 
          viewBox="0 0 100 100" 
          className="size-[85%] animate-spin-slow text-goog-red" 
          fill="currentColor" 
          stroke="var(--ink)" 
          strokeWidth="3" 
          strokeLinejoin="miter"
        >
          <path fillRule="evenodd" clipRule="evenodd" d="M 84.82514578473089 46.50583041736101 L 95 50 L 92.99014201065228 63.29840929976028 L 82.23713479010098 63.62964198080277 L 77.09584774669312 72.15434573369353 L 81.81980515339464 81.81980515339464 L 70.99522554505016 89.80201633475964 L 63.15748434633469 82.43270888587566 L 53.49416958263899 84.82514578473089 L 50 95 L 36.70159070023972 92.99014201065228 L 36.37035801919724 82.23713479010098 L 27.845654266306468 77.09584774669312 L 18.180194846605364 81.81980515339464 L 10.197983665240365 70.99522554505018 L 17.56729111412435 63.15748434633469 L 15.1748542152691 53.494169582638996 L 5 50.00000000000001 L 7.009857989347729 36.701590700239734 L 17.76286520989902 36.37035801919724 L 22.90415225330687 27.84565426630647 L 18.180194846605353 18.180194846605364 L 29.00477445494983 10.197983665240365 L 36.842515653665316 17.567291114124338 L 46.50583041736102 15.174854215269093 L 49.99999999999999 5 L 63.298409299760266 7.009857989347729 L 63.629641980802774 17.762865209899026 L 72.15434573369353 22.904152253306876 L 81.81980515339463 18.180194846605353 L 89.80201633475963 29.004774454949825 L 82.43270888587566 36.842515653665316 L 84.8251457847309 46.50583041736102 Z M 65 50 A 15 15 0 1 0 35 50 A 15 15 0 1 0 65 50 Z" />
        </svg>
      </div>

      <div
        aria-hidden="true"
        className="dots absolute left-1/2 top-1/4 hidden size-40 -translate-x-1/2 opacity-40 lg:block animate-spin-slow"
      />

      <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-12 lg:pt-12 lg:pb-24">
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

          <div className="brut brut-hover bg-card p-4 sm:p-5">
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
        <div className="relative mx-auto w-72 sm:w-80 lg:w-96 mt-12 lg:mt-0 lg:pl-8">
          {/* Subtle background accent */}
          <div className="absolute -top-4 -right-4 z-0 size-32 bg-goog-blue border-[3px] border-ink" />
          <div className="absolute -bottom-6 -left-6 z-0 size-24 rounded-full bg-goog-red border-[3px] border-ink" />
          
          {/* Polaroid / ID Card Frame */}
          <div className="brut-lg brut-hover relative z-10 mx-auto flex flex-col bg-card p-4 sm:p-5 rotate-2 transition-transform hover:rotate-0">
            <div className="relative w-full overflow-hidden border-[3px] border-ink bg-muted">
              <Image
                src="/images/portrait.png"
                alt="Portrait of Anshu Nandi"
                width={800}
                height={800}
                priority
                className="aspect-[4/5] w-full object-cover object-top grayscale-[20%] contrast-125"
              />
            </div>
            
            <div className="mt-4 flex items-center justify-between border-t-[3px] border-ink pt-3">
              <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
                ID: AN-2027
              </span>
              <div className="flex gap-1.5">
                <span className="size-3 rounded-full border-2 border-ink bg-goog-red" />
                <span className="size-3 rounded-full border-2 border-ink bg-goog-yellow" />
                <span className="size-3 rounded-full border-2 border-ink bg-goog-green" />
              </div>
            </div>
          </div>

          {/* Badges */}
          <div
            aria-hidden="true"
            className="absolute -top-6 left-2 z-20 hidden -rotate-6 border-[3px] border-ink bg-goog-yellow px-3 py-1.5 font-mono text-xs font-bold uppercase text-ink-static sm:block shadow-[4px_4px_0_0_#1e1e1e]"
          >
            <Sparkles className="mr-1 inline size-3.5" strokeWidth={3} /> LangGraph pilot
          </div>
          
          <div
            aria-hidden="true"
            className="absolute -bottom-2 -right-4 z-20 hidden rotate-6 border-[3px] border-ink bg-goog-green px-3 py-1.5 font-mono text-xs font-bold uppercase text-primary-foreground sm:block shadow-[4px_4px_0_0_#1e1e1e]"
          >
            {ghStats.totalCommits ? `${ghStats.totalCommits}+ commits / yr` : ghStats.totalContributions ? `${Math.round((ghStats.commitPercentage / 100) * ghStats.totalContributions)}+ commits / yr` : '550+ commits / yr'}
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
