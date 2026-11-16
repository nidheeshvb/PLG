import type { Block } from 'payload'

import { sectionSettings } from '@/fields/sectionSettings'

/**
 * A bar of links under the banner. Nothing is typed twice:
 * - sections: links to this page's sections (each section with a "Section ID" and a
 *   "Name in section menu" in its Section settings), underlined while scrolling (About)
 * - menu: the same links as this page's group in the main menu (Header & footer → Menu links →
 *   Sub-links), with this page highlighted and a "Back to …" link to the parent (Our Story, Team, Join)
 */
export const SectionNavBlock: Block = {
  slug: 'sectionNav',
  interfaceName: 'SectionNavBlock',
  labels: { singular: 'Section menu', plural: 'Section menus' },
  imageAltText: 'A bar of links to the sections of the page',
  fields: [
    {
      name: 'source',
      type: 'radio',
      label: 'Links',
      defaultValue: 'sections',
      options: [
        { label: 'The sections of this page', value: 'sections' },
        { label: 'Same links as the main menu (sub-links)', value: 'menu' },
      ],
      admin: { layout: 'vertical' },
    },
    {
      type: 'ui',
      name: 'sectionNavHelp',
      admin: {
        components: { Field: '@/blocks/SectionNav/AdminHelp#SectionNavHelp' },
      },
    },
    {
      name: 'barStyle',
      type: 'radio',
      label: 'Look',
      defaultValue: 'bar',
      options: [
        { label: 'Bar under the banner (About)', value: 'bar' },
        { label: 'Numbered, stays at the top while scrolling, with a progress line (Services)', value: 'sticky' },
      ],
      admin: {
        layout: 'vertical',
        condition: (_, sibling) => sibling?.source !== 'menu',
        description: 'Numbered: links are numbered 01, 02… in page order. The bar sticks to the top of the screen and steps aside while the main menu shows.',
      },
    },
    {
      name: 'note',
      type: 'text',
      label: 'Small text on the right (optional)',
      admin: {
        description: 'Hidden on phones. E.g. “Also in About: Our Story · The Team · Join Us”.',
        condition: (_, sibling) => sibling?.source !== 'menu' && sibling?.barStyle !== 'sticky',
      },
    },
    ...sectionSettings(),
  ],
}
