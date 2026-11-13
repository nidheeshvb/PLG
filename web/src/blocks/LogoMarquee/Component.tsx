import type { CSSProperties } from 'react'

import { Marquee } from '@/components/ui/Marquee/Marquee'
import { Media } from '@/components/ui/Media'
import { getPartners } from '@/lib/payload'
import type { LogoMarqueeBlock as LogoMarqueeBlockData, Partner } from '@/payload-types'

import styles from './Component.module.css'

/** Scrolling strip of partner logos; shows every partner unless specific ones are chosen. */
export async function LogoMarqueeBlock({ label, partners, anchorId }: LogoMarqueeBlockData) {
  const chosen = (partners ?? []).filter((p): p is Partner => typeof p === 'object' && p !== null)
  const list = chosen.length ? chosen : await getPartners()
  if (!list.length) return null

  return (
    <section
      id={anchorId || undefined}
      className={[styles.logos, label && styles.withLabel].filter(Boolean).join(' ')}
      aria-label={label || 'Partners'}
    >
      {label && <p className={styles.label}>{label}</p>}
      <Marquee setClassName={styles.set}>
        {list.map((p) => (
          <span
            key={p.id}
            className={styles.logo}
            style={
              {
                '--h': `${p.height ?? 40}px`,
                '--hm': `${p.mobileHeight ?? Math.round((p.height ?? 40) * 0.45)}px`,
              } as CSSProperties
            }
          >
            <Media resource={p.logo} alt={p.name} />
          </span>
        ))}
      </Marquee>
    </section>
  )
}
