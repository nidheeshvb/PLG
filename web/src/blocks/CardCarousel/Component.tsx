import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Slider } from '@/components/ui/Slider/Slider'
import type { CardCarouselBlock as CardCarouselBlockData } from '@/payload-types'

import styles from './Component.module.css'
import { ServiceCard } from './ServiceCard'

/** A row of cards; becomes a swipeable slider on smaller screens. */
export function CardCarouselBlock({ eyebrow, title, cards, note, theme, anchorId }: CardCarouselBlockData) {
  const tone = theme === 'dark' ? 'dark' : 'light'
  return (
    <Section id={anchorId} tone={tone} className={[styles.section, styles[tone]].join(' ')}>
      <SectionHeader className={styles.head} eyebrow={eyebrow} title={title} eyebrowClassName={styles.eyebrow} />
      <Slider className={styles.cards} tone={tone} label={title ?? undefined}>
        {cards?.map((card, i) => (
          <ServiceCard key={card.id ?? i} card={card} index={i} />
        ))}
      </Slider>
      {note && (
        <p className={styles.note} data-reveal="">
          {note}
        </p>
      )}
    </Section>
  )
}
