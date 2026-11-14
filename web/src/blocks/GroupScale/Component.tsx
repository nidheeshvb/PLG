import type { CSSProperties } from 'react'

import { CMSLink } from '@/components/ui/CMSLink'
import type { GroupScaleBlock as GroupScaleBlockData } from '@/payload-types'

import styles from './Component.module.css'

/** Prototype team.html "Group scale": statement, chain of company names and a text link. */
export function GroupScaleBlock({ eyebrow, text, chain, showLink, link, anchorId }: GroupScaleBlockData) {
  const names = (chain ?? []).filter((c) => c.name)
  return (
    <section id={anchorId || undefined} className={styles.group} aria-label={eyebrow || undefined}>
      <div className={styles.grid}>
        {eyebrow ? (
          <p className="eyebrow" data-reveal="">
            {eyebrow}
          </p>
        ) : (
          <span />
        )}
        <div className={styles.body}>
          <p className={styles.txt} data-reveal="" style={{ '--d': '.08s' } as CSSProperties}>
            {text}
          </p>
          {(!!names.length || (showLink && link)) && (
            <div className={styles.row} data-reveal="" style={{ '--d': '.16s' } as CSSProperties}>
              {!!names.length && (
                <ul className={styles.chain} aria-label="Group structure">
                  {names.map((c, i) => (
                    <li key={c.id ?? i}>
                      <span>{c.name}</span>
                    </li>
                  ))}
                </ul>
              )}
              {showLink && (
                <CMSLink link={link} as="text" className={styles.textlink}>
                  {link?.label}
                  <i className="arr" aria-hidden="true" />
                </CMSLink>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
