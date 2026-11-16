import type { Block } from 'payload'

import { mediaField } from '@/fields/media'
import { sectionHeader } from '@/fields/sectionHeader'
import { sectionSettings } from '@/fields/sectionSettings'

/**
 * Office details (Contact page): a tall location photo with the city and its live local time, and
 * beside it a heading, intro and large rows for email, phone (both with "Copy"), address (with
 * "Directions") and opening hours. Empty rows are left out.
 */
export const OfficesBlock: Block = {
  slug: 'offices',
  interfaceName: 'OfficesBlock',
  labels: { singular: 'Office', plural: 'Offices' },
  imageAltText: 'Office photo with local time, and email, phone, address and hours beside it',
  fields: [
    ...sectionHeader({ gradientDefault: true }),
    { name: 'lede', type: 'textarea', label: 'Intro', admin: { rows: 2 } },
    {
      type: 'collapsible',
      label: 'Photo',
      fields: [
        mediaField({ name: 'image', label: 'Location photo', required: true, description: 'Tall photo; set the focal point to choose the crop.' }),
        {
          type: 'row',
          fields: [
            { name: 'tag', type: 'text', label: 'Small label', defaultValue: 'Head office', admin: { width: '33%' } },
            { name: 'city', type: 'text', label: 'City', required: true, admin: { width: '33%', placeholder: 'Dubai, UAE' } },
            {
              name: 'timeZone',
              type: 'select',
              label: 'Local time shown',
              defaultValue: 'Asia/Dubai',
              options: [
                { label: 'None', value: 'none' },
                { label: 'UAE (GST)', value: 'Asia/Dubai' },
                { label: 'Saudi Arabia (AST)', value: 'Asia/Riyadh' },
                { label: 'United Kingdom (UK time)', value: 'Europe/London' },
              ],
              admin: { width: '34%', description: 'A live clock with a green dot on the photo.' },
            },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Contact details',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'email', type: 'email', label: 'Email', admin: { width: '50%' } },
            { name: 'phone', type: 'text', label: 'Phone', admin: { width: '50%', placeholder: '+971 4 876 48133' } },
          ],
        },
        { name: 'address', type: 'textarea', label: 'Address', admin: { rows: 2, description: 'Press Enter for a new line.' } },
        {
          name: 'directionsQuery',
          type: 'text',
          label: 'Directions: search for (optional)',
          admin: { description: 'What the “Directions” button searches for on Google Maps. Leave empty to use the address.' },
        },
        { name: 'hours', type: 'textarea', label: 'Opening hours', admin: { rows: 2, placeholder: 'Sunday – Thursday\n09:00 – 18:00 GST' } },
      ],
    },
    ...sectionSettings(),
  ],
}
