import type { Block } from 'payload'

import { mediaField } from '@/fields/media'
import { sectionHeader } from '@/fields/sectionHeader'
import { sectionSettings } from '@/fields/sectionSettings'

/** Heading and text over a full-width photo, with an optional scrolling strip of short facts. */
export const BackgroundTextBlock: Block = {
  slug: 'backgroundText',
  interfaceName: 'BackgroundTextBlock',
  labels: { singular: 'Text over image', plural: 'Text over image' },
  imageAltText: 'Heading and text over a full-width photo, with a scrolling strip',
  fields: [
    ...sectionHeader({ gradientDefault: true }),
    { name: 'text', type: 'textarea', label: 'Text', admin: { rows: 4 } },
    mediaField({
      name: 'image',
      label: 'Background image',
      required: true,
      description: 'The left side is darkened so the text stays readable.',
    }),
    {
      name: 'ticker',
      type: 'array',
      label: 'Scrolling strip (optional)',
      maxRows: 8,
      labels: { singular: 'Fact', plural: 'Facts' },
      admin: {
        initCollapsed: true,
        description: 'Short facts that scroll along the bottom of the section.',
        components: { RowLabel: '@/fields/LinkRowLabel#ItemRowLabel' },
      },
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    ...sectionSettings(),
  ],
}
