type PreviewDoc = { path?: string | null; slug?: string | null } | null | undefined

const siteUrl = () => process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

/** The page's public path, falling back to its slug for pages not saved yet. */
export const docPath = (doc: PreviewDoc) => {
  if (doc?.path) return doc.path
  if (doc?.slug === 'home') return '/'
  return doc?.slug ? `/${doc.slug}` : '/'
}

/** URL the admin opens for preview: switches on draft mode, then shows the page. */
export const previewUrl = (doc: PreviewDoc) => {
  const params = new URLSearchParams({
    path: docPath(doc),
    secret: process.env.PREVIEW_SECRET || '',
  })
  return `${siteUrl()}/next/preview?${params.toString()}`
}
