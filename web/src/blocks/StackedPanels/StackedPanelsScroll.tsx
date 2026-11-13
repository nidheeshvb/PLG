'use client'

import { useEffect, useRef, type ReactNode } from 'react'

import { useRafScroll } from '@/hooks/useRafScroll'
import { prefersReducedMotion } from '@/hooks/useReducedMotion'

type Props = {
  children: ReactNode
  id?: string | null
  className: string
  innerClass: string
  shadeClass: string
}

const clamp = (v: number) => Math.min(1, Math.max(0, v))

/**
 * Scroll behaviour for the stacked panels. A panel taller than the screen pins only once its
 * bottom edge is in view; as the next panel slides over, the current one scales down and darkens.
 */
export function StackedPanelsScroll({ children, id, className, innerClass, shadeClass }: Props) {
  const ref = useRef<HTMLElement>(null)
  const panels = () => [...(ref.current?.querySelectorAll<HTMLElement>(':scope > [data-panel]') ?? [])]
  const last = useRef<number[]>([])

  useEffect(() => {
    const pin = () =>
      panels().forEach((p) => {
        p.style.top = `${Math.min(0, window.innerHeight - p.offsetHeight)}px`
      })
    pin()
    window.addEventListener('resize', pin)
    window.addEventListener('load', pin)
    return () => {
      window.removeEventListener('resize', pin)
      window.removeEventListener('load', pin)
    }
  }, [])

  useRafScroll(
    () => {
      const ps = panels()
      const vh = window.innerHeight
      return ps.slice(0, -1).map((p, i) => {
        const nextTop = ps[i + 1].getBoundingClientRect().top
        const overflow = Math.max(0, p.getBoundingClientRect().bottom - vh)
        return +clamp(1 - (nextTop - overflow) / vh).toFixed(3)
      })
    },
    (ks) => {
      const ps = panels()
      const reduce = prefersReducedMotion()
      ks.forEach((k, i) => {
        if (last.current[i] === k) return
        last.current[i] = k
        const inner = ps[i].querySelector<HTMLElement>(`.${innerClass}`)
        const shade = ps[i].querySelector<HTMLElement>(`.${shadeClass}`)
        if (inner && !reduce) inner.style.transform = `scale(${(1 - k * 0.08).toFixed(4)})`
        if (shade) shade.style.opacity = (k * 0.6).toFixed(3)
      })
    },
  )

  return (
    <section ref={ref} id={id || undefined} className={className}>
      {children}
    </section>
  )
}
