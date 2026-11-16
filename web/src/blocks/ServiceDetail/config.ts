import type { Block } from 'payload'

import { link, linkArray } from '@/fields/link'
import { mediaField } from '@/fields/media'
import { sectionSettings } from '@/fields/sectionSettings'

/**
 * One service "chapter" (Services page): a heading column that stays in view on the left, and on the
 * right a stack of content pieces (photo, highlight, list of sub-services, photo collage) in any order.
 * The number ("01 / 04") and the alternating grey background come from the order of these sections.
 */
export const ServiceDetailBlock: Block = {
  slug: 'serviceDetail',
  interfaceName: 'ServiceDetailBlock',
  labels: { singular: 'Service detail', plural: 'Service details' },
  imageAltText: 'A service with its heading on the left and its sub-services, photos or highlight on the right',
  fields: [
    { name: 'title', type: 'text', label: 'Service name', required: true },
    {
      name: 'hook',
      type: 'text',
      label: 'Short headline (optional)',
      admin: { description: 'A bold line under the name, e.g. “Influencer programmes, built around the idea.”' },
    },
    { name: 'lead', type: 'textarea', label: 'Intro', admin: { rows: 3 } },
    linkArray({ name: 'links', label: 'Buttons', maxRows: 2 }),
    {
      name: 'content',
      type: 'blocks',
      label: 'Content on the right',
      labels: { singular: 'Piece', plural: 'Pieces' },
      admin: {
        initCollapsed: true,
        description: 'Add pieces in the order they should appear: a photo, a highlight, a list of sub-services, a photo collage.',
      },
      blocks: [
        {
          slug: 'svcImage',
          interfaceName: 'ServiceImagePiece',
          labels: { singular: 'Photo', plural: 'Photos' },
          fields: [
            mediaField({
              name: 'image',
              label: 'Photo',
              required: true,
              description: 'Shown wide (16:9) with rounded corners; it settles from a slight zoom while scrolling. Set the focal point to choose the crop.',
            }),
            { name: 'caption', type: 'text', label: 'Caption (optional)', admin: { description: 'Small capitals over the bottom of the photo.' } },
          ],
        },
        {
          slug: 'svcHighlight',
          interfaceName: 'ServiceHighlightPiece',
          labels: { singular: 'Highlight', plural: 'Highlights' },
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'label', type: 'text', label: 'Small orange label', admin: { width: '50%', placeholder: 'Our proprietary platform' } },
                { name: 'name', type: 'text', label: 'Big word', required: true, admin: { width: '50%', placeholder: 'FUZE' } },
              ],
            },
            { name: 'note', type: 'text', label: 'Small label under the word', admin: { placeholder: 'Influencer platform' } },
            { name: 'text', type: 'textarea', label: 'Text', admin: { rows: 2 } },
          ],
        },
        {
          slug: 'svcList',
          interfaceName: 'ServiceListPiece',
          labels: { singular: 'List of sub-services', plural: 'Lists of sub-services' },
          fields: [
            {
              name: 'items',
              type: 'array',
              label: 'Sub-services',
              minRows: 1,
              labels: { singular: 'Sub-service', plural: 'Sub-services' },
              admin: { initCollapsed: true, components: { RowLabel: '@/fields/LinkRowLabel#ItemRowLabel' } },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'title', type: 'text', label: 'Name', required: true, admin: { width: '60%' } },
                    { name: 'tag', type: 'text', label: 'Orange tag (optional)', admin: { width: '40%', placeholder: 'Our core service' } },
                  ],
                },
                { name: 'text', type: 'textarea', label: 'Description', admin: { rows: 3 } },
                { name: 'showLink', type: 'checkbox', label: 'Add a text link', defaultValue: false },
                {
                  ...link({ name: 'link', label: 'Text link', appearance: false, required: false }),
                  admin: { hideGutter: true, condition: (_, sibling) => Boolean(sibling?.showLink) },
                },
              ],
            },
          ],
        },
        {
          slug: 'svcCollage',
          interfaceName: 'ServiceCollagePiece',
          labels: { singular: 'Photo collage', plural: 'Photo collages' },
          fields: [
            {
              name: 'images',
              type: 'array',
              label: 'Photos',
              minRows: 3,
              maxRows: 3,
              labels: { singular: 'Photo', plural: 'Photos' },
              admin: {
                initCollapsed: true,
                description: 'Exactly 3: the first is tall on the left, the other two are stacked on the right. Set focal points to choose the crops.',
              },
              fields: [mediaField({ name: 'image', label: 'Photo', required: true })],
            },
          ],
        },
      ],
    },
    ...sectionSettings(),
  ],
}
