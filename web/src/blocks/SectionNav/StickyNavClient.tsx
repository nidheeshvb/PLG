'use client'

import { useRef } from 'react'

import type { SectionNavItem } from '@/blocks/context'
import { StickyBar, stickyBarStyles as styles } from '@/components/ui/StickyBar/StickyBar'
import { useRafScroll } from '@/hooks/useRafScroll'
import { prefersReducedMotion } from '@/hooks/useReducedMotion'

const clamp = (v: number) => Math.min(1, Math.max(0, v))

/**
 * Numbered section menu in the sticky bar (Services). The section crossing 35% of the screen is
 * active, and its underline fills as you read through it.
 */
export function StickyNavClient({ items, label }: { items: SectionNavItem[]; label: string }) {
  const innerRef = useRef<HTMLDivElement>(null)
  const active = useRef<string | null>(null)

  useRafScroll(
    () => {
      const line = window.innerHeight * 0.35
      let cur: string | null = null,
        p = 0
      for (const { id } of items) {
        const r = document.getElementById(id)?.getBoundingClientRect()
        if (r && r.top <= line && r.bottom > line) {
          cur = id
          p = clamp((line - r.top) / r.height)
        }
      }
      return { cur, p }
    },
    ({ cur, p }) => {
      const inner = innerRef.current
      if (!inner) return
      inner.querySelectorAll<HTMLAnchorElement>('a[data-for]').forEach((a) => {
        const on = a.dataset.for === cur
        a.classList.toggle(styles.active, on)
        if (on) {
          a.style.setProperty('--p', p.toFixed(3))
          a.setAttribute('aria-current', 'true')
        } else a.removeAttribute('aria-current')
      })
      if (cur !== active.current) {
        active.current = cur
        const a = inner.querySelector<HTMLAnchorElement>(`a[data-for="${cur}"]`)
        if (a && inner.scrollWidth > inner.clientWidth)
          inner.scrollTo({ left: a.offsetLeft - 24, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
      }
    },
  )

  return (
    <StickyBar label={label} innerRef={innerRef}>
      {items.map(({ id, label: l }, i) => (
        <a key={id} href={`#${id}`} data-for={id}>
          <small>{String(i + 1).padStart(2, '0')}</small>
          {l}
        </a>
      ))}
    </StickyBar>
  )
}
