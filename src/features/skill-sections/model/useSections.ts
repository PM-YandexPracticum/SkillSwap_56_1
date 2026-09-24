import { useMemo } from 'react'
import type { Skill, User } from '@/shared/types'
import { toSkillCardProps } from '@/entities/skill/model/toSkillCardProps'

export const SECTION_PAGE_SIZE = 3
export const RECOMMENDED_PAGE_SIZE = 9

/** Перемешать массив (Fisher–Yates) */
function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function useSections(skills: Skill[], usersById: Map<string, User>) {
  // 1. Новое — 3 свежих + 3 на «Смотреть все» (итого 6)
  const newest = useMemo(
    () =>
      [...skills]
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .slice(0, SECTION_PAGE_SIZE * 2),
    [skills],
  )

  // 2. Популярное — 3 рандомных + 3 на «Смотреть все» (итого 6)
  const popular = useMemo(() => {
    const newestIds = new Set(newest.map((s) => s.id))
    const remaining = skills.filter((s) => !newestIds.has(s.id))
    return shuffle(remaining).slice(0, SECTION_PAGE_SIZE * 2)
  }, [skills, newest])

  // 3. Рекомендуем — оставшиеся после «Новое» и «Популярное»
  const recommended = useMemo(() => {
    const usedIds = new Set([
      ...newest.map((s) => s.id),
      ...popular.map((s) => s.id),
    ])
    return shuffle(skills.filter((s) => !usedIds.has(s.id)))
  }, [skills, newest, popular])

  // Преобразуем в карточки
  const toCards = (list: Skill[]) =>
    list.flatMap((skill) => {
      const user = usersById.get(skill.authorId)
      if (!user) return []
      return [toSkillCardProps(skill, user)]
    })

  return {
    popular: toCards(popular),
    newest: toCards(newest),
    recommended: toCards(recommended),
  }
}