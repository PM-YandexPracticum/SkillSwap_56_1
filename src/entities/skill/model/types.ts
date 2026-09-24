// Переэкспортируем доменные типы из shared
export type { Skill, SkillType } from '@/shared/types'

export interface LearnTag {
  value: string
  color: string
}
export interface SkillCardData {
  id: string
  user: {
    avatarUrl: string | null
    name: string
    city: string
    age: number
    description: string
  }
  teach: {
    teachValue: string
    teachTagColor: string
  }
  learn: {
    learnValue: LearnTag[]
  }
  moreTagColor: string
  likesCount: number
}
