import type { Block, Condition } from 'payload'

import { link } from '@/fields/link'
import { mediaField } from '@/fields/media'
import { sectionSettings } from '@/fields/sectionSettings'

const isMerge: Condition = (_, sibling) => sibling?.diagram === 'merge'
const isWeave: Condition = (_, sibling) => sibling?.diagram === 'weave'
const isCross: Condition = (_, sibling) => sibling?.diagram === 'cross'
const hasDetails: Condition = (_, sibling) => Boolean(sibling?.showDetails)

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
      name: 'heading',
      type: 'textarea',
      label: 'Heading above the paragraph (optional)',
      admin: { rows: 2, description: 'A large bold heading over the paragraph (Services “Our approach”).' },
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
            { label: 'Small (under a heading)', value: 'sm' },
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
      type: 'row',
      fields: [
        {
          name: 'band',
          type: 'checkbox',
          label: 'Grey band background',
          defaultValue: false,
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'notes',
      type: 'array',
      label: 'Short notes under the paragraph',
      labels: { singular: 'Note', plural: 'Notes' },
      maxRows: 6,
      admin: {
        initCollapsed: true,
        description: 'Optional small capitals with an orange dot each, e.g. “In the UAE”, “In international markets”.',
        components: { RowLabel: '@/fields/LinkRowLabel#ItemRowLabel' },
      },
      fields: [{ name: 'text', type: 'text', label: 'Note', required: true }],
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
        { label: 'A phrase', value: 'phrase' },
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
          'End of the paragraph: copy the end exactly, e.g. “structure a partnership, sell it, deliver it and measure it.” Particular words: separate them with commas, e.g. “Acachet, PLG, Mujtamae” (they turn orange as they light up). A phrase: copy it exactly, e.g. “refuse to stay in a lane:” (it turns orange as it lights up).',
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
        { label: 'One line across lanes (columns crossed by one orange line, drawn while scrolling)', value: 'cross' },
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
      name: 'crossItems',
      type: 'array',
      label: 'Lanes',
      minRows: 2,
      maxRows: 4,
      labels: { singular: 'Lane', plural: 'Lanes' },
      admin: {
        initCollapsed: true,
        condition: isCross,
        description: 'Two to four columns side by side (two by two on phones).',
        components: { RowLabel: '@/fields/LinkRowLabel#ItemRowLabel' },
      },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'label', type: 'text', label: 'Small label', admin: { width: '50%', placeholder: 'The deal' } },
            { name: 'name', type: 'text', label: 'Name', required: true, admin: { width: '50%' } },
          ],
        },
        { name: 'text', type: 'textarea', label: 'Text', admin: { rows: 2 } },
      ],
    },
    {
      name: 'showDetails',
      type: 'checkbox',
      label: 'Add a row with a heading, text and a labelled list',
      defaultValue: false,
      admin: { description: 'E.g. Join Us “Where the work goes”: markets with a label each.' },
    },
    {
      type: 'collapsible',
      label: 'Heading, text and list',
      admin: { condition: hasDetails },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'detailsHeading', type: 'text', label: 'Small heading', admin: { width: '50%' } },
          ],
        },
        { name: 'detailsText', type: 'textarea', label: 'Text', admin: { rows: 3 } },
        {
          name: 'detailsList',
          type: 'array',
          label: 'List',
          labels: { singular: 'Item', plural: 'Items' },
          admin: { initCollapsed: true, components: { RowLabel: '@/fields/LinkRowLabel#ItemRowLabel' } },
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'name', type: 'text', label: 'Name', required: true, admin: { width: '40%' } },
                { name: 'tag', type: 'text', label: 'Label', admin: { width: '30%', placeholder: 'Opening' } },
                {
                  name: 'highlight',
                  type: 'checkbox',
                  label: 'Orange label',
                  defaultValue: false,
                  admin: { width: '30%', style: { alignSelf: 'center' } },
                },
              ],
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
