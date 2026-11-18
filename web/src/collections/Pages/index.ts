import type { CollectionConfig } from 'payload'

import { isLoggedIn, publishedOrLoggedIn } from '@/access'
import { pageBlocks } from '@/blocks'
import { slugField } from '@/fields/slug'
import { previewUrl } from '@/lib/preview'

import { computePath } from './computePath'
import { rememberLivePage, revalidatePage, revalidatePageDelete } from './revalidate'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Page', plural: 'Pages' },
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'path', '_status', 'updatedAt'],
    description: 'Every page on the website. A page is a list of sections you can add, reorder and hide.',
    livePreview: { url: ({ data }) => previewUrl(data) },
    preview: (doc) => previewUrl(doc),
  },
  versions: {
    drafts: { autosave: { interval: 600 }, schedulePublish: true },
    maxPerDoc: 30,
  },
  access: {
    read: publishedOrLoggedIn,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  hooks: {
    beforeChange: [rememberLivePage],
    afterChange: [revalidatePage],
    afterDelete: [revalidatePageDelete],
  },
  fields: [
    // The SEO plugin adds an "SEO" tab next to this one.
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Page sections',
          fields: [
            { name: 'title', type: 'text', required: true, label: 'Page name' },
            {
              name: 'layout',
              type: 'blocks',
              label: 'Sections',
              labels: { singular: 'Section', plural: 'Sections' },
              blocks: pageBlocks,
              admin: {
                initCollapsed: true,
                description:
                  'The sections of the page, top to bottom. Drag to reorder; use “Section settings” inside a section to hide it.',
              },
            },
          ],
        },
      ],
    },
    ...slugField('title'),
    {
      name: 'path',
      type: 'text',
      label: 'Web address',
      index: true,
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Worked out from the URL name and parent page.',
      },
      hooks: { beforeChange: [computePath] },
    },
    {
      name: 'forwardTo',
      type: 'relationship',
      relationTo: 'pages',
      label: 'Forward visitors to (optional)',
      admin: {
        position: 'sidebar',
        description: 'Visitors opening this page are sent on to the chosen page (e.g. Legal → Terms & Conditions). Its sections are not shown.',
      },
    },
  ],
}
