import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { seoPlugin } from '@payloadcms/plugin-seo'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { CaseStudies } from './collections/CaseStudies'
import { FormSubmissions } from './collections/FormSubmissions'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Partners } from './collections/Partners'
import { Roles } from './collections/Roles'
import { TeamMembers } from './collections/TeamMembers'
import { Users } from './collections/Users'
import { SiteSettings } from './globals/SiteSettings'
import { emailAdapter } from './integrations/email'
import { storagePlugin } from './integrations/storage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: ' | PLG Acachet CMS' },
    livePreview: {
      collections: ['pages'],
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 390, height: 844 },
        { label: 'Tablet', name: 'tablet', width: 834, height: 1112 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  collections: [Pages, CaseStudies, Partners, TeamMembers, Roles, Media, FormSubmissions, Users],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || '' },
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  sharp,
  email: emailAdapter(),
  plugins: [
    // Production integrations are switched on by environment variables (see .env.example).
    storagePlugin(),
    nestedDocsPlugin({
      collections: ['pages'],
      generateLabel: (_, doc) => String(doc.title ?? ''),
      generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
    }),
    seoPlugin({
      collections: ['pages'],
      uploadsCollection: 'media',
      tabbedUI: true,
      generateTitle: ({ doc }) => `${(doc as { title?: string })?.title ?? ''} | PLG Acachet`,
      generateURL: ({ doc }) => `${siteUrl}${(doc as { path?: string })?.path ?? ''}`,
    }),
  ],
})
