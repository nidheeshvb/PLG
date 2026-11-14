import type { Block } from 'payload'

import { ctaFields } from '@/fields/ctaFields'
import { sectionSettings } from '@/fields/sectionSettings'

/**
 * White "start a conversation" banner near the bottom of a page. By default it shows the
 * site-wide content from Header & footer → Call to action, so it is edited once for every page.
 */
export const CtaBannerBlock: Block = {
  slug: 'ctaBanner',
  interfaceName: 'CtaBannerBlock',
  labels: { singular: 'Call to action banner', plural: 'Call to action banners' },
  imageAltText: 'White banner with a heading, short text and a button',
  fields: [
    {
      name: 'useDefault',
      type: 'checkbox',
      label: 'Use the site-wide call to action',
      defaultValue: true,
      admin: {
        description: 'Edited once in Header & footer → Call to action. Untick to write different content for this page.',
      },
    },
    {
      name: 'custom',
      type: 'group',
      label: 'Content for this page',
      admin: { condition: (_, sibling) => !sibling?.useDefault },
      fields: ctaFields({ required: false }),
    },
    ...sectionSettings(),
  ],
}
