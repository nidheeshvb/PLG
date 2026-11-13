import type { Block } from 'payload'

import { CardCarouselBlock } from './CardCarousel/config'
import { CaseStudyGalleryBlock } from './CaseStudyGallery/config'
import { FormBlock } from './Form/config'
import { HeroBlock } from './Hero/config'
import { LogoMarqueeBlock } from './LogoMarquee/config'
import { MediaTextBlock } from './MediaText/config'
import { StackedPanelsBlock } from './StackedPanels/config'
import { StatementBlock } from './Statement/config'
import { StatsCarouselBlock } from './StatsCarousel/config'

/** Every section editors can add to a page, in the order shown in the block picker. */
export const pageBlocks: Block[] = [
  HeroBlock,
  MediaTextBlock,
  CardCarouselBlock,
  StackedPanelsBlock,
  StatsCarouselBlock,
  LogoMarqueeBlock,
  CaseStudyGalleryBlock,
  StatementBlock,
  FormBlock,
]
