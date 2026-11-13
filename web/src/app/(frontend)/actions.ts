'use server'

import { headers } from 'next/headers'

import { getPayloadClient } from '@/lib/payload'

export type FormState = { ok: boolean; errors?: Partial<Record<'name' | 'email', string>>; error?: string }

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const str = (v: FormDataEntryValue | null, max = 5000) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

/** Saves an enquiry from any "Form" block into Form messages. */
export async function submitEnquiry(_prev: FormState, formData: FormData): Promise<FormState> {
  // honeypot: real people never fill this hidden field
  if (str(formData.get('company_website'))) return { ok: true }

  const name = str(formData.get('name'), 200)
  const email = str(formData.get('email'), 320)
  const errors: FormState['errors'] = {}
  if (name.length < 2) errors.name = 'Please enter your name'
  if (!EMAIL.test(email)) errors.email = 'Enter a valid email'
  if (Object.keys(errors).length) return { ok: false, errors }

  try {
    const payload = await getPayloadClient()
    const referer = (await headers()).get('referer')
    await payload.create({
      collection: 'form-submissions',
      overrideAccess: true,
      data: {
        form: 'enquiry',
        name,
        email,
        phone: str(formData.get('phone'), 50) || undefined,
        message: str(formData.get('message')) || undefined,
        page: referer ? new URL(referer).pathname : undefined,
      },
    })
    return { ok: true }
  } catch (err) {
    console.error('Enquiry could not be saved', err)
    return { ok: false, error: 'Sorry, something went wrong. Please try again.' }
  }
}
