import { Marquee } from '@/components/ui/Marquee/Marquee'
import { Media } from '@/components/ui/Media'
import { Parallax } from '@/components/ui/Parallax'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import type { BackgroundTextBlock as BackgroundTextBlockData } from '@/payload-types'

import styles from './Component.module.css'

/** Heading + text over a darkened, slowly drifting photo, with an optional scrolling strip. */
export function BackgroundTextBlock({
  eyebrow,
  title,
  gradientTitle,
  text,
  image,
  ticker,
  anchorId,
}: BackgroundTextBlockData) {
  return (
    <Section id={anchorId} className={styles.section}>
      <Parallax className={styles.bg} mode="section" range={80}>
        <Media resource={image} fill decorative sizes="100vw" />
      </Parallax>
      <div className={styles.shade} />
      <div className={styles.inner}>
        <SectionHeader eyebrow={eyebrow} title={title} gradient={gradientTitle} />
        {text && (
          <p className="body" data-reveal="" style={{ ['--d' as string]: '.16s' }}>
            {text}
          </p>
        )}
      </div>
      {!!ticker?.length && (
        <div className={styles.ticker} aria-hidden="true">
          <Marquee className={styles.track} setClassName={styles.set} duration={30}>
            {ticker.map((t, i) => (
              <span key={t.id ?? i} className={styles.item}>
                <span>{t.text}</span>
                <i />
              </span>
            ))}
          </Marquee>
        </div>
      )}
    </Section>
  )
}
