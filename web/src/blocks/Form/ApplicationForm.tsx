'use client'

import { useActionState, useEffect, useRef, useState } from 'react'

import { submitApplication, type FormState } from '@/app/(frontend)/actions'
import { DISCIPLINES } from '@/collections/roleOptions'
import { Button } from '@/components/ui/Button/Button'

import styles from './Application.module.css'
import { APPLY_ROLE_EVENT, type ApplyRoleDetail } from './applyEvent'
import { Select } from './Select'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
type Errors = NonNullable<FormState['errors']>

type Props = {
  roles: { id: string; title: string }[]
  submitLabel: string
  successMessage: string
  note?: string | null
}

const disciplineOptions = [
  { value: '', label: 'Choose one' },
  ...DISCIPLINES.map((d) => ({ value: d, label: d })),
]

/**
 * Join Us "Send us your profile" form. "Start a new profile" remounts the inner form for a clean state.
 * The CV upload is on the backlog (docs/backlog-cv-upload.md).
 */
export function ApplicationForm(props: Props) {
  const [round, setRound] = useState(0)
  return <ApplicationFormInner key={round} {...props} onRestart={() => setRound(round + 1)} />
}

function ApplicationFormInner({ roles, submitLabel, successMessage, note, onRestart }: Props & { onRestart: () => void }) {
  const [state, action, pending] = useActionState<FormState, FormData>(submitApplication, { ok: false })
  const [clientErrors, setClientErrors] = useState<Errors>({})
  const [role, setRole] = useState('')
  const [discipline, setDiscipline] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  const errors: Errors = { ...state.errors, ...clientErrors }
  const roleOptions = [{ value: '', label: 'General application' }, ...roles.map((r) => ({ value: r.id, label: r.title }))]

  // "Apply for this role" in the roles list fills in the role and its discipline
  useEffect(() => {
    const onApply = (e: Event) => {
      const { id, discipline: d } = (e as CustomEvent<ApplyRoleDetail>).detail
      setRole(id)
      if (d) {
        setDiscipline(d)
        setClientErrors((prev) => ({ ...prev, discipline: undefined }))
      }
    }
    window.addEventListener(APPLY_ROLE_EVENT, onApply)
    return () => window.removeEventListener(APPLY_ROLE_EVENT, onApply)
  }, [])

  const validate = (e: React.FormEvent<HTMLFormElement>) => {
    const f = e.currentTarget
    const name = (f.elements.namedItem('name') as HTMLInputElement).value.trim()
    const email = (f.elements.namedItem('email') as HTMLInputElement).value.trim()
    const next: Errors = {}
    if (name.length < 2) next.name = 'Add your name.'
    if (!EMAIL.test(email)) next.email = 'Add an email we can reply to, like name@company.com.'
    if (!discipline) next.discipline = 'Choose the discipline closest to yours.'
    setClientErrors(next)
    const first = (['name', 'email', 'discipline'] as const).find((k) => next[k])
    if (first) {
      e.preventDefault()
      ;(f.querySelector(`#f-${first}`) as HTMLElement | null)?.focus()
    }
  }
  const clear = (field: keyof Errors) => () => {
    if (clientErrors[field]) setClientErrors({ ...clientErrors, [field]: undefined })
  }
  const fieldClass = (field?: keyof Errors, full?: boolean) =>
    [styles.field, full && styles.full, field && errors[field] && styles.bad].filter(Boolean).join(' ')

  if (state.ok && !pending) {
    const roleTitle = roles.find((r) => r.id === role)?.title
    return (
      <div className={styles.form}>
        <div className={styles.done} role="status">
          <h3>{state.firstName ? `Thanks, ${state.firstName}.` : 'Thanks.'}</h3>
          <p>
            {roleTitle ? `Your profile for ${roleTitle} is with us. ` : ''}
            {successMessage}
          </p>
          <button type="button" onClick={onRestart}>
            Start a new profile
          </button>
        </div>
      </div>
    )
  }

  return (
    <form
      ref={formRef}
      className={styles.form}
      action={action}
      onSubmit={validate}
      noValidate
      aria-label="Send us your profile"
    >
      <div className={fieldClass('name')}>
        <label htmlFor="f-name">Full name</label>
        <input id="f-name" name="name" autoComplete="name" required onInput={clear('name')} />
        <span className={styles.err}>{errors.name}</span>
      </div>
      <div className={fieldClass('email')}>
        <label htmlFor="f-email">Email</label>
        <input id="f-email" name="email" type="email" autoComplete="email" required onInput={clear('email')} />
        <span className={styles.err}>{errors.email}</span>
      </div>
      <div className={fieldClass()}>
        <label id="l-role" htmlFor="f-role">
          Applying for
        </label>
        <Select id="f-role" name="role" labelledBy="l-role" options={roleOptions} value={role} onChange={setRole} />
      </div>
      <div className={fieldClass('discipline')}>
        <label id="l-discipline" htmlFor="f-discipline">
          Your discipline
        </label>
        <Select
          id="f-discipline"
          name="discipline"
          labelledBy="l-discipline"
          options={disciplineOptions}
          value={discipline}
          required
          onChange={(v) => {
            setDiscipline(v)
            if (v) clear('discipline')()
          }}
        />
        <span className={styles.err}>{errors.discipline}</span>
      </div>
      <div className={fieldClass('link', true)}>
        <label htmlFor="f-link">LinkedIn or portfolio link</label>
        <input id="f-link" name="link" type="url" placeholder="https://" onInput={clear('link')} />
        {errors.link && <span className={styles.err}>{errors.link}</span>}
      </div>
      <div className={fieldClass(undefined, true)}>
        <label htmlFor="f-msg">What should we know?</label>
        <textarea id="f-msg" name="message" rows={3} />
      </div>
      <input className={styles.hp} name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className={styles.foot}>
        <p role={state.error ? 'alert' : undefined} className={state.error ? styles.failed : undefined}>
          {state.error ?? note}
        </p>
        <Button type="submit" appearance="dark" disabled={pending}>
          {pending ? 'Sending…' : submitLabel}
        </Button>
      </div>
    </form>
  )
}
