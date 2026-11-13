import { Media } from '@/components/ui/Media'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import type { FormBlock as FormBlockData } from '@/payload-types'

import styles from './Component.module.css'
import { EnquiryForm } from './EnquiryForm'

/** Form section. "enquiry" is the contact form; the job application form is added with Join Us. */
export function FormBlock({
  eyebrow,
  title,
  lede,
  backgroundImage,
  submitLabel,
  successMessage,
  anchorId,
}: FormBlockData) {
  return (
    <Section id={anchorId} tone="light" className={styles.contact}>
      {backgroundImage && (
        <>
          <div className={styles.bg}>
            <Media resource={backgroundImage} fill decorative sizes="100vw" />
          </div>
          <div className={styles.blur} />
          <div className={styles.grad} />
        </>
      )}
      <div className={styles.inner}>
        <SectionHeader bare eyebrow={eyebrow} title={title} />
        {lede && (
          <p className={styles.lede} data-reveal="" style={{ ['--d' as string]: '.16s' }}>
            {lede}
          </p>
        )}
        <EnquiryForm submitLabel={submitLabel} successMessage={successMessage} />
      </div>
      {backgroundImage && (
        <div className={styles.photoM}>
          <Media resource={backgroundImage} fill decorative sizes="100vw" />
        </div>
      )}
    </Section>
  )
}
