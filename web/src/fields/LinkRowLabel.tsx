'use client'

import { useRowLabel } from '@payloadcms/ui'

/** Shows each link's text as its row title in the admin, instead of "Link 01". */
export const LinkRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ label?: string }>()
  return <span>{data?.label || `Link ${String((rowNumber ?? 0) + 1).padStart(2, '0')}`}</span>
}

/** Generic row label: uses the row's `title`, `label`, `name` or `value` field. */
export const ItemRowLabel = () => {
  const { data, rowNumber } = useRowLabel<Record<string, unknown>>()
  const text = ['title', 'label', 'name', 'eyebrow', 'value', 'text']
    .map((k) => data?.[k])
    .find((v) => typeof v === 'string' || typeof v === 'number')
  return <span>{text ? String(text) : `Item ${String((rowNumber ?? 0) + 1).padStart(2, '0')}`}</span>
}
