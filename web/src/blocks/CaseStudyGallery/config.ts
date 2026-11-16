import type { Block } from 'payload'

import { link } from '@/fields/link'
import { sectionHeader } from '@/fields/sectionHeader'
import { mediaField } from '@/fields/media'
import { sectionSettings } from '@/fields/sectionSettings'

/** A curated set of case studies as large image tiles. */
export const CaseStudyGalleryBlock: Block = {
  slug: 'caseStudyGallery',
  interfaceName: 'CaseStudyGalleryBlock',
  labels: { singular: 'Case study showcase', plural: 'Case study showcases' },
  imageAltText: 'Large image tiles linking to case studies',
  fields: [
    ...sectionHeader({ gradient: false }),
    {
      name: 'items',
      type: 'array',
      label: 'Case studies',
      minRows: 1,
      maxRows: 9,
      labels: { singular: 'Case study', plural: 'Case studies' },
      admin: { description: 'Tiles show two per row; a "full width" tile takes a whole row.' },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'caseStudy',
              type: 'relationship',
              relationTo: 'case-studies',
              required: true,
              admin: { width: '70%' },
            },
            {
              name: 'fullWidth',
              type: 'checkbox',
              label: 'Full width',
              admin: { width: '30%', style: { alignSelf: 'flex-end' } },
            },
          ],
        },
        mediaField({
          name: 'image',
          label: 'Different photo for this tile (optional)',
          description: 'Leave empty to use the case study’s key visual. Use it to show the same photo with a different crop here.',
        }),
      ],
    },
    { name: 'showButton', type: 'checkbox', label: 'Show a button', defaultValue: true },
    {
      ...link({ name: 'link', label: 'Button' }),
      admin: { hideGutter: true, condition: (_, sibling) => Boolean(sibling?.showButton) },
    },
    ...sectionSettings(),
  ],
}
