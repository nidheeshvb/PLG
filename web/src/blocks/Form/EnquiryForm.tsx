'use client'

import { useRef, useState } from 'react'

import { submitEnquiry, type FormState } from '@/app/(frontend)/actions'
import { Button } from '@/components/ui/Button/Button'

import styles from './Component.module.css'
import { ErrorSummary, fieldA11y, useLockedActionState } from './formHelpers'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
/** Same limit as the server (submitEnquiry): longer messages would be cut. */
const MAX_MESSAGE = 5000
type Errors = NonNullable<FormState['errors']>

/** Name / email / phone / message form. Checks fields in the browser, then again on the server. */
export function EnquiryForm({ submitLabel, successMessage }: { submitLabel: string; successMessage: string }) {
  const formRef = useRef<HTMLFormElement>(null)
  const [state, action, pending, lock] = useLockedActionState(async (prev, data) => {
    const result = await submitEnquiry(prev, data)
    if (result.ok) formRef.current?.reset()
    return result
  })
  const [clientErrors, setClientErrors] = useState<Errors>({})
  const errors: Errors = { ...state.errors, ...clientErrors }

  const validate = (e: React.FormEvent<HTMLFormElement>) => {
    if (lock.isBusy()) return void e.preventDefault()
    const f = e.currentTarget
    const name = (f.elements.namedItem('name') as HTMLInputElement).value.trim()
    const email = (f.elements.namedItem('email') as HTMLInputElement).value
    const next: Errors = {}
    if (name.length < 2) next.name = 'Please enter your name'
    if (!EMAIL.test(email)) next.email = 'Enter a valid email'
    setClientErrors(next)
    if (next.name || next.email) {
      e.preventDefault()
      ;(f.elements.namedItem(next.name ? 'name' : 'email') as HTMLInputElement).focus()
      return
    }
    lock.send(e)
  }

  const clear = (field: keyof Errors) => () => {
    if (clientErrors[field]) setClientErrors({ ...clientErrors, [field]: undefined })
  }
  const fieldClass = (field?: keyof Errors) =>
    [styles.field, field && errors[field] && styles.err].filter(Boolean).join(' ')
  const sent = state.ok && !pending

  return (
    <form
      ref={formRef}
      className={[styles.form, sent && styles.sent].filter(Boolean).join(' ')}
      action={action}
      onSubmit={validate}
      noValidate
      data-reveal=""
      style={{ ['--d' as string]: '.24s' }}
      aria-label="Enquiry form"
    >
      <div className={fieldClass('name')}>
        <label htmlFor="f-name">Name</label>
        <input id="f-name" name="name" placeholder="Your name" autoComplete="name" required onInput={clear('name')} {...fieldA11y(errors, 'name', 'f-name-err')} />
        <span id="f-name-err" className={styles.msg}>{errors.name ?? 'Please enter your name'}</span>
      </div>
      <div className={fieldClass('email')}>
        <label htmlFor="f-email">Email</label>
        <input
          id="f-email"
          name="email"
          type="email"
          placeholder="you@emailid.com"
          autoComplete="email"
          required
          onInput={clear('email')}
          {...fieldA11y(errors, 'email', 'f-email-err')}
        />
        <span id="f-email-err" className={styles.msg}>{errors.email ?? 'Enter a valid email'}</span>
      </div>
      <div className={fieldClass()}>
        <label htmlFor="f-phone">Phone</label>
        <input id="f-phone" name="phone" type="tel" placeholder="Phone Number" autoComplete="tel" />
      </div>
      <div className={fieldClass()}>
        <label htmlFor="f-msg">Tell us about your project</label>
        <textarea id="f-msg" name="message" rows={1} maxLength={MAX_MESSAGE} placeholder="Share few details" />
      </div>
      <ErrorSummary errors={errors} />
      <input className={styles.hp} name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className={styles.actions}>
        <Button type="submit" disabled={pending}>
          {pending ? 'Sending…' : sent ? 'Sent' : submitLabel}
        </Button>
        <p
          className={[styles.ok, (sent || state.error) && styles.okShow, state.error && !sent && styles.okError]
            .filter(Boolean)
            .join(' ')}
          role="status"
        >
          {state.error && !sent ? state.error : successMessage}
        </p>
      </div>
    </form>
  )
}
