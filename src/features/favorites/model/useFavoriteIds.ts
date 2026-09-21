import { useMemo } from 'react'
import { getAuthUser } from '@/features/auth/model/authUtils'
import { getFavoriteIds } from './favoritesStorage'

/** Возвращает id навыков, добавленных в избранное текущим пользователем */
export function useFavoriteIds(): string[] {
  const authUser = getAuthUser()

  return useMemo(() => {
    if (!authUser) return []
    return getFavoriteIds(authUser.id)
  }, [authUser])
}
