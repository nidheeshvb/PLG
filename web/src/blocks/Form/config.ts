import type { Block } from 'payload'

import { mediaField } from '@/fields/media'
import { sectionHeader } from '@/fields/sectionHeader'
import { sectionSettings } from '@/fields/sectionSettings'

/**
 * A website form. Messages are saved in "Form messages".
 * Variants keep one block for all forms (enquiry now; job application with the Join Us page).
 */
export const FormBlock: Block = {
  slug: 'form',
  interfaceName: 'FormBlock',
  labels: { singular: 'Form', plural: 'Forms' },
  imageAltText: 'Contact form with heading and background photo',
  fields: [
    {
      name: 'formType',
      type: 'select',
      label: 'Form',
      defaultValue: 'enquiry',
      required: true,
      options: [{ label: 'Enquiry (name, email, phone, message)', value: 'enquiry' }],
    },
    ...sectionHeader({ gradient: false }),
    { name: 'lede', type: 'textarea', label: 'Intro text', admin: { rows: 3 } },
    mediaField({
      name: 'backgroundImage',
      label: 'Background photo',
      description: 'Shown to the right of the form (and below it on mobile).',
    }),
    {
      type: 'row',
      fields: [
        {
          name: 'submitLabel',
          type: 'text',
          label: 'Button text',
          defaultValue: 'Talk to Us',
          required: true,
          admin: { width: '50%' },
        },
        {
          name: 'successMessage',
          type: 'text',
          label: 'Message after sending',
          defaultValue: 'Thanks — we’ll be in touch shortly.',
          required: true,
          admin: { width: '50%' },
        },
      ],
    },
    ...sectionSettings(),
  ],
}
