import { useMemo } from 'react'
import { FilterState, SkillUser } from './model/types'
import { Skill } from '@/shared/types'

export const useFilteredUsers = (
  users: SkillUser[],
  skills: Skill[],
  filters: FilterState,
): SkillUser[] => {
  return useMemo(() => {
    return users.filter((user) => {
      // 1. Фильтр по полу
      if (filters.gender !== 'any') {
        const genderText = filters.gender === 'male' ? 'Мужской' : 'Женский'
        if (user.gender !== genderText) return false
      }

      // 2. Фильтр по городу
      if (filters.cities.length > 0) {
        if (!user.location || !filters.cities.includes(user.location)) return false
      }

      // 3. Фильтр по типу взаимодействия и навыкам
      const hasSelectedCategories = filters.categories.length > 0
      const hasSelectedSkills = filters.skills.length > 0

      // Вспомогательная функция проверки совпадения навыка
      const matchSkill = (skill?: {
        id: string | number
        title?: string
        name?: string
        categoryId?: string
      }) => {
        if (!skill) return false

        const skillName = skill.name || skill.title || ''
        const skillId = String(skill.id)

        // Проверка по конкретным навыкам
        const matchSpecificSkill = hasSelectedSkills
          ? filters.skills.includes(skillName) || filters.skills.includes(skillId)
          : false

        // Проверка по категориям
        const matchCategory = hasSelectedCategories
          ? Boolean(skill.categoryId && filters.categories.includes(skill.categoryId))
          : false

        if (hasSelectedCategories && hasSelectedSkills) {
          return matchCategory || matchSpecificSkill
        }

        if (hasSelectedCategories) return matchCategory
        if (hasSelectedSkills) return matchSpecificSkill

        return true
      }

      // Проверка для "Хочу научиться"
      const matchesLearn = () => {
        if (!user.subcategoriesWantToLearn || user.subcategoriesWantToLearn.length === 0) {
          return false
        }
        return user.subcategoriesWantToLearn.some(matchSkill)
      }

      // Проверка для "Могу научить"
      const matchesTeach = () => {
        if (!user.skillCanTeach) return false

        if (Array.isArray(user.skillCanTeach)) {
          return user.skillCanTeach.some(matchSkill)
        }

        return matchSkill(user.skillCanTeach)
      }

      const hasAnySkillFilter = hasSelectedCategories || hasSelectedSkills

      if (filters.interaction === 'learn') {
        if (!matchesLearn()) return false
      } else if (filters.interaction === 'teach') {
        if (!matchesTeach()) return false
      } else if (hasAnySkillFilter) {
        // Режим 'all' (Всё) + выбраны категории или навыки
        if (!matchesLearn() && !matchesTeach()) return false
      }

      return true
    })
  }, [users, skills, filters])
}
