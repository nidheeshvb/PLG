import type { Field } from 'payload'

import { link } from './link'
import { mediaField } from './media'

/**
 * Content of the "call to action" banner. Used twice: the site-wide default (Header & footer →
 * Call to action) and the optional per-page override inside the block.
 */
export const ctaFields = ({ required = true }: { required?: boolean } = {}): Field[] => [
  {
    name: 'eyebrow',
    type: 'text',
    label: 'Small heading',
    admin: { description: 'The short orange line above the title.' },
  },
  {
    name: 'title',
    type: 'textarea',
    label: 'Title',
    required,
    admin: { rows: 2, description: 'Press Enter to start a new line.' },
  },
  { name: 'lede', type: 'textarea', label: 'Text', admin: { rows: 3 } },
  link({ name: 'link', label: 'Button', required }),
  mediaField({
    name: 'image',
    label: 'Background image',
    description: 'Shown on the right; the left side fades to white behind the text.',
  }),
]
