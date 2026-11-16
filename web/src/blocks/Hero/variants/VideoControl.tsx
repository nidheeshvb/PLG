'use client'

import { useEffect, useState } from 'react'

import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Pause / play button for an inner-page banner video (found by id). The visitor's own choice wins;
 * otherwise reduced motion means no autoplay. Other code (the case study view) may pause the video
 * too; it only resumes it if it was playing.
 */
export function VideoControl({ videoId, className, pausedClassName, iconPause, iconPlay }: {
  videoId: string
  className: string
  pausedClassName: string
  iconPause: string
  iconPlay: string
}) {
  const reduce = useReducedMotion()
  const [userPaused, setPaused] = useState<boolean | null>(null)
  const paused = userPaused ?? reduce

  useEffect(() => {
    if (reduce) (document.getElementById(videoId) as HTMLVideoElement | null)?.pause()
  }, [reduce, videoId])

  const toggle = () => {
    const v = document.getElementById(videoId) as HTMLVideoElement | null
    if (!v) return
    if (v.paused)
      v.play()
        .then(() => setPaused(false))
        .catch(() => setPaused(true))
    else {
      v.pause()
      setPaused(true)
    }
  }

  return (
    <button
      type="button"
      className={[className, paused && pausedClassName].filter(Boolean).join(' ')}
      aria-label={paused ? 'Play background video' : 'Pause background video'}
      onClick={toggle}
    >
      <svg className={iconPause} viewBox="0 0 12 12" aria-hidden="true">
        <path fill="currentColor" d="M2 1h3v10H2zM7 1h3v10H7z" />
      </svg>
      <svg className={iconPlay} viewBox="0 0 12 12" aria-hidden="true">
        <path fill="currentColor" d="M3 1l8 5-8 5z" />
      </svg>
    </button>
  )
}
