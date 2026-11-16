import type { GlobalConfig } from 'payload'

import { anyone, isLoggedIn } from '@/access'
import { ctaFields } from '@/fields/ctaFields'
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
            (() => {
              const menu = linkArray({
                name: 'headerLinks',
                label: 'Menu links',
                appearance: false,
                maxRows: 6,
                description:
                  'The links in the top menu (and the mobile menu). The link for the page being viewed is highlighted automatically.',
              })
              return {
                ...menu,
                fields: [
                  ...menu.fields,
                  linkArray({
                    name: 'subLinks',
                    label: 'Sub-links in the mobile menu (optional)',
                    appearance: false,
                    maxRows: 6,
                    description: 'Shown indented under this link in the mobile menu, e.g. About → Overview, Our Story.',
                  }),
                ],
              }
            })(),
            {
              name: 'mobileMenuNote',
              type: 'text',
              label: 'Small text at the bottom of the mobile menu',
              defaultValue: '© 2026 PLG Acachet',
            },
          ],
        },
        {
          label: 'Call to action',
          description:
            'The white “Start a conversation” banner near the bottom of pages. Pages with a “Call to action banner” section show this unless they use their own text.',
          fields: [{ name: 'cta', type: 'group', label: false, fields: ctaFields({ required: false }) }],
        },
        {
          label: 'Company details',
          description: 'Used by the legal documents (their contact card and “Questions?” box).',
          fields: [
            {
              name: 'company',
              type: 'group',
              label: false,
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'name', type: 'text', label: 'Company name', defaultValue: 'PLG Acachet', admin: { width: '50%' } },
                    { name: 'email', type: 'email', label: 'Email', admin: { width: '50%' } },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'address', type: 'textarea', label: 'Address', admin: { width: '50%', rows: 2 } },
                    { name: 'phone', type: 'text', label: 'Phone', admin: { width: '50%' } },
                  ],
                },
              ],
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
