import { useState } from 'react'
import { SectionHeader } from '@/shared/ui/SectionHeader/SectionHeader'
import { SkillCard } from '@/entities/skill/ui/SkillCard'
import type { SkillCardData } from '@/entities/skill/model/types'
import { SECTION_PAGE_SIZE } from '../../model/useSections'
import styles from './SkillSection.module.css'

interface SkillSectionProps {
  title: string
  cards: SkillCardData[]
  expandable?: boolean
  isLiked: (id: string) => boolean
  onLikeToggle: (id: string) => void
  onNavigate: (id: string) => void
}

export const SkillSection = ({
  title,
  cards,
  expandable = true,
  isLiked,
  onLikeToggle,
  onNavigate,
}: SkillSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const visibleCards =
    expandable && !isExpanded ? cards.slice(0, SECTION_PAGE_SIZE) : cards

  const handleToggle = () => setIsExpanded((prev) => !prev)

  if (cards.length === 0) return null

  const showButton = expandable && cards.length > SECTION_PAGE_SIZE

  return (
    <section className={styles.section}>
      <SectionHeader
        title={title}
        showButton={showButton}
        isExpanded={isExpanded}
        onSeeAllClick={handleToggle}
      />

      <div className={styles.cards}>
        {visibleCards.map((card) => {
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