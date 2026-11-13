import type { Block } from 'payload'

import { sectionSettings } from '@/fields/sectionSettings'

/** One large sentence. */
export const StatementBlock: Block = {
  slug: 'statement',
  interfaceName: 'StatementBlock',
  labels: { singular: 'Statement', plural: 'Statements' },
  imageAltText: 'One large sentence across the page',
  fields: [
    { name: 'text', type: 'textarea', label: 'Sentence', required: true, admin: { rows: 3 } },
    {
      type: 'row',
      fields: [
        {
          name: 'animation',
          type: 'radio',
          label: 'Animation',
          defaultValue: 'scrollReveal',
          options: [
            { label: 'Words light up while scrolling', value: 'scrollReveal' },
            { label: 'None', value: 'none' },
          ],
          admin: { width: '60%' },
        },
        {
          name: 'showBrandMarks',
          type: 'checkbox',
          label: 'Show the brand marks behind the text',
          defaultValue: true,
          admin: { width: '40%' },
        },
      ],
    },
    ...sectionSettings(),
  ],
}
