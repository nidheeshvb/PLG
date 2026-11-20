'use client'

import { startTransition, useActionState, useRef } from 'react'

import type { FormState } from '@/app/(frontend)/actions'

type Errors = NonNullable<FormState['errors']>

/**
 * `useActionState` for a form that must not be sent twice by quick repeated clicks (E2E-3-2).
 * The button's `disabled` only applies once React re-renders, so a second click in the same
 * moment would send again. In onSubmit: return early (cancelled) when `lock.isBusy()`, and call
 * `lock.send(e)` once the form is valid; the lock is released when the send ends.
 *
 * `send` posts the form itself instead of letting React run the form's `action`: React 19 empties
 * every field after a form action, so a visitor whose send was refused by the server (a bad link,
 * "something went wrong") lost everything they had typed. The `action` prop stays on the form so
 * it still works without JavaScript.
 */
export function useLockedActionState(action: (state: FormState, data: FormData) => Promise<FormState>) {
  const busy = useRef(false)
  const [state, dispatch, pending] = useActionState<FormState, FormData>(
    async (prev, data) => {
      try {
        return await action(prev, data)
      } finally {
        busy.current = false
      }
    },
    { ok: false },
  )
  const lock = {
    isBusy: () => busy.current,
    send: (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      busy.current = true
      const data = new FormData(e.currentTarget)
      startTransition(() => dispatch(data))
    },
  }
  return [state, dispatch, pending, lock] as const
}

/**
 * Accessibility props for a field (E2E-8-2): marks it invalid and points to its error text,
 * so a screen reader reads the problem when the field gets focus.
 */
export const fieldA11y = (errors: Errors, field: keyof Errors, errorId: string) =>
  errors[field] ? { 'aria-invalid': true as const, 'aria-describedby': errorId } : { 'aria-invalid': false as const }

/** Announces the list of problems after a failed send (screen readers only). */
export function ErrorSummary({ errors }: { errors: Errors }) {
  const messages = Object.values(errors).filter(Boolean)
  return (
    <p className="sr-only" role="alert">
      {messages.length ? `Please check the form: ${messages.join(' ')}` : ''}
    </p>
  )
}
