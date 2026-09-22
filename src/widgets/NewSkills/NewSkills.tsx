import { useState } from 'react'
import './NewSkills.css'
import { SectionHeader } from '@/shared/ui/SectionHeader/SectionHeader'
import { SkillCard, SkillCardProps } from '@/entities/skill/ui/SkillCard'

interface NewSkillsProps {
  skills: (SkillCardProps & { createdAt?: string })[]
}

export const NewSkills = ({ skills }: NewSkillsProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const sortedSkills = [...skills].sort((a, b) => {
    if (!a.createdAt || !b.createdAt) {
      return 0
    }

    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  const visibleSkills = sortedSkills.slice(0, isExpanded ? 9 : 3)

  return (
    <section className="new-skills">
      <SectionHeader
        title="Новое"
        showButton={sortedSkills.length > 3}
        buttonText={isExpanded ? 'Свернуть' : 'Смотреть все'}
        onSeeAllClick={() => setIsExpanded((prev) => !prev)}
      />

      <div className="new-skills__cards">
        {visibleSkills.map((skill, index) => (
          <SkillCard key={index} {...skill} />
        ))}
      </div>
    </section>
  )
}
