import styles from './SkipLink.module.css'

/** "Skip to content" for keyboard users; <main id="top" tabIndex={-1}> receives focus. */
export function SkipLink() {
  return (
    <a className={styles.skip} href="#top">
      Skip to content
    </a>
  )
}
