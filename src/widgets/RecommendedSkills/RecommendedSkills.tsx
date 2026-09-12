import { SectionHeader } from '../../shared/ui/SectionHeader/SectionHeader'
import { SkillCard, SkillCardProps } from '../../entities/skill/ui/SkillCard'
import styles from './RecommendedSkills.module.css'

export interface RecommendedSkillsProps {
  recommendedUsers: SkillCardProps[]
}

export const RecommendedSkills = ({ recommendedUsers }: RecommendedSkillsProps) => {
  return (
    <>
      <SectionHeader title="Рекомендуемое" showButton={false} />
      <ul className={styles.cards}>
        {recommendedUsers.map((user, index) => (
          <li key={index}>
            <SkillCard {...user} />
          </li>
        ))}
      </ul>
    </>
  )
}
