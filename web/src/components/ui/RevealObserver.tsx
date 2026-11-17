'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

const SELECTOR = '[data-reveal],[data-panel],[data-inview]'

/**
 * Adds `.in` to every [data-reveal] / [data-panel] / [data-inview] element ([data-inview] has no styles of its own: blocks use it to start their own animations) as it scrolls into view.
 * Mounted once in the layout; also picks up elements added later (live preview, client renders).
 *
 * Two reveal styles, like the prototype:
 * - Home (page with the showreel banner, index.html): every [data-reveal] element starts hidden (base.css) and animates in.
 * - Inner pages (about.html, team.html …): only [data-reveal] elements that are below the fold when found get `.pre`
 *   (hidden, base.css) and animate in; anything already on screen stays visible. Threshold .12 like those pages.
 */
export function RevealObserver() {
  const pathname = usePathname()

  useEffect(() => {
    const home = !!document.querySelector("main [data-hero='showreel']")
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            e.target.classList.remove('pre')
            io.unobserve(e.target)
          }
        }),
      { threshold: home ? 0.15 : 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    const watch = (el: Element) => {
      if (el.classList.contains('in')) return
      if (!home && !reduce && el.hasAttribute('data-reveal') && el.getBoundingClientRect().top > innerHeight)
        el.classList.add('pre')
      io.observe(el)
    }
    const observe = (root: ParentNode) => root.querySelectorAll(SELECTOR).forEach(watch)
    observe(document)

    const mo = new MutationObserver((records) => {
      for (const r of records)
        r.addedNodes.forEach((n) => {
          if (!(n instanceof Element)) return
          if (n.matches(SELECTOR)) watch(n)
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
