import { Media } from '@/components/ui/Media'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { getOpenRoles } from '@/lib/payload'
import type { FormBlock as FormBlockData } from '@/payload-types'

import { ApplicationForm } from './ApplicationForm'
import appStyles from './Application.module.css'
import styles from './Component.module.css'
import { EnquiryForm } from './EnquiryForm'

/** Form section: "enquiry" (contact form over a photo) or "application" (Join Us profile form on a white band). */
export async function FormBlock(props: FormBlockData) {
  if (props.formType === 'application') return <ApplicationSection {...props} />
  const { eyebrow, title, lede, backgroundImage, submitLabel, successMessage, anchorId } = props
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

async function ApplicationSection({ eyebrow, title, lede, submitLabel, successMessage, note, anchorId }: FormBlockData) {
  const roles = (await getOpenRoles()).map((r) => ({ id: String(r.id), title: r.title }))
  return (
    <Section id={anchorId} tone="light" className={appStyles.apply}>
      <div className={appStyles.inner}>
        <div className={appStyles.copy}>
          <SectionHeader bare eyebrow={eyebrow} title={title} />
          {lede && (
            <p className={appStyles.lede} data-reveal="" style={{ ['--d' as string]: '.16s' }}>
              {lede}
            </p>
          )}
        </div>
        <ApplicationForm roles={roles} submitLabel={submitLabel} successMessage={successMessage} note={note} />
      </div>
    </Section>
  )
}
