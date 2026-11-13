'use client'

import { Children, useEffect, useRef, useState, type ReactNode } from 'react'

import { prefersReducedMotion } from '@/hooks/useReducedMotion'

import styles from './Slider.module.css'

type Props = {
  children: ReactNode
  /** The block's own track class: desktop layout (e.g. a grid) and item sizes. */
  className?: string
  /** Colour of the arrow buttons: dark sections use white arrows, light sections dark ones. */
  tone?: 'light' | 'dark'
  /** Show position dots on mobile (the prototype keeps them hidden). */
  dots?: boolean
  label?: string
}

/**
 * Horizontal slider used by card rows and galleries.
 * On desktop the track keeps the block's own layout; at ≤1100px it becomes a snap slider with
 * mouse drag + momentum, arrow buttons and (≤900px) swipe dots.
 */
export function Slider({ children, className, tone = 'dark', dots = false, label }: Props) {
  const trackRef = useRef<HTMLDivElement>(null)
  const count = Children.count(children)
  const [active, setActive] = useState(0)
  const [edges, setEdges] = useState({ start: true, end: false })

  useEffect(() => {
    const sl = trackRef.current
    if (!sl) return
    const reduce = prefersReducedMotion()
    let down = false,
      moved = false,
      x0 = 0,
      s0 = 0,
      vx = 0,
      lx = 0,
      lt = 0,
      raf = 0

    const setDragging = (v: boolean) => {
      sl.classList.toggle(styles.dragging, v)
      if (v) sl.setAttribute('data-dragging', '')
      else sl.removeAttribute('data-dragging')
    }
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || e.button !== 0 || sl.scrollWidth <= sl.clientWidth) return
      cancelAnimationFrame(raf)
      down = true
      moved = false
      x0 = lx = e.clientX
      s0 = sl.scrollLeft
      vx = 0
      lt = performance.now()
    }
    const onMove = (e: PointerEvent) => {
      if (!down) return
      const dx = e.clientX - x0
      if (!moved && Math.abs(dx) > 6) {
        moved = true
        setDragging(true)
      }
      if (!moved) return
      const now = performance.now()
      vx = (e.clientX - lx) / Math.max(1, now - lt)
      lx = e.clientX
      lt = now
      sl.scrollLeft = s0 - dx
    }
    const onUp = () => {
      if (!down) return
      down = false
      if (!moved) return
      // a short glide after release, then scroll-snap settles the nearest card
      let v = -vx * 16
      const glide = () => {
        v *= 0.92
        sl.scrollLeft += v
        if (Math.abs(v) > 0.5 && !reduce) raf = requestAnimationFrame(glide)
        else setDragging(false)
      }
      glide()
    }
    const onClick = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault()
        e.stopPropagation()
        moved = false
      }
    }
    const onDragStart = (e: DragEvent) => e.preventDefault()

    const update = () => {
      setEdges({
        start: sl.scrollLeft < 4,
        end: sl.scrollLeft > sl.scrollWidth - sl.clientWidth - 4,
      })
      const kids = [...sl.children] as HTMLElement[]
      const c = sl.scrollLeft + sl.clientWidth / 2
      let best = 0,
        bd = Infinity
      kids.forEach((k, i) => {
        const d = Math.abs(k.offsetLeft + k.offsetWidth / 2 - c)
        if (d < bd) {
          bd = d
          best = i
        }
      })
      setActive(best)
    }

    // always open on the first card
    const home = () => {
      if (!sl.hasAttribute('data-dragging')) sl.scrollLeft = 0
    }
    home()
    const homeTimer = window.setTimeout(home, 1200)

    sl.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    sl.addEventListener('click', onClick, true)
    sl.addEventListener('dragstart', onDragStart)
    sl.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    update()
    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(homeTimer)
      sl.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      sl.removeEventListener('click', onClick, true)
      sl.removeEventListener('dragstart', onDragStart)
      sl.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [count])

  const step = (dir: 1 | -1) => {
    const sl = trackRef.current
    if (!sl) return
    const kids = [...sl.children] as HTMLElement[]
    const pad = parseFloat(getComputedStyle(sl).scrollPaddingLeft) || 0
    const x = sl.scrollLeft + pad
    const t =
      dir > 0 ? kids.find((k) => k.offsetLeft > x + 4) : [...kids].reverse().find((k) => k.offsetLeft < x - 4)
    sl.scrollTo({
      left: t ? t.offsetLeft - pad : dir > 0 ? sl.scrollWidth : 0,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    })
  }

  return (
    <>
      <div
        ref={trackRef}
        className={[styles.slider, className].filter(Boolean).join(' ')}
        aria-label={label}
        role={label ? 'region' : undefined}
      >
        {children}
      </div>
      <div className={[styles.bar, tone === 'light' && styles.barLight].filter(Boolean).join(' ')}>
        <div className={styles.nav}>
          <button type="button" aria-label="Previous" disabled={edges.start} onClick={() => step(-1)}>
            <i className="arr" />
          </button>
          <button type="button" aria-label="Next" disabled={edges.end} onClick={() => step(1)}>
            <i className="arr" />
          </button>
        </div>
      </div>
      {dots && count > 1 && (
        <div className={styles.dots} aria-hidden="true">
          {Array.from({ length: count }, (_, i) => (
            <i key={i} className={i === active ? styles.dotOn : undefined} />
          ))}
        </div>
      )}
    </>
  )
}
