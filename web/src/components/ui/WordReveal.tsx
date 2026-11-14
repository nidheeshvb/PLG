'use client'

import { useRef } from 'react'

import { useRafScroll } from '@/hooks/useRafScroll'
import { prefersReducedMotion } from '@/hooks/useReducedMotion'

type Props = {
  text: string
  className?: string
  wordClassName: string
  onClassName: string
  /** Indexes of words (text split on whitespace) that get `highlightClassName` (e.g. orange). */
  highlighted?: number[]
  highlightClassName?: string
  /** Lighting starts when the top of the text is at `start` × viewport height… */
  start?: number
  /** …and finishes after scrolling the text's height plus `span` × viewport height. */
  span?: number
}

const clamp = (v: number) => Math.min(1, Math.max(0, v))

/** A paragraph whose words light up one by one as it scrolls through the viewport. */
export function WordReveal({
  text,
  className,
  wordClassName,
  onClassName,
  highlighted,
  highlightClassName,
  start = 0.85,
  span = 0.35,
}: Props) {
  const ref = useRef<HTMLParagraphElement>(null)
  const shown = useRef(-1)
  const words = text.trim().split(/\s+/)
  const hl = new Set(highlighted)

  useRafScroll(
    () => {
      const r = ref.current?.getBoundingClientRect()
      const vh = window.innerHeight
      if (!r) return 0
      return prefersReducedMotion()
        ? words.length
        : Math.round(clamp((vh * start - r.top) / (r.height + vh * span)) * words.length)
    },
    (n) => {
      if (n === shown.current || !ref.current) return
      shown.current = n
      ref.current.querySelectorAll(`.${wordClassName}`).forEach((w, i) => w.classList.toggle(onClassName, i < n))
    },
  )

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i}>
          <span className={hl.has(i) && highlightClassName ? `${wordClassName} ${highlightClassName}` : wordClassName}>
            {w}
          </span>
          {i < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </p>
  )
}
