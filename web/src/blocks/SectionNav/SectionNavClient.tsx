'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import type { SectionNavItem } from '@/blocks/context'
import { useDragScroll } from '@/hooks/useDragScroll'
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
  const dragging = useDragScroll(ref, styles.dragging)

  // keep the active link in view when the bar overflows (menu mode: jump there on load)
  useEffect(() => {
    const sn = ref.current
    if (!sn || !activeId || dragging.current || sn.scrollWidth <= sn.clientWidth) return
    const a = sn.querySelector<HTMLElement>(`[data-id="${CSS.escape(activeId)}"]`)
    if (!a) return
    const left = Math.max(0, a.offsetLeft - sn.clientWidth / 2 + a.offsetWidth / 2)
    if (!spy) sn.scrollLeft = left
    else sn.scrollTo({ left, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }, [activeId, spy, dragging])

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
