import type { LeadTextBlock } from '@/payload-types'

import styles from './Component.module.css'

type Item = NonNullable<LeadTextBlock['mergeItems']>[number]

/**
 * Three columns whose top rules draw in, then three lines that meet on the PLG Acachet lockup.
 * The lines and the lockup are fixed design; the columns are content.
 * Animation starts when RevealObserver adds `.in` to the [data-inview] wrapper.
 */
export function MergeDiagram({ items }: { items: Item[] }) {
  return (
    <div className={styles.merge} data-inview="">
      <div className={styles.row}>
        {items.map((it, i) => (
          <div key={it.id ?? i} className={styles.src}>
            {it.label && <span className={styles.k}>{it.label}</span>}
            <span className={styles.name}>{it.name}</span>
            {it.text && <p className={styles.txt}>{it.text}</p>}
          </div>
        ))}
      </div>
      <svg className={styles.lines} viewBox="0 0 1200 110" preserveAspectRatio="none" aria-hidden="true">
        <path d="M200 0 C200 70, 600 40, 600 110" />
        <path className={styles.hot} d="M600 0 L600 110" />
        <path d="M1000 0 C1000 70, 600 40, 600 110" />
      </svg>
      <div className={styles.result}>
        <div className={styles.lock}>
          <span className={styles.mark}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/plg-mark.webp" alt="" loading="lazy" decoding="async" width={64} height={54} />
          </span>
          <b>PLG ACACHET</b>
        </div>
      </div>
    </div>
  )
}
