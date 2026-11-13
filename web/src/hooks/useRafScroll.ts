'use client'

import { useEffect, useRef } from 'react'

/**
 * One shared scroll/resize loop for every scroll effect on the page.
 * At most one update per frame, and every subscriber's `read` (layout reads) runs before any
 * `write` (style writes), so the browser never has to recalculate layout mid-update.
 */
type Subscriber = { read: () => unknown; write: (value: unknown) => void }

const subscribers = new Set<Subscriber>()
let queued = false
let listening = false

const run = () => {
  queued = false
  const values = [...subscribers].map((s) => [s, s.read()] as const)
  for (const [s, v] of values) s.write(v)
}

export const requestScrollUpdate = () => {
  if (queued || typeof window === 'undefined') return
  queued = true
  requestAnimationFrame(run)
}

const listen = () => {
  if (listening) return
  listening = true
  window.addEventListener('scroll', requestScrollUpdate, { passive: true })
  window.addEventListener('resize', requestScrollUpdate)
}

export function useRafScroll<T>(read: () => T, write: (value: T) => void, enabled = true) {
  const readRef = useRef(read)
  const writeRef = useRef(write)
  useEffect(() => {
    readRef.current = read
    writeRef.current = write
  })

  useEffect(() => {
    if (!enabled) return
    const sub: Subscriber = {
      read: () => readRef.current(),
      write: (v) => writeRef.current(v as T),
    }
    subscribers.add(sub)
    listen()
    requestScrollUpdate()
    return () => {
      subscribers.delete(sub)
    }
  }, [enabled])
}
