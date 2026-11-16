import { CMSLink } from '@/components/ui/CMSLink'
import { Media } from '@/components/ui/Media'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { resolveHref } from '@/lib/links'
import { getOpenRoles } from '@/lib/payload'
import type { FormBlock as FormBlockData } from '@/payload-types'

import { ApplicationForm } from './ApplicationForm'
import appStyles from './Application.module.css'
import styles from './Component.module.css'
import contactStyles from './Contact.module.css'
import { ContactForm } from './ContactForm'
import { EnquiryForm } from './EnquiryForm'

/** Form section: "enquiry" (contact form over a photo) or "application" (Join Us profile form on a white band). */
export async function FormBlock(props: FormBlockData) {
  if (props.formType === 'application') return <ApplicationSection {...props} />
  if (props.formType === 'contact') return <ContactSection {...props} />
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

/** Contact page: intro, numbered promises and a link beside the detailed enquiry form, on a white band. */
function ContactSection(props: FormBlockData) {
  const { eyebrow, title, lede, promises, asideText, asideLink, interests, interestNote, interestNoteLink, anchorId } = props
  const s = contactStyles
  const noteHref = resolveHref(interestNoteLink)
  const d = (n: number) => ({ ['--d' as string]: `${n}s` })
  return (
    <Section id={anchorId} tone="light" className={s.enq}>
      <div className={s.inner}>
        <div className={s.copy}>
          <SectionHeader bare eyebrow={eyebrow} title={title} />
          {lede && (
            <p className={s.lede} data-reveal="" style={d(0.16)}>
              {lede}
            </p>
          )}
          {!!promises?.length && (
            <ul className={s.promise} data-reveal="" style={d(0.24)}>
              {promises.map((p, i) => (
                <li key={p.id ?? i}>
                  <b>{p.title}</b>
                  {p.text && <span>{p.text}</span>}
                </li>
              ))}
            </ul>
          )}
          {(asideText || asideLink?.label) && (
            <p className={s.aside} data-reveal="" style={d(0.3)}>
              {asideText}{' '}
              <CMSLink link={asideLink} as="text">
                {asideLink?.label}
                <i className="arr" aria-hidden="true" />
              </CMSLink>
            </p>
          )}
        </div>
        <ContactForm
          sectionId={anchorId}
          submitLabel={props.submitLabel}
          successTitle={props.successTitle || 'Thank you.'}
          successMessage={props.successMessage}
          interestsLabel={props.interestsLabel || ''}
          interestsHint={props.interestsHint || ''}
          interests={(interests ?? []).map((i) => ({ label: i.label, showsNote: Boolean(i.showsNote) }))}
          note={interestNote ? { text: interestNote, href: noteHref, label: interestNoteLink?.label ?? null } : null}
          messageLabel={props.messageLabel || 'Message'}
          messagePlaceholder={props.messagePlaceholder || ''}
          consentText={props.consentText || ''}
        />
      </div>
    </Section>
  )
}
