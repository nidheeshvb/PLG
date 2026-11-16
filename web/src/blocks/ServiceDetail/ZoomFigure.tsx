'use client'

import { type ReactNode, useRef } from 'react'

import { useRafScroll } from '@/hooks/useRafScroll'
import { prefersReducedMotion } from '@/hooks/useReducedMotion'

const clamp = (v: number) => Math.min(1, Math.max(0, v))

/** A figure whose image settles from a slight zoom (1.12 → 1) as it crosses the screen. Sets `--s`. */
export function ZoomFigure({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null)
  useRafScroll(
    () => {
      const el = ref.current
      if (!el || prefersReducedMotion()) return null
      const b = el.getBoundingClientRect()
      const vh = window.innerHeight
      return 1.12 - clamp((vh - b.top) / (vh + b.height)) * 0.12
    },
    (s) => {
      if (s != null) ref.current?.style.setProperty('--s', s.toFixed(4))
    },
  )
  return (
    <figure ref={ref} className={className} data-reveal="">
      {children}
    </figure>
  )
}
