import type { Block } from 'payload'

import { link } from '@/fields/link'
import { mediaField } from '@/fields/media'
import { sectionHeader } from '@/fields/sectionHeader'
import { sectionSettings } from '@/fields/sectionSettings'

/** Full-screen panels that stack over each other while scrolling. */
export const StackedPanelsBlock: Block = {
  slug: 'stackedPanels',
  interfaceName: 'StackedPanelsBlock',
  labels: { singular: 'Stacking panels', plural: 'Stacking panels' },
  imageAltText: 'Full-screen image and text panels that slide over each other',
  fields: [
    {
      name: 'panels',
      type: 'array',
      label: 'Panels',
      minRows: 1,
      maxRows: 4,
      labels: { singular: 'Panel', plural: 'Panels' },
      admin: {
        initCollapsed: true,
        components: { RowLabel: '@/fields/LinkRowLabel#ItemRowLabel' },
      },
      fields: [
        ...sectionHeader({ gradientDefault: true }),
        { name: 'text', type: 'textarea', label: 'Text', admin: { rows: 4 } },
        mediaField({ name: 'image', label: 'Image', required: true }),
        { name: 'showButton', type: 'checkbox', label: 'Show a button', defaultValue: true },
        {
          ...link({ name: 'link', label: 'Button' }),
          admin: { hideGutter: true, condition: (_, sibling) => Boolean(sibling?.showButton) },
        },
      ],
    },
    ...sectionSettings(),
  ],
}
