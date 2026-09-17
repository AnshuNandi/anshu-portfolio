import { marqueeWords } from '@/lib/data'
import { cn } from '@/lib/utils'

const dotColors = ['bg-goog-blue', 'bg-goog-red', 'bg-goog-yellow', 'bg-goog-green']

export function Marquee({
  reverse = false,
  className,
}: {
  reverse?: boolean
  className?: string
}) {
  const words = [...marqueeWords, ...marqueeWords]
  return (
    <div
      aria-hidden="true"
      className={cn(
        'flex w-full max-w-full overflow-x-hidden border-y-[3px] border-ink bg-ink py-3 select-none dark:bg-zinc-950',
        className,
      )}
    >
      <div
        className={cn(
          'flex w-max shrink-0 items-center gap-6 pr-6',
          reverse ? 'animate-marquee-reverse' : 'animate-marquee',
        )}
      >
        {words.map((w, i) => (
          <span key={`${w}-${i}`} className="flex items-center gap-6">
            <span className="font-display text-xl whitespace-nowrap text-paper uppercase sm:text-2xl dark:text-zinc-50">
              {w}
            </span>
            <span className={cn('size-3 rotate-45 shrink-0', dotColors[i % 4])} />
          </span>
        ))}
      </div>
    </div>
  )
}
