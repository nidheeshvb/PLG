import Link from 'next/link'

import styles from './Logo.module.css'

type Props = { className?: string; wordClassName?: string; onClick?: () => void }

/** PLG Acachet mark + wordmark, linking to the home page. */
export function Logo({ className, wordClassName, onClick }: Props) {
  return (
    <Link
      href="/"
      className={[styles.logo, className].filter(Boolean).join(' ')}
      aria-label="PLG Acachet home"
      onClick={onClick}
    >
      <span className={styles.mark}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/plg-mark.webp" alt="" decoding="async" width={64} height={54} />
      </span>
      <span className={[styles.word, wordClassName].filter(Boolean).join(' ')}>PLG ACACHET</span>
    </Link>
  )
}
