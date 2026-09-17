import type React from 'react'
import { cn } from '@/lib/utils'
import { swatch, type GoogColor } from '@/lib/data'

/* Thin decorative bar of the four Google colors */
export function GoogleBar({
  className,
  vertical = false,
}: {
  className?: string
  vertical?: boolean
}) {
  return (
    <div
      aria-hidden="true"
      className={cn('flex', vertical ? 'flex-col w-3 h-full' : 'h-3 w-full', className)}
    >
      <div className="flex-1 bg-goog-blue" />
      <div className="flex-1 bg-goog-red" />
      <div className="flex-1 bg-goog-yellow" />
      <div className="flex-1 bg-goog-green" />
    </div>
  )
}

/* Section heading with an oversized index number + colored underline block */
export function SectionHeading({
  index,
  title,
  kicker,
  color,
  className,
}: {
  index: string
  title: string
  kicker?: string
  color: GoogColor
  className?: string
}) {
  return (
    <header className={cn('flex flex-col gap-3', className)}>
      <div className="flex items-center gap-3">
        <span
          className={cn(
            'brut-sm inline-flex h-8 items-center px-2 font-mono text-xs font-bold tracking-widest',
            color === 'yellow' ? 'text-ink-static' : 'text-primary-foreground',
            swatch[color].bg,
          )}
        >
          {index}
        </span>
        {kicker ? (
          <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground">
            {kicker}
          </span>
        ) : null}
      </div>
      <h2 className="font-display text-4xl leading-[0.95] tracking-tight text-balance uppercase sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      <div className={cn('h-2 w-24 border-[3px] border-ink', swatch[color].bg)} />
    </header>
  )
}

/* Generic hard-edged card */
export function Card({
  children,
  className,
  as: Tag = 'div',
  hover = false,
}: {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
  hover?: boolean
}) {
  return (
    <Tag
      className={cn(
        'brut bg-card text-card-foreground',
        hover && 'brut-hover',
        className,
      )}
    >
      {children}
    </Tag>
  )
}

/* Small pill tag */
export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center border-2 border-ink bg-background px-2 py-0.5 font-mono text-[11px] font-bold tracking-wide',
        className,
      )}
    >
      {children}
    </span>
  )
}

/* Section wrapper */
export function Section({
  id,
  children,
  className,
}: {
  id?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section id={id} className={cn('scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24', className)}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  )
}
