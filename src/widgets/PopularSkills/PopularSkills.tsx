import { useMemo, useState } from 'react'
import { SectionHeader } from '@/shared/ui/SectionHeader/SectionHeader'
import { SkillCard, SkillCardProps } from '@/entities/skill/ui/SkillCard'
import styles from './PopularSkills.module.css'

const COLLAPSED_COUNT = 3
const EXPANDED_COUNT = 9

interface PopularSkillsProps {
  skills: SkillCardProps[]
}

export const PopularSkills = ({ skills }: PopularSkillsProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const sortedSkills = useMemo(
    () => [...skills].sort((a, b) => (b.likesCount ?? 0) - (a.likesCount ?? 0)),
    [skills]
  )

  const visibleSkills = sortedSkills.slice(0, isExpanded ? EXPANDED_COUNT : COLLAPSED_COUNT)

  return (
    <section className={styles.popularSkills}>
      <SectionHeader
        title="Популярное"
        showButton={sortedSkills.length > COLLAPSED_COUNT}
        buttonText={isExpanded ? 'Свернуть' : 'Смотреть все'}
        onSeeAllClick={() => setIsExpanded((prev) => !prev)}
      />

      <div className={styles.cards}>
        {visibleSkills.map((skill, index) => (
          <SkillCard key={index} {...skill} withDescription={false} />
        ))}
      </div>
    </section>
  )
}
