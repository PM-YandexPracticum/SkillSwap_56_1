import { LOCAL_STORAGE_KEYS } from '@/shared/lib/constants'

interface FavoriteEntry {
  userId: string
  skillId: string
}

function getAllFavorites(): FavoriteEntry[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEYS.FAVORITES)
    return raw ? (JSON.parse(raw) as FavoriteEntry[]) : []
  } catch {
    return []
  }
}

function saveAllFavorites(entries: FavoriteEntry[]): void {
  localStorage.setItem(LOCAL_STORAGE_KEYS.FAVORITES, JSON.stringify(entries))
}

/** Возвращает id избранных навыков конкретного пользователя */
export function getFavoriteIds(userId: string): string[] {
  return getAllFavorites()
    .filter((entry) => entry.userId === userId)
    .map((entry) => entry.skillId)
}

export function isFavoriteSkill(userId: string, skillId: string): boolean {
  return getAllFavorites().some(
    (entry) => entry.userId === userId && entry.skillId === skillId,
  )
}

/**
 * Переключает избранное для навыка: добавляет id в список пользователя,
 * если его там ещё нет, иначе удаляет. Дубликаты исключены за счёт
 * проверки на существование записи перед добавлением.
 * Возвращает новое состояние (true — навык теперь в избранном).
 */
export function toggleFavoriteSkill(userId: string, skillId: string): boolean {
  const all = getAllFavorites()
  const exists = all.some(
    (entry) => entry.userId === userId && entry.skillId === skillId,
  )

  const next = exists
    ? all.filter((entry) => !(entry.userId === userId && entry.skillId === skillId))
    : [...all, { userId, skillId }]

  saveAllFavorites(next)
  return !exists
}
