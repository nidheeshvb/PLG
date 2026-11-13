import type { StatementBlock as StatementBlockData } from '@/payload-types'

import styles from './Component.module.css'
import { WordReveal } from './WordReveal'

/** One large sentence; optionally its words light up as it scrolls through the screen. */
export function StatementBlock({ text, animation, showBrandMarks, anchorId }: StatementBlockData) {
  return (
    <section id={anchorId || undefined} className={styles.statement}>
      {showBrandMarks && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={`${styles.mark} ${styles.markL}`} src="/brand/brand-mark.svg" alt="" loading="lazy" decoding="async" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={`${styles.mark} ${styles.markR}`} src="/brand/brand-mark.svg" alt="" loading="lazy" decoding="async" />
        </>
      )}
      {animation === 'none' ? (
        <p className={styles.text}>{text}</p>
      ) : (
        <WordReveal text={text} className={styles.text} wordClassName={styles.w} onClassName={styles.on} />
      )}
    </section>
  )
}
