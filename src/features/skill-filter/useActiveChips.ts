import { SKILL_CATEGORIES } from '@/entities/skill/model/categories'
import { FilterState } from './model/types'
import { CITY_OPTIONS } from '@/entities/city/model/cities'

export interface ActiveChipItem {
  id: string
  label: string
  onRemove: () => void
}

// Словари для отображения человекочитаемых текстов
const INTERACTION_LABELS: Record<NonNullable<FilterState['interaction']>, string> = {
  all: 'Всё',
  learn: 'Хочу научиться',
  teach: 'Могу научить',
}

const GENDER_LABELS: Record<NonNullable<FilterState['gender']>, string> = {
  any: 'Любой пол',
  male: 'Мужской',
  female: 'Женский',
}

const getSkillLabel = (skillId: string): string => {
  for (const category of SKILL_CATEGORIES) {
    const subcategory = category.subcategories.find((sub) => sub.id === skillId)
    if (subcategory) {
      return subcategory.name
    }
  }
  return skillId // Запасной вариант, если ID не найден в справочнике
}

// Вспомогательная функция для поиска названия города по значению
const getCityLabel = (cityValue: string): string => {
  const city = CITY_OPTIONS.find((c) => c.value === cityValue)
  return city ? city.label : cityValue
}

export const useActiveChips = (
  filters: FilterState,
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>,
): ActiveChipItem[] => {
  return [
    // 1. Города
    ...filters.cities.map((city) => ({
      id: `city-${city}`,
      label: getCityLabel(city),
      onRemove: () =>
        setFilters((prev) => ({
          ...prev,
          cities: prev.cities.filter((c) => c !== city),
        })),
    })),

    // 2. Навыки
    ...filters.skills.map((skill) => ({
      id: `skill-${skill}`,
      label: getSkillLabel(skill),
      onRemove: () =>
        setFilters((prev) => ({
          ...prev,
          skills: prev.skills.filter((s) => s !== skill),
        })),
    })),

    // 3. Тип взаимодействия (только 'learn' или 'teach')
    ...(filters.interaction === 'learn' || filters.interaction === 'teach'
      ? [
          {
            id: 'interaction',
            label: INTERACTION_LABELS[filters.interaction],
            onRemove: () => setFilters((prev) => ({ ...prev, interaction: 'all' })),
          },
        ]
      : []),
    // 4. Пол
    ...(filters.gender && filters.gender !== 'any'
      ? [
          {
            id: 'gender',
            label: GENDER_LABELS[filters.gender],
            onRemove: () => setFilters((prev) => ({ ...prev, gender: 'any' })),
          },
        ]
      : []),
  ]
}
