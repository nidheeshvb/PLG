'use client'

import { type RefObject, useEffect, useRef } from 'react'

/**
 * Sideways-scrolling row (section menu, filter chips): drag it with the mouse when it overflows, and
 * set `--fl` / `--fr` (left/right edge fade widths, `fade` px when there is more to see) for a CSS mask.
 * While dragging, `draggingClass` is on the element and clicks are swallowed. Returns a ref that is
 * true while a drag is in progress.
 */
export function useDragScroll(ref: RefObject<HTMLElement | null>, draggingClass: string, fade = 36) {
  const dragging = useRef(false)
  useEffect(() => {
    const sn = ref.current
    if (!sn) return
    const fades = () => {
      const max = sn.scrollWidth - sn.clientWidth
      sn.style.setProperty('--fl', sn.scrollLeft > 4 ? `${fade}px` : '0px')
      sn.style.setProperty('--fr', sn.scrollLeft < max - 4 ? `${fade}px` : '0px')
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
        sn.classList.add(draggingClass)
      }
      if (moved) sn.scrollLeft = s0 - dx
    }
    const onUp = () => {
      if (!down) return
      down = false
      dragging.current = false
      sn.classList.remove(draggingClass)
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
  }, [ref, draggingClass, fade])
  return dragging
}
