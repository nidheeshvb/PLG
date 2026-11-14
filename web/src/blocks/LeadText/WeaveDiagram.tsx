'use client'

import { useEffect, useRef } from 'react'

import { Media } from '@/components/ui/Media'
import { requestScrollUpdate, useRafScroll } from '@/hooks/useRafScroll'
import { prefersReducedMotion } from '@/hooks/useReducedMotion'
import type { LeadTextBlock } from '@/payload-types'

import styles from './Component.module.css'

type Props = Pick<LeadTextBlock, 'weaveItems' | 'weaveStartLabel' | 'weaveEndLabel' | 'weaveResult' | 'weaveNote'>

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
const isMobile = () => window.matchMedia('(max-width: 900px)').matches

/**
 * "Lanes into one": rows (lanes) on the left; from each lane's marker a line curves into one point,
 * then an orange line runs to the result (logo + name). Lines are laid out from the real marker
 * positions and draw as the diagram scrolls through the screen. On phones the lanes stack and
 * one vertical rail fills instead.
 */
export function WeaveDiagram({ weaveItems, weaveStartLabel, weaveEndLabel, weaveResult, weaveNote }: Props) {
  const items = weaveItems ?? []
  const n = items.length
  const rootRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const markRef = useRef<HTMLSpanElement>(null)
  const lens = useRef<number[]>([])

  // lay the lines out from the lane markers (and again whenever the size changes)
  useEffect(() => {
    const weave = rootRef.current,
      svg = svgRef.current,
      mark = markRef.current
    if (!weave || !svg || !mark) return
    const layout = () => {
      const wr = weave.getBoundingClientRect()
      const lanes = [...weave.querySelectorAll<HTMLElement>('[data-lane]')]
      const midY = (el: Element) => {
        const r = el.getBoundingClientRect()
        return r.top + r.height / 2
      }
      if (!lanes.length) return
      if (isMobile()) {
        const top = midY(lanes[0]) - wr.top,
          end = midY(mark) - wr.top
        weave.style.setProperty('--rt', `${top}px`)
        weave.style.setProperty('--rh', `${Math.max(0, end - top)}px`)
        return
      }
      const sr = svg.getBoundingClientRect(),
        w = sr.width,
        h = sr.height
      if (!w || !h) return
      svg.setAttribute('viewBox', `0 0 ${w} ${h}`)
      const ys = lanes.map((l) => midY(l) - sr.top)
      const ey = clamp(midY(mark) - sr.top, 0, h)
      const cx = w * 0.62
      const d = ys.map((y) => `M0 ${y} C ${cx * 0.5} ${y}, ${cx * 0.5} ${ey}, ${cx} ${ey}`)
      d.push(`M${cx} ${ey} L ${w} ${ey}`)
      const ghosts = svg.querySelectorAll<SVGPathElement>('[data-ghost]')
      const draws = svg.querySelectorAll<SVGPathElement>('[data-draw]')
      d.forEach((s, i) => {
        ghosts[i]?.setAttribute('d', s)
        const p = draws[i]
        if (!p) return
        p.setAttribute('d', s)
        lens.current[i] = p.getTotalLength()
        p.style.strokeDasharray = String(lens.current[i])
      })
      const dot = svg.querySelector('circle')
      dot?.setAttribute('cx', String(cx))
      dot?.setAttribute('cy', String(ey))
    }
    const relayout = () => {
      layout()
      requestScrollUpdate()
    }
    relayout()
    const ro = new ResizeObserver(relayout)
    ro.observe(weave)
    window.addEventListener('resize', relayout)
    window.addEventListener('load', relayout)
    document.fonts?.ready.then(relayout)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', relayout)
      window.removeEventListener('load', relayout)
    }
  }, [n])

  // draw with scroll: the lane lines start together, meet, then the orange line runs to the result
  useRafScroll(
    () => {
      const r = rootRef.current?.getBoundingClientRect()
      if (!r) return 0
      const vh = window.innerHeight
      return prefersReducedMotion() ? 1 : clamp((vh * 0.8 - r.top) / (vh * 0.6))
    },
    (p) => {
      const weave = rootRef.current,
        svg = svgRef.current
      if (!weave || !svg) return
      const draws = svg.querySelectorAll<SVGPathElement>('[data-draw]')
      const lanes = weave.querySelectorAll<HTMLElement>('[data-lane]')
      for (let i = 0; i < n; i++) {
        const s = easeOut(clamp((p - i * 0.06) / 0.55))
        const path = draws[i]
        if (path && lens.current[i] != null) path.style.strokeDashoffset = String(lens.current[i] * (1 - s))
        lanes[i]?.classList.toggle(styles.lit, p > i * 0.06)
      }
      const hot = draws[n]
      if (hot && lens.current[n] != null)
        hot.style.strokeDashoffset = String(lens.current[n] * (1 - easeOut(clamp((p - 0.66) / 0.24))))
      weave.classList.toggle(styles.merged, p >= 0.64)
      weave.classList.toggle(styles.done, p >= 0.9)
      weave.style.setProperty('--p', p.toFixed(3))
    },
  )

  return (
    <div ref={rootRef} className={styles.weave}>
      <p className={styles.weaveK} aria-hidden="true">
        <span>{weaveStartLabel}</span>
        <span />
        <span>{weaveEndLabel}</span>
      </p>
      <div className={styles.lanes} role="list">
        {items.map((it, i) => (
          <div key={it.id ?? i} className={styles.lane} role="listitem" data-lane="">
            <div className={styles.laneImg}>
              <Media resource={it.image} fill decorative sizes="72px" />
            </div>
            <div className={styles.laneBody}>
              <div className={styles.laneTop}>
                <h2 className={styles.laneName}>{it.name}</h2>
                {it.tag && <span className={styles.laneK}>{it.tag}</span>}
              </div>
              {it.text && <p className={styles.laneTxt}>{it.text}</p>}
            </div>
          </div>
        ))}
      </div>
      <svg ref={svgRef} className={styles.weaveSvg} aria-hidden="true">
        <g>
          {Array.from({ length: n + 1 }, (_, i) => (
            <path key={i} className={styles.ghost} data-ghost="" />
          ))}
        </g>
        <g>
          {Array.from({ length: n + 1 }, (_, i) => (
            <path key={i} className={i === n ? styles.hot : undefined} data-draw="" />
          ))}
        </g>
        <circle r="5" />
      </svg>
      <div className={styles.weaveEnd}>
        <span ref={markRef} className={styles.weaveMark}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/plg-mark.webp" alt="" loading="lazy" decoding="async" width={64} height={54} />
        </span>
        {weaveResult && <p className={styles.weaveName}>{weaveResult}</p>}
        {weaveNote && <p className={styles.weaveNote}>{weaveNote}</p>}
      </div>
    </div>
  )
}
