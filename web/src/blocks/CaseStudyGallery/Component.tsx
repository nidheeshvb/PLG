import Link from 'next/link'
import type { CSSProperties } from 'react'

import { CMSLink } from '@/components/ui/CMSLink'
import { Media } from '@/components/ui/Media'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Slider } from '@/components/ui/Slider/Slider'
import { caseStudyHref } from '@/lib/routes'
import type { CaseStudy, CaseStudyGalleryBlock as CaseStudyGalleryBlockData } from '@/payload-types'

import styles from './Component.module.css'

/** Large image tiles for chosen case studies, two per row (or full width). */
export function CaseStudyGalleryBlock({
  eyebrow,
  title,
  items,
  showButton,
  link,
  anchorId,
}: CaseStudyGalleryBlockData) {
  const tiles = (items ?? []).filter(
    (it): it is typeof it & { caseStudy: CaseStudy } => typeof it.caseStudy === 'object' && it.caseStudy !== null,
  )

  // stagger the reveal of the second tile in each row
  const delays = tiles.reduce<{ col: number; delays: number[] }>(
    (acc, it) =>
      it.fullWidth
        ? { col: 0, delays: [...acc.delays, 0] }
        : { col: acc.col + 1, delays: [...acc.delays, acc.col % 2 ? 0.1 : 0] },
    { col: 0, delays: [] },
  ).delays
  return (
    <Section id={anchorId} className={styles.work}>
      <SectionHeader className={styles.head} eyebrow={eyebrow} title={title} eyebrowClassName={styles.eyebrow} />
      <Slider className={styles.gallery} label={title ?? undefined}>
        {tiles.map((it, i) => {
          const cs = it.caseStudy
          const delay = delays[i]
          return (
            <Link
              key={it.id ?? i}
              href={caseStudyHref(cs.slug)}
              className={[styles.proj, it.fullWidth && styles.full].filter(Boolean).join(' ')}
              data-cursor=""
              data-reveal="scale"
              style={delay ? ({ '--d': `${delay}s` } as CSSProperties) : undefined}
            >
              <Media
                resource={cs.image}
                fill
                decorative
                sizes={it.fullWidth ? '(max-width: 900px) 90vw, 100vw' : '(max-width: 900px) 90vw, 50vw'}
              />
              <div className={styles.overlay}>
                <h3 className={styles.title}>{cs.cardTitle || cs.title}</h3>
                <div className={styles.more}>
                  <div>
                    <p className={styles.desc}>{cs.summary}</p>
                    <p className={styles.cta}>
                      Explore Project{' '}
                      <span>
                        <i className="arr" />
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </Slider>
      {showButton && <CMSLink link={link} reveal />}
    </Section>
  )
}
