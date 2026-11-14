import { getTeamMembers } from '@/lib/payload'
import type { TeamDirectoryBlock as TeamDirectoryBlockData, TeamMember } from '@/payload-types'

import { type Person, TeamDirectoryClient } from './TeamDirectoryClient'
import styles from './Component.module.css'

/** The intro paragraph with the chosen words in orange. */
function Intro({ text, highlight }: { text: string; highlight?: string | null }) {
  const at = highlight ? text.indexOf(highlight) : -1
  if (!highlight || at < 0) return <>{text}</>
  return (
    <>
      {text.slice(0, at)}
      <em>{highlight}</em>
      {text.slice(at + highlight.length)}
    </>
  )
}

const toPerson = (m: TeamMember): Person => ({
  id: `p${m.id}`,
  name: m.name,
  jobTitle: m.jobTitle,
  group: m.group,
  department: m.department,
  head: Boolean(m.headOfDepartment),
  owner: Boolean(m.accountOwner),
  bio: m.bio ?? null,
  photo: m.photo && typeof m.photo === 'object' ? m.photo : null,
  social: { linkedin: m.linkedin ?? null, instagram: m.instagram ?? null, x: m.x ?? null },
})

/**
 * The Team page's people section: intro, then the interactive grid / org chart (client).
 * Shows everyone in "Team members" unless specific people are chosen in the block.
 */
export async function TeamDirectoryBlock({
  eyebrow,
  intro,
  highlight,
  members,
  showOrgChart,
  showFilter,
  anchorId,
}: TeamDirectoryBlockData) {
  const chosen = (members ?? []).filter((m): m is TeamMember => typeof m === 'object' && m !== null)
  const list = chosen.length ? chosen : await getTeamMembers()

  return (
    <section id={anchorId || undefined} className={styles.team} aria-label={eyebrow || 'Team'}>
      {(eyebrow || intro) && (
        <div className={styles.lead}>
          {eyebrow && (
            <p className="eyebrow" data-reveal="">
              {eyebrow}
            </p>
          )}
          {intro && (
            <p className={styles.leadTxt} data-reveal="" style={{ '--d': '.08s' } as React.CSSProperties}>
              <Intro text={intro} highlight={highlight} />
            </p>
          )}
        </div>
      )}
      <TeamDirectoryClient people={list.map(toPerson)} showOrgChart={showOrgChart !== false} showFilter={showFilter !== false} />
    </section>
  )
}
