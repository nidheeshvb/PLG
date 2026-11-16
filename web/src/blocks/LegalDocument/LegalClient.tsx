'use client'

import { useRef, useState } from 'react'

import { Button } from '@/components/ui/Button/Button'
import { useRafScroll } from '@/hooks/useRafScroll'
import { prefersReducedMotion } from '@/hooks/useReducedMotion'

import styles from './Component.module.css'

/** Numbered contents; the section crossing 30% of the screen is highlighted. Clicking scrolls to it. */
export function TocNav({ items }: { items: { id: string; n: string; title: string }[] }) {
  const ref = useRef<HTMLOListElement>(null)
  useRafScroll(
    () => {
      const line = window.innerHeight * 0.3
      let on = 0
      items.forEach((it, i) => {
        const el = document.getElementById(it.id)
        if (el && el.getBoundingClientRect().top <= line) on = i
      })
      return on
    },
    (on) => {
      ref.current?.querySelectorAll('a').forEach((a, i) => a.classList.toggle(styles.on, i === on))
    },
  )
  return (
    <ol ref={ref}>
      {items.map((it) => (
        <li key={it.id}>
          <a
            href={`#${it.id}`}
            onClick={(e) => {
              e.preventDefault()
              document.getElementById(it.id)?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
            }}
          >
            <span>{it.n}</span>
            {it.title}
          </a>
        </li>
      ))}
    </ol>
  )
}

/**
 * "Manage Cookie Preferences": UI only for now. It will open the consent platform's preferences panel once
 * a platform is chosen (docs/backlog.md item 3); until then it explains that.
 */
export function PreferencesButton() {
  const [noted, setNoted] = useState(false)
  return (
    <>
      <div className={styles.prefs}>
        <Button appearance="dark" onClick={() => setNoted(true)}>
          Manage Cookie Preferences
        </Button>
        <p>Opens the consent platform’s preferences panel.</p>
      </div>
      {noted && (
        <p className={styles.pnote} role="status">
          The preferences panel is connected once the cookie consent platform for launch is chosen.
        </p>
      )}
    </>
  )
}
