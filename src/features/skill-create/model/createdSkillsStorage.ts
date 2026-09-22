import type { SkillData } from '@/features/skill-search/data/skills'
import { LOCAL_STORAGE_KEYS } from '@/shared/lib/constants'

/** Читает список навыков, созданных пользователем локально, из localStorage */
export function getCreatedSkills(): SkillData[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEYS.CREATED_SKILLS)
    return raw ? (JSON.parse(raw) as SkillData[]) : []
  } catch {
    return []
  }
}

function saveCreatedSkills(skills: SkillData[]): void {
  localStorage.setItem(LOCAL_STORAGE_KEYS.CREATED_SKILLS, JSON.stringify(skills))
}

/** Сохраняет новый навык в постоянном локальном хранилище */
export function addCreatedSkill(skill: SkillData): SkillData {
  saveCreatedSkills([...getCreatedSkills(), skill])
  return skill
}
