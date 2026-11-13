import type { Block } from 'payload'

import { sectionSettings } from '@/fields/sectionSettings'

/** Scrolling strip of partner logos (from "Partner logos"). */
export const LogoMarqueeBlock: Block = {
  slug: 'logoMarquee',
  interfaceName: 'LogoMarqueeBlock',
  labels: { singular: 'Logo strip', plural: 'Logo strips' },
  imageAltText: 'A continuously scrolling strip of partner logos',
  fields: [
    { name: 'label', type: 'text', label: 'Small heading (optional)' },
    {
      name: 'partners',
      type: 'relationship',
      relationTo: 'partners',
      hasMany: true,
      label: 'Logos',
      admin: {
        description: 'Leave empty to show every partner logo. Drag to change the order.',
      },
    },
    ...sectionSettings(),
  ],
}
