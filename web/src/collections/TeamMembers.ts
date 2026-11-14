import type { CollectionConfig, Condition } from 'payload'

import { anyone, isLoggedIn } from '@/access'
import { mediaField } from '@/fields/media'
import { revalidateSiteAfterChange } from '@/lib/revalidate'

import { TEAM_DEPARTMENTS, TEAM_GROUPS } from './teamOptions'

const notTop: Condition = (_, sibling) => sibling?.department !== 'top'

/** People shown on The Team page (grid, org chart and profile panel). */
export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  labels: { singular: 'Team member', plural: 'Team members' },
  admin: {
    group: 'Content',
    useAsTitle: 'name',
    description: 'People shown on The Team page. Lower “Order” numbers appear first.',
    defaultColumns: ['name', 'jobTitle', 'group', 'department', 'sortOrder'],
  },
  defaultSort: 'sortOrder',
  access: { read: anyone, create: isLoggedIn, update: isLoggedIn, delete: isLoggedIn },
  hooks: { afterChange: [revalidateSiteAfterChange] },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', label: 'Name', required: true, admin: { width: '50%' } },
        { name: 'jobTitle', type: 'text', label: 'Job title', required: true, admin: { width: '50%' } },
      ],
    },
    mediaField({
      name: 'photo',
      label: 'Photo',
      description:
        'Portrait photo (shown black and white, in colour on hover). Leave empty to show a placeholder silhouette. Set the focal point on the face.',
    }),
    {
      type: 'row',
      fields: [
        {
          name: 'group',
          type: 'select',
          label: 'Group (for the “Show” filter)',
          required: true,
          defaultValue: 'staff',
          options: TEAM_GROUPS.map(({ label, value }) => ({ label, value })),
          admin: {
            width: '50%',
            description: 'Management and Creative get a small label on the photo and their own filter option.',
          },
        },
        {
          name: 'department',
          type: 'select',
          label: 'Org chart position',
          required: true,
          defaultValue: 'delivery',
          options: TEAM_DEPARTMENTS.map(({ label, value }) => ({ label, value })),
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'headOfDepartment',
          type: 'checkbox',
          label: 'Heads this org chart column',
          defaultValue: false,
          admin: {
            width: '50%',
            condition: notTop,
            description: 'Shown at the top of the column; everyone else in the column is listed below.',
          },
        },
        {
          name: 'accountOwner',
          type: 'checkbox',
          label: 'Show the “Senior account owner” label on the profile',
          defaultValue: false,
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Short biography',
      admin: {
        rows: 5,
        description:
          'Optional, 50–70 words: open with the value this person brings to a client, then their experience. Shown in the profile panel.',
      },
    },
    {
      type: 'collapsible',
      label: 'Social profiles',
      admin: { initCollapsed: true, description: 'Optional. Only the filled-in ones are shown.' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'linkedin', type: 'text', label: 'LinkedIn URL', admin: { width: '33%' } },
            { name: 'instagram', type: 'text', label: 'Instagram URL', admin: { width: '33%' } },
            { name: 'x', type: 'text', label: 'X (Twitter) URL', admin: { width: '33%' } },
          ],
        },
      ],
    },
    {
      name: 'sortOrder',
      type: 'number',
      label: 'Order',
      defaultValue: 0,
      admin: { position: 'sidebar', description: 'Lower numbers appear first in the grid and in each org chart column.' },
    },
  ],
}
