import type { CollectionConfig } from 'payload'

import { anyone, isLoggedIn } from '@/access'
import { mediaField } from '@/fields/media'
import { slugField } from '@/fields/slug'
import { revalidateSiteAfterChange } from '@/lib/revalidate'

import { SERVICES } from './serviceOptions'

const toConfirm = 'Put anything still to be confirmed in [square brackets]: it shows highlighted in orange until you remove the brackets.'

/**
 * Case studies: the tiles (Home, Our Work) and the full case study that opens over Our Work at
 * /our-work#case-<url name> (brief, approach, impact figures, gallery, photo + film).
 */
export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  labels: { singular: 'Case study', plural: 'Case studies' },
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'client', 'services', 'sortOrder'],
    description: 'Shown on Our Work in their set order (lower “Order” first) and wherever a section picks them (Home).',
  },
  defaultSort: 'sortOrder',
  access: { read: anyone, create: isLoggedIn, update: isLoggedIn, delete: isLoggedIn },
  hooks: { afterChange: [revalidateSiteAfterChange] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Tile',
          fields: [
            { name: 'title', type: 'text', label: 'Title', required: true },
            {
              name: 'cardTitle',
              type: 'text',
              label: 'Short title',
              admin: { description: 'Optional. Used on Home tiles, the “Next case study” link and the browser tab; the full title otherwise.' },
            },
            {
              name: 'summary',
              type: 'textarea',
              label: 'One-line summary',
              required: true,
              admin: { rows: 2, description: `Under the title on tiles and in the case study banner. ${toConfirm}` },
            },
            {
              type: 'row',
              fields: [
                { name: 'client', type: 'text', label: 'Client', admin: { width: '50%' } },
                {
                  name: 'services',
                  type: 'select',
                  label: 'Services',
                  hasMany: true,
                  options: SERVICES.map(({ label, value }) => ({ label, value })),
                  admin: { width: '50%', description: 'Tags on the tile and the Our Work filter.' },
                },
              ],
            },
            mediaField({
              name: 'image',
              label: 'Key visual',
              required: true,
              description: 'Tile picture, case study banner and first gallery photo. Set the focal point to choose the crop.',
            }),
            mediaField({
              name: 'video',
              label: 'Short clip (optional)',
              accept: 'video',
              description: 'Muted MP4. Plays on the Our Work tile on hover and in the case study banner.',
            }),
            {
              type: 'row',
              fields: [
                {
                  name: 'wide',
                  type: 'checkbox',
                  label: 'Wide tile on Our Work',
                  defaultValue: false,
                  admin: { width: '50%', description: 'Spans the full width; the others sit two per row.' },
                },
                {
                  name: 'keyVisualPending',
                  type: 'checkbox',
                  label: 'Show “Key visual to come”',
                  defaultValue: false,
                  admin: { width: '50%', description: 'For case studies still using a library photo.' },
                },
              ],
            },
          ],
        },
        {
          label: 'Case study',
          description: `The full case study that opens over Our Work. ${toConfirm}`,
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'market', type: 'text', label: 'Market', admin: { width: '50%', placeholder: 'Abu Dhabi, UAE' } },
                { name: 'year', type: 'text', label: 'Year', admin: { width: '50%', placeholder: '2025' } },
              ],
            },
            {
              name: 'brief',
              type: 'textarea',
              label: '01 The Brief',
              admin: { rows: 5, description: 'Leave an empty line between paragraphs.' },
            },
            {
              name: 'approach',
              type: 'textarea',
              label: '02 The Approach',
              admin: { rows: 6, description: 'Leave an empty line between paragraphs.' },
            },
            {
              name: 'results',
              type: 'array',
              label: '03 The Impact: headline figures',
              minRows: 1,
              maxRows: 4,
              labels: { singular: 'Figure', plural: 'Figures' },
              admin: { initCollapsed: true, components: { RowLabel: '@/fields/LinkRowLabel#ItemRowLabel' } },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'value', type: 'text', label: 'Figure', required: true, admin: { width: '30%', placeholder: '15,000' } },
                    { name: 'label', type: 'text', label: 'What it measures', required: true, admin: { width: '70%' } },
                  ],
                },
              ],
            },
            {
              name: 'points',
              type: 'array',
              label: 'Other results (optional)',
              labels: { singular: 'Result', plural: 'Results' },
              admin: { initCollapsed: true, components: { RowLabel: '@/fields/LinkRowLabel#ItemRowLabel' } },
              fields: [{ name: 'text', type: 'text', label: 'Result', required: true }],
            },
            {
              name: 'gallery',
              type: 'array',
              label: 'Gallery photos',
              maxRows: 4,
              labels: { singular: 'Photo', plural: 'Photos' },
              admin: {
                initCollapsed: true,
                description: 'Up to 4, shown after the key visual: two halves, one full width, two halves.',
              },
              fields: [mediaField({ name: 'image', label: 'Photo', required: true })],
            },
            {
              type: 'row',
              fields: [
                mediaField({ name: 'still', label: 'Photo after the impact' }),
                { name: 'stillCaption', type: 'text', label: 'Its caption', defaultValue: 'On the ground' },
              ],
            },
            {
              type: 'row',
              fields: [
                mediaField({
                  name: 'film',
                  label: 'Film after the impact',
                  accept: 'video',
                  description: 'MP4 with play controls. Leave empty to use the short clip above (if any).',
                }),
                { name: 'filmCaption', type: 'text', label: 'Its caption', defaultValue: 'Programme film' },
              ],
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              label: 'Search description',
              admin: { rows: 2, description: 'Used as the page description while this case study is open (about 150 characters).' },
            },
          ],
        },
      ],
    },
    ...slugField('title'),
    {
      name: 'sortOrder',
      type: 'number',
      label: 'Order',
      defaultValue: 0,
      admin: { position: 'sidebar', description: 'Lower numbers appear first on Our Work (and are numbered 01, 02…).' },
    },
  ],
}
