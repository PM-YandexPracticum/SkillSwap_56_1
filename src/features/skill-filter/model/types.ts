export type Gender = 'any' | 'male' | 'female'

export interface FilterState {
  cities: string[]
  skills: string[]
  gender: Gender
  interaction?: 'all' | 'learn' | 'teach'
}

export const initialFilterState: FilterState = {
  cities: [],
  skills: [],
  gender: 'any',
  interaction: 'all',
}
