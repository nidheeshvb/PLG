'use client'

import { useActionState, useEffect, useRef, useState } from 'react'

import { submitContact, type FormState } from '@/app/(frontend)/actions'
import { Button } from '@/components/ui/Button/Button'
import { prefersReducedMotion } from '@/hooks/useReducedMotion'

import styles from './Contact.module.css'

const WORK_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const MAX = 1500
type Errors = NonNullable<FormState['errors']>

type Props = {
  submitLabel: string
  successTitle: string
  successMessage: string
  interestsLabel: string
  interestsHint: string
  interests: { label: string; showsNote: boolean }[]
  note: { text: string; href: string | null; label: string | null } | null
  messageLabel: string
  messagePlaceholder: string
  consentText: string
  sectionId?: string | null
}

/** Contact page enquiry: "Send another enquiry" remounts the inner form for a clean state. */
export function ContactForm(props: Props) {
  const [round, setRound] = useState(0)
  return <ContactFormInner key={round} {...props} onRestart={() => setRound(round + 1)} />
}

function ContactFormInner(props: Props & { onRestart: () => void }) {
  const { submitLabel, successTitle, successMessage, interestsLabel, interestsHint, interests, note } = props
  const { messageLabel, messagePlaceholder, consentText, sectionId, onRestart } = props
  const [state, action, pending] = useActionState<FormState, FormData>(submitContact, { ok: false })
  const [clientErrors, setClientErrors] = useState<Errors>({})
  const [count, setCount] = useState(0)
  const [noteOn, setNoteOn] = useState(false)
  const [picked, setPicked] = useState<string[]>([])
  const doneRef = useRef<HTMLDivElement>(null)
  const errors: Errors = { ...state.errors, ...clientErrors }
  const sent = state.ok && !pending

  // after sending: bring the thank-you panel into view and focus it
  useEffect(() => {
    if (!sent) return
    doneRef.current?.focus({ preventScroll: true })
    if (sectionId)
      document.getElementById(sectionId)?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
  }, [sent, sectionId])

  const check = (f: HTMLFormElement): Errors => {
    const v = (n: string) => ((f.elements.namedItem(n) as HTMLInputElement | null)?.value ?? '').trim()
    const next: Errors = {}
    if (v('name').length < 2) next.name = 'Add your name.'
    if (v('company').length < 2) next.company = 'Add the company you’re contacting us from.'
    if (!WORK_EMAIL.test(v('email'))) next.email = 'Add a work email we can reply to, like name@company.com.'
    if (v('message').length < 10) next.message = 'Tell us a little about the ambition, even a sentence or two.'
    if (!(f.elements.namedItem('consent') as HTMLInputElement | null)?.checked) next.consent = 'Tick to let us use your details to reply.'
    return next
  }
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const f = e.currentTarget
    const next = check(f)
    setClientErrors(next)
    setPicked(new FormData(f).getAll('interests').map(String))
    const first = (['name', 'company', 'email', 'message', 'consent'] as const).find((k) => next[k])
    if (first) {
      e.preventDefault()
      ;(f.querySelector(`#c-${first}`) as HTMLElement | null)?.focus()
    }
  }
  // once a field has been flagged, re-check it as the visitor fixes it
  const recheck = (field: keyof Errors) => (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!clientErrors[field]) return
    const form = e.currentTarget.form
    if (form) setClientErrors({ ...clientErrors, [field]: check(form)[field] })
  }
  const fieldClass = (field?: keyof Errors, full?: boolean) =>
    [styles.field, full && styles.full, field && errors[field] && styles.bad].filter(Boolean).join(' ')

  if (sent) {
    return (
      <div className={styles.form}>
        <div ref={doneRef} className={styles.done} role="status" tabIndex={-1}>
          <span className={styles.tick} aria-hidden="true">
            <svg viewBox="0 0 22 22">
              <path fill="none" stroke="#000d1d" strokeWidth="2.4" d="M5 11.5l4 4 8-9" />
            </svg>
          </span>
          <h3>{successTitle}</h3>
          <p>
            {state.firstName ? `${state.firstName}, ` : ''}
            {successMessage}
            {picked.length ? ' You told us you’re looking to:' : ''}
          </p>
          {picked.length > 0 && (
            <ul>
              {picked.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          )}
          <button type="button" onClick={onRestart}>
            Send another enquiry
          </button>
        </div>
      </div>
    )
  }

  const req = (
    <span className={styles.req} aria-hidden="true">
      *
    </span>
  )
  return (
    <form className={styles.form} action={action} onSubmit={onSubmit} noValidate aria-label="Enquiry form">
      <div className={fieldClass('name')}>
        <label htmlFor="c-name">Name{req}</label>
        <input id="c-name" name="name" autoComplete="name" required aria-invalid={Boolean(errors.name)} onInput={recheck('name')} />
        <span className={styles.err}>{errors.name}</span>
      </div>
      <div className={fieldClass('company')}>
        <label htmlFor="c-company">Company{req}</label>
        <input id="c-company" name="company" autoComplete="organization" required aria-invalid={Boolean(errors.company)} onInput={recheck('company')} />
        <span className={styles.err}>{errors.company}</span>
      </div>
      <div className={fieldClass('email')}>
        <label htmlFor="c-email">Work email{req}</label>
        <input
          id="c-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          required
          aria-invalid={Boolean(errors.email)}
          onInput={recheck('email')}
        />
        <span className={styles.err}>{errors.email}</span>
      </div>
      <div className={fieldClass()}>
        <label htmlFor="c-phone">
          Phone<span className={styles.opt}>Optional</span>
        </label>
        <input id="c-phone" name="phone" type="tel" autoComplete="tel" placeholder="+971" />
      </div>

      {interests.length > 0 && (
        <fieldset
          className={styles.fs}
          onChange={(e) => {
            const f = (e.currentTarget as HTMLFieldSetElement).form
            setNoteOn(Boolean(f?.querySelector('input[data-note]:checked')))
          }}
        >
          <legend>
            {interestsLabel}
            {interestsHint && <span className={styles.opt}>{interestsHint}</span>}
          </legend>
          <div className={styles.chips}>
            {interests.map((it, i) => (
              <label key={i} className={styles.chip}>
                <input type="checkbox" name="interests" value={it.label} data-note={it.showsNote ? '' : undefined} />
                <span>{it.label}</span>
              </label>
            ))}
          </div>
          {note && noteOn && (
            <p className={styles.note}>
              {note.text} {note.href && note.label && <a href={note.href}>{note.label}</a>}
              {note.href && note.label ? '.' : ''}
            </p>
          )}
        </fieldset>
      )}

      <div className={fieldClass('message', true)}>
        <label htmlFor="c-message">
          {messageLabel}
          {req}
        </label>
        <textarea
          id="c-message"
          name="message"
          rows={5}
          maxLength={MAX}
          required
          placeholder={messagePlaceholder}
          aria-invalid={Boolean(errors.message)}
          onInput={(e) => {
            setCount(e.currentTarget.value.length)
            recheck('message')(e)
          }}
        />
        <span className={styles.err}>{errors.message}</span>
        <span className={styles.count} aria-live="polite">
          {count} / {MAX}
        </span>
      </div>

      <label className={[styles.consent, errors.consent && styles.bad].filter(Boolean).join(' ')}>
        <input
          id="c-consent"
          type="checkbox"
          name="consent"
          required
          aria-invalid={Boolean(errors.consent)}
          onChange={(e) => {
            if (clientErrors.consent && e.currentTarget.checked) setClientErrors({ ...clientErrors, consent: undefined })
          }}
        />
        <span>{consentText}</span>
        <span className={styles.err}>{errors.consent}</span>
      </label>
      <input className={styles.hp} name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className={styles.foot}>
        <p className={state.error ? styles.failed : undefined} role={state.error ? 'alert' : undefined}>
          {state.error ?? (
            <>
              <span className={styles.req}>*</span> Required
            </>
          )}
        </p>
        <Button type="submit" appearance="dark" disabled={pending}>
          {pending ? 'Sending…' : submitLabel}
        </Button>
      </div>
    </form>
  )
}
