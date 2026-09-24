import { useMemo } from 'react'
import type { Skill, User } from '@/shared/types'
import { toSkillCardProps } from '@/entities/skill/model/toSkillCardProps'

const SECTION_SIZE = 3
const RECOMMENDED_SIZE = 9

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
        .slice(0, SECTION_SIZE),
    [skills],
  )

  const popular = useMemo(() => {
    const newestIds = new Set(newest.map((s) => s.id))
    const remaining = skills.filter((s) => !newestIds.has(s.id))
    return shuffle(remaining).slice(0, SECTION_SIZE)
  }, [skills, newest])

  const recommended = useMemo(() => {
    const usedIds = new Set([
      ...newest.map((s) => s.id),
      ...popular.map((s) => s.id),
    ])
    const remaining = skills.filter((s) => !usedIds.has(s.id))
    return remaining.slice(0, RECOMMENDED_SIZE)
  }, [skills, newest, popular])

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