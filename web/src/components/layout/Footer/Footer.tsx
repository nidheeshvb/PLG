import { CMSLink } from '@/components/ui/CMSLink'
import type { SiteSetting } from '@/payload-types'

import { Logo } from '../Logo/Logo'
import styles from './Footer.module.css'
import { SocialIcon } from './SocialIcon'

const platformLabel: Record<string, string> = {
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  x: 'X',
  youtube: 'YouTube',
  facebook: 'Facebook',
  tiktok: 'TikTok',
}

export function Footer({ settings }: { settings: SiteSetting }) {
  return (
    <footer className={styles.footer} data-nav-tone="light">
      <div className={styles.row}>
        <Logo wordClassName={styles.word} />
        <nav className={styles.nav} aria-label="Footer">
          {settings.footerLinks?.map((l, i) => <CMSLink key={l.id ?? i} link={l} as="text" />)}
        </nav>
        {!!settings.social?.length && (
          <div className={styles.social}>
            {settings.social.map((s, i) => (
              <a
                key={s.id ?? i}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={platformLabel[s.platform] ?? s.platform}
              >
                <SocialIcon platform={s.platform} />
              </a>
            ))}
          </div>
        )}
        {settings.copyright && <p className={styles.copy}>{settings.copyright}</p>}
        <div className={styles.legal}>
          {settings.legalLinks?.map((l, i) => <CMSLink key={l.id ?? i} link={l} as="text" />)}
        </div>
      </div>
    </footer>
  )
}
