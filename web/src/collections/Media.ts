import type { CollectionConfig } from 'payload'

import { anyone, isLoggedIn } from '@/access'
import { revalidateSiteAfterDelete, revalidateSiteAfterUpdate } from '@/lib/revalidate'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Image or video', plural: 'Images & videos' },
  admin: {
    group: 'Content',
    description: 'Every image, logo and video used on the website.',
    defaultColumns: ['filename', 'alt', 'mimeType', 'updatedAt'],
  },
  access: {
    read: anyone,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  // a changed alt text, focal point or replaced file must reach every page that shows it (REVAL-1);
  // a new upload isn't on any page yet, so it refreshes nothing
  hooks: { afterChange: [revalidateSiteAfterUpdate], afterDelete: [revalidateSiteAfterDelete] },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Description (alt text)',
      admin: {
        description:
          'Describe the image for people using screen readers. Leave empty for purely decorative images.',
      },
    },
  ],
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*', 'video/mp4', 'video/webm'],
    focalPoint: true,
    adminThumbnail: ({ doc }) =>
      typeof doc?.mimeType === 'string' && doc.mimeType.startsWith('image')
        ? (doc.url as string)
        : null,
  },
}
