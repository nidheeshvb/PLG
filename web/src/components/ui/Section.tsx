import type { CSSProperties, ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  style?: CSSProperties
  /** The block's "Section ID" (for #links). */
  id?: string | null
  /** Light sections turn the header logo dark while it is over them. */
  tone?: 'light' | 'dark' | null
  label?: string
}

/** Outer element of every block: anchor id, header tone and accessible label. */
export function Section({ children, className, style, id, tone, label }: Props) {
  return (
    <section
      id={id || undefined}
      className={className}
      style={style}
      data-nav-tone={tone === 'light' ? 'light' : undefined}
      aria-label={label}
    >
      {children}
    </section>
  )
}
