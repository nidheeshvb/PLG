'use client'

import {
  type CSSProperties,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'

import { TEAM_DEPARTMENTS, TEAM_GROUPS, type TeamDepartment, type TeamGroup } from '@/collections/teamOptions'
import { Media } from '@/components/ui/Media'
import { prefersReducedMotion } from '@/hooks/useReducedMotion'
import type { Media as MediaDoc } from '@/payload-types'

import styles from './Component.module.css'

export type Person = {
  id: string
  name: string
  jobTitle: string
  group: TeamGroup
  department: TeamDepartment
  head: boolean
  owner: boolean
  bio: string | null
  photo: MediaDoc | null
  social: { linkedin: string | null; instagram: string | null; x: string | null }
}

type View = 'grid' | 'org'

const tagOf: Partial<Record<TeamGroup, string>> = Object.fromEntries(
  TEAM_GROUPS.filter((g) => g.filter).map((g) => [g.value, g.label]),
)

/* ---------- small pieces ---------- */

function Silhouette() {
  return (
    <svg viewBox="0 0 100 110" aria-hidden="true">
      <circle cx="50" cy="38" r="20" />
      <path d="M8 110c0-30 19-46 42-46s42 16 42 46z" />
    </svg>
  )
}

function Portrait({ p, sizes }: { p: Person; sizes: string }) {
  return p.photo ? <Media resource={p.photo} fill decorative sizes={sizes} /> : <Silhouette />
}

const icons = {
  linkedin: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 3.9 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zM12 0C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9c.2 4.4 2.6 6.8 7 7 1.2.1 1.6.1 4.9.1s3.7 0 4.9-.1c4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.2-4.4-2.6-6.8-7-7C15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.4 1.4 0 1 0 0 2.9 1.4 1.4 0 0 0 0-2.9z" />
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.21-6.82-5.97 6.82H1.68l7.73-8.84L1.25 2.25h6.83l4.71 6.23zm-1.16 17.52h1.83L7.08 4.13H5.12z" />
    </svg>
  ),
}
const platformName = { linkedin: 'LinkedIn', instagram: 'Instagram', x: 'X' } as const

