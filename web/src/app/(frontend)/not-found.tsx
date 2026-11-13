import { Button } from '@/components/ui/Button/Button'

import styles from './[[...slug]]/EmptyPage.module.css'

export default function NotFound() {
  return (
    <section className={styles.empty}>
      <p className="eyebrow">404</p>
      <h1 className="h1 grad">Page not found.</h1>
      <p className="body">The page you are looking for has moved or does not exist.</p>
      <div>
        <Button href="/">Back to home</Button>
      </div>
    </section>
  )
}
