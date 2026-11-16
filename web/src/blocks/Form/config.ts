import type { Block, Condition } from 'payload'

import { mediaField } from '@/fields/media'
import { sectionHeader } from '@/fields/sectionHeader'
import { sectionSettings } from '@/fields/sectionSettings'

const isEnquiry: Condition = (_, sibling) => sibling?.formType !== 'application'
const isApplication: Condition = (_, sibling) => sibling?.formType === 'application'

/**
 * A website form. Messages are saved in "Form messages".
 * Variants keep one block for all forms: enquiry (Home, Contact) and job application (Join Us).
 */
export const FormBlock: Block = {
  slug: 'form',
  interfaceName: 'FormBlock',
  labels: { singular: 'Form', plural: 'Forms' },
  imageAltText: 'A form with a heading: contact enquiry or job application',
  fields: [
    {
      name: 'formType',
      type: 'select',
      label: 'Form',
      defaultValue: 'enquiry',
      required: true,
      options: [
        { label: 'Enquiry (name, email, phone, message)', value: 'enquiry' },
        {
          label: 'Job application (name, email, role, discipline, link, message)',
          value: 'application',
        },
      ],
      admin: {
        description:
          'Job application: the “Applying for” list shows the roles in Content → Open roles. Use one per page; the “Apply for this role” buttons fill it in.',
      },
    },
    ...sectionHeader({ gradient: false }),
    { name: 'lede', type: 'textarea', label: 'Intro text', admin: { rows: 3 } },
    {
      ...mediaField({
        name: 'backgroundImage',
        label: 'Background photo',
        description: 'Shown to the right of the form (and below it on mobile).',
      }),
      admin: {
        condition: isEnquiry,
        description: 'Shown to the right of the form (and below it on mobile).',
      },
    },
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
    {
      name: 'note',
      type: 'text',
      label: 'Small note next to the button',
      admin: { condition: isApplication, placeholder: 'We keep profiles on file and get in touch when a role fits.' },
    },
    ...sectionSettings(),
  ],
}
