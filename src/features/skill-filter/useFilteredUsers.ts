import { useMemo } from 'react'
import { FilterState } from './model/types'
import { User } from '@/shared/types'
import { CITY_OPTIONS } from '@/entities/city/model/cities'
import { SKILL_CATEGORIES } from '@/entities/skill/model/categories'

// Получение русского названия города по его value
const getCityLabel = (cityValue: string): string => {
  const city = CITY_OPTIONS.find((c) => c.value === cityValue)
  return city ? city.label : cityValue
}

// Получение всех связанных русских названий для ID навыка или категории
const getSkillNamesById = (id: string): string[] => {
  const names: string[] = []

  for (const category of SKILL_CATEGORIES) {
    // 1. Если id совпадает с ID всей категории, берем названия всех ее подкатегорий
    if (category.id === id) {
      names.push(category.name)
      category.subcategories.forEach((sub) => names.push(sub.name))
      return names
    }

    // 2. Если id совпадает с подкатегорией
    const subcategory = category.subcategories.find((sub) => sub.id === id)
    if (subcategory) {
      names.push(subcategory.name)
      return names
    }
  }

  return [id]
}

export const useFilteredUsers = (users: User[], filters: FilterState): User[] => {
  return useMemo(() => {
    // 1. Преобразуем выбранные ID городов в названия
    const selectedCityNames = filters.cities.map(getCityLabel)

    // 2. Собираем все русские названия выбранных навыков
    const selectedSkillNames = filters.skills
      .flatMap(getSkillNamesById)
      .map((name) => name.toLowerCase())

    return users.filter((user) => {
      // --- Фильтр по полу ---
      if (filters.gender && filters.gender !== 'any' && user.gender !== filters.gender) {
        return false
      }

      // --- Фильтр по городам ---
      if (selectedCityNames.length > 0) {
        const isCityMatch = selectedCityNames.some(
          (cityName) => cityName.toLowerCase() === user.city.toLowerCase(),
        )
        if (!isCityMatch) return false
      }

      // --- Фильтр по навыкам ---
      if (selectedSkillNames.length > 0) {
        const userSkills = (user.skillsToLearn || []).map((s) => s.toLowerCase())

        // Проверяем, есть ли пересечение между навыками пользователя и выбранными фильтрами
        const hasMatchingSkill = selectedSkillNames.some((filterSkill) =>
          userSkills.some(
            (userSkill) =>
              // Подходит, если одно название содержит другое или они совпадают
              userSkill.includes(filterSkill) || filterSkill.includes(userSkill),
          ),
        )

        if (!hasMatchingSkill) return false
      }

      return true
    })
  }, [users, filters])
}
