import type { Block } from 'payload'

import { richText } from '@/fields/richText'
import { sectionHeader } from '@/fields/sectionHeader'
import { sectionSettings } from '@/fields/sectionSettings'

/**
 * Text, key facts and a group structure drawn as nested frames (each company inside its parent).
 * White band. The innermost level is highlighted until a visitor points at another one.
 */
export const OwnershipBlock: Block = {
  slug: 'ownership',
  interfaceName: 'OwnershipBlock',
  labels: { singular: 'Group structure', plural: 'Group structures' },
  imageAltText: 'Text and key facts beside nested boxes showing the group structure',
  fields: [
    ...sectionHeader({ gradient: false }),
    richText(),
    {
      name: 'facts',
      type: 'array',
      label: 'Key facts',
      maxRows: 4,
      labels: { singular: 'Fact', plural: 'Facts' },
      admin: {
        initCollapsed: true,
        description: 'Numbers count up when they scroll into view (e.g. “1852”, “50+”). Text such as “UAE · MEA” stays as it is.',
        components: { RowLabel: '@/fields/LinkRowLabel#ItemRowLabel' },
      },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'value', type: 'text', label: 'Value', required: true, admin: { width: '40%' } },
            { name: 'label', type: 'text', label: 'Label', required: true, admin: { width: '60%' } },
          ],
        },
      ],
    },
    richText({
      name: 'closing',
      label: 'Closing line (optional)',
      admin: { description: 'Use bold for the opening words.' },
    }),
    {
      name: 'levels',
      type: 'array',
      label: 'Group structure (outermost first)',
      minRows: 1,
      maxRows: 4,
      labels: { singular: 'Level', plural: 'Levels' },
      admin: {
        initCollapsed: true,
        description: 'Each level is drawn inside the one above it. The last level is highlighted by default.',
        components: { RowLabel: '@/fields/LinkRowLabel#ItemRowLabel' },
      },
      fields: [
        { name: 'name', type: 'text', label: 'Company name', required: true },
        {
          type: 'row',
          fields: [
            { name: 'tag', type: 'text', label: 'Small label', admin: { width: '50%', placeholder: 'Parent group' } },
            { name: 'detail', type: 'text', label: 'Detail', admin: { width: '50%', placeholder: 'Est. 1852' } },
          ],
        },
        { name: 'text', type: 'textarea', label: 'Description', admin: { rows: 2 } },
        {
          type: 'row',
          fields: [
            { name: 'figure', type: 'text', label: 'Figure', admin: { width: '50%', placeholder: '50+' } },
            { name: 'figureLabel', type: 'text', label: 'Figure label', admin: { width: '50%', placeholder: 'Countries' } },
          ],
        },
      ],
    },
    ...sectionSettings(),
  ],
}
