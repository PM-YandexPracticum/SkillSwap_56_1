import { SectionHeader } from '@/shared/ui/SectionHeader/SectionHeader'
import { SkillCard, SkillCardProps } from '@/entities/skill/ui/SkillCard'
import styles from './PopularSkills.module.css'

interface PopularSkillsProps {
  skills: SkillCardProps[]
}

export const PopularSkills = ({ skills }: PopularSkillsProps) => {
  return (
    <section className={styles.popularSkills}>
      <SectionHeader title="Популярное" />

      <div className={styles.cards}>
        {skills.slice(0, 3).map((skill, index) => (
          <SkillCard key={index} {...skill} withDescription={false} />
        ))}
      </div>
    </section>
  )
}
