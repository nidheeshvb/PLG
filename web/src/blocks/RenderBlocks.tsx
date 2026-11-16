import type { ComponentType } from 'react'

import type { Page } from '@/payload-types'

import { type BlockContext, sectionNavItems } from './context'

import { BackgroundTextBlock } from './BackgroundText/Component'
import { CardCarouselBlock } from './CardCarousel/Component'
import { CaseStudyGalleryBlock } from './CaseStudyGallery/Component'
import { CaseStudyGridBlock } from './CaseStudyGrid/Component'
import { CtaBannerBlock } from './CtaBanner/Component'
import { FormBlock } from './Form/Component'
import { GroupScaleBlock } from './GroupScale/Component'
import { HeroBlock } from './Hero/Component'
import { LeadTextBlock } from './LeadText/Component'
import { LinkTilesBlock } from './LinkTiles/Component'
import { LogoMarqueeBlock } from './LogoMarquee/Component'
import { MediaTextBlock } from './MediaText/Component'
import { OpenRolesBlock } from './OpenRoles/Component'
import { OwnershipBlock } from './Ownership/Component'
import { SectionNavBlock } from './SectionNav/Component'
import { ServiceDetailBlock } from './ServiceDetail/Component'
import { StackedPanelsBlock } from './StackedPanels/Component'
import { StatementBlock } from './Statement/Component'
import { StatementsBlock } from './Statements/Component'
import { StatsCarouselBlock } from './StatsCarousel/Component'
import { TeamDirectoryBlock } from './TeamDirectory/Component'

type Block = NonNullable<Page['layout']>[number]
type BlockType = Block['blockType']

/** blockType (from the CMS) → React component. Add one line here for every new block. */
const components: { [K in BlockType]: ComponentType<Extract<Block, { blockType: K }> & BlockContext> } = {
  hero: HeroBlock,
  mediaText: MediaTextBlock,
  cardCarousel: CardCarouselBlock,
  stackedPanels: StackedPanelsBlock,
  statsCarousel: StatsCarouselBlock,
  logoMarquee: LogoMarqueeBlock as ComponentType<Extract<Block, { blockType: 'logoMarquee' }> & BlockContext>,
  caseStudyGallery: CaseStudyGalleryBlock,
  caseStudyGrid: CaseStudyGridBlock as ComponentType<Extract<Block, { blockType: 'caseStudyGrid' }> & BlockContext>,
  statement: StatementBlock,
  form: FormBlock as ComponentType<Extract<Block, { blockType: 'form' }> & BlockContext>,
  sectionNav: SectionNavBlock,
  leadText: LeadTextBlock,
  statements: StatementsBlock,
  backgroundText: BackgroundTextBlock,
  ownership: OwnershipBlock,
  linkTiles: LinkTilesBlock,
  teamDirectory: TeamDirectoryBlock as ComponentType<Extract<Block, { blockType: 'teamDirectory' }> & BlockContext>,
  groupScale: GroupScaleBlock,
  serviceDetail: ServiceDetailBlock,
  openRoles: OpenRolesBlock as ComponentType<Extract<Block, { blockType: 'openRoles' }> & BlockContext>,
  ctaBanner: CtaBannerBlock as ComponentType<Extract<Block, { blockType: 'ctaBanner' }> & BlockContext>,
}

/** Renders a page's sections in order, skipping hidden ones. Every block also gets the page context. */
export function RenderBlocks({ blocks, page }: { blocks?: Page['layout']; page?: BlockContext['page'] }) {
  if (!blocks?.length) return null
  const navItems = sectionNavItems(blocks)
  // each section's place among visible sections of its kind (e.g. service 2 of 4)
  const visible = blocks.filter((b) => !b.hideSection)
  const positions = new Map(
    visible.map((b) => {
      const same = visible.filter((v) => v.blockType === b.blockType)
      return [b, { index: same.indexOf(b) + 1, count: same.length }] as const
    }),
  )
  return (
    <>
      {blocks.map((block, i) => {
        if (block.hideSection) return null
        const Component = components[block.blockType] as ComponentType<Block & BlockContext> | undefined
        if (!Component) return null
        return <Component key={block.id ?? i} {...block} page={page} navItems={navItems} position={positions.get(block)} />
      })}
    </>
  )
}
