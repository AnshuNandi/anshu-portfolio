import { Trophy } from 'lucide-react'
import { achievements, swatch } from '@/lib/data'
import { Section, SectionHeading } from './brutal'
import { cn } from '@/lib/utils'
import { getGithubStats } from '@/lib/github'
import { SnakeGame } from './snake-game'

export async function Awards() {
  const stats = await getGithubStats();
  
  const langs = stats.langs || [
    { name: 'Python', pct: 42, color: 'bg-goog-blue' },
    { name: 'TypeScript / JS', pct: 26, color: 'bg-goog-yellow' },
    { name: 'Jupyter Notebook', pct: 18, color: 'bg-goog-red' },
    { name: 'C / C++ / Java', pct: 10, color: 'bg-goog-green' },
    { name: 'Go', pct: 3, color: 'bg-goog-blue' },
    { name: 'Rust', pct: 1, color: 'bg-goog-yellow' },
  ];

  return (
    <Section id="awards" className="relative border-b-[3px] border-ink overflow-hidden">
      {/* backdrop */}
      <div aria-hidden="true" className="dots absolute inset-0 opacity-50" />
      
      <div className="relative z-10 flex flex-col gap-10">
        <SectionHeading index="05" kicker="Receipts" title="Awards & activity" color="blue" />

        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          
          {/* Left Column: Achievements + Heatmap */}
          <div className="flex flex-col gap-6">
            <ul className="grid gap-5 sm:grid-cols-2">
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

            <div className="brut brut-hover bg-card min-w-0 h-full flex flex-col">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b-[3px] border-ink bg-goog-green px-4 py-3">
                <h3 className="font-display text-base uppercase text-primary-foreground">
                  {stats.totalContributions ? `${stats.totalContributions}+ contributions this year` : `${stats.totalRepos} repositories`}
                </h3>
                <span className="border-2 border-paper px-2 py-0.5 font-mono text-[10px] font-bold tracking-widest uppercase text-paper">
                  @{'AnshuNandi'}
                </span>
              </div>
              <div className="p-4 flex-1">
                <SnakeGame weeks={stats.weeks} />
              </div>
            </div>
          </div>

          {/* Right Column: Languages */}
          <div className="brut brut-hover bg-card h-full flex flex-col">
            <div className="border-b-[3px] border-ink bg-goog-yellow px-4 py-3">
              <h3 className="font-display text-base uppercase text-ink-static">
                Most used languages
              </h3>
            </div>
            <ul className="flex flex-col justify-between flex-1 gap-4 p-4 pb-6">
              {langs.map((l: { name: string; pct: number; color: string }) => (
                <li key={l.name}>
                  <div className="flex items-baseline justify-between font-mono text-[11px] font-bold uppercase mb-1.5">
                    <span>{l.name}</span>
                    <span>{l.pct}%</span>
                  </div>
                  <div className="h-5 border-2 border-ink bg-background">
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
