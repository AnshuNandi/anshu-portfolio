'use client'

import { useRef, useEffect, useState } from 'react'
import { roles } from '@/lib/data'

export function Typewriter() {
  const [display, setDisplay] = useState('')
  const roleIndex = useRef(0)
  const charIndex = useRef(0)
  const isDeleting = useRef(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    function tick() {
      const currentRole = roles[roleIndex.current % roles.length]

      if (!isDeleting.current) {
        // Typing forward
        charIndex.current += 1
        setDisplay(currentRole.slice(0, charIndex.current))

        if (charIndex.current === currentRole.length) {
          // Pause at end before deleting
          timer.current = setTimeout(() => {
            isDeleting.current = true
            tick()
          }, 1400)
          return
        }
      } else {
        // Deleting
        charIndex.current -= 1
        setDisplay(currentRole.slice(0, charIndex.current))

        if (charIndex.current === 0) {
          // Move to next role
          isDeleting.current = false
          roleIndex.current += 1
        }
      }

      timer.current = setTimeout(tick, isDeleting.current ? 34 : 62)
    }

    // Start the ticker
    timer.current = setTimeout(tick, 62)

    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <span className="font-mono">
      {display}
      <span className="animate-cursor ml-0.5 inline-block h-[1em] w-[0.55ch] translate-y-[0.1em] bg-ink align-middle" />
      <span className="sr-only">{roles.join(', ')}</span>
    </span>
  )
}
