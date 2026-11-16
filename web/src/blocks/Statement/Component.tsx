import { WordReveal } from '@/components/ui/WordReveal'
import type { StatementBlock as StatementBlockData } from '@/payload-types'

import styles from './Component.module.css'

/** Word indexes of `highlight` when the sentence ends with it (word for word). */
const tailIndexes = (words: string[], highlight?: string | null) => {
  const hl = highlight?.trim().split(/\s+/) ?? []
  if (!hl.length || hl.length > words.length) return []
  const start = words.length - hl.length
  return hl.every((w, k) => words[start + k] === w) ? hl.map((_, k) => start + k) : []
}

/** One large sentence; optionally its words light up as it scrolls through the screen. */
export function StatementBlock({ text, style, highlight, animation, showBrandMarks, anchorId }: StatementBlockData) {
  const band = style === 'band'
  const words = text.trim().split(/\s+/)
  const hl = tailIndexes(words, highlight)
  const textClass = band ? styles.bandText : styles.text

  return (
    <section id={anchorId || undefined} className={band ? styles.band : styles.statement}>
      {!band && showBrandMarks && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={`${styles.mark} ${styles.markL}`} src="/brand/brand-mark.svg" alt="" loading="lazy" decoding="async" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={`${styles.mark} ${styles.markR}`} src="/brand/brand-mark.svg" alt="" loading="lazy" decoding="async" />
        </>
      )}
      {animation === 'none' ? (
        <p className={textClass} data-reveal={band ? '' : undefined}>
          {hl.length ? (
            <>
              {words.slice(0, hl[0]).join(' ')} <em>{words.slice(hl[0]).join(' ')}</em>
            </>
          ) : (
            text
          )}
        </p>
      ) : (
        <WordReveal
          text={text}
          className={textClass}
          wordClassName={styles.w}
          onClassName={styles.on}
          highlighted={hl}
          highlightClassName={styles.hl}
        />
      )}
    </section>
  )
}
