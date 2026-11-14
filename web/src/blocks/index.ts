import type { Block } from 'payload'

import { BackgroundTextBlock } from './BackgroundText/config'
import { CardCarouselBlock } from './CardCarousel/config'
import { CaseStudyGalleryBlock } from './CaseStudyGallery/config'
import { CtaBannerBlock } from './CtaBanner/config'
import { FormBlock } from './Form/config'
import { GroupScaleBlock } from './GroupScale/config'
import { HeroBlock } from './Hero/config'
import { LeadTextBlock } from './LeadText/config'
import { LinkTilesBlock } from './LinkTiles/config'
import { LogoMarqueeBlock } from './LogoMarquee/config'
import { MediaTextBlock } from './MediaText/config'
import { OwnershipBlock } from './Ownership/config'
import { SectionNavBlock } from './SectionNav/config'
import { StackedPanelsBlock } from './StackedPanels/config'
import { StatementBlock } from './Statement/config'
import { StatementsBlock } from './Statements/config'
import { StatsCarouselBlock } from './StatsCarousel/config'
import { TeamDirectoryBlock } from './TeamDirectory/config'

/** Every section editors can add to a page, in the order shown in the block picker. */
export const pageBlocks: Block[] = [
  HeroBlock,
  SectionNavBlock,
  LeadTextBlock,
  MediaTextBlock,
  CardCarouselBlock,
  StackedPanelsBlock,
  StatementsBlock,
  BackgroundTextBlock,
  StatsCarouselBlock,
  LogoMarqueeBlock,
  CaseStudyGalleryBlock,
  OwnershipBlock,
  TeamDirectoryBlock,
  GroupScaleBlock,
  StatementBlock,
  LinkTilesBlock,
  CtaBannerBlock,
  FormBlock,
]
