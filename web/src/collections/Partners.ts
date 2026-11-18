import type { CollectionConfig } from 'payload'

import { anyone, isLoggedIn } from '@/access'
import { mediaField } from '@/fields/media'
import { revalidateSiteAfterChange, revalidateSiteAfterDelete } from '@/lib/revalidate'

export const Partners: CollectionConfig = {
  slug: 'partners',
  labels: { singular: 'Partner logo', plural: 'Partner logos' },
  admin: {
    group: 'Content',
    useAsTitle: 'name',
    description: 'Brands shown in the scrolling logo strip.',
    defaultColumns: ['name', 'logo'],
  },
  defaultSort: 'sortOrder',
  access: { read: anyone, create: isLoggedIn, update: isLoggedIn, delete: isLoggedIn },
  hooks: { afterChange: [revalidateSiteAfterChange], afterDelete: [revalidateSiteAfterDelete] },
  fields: [
    { name: 'name', type: 'text', required: true },
    mediaField({
      name: 'logo',
      label: 'Logo',
      required: true,
      description: 'A white logo on a transparent background (SVG or PNG).',
    }),
    {
      type: 'row',
      fields: [
        {
          name: 'height',
          type: 'number',
          label: 'Logo height on desktop (px)',
          defaultValue: 40,
          min: 8,
          max: 80,
          admin: {
            width: '33%',
            description: 'Logos have different shapes; adjust so they look equally sized.',
          },
        },
        {
          name: 'mobileHeight',
          type: 'number',
          label: 'Logo height on mobile (px)',
          min: 6,
          max: 40,
          admin: { width: '33%', description: 'Leave empty to use 45% of the desktop height.' },
        },
        {
          name: 'sortOrder',
          type: 'number',
          label: 'Order',
          defaultValue: 0,
          admin: { width: '33%', description: 'Lower numbers appear first.' },
        },
      ],
    },
  ],
}
