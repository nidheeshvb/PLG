// Site-wide settings read from the environment. Import-free so next.config.ts,
// payload.config.ts and app code can all use it.

const LOCAL_URL = 'http://localhost:3000'

/** Public address of the website. NEXT_PUBLIC_* values are fixed into the build. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || LOCAL_URL).replace(/\/$/, '')

/**
 * SITE_INDEXING=off keeps a staging or test site out of search engines: robots.txt
 * disallows everything, pages carry a noindex meta tag and every response an
 * X-Robots-Tag header. Read when the site is built, so set it before `npm run build`.
 */
export const indexingAllowed = process.env.SITE_INDEXING !== 'off'

const isLocalHost = (url: string) => {
  try {
    const { hostname } = new URL(url)
    return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]'
  } catch {
    return false
  }
}

/**
 * Stops a production server, build or script early with a clear message when a
 * required setting is missing, instead of failing later (or silently using localhost
 * in canonical links, sitemap, robots.txt and share images). E2E-13-2.
 */
export function checkProductionEnv() {
  if (process.env.NODE_ENV !== 'production') return
  const missing = ['DATABASE_URL', 'PAYLOAD_SECRET', 'NEXT_PUBLIC_SITE_URL'].filter((name) => !process.env[name])
  if (missing.length) {
    throw new Error(`Missing required setting(s): ${missing.join(', ')}. See web/.env.example.`)
  }
  // A deployed site (any hosting integration switched on) must not point at localhost.
  // Local production builds (npm run build + start on this machine) are still allowed.
  const deployed = Boolean(process.env.S3_BUCKET || process.env.CLOUDFRONT_DISTRIBUTION_ID || process.env.SMTP_HOST)
  if (isLocalHost(siteUrl)) {
    const message = `NEXT_PUBLIC_SITE_URL is ${siteUrl}: canonical links, sitemap, robots.txt and share images will point at this machine.`
    if (deployed) throw new Error(`${message} Set it to the public address of the site.`)
    console.warn(`[settings] ${message}`)
  }
}
