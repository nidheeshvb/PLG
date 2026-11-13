import type { Field } from 'payload'

type Options = {
  /** Show the "Shaded title" (gradient) option. */
  gradient?: boolean
  gradientDefault?: boolean
  titleRequired?: boolean
}

/**
 * Eyebrow + title used at the top of most sections.
 * Spread into a block's fields: `...sectionHeader()`.
 */
export const sectionHeader = ({
  gradient = true,
  gradientDefault = false,
  titleRequired = true,
}: Options = {}): Field[] => [
  {
    name: 'eyebrow',
    type: 'text',
    label: 'Small heading',
    admin: { description: 'The short orange line above the title.' },
  },
  {
    name: 'title',
    type: 'textarea',
    label: 'Title',
    required: titleRequired,
    admin: { rows: 2, description: 'Press Enter to start a new line.' },
  },
  ...(gradient
    ? ([
        {
          name: 'gradientTitle',
          type: 'checkbox',
          label: 'Shaded title (white to grey)',
          defaultValue: gradientDefault,
        },
      ] satisfies Field[])
    : []),
]