function Social({ p, withTitle }: { p: Person; withTitle?: boolean }) {
  const links = (Object.keys(icons) as (keyof typeof icons)[]).filter((k) => p.social[k])
  if (!links.length) return null
  return (
    <div className={styles.sm}>
      {links.map((k) => (
        <a
          key={k}
          href={p.social[k] as string}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${p.name}${withTitle ? `, ${p.jobTitle},` : ''} on ${platformName[k]}`}
        >
          {icons[k]}
        </a>
      ))}
    </div>
  )
}

/* ---------- the directory ---------- */

type Props = { people: Person[]; showOrgChart: boolean; showFilter: boolean }

/**
 * Portrait grid ↔ org chart, the "Show" filter and the profile panel.
 * Port of the prototype's team.html script; filter animations toggle classes directly on the cards
 * (like the reveal observer does), everything else is React state.
 */
export function TeamDirectoryClient({ people, showOrgChart, showFilter }: Props) {
  const [view, setView] = useState<View>('grid')
  const [switched, setSwitched] = useState(false)
  const [drawn, setDrawn] = useState(false)
  const [filter, setFilter] = useState<string>('all')
  const [ddOpen, setDdOpen] = useState(false)
  const [focusI, setFocusI] = useState(0)
  const [profile, setProfile] = useState<Person | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const segRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLSpanElement>(null)
  const ddRef = useRef<HTMLDivElement>(null)
  const ddBtnRef = useRef<HTMLButtonElement>(null)
  const ddListRef = useRef<HTMLUListElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)
  const lastFocus = useRef<HTMLElement | null>(null)
  const hideT = useRef<ReturnType<typeof setTimeout>>(undefined)
  const closeT = useRef<ReturnType<typeof setTimeout>>(undefined)

  /* filter options: All + every filterable group that has people */
  const filters: [string, string][] = [
    ['all', 'All'],
    ...TEAM_GROUPS.filter((g) => g.filter && people.some((p) => p.group === g.value)).map(
      (g) => [g.value, g.label] as [string, string],
    ),
  ]
  const sizeOf = (k: string) => (k === 'all' ? people.length : people.filter((p) => p.group === k).length)
  const matches = (group: string) => filter === 'all' || group === filter

  /* org chart: the top person, then one column per department with its head first */
  const top = people.find((p) => p.department === 'top')
  const cols = TEAM_DEPARTMENTS.filter((d) => d.value !== 'top')
    .map((d) => {
      const inDept = people.filter((p) => p.department === d.value)
      const head = inDept.find((p) => p.head) ?? inDept[0]
      return { key: d.value, label: d.label, head, kids: inDept.filter((p) => p !== head) }
    })
    .filter((c) => c.head)

  /* view switch thumb follows the pressed button */
  const placeThumb = useCallback(() => {
    const seg = segRef.current,
      thumb = thumbRef.current
    if (!seg || !thumb) return
    const b = seg.querySelector<HTMLButtonElement>('button[aria-pressed="true"]')
    if (!b) return
    thumb.style.width = `${b.offsetWidth}px`
    thumb.style.transform = `translateX(${b.offsetLeft}px)`
  }, [])
  useLayoutEffect(placeThumb, [view, placeThumb])
  useEffect(() => {
    addEventListener('resize', placeThumb)
    document.fonts?.ready.then(placeThumb)
    return () => removeEventListener('resize', placeThumb)
  }, [placeThumb])

  const changeView = (v: View) => {
    if (v === view) return
    setView(v)
    setSwitched(true)
    if (v === 'org') {
      setDrawn(false)
      requestAnimationFrame(() => requestAnimationFrame(() => setDrawn(true)))
    } else {
      gridRef.current?.querySelectorAll('[data-reveal]').forEach((c) => c.classList.add('in'))
    }
  }

  /* filter: fade out the cards that leave, then re-show the matching ones */
  const applyFilter = (k: string) => {
    setFilter(k)
    const cards = [...(gridRef.current?.children ?? [])] as HTMLElement[]
    const match = (el: HTMLElement) => k === 'all' || el.dataset.group === k
    clearTimeout(hideT.current)
    cards.forEach((c) => {
      if (!match(c)) c.classList.add(styles.out)
    })
    hideT.current = setTimeout(
      () => {
        cards.forEach((c) => {
          const m = match(c)
          c.hidden = !m
          if (m) {
            c.classList.add(styles.out, 'in')
            void c.offsetWidth
            c.classList.remove(styles.out)
          }
        })
      },
      prefersReducedMotion() ? 0 : 280,
    )
  }
  useEffect(() => () => clearTimeout(hideT.current), [])

  /* dropdown */
  const openDD = (open: boolean) => {
    setDdOpen(open)
    if (open) {
      setFocusI(Math.max(0, filters.findIndex(([k]) => k === filter)))
      requestAnimationFrame(() => ddListRef.current?.focus())
    }
  }
  const pick = (k: string) => {
    applyFilter(k)
    openDD(false)
    ddBtnRef.current?.focus()
  }
  const onListKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      setFocusI((i) => (i + 1) % filters.length)
      e.preventDefault()
    } else if (e.key === 'ArrowUp') {
      setFocusI((i) => (i - 1 + filters.length) % filters.length)
      e.preventDefault()
    } else if (e.key === 'Enter' || e.key === ' ') {
      pick(filters[focusI][0])
      e.preventDefault()
    } else if (e.key === 'Escape' || e.key === 'Tab') {
      openDD(false)
      ddBtnRef.current?.focus()
    }
  }
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ddRef.current && !ddRef.current.contains(e.target as Node)) setDdOpen(false)
    }
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') setDdOpen(false)
    }
    document.addEventListener('click', onDoc)
    addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', onDoc)
      removeEventListener('keydown', onKey)
    }
  }, [])

  /* profile drawer */
  const openProfile = (p: Person) => {
    lastFocus.current = document.activeElement as HTMLElement | null
    clearTimeout(closeT.current)
    setProfile(p)
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setDrawerOpen(true)
        closeRef.current?.focus({ preventScroll: true })
      }),
    )
  }
  const closeProfile = useCallback(() => {
    setDrawerOpen(false)
    closeT.current = setTimeout(() => setProfile(null), prefersReducedMotion() ? 0 : 600)
    lastFocus.current?.focus({ preventScroll: true })
  }, [])
  useEffect(() => {
    if (!profile) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [profile])
  useEffect(() => () => clearTimeout(closeT.current), [])
  const onDrawerKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') closeProfile()
    if (e.key === 'Tab' && drawerRef.current) {
      const f = [...drawerRef.current.querySelectorAll<HTMLElement>('button,a')]
      const i = f.indexOf(document.activeElement as HTMLElement)
      if (e.shiftKey && i <= 0) {
        f[f.length - 1].focus()
        e.preventDefault()
      } else if (!e.shiftKey && i === f.length - 1) {
        f[0].focus()
        e.preventDefault()
      }
    }
  }

  const node = (p: Person, cls?: string) => (
    <button
      type="button"
      className={[styles.node, cls, !matches(p.group) && styles.dim].filter(Boolean).join(' ')}
      onClick={() => openProfile(p)}
    >
      <span className={`${styles.nodeImg} ${styles.ph}`}>
        <Portrait p={p} sizes="64px" />
      </span>
      <span className={styles.nodeTxt}>
        <span className={styles.nodeT}>{p.jobTitle}</span>
        <span className={styles.nodeN}>{p.name}</span>
      </span>
    </button>
  )

  const filterLabel = filters.find(([k]) => k === filter)?.[1] ?? 'All'

  return (
    <>
      <div className={styles.tools}>
        <div className={styles.toolsL}>
          {showOrgChart && (
            <div className={styles.seg} role="group" aria-label="View" ref={segRef}>
              <span className={styles.segThumb} aria-hidden="true" ref={thumbRef} />
              <button type="button" aria-pressed={view === 'grid'} onClick={() => changeView('grid')}>
                <svg viewBox="0 0 14 14" aria-hidden="true">
                  <path fill="currentColor" d="M0 0h6v6H0zM8 0h6v6H8zM0 8h6v6H0zM8 8h6v6H8z" />
                </svg>
                Grid
              </button>
              <button type="button" aria-pressed={view === 'org'} onClick={() => changeView('org')}>
                <svg viewBox="0 0 14 14" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M5 0h4v4H5zM6.5 4h1v2.5H12V10h-1V7.5H3V10H2V6.5h4.5zM0 10h5v4H0zM9 10h5v4H9z"
                  />
                </svg>
                Org chart
              </button>
            </div>
          )}
        </div>
        <div className={styles.toolsR}>
          <p className={styles.count} aria-live="polite">
            Showing <b>{sizeOf(filter)}</b> of {people.length}
          </p>
          {showFilter && filters.length > 1 && (
            <div className={[styles.dd, ddOpen && styles.open].filter(Boolean).join(' ')} ref={ddRef}>
              <button
                type="button"
                className={styles.ddBtn}
                aria-haspopup="listbox"
                aria-expanded={ddOpen}
                ref={ddBtnRef}
                onClick={() => openDD(!ddOpen)}
              >
                <small>Show</small>
                <span>{filterLabel}</span>
                <svg className={styles.ddChev} viewBox="0 0 10 10" aria-hidden="true">
                  <path fill="none" stroke="currentColor" strokeWidth="1.4" d="M1 3.2l4 4 4-4" />
                </svg>
              </button>
              <ul
                className={styles.ddList}
                role="listbox"
                aria-label="Filter people"
                tabIndex={-1}
                ref={ddListRef}
                aria-activedescendant={ddOpen ? `team-opt-${filters[focusI]?.[0]}` : undefined}
                onKeyDown={onListKey}
              >
                {filters.map(([k, label], i) => (
                  <li
                    key={k}
                    id={`team-opt-${k}`}
                    role="option"
                    aria-selected={k === filter}
                    className={[styles.ddOpt, ddOpen && i === focusI && styles.isFocus].filter(Boolean).join(' ')}
                    onClick={() => pick(k)}
                    onMouseMove={() => setFocusI(i)}
                  >
                    {label}
                    <span>{sizeOf(k)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className={[styles.view, switched && styles.enter].filter(Boolean).join(' ')} hidden={view !== 'grid'}>
        <div className={styles.grid} ref={gridRef}>
          {people.map((p) => (
            <article key={p.id} className={styles.person} data-group={p.group} data-reveal="">
              <div className={`${styles.personImg} ${styles.ph}`}>
                <Portrait p={p} sizes="(max-width: 900px) 50vw, 25vw" />
                {tagOf[p.group] && <span className={styles.tag}>{tagOf[p.group]}</span>}
                <span className={styles.more} aria-hidden="true">
                  <i className="arr" />
                </span>
                <button
                  type="button"
                  className={styles.openBtn}
                  tabIndex={-1}
                  aria-hidden="true"
                  onClick={() => openProfile(p)}
                />
              </div>
              <div className={styles.meta}>
                <p className={styles.title}>{p.jobTitle}</p>
                <h2 className={styles.name}>
                  <button
                    type="button"
                    aria-label={`${p.name}, ${p.jobTitle}: view profile`}
                    onClick={() => openProfile(p)}
                  >
                    {p.name}
                  </button>
                </h2>
                <Social p={p} withTitle />
              </div>
            </article>
          ))}
        </div>
      </div>

      {showOrgChart && (
        <div className={[styles.view, switched && styles.enter].filter(Boolean).join(' ')} hidden={view !== 'org'}>
          <div
            className={[styles.org, drawn && styles.drawn].filter(Boolean).join(' ')}
            style={{ '--cols': cols.length || 1 } as CSSProperties}
          >
            {top && <div className={styles.orgLead}>{node(top, styles.nodeTop)}</div>}
            {top && !!cols.length && <div className={styles.orgStem} />}
            <div className={styles.orgCols}>
              {cols.map((c) => (
                <div key={c.key} className={styles.orgCol}>
                  <span className={styles.orgK}>{c.label}</span>
                  {node(c.head as Person, styles.nodeHead)}
                  <ul className={styles.orgKids}>
                    {c.kids.map((p, i) => (
                      <li key={p.id} style={{ '--i': i } as CSSProperties}>
                        {node(p)}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <p className={styles.orgHint}>Select a person to see their profile.</p>
        </div>
      )}

      {profile &&
        createPortal(
          <div className={[styles.drawer, drawerOpen && styles.drawerOpen].filter(Boolean).join(' ')} ref={drawerRef} onKeyDown={onDrawerKey}>
            <div className={styles.scrim} onClick={closeProfile} />
            <aside className={styles.panel} role="dialog" aria-modal="true" aria-labelledby="team-drawer-name">
              <button type="button" className={styles.close} aria-label="Close profile" ref={closeRef} onClick={closeProfile}>
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                  <path stroke="currentColor" strokeWidth="1.6" d="M1 1l12 12M13 1L1 13" />
                </svg>
              </button>
              <div className={`${styles.drawerImg} ${styles.ph}`}>
                <Portrait p={profile} sizes="520px" />
              </div>
              <div className={styles.drawerBody}>
                <p className={styles.title}>{profile.jobTitle}</p>
                <h3 className={styles.drawerName} id="team-drawer-name">
                  {profile.name}
                </h3>
                {profile.owner && <p className={styles.owner}>Senior account owner</p>}
                {profile.bio && (
                  <div className={styles.bio}>
                    {profile.bio
                      .split(/\n\s*\n/)
                      .filter((t) => t.trim())
                      .map((t, i) => (
                        <p key={i}>{t}</p>
                      ))}
                  </div>
                )}
                <Social p={profile} />
              </div>
            </aside>
          </div>,
          document.body,
        )}
    </>
  )
}
