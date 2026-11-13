import type { CSSProperties } from 'react'

import { MultilineText } from './MultilineText'

type Props = {
  eyebrow?: string | null
  title?: string | null
  gradient?: boolean | null
  as?: 'h1' | 'h2' | 'h3'
  className?: string
  eyebrowClassName?: string
  titleClassName?: string
  /** Reveal-on-scroll delay of the eyebrow; the title follows 0.08s later. */
  revealDelay?: number
  /** Render without the wrapping <div> (when the parent already groups it with other content). */
  bare?: boolean
}

const delay = (s: number): CSSProperties | undefined =>
  s ? ({ '--d': `${Number(s.toFixed(2))}s` } as CSSProperties) : undefined

/** Small orange heading + large title, used at the top of most sections. */
export function SectionHeader({
  eyebrow,
  title,
  gradient,
  as: Tag = 'h2',
  className,
  eyebrowClassName,
  titleClassName,
  revealDelay = 0,
  bare,
}: Props) {
  if (!eyebrow && !title) return null
  const content = (
    <>
      {eyebrow && (
        <p className={['eyebrow', eyebrowClassName].filter(Boolean).join(' ')} data-reveal="" style={delay(revealDelay)}>
          {eyebrow}
        </p>
      )}
      {title && (
        <Tag
          className={['h1', gradient && 'grad', titleClassName].filter(Boolean).join(' ')}
          data-reveal=""
          style={delay(revealDelay + 0.08)}
        >
          <MultilineText text={title} />
        </Tag>
      )}
    </>
  )
  return bare ? content : <div className={className}>{content}</div>
}
