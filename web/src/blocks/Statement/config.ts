import type { Block } from 'payload'

import { sectionSettings } from '@/fields/sectionSettings'

/** One large sentence: centred over brand marks (Home) or left-aligned on a grey band (Join Us). */
export const StatementBlock: Block = {
  slug: 'statement',
  interfaceName: 'StatementBlock',
  labels: { singular: 'Statement', plural: 'Statements' },
  imageAltText: 'One large sentence across the page',
  fields: [
    { name: 'text', type: 'textarea', label: 'Sentence', required: true, admin: { rows: 3 } },
    {
      name: 'style',
      type: 'select',
      label: 'Look',
      defaultValue: 'centered',
      options: [
        { label: 'Centred, large, over the brand marks (Home)', value: 'centered' },
        { label: 'Left-aligned on a grey band (Join Us)', value: 'band' },
      ],
    },
    {
      name: 'highlight',
      type: 'text',
      label: 'End of the sentence in orange',
      admin: {
        description: 'Optional. Copy the end of the sentence exactly, e.g. “evidence to assertion.”',
      },
    },
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
            { label: 'Fade in', value: 'none' },
          ],
          admin: { width: '60%' },
        },
        {
          name: 'showBrandMarks',
          type: 'checkbox',
          label: 'Show the brand marks behind the text',
          defaultValue: true,
          admin: { width: '40%', condition: (_, sibling) => sibling?.style !== 'band' },
        },
      ],
    },
    ...sectionSettings(),
  ],
}
