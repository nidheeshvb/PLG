'use client'

import { useRef, type ReactNode } from 'react'

import { useRafScroll } from '@/hooks/useRafScroll'
import { prefersReducedMotion } from '@/hooks/useReducedMotion'

type Props = {
  children: ReactNode
  className?: string
  /**
   * - "top": for page-top banners; moves down at `factor` × scroll distance while near the top.
   * - "section": for backgrounds further down; drifts by up to `range`px as its section crosses the screen.
   */
  mode?: 'top' | 'section'
  factor?: number
  range?: number
}

/** Wraps a background so it moves slower than the page. Off for visitors who prefer reduced motion. */
export function Parallax({ children, className, mode = 'top', factor = 0.35, range = 80 }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useRafScroll(
    () => {
      const el = ref.current
      if (!el || prefersReducedMotion()) return null
      const y = window.scrollY,
        vh = window.innerHeight
      if (mode === 'top') return y < vh * 1.2 ? y * factor : null
      const r = (el.parentElement ?? el).getBoundingClientRect()
      if (r.bottom <= 0 || r.top >= vh) return null
      const p = (vh - r.top) / (vh + r.height)
      return (p - 0.5) * -range
    },
    (offset) => {
      if (offset == null || !ref.current) return
      ref.current.style.transform = `translate3d(0,${offset.toFixed(1)}px,0)`
    },
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
