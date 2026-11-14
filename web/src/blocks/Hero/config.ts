import type { Block, Condition } from 'payload'

import { linkArray } from '@/fields/link'
import { mediaField } from '@/fields/media'
import { richText } from '@/fields/richText'
import { sectionSettings } from '@/fields/sectionSettings'

const isShowreel: Condition = (_, sibling) => sibling?.variant === 'showreel'
const isPage: Condition = (_, sibling) => sibling?.variant === 'page'

/**
 * Page-top banner. Variants keep one block for every page:
 * - showreel: full-screen video, centred headline (Home)
 * - page: inner-page banner: automatic breadcrumb, headline lines with the last word in orange,
 *   intro + buttons on the right, background image (or video), optional brand mark
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
      defaultValue: 'page',
      required: true,
      options: [
        { label: 'Inner page (breadcrumb, headline left, intro right)', value: 'page' },
        { label: 'Showreel (full-screen video, centred text)', value: 'showreel' },
      ],
    },
    {
      name: 'title',
      type: 'textarea',
      label: 'Headline',
      required: true,
      admin: {
        rows: 2,
        description: 'Press Enter to start a new line. On inner pages each line stays on one line.',
      },
    },
    {
      name: 'highlightLastWord',
      type: 'checkbox',
      label: 'Show the last word in orange',
      defaultValue: true,
      admin: { condition: isPage },
    },
    {
      name: 'largerOnPhones',
      type: 'checkbox',
      label: 'Slightly larger headline on phones (for short headlines)',
      defaultValue: false,
      admin: { condition: isPage },
    },
    {
      type: 'row',
      admin: { condition: isPage },
      fields: [
        {
          name: 'headlineSize',
          type: 'select',
          label: 'Headline size',
          defaultValue: 'wrap',
          options: [
            { label: 'Large, lines wrap as needed', value: 'wrap' },
            { label: 'Large, each line stays on one line', value: 'oneLine' },
            { label: 'Fitted, each line stays on one line (for long lines)', value: 'fitted' },
          ],
          admin: { width: '50%' },
        },
        {
          name: 'imageStyle',
          type: 'select',
          label: 'Background photo',
          defaultValue: 'dim',
          options: [
            { label: 'Dimmed (standard)', value: 'dim' },
            { label: 'Brighter', value: 'bright' },
          ],
          admin: { width: '50%' },
        },
      ],
    },
    { name: 'lede', type: 'textarea', label: 'Intro text', admin: { rows: 3, condition: isShowreel } },
    richText({
      name: 'intro',
      label: 'Intro text',
      admin: { condition: isPage, description: 'Use bold for the part that should stand out in white.' },
    }),
    linkArray({ name: 'links', label: 'Buttons', maxRows: 2 }),
    mediaField({
      name: 'video',
      label: 'Background video',
      accept: 'video',
      description: 'Muted, looping MP4. Keep it under ~8 MB. Optional on inner pages.',
    }),
    mediaField({
      name: 'videoMobile',
      label: 'Lighter video for phones (optional)',
      accept: 'video',
      description: 'A smaller version of the background video for screens up to 900px wide. Leave empty to use the main video.',
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
      admin: { condition: isShowreel },
    },
    {
      name: 'showBrandMark',
      type: 'checkbox',
      label: 'Show the brand mark on the right',
      defaultValue: false,
      admin: { condition: isPage },
    },
    ...sectionSettings(),
  ],
}
