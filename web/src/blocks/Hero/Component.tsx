import type { HeroBlock as HeroBlockData } from '@/payload-types'

import { ShowreelHero } from './variants/ShowreelHero'

/** Picks the hero variant. Inner-page variant ("page") is added with the inner pages. */
export function HeroBlock(props: HeroBlockData) {
  switch (props.variant) {
    case 'showreel':
    default:
      return <ShowreelHero {...props} />
  }
}
