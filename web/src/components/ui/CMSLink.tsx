import Link from 'next/link'
import type { CSSProperties, ReactNode } from 'react'

import { isExternal, resolveHref, type LinkData } from '@/lib/links'

import { Button } from './Button/Button'

type Props = {
  link?: LinkData | null
  /** "button" uses the link's chosen button style; "text" renders a plain link. */
  as?: 'button' | 'text'
  size?: 'md' | 'sm'
  className?: string
  style?: CSSProperties
  reveal?: boolean
  revealDelay?: number
  children?: ReactNode
  onClick?: () => void
}

/** Renders any link coming from the CMS. Renders nothing if the link points nowhere. */
export function CMSLink({ link, as = 'button', children, className, ...rest }: Props) {
  const href = resolveHref(link)
  if (!link || !href) return null
  const label = children ?? link.label

  if (as === 'button') {
    return (
      <Button
        href={href}
        newTab={link.newTab}
        appearance={link.appearance}
        className={className}
        size={rest.size}
        style={rest.style}
        reveal={rest.reveal}
        revealDelay={rest.revealDelay}
      >
        {label}
      </Button>
    )
  }

  const targetProps = link.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  if (href.startsWith('#') || isExternal(href)) {
    return (
      <a href={href} className={className} style={rest.style} onClick={rest.onClick} {...targetProps}>
        {label}
      </a>
    )
  }
  return (
    <Link href={href} className={className} style={rest.style} onClick={rest.onClick} {...targetProps}>
      {label}
    </Link>
  )
}
