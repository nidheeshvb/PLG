import type { ComponentType } from 'react'

import type { Page } from '@/payload-types'

import { CardCarouselBlock } from './CardCarousel/Component'
import { CaseStudyGalleryBlock } from './CaseStudyGallery/Component'
import { FormBlock } from './Form/Component'
import { HeroBlock } from './Hero/Component'
import { LogoMarqueeBlock } from './LogoMarquee/Component'
import { MediaTextBlock } from './MediaText/Component'
import { StackedPanelsBlock } from './StackedPanels/Component'
import { StatementBlock } from './Statement/Component'
import { StatsCarouselBlock } from './StatsCarousel/Component'

type Block = NonNullable<Page['layout']>[number]
type BlockType = Block['blockType']

/** blockType (from the CMS) → React component. Add one line here for every new block. */
const components: { [K in BlockType]: ComponentType<Extract<Block, { blockType: K }>> } = {
  hero: HeroBlock,
  mediaText: MediaTextBlock,
  cardCarousel: CardCarouselBlock,
  stackedPanels: StackedPanelsBlock,
  statsCarousel: StatsCarouselBlock,
  logoMarquee: LogoMarqueeBlock as ComponentType<Extract<Block, { blockType: 'logoMarquee' }>>,
  caseStudyGallery: CaseStudyGalleryBlock,
  statement: StatementBlock,
  form: FormBlock,
}

/** Renders a page's sections in order, skipping hidden ones. */
export function RenderBlocks({ blocks }: { blocks?: Page['layout'] }) {
  if (!blocks?.length) return null
  return (
    <>
      {blocks.map((block, i) => {
        if (block.hideSection) return null
        const Component = components[block.blockType] as ComponentType<Block> | undefined
        if (!Component) return null
        return <Component key={block.id ?? i} {...block} />
      })}
    </>
  )
}
