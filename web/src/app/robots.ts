import type { MetadataRoute } from 'next'

import { indexingAllowed, siteUrl } from '@/lib/siteEnv'

export default function robots(): MetadataRoute.Robots {
  // SITE_INDEXING=off (staging, test sites): keep the whole site out of search engines
  if (!indexingAllowed) return { rules: { userAgent: '*', disallow: '/' } }
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/api', '/next'] },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
