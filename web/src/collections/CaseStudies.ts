import type { CollectionConfig } from 'payload'

import { anyone, isLoggedIn } from '@/access'
import { mediaField } from '@/fields/media'
import { slugField } from '@/fields/slug'
import { revalidateSiteAfterChange } from '@/lib/revalidate'

/**
 * Case studies. This step holds what the Home page needs (title, one-liner, image);
 * the full case study (brief, approach, impact, gallery) is added with the Our Work page.
 */
export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  labels: { singular: 'Case study', plural: 'Case studies' },
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'client', 'updatedAt'],
  },
  access: { read: anyone, create: isLoggedIn, update: isLoggedIn, delete: isLoggedIn },
  hooks: { afterChange: [revalidateSiteAfterChange] },
  fields: [
    { name: 'title', type: 'text', required: true },
    ...slugField('title'),
    {
      name: 'cardTitle',
      type: 'text',
      label: 'Short title for cards',
      admin: { description: 'Optional. A shorter title used on cards; the full title is used otherwise.' },
    },
    {
      name: 'summary',
      type: 'textarea',
      label: 'One-line summary',
      required: true,
      admin: { rows: 2 },
    },
    { name: 'client', type: 'text', admin: { position: 'sidebar' } },
    mediaField({ name: 'image', label: 'Cover image', required: true }),
    mediaField({
      name: 'video',
      label: 'Cover video (optional)',
      accept: 'video',
      description: 'A short muted clip that can replace the cover image.',
    }),
  ],
}
