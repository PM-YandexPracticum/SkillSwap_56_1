import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { SKILLS_DATA } from '@/features/skill-search/data/skills'
import type { SkillData } from '@/features/skill-search/data/skills'
import { searchSkills } from '@/features/skill-search/model/searchSkills'
import { LOAD_DELAY_MS, PAGE_SIZE } from './constants'

interface UsePaginatedSkillsResult {
  /** Карточки, доступные на текущем «экране» (порция + уже подгруженные) */
  visibleSkills: SkillData[]
  /** Общее количество результатов с учётом поиска/фильтра */
  totalCount: number
  /** Сколько карточек показано сейчас */
  shownCount: number
  /** Есть ли ещё не подгруженные карточки */
  hasMore: boolean
  /** Идёт ли подгрузка следующей порции */
  isLoading: boolean
  /** Запросить следующую порцию карточек */
  loadMore: () => void
}

/**
 * Порционная выдача моковых данных каталога без реального backend.
 *
 * - Поиск и фильтрация применяются ко всему набору данных (searchSkills),
 *   а пагинация работает поверх отфильтрованного результата.
 * - При смене запроса список сбрасывается на первую порцию.
 * - Подгрузка эмулируется таймером, после исчерпания данных прекращается.
 */
export const usePaginatedSkills = (query: string): UsePaginatedSkillsResult => {
  const filteredSkills = useMemo(() => searchSkills(query, SKILLS_DATA), [query])

  const [visibleCount, setVisibleCount] = useState(() => Math.min(PAGE_SIZE, filteredSkills.length))
  const [isLoading, setIsLoading] = useState(false)

  const timerRef = useRef<number | null>(null)
  const loadingRef = useRef(false)

  const totalCount = filteredSkills.length
  const hasMore = visibleCount < totalCount

  const hasMoreRef = useRef(hasMore)
  useEffect(() => {
    hasMoreRef.current = hasMore
  }, [hasMore])

  // Запрос следующей порции. Рефы защищают от повторного вызова,
  // пока предыдущая порция ещё «грузится».
  const loadMore = useCallback(() => {
    if (loadingRef.current || !hasMoreRef.current) return

    loadingRef.current = true
    setIsLoading(true)

    timerRef.current = window.setTimeout(() => {
      setVisibleCount((prev) => prev + PAGE_SIZE)
      loadingRef.current = false
      setIsLoading(false)
      timerRef.current = null
    }, LOAD_DELAY_MS)
  }, [])

  // Смена поискового запроса/фильтра сбрасывает порционную выдачу.
  useEffect(() => {
    setVisibleCount(Math.min(PAGE_SIZE, filteredSkills.length))
    setIsLoading(false)
    loadingRef.current = false

    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [filteredSkills.length, query])

  // Очистка незавершённой подгрузки при размонтировании.
  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current)
      }
    }
  }, [])

  return {
    visibleSkills: filteredSkills.slice(0, visibleCount),
    totalCount,
    shownCount: Math.min(visibleCount, totalCount),
    hasMore,
    isLoading,
    loadMore,
  }
}
