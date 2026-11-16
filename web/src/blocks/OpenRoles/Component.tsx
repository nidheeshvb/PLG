import { CMSLink } from '@/components/ui/CMSLink'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { employmentTypeLabel, roleTeamLabel } from '@/collections/roleOptions'
import { getOpenRoles } from '@/lib/payload'
import type { OpenRolesBlock as OpenRolesBlockData, Role } from '@/payload-types'

import styles from './Component.module.css'
import { OpenRolesClient, type RoleItem } from './OpenRolesClient'

const toItem = (r: Role): RoleItem => ({
  id: String(r.id),
  title: r.title,
  team: r.team,
  teamLabel: roleTeamLabel(r.team),
  location: r.location,
  type: employmentTypeLabel(r.employmentType),
  summary: r.summary ?? '',
  points: (r.points ?? []).map((p) => p.text),
})

/** Join Us "Open roles": header, team filter, expandable roles, and a line + button underneath. */
export async function OpenRolesBlock(props: OpenRolesBlockData) {
  const { eyebrow, title, gradientTitle, roles, showFilter, applyLabel, applySection, emptyText } = props
  const { footerText, footerLink, anchorId } = props
  const picked = (roles ?? []).filter((r): r is Role => typeof r === 'object' && r !== null && Boolean(r.isOpen))
  const items = (picked.length ? picked : await getOpenRoles()).map(toItem)

  return (
    <Section id={anchorId} className={styles.roles}>
      <OpenRolesClient
        items={items}
        showFilter={showFilter !== false}
        applyLabel={applyLabel || 'Apply for this role'}
        applyHref={`#${(applySection || 'apply').replace(/^#/, '')}`}
        emptyText={emptyText}
        header={<SectionHeader bare eyebrow={eyebrow} title={title} gradient={gradientTitle} />}
      />
      {(footerText || footerLink?.label) && (
        <div className={styles.foot}>
          {footerText && <p>{footerText}</p>}
          <CMSLink link={footerLink} />
        </div>
      )}
    </Section>
  )
}
