'use client'

import { type CSSProperties, useEffect, useRef, useState, useSyncExternalStore } from 'react'

import { SERVICES, serviceLabel } from '@/collections/serviceOptions'
import { isMediaDoc, isVideo, Media } from '@/components/ui/Media'
import { StickyBar } from '@/components/ui/StickyBar/StickyBar'
import { prefersReducedMotion } from '@/hooks/useReducedMotion'
import type { ButtonAppearance } from '@/components/ui/Button/Button'
import type { CaseStudy } from '@/payload-types'

import { CaseStudyView } from './CaseStudyView'
import styles from './Component.module.css'

type Props = {
  cases: CaseStudy[]
  anchorId: string
  pageTitle: string
  showFilter: boolean
  filterLabel: string
  allLabel: string
  exploreLabel: string
  emptyText: string
  nextLabel: string
  cta: { href: string; label: string; appearance: ButtonAppearance; newTab?: boolean } | null
}

const two = (n: number) => String(n).padStart(2, '0')

// the open case study lives in the address: /our-work#case-<slug>
const subscribe = (cb: () => void) => {
  window.addEventListener('hashchange', cb)
  return () => window.removeEventListener('hashchange', cb)
}
const hashSlug = () => {
  const h = decodeURIComponent(window.location.hash.slice(1))
  return h.startsWith('case-') ? h.slice(5) : ''
}

/** Filter bar (sticky), case tiles in a full / pair rhythm, and the full case study view. */
export function CaseStudyGridClient(props: Props) {
  const { cases, anchorId, showFilter, filterLabel, allLabel, exploreLabel, emptyText } = props
  const [filter, setFilter] = useState('all')
  const gridRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const hideT = useRef<number | undefined>(undefined)
  const slug = useSyncExternalStore(subscribe, hashSlug, () => '')
  const open = cases.find((c) => c.slug === slug) ?? null

  const count = (k: string) => (k === 'all' ? cases.length : cases.filter((c) => c.services?.includes(k as never)).length)
  const services = SERVICES.filter((s) => count(s.value) > 0)
  const n = count(filter)

  useEffect(() => () => window.clearTimeout(hideT.current), [])

  // tiles with a clip play it on hover (mouse) or while on screen (touch)
  useEffect(() => {
    const grid = gridRef.current
    if (!grid || prefersReducedMotion()) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const cleanups: (() => void)[] = []
    grid.querySelectorAll<HTMLElement>('[data-case]').forEach((t) => {
      const v = t.querySelector('video')
      if (!v) return
      const play = () => v.play().then(() => t.setAttribute('data-playing', ''), () => {})
      const stop = () => {
        v.pause()
        t.removeAttribute('data-playing')
      }
      if (fine) {
        t.addEventListener('mouseenter', play)
        t.addEventListener('mouseleave', stop)
        cleanups.push(() => {
          t.removeEventListener('mouseenter', play)
          t.removeEventListener('mouseleave', stop)
        })
      } else {
        const io = new IntersectionObserver((es) => es.forEach((e) => (e.isIntersecting ? play() : stop())), { threshold: 0.6 })
        io.observe(t)
        cleanups.push(() => io.disconnect())
      }
    })
    return () => cleanups.forEach((f) => f())
  }, [])

  // fade the others out, then hide them and re-flow: in a filtered view an odd count opens with one wide tile
  const applyFilter = (k: string) => {
    setFilter(k)
    const tiles = [...(gridRef.current?.querySelectorAll<HTMLElement>('[data-case]') ?? [])]
    const match = (t: HTMLElement) => k === 'all' || (t.dataset.services ?? '').split(' ').includes(k)
    window.clearTimeout(hideT.current)
    tiles.forEach((t) => !match(t) && t.classList.add(styles.out))
    hideT.current = window.setTimeout(
      () => {
        tiles.forEach((t) => {
          const m = match(t)
          t.hidden = !m
          if (m) {
            t.classList.add(styles.out)
            void t.offsetWidth
            t.classList.remove(styles.out)
          }
        })
        const vis = tiles.filter((t) => !t.hidden)
        // data-layout is never rendered by React, so re-renders keep it
        vis.forEach((t, i) => {
          if (k === 'all') t.removeAttribute('data-layout')
          else t.dataset.layout = vis.length % 2 === 1 && i === 0 ? 'wide' : 'half'
        })
      },
      prefersReducedMotion() ? 0 : 300,
    )
    const top = sectionRef.current?.getBoundingClientRect().top ?? 0
    if (top < 0) window.scrollTo({ top: window.scrollY + top - 70, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }

  return (
    <>
      {showFilter && (
        <StickyBar label="Filter case studies by service">
          <span className={styles.k}>{filterLabel}</span>
          {[{ label: allLabel, value: 'all' }, ...services].map((s) => (
            <button key={s.value} type="button" aria-pressed={filter === s.value} onClick={() => applyFilter(s.value)}>
              <small>{count(s.value)}</small>
              {s.label}
            </button>
          ))}
        </StickyBar>
      )}
      <section ref={sectionRef} id={anchorId} className={styles.cases} aria-label="Case studies">
        <div ref={gridRef} className={styles.grid}>
          {cases.map((c, i) => {
            const clip = isVideo(c.video) && isMediaDoc(c.video) ? c.video : null
            const delay = i % 2 && !c.wide ? ({ '--d': '.1s' } as CSSProperties) : undefined
            return (
              <button
                key={c.id}
                type="button"
                id={`tile-${c.slug}`}
                className={styles.case}
                data-case=""
                data-services={(c.services ?? []).join(' ')}
                data-wide-default={c.wide ? 'true' : 'false'}
                data-cursor=""
                data-reveal=""
                style={delay}
                aria-label={`${c.title}: view case study`}
                onClick={() => {
                  window.location.hash = `case-${c.slug}`
                }}
              >
                <span className={styles.media}>
                  <Media resource={c.image} fill decorative priority={i < 2} sizes={c.wide ? '100vw' : '(max-width: 900px) 100vw, 50vw'} />
                  {clip?.url && (
                    <video muted loop playsInline preload="none" aria-hidden="true">
                      <source src={clip.url} type={clip.mimeType || 'video/mp4'} />
                    </video>
                  )}
                </span>
                <span className={styles.ov}>
                  <span className={styles.top}>
                    <span className={styles.n}>{two(i + 1)}</span>
                    <span className={styles.tags}>
                      {(c.services ?? []).map((s) => (
                        <span key={s} className={styles.tag}>
                          {serviceLabel(s)}
                        </span>
                      ))}
                    </span>
                  </span>
                  <span className={styles.bot}>
                    <span className={styles.client}>
                      {c.client}
                      {c.keyVisualPending && <span className={styles.tbc}>Key visual to come</span>}
                    </span>
                    <span className={styles.t}>{c.title}</span>
                    <span className={styles.more}>
                      <span>
                        <span className={styles.d}>{c.summary}</span>
                        <span className={styles.cta}>
                          {exploreLabel}{' '}
                          <i aria-hidden="true">
                            <span className="arr" />
                          </i>
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
              </button>
            )
          })}
        </div>
        {n === 0 && emptyText && <p className={styles.empty}>{emptyText}</p>}
      </section>
      <CaseStudyView {...props} open={open} />
    </>
  )
}
