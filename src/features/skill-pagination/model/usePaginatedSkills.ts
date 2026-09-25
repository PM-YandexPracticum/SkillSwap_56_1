import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchSkills } from '@/api/skills'
import type { Skill } from '@/shared/types'
import { LOAD_DELAY_MS, PAGE_SIZE } from './constants'

interface UsePaginatedSkillsResult {
  /** Все загруженные навыки (для секций) */
  allSkills: Skill[]
  /** Карточки, доступные на текущем «экране» (порция + уже подгруженные) */
  visibleSkills: Skill[]
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
export const usePaginatedSkills = (): UsePaginatedSkillsResult => {
  const [skills, setSkills] = useState<Skill[]>([])
  const [visibleCount, setVisibleCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const timerRef = useRef<number | null>(null)
  const loadingRef = useRef(false)

  useEffect(() => {
    let isMounted = true

    const loadSkills = async () => {
      const data = await fetchSkills()

      if (!isMounted) return

      setSkills(data)
      setVisibleCount(Math.min(PAGE_SIZE, data.length))
    }

    void loadSkills()

    return () => {
      isMounted = false

      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [])

  const totalCount = skills.length
  const hasMore = visibleCount < totalCount

  // Запрос следующей порции. Рефы защищают от повторного вызова,
  // пока предыдущая порция ещё «грузится».
  const loadMore = useCallback(() => {
    if (loadingRef.current || !hasMore) return

    loadingRef.current = true
    setIsLoading(true)

    timerRef.current = window.setTimeout(() => {
      setVisibleCount((prev) =>
        Math.min(prev + PAGE_SIZE, totalCount),
      )

      loadingRef.current = false
      setIsLoading(false)
      timerRef.current = null
    }, LOAD_DELAY_MS)
  }, [hasMore, totalCount])


  return {
    allSkills: skills,
    visibleSkills: skills.slice(0, visibleCount),
    totalCount,
    shownCount: Math.min(visibleCount, totalCount),
    hasMore,
    isLoading,
    loadMore,
  }
}
