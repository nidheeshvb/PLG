import type { Block, Condition } from 'payload'

import { link } from '@/fields/link'
import { mediaField } from '@/fields/media'
import { sectionSettings } from '@/fields/sectionSettings'

const isMerge: Condition = (_, sibling) => sibling?.diagram === 'merge'
const isWeave: Condition = (_, sibling) => sibling?.diagram === 'weave'

/**
 * Small heading on the left, one large paragraph on the right whose words light up while
 * scrolling. Optionally followed by a diagram (variants are added as pages need them) and a
 * closing line with a button.
 */
export const LeadTextBlock: Block = {
  slug: 'leadText',
  interfaceName: 'LeadTextBlock',
  labels: { singular: 'Lead paragraph', plural: 'Lead paragraphs' },
  imageAltText: 'A large introductory paragraph, optionally with a diagram below',
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Small heading',
      admin: { description: 'The short orange line on the left.' },
    },
    {
      name: 'text',
      type: 'textarea',
      label: 'Paragraph',
      required: true,
      admin: { rows: 5 },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'textSize',
          type: 'select',
          label: 'Text size',
          defaultValue: 'lg',
          options: [
            { label: 'Large', value: 'lg' },
            { label: 'Medium (a little more space around)', value: 'md' },
          ],
          admin: { width: '50%' },
        },
        {
          name: 'animation',
          type: 'select',
          label: 'Animation',
          defaultValue: 'scrollReveal',
          options: [
            { label: 'Words light up while scrolling', value: 'scrollReveal' },
            { label: 'None', value: 'none' },
          ],
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'highlightMode',
      type: 'radio',
      label: 'Orange words',
      defaultValue: 'tail',
      options: [
        { label: 'None', value: 'none' },
        { label: 'The end of the paragraph', value: 'tail' },
        { label: 'Particular words, wherever they appear', value: 'words' },
      ],
      admin: { layout: 'horizontal' },
    },
    {
      name: 'highlight',
      type: 'text',
      label: 'Words to show in orange',
      admin: {
        condition: (_, sibling) => sibling?.highlightMode !== 'none',
        description:
          'End of the paragraph: copy the end exactly, e.g. “structure a partnership, sell it, deliver it and measure it.” Particular words: separate them with commas, e.g. “Acachet, PLG, Mujtamae” (they turn orange as they light up).',
      },
    },
    {
      name: 'diagram',
      type: 'select',
      label: 'Diagram below the paragraph',
      defaultValue: 'none',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Three into one (three columns that join into the PLG Acachet logo)', value: 'merge' },
        { label: 'Lanes into one (rows with photos whose lines join into one, drawn while scrolling)', value: 'weave' },
      ],
    },
    {
      name: 'mergeItems',
      type: 'array',
      label: 'Diagram columns',
      minRows: 3,
      maxRows: 3,
      labels: { singular: 'Column', plural: 'Columns' },
      admin: {
        initCollapsed: true,
        condition: isMerge,
        components: { RowLabel: '@/fields/LinkRowLabel#ItemRowLabel' },
      },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'label', type: 'text', label: 'Small label', admin: { width: '50%' } },
            { name: 'name', type: 'text', label: 'Name', required: true, admin: { width: '50%' } },
          ],
        },
        { name: 'text', type: 'textarea', label: 'Text', admin: { rows: 2 } },
      ],
    },
    {
      type: 'collapsible',
      label: 'Lanes into one',
      admin: { condition: isWeave },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'weaveStartLabel',
              type: 'text',
              label: 'Label above the rows',
              defaultValue: 'Previously separate',
              admin: { width: '50%' },
            },
            {
              name: 'weaveEndLabel',
              type: 'text',
              label: 'Label above the result',
              defaultValue: 'Now one business',
              admin: { width: '50%' },
            },
          ],
        },
        {
          name: 'weaveItems',
          type: 'array',
          label: 'Rows',
          minRows: 2,
          maxRows: 4,
          labels: { singular: 'Row', plural: 'Rows' },
          admin: { initCollapsed: true, components: { RowLabel: '@/fields/LinkRowLabel#ItemRowLabel' } },
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'name', type: 'text', label: 'Name', required: true, admin: { width: '50%' } },
                {
                  name: 'tag',
                  type: 'text',
                  label: 'Small label',
                  admin: { width: '50%', placeholder: 'Relationships · 10+ years' },
                },
              ],
            },
            { name: 'text', type: 'textarea', label: 'Text', admin: { rows: 2 } },
            mediaField({ name: 'image', label: 'Round photo', description: 'Shown in black and white; colour on hover.' }),
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'weaveResult',
              type: 'text',
              label: 'Result name',
              defaultValue: 'PLG Acachet',
              admin: { width: '50%', description: 'Shown next to the logo where the lines meet.' },
            },
            {
              name: 'weaveNote',
              type: 'text',
              label: 'Result note',
              admin: { width: '50%', description: 'Small line under the name (hidden on tablets and phones).' },
            },
          ],
        },
      ],
    },
    {
      name: 'showClosing',
      type: 'checkbox',
      label: 'Add a closing line with a button',
      defaultValue: false,
    },
    {
      name: 'closingText',
      type: 'textarea',
      label: 'Closing line',
      admin: { rows: 2, condition: (_, sibling) => Boolean(sibling?.showClosing) },
    },
    {
      ...link({ name: 'closingLink', label: 'Closing button', required: false }),
      admin: { hideGutter: true, condition: (_, sibling) => Boolean(sibling?.showClosing) },
    },
    ...sectionSettings(),
  ],
}
