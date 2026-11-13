import type { GlobalConfig } from 'payload'

import { anyone, isLoggedIn } from '@/access'
import { linkArray } from '@/fields/link'
import { revalidateEverything } from '@/lib/revalidate'

/** Header, footer and other site-wide content. */
export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Header & footer',
  admin: { group: 'Settings', description: 'Menus and links shown on every page.' },
  access: { read: anyone, update: isLoggedIn },
  hooks: {
    afterChange: [
      ({ doc, req }) => {
        if (!req.context?.disableRevalidate) revalidateEverything(req.payload.logger)
        return doc
      },
    ],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Header',
          fields: [
            linkArray({
              name: 'headerLinks',
              label: 'Menu links',
              appearance: false,
              maxRows: 6,
              description: 'The links in the top menu (and the mobile menu).',
            }),
            {
              name: 'mobileMenuNote',
              type: 'text',
              label: 'Small text at the bottom of the mobile menu',
              defaultValue: '© 2026 PLG Acachet',
            },
          ],
        },
        {
          label: 'Footer',
          fields: [
            linkArray({ name: 'footerLinks', label: 'Footer links', appearance: false, maxRows: 8 }),
            linkArray({
              name: 'legalLinks',
              label: 'Legal links',
              appearance: false,
              maxRows: 5,
              description: 'Small links such as Privacy, Terms and Cookies.',
            }),
            {
              name: 'social',
              type: 'array',
              label: 'Social media',
              maxRows: 6,
              labels: { singular: 'Social link', plural: 'Social links' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'platform',
                      type: 'select',
                      required: true,
                      options: [
                        { label: 'Instagram', value: 'instagram' },
                        { label: 'LinkedIn', value: 'linkedin' },
                        { label: 'X (Twitter)', value: 'x' },
                        { label: 'YouTube', value: 'youtube' },
                        { label: 'Facebook', value: 'facebook' },
                        { label: 'TikTok', value: 'tiktok' },
                      ],
                      admin: { width: '40%' },
                    },
                    {
                      name: 'url',
                      type: 'text',
                      label: 'Web address',
                      required: true,
                      admin: { width: '60%', placeholder: 'https://' },
                    },
                  ],
                },
              ],
            },
            {
              name: 'copyright',
              type: 'text',
              label: 'Copyright line',
              defaultValue: '© 2026 PLG Acachet. All rights reserved.',
            },
          ],
        },
      ],
    },
  ],
}
