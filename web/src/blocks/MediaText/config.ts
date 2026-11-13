import type { Block } from 'payload'

import { link } from '@/fields/link'
import { mediaField } from '@/fields/media'
import { richText } from '@/fields/richText'
import { sectionHeader } from '@/fields/sectionHeader'
import { sectionSettings } from '@/fields/sectionSettings'

/** Text next to an image. Reused across pages (Home "Who we are", About sections, …). */
export const MediaTextBlock: Block = {
  slug: 'mediaText',
  interfaceName: 'MediaTextBlock',
  labels: { singular: 'Text with image', plural: 'Text with image' },
  imageAltText: 'Heading, text and a button beside an image',
  fields: [
    ...sectionHeader({ gradientDefault: true }),
    richText(),
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
          admin: { width: '50%' },
        },
      ],
    },
    ...sectionSettings(),
  ],
}
