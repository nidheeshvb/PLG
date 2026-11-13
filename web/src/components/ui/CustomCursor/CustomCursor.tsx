'use client'

import { useEffect, useRef } from 'react'

import styles from './CustomCursor.module.css'

/**
 * The orange "View" cursor shown over elements marked [data-cursor].
 * Mounted once in the layout; the animation loop only runs while needed.
 */
export function CustomCursor({ label = 'View' }: { label?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cur = ref.current
    if (!cur) return
    let mx = 0,
      my = 0,
      cx = 0,
      cy = 0,
      raf = 0,
      on = false

    const loop = () => {
      cx += (mx - cx) * 0.18
      cy += (my - cy) * 0.18
      cur.style.translate = `${cx.toFixed(1)}px ${cy.toFixed(1)}px`
      raf = on || Math.abs(mx - cx) + Math.abs(my - cy) > 0.5 ? requestAnimationFrame(loop) : 0
    }
    const wake = () => {
      if (!raf) raf = requestAnimationFrame(loop)
    }
    const setOn = (v: boolean) => {
      if (v === on) return
      on = v
      cur.classList.toggle(styles.on, v)
      wake()
    }
    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      const target = e.target instanceof Element ? e.target.closest('[data-cursor]') : null
      // hide while a slider is being dragged
      setOn(Boolean(target) && !target?.closest('[data-dragging]'))
      wake()
    }
    const onLeave = () => setOn(false)

    window.addEventListener('mousemove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={ref} className={styles.cursor} aria-hidden="true">
      {label} <i className="arr" />
    </div>
  )
}
