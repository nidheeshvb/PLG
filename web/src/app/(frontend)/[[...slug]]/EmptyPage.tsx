import styles from './EmptyPage.module.css'

/** Shown for a page that has no sections yet (e.g. pages still to be built). */
export function EmptyPage({ title }: { title: string }) {
  return (
    <section className={styles.empty}>
      <h1 className="h1 grad">{title}</h1>
      <p className="body">This page is coming soon.</p>
    </section>
  )
}
