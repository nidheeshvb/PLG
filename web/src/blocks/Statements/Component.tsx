import type { CSSProperties } from 'react'

import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import type { StatementsBlock as StatementsBlockData } from '@/payload-types'

import styles from './Component.module.css'

/** Heading, then large statements side by side with a hairline between them. */
export function StatementsBlock({ eyebrow, title, gradientTitle, items, showBrandMark, anchorId }: StatementsBlockData) {
  return (
    <Section id={anchorId} className={styles.section}>
      {showBrandMark && (
        // eslint-disable-next-line @next/next/no-img-element
        <img className={styles.mark} src="/brand/brand-mark.svg" alt="" loading="lazy" decoding="async" />
      )}
      <SectionHeader className={styles.head} eyebrow={eyebrow} title={title} gradient={gradientTitle} />
      <div className={styles.grid} style={{ '--n': items?.length ?? 1 } as CSSProperties}>
        {items?.map((it, i) => (
          <div
            key={it.id ?? i}
            className={styles.item}
            data-reveal=""
            style={i ? ({ '--d': `${(i * 0.12).toFixed(2)}s` } as CSSProperties) : undefined}
          >
            <p className={styles.k}>{it.label}</p>
            <p className={`${styles.txt} grad`}>{it.text}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
