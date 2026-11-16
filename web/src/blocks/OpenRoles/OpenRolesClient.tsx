'use client'

import { type ReactNode, useEffect, useRef, useState } from 'react'

import { APPLY_ROLE_EVENT, type ApplyRoleDetail } from '@/blocks/Form/applyEvent'
import { ROLE_TEAMS } from '@/collections/roleOptions'
import { Button } from '@/components/ui/Button/Button'
import { useDragScroll } from '@/hooks/useDragScroll'
import { prefersReducedMotion } from '@/hooks/useReducedMotion'

import styles from './Component.module.css'

export type RoleItem = {
  id: string
  title: string
  team: string
  teamLabel: string
  location: string
  type: string
  summary: string
  points: string[]
}

type Props = {
  items: RoleItem[]
  header: ReactNode
  showFilter: boolean
  applyLabel: string
  applyHref: string
  emptyText?: string | null
}

const PLUS = (
  <svg viewBox="0 0 12 12" aria-hidden="true">
    <path stroke="currentColor" strokeWidth="1.5" d="M6 0v12M0 6h12" />
  </svg>
)

/** Filter chips (All + teams that have roles), role count, and the expandable role rows. */
export function OpenRolesClient({ items, header, showFilter, applyLabel, applyHref, emptyText }: Props) {
  const [team, setTeam] = useState('all')
  const [open, setOpen] = useState<string[]>([])
  const listRef = useRef<HTMLUListElement>(null)
  const chipsRef = useRef<HTMLDivElement>(null)
  const hideT = useRef<number | undefined>(undefined)
  useDragScroll(chipsRef, styles.dragging, 32)

  const teams = ROLE_TEAMS.filter((t) => items.some((r) => r.team === t.value))
  const count = (t: string) => (t === 'all' ? items.length : items.filter((r) => r.team === t).length)
  const n = count(team)
  const teamName = teams.find((t) => t.value === team)?.label

  useEffect(() => () => window.clearTimeout(hideT.current), [])

  // fade the non-matching rows out, then hide them and fade the matching ones in (as the prototype)
  const filter = (t: string) => {
    setTeam(t)
    const rows = [...(listRef.current?.children ?? [])] as HTMLElement[]
    const match = (li: HTMLElement) => t === 'all' || li.dataset.team === t
    window.clearTimeout(hideT.current)
    rows.forEach((li) => !match(li) && li.classList.add(styles.out))
    hideT.current = window.setTimeout(
      () =>
        rows.forEach((li) => {
          const m = match(li)
          li.hidden = !m
          if (m) {
            li.classList.add(styles.out)
            void li.offsetWidth
            li.classList.remove(styles.out)
          }
        }),
      prefersReducedMotion() ? 0 : 250,
    )
  }

  const chips = [{ label: 'All', value: 'all' }, ...teams]
  const onChip = (t: string, el: HTMLButtonElement) => {
    filter(t)
    const sn = chipsRef.current
    if (sn && sn.scrollWidth > sn.clientWidth)
      sn.scrollTo({
        left: Math.max(0, el.offsetLeft - sn.clientWidth / 2 + el.offsetWidth / 2),
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      })
  }

  const toggle = (id: string) => setOpen(open.includes(id) ? open.filter((o) => o !== id) : [...open, id])
  const apply = (r: RoleItem) =>
    window.dispatchEvent(
      new CustomEvent<ApplyRoleDetail>(APPLY_ROLE_EVENT, { detail: { id: r.id, discipline: r.teamLabel } }),
    )

  return (
    <>
      <div className={styles.head}>
        <div>
          {header}
          <p className={styles.count} aria-live="polite">
            <b>{n}</b> {n === 1 ? 'role' : 'roles'} open{teamName ? ` in ${teamName}` : ''}
          </p>
        </div>
        {showFilter && items.length > 0 && (
          <div ref={chipsRef} className={styles.chips} role="group" aria-label="Filter roles by team">
            {chips.map((c) => (
              <button
                key={c.value}
                type="button"
                className={styles.chip}
                aria-pressed={team === c.value}
                onClick={(e) => onChip(c.value, e.currentTarget)}
              >
                {c.label} <span aria-hidden="true">{count(c.value)}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      <ul ref={listRef} className={styles.list}>
        {items.map((r) => {
          const isOpen = open.includes(r.id)
          const panelId = `role-${r.id}-panel`
          return (
            // open state as an attribute: re-rendering className would drop the reveal's .in class
            <li key={r.id} className={styles.role} data-open={isOpen || undefined} data-team={r.team} data-reveal="">
              <button type="button" className={styles.btn} aria-expanded={isOpen} aria-controls={panelId} onClick={() => toggle(r.id)}>
                <span className={styles.t}>{r.title}</span>
                <span className={`${styles.c} ${styles.dept}`}>{r.teamLabel}</span>
                <span className={`${styles.c} ${styles.loc}`}>{r.location}</span>
                <span className={`${styles.c} ${styles.type}`}>{r.type}</span>
                <span className={styles.ic}>{PLUS}</span>
              </button>
              <div className={styles.panel} id={panelId} inert={!isOpen}>
                <div className={styles.panelInner}>
                  <div className={styles.body}>
                    <div>
                      {r.summary && <p>{r.summary}</p>}
                      {r.points.length > 0 && (
                        <ul>
                          {r.points.map((p, i) => (
                            <li key={i}>{p}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className={styles.side} onClick={() => apply(r)}>
                      <small>{[r.location, r.type].filter(Boolean).join(' · ')}</small>
                      <Button href={applyHref}>{applyLabel}</Button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
      {n === 0 && emptyText && <p className={styles.empty}>{emptyText}</p>}
    </>
  )
}
