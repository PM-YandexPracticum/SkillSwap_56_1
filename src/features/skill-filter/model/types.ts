import { Skill, User } from '@/shared/types'

export type InteractionMode = 'all' | 'learn' | 'teach'
export type Gender = 'any' | 'male' | 'female'

export interface FilterState {
  interaction: InteractionMode
  categories: string[]
  skills: string[]
  gender: Gender
  cities: string[]
}

export const initialFilterState: FilterState = {
  interaction: 'all',
  categories: [],
  skills: [],
  gender: 'any',
  cities: [],
}

export interface SkillCategory {
  id: string
  title: string
  items: string[]
}

export interface SkillUser extends User {
  gender?: 'Мужской' | 'Женский'
  location?: string
  skillCanTeach?: Skill
  subcategoriesWantToLearn?: Skill[]
}
