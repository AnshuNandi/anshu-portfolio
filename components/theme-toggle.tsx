'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className={cn(
        'brut-sm brut-hover brut-press grid size-9 place-items-center bg-ink text-paper transition-colors hover:opacity-80',
        className,
      )}
      aria-label="Toggle dark mode"
    >
      {/* Always render an icon to keep layout stable; swap after mount */}
      {mounted && resolvedTheme === 'dark' ? (
        <Sun className="size-4" strokeWidth={2.5} />
      ) : (
        <Moon className="size-4" strokeWidth={2.5} />
      )}
    </button>
  )
}
