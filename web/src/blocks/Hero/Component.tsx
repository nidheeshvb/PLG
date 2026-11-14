import type { BlockContext } from '@/blocks/context'
import type { HeroBlock as HeroBlockData } from '@/payload-types'

import { PageHero } from './variants/PageHero'
import { ShowreelHero } from './variants/ShowreelHero'

/** Picks the hero variant. */
export function HeroBlock(props: HeroBlockData & BlockContext) {
  switch (props.variant) {
    case 'page':
      return <PageHero {...props} />
    case 'showreel':
    default:
      return <ShowreelHero {...props} />
  }
}
