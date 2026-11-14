import type { Block } from 'payload'

import { sectionSettings } from '@/fields/sectionSettings'

/**
 * The people on The Team page: intro line, then a grid of portraits that can switch to an
 * org chart, a "Show" filter by group, and a profile panel that opens on click.
 * People come from the "Team members" collection.
 */
export const TeamDirectoryBlock: Block = {
  slug: 'teamDirectory',
  interfaceName: 'TeamDirectoryBlock',
  labels: { singular: 'Team directory', plural: 'Team directories' },
  imageAltText: 'Portrait grid of team members with an org chart view and profile panel',
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Small heading',
      admin: { description: 'The short orange line on the left.' },
    },
    {
      name: 'intro',
      type: 'textarea',
      label: 'Intro paragraph',
      admin: { rows: 3 },
    },
    {
      name: 'highlight',
      type: 'text',
      label: 'Words to show in orange',
      admin: { description: 'Optional. Copy the words exactly as they appear in the intro paragraph.' },
    },
    {
      name: 'members',
      type: 'relationship',
      relationTo: 'team-members',
      hasMany: true,
      label: 'People',
      admin: {
        description:
          'Leave empty to show everyone in “Team members” (in their set order). Choose people to show only them, in the order chosen here.',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'showOrgChart',
          type: 'checkbox',
          label: 'Offer the “Org chart” view',
          defaultValue: true,
          admin: { width: '50%' },
        },
        {
          name: 'showFilter',
          type: 'checkbox',
          label: 'Show the “Show” filter (All / Management / Creative)',
          defaultValue: true,
          admin: { width: '50%' },
        },
      ],
    },
    ...sectionSettings(),
  ],
}
