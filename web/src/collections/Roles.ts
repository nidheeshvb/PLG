import type { CollectionConfig } from 'payload'

import { anyone, isLoggedIn } from '@/access'
import { revalidateSiteAfterChange, revalidateSiteAfterDelete } from '@/lib/revalidate'

import { EMPLOYMENT_TYPES, ROLE_TEAMS } from './roleOptions'

/** Jobs listed on the Join Us page ("Open roles") and offered in the application form. */
export const Roles: CollectionConfig = {
  slug: 'roles',
  labels: { singular: 'Open role', plural: 'Open roles' },
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    description:
      'Jobs shown on the Join Us page. Untick “Show on the website” to take a role down without deleting it. Lower “Order” numbers appear first.',
    defaultColumns: ['title', 'team', 'location', 'isOpen', 'sortOrder'],
  },
  defaultSort: 'sortOrder',
  access: { read: anyone, create: isLoggedIn, update: isLoggedIn, delete: isLoggedIn },
  hooks: { afterChange: [revalidateSiteAfterChange], afterDelete: [revalidateSiteAfterDelete] },
  fields: [
    { name: 'title', type: 'text', label: 'Job title', required: true },
    {
      type: 'row',
      fields: [
        {
          name: 'team',
          type: 'select',
          label: 'Team',
          required: true,
          defaultValue: 'commercial',
          options: ROLE_TEAMS.map(({ label, value }) => ({ label, value })),
          admin: { width: '33%', description: 'Used for the filter buttons.' },
        },
        {
          name: 'location',
          type: 'text',
          label: 'Location',
          required: true,
          defaultValue: 'Dubai, UAE',
          admin: { width: '33%' },
        },
        {
          name: 'employmentType',
          type: 'select',
          label: 'Type',
          required: true,
          defaultValue: 'fullTime',
          options: EMPLOYMENT_TYPES.map(({ label, value }) => ({ label, value })),
          admin: { width: '34%' },
        },
      ],
    },
    {
      name: 'summary',
      type: 'textarea',
      label: 'Description',
      admin: { rows: 4, description: 'Shown when someone opens the role. A short paragraph about the job.' },
    },
    {
      name: 'points',
      type: 'array',
      label: 'Key points',
      labels: { singular: 'Point', plural: 'Points' },
      admin: {
        initCollapsed: true,
        description: 'Optional bullet list under the description (responsibilities or requirements).',
        components: { RowLabel: '@/fields/LinkRowLabel#ItemRowLabel' },
      },
      fields: [{ name: 'text', type: 'text', label: 'Point', required: true }],
    },
    {
      name: 'isOpen',
      type: 'checkbox',
      label: 'Show on the website',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'sortOrder',
      type: 'number',
      label: 'Order',
      defaultValue: 0,
      admin: { position: 'sidebar', description: 'Lower numbers appear first.' },
    },
  ],
}
