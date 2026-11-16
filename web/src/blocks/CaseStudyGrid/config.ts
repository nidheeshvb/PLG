import type { Block } from 'payload'

import { link } from '@/fields/link'
import { sectionSettings } from '@/fields/sectionSettings'

/**
 * Our Work: every case study as a tile (numbered in their set order), a filter bar by service that
 * sticks to the top, and the full case study that opens over the page at #case-<url name>.
 */
export const CaseStudyGridBlock: Block = {
  slug: 'caseStudyGrid',
  interfaceName: 'CaseStudyGridBlock',
  labels: { singular: 'Case study grid', plural: 'Case study grids' },
  imageAltText: 'All case studies as large tiles with a service filter; each opens the full case study',
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'showFilter', type: 'checkbox', label: 'Show the filter bar', defaultValue: true, admin: { width: '34%' } },
        { name: 'filterLabel', type: 'text', label: 'Filter bar label', defaultValue: 'Filter', admin: { width: '33%' } },
        { name: 'allLabel', type: 'text', label: '“All” button', defaultValue: 'All work', admin: { width: '33%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'exploreLabel', type: 'text', label: 'Tile link text', defaultValue: 'Explore Project', admin: { width: '50%' } },
        {
          name: 'emptyText',
          type: 'text',
          label: 'Text when a filter has no case studies',
          defaultValue: 'No case studies under this service yet.',
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Full case study',
      admin: { initCollapsed: true, description: 'Applies to every case study opened from this grid.' },
      fields: [
        { name: 'nextLabel', type: 'text', label: '“Next” label', defaultValue: 'Next case study' },
        {
          ...link({ name: 'ctaLink', label: 'Button at the end', required: false }),
          admin: { hideGutter: true },
        },
      ],
    },
    ...sectionSettings(),
  ],
}
