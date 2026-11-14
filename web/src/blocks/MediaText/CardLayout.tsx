import type { CSSProperties } from 'react'

import { CMSLink } from '@/components/ui/CMSLink'
import { Media } from '@/components/ui/Media'
import { RichText } from '@/components/ui/RichText'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import type { MediaTextBlock } from '@/payload-types'

import styles from './CardLayout.module.css'

const d = (s: string) => ({ '--d': s }) as CSSProperties

/**
 * "card" variant: rounded image (zooms out when it scrolls in) with an optional report card,
 * next to heading, text, an optional list and a button, on the dark grey band.
 */
export function CardLayout({
  eyebrow,
  title,
  gradientTitle,
  body,
  listHeading,
  listItems,
  showButton,
  link,
  image,
  imagePosition,
  report,
  anchorId,
}: MediaTextBlock) {
  const bars = report?.bars ?? []
  return (
    <Section id={anchorId} className={styles.section}>
      <div className={[styles.grid, imagePosition === 'right' && styles.imageRight].filter(Boolean).join(' ')}>
        <div className={styles.img} data-inview="">
          <Media resource={image} fill sizes="(max-width: 1100px) 100vw, 50vw" />
          {report?.title && (
            <div className={styles.report} aria-hidden="true">
              <div className={styles.top}>
                <b>{report.title}</b>
                {report.badge && (
                  <span className={styles.live}>
                    <i />
                    {report.badge}
                  </span>
                )}
              </div>
              {!!bars.length && (
                <div className={styles.bars}>
                  {bars.map((b, i) => (
                    <div key={b.id ?? i} className={styles.bar}>
                      <span>{b.label}</span>
                      <span className={styles.track}>
                        <i style={{ '--w': `${b.value}%`, '--bd': `${i * 0.15}s` } as CSSProperties} />
                      </span>
                    </div>
                  ))}
                </div>
              )}
              {report.caption && <p className={styles.cap}>{report.caption}</p>}
            </div>
          )}
        </div>
        <div className={styles.copy}>
          <SectionHeader eyebrow={eyebrow} title={title} gradient={gradientTitle} />
          {body && (
            <div className={`body ${styles.body}`} data-reveal="" style={d('.16s')}>
              <RichText data={body} />
            </div>
          )}
          {!!listItems?.length && (
            <div className={styles.fits} data-reveal="" style={d('.2s')}>
              {listHeading && <p className={styles.fitsK}>{listHeading}</p>}
              {listItems.map((it, i) => (
                <div key={it.id ?? i} className={styles.fit}>
                  <b>{it.title}</b>
                  {it.text && <span>{it.text}</span>}
                </div>
              ))}
            </div>
          )}
          {showButton && <CMSLink link={link} className={styles.button} reveal revealDelay={0.24} />}
        </div>
      </div>
    </Section>
  )
}
