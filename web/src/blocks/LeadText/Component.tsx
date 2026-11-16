import { CMSLink } from '@/components/ui/CMSLink'
import { Section } from '@/components/ui/Section'
import { WordReveal } from '@/components/ui/WordReveal'
import type { LeadTextBlock as LeadTextBlockData } from '@/payload-types'

import styles from './Component.module.css'
import { CrossDiagram } from './CrossDiagram'
import { MergeDiagram } from './MergeDiagram'
import { WeaveDiagram } from './WeaveDiagram'

const bare = (w: string) => w.replace(/[.,;:!?“”"'’)(]+$/g, '').replace(/^[“"'(]+/, '')

/**
 * Indexes of the words to show in orange.
 * - tail: from the last place `highlight` occurs (word for word) to the end
 * - words: every word equal to one of the comma-separated `highlight` words (ignoring punctuation)
 * - phrase: the first place `highlight` occurs (word for word)
 */
const highlightedWords = (text: string, mode?: string | null, highlight?: string | null): number[] => {
  const words = text.trim().split(/\s+/)
  if (!highlight?.trim() || mode === 'none') return []
  if (mode === 'words') {
    const wanted = new Set(highlight.split(',').map((w) => w.trim()).filter(Boolean))
    return words.flatMap((w, i) => (wanted.has(w) || wanted.has(bare(w)) ? [i] : []))
  }
  const hl = highlight.trim().split(/\s+/)
  if (mode === 'phrase') {
    for (let i = 0; i + hl.length <= words.length; i++) {
      if (hl.every((w, k) => words[i + k] === w)) return hl.map((_, k) => i + k)
    }
    return []
  }
  for (let i = words.length - hl.length; i >= 0; i--) {
    if (hl.every((w, k) => words[i + k] === w)) return words.slice(i).map((_, k) => i + k)
  }
  return []
}

export function LeadTextBlock(props: LeadTextBlockData) {
  const { eyebrow, text, textSize, highlightMode, highlight, animation, diagram, mergeItems, weaveItems } = props
  const { crossItems, showDetails, detailsHeading, detailsText, detailsList } = props
  const { heading, band, notes } = props
  const { showClosing, closingText, closingLink, anchorId } = props
  const sizeClass = textSize === 'md' ? styles.md : textSize === 'sm' ? styles.sm : styles.lg
  const hl = highlightedWords(text, highlightMode ?? 'tail', highlight)
  // tail: always orange; particular words / a phrase: orange as they light up
  const hlClass = highlightMode === 'words' || highlightMode === 'phrase' ? styles.nm : styles.hl
  const cross = diagram === 'cross' && !!crossItems?.length
  const words = text.trim().split(/\s+/)

  return (
    <Section
      id={anchorId}
      className={[styles.section, sizeClass, band && styles.band, cross && styles.withCross]
        .filter(Boolean)
        .join(' ')}
    >
      <div className={styles.grid}>
        <div className={styles.head}>
          {eyebrow && (
            <p className="eyebrow" data-reveal="">
              {eyebrow}
            </p>
          )}
        </div>
        <div className={styles.body}>
        {heading && (
          <h2 className={styles.heading} data-reveal="" style={{ ['--d' as string]: '.08s' }}>
            {heading}
          </h2>
        )}
        {animation === 'none' ? (
          <p className={`${styles.lead} ${styles.static}`}>
            {words.map((w, i) => (
              <span key={i}>
                <span className={hl.includes(i) ? hlClass : undefined}>{w}</span>
                {i < words.length - 1 ? ' ' : null}
              </span>
            ))}
          </p>
        ) : (
          <WordReveal
            text={text}
            className={styles.lead}
            wordClassName={styles.w}
            onClassName={styles.on}
            highlighted={hl}
            highlightClassName={hlClass}
            start={textSize === 'lg' || !textSize ? 0.8 : 0.82}
            span={textSize === 'lg' || !textSize ? 0.3 : 0.25}
          />
        )}
        {!!notes?.length && (
          <p className={styles.notes} data-reveal="">
            {notes.map((n, i) => (
              <span key={n.id ?? i}>{n.text}</span>
            ))}
          </p>
        )}
        </div>
      </div>
      {diagram === 'merge' && !!mergeItems?.length && <MergeDiagram items={mergeItems} />}
      {diagram === 'weave' && !!weaveItems?.length && <WeaveDiagram {...props} />}
      {cross && <CrossDiagram items={crossItems} />}
      {showDetails && (detailsHeading || detailsText || !!detailsList?.length) && (
        <div className={styles.details}>
          {detailsHeading ? (
            <p className="eyebrow" data-reveal="">
              {detailsHeading}
            </p>
          ) : (
            <span />
          )}
          <div data-reveal="" style={{ ['--d' as string]: '.08s' }}>
            {detailsText && <p className={styles.detailsText}>{detailsText}</p>}
          </div>
          {!!detailsList?.length && (
            <ul className={styles.detailsList} aria-label={detailsHeading ?? undefined} data-reveal="" style={{ ['--d' as string]: '.16s' }}>
              {detailsList.map((it, i) => (
                <li key={it.id ?? i} className={it.highlight ? styles.home : undefined}>
                  {it.name}
                  {it.tag && <span>{it.tag}</span>}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {showClosing && (closingText || closingLink) && (
        <div className={styles.closing} data-reveal="">
          {closingText && <p>{closingText}</p>}
          <CMSLink link={closingLink} />
        </div>
      )}
    </Section>
  )
}
