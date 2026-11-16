import type { CollectionConfig } from 'payload'

import { isAdmin, isLoggedIn } from '@/access'

/** Messages sent from the website's forms. Created only by the site's server action. */
export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  labels: { singular: 'Form message', plural: 'Form messages' },
  admin: {
    group: 'Inbox',
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'form', 'createdAt'],
    description: 'Messages people sent through the website.',
  },
  defaultSort: '-createdAt',
  access: {
    create: () => false,
    read: isLoggedIn,
    update: () => false,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'form',
      type: 'select',
      required: true,
      options: [
        { label: 'Enquiry', value: 'enquiry' },
        { label: 'Job application', value: 'application' },
      ],
    },
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text', admin: { condition: (data) => data?.form !== 'application' } },
    {
      type: 'row',
      admin: { condition: (data) => data?.form === 'application' },
      fields: [
        { name: 'role', type: 'text', label: 'Applying for', admin: { width: '50%' } },
        { name: 'discipline', type: 'text', label: 'Discipline', admin: { width: '50%' } },
      ],
    },
    {
      name: 'profileLink',
      type: 'text',
      label: 'LinkedIn or portfolio link',
      admin: { condition: (data) => data?.form === 'application' },
    },
    { name: 'message', type: 'textarea' },
    { name: 'page', type: 'text', label: 'Sent from page' },
  ],
}
