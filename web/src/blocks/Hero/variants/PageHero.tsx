import Link from 'next/link'
import { Fragment } from 'react'
import { preload } from 'react-dom'

import type { BlockContext } from '@/blocks/context'
import { CMSLink } from '@/components/ui/CMSLink'
import { isMediaDoc, isVideo, Media } from '@/components/ui/Media'
import { Parallax } from '@/components/ui/Parallax'
import { RichText } from '@/components/ui/RichText'
import type { HeroBlock } from '@/payload-types'

import styles from './PageHero.module.css'
import { VideoControl } from './VideoControl'

/** Breadcrumb trail from the page tree: Home / parent pages / this page. */
export function Breadcrumb({ page }: { page?: BlockContext['page'] }) {
  const trail = (page?.breadcrumbs ?? []).filter((c) => c.label)
  const crumbs = trail.length ? trail : page?.title ? [{ label: page.title, url: page.path }] : []
  return (
    <nav aria-label="Breadcrumb">
      <p className={styles.crumb}>
        <Link href="/">Home</Link>
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1
          return (
            <Fragment key={i}>
              <span>/</span>
              {last || !c.url ? (
                <span aria-current={last ? 'page' : undefined}>{c.label}</span>
              ) : (
                <Link href={c.url}>{c.label}</Link>
              )}
            </Fragment>
          )
        })}
      </p>
    </nav>
  )
}

/** One headline line; the last word of the last line can be orange. */
function Line({ text, highlight }: { text: string; highlight: boolean }) {
  const t = text.trim()
  const cut = highlight ? t.lastIndexOf(' ') : -1
  return (
    <span className={styles.ln}>
      <span className="grad">
        {highlight ? (
          <>
            {cut > 0 ? `${t.slice(0, cut)} ` : null}
            <em>{cut > 0 ? t.slice(cut + 1) : t}</em>
          </>
        ) : (
          t
        )}
      </span>
    </span>
  )
}

/**
 * Inner-page banner: breadcrumb + headline on the left; intro and up to two buttons on the right,
 * bottom-aligned, over a dimmed background image that zooms in and moves with a light parallax.
 */
export function PageHero({
  title,
  highlightLastWord,
  headlineSize,
  largerOnPhones,
  smallerOnPhones,
  imageStyle,
  intro,
  links,
  poster,
  video,
  videoMobile,
  showBrandMark,
  anchorId,
  page,
}: HeroBlock & BlockContext) {
  const lines = title.split('\n').filter((l) => l.trim())
  const posterUrl = isMediaDoc(poster) ? poster.url : null
  const videoUrl = isVideo(video) && isMediaDoc(video) ? video.url : null
  const mobileVideoUrl = isVideo(videoMobile) && isMediaDoc(videoMobile) ? videoMobile.url : null
  const heroVideoId = `hero-video-${anchorId || 'page'}`
  if (posterUrl && !videoUrl) preload(posterUrl, { as: 'image', fetchPriority: 'high' })

  return (
    <section
      id={anchorId || undefined}
      className={[
        styles.hero,
        imageStyle === 'bright' ? styles.bright : styles.dim,
        headlineSize === 'oneLine' ? styles.oneLine : headlineSize === 'fitted' ? styles.fitted : styles.wrap,
        largerOnPhones && styles.largePhone,
        smallerOnPhones && styles.smallPhone,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label={page?.title ?? undefined}
    >
      <Parallax className={styles.media}>
        {videoUrl ? (
          <video
            id={heroVideoId}
            data-hero-video=""
            className={`${styles.cover} ${styles.video}`}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={posterUrl ?? undefined}
            aria-hidden="true"
          >
            {mobileVideoUrl && (
              <source
                src={mobileVideoUrl}
                media="(max-width: 900px)"
                type={(isMediaDoc(videoMobile) && videoMobile.mimeType) || 'video/mp4'}
              />
            )}
            <source src={videoUrl} type={(isMediaDoc(video) && video.mimeType) || 'video/mp4'} />
          </video>
        ) : (
          <Media resource={poster} fill priority decorative className={styles.cover} />
        )}
      </Parallax>
      <div className={styles.fade} />
      {showBrandMark && (
        // eslint-disable-next-line @next/next/no-img-element
        <img className={styles.mark} src="/brand/brand-mark.svg" alt="" fetchPriority="high" decoding="async" />
      )}
      <div className={styles.inner}>
        <div className={styles.l}>
          <Breadcrumb page={page} />
          <h1 className={styles.title}>
            {lines.map((l, i) => (
              <Line key={i} text={l} highlight={Boolean(highlightLastWord) && i === lines.length - 1} />
            ))}
          </h1>
        </div>
        {(intro || !!links?.length) && (
          <div className={styles.r}>
            {intro && <RichText data={intro} className={styles.sub} />}
            {!!links?.length && (
              <div className={styles.ctas}>
                {links.map((l, i) => (
                  <CMSLink key={l.id ?? i} link={l} size="sm" className={styles.btn} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      {videoUrl && (
        <VideoControl
          videoId={heroVideoId}
          className={styles.vctl}
          pausedClassName={styles.paused}
          iconPause={styles.iPause}
          iconPlay={styles.iPlay}
        />
      )}
    </section>
  )
}
