import type { BlockContext } from '@/blocks/context'
import { resolveHref } from '@/lib/links'
import { getCaseStudies } from '@/lib/payload'
import type { CaseStudyGridBlock as CaseStudyGridBlockData } from '@/payload-types'

import { CaseStudyGridClient } from './CaseStudyGridClient'

/** Our Work case studies: loads every case study and hands them to the client grid + case study view. */
export async function CaseStudyGridBlock(props: CaseStudyGridBlockData & BlockContext) {
  const { showFilter, filterLabel, allLabel, exploreLabel, emptyText, nextLabel, ctaLink, anchorId, page } = props
  const cases = await getCaseStudies()
  const ctaHref = resolveHref(ctaLink)
  return (
    <CaseStudyGridClient
      cases={cases}
      anchorId={anchorId || 'cases'}
      pageTitle={page?.title ?? 'Our Work'}
      showFilter={showFilter !== false}
      filterLabel={filterLabel || 'Filter'}
      allLabel={allLabel || 'All work'}
      exploreLabel={exploreLabel || 'Explore Project'}
      emptyText={emptyText || ''}
      nextLabel={nextLabel || 'Next case study'}
      cta={ctaHref && ctaLink?.label ? { href: ctaHref, label: ctaLink.label, appearance: ctaLink.appearance ?? 'primary' } : null}
    />
  )
}
