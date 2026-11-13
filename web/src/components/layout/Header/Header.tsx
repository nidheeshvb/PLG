'use client'

import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

import { CMSLink } from '@/components/ui/CMSLink'
import { requestScrollUpdate, useRafScroll } from '@/hooks/useRafScroll'
import type { LinkData } from '@/lib/links'

import { Logo } from '../Logo/Logo'
import styles from './Header.module.css'

type Props = {
  links: (LinkData & { id?: string | null })[]
  mobileNote?: string | null
}

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
          {links.map((l, i) => (
            <CMSLink key={l.id ?? i} link={l} as="text" />
          ))}
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
          {links.map((l, i) => (
            <CMSLink key={l.id ?? i} link={l} as="text" onClick={() => setMenu(false)} />
          ))}
        </nav>
        {mobileNote && <p className={styles.mnavFoot}>{mobileNote}</p>}
      </div>
    </>
  )
}
