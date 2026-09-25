import { useMemo } from 'react'
import type { SkillCardData } from '@/entities/skill/model/types'

export const useSkillSearch = (query: string, cards: SkillCardData[]) => {
  const filteredSkills = useMemo(() => {
    const trimmed = query.trim().toLowerCase()
    if (!trimmed) return cards

    return cards.filter((card) => {
      const teachMatch = card.teach.teachValue.toLowerCase().includes(trimmed)
      const learnMatch = card.learn.learnValue.some((tag) =>
        tag.value.toLowerCase().includes(trimmed),
      ) 
      return teachMatch || learnMatch
    })
  }, [query, cards])

  return {
    filteredSkills,
    isEmpty: filteredSkills.length === 0,
    isSearching: query.trim().length > 0,
    totalCount: cards.length,
  }
}