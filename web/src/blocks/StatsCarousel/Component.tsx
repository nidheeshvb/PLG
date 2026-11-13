'use client'

import { useEffect, useRef } from 'react'

import { Media } from '@/components/ui/Media'
import { prefersReducedMotion } from '@/hooks/useReducedMotion'
import type { StatsCarouselBlock as StatsCarouselBlockData } from '@/payload-types'

import styles from './Component.module.css'

const DURATION = 1200
const easeIO = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

/**
 * Looping, auto-advancing full-width carousel of key numbers. Every slide is placed at its
 * wrapped distance from a continuous position, so the last slide glides straight into the first.
 * The image drifts slower than the frame and the number leads.
 */
export function StatsCarouselBlock({ stats, autoplaySeconds, anchorId }: StatsCarouselBlockData) {
  const rootRef = useRef<HTMLElement>(null)
  const items = stats ?? []
  const n = items.length

  useEffect(() => {
    const root = rootRef.current
    if (!root || !n) return
    const reduce = prefersReducedMotion()
    const hold = Math.max(2, autoplaySeconds ?? 4.5) * 1000
    const slides = [...root.querySelectorAll<HTMLElement>('[data-stat]')]
    const bgs = slides.map((s) => s.querySelector<HTMLElement>('[data-stat-bg]'))
    const txts = slides.map((s) => s.querySelector<HTMLElement>('[data-stat-txt]'))
    const dots = [...root.querySelectorAll<HTMLButtonElement>('[data-stat-dot]')]
    const wrap = (d: number) => (((d % n) + n + n / 2) % n) - n / 2
    const mod = (i: number) => ((i % n) + n) % n

    let pos = 0,
      from = 0,
      to = 0,
      t0 = 0,
      moveRaf = 0,
      tickRaf = 0,
      held = 0,
      lastT = performance.now(),
      paused = false,
      inView = false,
      active = -1

    const countUp = (el: HTMLElement | null) => {
      if (!el || el.dataset.done) return
      el.dataset.done = '1'
      const end = Number(el.dataset.count),
        suf = el.dataset.suffix ?? '',
        dur = reduce ? 0 : 1400,
        start = performance.now()
      const step = (t: number) => {
        const p = dur ? Math.min(1, (t - start) / dur) : 1
        el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suf
        if (p < 1) requestAnimationFrame(step)
      }
      step(start)
    }

    const render = () => {
      const w = root.clientWidth
      slides.forEach((el, k) => {
        const d = wrap(k - pos),
          c = Math.max(-1, Math.min(1, d)),
          a = Math.abs(c)
        el.style.transform = `translate3d(${(d * w).toFixed(2)}px,0,0)`
        el.style.visibility = Math.abs(d) < 1.001 ? 'visible' : 'hidden'
        const bg = bgs[k]
        if (bg) bg.style.transform = `translate3d(${(-c * w * 0.35).toFixed(2)}px,0,0) scale(${(1.06 + a * 0.08).toFixed(4)})`
        const tx = txts[k]
        if (tx) {
          tx.style.transform = `translate3d(${(c * w * 0.18).toFixed(2)}px,0,0)`
          tx.style.opacity = (1 - Math.min(1, a * 1.7)).toFixed(3)
        }
      })
    }

    const setActive = (i: number) => {
      if (i === active) return
      active = i
      slides.forEach((s, k) => s.classList.toggle(styles.active, k === i))
      dots.forEach((d, k) => d.classList.toggle(styles.on, k === i))
      countUp(slides[i]?.querySelector<HTMLElement>('[data-count]') ?? null)
    }

    const stepMove = (now: number) => {
      const t = reduce ? 1 : Math.min(1, (now - t0) / DURATION)
      pos = from + (to - from) * easeIO(t)
      render()
      moveRaf = t < 1 ? requestAnimationFrame(stepMove) : 0
      root.classList.toggle(styles.moving, t < 1)
    }
    const startMove = () => {
      t0 = performance.now()
      if (!moveRaf) moveRaf = requestAnimationFrame(stepMove)
      setActive(mod(to))
      held = 0
    }
    const go = (dir: 1 | -1) => {
      from = pos
      to = Math.round(to) + dir
      startMove()
    }
    const goTo = (i: number) => {
      let d = i - mod(Math.round(to))
      if (d > n / 2) d -= n
      if (d < -n / 2) d += n
      if (!d) return
      from = pos
      to = Math.round(to) + d
      startMove()
    }

    // autoplay with a filling progress bar; pauses while dragging, off screen or in a hidden tab
    const tick = (now: number) => {
      const dt = Math.min(now - lastT, 100)
      lastT = now
      if (!reduce && !paused && !document.hidden && !moveRaf && n > 1) {
        held += dt
        if (held >= hold) go(1)
      }
      dots.forEach((d, k) => {
        const bar = d.firstElementChild as HTMLElement | null
        if (!bar) return
        if (k !== active) {
          if (bar.style.width !== '0px') bar.style.width = '0px'
        } else bar.style.width = `${(reduce ? 100 : Math.min(100, (held / hold) * 100)).toFixed(1)}%`
      })
      tickRaf = inView ? requestAnimationFrame(tick) : 0
    }
    const io = new IntersectionObserver(
      (es) => {
        inView = es[0].isIntersecting
        if (inView) {
          setActive(mod(Math.round(to)))
          if (!tickRaf) {
            lastT = performance.now()
            tickRaf = requestAnimationFrame(tick)
          }
        }
      },
      { threshold: 0.35 },
    )
    io.observe(root)

    // controls
    const prev = root.querySelector<HTMLButtonElement>('[data-stat-prev]')
    const next = root.querySelector<HTMLButtonElement>('[data-stat-next]')
    const onPrev = () => go(-1)
    const onNext = () => go(1)
    prev?.addEventListener('click', onPrev)
    next?.addEventListener('click', onNext)
    const dotHandlers = dots.map((d, i) => {
      const h = () => goTo(i)
      d.addEventListener('click', h)
      return h
    })

    // swipe
    let sx: number | null = null
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') {
        sx = e.clientX
        paused = true
      }
    }
    const onUp = (e: PointerEvent) => {
      if (sx === null) return
      const dx = e.clientX - sx
      if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
      sx = null
      paused = false
    }
    const onCancel = () => {
      sx = null
      paused = false
    }
    root.addEventListener('pointerdown', onDown)
    root.addEventListener('pointerup', onUp)
    root.addEventListener('pointercancel', onCancel)
    window.addEventListener('resize', render)
    render()

    return () => {
      cancelAnimationFrame(moveRaf)
      cancelAnimationFrame(tickRaf)
      io.disconnect()
      prev?.removeEventListener('click', onPrev)
      next?.removeEventListener('click', onNext)
      dots.forEach((d, i) => d.removeEventListener('click', dotHandlers[i]))
      root.removeEventListener('pointerdown', onDown)
      root.removeEventListener('pointerup', onUp)
      root.removeEventListener('pointercancel', onCancel)
      window.removeEventListener('resize', render)
    }
  }, [n, autoplaySeconds])

  if (!n) return null

  return (
    <section ref={rootRef} id={anchorId || undefined} className={styles.stats} aria-label="Key numbers">
      <div className={styles.sticky}>
        <div className={styles.track}>
          {items.map((s, i) => (
            <div key={s.id ?? i} className={styles.stat} data-stat="">
              <div className={styles.bg} data-stat-bg="">
                <Media resource={s.image} fill decorative sizes="100vw" />
              </div>
              <div className={styles.txt} data-stat-txt="">
                <p className={styles.num} data-count={s.value} data-suffix={s.suffix ?? ''}>
                  {s.value}
                  {s.suffix}
                </p>
                <p className={styles.lbl}>{s.label}</p>
              </div>
            </div>
          ))}
        </div>
        {n > 1 && (
          <>
            <div className={styles.progress} role="group" aria-label="Choose a number">
              {items.map((s, i) => (
                <button key={s.id ?? i} type="button" data-stat-dot="" aria-label={`Show ${s.label}`}>
                  <i />
                </button>
              ))}
            </div>
            <div className={styles.nav}>
              <button type="button" data-stat-prev="" aria-label="Previous number">
                <i className="arr" />
              </button>
              <button type="button" data-stat-next="" aria-label="Next number">
                <i className="arr" />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
