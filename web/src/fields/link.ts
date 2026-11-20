import type { ArrayField, Field, GroupField } from 'payload'

import { validateSafeUrl } from './safeUrl'

export const linkAppearances = [
  { label: 'Orange button', value: 'primary' },
  { label: 'Outline button', value: 'ghost' },
  { label: 'Dark button', value: 'dark' },
] as const

type LinkOptions = {
  name?: string
  label?: string
  /** Show the "Button style" option. Off for plain text links (nav, footer). */
  appearance?: boolean
  required?: boolean
  description?: string
}

/** The fields that make up one link. Shared by `link` and `linkArray`. */
const linkFields = ({ appearance = true, required = true }: LinkOptions): Field[] => [
  {
    type: 'row',
    fields: [
      {
        name: 'label',
        type: 'text',
        label: 'Text',
        required,
        admin: { width: '50%' },
      },
      ...(appearance
        ? ([
            {
              name: 'appearance',
              type: 'select',
              label: 'Button style',
              defaultValue: 'primary',
              options: [...linkAppearances],
              admin: { width: '50%' },
            },
          ] satisfies Field[])
        : []),
    ],
  },
  {
    name: 'type',
    type: 'radio',
    label: 'Goes to',
    defaultValue: 'page',
    options: [
      { label: 'A page', value: 'page' },
      { label: 'A section on this page', value: 'section' },
      { label: 'A web address', value: 'url' },
    ],
    admin: { layout: 'horizontal' },
  },
  {
    type: 'row',
    fields: [
      {
        name: 'page',
        type: 'relationship',
        relationTo: 'pages',
        label: 'Page',
        required,
        admin: {
          width: '50%',
          condition: (_, sibling) => sibling?.type === 'page',
        },
      },
      {
        name: 'section',
        type: 'text',
        label: 'Section ID',
        admin: {
          width: '50%',
          description:
            'The "Section ID" set on a section (e.g. contact). For a page link this is optional and jumps to that section on the page.',
          condition: (_, sibling) => sibling?.type === 'page' || sibling?.type === 'section',
        },
      },
      {
        name: 'url',
        type: 'text',
        label: 'Web address',
        required,
        validate: validateSafeUrl,
        admin: {
          width: '50%',
          placeholder: 'https://',
          condition: (_, sibling) => sibling?.type === 'url',
        },
      },
      {
        name: 'newTab',
        type: 'checkbox',
        label: 'Open in a new tab',
        admin: {
          width: '50%',
          style: { alignSelf: 'flex-end' },
          condition: (_, sibling) => sibling?.type === 'url',
        },
      },
    ],
  },
]

/** A single link or button. */
export const link = (options: LinkOptions = {}): GroupField => ({
  name: options.name ?? 'link',
  label: options.label ?? 'Button',
  type: 'group',
  admin: { hideGutter: true, description: options.description },
  fields: linkFields(options),
})

/** A list of links or buttons (e.g. a hero's two buttons, footer links). */
export const linkArray = (
  options: LinkOptions & { maxRows?: number; minRows?: number } = {},
): ArrayField => ({
  name: options.name ?? 'links',
  label: options.label ?? 'Buttons',
  type: 'array',
  maxRows: options.maxRows,
  minRows: options.minRows,
  labels: { singular: 'Link', plural: 'Links' },
  admin: {
    initCollapsed: true,
    description: options.description,
    components: { RowLabel: '@/fields/LinkRowLabel#LinkRowLabel' },
  },
  fields: linkFields(options),
})
