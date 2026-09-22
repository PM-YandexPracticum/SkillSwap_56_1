import type { Skill, User } from '@/shared/types'
import type { SkillCardData } from './types'

const tagColors: Record<string, string> = {
  'Бизнес': 'var(--color-tag-business)',
  'Творчество и искусство': 'var(--color-tag-creativity)',
  'Языки': 'var(--color-tag-languages)',
  'Образование': 'var(--color-tag-education)',
  'Дом и быт': 'var(--color-tag-home)',
  'Здоровье': 'var(--color-tag-health)',
}

export function toSkillCardProps(skill: Skill, user: User): SkillCardData {
  const tagColor = tagColors[skill.category] ?? 'var(--color-tag-more)'

  return {
    id: skill.id,
    user: {
      avatarUrl: user.avatarUrl,
      name: user.name,
      city: user.city,
      age: user.age,
      description: user.description,
    },
    teach: {
      teachValue: skill.title,
      teachTagColor: tagColor,
    },
    learn: {
      learnValue: user.skillsToLearn,
      learnTagColor: tagColor,
    },
    moreTagColor: 'var(--color-tag-more)',
    likesCount: skill.likesCount,
  }
}
