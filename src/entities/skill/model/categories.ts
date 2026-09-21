export type CategoryId = string
export type SubcategoryId = string

export interface Category {
  id: CategoryId
  name: string
  subcategories: Subcategory[]
}

export interface Subcategory {
  id: SubcategoryId
  name: string
}

export const SKILL_CATEGORIES: Category[] = [
  {
    id: 'business',
    name: 'Бизнес и карьера',
    subcategories: [
      { id: 'team-management', name: 'Управление командой' },
      { id: 'marketing-and-advertising', name: 'Маркетинг и реклама' },
      { id: 'sales-and-negotiations', name: 'Продажи и переговоры' },
      { id: 'personal-brand', name: 'Личный бренд' },
      { id: 'resume-and-interview', name: 'Резюме и собеседование' },
      { id: 'time-management', name: 'Тайм-менеджмент' },
      { id: 'project-management', name: 'Проектное управление' },
      { id: 'entrepreneurship', name: 'Предпринимательство' },
    ],
  },
  {
    id: 'creativity',
    name: 'Творчество и искусство',
    subcategories: [
      { id: 'drawing-and-illustration', name: 'Рисование и иллюстрация' },
      { id: 'photography', name: 'Фотография' },
      { id: 'video-editing', name: 'Видеомонтаж' },
      { id: 'music-and-sound', name: 'Музыка и звук' },
      { id: 'acting', name: 'Актёрское мастерство' },
      { id: 'creative-writing', name: 'Креативное письмо' },
      { id: 'art-therapy', name: 'Арт-терапия' },
      { id: 'decor-and-diy', name: 'Декор и DIY' },
    ],
  },
  {
    id: 'languages',
    name: 'Иностранные языки',
    subcategories: [
      { id: 'english', name: 'Английский' },
      { id: 'french', name: 'Французский' },
      { id: 'spanish', name: 'Испанский' },
      { id: 'german', name: 'Немецкий' },
      { id: 'chinese', name: 'Китайский' },
      { id: 'japanese', name: 'Японский' },
      { id: 'exam-preparation', name: 'Подготовка к экзаменам (IELTS, TOEFL)' },
    ],
  },
  {
    id: 'education',
    name: 'Образование и развитие',
    subcategories: [
      { id: 'personal-development', name: 'Личностное развитие' },
      { id: 'learning-skills', name: 'Навыки обучения' },
      { id: 'cognitive-techniques', name: 'Когнитивные техники' },
      { id: 'speed-reading', name: 'Скорочтение' },
      { id: 'teaching-skills', name: 'Навыки преподавания' },
      { id: 'coaching', name: 'Коучинг' },
    ],
  },
  {
    id: 'health',
    name: 'Здоровье и лайфстайл',
    subcategories: [
      { id: 'yoga-and-meditation', name: 'Йога и медитация' },
      { id: 'nutrition-and-healthy-lifestyle', name: 'Питание и ЗОЖ' },
      { id: 'mental-health', name: 'Ментальное здоровье' },
      { id: 'mindfulness', name: 'Осознанность' },
      { id: 'physical-training', name: 'Физические тренировки' },
      { id: 'sleep-and-recovery', name: 'Сон и восстановление' },
      { id: 'work-life-balance', name: 'Баланс жизни и работы' },
    ],
  },
  {
    id: 'home',
    name: 'Дом и уют',
    subcategories: [
      { id: 'cleaning-and-organization', name: 'Уборка и организация' },
      { id: 'home-finances', name: 'Домашние финансы' },
      { id: 'cooking', name: 'Приготовление еды' },
      { id: 'houseplants', name: 'Домашние растения' },
      { id: 'home-repair', name: 'Ремонт' },
      { id: 'storage', name: 'Хранение вещей' },
    ],
  },
]

export const getCategoryById = (id: CategoryId): Category | undefined =>
  SKILL_CATEGORIES.find((c) => c.id === id)

export const getSubcategoriesByCategoryId = (id: CategoryId): Subcategory[] =>
  getCategoryById(id)?.subcategories ?? []

export const categoryOptions = SKILL_CATEGORIES.map((c) => ({
  value: c.id,
  label: c.name,
}))

export const getSubcategoryOptions = (categoryIds: CategoryId[]) => {
  const seen = new Set<SubcategoryId>()
  const options: { value: SubcategoryId; label: string }[] = []
  for (const id of categoryIds) {
    for (const sub of getSubcategoriesByCategoryId(id)) {
      if (!seen.has(sub.id)) {
        seen.add(sub.id)
        options.push({ value: sub.id, label: sub.name })
      }
    }
  }
  return options
}
