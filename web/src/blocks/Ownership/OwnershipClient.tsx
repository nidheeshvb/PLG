'use client'

import { useEffect, useRef, type CSSProperties } from 'react'

import { prefersReducedMotion } from '@/hooks/useReducedMotion'
import type { OwnershipBlock } from '@/payload-types'

import styles from './Component.module.css'

type Level = NonNullable<OwnershipBlock['levels']>[number]

const clamp = (v: number) => Math.min(1, Math.max(0, v))

/** "1852" → [_, '1852', ''], "50+" → [_, '50', '+'], text → null */
const parseCount = (value: string) => /^(\d+)(\D*)$/.exec(value.trim())

/** A fact value. Numbers ("1852", "50+") count up once in view; years start just below. Text stays as is. */
export function FactValue({ value }: { value: string }) {
  const ref = useRef<HTMLElement>(null)
  const m = parseCount(value)

  useEffect(() => {
    const el = ref.current
    const m = parseCount(value)
    if (!el || !m) return
    const end = Number(m[1]),
      suffix = m[2],
      // a bare 4-digit number reads as a year: count the last few decades only
      start = !suffix && end >= 1000 ? end - 60 : 0
    const io = new IntersectionObserver(
      (es) => {
        if (!es[0].isIntersecting) return
        io.disconnect()
        const dur = prefersReducedMotion() ? 0 : 1400,
          t0 = performance.now()
        const tick = (t: number) => {
          const p = dur ? clamp((t - t0) / dur) : 1
          el.textContent = Math.round(start + (end - start) * (1 - Math.pow(1 - p, 3))) + suffix
          if (p < 1) requestAnimationFrame(tick)
        }
        tick(t0)
      },
      { threshold: 0.5 },
    )
    io.observe(el.parentElement?.parentElement ?? el)
    return () => io.disconnect()
  }, [value])

  if (m) return <b ref={ref}>{value}</b>
  const parts = value.split(/\s+·\s+/)
  return (
    <b>
      {parts.map((p, i) => (
        <span key={i}>
          {i > 0 && (
            <>
              {' '}
              <span className={styles.sep}>·</span>{' '}
            </>
          )}
          {p}
        </span>
      ))}
    </b>
  )
}

function Box({ levels, depth }: { levels: Level[]; depth: number }) {
  const lv = levels[depth]
  if (!lv) return null
  const isLast = depth === levels.length - 1
  return (
    <div
      className={[styles.box, styles[`box${Math.min(depth, 2)}`], isLast && styles.hot].filter(Boolean).join(' ')}
      style={{ '--i': depth } as CSSProperties}
      tabIndex={0}
      data-box=""
      data-home={isLast ? '' : undefined}
    >
      <div className={styles.boxHead}>
        <p className={styles.meta}>
          <i />
          {lv.tag && <b>{lv.tag}</b>}
          {lv.detail && <span>{lv.detail}</span>}
        </p>
        <h3 className={styles.name}>{lv.name}</h3>
        {lv.text && <p className={styles.txt}>{lv.text}</p>}
        {lv.figure && (
          <p className={styles.fig}>
            {lv.figure}
            {lv.figureLabel && <small>{lv.figureLabel}</small>}
          </p>
        )}
      </div>
      <Box levels={levels} depth={depth + 1} />
    </div>
  )
}

/**
 * Nested frames. The innermost level is lit by default; pointing at (or focusing) another level
 * lights that one instead (innermost under the pointer wins).
 */
export function Ledger({ levels, label }: { levels: Level[]; label: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const nest = ref.current
    if (!nest) return
    const boxes = [...nest.querySelectorAll<HTMLElement>('[data-box]')]
    const home = nest.querySelector<HTMLElement>('[data-home]')
    let cur: HTMLElement | null = home,
      t = 0
    const set = (b: HTMLElement | null) => {
      if (b === cur) return
      cur = b
      boxes.forEach((x) => x.classList.toggle(styles.hot, x === b))
    }
    const light = (b: HTMLElement | null, delay = 90) => {
      window.clearTimeout(t)
      t = window.setTimeout(() => set(b), delay)
    }
    const boxOf = (e: Event) => (e.target as HTMLElement).closest<HTMLElement>('[data-box]')
    const onOver = (e: PointerEvent) => {
      const b = boxOf(e)
      if (b) light(b)
    }
    const onLeave = () => light(home, 160)
    const onFocusIn = (e: FocusEvent) => {
      const b = boxOf(e)
      if (b) light(b)
    }
    const onFocusOut = (e: FocusEvent) => {
      if (!nest.contains(e.relatedTarget as Node | null)) light(home)
    }
    nest.addEventListener('pointerover', onOver)
    nest.addEventListener('pointerleave', onLeave)
    nest.addEventListener('focusin', onFocusIn)
    nest.addEventListener('focusout', onFocusOut)
    return () => {
      window.clearTimeout(t)
      nest.removeEventListener('pointerover', onOver)
      nest.removeEventListener('pointerleave', onLeave)
      nest.removeEventListener('focusin', onFocusIn)
      nest.removeEventListener('focusout', onFocusOut)
    }
  }, [levels.length])

  return (
    <div ref={ref} className={styles.ledger} role="figure" aria-label={label} data-inview="">
      <Box levels={levels} depth={0} />
    </div>
  )
}
