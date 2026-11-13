'use client'

import { useRef } from 'react'

import { useRafScroll } from '@/hooks/useRafScroll'
import { prefersReducedMotion } from '@/hooks/useReducedMotion'

type Props = { text: string; className?: string; wordClassName: string; onClassName: string }

const clamp = (v: number) => Math.min(1, Math.max(0, v))

/** A paragraph whose words light up one by one as it scrolls through the viewport. */
export function WordReveal({ text, className, wordClassName, onClassName }: Props) {
  const ref = useRef<HTMLParagraphElement>(null)
  const shown = useRef(-1)
  const words = text.trim().split(/\s+/)

  useRafScroll(
    () => {
      const r = ref.current?.getBoundingClientRect()
      const vh = window.innerHeight
      if (!r) return 0
      return prefersReducedMotion()
        ? words.length
        : Math.round(clamp((vh * 0.85 - r.top) / (r.height + vh * 0.35)) * words.length)
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
          <span className={wordClassName}>{w}</span>
          {i < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </p>
  )
}
