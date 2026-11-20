import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

// When media is served from a CDN (MEDIA_PUBLIC_URL, production), next/image may load from it.
const mediaUrl = process.env.MEDIA_PUBLIC_URL ? new URL(process.env.MEDIA_PUBLIC_URL) : null

const isDev = process.env.NODE_ENV !== 'production'
// SITE_INDEXING=off (staging, test sites): see src/lib/siteEnv.ts
const indexingAllowed = process.env.SITE_INDEXING !== 'off'
const mediaOrigin = mediaUrl ? mediaUrl.origin : ''

// Content Security Policy, report-only for now (E2E-11-1): violations show in the browser
// console without blocking anything. Enforce it (rename the header) once staging shows no
// reports. Add the analytics / cookie banner hosts here when they are connected (backlog 3).
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: ${mediaOrigin}`.trim(),
  `media-src 'self' blob: ${mediaOrigin}`.trim(),
  "font-src 'self' data:",
  `connect-src 'self'${isDev ? ' ws: wss:' : ''}`,
  "frame-src 'self'",
  "frame-ancestors 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ')

const securityHeaders = [
  // browsers only honour it over HTTPS; no includeSubDomains, so PLG's other subdomains are unaffected
  { key: 'Strict-Transport-Security', value: 'max-age=31536000' },
  // SAMEORIGIN, not DENY: the CMS live preview shows the site in a frame on the same address
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
  { key: 'Content-Security-Policy-Report-Only', value: contentSecurityPolicy },
  ...(indexingAllowed ? [] : [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }]),
]

const nextConfig: NextConfig = {
  // don't advertise the stack (withPayload also skips its own X-Powered-By when this is false)
  poweredByHeader: false,
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
  images: {
    // several sizes per image in modern formats; each device downloads only what it needs
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
    ],
    remotePatterns: mediaUrl
      ? [
          {
            protocol: mediaUrl.protocol.replace(':', '') as 'http' | 'https',
            hostname: mediaUrl.hostname,
            pathname: `${mediaUrl.pathname.replace(/\/$/, '')}/**`,
          },
        ]
      : [],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
