import Link from 'next/link'
import type { CSSProperties, ReactNode } from 'react'

import { Media } from '@/components/ui/Media'
import { newTabProps, resolveHref } from '@/lib/links'
import type { CardCarouselBlock } from '@/payload-types'

import styles from './ServiceCard.module.css'

type Card = NonNullable<CardCarouselBlock['cards']>[number]

/** Numbered image card; the text slides up over the image on hover (always shown on mobile). */
export function ServiceCard({ card, index }: { card: Card; index: number }) {
  const href = card.hasLink ? resolveHref(card.link) : null
  const style = { '--d': `${(index % 4) * 0.08}s` } as CSSProperties
  const inner: ReactNode = (
    <>
      <div className={styles.img}>
        <Media resource={card.image} fill decorative sizes="(max-width: 900px) 80vw, 25vw" />
        {card.text && (
          <p className={styles.desc}>
            <span>{card.text}</span>
          </p>
        )}
      </div>
      <div className={styles.meta}>
        <div className={styles.metaL}>
          <span className={styles.num}>{String(index + 1).padStart(2, '0')}</span>
          <span className={styles.name}>{card.title}</span>
        </div>
        <span className={styles.arrow} aria-hidden="true">
          <i className="arr" />
        </span>
      </div>
    </>
  )

  return href ? (
    <Link href={href} className={styles.card} data-reveal="" style={style} {...newTabProps(card.link?.newTab)}>
      {inner}
    </Link>
  ) : (
    <div className={styles.card} data-reveal="" style={style}>
      {inner}
    </div>
  )
}
