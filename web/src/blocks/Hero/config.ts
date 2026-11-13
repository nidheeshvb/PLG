import type { Block } from 'payload'

import { linkArray } from '@/fields/link'
import { mediaField } from '@/fields/media'
import { sectionSettings } from '@/fields/sectionSettings'

/**
 * Page-top banner. Variants keep one block for every page:
 * - showreel: full-screen video, centred headline (Home)
 * - page: inner-page banner (added with the inner pages)
 */
export const HeroBlock: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  labels: { singular: 'Banner (top of page)', plural: 'Banners' },
  imageAltText: 'Full-width banner with headline and buttons',
  fields: [
    {
      name: 'variant',
      type: 'select',
      label: 'Style',
      defaultValue: 'showreel',
      required: true,
      options: [{ label: 'Showreel (full-screen video, centred text)', value: 'showreel' }],
    },
    {
      name: 'title',
      type: 'textarea',
      label: 'Headline',
      required: true,
      admin: { rows: 2 },
    },
    { name: 'lede', type: 'textarea', label: 'Intro text', admin: { rows: 3 } },
    linkArray({ name: 'links', label: 'Buttons', maxRows: 2 }),
    mediaField({
      name: 'video',
      label: 'Background video',
      accept: 'video',
      description: 'Muted, looping MP4. Keep it under ~8 MB.',
    }),
    mediaField({
      name: 'poster',
      label: 'Background image',
      required: true,
      description: 'Shown while the video loads, and instead of the video if there is none.',
    }),
    {
      name: 'showScrollCue',
      type: 'checkbox',
      label: 'Show the "scroll down" indicator',
      defaultValue: true,
    },
    ...sectionSettings(),
  ],
}
