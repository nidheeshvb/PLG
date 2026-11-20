import type { Page } from '@/payload-types'

/** One entry of a page's section menu, derived from the sections' "Section ID" + "Name in section menu". */
export type SectionNavItem = { id: string; label: string; href?: string; newTab?: boolean }

/**
 * Page-level facts passed to every block next to its own CMS data, so blocks never need editors
 * to type things the page already knows (breadcrumbs, the section menu).
 */
export type BlockContext = {
  page?: Pick<Page, 'title' | 'path' | 'breadcrumbs'>
  navItems?: SectionNavItem[]
  /** This section's place among the visible sections of the same kind on the page (1-based), e.g. 2 of 4. */
  position?: { index: number; count: number }
}

type Block = NonNullable<Page['layout']>[number]

/** Section-menu entries: visible sections that have both an ID and a menu name, in page order. */
export const sectionNavItems = (blocks?: Page['layout']): SectionNavItem[] =>
  (blocks ?? [])
    .filter((b: Block) => !b.hideSection && b.anchorId && b.navLabel)
    .map((b: Block) => ({ id: b.anchorId as string, label: b.navLabel as string }))
