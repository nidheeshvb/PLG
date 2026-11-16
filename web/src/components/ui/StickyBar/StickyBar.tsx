'use client'

import { type ReactNode, type RefObject, useRef } from 'react'

import { useDragScroll } from '@/hooks/useDragScroll'
import { useRafScroll } from '@/hooks/useRafScroll'

import styles from './StickyBar.module.css'

export { styles as stickyBarStyles }

type Props = {
  label: string
  children: ReactNode
  /** The scrolling row inside the bar (for callers that scroll it or mark its items). */
  innerRef?: RefObject<HTMLDivElement | null>
  innerId?: string
}

/**
 * A bar that sticks to the top of the screen (Services section menu, Our Work filter). A 0-height
 * marker before it tells when it is stuck; while stuck it steps aside whenever the main header is
 * showing (body without `nav-hidden`), so only one bar shows at a time. Drags sideways when it overflows.
 * Renders the marker and the bar as siblings, like the prototype.
 */
export function StickyBar({ label, children, innerRef, innerId }: Props) {
  const markRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const ownRef = useRef<HTMLDivElement>(null)
  const inner = innerRef ?? ownRef
  useDragScroll(inner, styles.dragging)

  useRafScroll(
    () => (markRef.current?.getBoundingClientRect().top ?? 1) < 0,
    (stuck) => navRef.current?.classList.toggle(styles.stuck, stuck),
  )

  return (
    <>
      <div ref={markRef} aria-hidden="true" />
      <nav ref={navRef} className={styles.snav} aria-label={label}>
        <div ref={inner} id={innerId} className={styles.inner}>
          {children}
        </div>
      </nav>
    </>
  )
}
