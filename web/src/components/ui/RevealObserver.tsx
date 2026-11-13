'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

const SELECTOR = '[data-reveal],[data-panel]'

/**
 * Adds `.in` to every [data-reveal] / [data-panel] element as it scrolls into view.
 * Mounted once in the layout; also picks up elements added later (live preview, client renders).
 */
export function RevealObserver() {
  const pathname = usePathname()

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )
    const observe = (root: ParentNode) =>
      root.querySelectorAll(`${SELECTOR}`).forEach((el) => {
        if (!el.classList.contains('in')) io.observe(el)
      })
    observe(document)

    const mo = new MutationObserver((records) => {
      for (const r of records)
        r.addedNodes.forEach((n) => {
          if (!(n instanceof Element)) return
          if (n.matches(SELECTOR) && !n.classList.contains('in')) io.observe(n)
          observe(n)
        })
    })
    mo.observe(document.body, { childList: true, subtree: true })
    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [pathname])

  return null
}
