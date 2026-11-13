import Image from 'next/image'
import type { CSSProperties } from 'react'

import type { Media as MediaDoc } from '@/payload-types'

type Props = {
  resource?: number | MediaDoc | null
  /** Fill the positioned parent (object-fit is set by the caller's CSS). */
  fill?: boolean
  className?: string
  style?: CSSProperties
  /** Responsive size hint for next/image, e.g. "(max-width: 900px) 100vw, 50vw". */
  sizes?: string
  priority?: boolean
  /** Use when the image is decorative and the alt text should be empty. */
  decorative?: boolean
  alt?: string
}

export const isMediaDoc = (r: Props['resource']): r is MediaDoc => Boolean(r && typeof r === 'object')
export const isVideo = (r: Props['resource']) => isMediaDoc(r) && Boolean(r.mimeType?.startsWith('video'))

/** An image from the Media collection. SVGs are served as-is; other images via next/image. */
export function Media({ resource, fill, className, style, sizes, priority, decorative, alt }: Props) {
  if (!isMediaDoc(resource) || !resource.url) return null
  const altText = decorative ? '' : (alt ?? resource.alt ?? '')
  const focal =
    resource.focalX != null && resource.focalY != null
      ? { objectPosition: `${resource.focalX}% ${resource.focalY}%` }
      : null

  if (resource.mimeType === 'image/svg+xml') {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={resource.url}
        alt={altText}
        className={className}
        style={style}
        width={resource.width ?? undefined}
        height={resource.height ?? undefined}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
    )
  }

  if (fill) {
    return (
      <Image
        src={resource.url}
        alt={altText}
        fill
        sizes={sizes ?? '100vw'}
        priority={priority}
        className={className}
        style={{ ...focal, ...style }}
      />
    )
  }

  return (
    <Image
      src={resource.url}
      alt={altText}
      width={resource.width ?? 1600}
      height={resource.height ?? 900}
      sizes={sizes ?? '100vw'}
      priority={priority}
      className={className}
      style={{ ...focal, ...style }}
    />
  )
}
