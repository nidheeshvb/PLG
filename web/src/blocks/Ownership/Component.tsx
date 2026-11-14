import type { CSSProperties } from 'react'

import { RichText } from '@/components/ui/RichText'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import type { OwnershipBlock as OwnershipBlockData } from '@/payload-types'

import styles from './Component.module.css'
import { FactValue, Ledger } from './OwnershipClient'

const d = (s: string) => ({ '--d': s }) as CSSProperties

/** Text + key facts on the left, the group structure as nested frames on the right. White band. */
export function OwnershipBlock({ eyebrow, title, body, facts, closing, levels, anchorId }: OwnershipBlockData) {
  const names = (levels ?? []).map((l) => l.name)
  const label = names.length
    ? `Group structure: ${names.map((n, i) => (i ? `which includes ${n}` : n)).join(', ')}`
    : 'Group structure'
  return (
    <Section id={anchorId} tone="light" className={styles.section}>
      <div className={styles.grid}>
        <div className={styles.copy}>
          <SectionHeader eyebrow={eyebrow} title={title} />
          {body && (
            <div className={`body ${styles.body}`} data-reveal="" style={d('.16s')}>
              <RichText data={body} />
            </div>
          )}
          {!!facts?.length && (
            <div className={styles.facts} data-reveal="" style={{ ...d('.2s'), '--n': facts.length } as CSSProperties}>
              {facts.map((f, i) => (
                <div key={f.id ?? i} className={styles.fact}>
                  <FactValue value={f.value} />
                  <span>{f.label}</span>
                </div>
              ))}
            </div>
          )}
          {closing && (
            <div className={styles.close} data-reveal="" style={d('.24s')}>
              <RichText data={closing} />
            </div>
          )}
        </div>
        {!!levels?.length && <Ledger levels={levels} label={label} />}
      </div>
    </Section>
  )
}
