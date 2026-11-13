'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { preload } from 'react-dom'

import { CMSLink } from '@/components/ui/CMSLink'
import { isMediaDoc, isVideo, Media } from '@/components/ui/Media'
import { useRafScroll } from '@/hooks/useRafScroll'
import { prefersReducedMotion, useReducedMotion } from '@/hooks/useReducedMotion'
import type { HeroBlock } from '@/payload-types'

import styles from './ShowreelHero.module.css'

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))

/**
 * Full-screen showreel: the headline appears word by word once the video settles, then after a
 * while the headline and intro dissolve and the buttons glide to the centre.
 */
export function ShowreelHero({ title, lede, links, video, poster, showScrollCue, anchorId }: HeroBlock) {
  const heroRef = useRef<HTMLElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const ctasRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const autoPaused = useRef(false)
  const reduceMotion = useReducedMotion()
  // the visitor's own choice wins; otherwise reduced motion means no autoplay
  const [userPaused, setPaused] = useState<boolean | null>(null)
  const paused = userPaused ?? reduceMotion

  const posterUrl = isMediaDoc(poster) ? poster.url : null
  const videoUrl = isVideo(video) && isMediaDoc(video) ? video.url : null
  if (posterUrl) preload(posterUrl, { as: 'image', fetchPriority: 'high' })

  // intro timing: reveal after the media settles, then calm down
  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return
    const reduce = prefersReducedMotion()
    const readyAt = reduce ? 0 : 1800
    const t1 = window.setTimeout(() => hero.classList.add(styles.ready), readyAt)
    const t2 = window.setTimeout(() => {
      const t = titleRef.current,
        c = ctasRef.current
      if (t && c) {
        const above = c.getBoundingClientRect().top - t.getBoundingClientRect().top
        hero.style.setProperty('--lift', `${(-above / 2).toFixed(1)}px`)
      }
      hero.classList.add(styles.calm)
    }, readyAt + 900 + 6500)
    if (reduce) videoRef.current?.pause()
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [])

  // parallax + pause the reel while it is off screen (a visitor's own pause is kept)
  useRafScroll(
    () => ({ y: window.scrollY, vh: window.innerHeight }),
    ({ y, vh }) => {
      if (!prefersReducedMotion() && y < vh * 1.2) {
        if (mediaRef.current) mediaRef.current.style.transform = `translate3d(0,${(y * 0.35).toFixed(1)}px,0)`
        if (contentRef.current) {
          contentRef.current.style.opacity = clamp(1 - y / (vh * 0.55)).toFixed(3)
          contentRef.current.style.transform = `translate3d(0,${(-y * 0.15).toFixed(1)}px,0)`
        }
      }
      const v = videoRef.current
      if (!v) return
      const onScreen = y < vh * 0.95
      if (!onScreen && !v.paused) {
        v.pause()
        autoPaused.current = true
      } else if (onScreen && v.paused && autoPaused.current) {
        autoPaused.current = false
        v.play().catch(() => {})
      }
    },
  )

  const toggleVideo = () => {
    const v = videoRef.current
    if (!v) return
    autoPaused.current = false
    if (v.paused) {
      v.play()
        .then(() => setPaused(false))
        .catch(() => setPaused(true))
    } else {
      v.pause()
      setPaused(true)
    }
  }

  const scrollOn = () => {
    const next = heroRef.current?.nextElementSibling as HTMLElement | null
    next?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }

  const words = title.trim().split(/\s+/)

  return (
    <section ref={heroRef} id={anchorId || undefined} className={styles.hero} aria-label="Introduction">
      <div ref={mediaRef} className={styles.media}>
        {videoUrl ? (
          <video
            ref={videoRef}
            className={styles.video}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={posterUrl ?? undefined}
            aria-hidden="true"
          >
            <source src={videoUrl} type={(isMediaDoc(video) && video.mimeType) || 'video/mp4'} />
          </video>
        ) : (
          <Media resource={poster} fill priority decorative className={styles.image} />
        )}
      </div>
      <div className={styles.fade} />
      <div className={styles.shade} />
      <div ref={contentRef} className={styles.content}>
        <h1 ref={titleRef} className={styles.title}>
          {words.map((w, i) => (
            <span key={i}>
              <span className={styles.word} style={{ '--i': i } as CSSProperties}>
                {w}
              </span>
              {i < words.length - 1 ? ' ' : null}
            </span>
          ))}
        </h1>
        {lede && <p className={styles.lede}>{lede}</p>}
        {!!links?.length && (
          <div ref={ctasRef} className={styles.ctas}>
            {links.map((l, i) => (
              <CMSLink key={l.id ?? i} link={l} size="sm" />
            ))}
          </div>
        )}
      </div>
      {showScrollCue && (
        <button type="button" className={styles.scrollCue} aria-label="Scroll to content" onClick={scrollOn} />
      )}
      {videoUrl && (
        <button
          type="button"
          className={[styles.vctl, paused && styles.paused].filter(Boolean).join(' ')}
          aria-label={paused ? 'Play background video' : 'Pause background video'}
          onClick={toggleVideo}
        >
          <svg className={styles.iPause} viewBox="0 0 12 12" aria-hidden="true">
            <path fill="currentColor" d="M2 1h3v10H2zM7 1h3v10H7z" />
          </svg>
          <svg className={styles.iPlay} viewBox="0 0 12 12" aria-hidden="true">
            <path fill="currentColor" d="M3 1l8 5-8 5z" />
          </svg>
        </button>
      )}
    </section>
  )
}
