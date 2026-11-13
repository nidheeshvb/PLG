import { CMSLink } from '@/components/ui/CMSLink'
import { Media } from '@/components/ui/Media'
import { SectionHeader } from '@/components/ui/SectionHeader'
import type { StackedPanelsBlock as StackedPanelsBlockData } from '@/payload-types'

import styles from './Component.module.css'
import { StackedPanelsScroll } from './StackedPanelsScroll'

/** Full-screen panels; each one slides over the previous, which shrinks and darkens. */
export function StackedPanelsBlock({ panels, anchorId }: StackedPanelsBlockData) {
  if (!panels?.length) return null
  return (
    <StackedPanelsScroll id={anchorId} className={styles.stack} innerClass={styles.inner} shadeClass={styles.shade}>
      {panels.map((p, i) => (
        <div key={p.id ?? i} className={styles.panel} data-panel="">
          <div className={styles.inner}>
            <div className={styles.img}>
              <Media resource={p.image} fill sizes="(max-width: 1100px) 100vw, 40vw" />
            </div>
            <div className={styles.copy}>
              <SectionHeader eyebrow={p.eyebrow} title={p.title} gradient={p.gradientTitle} />
              {p.text && (
                <p className={`body ${styles.text}`} data-reveal="" style={{ ['--d' as string]: '.16s' }}>
                  {p.text}
                </p>
              )}
              {p.showButton && <CMSLink link={p.link} className={styles.button} reveal revealDelay={0.24} />}
            </div>
          </div>
          {i < panels.length - 1 && <div className={styles.shade} />}
        </div>
      ))}
    </StackedPanelsScroll>
  )
}
