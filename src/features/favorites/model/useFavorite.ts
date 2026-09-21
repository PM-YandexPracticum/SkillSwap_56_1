import { useCallback, useState } from 'react'
import { getAuthUser } from '@/features/auth/model/authUtils'
import { isFavoriteSkill, toggleFavoriteSkill } from './favoritesStorage'

interface UseFavoriteResult {
  isFavorite: boolean
  toggle: () => void
}

/** Управляет состоянием «избранного» одной карточки навыка для текущего пользователя */
export function useFavorite(skillId: string): UseFavoriteResult {
  const [isFavorite, setIsFavorite] = useState<boolean>(() => {
    const authUser = getAuthUser()
    if (!authUser) return false
    return isFavoriteSkill(authUser.id, skillId)
  })

  const toggle = useCallback(() => {
    const authUser = getAuthUser()
    if (!authUser) return

    setIsFavorite(toggleFavoriteSkill(authUser.id, skillId))
  }, [skillId])

  return { isFavorite, toggle }
}
