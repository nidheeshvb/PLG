import type { MetadataRoute } from 'next'

import { getAllPagePaths } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const paths = await getAllPagePaths().catch(() => [] as string[])
  return paths.map((p) => ({ url: `${base}${p === '/' ? '' : p}` }))
}
