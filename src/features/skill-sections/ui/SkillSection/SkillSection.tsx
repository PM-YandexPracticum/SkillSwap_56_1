import { SectionHeader } from '@/shared/ui/SectionHeader/SectionHeader'
import { SkillCard } from '@/entities/skill/ui/SkillCard'
import type { SkillCardData } from '@/entities/skill/model/types'
import styles from './SkillSection.module.css'

interface SkillSectionProps {
  title: string
  cards: SkillCardData[]
  onSeeAll: () => void
  isLiked: (id: string) => boolean
  onLikeToggle: (id: string) => void
  onNavigate: (id: string) => void
}

export const SkillSection = ({
  title,
  cards,
  onSeeAll,
  isLiked,
  onLikeToggle,
  onNavigate,
}: SkillSectionProps) => {
  if (cards.length === 0) return null

  return (
    <section className={styles.section}>
      <SectionHeader title={title} onSeeAllClick={onSeeAll} />

      <div className={styles.cards}>
        {cards.map((card) => {
          const liked = isLiked(card.id)
          const likesCount = (card.likesCount ?? 0) + (liked ? 1 : 0)

          return (
            <SkillCard
              key={card.id}
              {...card}
              likesCount={likesCount}
              isLiked={liked}
              onLikeToggle={() => onLikeToggle(card.id)}
              withButton
              onNavigate={onNavigate}
              withLikeButton
            />
          )
        })}
      </div>
    </section>
  )
}