'use client'

import { useEffect, useRef } from 'react'

import { requestScrollUpdate, useRafScroll } from '@/hooks/useRafScroll'
import { prefersReducedMotion } from '@/hooks/useReducedMotion'
import type { LeadTextBlock } from '@/payload-types'

import styles from './Component.module.css'

type Props = { items: NonNullable<LeadTextBlock['crossItems']> }

const H = 140 // svg height
const HIGH = 30 // y of a crest
const LOW = 110 // y of a trough
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const isMobile = () => window.matchMedia('(max-width: 900px)').matches

/** Crest/trough of the wave at each lane centre: lanes alternate, starting at a crest. */
const laneY = (i: number) => (i % 2 === 0 ? HIGH : LOW)

/**
 * The wave through n lanes of total width w. With 4 lanes and w = 1000 this is exactly the prototype path:
 * M0 110 C 60 110, 70 30, 125 30 S 300 110, 375 110 S 560 30, 625 30 S 800 110, 875 110 S 960 30, 1000 30
 */
const wavePath = (n: number, w: number) => {
  const s = w / n
  const x = (i: number) => (i + 0.5) * s
  const startY = laneY(0) === HIGH ? LOW : HIGH
  const endY = laneY(n - 1) === HIGH ? LOW : HIGH
  const f = (v: number) => v.toFixed(1)
  let d = `M0 ${startY} C ${f(0.24 * s)} ${startY}, ${f(0.28 * s)} ${laneY(0)}, ${f(x(0))} ${laneY(0)}`
  for (let i = 1; i < n; i++) d += ` S ${f(x(i) - 0.3 * s)} ${laneY(i)}, ${f(x(i))} ${laneY(i)}`
  d += ` S ${f(w - 0.16 * s)} ${endY}, ${f(w)} ${endY}`
  return d
}

/**
 * "One line across lanes" (Join Us): two to four columns; one orange line draws across all of them as
 * the diagram scrolls through the screen, lighting a dot at each lane it passes. On phones the lanes
 * become a 2 × 2 board and each lane lights a short marker instead.
 */
export function CrossDiagram({ items }: Props) {
  const n = items.length
  const rootRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const baseRef = useRef<SVGPathElement>(null)
  const lineRef = useRef<SVGPathElement>(null)
  const geo = useRef({ w: 0, len: 0 })

  // redraw the path in real pixels so the stroke never stretches and the dash draws as one clean line
  useEffect(() => {
    const svg = svgRef.current,
      base = baseRef.current,
      line = lineRef.current
    if (!svg || !base || !line) return
    const layout = () => {
      const w = svg.clientWidth
      if (!w || w === geo.current.w) return
      const d = wavePath(n, w)
      svg.setAttribute('viewBox', `0 0 ${w} ${H}`)
      base.setAttribute('d', d)
      line.setAttribute('d', d)
      const len = line.getTotalLength()
      geo.current = { w, len }
      line.style.strokeDasharray = `${len} ${len}`
      line.classList.add(styles.ready)
      requestScrollUpdate()
    }
    layout()
    const ro = new ResizeObserver(layout)
    ro.observe(svg)
    return () => ro.disconnect()
  }, [n])

  useRafScroll(
    () => {
      const root = rootRef.current
      if (!root) return null
      const vh = window.innerHeight
      const reduce = prefersReducedMotion()
      if (isMobile()) {
        const lanes = [...root.querySelectorAll<HTMLElement>('[data-lane]')]
        return { mobile: true, p: 0, lit: lanes.map((l) => reduce || l.getBoundingClientRect().top < vh * 0.8) }
      }
      const top = root.getBoundingClientRect().top
      return { mobile: false, p: reduce ? 1 : clamp((vh * 0.85 - top) / (vh * 0.65)), lit: [] as boolean[] }
    },
    (s) => {
      const root = rootRef.current,
        line = lineRef.current
      if (!s || !root || !line) return
      const lanes = root.querySelectorAll<HTMLElement>('[data-lane]')
      if (s.mobile) {
        lanes.forEach((l, i) => l.classList.toggle(styles.lit, Boolean(s.lit[i])))
        return
      }
      const { w, len } = geo.current
      if (!len) return
      line.style.strokeDashoffset = String(len * (1 - s.p))
      const headX = s.p > 0 ? line.getPointAtLength(len * s.p).x : -1
      root.querySelectorAll<HTMLElement>('[data-dot]').forEach((d, i) => {
        d.classList.toggle(styles.on, headX >= (w * (i + 0.5)) / n - 1)
      })
    },
  )

  return (
    <div ref={rootRef} className={styles.cross} style={{ ['--lanes' as string]: n }}>
      {items.map((it, i) => (
        <div key={it.id ?? i} className={styles.lane2} data-lane="">
          {it.label && <span className={styles.lane2K}>{it.label}</span>}
          {/* h2 like the Weave diagram's lane names: no heading level is skipped after the page title (E2E-8-4) */}
          <h2 className={styles.lane2T}>{it.name}</h2>
          {it.text && <p className={styles.lane2D}>{it.text}</p>}
        </div>
      ))}
      <svg ref={svgRef} className={styles.crossSvg} viewBox={`0 0 1000 ${H}`} aria-hidden="true">
        <path ref={baseRef} className={styles.crossBase} d={wavePath(n, 1000)} />
        <path ref={lineRef} className={styles.crossHot} d={wavePath(n, 1000)} />
      </svg>
      {items.map((_, i) => (
        <span
          key={i}
          className={styles.crossDot}
          data-dot=""
          style={{ left: `${((i + 0.5) * 100) / n}%`, bottom: `${H - laneY(i) + 24}px` }}
        />
      ))}
    </div>
  )
}
