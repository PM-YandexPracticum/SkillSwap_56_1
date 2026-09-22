import { FilterState } from './model/types'

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
  male: 'Мужской пол',
  female: 'Женский пол',
}

export const useActiveChips = (
  filters: FilterState,
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>,
): ActiveChipItem[] => {
  return [
    // 1. Города
    ...filters.cities.map((city) => ({
      id: `city-${city}`,
      label: city,
      onRemove: () =>
        setFilters((prev) => ({
          ...prev,
          cities: prev.cities.filter((c) => c !== city),
        })),
    })),

    // 2. Навыки
    ...filters.skills.map((skill) => ({
      id: `skill-${skill}`,
      label: skill,
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

    // 4. Пол (только конкретный)
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
