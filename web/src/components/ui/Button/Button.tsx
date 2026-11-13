import Link from 'next/link'
import type { CSSProperties, ReactNode } from 'react'

import { isExternal } from '@/lib/links'

import styles from './Button.module.css'

export type ButtonAppearance = 'primary' | 'ghost' | 'dark'

type CommonProps = {
  children: ReactNode
  appearance?: ButtonAppearance | null
  size?: 'md' | 'sm'
  className?: string
  style?: CSSProperties
  /** Fade/slide in when scrolled into view, after an optional delay in seconds. */
  reveal?: boolean
  revealDelay?: number
}

type LinkButtonProps = CommonProps & { href: string; newTab?: boolean | null }
type ActionButtonProps = CommonProps & {
  href?: undefined
  type?: 'button' | 'submit'
  disabled?: boolean
  onClick?: () => void
}

export type ButtonProps = LinkButtonProps | ActionButtonProps

export const buttonClassName = ({
  appearance,
  size,
  className,
}: Pick<CommonProps, 'appearance' | 'size' | 'className'>) =>
  [
    styles.btn,
    size === 'sm' && styles.sm,
    appearance === 'ghost' && styles.ghost,
    appearance === 'dark' && styles.dark,
    className,
  ]
    .filter(Boolean)
    .join(' ')

/** The site's pill button: label + arrow. Renders a link when given an href. */
export function Button(props: ButtonProps) {
  const { children, appearance, size, className, reveal, revealDelay } = props
  const cls = buttonClassName({ appearance, size, className })
  const style = {
    ...props.style,
    ...(revealDelay ? ({ '--d': `${revealDelay}s` } as CSSProperties) : null),
  }
  const content = (
    <>
      <span className={styles.label}>{children}</span>
      <span className={styles.arrow} aria-hidden="true">
        <i className="arr" />
      </span>
    </>
  )
  const revealAttr = reveal ? { 'data-reveal': '' } : {}

  if (props.href !== undefined) {
    const { href, newTab } = props
    const targetProps = newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {}
    if (href.startsWith('#') || isExternal(href)) {
      return (
        <a href={href} className={cls} style={style} {...targetProps} {...revealAttr}>
          {content}
        </a>
      )
    }
    return (
      <Link href={href} className={cls} style={style} {...targetProps} {...revealAttr}>
        {content}
      </Link>
    )
  }

  return (
    <button
      type={props.type ?? 'button'}
      className={cls}
      style={style}
      disabled={props.disabled}
      onClick={props.onClick}
      {...revealAttr}
    >
      {content}
    </button>
  )
}
