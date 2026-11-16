import type { CSSProperties } from 'react'

import type { BlockContext } from '@/blocks/context'
import { CMSLink } from '@/components/ui/CMSLink'
import { Media } from '@/components/ui/Media'
import { Section } from '@/components/ui/Section'
import type {
  ServiceCollagePiece,
  ServiceDetailBlock as ServiceDetailBlockData,
  ServiceHighlightPiece,
  ServiceImagePiece,
  ServiceListPiece,
} from '@/payload-types'

import styles from './Component.module.css'
import { ZoomFigure } from './ZoomFigure'

const two = (n: number) => String(n).padStart(2, '0')

function ImagePiece({ image, caption }: ServiceImagePiece) {
  return (
    <ZoomFigure className={styles.img}>
      <Media resource={image} fill decorative sizes="(max-width: 1100px) 100vw, 55vw" />
      {caption && <figcaption>{caption}</figcaption>}
    </ZoomFigure>
  )
}

function HighlightPiece({ label, name, note, text }: ServiceHighlightPiece) {
  return (
    <div className={styles.fuze} data-reveal="">
      <div className={styles.fuzeId}>
        {label && <span className={styles.fuzeK}>{label}</span>}
        <span className={styles.fuzeWord}>
          {name}
          {note && <small>{note}</small>}
        </span>
      </div>
      {text && <p className={styles.fuzeD}>{text}</p>}
    </div>
  )
}

function ListPiece({ items }: ServiceListPiece) {
  if (!items?.length) return null
  return (
    <ul className={styles.subs}>
      {items.map((it, i) => {
        const text = it.text ? <p className={styles.subD}>{it.text}</p> : null
        const textLink =
          it.showLink && it.link ? (
            <CMSLink link={it.link} as="text" className={styles.subLink}>
              {it.link.label}
              <i className="arr" aria-hidden="true" />
            </CMSLink>
          ) : null
        return (
          <li key={it.id ?? i} className={styles.sub} data-reveal="">
            <div className={styles.subH}>
              <h3 className={styles.subT}>{it.title}</h3>
              {it.tag && <span className={styles.subTag}>{it.tag}</span>}
            </div>
            {textLink ? (
              <div>
                {text}
                {textLink}
              </div>
            ) : (
              text
            )}
          </li>
        )
      })}
    </ul>
  )
}

function CollagePiece({ images }: ServiceCollagePiece) {
  if (!images?.length) return null
  return (
    <div className={styles.collage} data-reveal="">
      {images.map((im, i) => (
        <figure key={im.id ?? i}>
          <Media resource={im.image} fill decorative sizes={i ? '(max-width: 900px) 50vw, 25vw' : '(max-width: 900px) 100vw, 30vw'} />
        </figure>
      ))}
    </div>
  )
}

/**
 * Services chapter: number ("01 / 04", from the order of Service detail sections), name, optional hook,
 * intro and buttons in a column that stays in view; content pieces on the right. Every second chapter
 * sits on the grey band.
 */
export function ServiceDetailBlock({ title, hook, lead, links, content, anchorId, position }: ServiceDetailBlockData & BlockContext) {
  const index = position?.index ?? 1
  const count = position?.count ?? 1
  return (
    <Section id={anchorId} className={[styles.svc, index % 2 === 0 && styles.alt].filter(Boolean).join(' ')}>
      <div className={styles.grid}>
        <div className={styles.aside}>
          <p className={styles.n}>
            {two(index)} <span>/ {two(count)}</span>
          </p>
          <h2 className={`${styles.t} grad`}>{title}</h2>
          {hook && <p className={styles.hook}>{hook}</p>}
          {lead && <p className={styles.lead}>{lead}</p>}
          {!!links?.length && (
            <div className={styles.links}>
              {links.map((l, i) => (
                <CMSLink key={l.id ?? i} link={l} style={{ marginTop: 8 } as CSSProperties} />
              ))}
            </div>
          )}
        </div>
        <div className={styles.main}>
          {content?.map((piece, i) => {
            switch (piece.blockType) {
              case 'svcImage':
                return <ImagePiece key={piece.id ?? i} {...piece} />
              case 'svcHighlight':
                return <HighlightPiece key={piece.id ?? i} {...piece} />
              case 'svcList':
                return <ListPiece key={piece.id ?? i} {...piece} />
              case 'svcCollage':
                return <CollagePiece key={piece.id ?? i} {...piece} />
              default:
                return null
            }
          })}
        </div>
      </div>
    </Section>
  )
}
