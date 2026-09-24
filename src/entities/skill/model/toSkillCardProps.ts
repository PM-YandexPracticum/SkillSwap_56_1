import type { Skill, User } from '@/shared/types'
import { SKILL_CATEGORIES } from './categories'
import type { SkillCardData, LearnTag } from './types'


const tagColors: Record<string, string> = {
  'Бизнес и карьера': 'var(--color-tag-business)',
  'Творчество и искусство': 'var(--color-tag-creativity)',
  'Иностранные языки': 'var(--color-tag-languages)',
  'Образование и развитие': 'var(--color-tag-education)',
  'Дом и уют': 'var(--color-tag-home)',
  'Здоровье и лайфстайл': 'var(--color-tag-health)',
}

// Алиасы: свободные названия из users.json, которые не совпадают с подкатегориями
const skillAliases: Record<string, string> = {
  'Английский язык': 'Иностранные языки',
  'Испанский язык': 'Иностранные языки',
  'Французский язык': 'Иностранные языки',
  'Немецкий язык': 'Иностранные языки',
  'Китайский язык': 'Иностранные языки',
  'Японский язык': 'Иностранные языки',
  'Игра на гитаре': 'Творчество и искусство',
  'Веб-разработка': 'Образование и развитие',
  'Программирование': 'Образование и развитие',
  'Кулинария': 'Дом и уют',
  'Йога': 'Здоровье и лайфстайл',
  'Музыка': 'Творчество и искусство',
  'Танцы': 'Творчество и искусство',
  'Маркетинг': 'Бизнес и карьера',
  'Психология': 'Здоровье и лайфстайл',
  'Пилатес': 'Здоровье и лайфстайл',
  'Шахматы': 'Образование и развитие',
  'Современные танцы': 'Творчество и искусство',
  'Продюсирование музыки': 'Творчество и искусство',
}

function findCategoryBySkillName(skillName: string): string | null {
  const alias = skillAliases[skillName]
  if (alias) return alias

  const lower = skillName.toLowerCase()
  for (const category of SKILL_CATEGORIES) {
    for (const sub of category.subcategories) {
      const subLower = sub.name.toLowerCase()
      if (
        subLower === lower ||
        subLower.includes(lower) ||
        lower.includes(subLower)
      ) {
        return category.name
      }
    }
  }
  return null
}

function getLearnTagColor(skillName: string): string {
  const category = findCategoryBySkillName(skillName)
  if (!category) return 'var(--color-tag-more)'
  return tagColors[category] ?? 'var(--color-tag-more)'
}

export function toSkillCardProps(skill: Skill, user: User): SkillCardData {
  const teachColor = tagColors[skill.category] ?? 'var(--color-tag-more)'

  const learnValue: LearnTag[] = (user.skillsToLearn ?? []).map((name) => ({
    value: name,
    color: getLearnTagColor(name),
  }))

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
      teachTagColor: teachColor,
    },
    learn: {
      learnValue,
    },
    moreTagColor: 'var(--color-tag-more)',
    likesCount: skill.likesCount,
  }
}