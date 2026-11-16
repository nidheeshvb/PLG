import type { Block, Condition } from 'payload'

import { link } from '@/fields/link'
import { mediaField } from '@/fields/media'
import { sectionHeader } from '@/fields/sectionHeader'
import { sectionSettings } from '@/fields/sectionSettings'

const isEnquiry: Condition = (_, sibling) => !sibling?.formType || sibling?.formType === 'enquiry'
const isApplication: Condition = (_, sibling) => sibling?.formType === 'application'
const isContact: Condition = (_, sibling) => sibling?.formType === 'contact'

/**
 * A website form. Messages are saved in "Form messages".
 * Variants keep one block for all forms: enquiry (Home), detailed enquiry (Contact) and job application (Join Us).
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
          label: 'Job application (name, email, role, discipline, link, CV, message)',
          value: 'application',
        },
        {
          label: 'Detailed enquiry (name, company, work email, phone, interests, message, consent)',
          value: 'contact',
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
      type: 'collapsible',
      label: 'Detailed enquiry',
      admin: { condition: isContact, description: 'The column beside the form and the form’s own wording.' },
      fields: [
        {
          name: 'promises',
          type: 'array',
          label: 'Promises under the intro',
          maxRows: 4,
          labels: { singular: 'Promise', plural: 'Promises' },
          admin: { initCollapsed: true, description: 'Numbered 01, 02… automatically.', components: { RowLabel: '@/fields/LinkRowLabel#ItemRowLabel' } },
          fields: [
            { name: 'title', type: 'text', label: 'Bold line', required: true },
            { name: 'text', type: 'text', label: 'Text under it' },
          ],
        },
        { name: 'asideText', type: 'text', label: 'Line at the bottom', admin: { placeholder: 'Looking for a role?' } },
        { ...link({ name: 'asideLink', label: 'Its link', appearance: false, required: false }), admin: { hideGutter: true } },
        {
          type: 'row',
          fields: [
            { name: 'interestsLabel', type: 'text', label: 'Choices: question', defaultValue: 'What are you looking to unlock?', admin: { width: '60%' } },
            { name: 'interestsHint', type: 'text', label: 'Choices: hint', defaultValue: 'Choose any that apply', admin: { width: '40%' } },
          ],
        },
        {
          name: 'interests',
          type: 'array',
          label: 'Choices',
          labels: { singular: 'Choice', plural: 'Choices' },
          admin: { initCollapsed: true, description: 'Visitors can tick any number. They are saved with the message.', components: { RowLabel: '@/fields/LinkRowLabel#ItemRowLabel' } },
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'label', type: 'text', label: 'Choice', required: true, admin: { width: '70%' } },
                { name: 'showsNote', type: 'checkbox', label: 'Shows the note below', defaultValue: false, admin: { width: '30%' } },
              ],
            },
          ],
        },
        {
          name: 'interestNote',
          type: 'text',
          label: 'Note when a “Shows the note” choice is ticked',
          admin: { placeholder: 'Applying for a role? Open positions and CV upload are on' },
        },
        { ...link({ name: 'interestNoteLink', label: 'Note link', appearance: false, required: false }), admin: { hideGutter: true } },
        {
          type: 'row',
          fields: [
            { name: 'messageLabel', type: 'text', label: 'Message: label', defaultValue: 'Tell us about the ambition', admin: { width: '50%' } },
            { name: 'messagePlaceholder', type: 'text', label: 'Message: hint inside the box', admin: { width: '50%' } },
          ],
        },
        {
          name: 'consentText',
          type: 'text',
          label: 'Consent tick box',
          defaultValue: 'I agree to PLG Acachet using my details to respond to this enquiry.',
        },
        { name: 'successTitle', type: 'text', label: 'Heading after sending', defaultValue: 'Thank you. We’ll be in touch within two business days.' },
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
