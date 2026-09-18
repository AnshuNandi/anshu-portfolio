import { Trophy } from 'lucide-react'
import { achievements, swatch } from '@/lib/data'
import { Section, SectionHeading } from './brutal'
import { cn } from '@/lib/utils'
import { getGithubStats } from '@/lib/github'

function ContributionGrid({ weeks }: { weeks?: any[] }) {
  if (!weeks || weeks.length === 0) {
    const cells = Array.from({ length: 7 * 30 }, (_, i) => {
      const s = Math.sin(i * 12.9898) * 43758.5453
      return Math.floor((s - Math.floor(s)) * 10)
    })
    const toneFallback = (v: number) =>
      v > 8 ? 'bg-goog-green' : v > 6 ? 'bg-goog-green/70' : v > 4 ? 'bg-goog-green/45' : v > 2 ? 'bg-goog-green/20' : 'bg-background'
    return (
      <div aria-hidden="true" className="grid grid-flow-col grid-rows-7 gap-1 overflow-hidden">
        {cells.map((v, i) => (
          <span key={i} className={cn('size-2.5 border border-ink/50 sm:size-3', toneFallback(v))} />
        ))}
      </div>
    )
  }

  let maxCount = 1;
  weeks.forEach(w => w.contributionDays.forEach((d: any) => {
    if (d.contributionCount > maxCount) maxCount = d.contributionCount;
  }));

  const tone = (count: number) => {
    if (count === 0) return 'bg-background';
    const ratio = count / maxCount;
    if (ratio > 0.75) return 'bg-goog-green';
    if (ratio > 0.50) return 'bg-goog-green/70';
    if (ratio > 0.25) return 'bg-goog-green/45';
    return 'bg-goog-green/20';
  }

  return (
    <div className="grid grid-flow-col grid-rows-7 gap-1 min-w-max">
      {weeks.map((week, wIdx) => (
        week.contributionDays.map((day: any, dIdx: number) => (
          <span 
            key={`${wIdx}-${dIdx}`} 
            title={`${day.contributionCount} contributions on ${day.date}`}
            className={cn('size-2.5 border border-ink/50 sm:size-3', tone(day.contributionCount))} 
          />
        ))
      ))}
    </div>
  )
}

export async function Awards() {
  const stats = await getGithubStats();
  
  const langs = stats.langs || [
    { name: 'Python', pct: 42, color: 'bg-goog-blue' },
    { name: 'TypeScript / JS', pct: 26, color: 'bg-goog-yellow' },
    { name: 'Jupyter Notebook', pct: 18, color: 'bg-goog-red' },
    { name: 'C / C++ / Java', pct: 14, color: 'bg-goog-green' },
  ];

  return (
    <Section id="awards" className="border-b-[3px] border-ink">
      <div className="flex flex-col gap-10">
        <SectionHeading index="05" kicker="Receipts" title="Awards & activity" color="blue" />

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((a) => (
            <li key={a.title} className="brut brut-hover flex flex-col bg-card">
              <div
                className={cn(
                  'flex items-center justify-between border-b-[3px] border-ink px-4 py-3',
                  swatch[a.color].bg,
                  a.color === 'yellow' ? 'text-ink-static' : 'text-primary-foreground',
                )}
              >
                <span className="font-display text-2xl leading-none">{a.place}</span>
                <Trophy className="size-5" strokeWidth={2.75} />
              </div>
              <div className="flex flex-1 flex-col gap-1 p-4">
                <h3 className="font-display text-sm uppercase leading-snug">{a.title}</h3>
                <p className="text-xs text-muted-foreground">{a.org}</p>
                <p className="mt-auto pt-2 font-mono text-[11px] font-bold">{a.date}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="brut bg-card">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b-[3px] border-ink bg-ink px-4 py-3 dark:bg-zinc-800">
              <h3 className="font-display text-base uppercase text-paper dark:text-zinc-50">
                {stats.totalContributions ? `${stats.totalContributions}+ contributions this year` : `${stats.totalRepos} repositories`}
              </h3>
              <span className="border-2 border-paper px-2 py-0.5 font-mono text-[10px] font-bold tracking-widest uppercase text-goog-yellow">
                @{'AnshuNandi'}
              </span>
            </div>
            <div className="overflow-x-auto p-4 custom-scrollbar">
              <ContributionGrid weeks={stats.weeks} />
              <p className="mt-3 font-mono text-[11px] text-muted-foreground">
                Live contribution rhythm · {stats.totalRepos} repositories
                {stats.commitPercentage !== null ? ` · ${stats.commitPercentage}% commits` : ''}
                {stats.prPercentage !== null ? ` · ${stats.prPercentage}% pull requests` : ''}
              </p>
            </div>
          </div>

          <div className="brut bg-card">
            <div className="border-b-[3px] border-ink bg-goog-red px-4 py-3">
              <h3 className="font-display text-base uppercase text-primary-foreground">
                Most used languages
              </h3>
            </div>
            <ul className="flex flex-col gap-3 p-4">
              {langs.map((l) => (
                <li key={l.name}>
                  <div className="flex items-baseline justify-between font-mono text-[11px] font-bold uppercase">
                    <span>{l.name}</span>
                    <span>{l.pct}%</span>
                  </div>
                  <div className="mt-1 h-4 border-2 border-ink bg-background">
                    <div className={cn('h-full', l.color)} style={{ width: `${l.pct}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  )
}
