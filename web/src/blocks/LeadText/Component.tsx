import { CMSLink } from '@/components/ui/CMSLink'
import { Section } from '@/components/ui/Section'
import { WordReveal } from '@/components/ui/WordReveal'
import type { LeadTextBlock as LeadTextBlockData } from '@/payload-types'

import styles from './Component.module.css'
import { MergeDiagram } from './MergeDiagram'
import { WeaveDiagram } from './WeaveDiagram'

const bare = (w: string) => w.replace(/[.,;:!?“”"'’)(]+$/g, '').replace(/^[“"'(]+/, '')

/**
 * Indexes of the words to show in orange.
 * - tail: from the last place `highlight` occurs (word for word) to the end
 * - words: every word equal to one of the comma-separated `highlight` words (ignoring punctuation)
 */
const highlightedWords = (text: string, mode?: string | null, highlight?: string | null): number[] => {
  const words = text.trim().split(/\s+/)
  if (!highlight?.trim() || mode === 'none') return []
  if (mode === 'words') {
    const wanted = new Set(highlight.split(',').map((w) => w.trim()).filter(Boolean))
    return words.flatMap((w, i) => (wanted.has(w) || wanted.has(bare(w)) ? [i] : []))
  }
  const hl = highlight.trim().split(/\s+/)
  for (let i = words.length - hl.length; i >= 0; i--) {
    if (hl.every((w, k) => words[i + k] === w)) return words.slice(i).map((_, k) => i + k)
  }
  return []
}

export function LeadTextBlock(props: LeadTextBlockData) {
  const { eyebrow, text, textSize, highlightMode, highlight, animation, diagram, mergeItems, weaveItems } = props
  const { showClosing, closingText, closingLink, anchorId } = props
  const hl = highlightedWords(text, highlightMode ?? 'tail', highlight)
  // tail: always orange; particular words: orange as they light up
  const hlClass = highlightMode === 'words' ? styles.nm : styles.hl
  const words = text.trim().split(/\s+/)

  return (
    <Section id={anchorId} className={[styles.section, textSize === 'md' ? styles.md : styles.lg].join(' ')}>
      <div className={styles.grid}>
        <div className={styles.head}>
          {eyebrow && (
            <p className="eyebrow" data-reveal="">
              {eyebrow}
            </p>
          )}
        </div>
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
            start={textSize === 'md' ? 0.82 : 0.8}
            span={textSize === 'md' ? 0.25 : 0.3}
          />
        )}
      </div>
      {diagram === 'merge' && !!mergeItems?.length && <MergeDiagram items={mergeItems} />}
      {diagram === 'weave' && !!weaveItems?.length && <WeaveDiagram {...props} />}
      {showClosing && (closingText || closingLink) && (
        <div className={styles.closing} data-reveal="">
          {closingText && <p>{closingText}</p>}
          <CMSLink link={closingLink} />
        </div>
      )}
    </Section>
  )
}
