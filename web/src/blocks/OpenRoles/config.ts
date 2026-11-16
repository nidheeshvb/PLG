import type { Block } from 'payload'

import { link } from '@/fields/link'
import { sectionHeader } from '@/fields/sectionHeader'
import { sectionSettings } from '@/fields/sectionSettings'

/** Job list (from Content → Open roles) with team filter buttons; each role opens to its description. */
export const OpenRolesBlock: Block = {
  slug: 'openRoles',
  interfaceName: 'OpenRolesBlock',
  labels: { singular: 'Open roles', plural: 'Open roles' },
  imageAltText: 'A list of job openings with filter buttons; each opens to show the description',
  fields: [
    ...sectionHeader({ gradientDefault: true }),
    {
      name: 'roles',
      type: 'relationship',
      relationTo: 'roles',
      hasMany: true,
      label: 'Roles to show',
      admin: {
        description:
          'Leave empty to show every role ticked “Show on the website”, in their set order (recommended). Pick roles only to show a fixed selection.',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'showFilter',
          type: 'checkbox',
          label: 'Show the team filter buttons',
          defaultValue: true,
          admin: { width: '50%' },
        },
        {
          name: 'applyLabel',
          type: 'text',
          label: '“Apply” button text',
          defaultValue: 'Apply for this role',
          required: true,
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'applySection',
      type: 'text',
      label: '“Apply” button goes to section',
      defaultValue: 'apply',
      admin: {
        description:
          'The Section ID of the application form on this page (without #). The button also fills in the role and discipline there.',
      },
    },
    {
      name: 'emptyText',
      type: 'text',
      label: 'Text when there are no open roles',
      defaultValue: 'No open roles right now. Send us your profile and we’ll keep it on file.',
    },
    {
      name: 'footerText',
      type: 'text',
      label: 'Line under the list',
      admin: { placeholder: 'Don’t see your role? We still want to hear from you.' },
    },
    {
      ...link({ name: 'footerLink', label: 'Button under the list', required: false }),
      admin: { hideGutter: true },
    },
    ...sectionSettings(),
  ],
}
