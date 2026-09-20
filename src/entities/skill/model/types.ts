// Переэкспортируем доменные типы из shared
export type { Skill, SkillType } from '@/shared/types'

export interface SkillCardData {
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
    learnValue: string[]
    learnTagColor: string
  }
  moreTagColor: string
  likesCount: number
}
