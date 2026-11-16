'use client'

import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

import { CMSLink } from '@/components/ui/CMSLink'
import { requestScrollUpdate, useRafScroll } from '@/hooks/useRafScroll'
import { resolveHref, type LinkData } from '@/lib/links'

import { Logo } from '../Logo/Logo'
import styles from './Header.module.css'

type MenuLink = LinkData & { id?: string | null; subLinks?: (LinkData & { id?: string | null })[] | null }

type Props = {
  links: MenuLink[]
  mobileNote?: string | null
}

/** A menu link is current when the page being viewed is its page or one of its sub-pages. */
const isCurrent = (link: LinkData, pathname: string) => {
  const href = resolveHref(link)?.split('#')[0]
  if (!href || href.startsWith('http')) return false
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

/** Mobile menu rows: each link, then its sub-links block; every row takes the next reveal slot. */
const mobileItems = (links: MenuLink[]) => {
  const rows: { link: MenuLink; sub?: NonNullable<MenuLink['subLinks']>; slot: number; key: string }[] = []
  links.forEach((l, i) => {
    rows.push({ link: l, slot: rows.length, key: l.id ?? `l${i}` })
    if (l.subLinks?.length) rows.push({ link: l, sub: l.subLinks, slot: rows.length, key: `${l.id ?? i}-sub` })
  })
  return rows
}

/** Transition delay of mobile menu row `slot` (prototype: .25s, then +.07s per row). */
const slotDelay = (slot: number) => ({ ['--md' as string]: `${(0.25 + slot * 0.07).toFixed(2)}s` })

/**
 * Fixed header: hides while scrolling down, tightens once scrolled, and switches the logo to
 * dark while it sits over a section marked data-nav-tone="light". Includes the mobile menu.
 */
export function Header({ links, mobileNote }: Props) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const lastY = useRef(0)

  const setMenu = useCallback((v: boolean) => setOpen(v), [])

  // close when the page changes
  const [prevPath, setPrevPath] = useState(pathname)
  if (pathname !== prevPath) {
    setPrevPath(pathname)
    setOpen(false)
  }

  // lock page scroll while the menu is open
  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    // React just rewrote the header's className: re-apply the scroll state classes
    requestScrollUpdate()
  }, [open])

  // close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setMenu])

  useRafScroll(
    () => {
      const r = logoRef.current?.getBoundingClientRect()
      const cy = r ? r.top + r.height / 2 : 0
      const light = [...document.querySelectorAll('[data-nav-tone="light"]')].some((s) => {
        const b = s.getBoundingClientRect()
        return b.top <= cy && b.bottom >= cy
      })
      return { y: window.scrollY, light }
    },
    ({ y, light }) => {
      const nav = navRef.current
      if (!nav) return
      nav.classList.toggle(styles.scrolled, y > 40)
      if (!document.body.classList.contains('menu-open')) {
        if (y <= 120 || y < lastY.current - 2) nav.classList.remove(styles.hidden)
        else if (y > lastY.current + 2) nav.classList.add(styles.hidden)
      }
      lastY.current = y
      // lets other bars (the sticky services menu) give way while the header is showing
      document.body.classList.toggle('nav-hidden', nav.classList.contains(styles.hidden))
      nav.classList.toggle(styles.onLight, light)
    },
  )

  return (
    <>
      <header ref={navRef} className={[styles.nav, open && styles.open].filter(Boolean).join(' ')}>
        <div ref={logoRef}>
          <Logo wordClassName={styles.word} onClick={() => setMenu(false)} />
        </div>
        <nav className={styles.menu} aria-label="Primary">
          {links.map((l, i) => {
            const current = isCurrent(l, pathname)
            return (
              <CMSLink
                key={l.id ?? i}
                link={l}
                as="text"
                className={current ? styles.active : undefined}
                ariaCurrent={current && resolveHref(l) === pathname ? 'page' : undefined}
              />
            )
          })}
        </nav>
        <button
          type="button"
          className={styles.burger}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mnav"
          onClick={() => setMenu(!open)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <div
        id="mnav"
        className={[styles.mnav, open && styles.mnavOpen].filter(Boolean).join(' ')}
        aria-hidden={!open}
        inert={!open}
      >
        <nav className={styles.mnavLinks} aria-label="Mobile">
          {mobileItems(links).map(({ link: l, sub, slot, key }) =>
            sub ? (
              <div key={key} className={styles.mnavSub} style={slotDelay(slot)}>
                {sub.map((s, k) => (
                  <CMSLink key={s.id ?? k} link={s} as="text" onClick={() => setMenu(false)} />
                ))}
              </div>
            ) : (
              <CMSLink
                key={key}
                link={l}
                as="text"
                className={isCurrent(l, pathname) ? styles.active : undefined}
                style={slotDelay(slot)}
                onClick={() => setMenu(false)}
              />
            ),
          )}
        </nav>
        {mobileNote && <p className={styles.mnavFoot}>{mobileNote}</p>}
      </div>
    </>
  )
}
