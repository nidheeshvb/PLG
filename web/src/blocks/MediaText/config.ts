import type { Block, Condition } from 'payload'

import { link } from '@/fields/link'
import { mediaField } from '@/fields/media'
import { richText } from '@/fields/richText'
import { sectionHeader } from '@/fields/sectionHeader'
import { sectionSettings } from '@/fields/sectionSettings'

const isCard: Condition = (_, sibling) => sibling?.variant === 'card'
const isFade: Condition = (_, sibling) => sibling?.variant !== 'card'

/**
 * Text next to an image. Variants:
 * - fade: image fades into the black page (Home "Who we are")
 * - card: rounded image on a dark grey band, optional "where it fits" list and a live-report card
 *   over the image (About "Mujtamae")
 */
export const MediaTextBlock: Block = {
  slug: 'mediaText',
  interfaceName: 'MediaTextBlock',
  labels: { singular: 'Text with image', plural: 'Text with image' },
  imageAltText: 'Heading, text and a button beside an image',
  fields: [
    {
      name: 'variant',
      type: 'select',
      label: 'Style',
      defaultValue: 'fade',
      required: true,
      options: [
        { label: 'Image fades into the background', value: 'fade' },
        { label: 'Rounded image on a grey band (with optional list and report card)', value: 'card' },
      ],
    },
    ...sectionHeader({ gradientDefault: true }),
    richText(),
    {
      name: 'listHeading',
      type: 'text',
      label: 'List heading (optional)',
      admin: { condition: isCard, description: 'E.g. “Where it fits”. Shown above the list.' },
    },
    {
      name: 'listItems',
      type: 'array',
      label: 'List',
      maxRows: 6,
      labels: { singular: 'List item', plural: 'List items' },
      admin: {
        condition: isCard,
        initCollapsed: true,
        components: { RowLabel: '@/fields/LinkRowLabel#ItemRowLabel' },
      },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'text', type: 'textarea', admin: { rows: 2 } },
      ],
    },
    {
      name: 'showButton',
      type: 'checkbox',
      label: 'Show a button',
      defaultValue: true,
    },
    {
      ...link({ name: 'link', label: 'Button' }),
      admin: { hideGutter: true, condition: (_, sibling) => Boolean(sibling?.showButton) },
    },
    mediaField({ name: 'image', label: 'Image', required: true }),
    {
      type: 'row',
      fields: [
        {
          name: 'imagePosition',
          type: 'radio',
          label: 'Image position',
          defaultValue: 'right',
          options: [
            { label: 'Right', value: 'right' },
            { label: 'Left', value: 'left' },
          ],
          admin: { layout: 'horizontal', width: '50%' },
        },
        {
          name: 'fadeImageEdge',
          type: 'checkbox',
          label: 'Fade the image into the background',
          defaultValue: true,
          admin: { width: '50%', condition: isFade },
        },
      ],
    },
    {
      name: 'report',
      type: 'group',
      label: 'Report card over the image',
      admin: {
        condition: isCard,
        description: 'A small illustrative dashboard card on the image. Leave the title empty to hide it.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'title', type: 'text', label: 'Card title', admin: { width: '60%' } },
            { name: 'badge', type: 'text', label: 'Badge (pulsing)', defaultValue: 'Live', admin: { width: '40%' } },
          ],
        },
        {
          name: 'bars',
          type: 'array',
          label: 'Bars',
          maxRows: 5,
          labels: { singular: 'Bar', plural: 'Bars' },
          admin: { initCollapsed: true, components: { RowLabel: '@/fields/LinkRowLabel#ItemRowLabel' } },
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'label', type: 'text', required: true, admin: { width: '60%' } },
                {
                  name: 'value',
                  type: 'number',
                  label: 'Fill (%)',
                  required: true,
                  min: 0,
                  max: 100,
                  admin: { width: '40%' },
                },
              ],
            },
          ],
        },
        { name: 'caption', type: 'text', label: 'Small caption' },
      ],
    },
    ...sectionSettings(),
  ],
}
