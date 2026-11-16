import type { MetadataRoute } from 'next'

import { getSitemapPaths } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const paths = await getSitemapPaths().catch(() => [] as string[])
  return paths.map((p) => ({ url: `${base}${p === '/' ? '' : p}` }))
}
