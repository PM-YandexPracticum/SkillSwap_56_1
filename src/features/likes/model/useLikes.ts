import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'skillswap_likes'

type LikesState = Record<string, boolean>

function readLikes(): LikesState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function useLikes() {
  const [likes, setLikes] = useState<LikesState>(() => readLikes())

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(likes))
  }, [likes])

  const isLiked = useCallback(
    (skillId: string) => Boolean(likes[skillId]),
    [likes],
  )

  const toggleLike = useCallback((skillId: string) => {
    setLikes((prev) => {
      const next = { ...prev }
      if (next[skillId]) {
        delete next[skillId]
      } else {
        next[skillId] = true
      }
      return next
    })
  }, [])

  return { isLiked, toggleLike }
}