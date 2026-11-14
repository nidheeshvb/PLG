'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import type { SectionNavItem } from '@/blocks/context'
import { prefersReducedMotion } from '@/hooks/useReducedMotion'

import styles from './Component.module.css'

type Props = {
  items: SectionNavItem[]
  note?: string | null
  /** Sections mode: underline the section crossing the middle of the screen. */
  spy?: boolean
  /** Menu mode: the path of this page (its link is highlighted). */
  current?: string | null
  /** Menu mode: "Back to …" link on the right. */
  back?: { label: string; href: string } | null
}

/**
 * Section menu bar: scroll-spy (sections mode) or a fixed highlight (menu mode), mouse drag +
 * edge fades when the links overflow, and the active link kept in view.
 */
export function SectionNavClient({ items, note, spy, current, back }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const [spied, setSpied] = useState<string | null>(null)
  const activeId = spy ? spied : (items.find((i) => i.href === current)?.id ?? null)

  // scroll-spy
  useEffect(() => {
    if (!spy) return
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setSpied(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [items, spy])

  // mouse drag + edge fades
  useEffect(() => {
    const sn = ref.current
    if (!sn) return
    const fades = () => {
      const max = sn.scrollWidth - sn.clientWidth
      sn.style.setProperty('--fl', sn.scrollLeft > 4 ? '36px' : '0px')
      sn.style.setProperty('--fr', sn.scrollLeft < max - 4 ? '36px' : '0px')
    }
    let down = false,
      moved = false,
      x0 = 0,
      s0 = 0
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || sn.scrollWidth <= sn.clientWidth) return
      down = true
      moved = false
      x0 = e.clientX
      s0 = sn.scrollLeft
    }
    const onMove = (e: PointerEvent) => {
      if (!down) return
      const dx = e.clientX - x0
      if (!moved && Math.abs(dx) > 5) {
        moved = true
        dragging.current = true
        sn.classList.add(styles.dragging)
      }
      if (moved) sn.scrollLeft = s0 - dx
    }
    const onUp = () => {
      if (!down) return
      down = false
      dragging.current = false
      sn.classList.remove(styles.dragging)
    }
    const onClick = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault()
        e.stopPropagation()
        moved = false
      }
    }
    const onDragStart = (e: DragEvent) => e.preventDefault()
    sn.addEventListener('scroll', fades, { passive: true })
    window.addEventListener('resize', fades)
    sn.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    sn.addEventListener('click', onClick, true)
    sn.addEventListener('dragstart', onDragStart)
    fades()
    return () => {
      sn.removeEventListener('scroll', fades)
      window.removeEventListener('resize', fades)
      sn.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      sn.removeEventListener('click', onClick, true)
      sn.removeEventListener('dragstart', onDragStart)
    }
  }, [])

  // keep the active link in view when the bar overflows (menu mode: jump there on load)
  useEffect(() => {
    const sn = ref.current
    if (!sn || !activeId || dragging.current || sn.scrollWidth <= sn.clientWidth) return
    const a = sn.querySelector<HTMLElement>(`[data-id="${CSS.escape(activeId)}"]`)
    if (!a) return
    const left = Math.max(0, a.offsetLeft - sn.clientWidth / 2 + a.offsetWidth / 2)
    if (!spy) sn.scrollLeft = left
    else sn.scrollTo({ left, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }, [activeId, spy])

  return (
    <div ref={ref} className={styles.inner}>
      {items.map(({ id, label, href }) => {
        const active = activeId === id
        const props = {
          'data-id': id,
          className: active ? styles.active : undefined,
          'aria-current': active ? (spy ? ('location' as const) : ('page' as const)) : undefined,
        }
        return href && !href.startsWith('#') ? (
          <Link key={id} href={href} {...props}>
            {label}
          </Link>
        ) : (
          <a key={id} href={href ?? `#${id}`} {...props}>
            {label}
          </a>
        )
      })}
      {note && <span className={styles.tag}>{note}</span>}
      {back && (
        <Link href={back.href} className={styles.back}>
          <i className="arr" aria-hidden="true" />
          {back.label}
        </Link>
      )}
    </div>
  )
}
