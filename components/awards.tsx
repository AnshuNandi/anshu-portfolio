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
      <div aria-hidden="true" className="dots absolute inset-0 opacity-50 z-0" />
      
      {/* Google I/O Authentic Graphics - Edge Anchored (Responsive) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Subtle Red quarter-circle tucked in the top right */}
        <div className="absolute -top-[25px] md:-top-[50px] -right-[25px] md:-right-[50px] w-[100px] md:w-[200px] h-[100px] md:h-[200px] rounded-bl-full bg-[var(--goog-red)] opacity-30" />
        
        {/* Subtle blue plus grid on the far left edge */}
        <div className="absolute top-[20%] left-[2%] w-[72px] md:w-[150px] h-[72px] md:h-[150px] opacity-[0.25] bg-[length:18px_18px] md:bg-[length:30px_30px]"
             style={{ 
               backgroundImage: `url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30'%3E%3Cpath d='M14 6v18h2V6zM6 14v2h18v-2z' fill='%234285f4' /%3E%3C/svg%3E")`
             }} />
        
        {/* Yellow plus grid subtle on bottom right */}
        <div className="absolute bottom-[5%] right-[2%] w-[72px] md:w-[150px] h-[72px] md:h-[150px] opacity-[0.25] bg-[length:18px_18px] md:bg-[length:30px_30px]"
             style={{ 
               backgroundImage: `url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30'%3E%3Cpath d='M14 6v18h2V6zM6 14v2h18v-2z' fill='%23fbbc05' /%3E%3C/svg%3E")`
             }} />
             
        {/* Faint green glow anchoring the bottom left */}
        <div className="absolute -bottom-[50px] md:-bottom-[100px] -left-[50px] md:-left-[100px] w-[200px] md:w-[400px] h-[200px] md:h-[400px] rounded-[100%] bg-[var(--goog-green)] opacity-[0.15] blur-3xl" />
      </div>
      
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
                  {stats.totalContributions ? `${stats.totalContributions} contributions this year` : `${stats.totalRepos} repositories`}
                </h3>
                <span className="border-2 border-paper px-2 py-0.5 font-mono text-[10px] font-bold tracking-widest uppercase text-paper">
                  @{'AnshuNandi'}
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <SnakeGame weeks={stats.weeks}>
                  <p className="mt-auto pt-4 font-mono text-[11px] text-muted-foreground">
                    Live contribution rhythm · {stats.totalRepos} repositories
                    {stats.commitPercentage !== null ? ` · ${stats.commitPercentage}% commits` : ''}
                    {stats.prPercentage !== null ? ` · ${stats.prPercentage}% pull requests` : ''}
                  </p>
                </SnakeGame>
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
