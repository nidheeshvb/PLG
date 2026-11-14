import { CMSLink } from '@/components/ui/CMSLink'
import { Media } from '@/components/ui/Media'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { getSiteSettings } from '@/lib/payload'
import type { CtaBannerBlock as CtaBannerBlockData } from '@/payload-types'

import styles from './Component.module.css'

/** White banner: heading, text and a button over an image that fades to white on the left. */
export async function CtaBannerBlock({ useDefault, custom, anchorId }: CtaBannerBlockData) {
  const content = useDefault === false ? custom : (await getSiteSettings()).cta
  if (!content?.title) return null
  const { eyebrow, title, lede, link, image } = content
  return (
    <Section id={anchorId} tone="light" className={styles.cta}>
      <Media resource={image} fill decorative className={styles.bg} sizes="100vw" />
      <div className={styles.grad} />
      <div className={styles.inner}>
        <SectionHeader bare eyebrow={eyebrow} title={title} />
        {lede && (
          <p className={styles.lede} data-reveal="" style={{ ['--d' as string]: '.16s' }}>
            {lede}
          </p>
        )}
        <CMSLink link={link} className={styles.button} reveal revealDelay={0.24} />
      </div>
    </Section>
  )
}
