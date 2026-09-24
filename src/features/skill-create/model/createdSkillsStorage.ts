import type { SkillCardData } from '@/entities/skill/model/types'
import { LOCAL_STORAGE_KEYS } from '@/shared/lib/constants'

/** Читает список навыков, созданных пользователем локально, из localStorage */
export function getCreatedSkills(): SkillCardData[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEYS.CREATED_SKILLS)
    return raw ? (JSON.parse(raw) as SkillCardData[]) : []
  } catch {
    return []
  }
}

function saveCreatedSkills(skills: SkillCardData[]): void {
  localStorage.setItem(LOCAL_STORAGE_KEYS.CREATED_SKILLS, JSON.stringify(skills))
}

/** Сохраняет новый навык в постоянном локальном хранилище */
export function addCreatedSkill(skill: SkillCardData): SkillCardData {
  saveCreatedSkills([...getCreatedSkills(), skill])
  return skill
}
