import type { Field } from 'payload'

type Options = {
  /** Offer a light/dark background choice (only for sections designed in both). */
  theme?: boolean
  defaultTheme?: 'dark' | 'light'
}

/**
 * Settings shared by every section, kept in a collapsed panel so editors see content first.
 * Spread into a block's fields: `...sectionSettings()`.
 */
export const sectionSettings = ({ theme = false, defaultTheme = 'dark' }: Options = {}): Field[] => [
  {
    type: 'collapsible',
    label: 'Section settings',
    admin: { initCollapsed: true },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'anchorId',
            type: 'text',
            label: 'Section ID',
            admin: {
              width: '50%',
              description:
                'Optional. Lets buttons jump to this section (e.g. "contact"). Lowercase letters, numbers and dashes.',
            },
            validate: (value: unknown) =>
              !value || /^[a-z0-9-]+$/.test(String(value)) || 'Use lowercase letters, numbers and dashes only.',
          },
          {
            name: 'navLabel',
            type: 'text',
            label: 'Name in section menu',
            admin: {
              width: '50%',
              description: 'Optional. Shown in the page’s section menu, where the page has one.',
            },
          },
        ],
      },
      ...(theme
        ? ([
            {
              name: 'theme',
              type: 'radio',
              label: 'Background',
              defaultValue: defaultTheme,
              options: [
                { label: 'Dark', value: 'dark' },
                { label: 'White', value: 'light' },
              ],
              admin: { layout: 'horizontal' },
            },
          ] satisfies Field[])
        : []),
      {
        name: 'hideSection',
        type: 'checkbox',
        label: 'Hide this section on the website',
        defaultValue: false,
      },
    ],
  },
]
