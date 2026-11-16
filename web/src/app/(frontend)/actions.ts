'use server'

import { headers } from 'next/headers'

import { DISCIPLINES } from '@/collections/roleOptions'
import { getPayloadClient } from '@/lib/payload'

export type FormState = {
  ok: boolean
  errors?: Partial<Record<'name' | 'email' | 'discipline' | 'link' | 'company' | 'message' | 'consent', string>>
  error?: string
  /** First name, for the application form's thank-you message. */
  firstName?: string
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const str = (v: FormDataEntryValue | null, max = 5000) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

const sentFrom = async () => {
  const referer = (await headers()).get('referer')
  try {
    return referer ? new URL(referer).pathname : undefined
  } catch {
    return undefined
  }
}

const nameAndEmail = (formData: FormData) => {
  const name = str(formData.get('name'), 200)
  const email = str(formData.get('email'), 320)
  const errors: NonNullable<FormState['errors']> = {}
  if (name.length < 2) errors.name = 'Please enter your name'
  if (!EMAIL.test(email)) errors.email = 'Enter a valid email'
  return { name, email, errors }
}

/** Saves an enquiry from any "Form" block into Form messages. */
export async function submitEnquiry(_prev: FormState, formData: FormData): Promise<FormState> {
  // honeypot: real people never fill this hidden field
  if (str(formData.get('company_website'))) return { ok: true }

  const { name, email, errors } = nameAndEmail(formData)
  if (Object.keys(errors).length) return { ok: false, errors }

  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'form-submissions',
      overrideAccess: true,
      data: {
        form: 'enquiry',
        name,
        email,
        phone: str(formData.get('phone'), 50) || undefined,
        message: str(formData.get('message')) || undefined,
        page: await sentFrom(),
      },
    })
    return { ok: true }
  } catch (err) {
    console.error('Enquiry could not be saved', err)
    return { ok: false, error: 'Sorry, something went wrong. Please try again.' }
  }
}

/** Saves a job application ("Send us your profile") into Form messages. CV upload: see docs/backlog-cv-upload.md. */
export async function submitApplication(_prev: FormState, formData: FormData): Promise<FormState> {
  if (str(formData.get('company_website'))) return { ok: true }

  const { name, email, errors } = nameAndEmail(formData)
  const discipline = str(formData.get('discipline'), 100)
  if (!(DISCIPLINES as readonly string[]).includes(discipline)) errors.discipline = 'Choose the discipline closest to yours.'
  const link = str(formData.get('link'), 500)
  if (link && !/^https?:\/\/\S+\.\S+/i.test(link)) errors.link = 'Enter a full link, starting with https://'
  if (Object.keys(errors).length) return { ok: false, errors }

  try {
    const payload = await getPayloadClient()
    // only accept a role that is really open; anything else is a general application
    const roleId = str(formData.get('role'), 50)
    let role = 'General application'
    if (/^\d+$/.test(roleId)) {
      const found = await payload
        .findByID({ collection: 'roles', id: Number(roleId), depth: 0 })
        .catch(() => null)
      if (found?.isOpen) role = found.title
    }
    await payload.create({
      collection: 'form-submissions',
      overrideAccess: true,
      data: {
        form: 'application',
        name,
        email,
        role,
        discipline,
        profileLink: link || undefined,
        message: str(formData.get('message')) || undefined,
        page: await sentFrom(),
      },
    })
    return { ok: true, firstName: name.split(/\s+/)[0] }
  } catch (err) {
    console.error('Application could not be saved', err)
    return { ok: false, error: 'Sorry, something went wrong. Please try again.' }
  }
}

const WORK_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/**
 * Saves a detailed enquiry (Contact page) into Form messages: name, company, work email, phone,
 * what they want to unlock, message (10–1500 characters) and consent.
 */
export async function submitContact(_prev: FormState, formData: FormData): Promise<FormState> {
  if (str(formData.get('company_website'))) return { ok: true }

  const name = str(formData.get('name'), 200)
  const company = str(formData.get('company'), 200)
  const email = str(formData.get('email'), 320)
  const message = str(formData.get('message'), 1500)
  const consent = formData.get('consent') === 'on'
  const interests = formData
    .getAll('interests')
    .map((v) => str(v, 200))
    .filter(Boolean)
    .slice(0, 20)
  const errors: NonNullable<FormState['errors']> = {}
  if (name.length < 2) errors.name = 'Add your name.'
  if (company.length < 2) errors.company = 'Add the company you’re contacting us from.'
  if (!WORK_EMAIL.test(email)) errors.email = 'Add a work email we can reply to, like name@company.com.'
  if (message.length < 10) errors.message = 'Tell us a little about the ambition, even a sentence or two.'
  if (!consent) errors.consent = 'Tick to let us use your details to reply.'
  if (Object.keys(errors).length) return { ok: false, errors }

  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'form-submissions',
      overrideAccess: true,
      data: {
        form: 'enquiry',
        name,
        email,
        company,
        phone: str(formData.get('phone'), 50) || undefined,
        interests: interests.join('\n') || undefined,
        message,
        consent,
        page: await sentFrom(),
      },
    })
    return { ok: true, firstName: name.split(/\s+/)[0] }
  } catch (err) {
    console.error('Contact enquiry could not be saved', err)
    return { ok: false, error: 'Sorry, something went wrong. Please try again.' }
  }
}
