import type { Block } from 'payload'

import { mediaField } from '@/fields/media'
import { sectionSettings } from '@/fields/sectionSettings'

/** Big numbers over full-screen images, auto-advancing. */
export const StatsCarouselBlock: Block = {
  slug: 'statsCarousel',
  interfaceName: 'StatsCarouselBlock',
  labels: { singular: 'Key numbers', plural: 'Key numbers' },
  imageAltText: 'Large animated numbers over full-screen images',
  fields: [
    {
      name: 'stats',
      type: 'array',
      label: 'Numbers',
      minRows: 1,
      maxRows: 8,
      labels: { singular: 'Number', plural: 'Numbers' },
      admin: { initCollapsed: true, components: { RowLabel: '@/fields/LinkRowLabel#ItemRowLabel' } },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'value', type: 'number', label: 'Number', required: true, admin: { width: '33%' } },
            {
              name: 'suffix',
              type: 'text',
              label: 'After the number',
              admin: { width: '33%', placeholder: '+', description: 'e.g. + or %' },
            },
            { name: 'label', type: 'text', label: 'Caption', required: true, admin: { width: '34%' } },
          ],
        },
        mediaField({ name: 'image', label: 'Background image', required: true }),
      ],
    },
    {
      name: 'autoplaySeconds',
      type: 'number',
      label: 'Seconds per number',
      defaultValue: 4.5,
      min: 2,
      max: 15,
    },
    ...sectionSettings(),
  ],
}
