import type { Block } from 'payload'

import { link } from '@/fields/link'
import { documentEditor } from '@/fields/richText'
import { sectionSettings } from '@/fields/sectionSettings'

/**
 * A legal document page (Terms, Privacy Policy, Cookies): a short dark header with key facts, a
 * switcher between the legal documents that sticks to the top, then the document on a white band
 * with numbered contents beside it. Section numbers and the contents list come from the order.
 */
export const LegalDocumentBlock: Block = {
  slug: 'legalDocument',
  interfaceName: 'LegalDocumentBlock',
  labels: { singular: 'Legal document', plural: 'Legal documents' },
  imageAltText: 'A legal document with a header, a document switcher, contents and numbered sections',
  fields: [
    {
      type: 'collapsible',
      label: 'Header',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
          admin: { description: 'The last word is shown in orange, e.g. “Privacy Policy.”' },
        },
        { name: 'subtitle', type: 'textarea', label: 'Line under the title', admin: { rows: 2 } },
        {
          name: 'facts',
          type: 'array',
          label: 'Facts',
          maxRows: 4,
          labels: { singular: 'Fact', plural: 'Facts' },
          admin: { initCollapsed: true, description: 'E.g. Last updated, Effective from, Version.', components: { RowLabel: '@/fields/LinkRowLabel#ItemRowLabel' } },
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'label', type: 'text', label: 'Label', required: true, admin: { width: '50%' } },
                { name: 'value', type: 'text', label: 'Value', required: true, admin: { width: '50%' } },
              ],
            },
          ],
        },
        { name: 'showBrandMark', type: 'checkbox', label: 'Show the brand mark on the right', defaultValue: true },
      ],
    },
    {
      type: 'collapsible',
      label: 'Document switcher',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'switcherLabel', type: 'text', label: 'Label', defaultValue: 'Legal', admin: { width: '30%' } },
            {
              name: 'documents',
              type: 'relationship',
              relationTo: 'pages',
              hasMany: true,
              label: 'Documents (in order)',
              admin: {
                width: '70%',
                description: 'The legal pages in the bar under the header, including this one. The others are also linked at the end of the document.',
              },
            },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Notice and introduction',
      fields: [
        { name: 'noticeTitle', type: 'text', label: 'Notice: bold line', admin: { description: 'Optional orange box above the document. Leave empty to hide it.' } },
        { name: 'noticeText', type: 'textarea', label: 'Notice: text', admin: { rows: 2 } },
        {
          name: 'noticePoints',
          type: 'array',
          label: 'Notice: points',
          labels: { singular: 'Point', plural: 'Points' },
          admin: { initCollapsed: true, components: { RowLabel: '@/fields/LinkRowLabel#ItemRowLabel' } },
          fields: [{ name: 'text', type: 'text', label: 'Point', required: true }],
        },
        { name: 'intro', type: 'textarea', label: 'Introduction', admin: { rows: 3, description: 'A short plain-language summary above the first section.' } },
      ],
    },
    {
      name: 'sections',
      type: 'array',
      label: 'Sections',
      labels: { singular: 'Section', plural: 'Sections' },
      admin: {
        initCollapsed: true,
        description: 'Numbered 01, 02… in this order; the contents list beside the document is made from their titles.',
        components: { RowLabel: '@/fields/LinkRowLabel#ItemRowLabel' },
      },
      fields: [
        { name: 'title', type: 'text', label: 'Title', required: true },
        {
          type: 'row',
          fields: [
            { name: 'highlight', type: 'checkbox', label: 'Show in a highlighted box', defaultValue: false, admin: { width: '34%' } },
            {
              name: 'mustLabel',
              type: 'text',
              label: 'Orange tag (optional)',
              admin: { width: '33%', placeholder: 'Must be covered' },
            },
            {
              name: 'mustNote',
              type: 'text',
              label: 'Text after the tag',
              defaultValue: 'Counsel to confirm scope.',
              // only shown with a tag, so only offered with one (CMS-1)
              admin: { width: '33%', condition: (_, sibling) => Boolean(sibling?.mustLabel) },
            },
          ],
        },
        { name: 'body', type: 'richText', label: 'Text', editor: documentEditor },
        {
          name: 'cookieTable',
          type: 'array',
          // short table name: the generated one makes index names longer than Postgres allows
          dbName: 'legal_cookies',
          label: 'Cookie table (optional)',
          labels: { singular: 'Cookie', plural: 'Cookies' },
          admin: { initCollapsed: true, components: { RowLabel: '@/fields/LinkRowLabel#ItemRowLabel' } },
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'name', type: 'text', label: 'Cookie', required: true, admin: { width: '25%' } },
                { name: 'provider', type: 'text', label: 'Provider', admin: { width: '25%' } },
                {
                  name: 'category',
                  type: 'select',
                  label: 'Category',
                  // the generated name would pass Postgres' 63-character limit
                  enumName: 'enum_legal_cookie_category',
                  defaultValue: 'necessary',
                  options: [
                    { label: 'Strictly necessary', value: 'necessary' },
                    { label: 'Analytics', value: 'analytics' },
                    { label: 'Functional', value: 'functional' },
                    { label: 'Marketing', value: 'marketing' },
                  ],
                  admin: { width: '25%' },
                },
                { name: 'duration', type: 'text', label: 'Duration', admin: { width: '25%' } },
              ],
            },
            { name: 'purpose', type: 'text', label: 'Purpose' },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'showContactCard', type: 'checkbox', label: 'Add the company contact card', defaultValue: false, admin: { width: '50%', description: 'From Header & footer → Company details.' } },
            {
              name: 'showPreferencesButton',
              type: 'checkbox',
              label: 'Add the “Manage Cookie Preferences” button',
              defaultValue: false,
              admin: { width: '50%', description: 'Opens the cookie consent panel once a consent platform is chosen (not yet connected).' },
            },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'End of the document',
      fields: [
        {
          name: 'askTitle',
          type: 'text',
          label: '“Questions?” box title',
          defaultValue: 'Questions about this policy?',
          admin: { description: 'The text under it uses the email and phone from Header & footer → Company details.' },
        },
        { ...link({ name: 'askLink', label: 'Its button', required: false }), admin: { hideGutter: true } },
      ],
    },
    ...sectionSettings(),
  ],
}
