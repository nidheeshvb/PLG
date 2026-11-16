import Link from 'next/link'
import type { CSSProperties, ReactNode } from 'react'

import { Media } from '@/components/ui/Media'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { isExternal, resolveHref } from '@/lib/links'
import type { LinkTilesBlock as LinkTilesBlockData } from '@/payload-types'

import styles from './Component.module.css'

/** Heading + expanding image tiles (prototype "More about us"). */
export function LinkTilesBlock({ eyebrow, title, gradientTitle, tileStyle, tiles, anchorId }: LinkTilesBlockData) {
  const numbered = tileStyle === 'numbered'
  return (
    <Section
      id={anchorId}
      className={[styles.section, tileStyle === 'tall' && styles.tall, numbered && styles.numbered].filter(Boolean).join(' ')}
    >
      <div className={styles.head}>
        <SectionHeader bare eyebrow={eyebrow} title={title} gradient={gradientTitle} />
      </div>
      <div className={styles.pan}>
        {tiles?.map((t, i) => {
          const href = resolveHref(t.link)
          const style = i ? ({ '--d': `${(i * 0.08).toFixed(2)}s` } as CSSProperties) : undefined
          const inner: ReactNode = (
            <>
              <Media resource={t.image} fill decorative sizes="(max-width: 900px) 100vw, 50vw" />
              <span className={styles.ov}>
                {numbered && <span className={styles.k}>{String(i + 1).padStart(2, '0')}</span>}
                <span className={styles.t}>
                  {t.title}
                  <span aria-hidden="true">
                    <i className="arr" />
                  </span>
                </span>
                {t.text &&
                  (numbered ? (
                    <span className={styles.more}>
                      <span>
                        <span className={styles.d}>{t.text}</span>
                      </span>
                    </span>
                  ) : (
                    <span className={styles.d}>{t.text}</span>
                  ))}
              </span>
            </>
          )
          const props = {
            className: styles.pn,
            'data-reveal': '',
            style,
            'aria-label': t.link?.label || undefined,
          }
          if (!href)
            return (
              <div key={t.id ?? i} {...props}>
                {inner}
              </div>
            )
          if (isExternal(href) || href.startsWith('#'))
            return (
              <a key={t.id ?? i} href={href} {...props} {...(t.link?.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                {inner}
              </a>
            )
          return (
            <Link key={t.id ?? i} href={href} {...props}>
              {inner}
            </Link>
          )
        })}
      </div>
    </Section>
  )
}
