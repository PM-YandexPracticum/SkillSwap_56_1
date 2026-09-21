import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { useFavorite } from './useFavorite'
import { saveAuthUser, clearAuthUser } from '@/features/auth/model/authUtils'
import { LOCAL_STORAGE_KEYS } from '@/shared/lib/constants'

const SKILL_ID = 'skill-1'
const OTHER_SKILL_ID = 'skill-2'

interface FavoriteEntry {
  userId: string
  skillId: string
}

function readStoredFavorites(): FavoriteEntry[] {
  const raw = localStorage.getItem(LOCAL_STORAGE_KEYS.FAVORITES)
  return raw ? (JSON.parse(raw) as FavoriteEntry[]) : []
}

afterEach(() => {
  clearAuthUser()
  localStorage.removeItem(LOCAL_STORAGE_KEYS.FAVORITES)
})

describe('useFavorite', () => {
  it('у гостя клик по лайку ничего не меняет', () => {
    const { result } = renderHook(() => useFavorite(SKILL_ID))

    act(() => result.current.toggle())

    expect(result.current.isFavorite).toBe(false)
    expect(readStoredFavorites()).toHaveLength(0)
  })

  it('у авторизованного пользователя клик добавляет навык в избранное', () => {
    saveAuthUser({ id: 'user-1', name: 'Мария', email: 'maria@test.ru' })
    const { result } = renderHook(() => useFavorite(SKILL_ID))

    act(() => result.current.toggle())

    expect(result.current.isFavorite).toBe(true)
    expect(readStoredFavorites()).toEqual([{ userId: 'user-1', skillId: SKILL_ID }])
  })

  it('повторный клик убирает навык из избранного', () => {
    saveAuthUser({ id: 'user-1', name: 'Мария', email: 'maria@test.ru' })
    const { result } = renderHook(() => useFavorite(SKILL_ID))

    act(() => result.current.toggle())
    act(() => result.current.toggle())

    expect(result.current.isFavorite).toBe(false)
    expect(readStoredFavorites()).toHaveLength(0)
  })

  it('не дублирует id при повторном добавлении одного и того же навыка', () => {
    saveAuthUser({ id: 'user-1', name: 'Мария', email: 'maria@test.ru' })
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.FAVORITES,
      JSON.stringify([{ userId: 'user-1', skillId: SKILL_ID }]),
    )

    const { result } = renderHook(() => useFavorite(SKILL_ID))
    expect(result.current.isFavorite).toBe(true)

    act(() => result.current.toggle())
    expect(readStoredFavorites()).toHaveLength(0)

    act(() => result.current.toggle())
    expect(readStoredFavorites()).toEqual([{ userId: 'user-1', skillId: SKILL_ID }])
  })

  it('избранное разных карточек не пересекается', () => {
    saveAuthUser({ id: 'user-1', name: 'Мария', email: 'maria@test.ru' })
    const { result: first } = renderHook(() => useFavorite(SKILL_ID))
    const { result: second } = renderHook(() => useFavorite(OTHER_SKILL_ID))

    act(() => first.current.toggle())

    expect(first.current.isFavorite).toBe(true)
    expect(second.current.isFavorite).toBe(false)
    expect(readStoredFavorites()).toEqual([{ userId: 'user-1', skillId: SKILL_ID }])
  })
})
