import type { Field, FieldHook } from 'payload'

export const toSlug = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const fillSlug =
  (from: string): FieldHook =>
  ({ value, data, originalDoc }) => {
    if (typeof value === 'string' && value.trim()) return toSlug(value)
    const source = data?.[from] ?? originalDoc?.[from]
    return typeof source === 'string' ? toSlug(source) : value
  }

/** URL name, filled in from another field (usually the title) when left empty. */
export const slugField = (from = 'title'): Field[] => [
  {
    name: 'slug',
    type: 'text',
    label: 'URL name',
    index: true,
    unique: true,
    admin: {
      position: 'sidebar',
      description: 'Used in the web address. Filled in automatically from the title.',
    },
    hooks: { beforeValidate: [fillSlug(from)] },
  },
]
