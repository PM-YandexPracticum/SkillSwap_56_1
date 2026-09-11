import './NewSkills.css'
import { SectionHeader } from '@/shared/ui/SectionHeader/SectionHeader'
import { SkillCard, SkillCardProps } from '@/entities/skill/ui/SkillCard'

interface NewSkillsProps {
  skills: SkillCardProps[]
}

export const NewSkills = ({ skills }: NewSkillsProps) => {
  return (
    <section className="new-skills">
      <SectionHeader title="Новое" />

      <div className="new-skills__cards">
        {skills.slice(0, 3).map((skill, index) => (
          <SkillCard key={index} {...skill} />
        ))}
      </div>
    </section>
  )
}


