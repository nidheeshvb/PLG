'use client'

import { useEffect, useRef, useState } from 'react'

import { serviceLabel } from '@/collections/serviceOptions'
import { Button, type ButtonAppearance } from '@/components/ui/Button/Button'
import { Marked, paragraphsOf } from '@/components/ui/Marked'
import { isMediaDoc, isVideo, Media } from '@/components/ui/Media'
import { prefersReducedMotion } from '@/hooks/useReducedMotion'
import type { CaseStudy } from '@/payload-types'

import styles from './CaseStudyView.module.css'

type Props = {
  cases: CaseStudy[]
  open: CaseStudy | null
  pageTitle: string
  anchorId: string
  nextLabel: string
  cta: { href: string; label: string; appearance: ButtonAppearance } | null
}

const videoOf = (r: CaseStudy['video']) => (isVideo(r) && isMediaDoc(r) && r.url ? r : null)
const shortTitle = (c: CaseStudy) => c.cardTitle || c.title

/** Closing: back to the grid without a jump, and let the view know (replaceState fires no hashchange). */
const closeView = (anchorId: string) => {
  window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${anchorId}`)
  window.dispatchEvent(new HashChangeEvent('hashchange'))
}

/**
 * The full case study over the page (prototype .cs): banner, client / services / market / year,
 * 01 The Brief, 02 The Approach, gallery, 03 The Impact, photo + film, next case study and a button.
 * Opens from /our-work#case-<slug>; Esc or × closes; focus stays inside while open.
 */
export function CaseStudyView({ cases, open, pageTitle, anchorId, nextLabel, cta }: Props) {
  const rootRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  // keep the last case on screen while the view fades out
  const [shown, setShown] = useState<CaseStudy | null>(open)
  const [entered, setEntered] = useState(false)
  if (open && open !== shown) setShown(open)

  // fade in on open; on close, hide after the fade
  useEffect(() => {
    if (open) {
      const r = requestAnimationFrame(() => requestAnimationFrame(() => setEntered(true)))
      return () => cancelAnimationFrame(r)
    }
    const t = window.setTimeout(
      () => {
        setShown(null)
        setEntered(false)
      },
      prefersReducedMotion() ? 0 : 500,
    )
    return () => window.clearTimeout(t)
  }, [open])

  // page state while open: scroll lock, title + description, hero video paused, focus
  const openSlug = open?.slug ?? null
  useEffect(() => {
    if (!openSlug || !open) return
    const root = rootRef.current
    if (root) root.scrollTop = 0
    document.body.classList.add('cs-open')
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    const title = document.title,
      desc = meta?.content
    const wanted = `${shortTitle(open)} Case Study | PLG Acachet`
    document.title = wanted
    if (meta && open.metaDescription) meta.content = open.metaDescription
    // Next.js may re-apply the page title after hydration (e.g. on a direct link): keep ours while open
    const titleWatch = new MutationObserver(() => {
      if (document.title !== wanted) document.title = wanted
    })
    titleWatch.observe(document.head, { subtree: true, childList: true, characterData: true })
    const hero = document.querySelector<HTMLVideoElement>('video[data-hero-video]')
    const wasPlaying = hero && !hero.paused
    hero?.pause()
    const last = document.activeElement as HTMLElement | null
    closeRef.current?.focus({ preventScroll: true })
    return () => {
      titleWatch.disconnect()
      document.body.classList.remove('cs-open')
      document.title = title
      if (meta && desc != null) meta.content = desc
      if (wasPlaying) hero?.play().catch(() => {})
      root?.querySelectorAll('video').forEach((v) => v.pause())
      const tile = document.getElementById(`tile-${openSlug}`)
      ;(last && document.contains(last) && last !== document.body ? last : tile)?.focus({ preventScroll: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- runs per opened case study
  }, [openSlug])

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeView(anchorId)
    if (e.key !== 'Tab') return
    const f = [...(rootRef.current?.querySelectorAll<HTMLElement>('button, a') ?? [])].filter((x) => x.offsetParent)
    const i = f.indexOf(document.activeElement as HTMLElement)
    if (e.shiftKey && i <= 0) {
      f[f.length - 1]?.focus()
      e.preventDefault()
    } else if (!e.shiftKey && i === f.length - 1) {
      f[0]?.focus()
      e.preventDefault()
    }
  }

  const c = shown
  if (!c) return null
  const next = cases[(cases.indexOf(cases.find((x) => x.id === c.id) ?? c) + 1) % cases.length]
  const clip = videoOf(c.video)
  const film = videoOf(c.film) ?? clip
  const reduce = typeof window !== 'undefined' && prefersReducedMotion()
  const results = c.results ?? []
  const services = (c.services ?? []).map(serviceLabel)

  return (
    <div
      ref={rootRef}
      className={[styles.cs, entered && open && styles.open].filter(Boolean).join(' ')}
      role="dialog"
      aria-modal="true"
      aria-labelledby="csTitle"
      onKeyDown={onKey}
    >
      <div className={styles.bar}>
        <p className={styles.crumb}>
          {pageTitle} / <b>{shortTitle(c)}</b>
        </p>
        <button ref={closeRef} type="button" className={styles.x} aria-label="Close case study" onClick={() => closeView(anchorId)}>
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <path stroke="currentColor" strokeWidth="1.6" d="M1 1l12 12M13 1L1 13" />
          </svg>
        </button>
      </div>

      <div className={styles.hero}>
        {clip && !reduce ? (
          <video key={c.id} autoPlay muted loop playsInline poster={isMediaDoc(c.image) ? (c.image.url ?? undefined) : undefined} aria-hidden="true">
            <source src={clip.url ?? ''} type={clip.mimeType || 'video/mp4'} />
          </video>
        ) : (
          <Media resource={c.image} fill decorative sizes="100vw" />
        )}
        <div className={styles.head}>
          <div className={styles.tags}>
            {services.map((s) => (
              <span key={s} className={styles.tag}>
                {s}
              </span>
            ))}
          </div>
          <h2 id="csTitle" className={styles.t}>
            {c.title}
          </h2>
          <p className={styles.line}>
            <Marked text={c.summary} />
          </p>
        </div>
      </div>

      <div className={styles.wrap}>
        <dl className={styles.meta}>
          {[
            ['Client', c.client],
            ['Services', services.join(', ')],
            ['Market', c.market],
            ['Year', c.year],
          ].map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>
                <Marked text={v} />
              </dd>
            </div>
          ))}
        </dl>

        <section className={styles.block}>
          <div className={styles.k}>
            <span>01</span>
            <h3>The Brief</h3>
          </div>
          <div className={styles.body}>
            <div className={styles.paras}>
              {paragraphsOf(c.brief).map((p, i) => (
                <p key={i}>
                  <Marked text={p} />
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.block}>
          <div className={styles.k}>
            <span>02</span>
            <h3>The Approach</h3>
          </div>
          <div className={styles.body}>
            <div className={styles.paras}>
              {paragraphsOf(c.approach).map((p, i) => (
                <p key={i}>
                  <Marked text={p} />
                </p>
              ))}
            </div>
            <div className={styles.discs}>
              <span className={styles.discsK}>Disciplines</span>
              <div className={styles.tags}>
                {services.map((s) => (
                  <span key={s} className={styles.tag}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className={styles.visual}>
          {[c.image, ...(c.gallery ?? []).map((g) => g.image)].map((img, i) => (
            <figure key={i}>
              <Media resource={img} fill decorative sizes={i === 2 ? '100vw' : '(max-width: 900px) 100vw, 50vw'} />
            </figure>
          ))}
        </div>

        <section className={styles.block}>
          <div className={styles.k}>
            <span>03</span>
            <h3>The Impact</h3>
          </div>
          <div className={styles.body}>
            {results.length > 0 && (
              <div className={styles.res} data-n={results.length}>
                {results.map((r, i) => (
                  <div key={r.id ?? i}>
                    <b>{r.value}</b>
                    <span>
                      <Marked text={r.label} />
                    </span>
                  </div>
                ))}
              </div>
            )}
            {/* always present, like the prototype (its gap is part of the layout) */}
            <div>
              {!!c.points?.length && (
                <ul className={styles.pts}>
                  {c.points.map((p, i) => (
                    <li key={p.id ?? i}>
                      <Marked text={p.text} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>

        {(c.still || film) && (
          <div className={styles.media} aria-label="Case study media">
            {c.still && (
              <figure className={styles.mImg}>
                <Media resource={c.still} fill decorative sizes="(max-width: 900px) 100vw, 45vw" />
                {c.stillCaption && <figcaption>{c.stillCaption}</figcaption>}
              </figure>
            )}
            {film && (
              <figure className={styles.mVid}>
                <video
                  key={c.id}
                  controls
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={isMediaDoc(c.image) ? (c.image.url ?? undefined) : undefined}
                >
                  <source src={film.url ?? ''} type={film.mimeType || 'video/mp4'} />
                </video>
                {c.filmCaption && <figcaption>{c.filmCaption}</figcaption>}
              </figure>
            )}
          </div>
        )}

        <div className={styles.next}>
          {next && next.id !== c.id && (
            <button
              type="button"
              onClick={() => {
                window.location.hash = `case-${next.slug}`
              }}
            >
              <small>{nextLabel}</small>
              <strong>
                <span>{shortTitle(next)}</span>
                <i aria-hidden="true">
                  <span className="arr" />
                </i>
              </strong>
            </button>
          )}
          {cta && (
            <Button href={cta.href} appearance={cta.appearance}>
              {cta.label}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
