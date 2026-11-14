import { CMSLink } from '@/components/ui/CMSLink'
import { Media } from '@/components/ui/Media'
import { RichText } from '@/components/ui/RichText'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import type { MediaTextBlock as MediaTextBlockData } from '@/payload-types'

import { CardLayout } from './CardLayout'
import styles from './Component.module.css'

export function MediaTextBlock(props: MediaTextBlockData) {
  if (props.variant === 'card') return <CardLayout {...props} />
  return <FadeLayout {...props} />
}

/** "fade" variant: the image fades into the black page (Home "Who we are"). */
function FadeLayout({
  eyebrow,
  title,
  gradientTitle,
  body,
  showButton,
  link,
  image,
  imagePosition,
  fadeImageEdge,
  anchorId,
}: MediaTextBlockData) {
  return (
    <Section
      id={anchorId}
      className={[styles.section, imagePosition === 'left' && styles.imageLeft].filter(Boolean).join(' ')}
    >
      <div className={styles.copy}>
        <div>
          <SectionHeader bare eyebrow={eyebrow} title={title} gradient={gradientTitle} />
          {body && (
            <div className={`body ${styles.body}`} data-reveal="" style={{ ['--d' as string]: '.16s' }}>
              <RichText data={body} />
            </div>
          )}
        </div>
        {showButton && <CMSLink link={link} className={styles.button} reveal revealDelay={0.24} />}
      </div>
      <div className={styles.media} data-reveal="scale">
        <Media resource={image} fill className={styles.cover} sizes="(max-width: 1100px) 100vw, 50vw" />
        {fadeImageEdge && (
          // eslint-disable-next-line @next/next/no-img-element
          <img className={styles.fade} src="/brand/intro-fade.svg" alt="" loading="lazy" decoding="async" />
        )}
      </div>
    </Section>
  )
}
