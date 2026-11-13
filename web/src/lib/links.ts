import type { Page } from '@/payload-types'

/** The shape every link field produces (see src/fields/link.ts). */
export type LinkData = {
  label?: string | null
  appearance?: 'primary' | 'ghost' | 'dark' | null
  type?: 'page' | 'section' | 'url' | null
  page?: number | Page | null
  section?: string | null
  url?: string | null
  newTab?: boolean | null
}

const pagePath = (page: LinkData['page']) =>
  page && typeof page === 'object' ? page.path || (page.slug ? `/${page.slug}` : null) : null

/** Turns a CMS link into an href. Returns null when it points nowhere (e.g. a deleted page). */
export const resolveHref = (link?: LinkData | null): string | null => {
  if (!link) return null
  const hash = link.section ? `#${link.section.replace(/^#/, '')}` : ''
  switch (link.type) {
    case 'url':
      return link.url || null
    case 'section':
      return hash || null
    case 'page':
    default: {
      const path = pagePath(link.page)
      return path ? `${path}${hash}` : null
    }
  }
}

export const isExternal = (href: string) => /^(https?:)?\/\//.test(href) || /^(mailto|tel):/.test(href)
