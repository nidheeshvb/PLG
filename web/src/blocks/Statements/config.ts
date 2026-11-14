import type { Block } from 'payload'

import { sectionHeader } from '@/fields/sectionHeader'
import { sectionSettings } from '@/fields/sectionSettings'

/** Heading, then two (or three) large statements side by side, e.g. Vision and Mission. */
export const StatementsBlock: Block = {
  slug: 'statements',
  interfaceName: 'StatementsBlock',
  labels: { singular: 'Side-by-side statements', plural: 'Side-by-side statements' },
  imageAltText: 'Two large statements side by side, e.g. Vision and Mission',
  fields: [
    ...sectionHeader({ gradientDefault: true }),
    {
      name: 'items',
      type: 'array',
      label: 'Statements',
      minRows: 1,
      maxRows: 3,
      labels: { singular: 'Statement', plural: 'Statements' },
      admin: { initCollapsed: true, components: { RowLabel: '@/fields/LinkRowLabel#ItemRowLabel' } },
      fields: [
        { name: 'label', type: 'text', label: 'Small label', required: true, admin: { description: 'E.g. “Vision”.' } },
        { name: 'text', type: 'textarea', label: 'Statement', required: true, admin: { rows: 3 } },
      ],
    },
    {
      name: 'showBrandMark',
      type: 'checkbox',
      label: 'Show the brand mark in the background',
      defaultValue: true,
    },
    ...sectionSettings(),
  ],
}
