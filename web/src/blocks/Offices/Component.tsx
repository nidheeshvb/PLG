import { Media } from '@/components/ui/Media'
import { MultilineText } from '@/components/ui/MultilineText'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import type { OfficesBlock as OfficesBlockData } from '@/payload-types'

import styles from './Component.module.css'
import { CopyButton, LocalTime } from './OfficesClient'

const ZONE_LABEL: Record<string, string> = { 'Asia/Dubai': 'GST', 'Asia/Riyadh': 'AST', 'Europe/London': '' }
const d = (n: number) => ({ ['--d' as string]: `${n}s` })

/** Contact page offices: photo with city + live local time, and the contact rows beside it. */
export function OfficesBlock(props: OfficesBlockData) {
  const { eyebrow, title, gradientTitle, lede, image, tag, city, timeZone, email, phone, address, directionsQuery, hours, anchorId } = props
  const maps = address || directionsQuery
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((directionsQuery || address || '').replace(/\s+/g, ' ').trim())}`
    : null
  return (
    <Section id={anchorId} className={styles.off}>
      <div className={styles.grid}>
        <figure className={styles.img} data-reveal="">
          <Media resource={image} fill sizes="(max-width: 1100px) 100vw, 45vw" />
          {tag && <span className={styles.tag}>{tag}</span>}
          <figcaption className={styles.cap}>
            <span className={styles.city}>{city}</span>
            {timeZone && timeZone !== 'none' && (
              <span className={styles.time}>
                <i aria-hidden="true" />
                Local time <LocalTime timeZone={timeZone} /> {ZONE_LABEL[timeZone] ?? ''}
              </span>
            )}
          </figcaption>
        </figure>

        <div className={styles.body}>
          <SectionHeader eyebrow={eyebrow} title={title} gradient={gradientTitle} />
          {lede && (
            <p className={styles.lede} data-reveal="" style={d(0.12)}>
              {lede}
            </p>
          )}
          <dl className={styles.rows} data-reveal="" style={d(0.16)}>
            {email && (
              <div className={styles.row}>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${email}`}>{email}</a>
                </dd>
                <dd className={styles.act}>
                  <CopyButton text={email} />
                </dd>
              </div>
            )}
            {phone && (
              <div className={styles.row}>
                <dt>Phone</dt>
                <dd>
                  <a href={`tel:${phone.replace(/[^\d+]/g, '')}`}>{phone}</a>
                </dd>
                <dd className={styles.act}>
                  <CopyButton text={phone} />
                </dd>
              </div>
            )}
            {address && (
              <div className={`${styles.row} ${styles.small} ${styles.addr}`}>
                <dt>Address</dt>
                <dd>
                  <MultilineText text={address} />
                </dd>
                {maps && (
                  <dd className={styles.act}>
                    <a className={styles.copy} href={maps} target="_blank" rel="noopener noreferrer">
                      <span>Directions</span>
                      <i className="arr" aria-hidden="true" />
                    </a>
                  </dd>
                )}
              </div>
            )}
            {hours && (
              <div className={`${styles.row} ${styles.small}`}>
                <dt>Hours</dt>
                <dd>
                  <MultilineText text={hours} />
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </Section>
  )
}
