import type { BlockContext, SectionNavItem } from '@/blocks/context'
import { resolveHref } from '@/lib/links'
import { getSiteSettings } from '@/lib/payload'
import type { SectionNavBlock as SectionNavBlockData } from '@/payload-types'

import styles from './Component.module.css'
import { SectionNavClient } from './SectionNavClient'
import { StickyNavClient } from './StickyNavClient'

/** Links for "menu" mode: the main-menu group that contains this page, plus a back link to the group's page. */
async function menuLinks(path?: string | null) {
  if (!path) return null
  const { headerLinks } = await getSiteSettings()
  const group = headerLinks?.find((l) => l.subLinks?.some((s) => resolveHref(s) === path))
  if (!group?.subLinks) return null
  const items: SectionNavItem[] = group.subLinks
    .map((s) => ({ id: s.id ?? s.label ?? '', label: s.label ?? '', href: resolveHref(s) ?? '', newTab: Boolean(s.newTab) }))
    .filter((s) => s.label && s.href)
  const parentHref = resolveHref(group)
  const parentTitle = typeof group.page === 'object' && group.page ? group.page.title : group.label
  const back = parentHref ? { label: `Back to ${parentTitle}`, href: parentHref } : null
  return { items, back }
}

/** Bar of links under the banner: this page's sections (scroll-spy) or its group in the main menu. */
export async function SectionNavBlock({ source, barStyle, note, navItems, page, anchorId }: SectionNavBlockData & BlockContext) {
  if (source !== 'menu' && barStyle === 'sticky') {
    if (!navItems?.length) return null
    return <StickyNavClient items={navItems} label={page?.title ? `${page.title} sections` : 'Section menu'} />
  }
  if (source === 'menu') {
    const menu = await menuLinks(page?.path)
    if (!menu?.items.length) return null
    return (
      <nav id={anchorId || undefined} className={styles.subnav} aria-label="Section menu">
        <SectionNavClient items={menu.items} current={page?.path} back={menu.back} />
      </nav>
    )
  }
  if (!navItems?.length) return null
  return (
    <nav id={anchorId || undefined} className={styles.subnav} aria-label="Section menu">
      <SectionNavClient items={navItems} note={note} spy />
    </nav>
  )
}
