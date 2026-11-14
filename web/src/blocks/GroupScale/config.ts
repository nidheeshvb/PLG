import type { Block } from 'payload'

import { link } from '@/fields/link'
import { sectionSettings } from '@/fields/sectionSettings'

/**
 * Small heading on the left; a statement, a chain of company names (first one highlighted)
 * and an optional text link on the right. Used for "Group scale" on The Team page.
 */
export const GroupScaleBlock: Block = {
  slug: 'groupScale',
  interfaceName: 'GroupScaleBlock',
  labels: { singular: 'Group chain', plural: 'Group chains' },
  imageAltText: 'A statement with a chain of company names and a link',
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Small heading',
      admin: { description: 'The short orange line on the left.' },
    },
    { name: 'text', type: 'textarea', label: 'Statement', required: true, admin: { rows: 3 } },
    {
      name: 'chain',
      type: 'array',
      label: 'Chain of names',
      minRows: 1,
      maxRows: 5,
      labels: { singular: 'Name', plural: 'Names' },
      admin: {
        initCollapsed: false,
        description: 'Shown left to right, joined by short lines. The first name is highlighted.',
      },
      fields: [{ name: 'name', type: 'text', label: 'Name', required: true }],
    },
    {
      name: 'showLink',
      type: 'checkbox',
      label: 'Show a text link',
      defaultValue: true,
    },
    {
      ...link({ name: 'link', label: 'Text link', appearance: false }),
      admin: { condition: (_, sibling) => Boolean(sibling?.showLink), hideGutter: true },
    },
    ...sectionSettings(),
  ],
}
