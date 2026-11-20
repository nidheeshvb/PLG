import type { Field, TextFieldSingleValidation } from 'payload'

/**
 * Web addresses editors may type in links: https://, http://, mailto:, tel:, a site path (/…)
 * or a section on the page (#…). Anything else, such as a `javascript:` address, is refused
 * (E2E-11-4). Import-free apart from types, so it can run in the admin.
 */
export const SAFE_URL = /^(https?:\/\/|mailto:|tel:|\/(?!\/)|#)/i

export const isSafeUrl = (value: string) => SAFE_URL.test(value.trim())

export const SAFE_URL_MESSAGE =
  'Use a full web address starting with https://, an email link (mailto:), a phone link (tel:), a path on this site starting with /, or a section starting with #.'

/** Validation for a link's "Web address" text field. */
export const validateSafeUrl: TextFieldSingleValidation = (value) =>
  !value || isSafeUrl(value) ? true : SAFE_URL_MESSAGE

/** Adds the safe-address check to the rich-text link's URL field, keeping Payload's own check. */
export const withSafeUrl = <F,>(fields: F[]): F[] =>
  fields.map((field): F => {
    const f = field as unknown as Field
    if (f.type !== 'text' || f.name !== 'url' || f.hasMany) return field
    const original = f.validate as TextFieldSingleValidation | undefined
    const validate: TextFieldSingleValidation = async (value, options) => {
      const own = await validateSafeUrl(value, options)
      if (own !== true) return own
      return original ? original(value, options) : true
    }
    return { ...f, validate } as unknown as F
  })
