import Link from 'next/link'
import type { CSSProperties, ReactNode } from 'react'

import { Media } from '@/components/ui/Media'
import { resolveHref } from '@/lib/links'
import type { CardCarouselBlock } from '@/payload-types'

import styles from './PillarCard.module.css'

type Card = NonNullable<CardCarouselBlock['cards']>[number]

/** Image card with a big word over the image, then a small label + arrow and a short text. */
export function PillarCard({ card, index }: { card: Card; index: number }) {
  const href = card.hasLink ? resolveHref(card.link) : null
  const style = { '--d': `${(index % 3) * 0.08}s` } as CSSProperties
  const inner: ReactNode = (
    <>
      <div className={styles.img}>
        <Media resource={card.image} fill sizes="(max-width: 900px) 80vw, (max-width: 1100px) 40vw, 33vw" />
        <span className={styles.word}>{card.title}</span>
      </div>
      <div className={styles.body}>
        <div className={styles.meta}>
          <b>{card.tag}</b>
          <span className={styles.arrow} aria-hidden="true">
            <i className="arr" />
          </span>
        </div>
        {card.text && <p>{card.text}</p>}
      </div>
    </>
  )

  return href ? (
    <Link href={href} className={styles.card} data-reveal="" style={style}>
      {inner}
    </Link>
  ) : (
    <article className={styles.card} data-reveal="" style={style}>
      {inner}
    </article>
  )
}
