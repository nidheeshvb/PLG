import type { MetadataRoute } from 'next'

import { getSitemapPaths } from '@/lib/payload'
import { indexingAllowed, siteUrl } from '@/lib/siteEnv'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // SITE_INDEXING=off (staging, test sites): list nothing
  if (!indexingAllowed) return []
  const paths = await getSitemapPaths().catch(() => [] as string[])
  return paths.map((p) => ({ url: `${siteUrl}${p === '/' ? '' : p}` }))
}
