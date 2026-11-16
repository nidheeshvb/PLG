import type { Block } from 'payload'

import { link } from '@/fields/link'
import { mediaField } from '@/fields/media'
import { sectionHeader } from '@/fields/sectionHeader'
import { sectionSettings } from '@/fields/sectionSettings'

/** Heading, then 2–4 image tiles that link to other pages; the tile under the pointer widens. */
export const LinkTilesBlock: Block = {
  slug: 'linkTiles',
  interfaceName: 'LinkTilesBlock',
  labels: { singular: 'Link tiles', plural: 'Link tiles' },
  imageAltText: 'Image tiles linking to other pages',
  fields: [
    ...sectionHeader(),
    {
      name: 'tileStyle',
      type: 'select',
      label: 'Style',
      defaultValue: 'standard',
      admin: {
        description: 'Numbered: tiles are numbered 01, 02… in order, and each tile’s text appears when it is pointed at (always shown on phones).',
      },
      options: [
        { label: 'Standard (dark grey band)', value: 'standard' },
        { label: 'Tall tiles on black', value: 'tall' },
        { label: 'Numbered tiles on black, heading beside the title (Services)', value: 'numbered' },
      ],
    },
    {
      name: 'tiles',
      type: 'array',
      label: 'Tiles',
      minRows: 1,
      maxRows: 4,
      labels: { singular: 'Tile', plural: 'Tiles' },
      admin: { initCollapsed: true, components: { RowLabel: '@/fields/LinkRowLabel#ItemRowLabel' } },
      fields: [
        { name: 'title', type: 'text', label: 'Title', required: true },
        { name: 'text', type: 'textarea', label: 'Text', admin: { rows: 2 } },
        mediaField({ name: 'image', label: 'Image', required: true }),
        {
          ...link({ name: 'link', label: 'Goes to', appearance: false, required: false }),
          admin: { hideGutter: true, description: 'The “Text” here is only for screen readers; leave it empty to use the title.' },
        },
      ],
    },
    ...sectionSettings(),
  ],
}
