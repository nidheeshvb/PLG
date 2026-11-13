import type { ReactNode } from 'react'

import styles from './Marquee.module.css'

type Props = {
  children: ReactNode
  className?: string
  setClassName?: string
  /** Seconds for one full loop (desktop); mobile runs a third faster. */
  duration?: number
}

/** Endless horizontal scroll: the content is rendered twice and the track slides by half. */
export function Marquee({ children, className, setClassName, duration = 24 }: Props) {
  const set = [styles.set, setClassName].filter(Boolean).join(' ')
  return (
    <div
      className={[styles.marquee, className].filter(Boolean).join(' ')}
      style={{ ['--marquee-duration' as string]: `${duration}s` }}
    >
      <div className={set}>{children}</div>
      <div className={set} aria-hidden="true">
        {children}
      </div>
    </div>
  )
}
