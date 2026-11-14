import type { Block } from 'payload'

import { link } from '@/fields/link'
import { mediaField } from '@/fields/media'
import { sectionHeader } from '@/fields/sectionHeader'
import { sectionSettings } from '@/fields/sectionSettings'

/**
 * A row of image cards that becomes a swipeable slider on smaller screens.
 * Card styles are variants: service (Home "What we do"), pillar (About "Three pillars").
 */
export const CardCarouselBlock: Block = {
  slug: 'cardCarousel',
  interfaceName: 'CardCarouselBlock',
  labels: { singular: 'Cards', plural: 'Cards' },
  imageAltText: 'A row of image cards, swipeable on mobile',
  fields: [
    ...sectionHeader({ gradient: false }),
    {
      name: 'cardStyle',
      type: 'select',
      label: 'Card style',
      defaultValue: 'service',
      required: true,
      options: [
        { label: 'Numbered card (text shows on hover)', value: 'service' },
        { label: 'Pillar card (big word on the image, label and text below)', value: 'pillar' },
      ],
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Cards',
      minRows: 1,
      maxRows: 8,
      labels: { singular: 'Card', plural: 'Cards' },
      admin: {
        initCollapsed: true,
        description: 'Numbered cards are numbered automatically in this order.',
        components: { RowLabel: '@/fields/LinkRowLabel#ItemRowLabel' },
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: { description: 'Pillar cards show this as the big word on the image.' },
        },
        {
          name: 'tag',
          type: 'text',
          label: 'Small label',
          admin: {
            description: 'Shown above the text, e.g. “Network”.',
            condition: (data, _sibling, { blockData }) => blockData?.cardStyle === 'pillar',
          },
        },
        { name: 'text', type: 'textarea', label: 'Text', admin: { rows: 3 } },
        mediaField({ name: 'image', label: 'Image', required: true }),
        { name: 'hasLink', type: 'checkbox', label: 'Card links somewhere', defaultValue: true },
        {
          ...link({ name: 'link', label: 'Card link', appearance: false, required: false }),
          admin: { hideGutter: true, condition: (_, sibling) => Boolean(sibling?.hasLink) },
        },
      ],
    },
    {
      name: 'note',
      type: 'textarea',
      label: 'Note (optional)',
      admin: { rows: 2, description: 'Numbered cards: shown under the cards. Pillar cards: shown next to the title.' },
    },
    ...sectionSettings({ theme: true, defaultTheme: 'light' }),
  ],
}
