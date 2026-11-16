'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'

import styles from './Component.module.css'

// one shared 15-second tick for every clock on the page
const listeners = new Set<() => void>()
let timer: number | undefined
const subscribe = (cb: () => void) => {
  listeners.add(cb)
  if (!timer) timer = window.setInterval(() => listeners.forEach((l) => l()), 15000)
  return () => {
    listeners.delete(cb)
    if (!listeners.size) {
      window.clearInterval(timer)
      timer = undefined
    }
  }
}

/** Live local time (hh:mm) in a time zone, e.g. "14:05" for Asia/Dubai. Shows "--:--" until it runs in the browser. */
export function LocalTime({ timeZone }: { timeZone: string }) {
  const format = (() => {
    try {
      return new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone })
    } catch {
      return null
    }
  })()
  const time = useSyncExternalStore(
    subscribe,
    () => (format ? format.format(new Date()) : '--:--'),
    () => '--:--',
  )
  return <b>{time}</b>
}

const CopyIcon = (
  <svg viewBox="0 0 14 14" aria-hidden="true">
    <path fill="none" stroke="currentColor" strokeWidth="1.3" d="M4.5 4.5V1.5h8v8h-3M1.5 4.5h8v8h-8z" />
  </svg>
)

/** "Copy" button for an email or phone number; falls back to selecting the text when the clipboard is unavailable. */
export function CopyButton({ text }: { text: string }) {
  const [label, setLabel] = useState('Copy')
  const ref = useRef<HTMLButtonElement>(null)
  const t = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(t.current), [])

  const done = (l: string) => {
    setLabel(l)
    window.clearTimeout(t.current)
    t.current = window.setTimeout(() => setLabel('Copy'), 1600)
  }
  const select = () => {
    const dd = ref.current?.previousElementSibling
    if (dd) {
      const r = document.createRange()
      r.selectNodeContents(dd)
      const s = window.getSelection()
      s?.removeAllRanges()
      s?.addRange(r)
    }
    done('Selected')
  }
  const copy = () => {
    try {
      navigator.clipboard.writeText(text).then(() => done('Copied'), select)
    } catch {
      select()
    }
  }
  return (
    <button ref={ref} type="button" className={[styles.copy, label === 'Copied' && styles.ok].filter(Boolean).join(' ')} onClick={copy}>
      {CopyIcon}
      <span>{label}</span>
    </button>
  )
}
