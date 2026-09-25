import { useCallback, useMemo } from 'react'
import type { Skill, User } from '@/shared/types'
import { toSkillCardProps } from '@/entities/skill/model/toSkillCardProps'

export const SECTION_PAGE_SIZE = 3
export const RECOMMENDED_PAGE_SIZE = 9

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function useSections(skills: Skill[], usersById: Map<string, User>) {
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

  const popular = useMemo(() => {
    const newestIds = new Set(newest.map((s) => s.id))
    const remaining = skills.filter((s) => !newestIds.has(s.id))
    return shuffle(remaining).slice(0, SECTION_PAGE_SIZE * 2)
  }, [skills, newest])

  const recommended = useMemo(() => {
    const usedIds = new Set([
      ...newest.map((s) => s.id),
      ...popular.map((s) => s.id),
    ])
    return shuffle(skills.filter((s) => !usedIds.has(s.id)))
  }, [skills, newest, popular])

  const toCards = useCallback(
    (list: Skill[]) =>
      list.flatMap((skill) => {
        const user = usersById.get(skill.authorId)
        if (!user) return []
        return [toSkillCardProps(skill, user)]
      }),
    [usersById],
  )

  const popularCards = useMemo(() => toCards(popular), [toCards, popular])
  const newestCards = useMemo(() => toCards(newest), [toCards, newest])
  const recommendedCards = useMemo(
    () => toCards(recommended),
    [toCards, recommended],
  )

  return {
    popular: popularCards,
    newest: newestCards,
    recommended: recommendedCards,
  }
}