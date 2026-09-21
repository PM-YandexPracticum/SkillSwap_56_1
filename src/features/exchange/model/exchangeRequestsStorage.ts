import type { SwapRequest } from '@/shared/types'
import { LOCAL_STORAGE_KEYS } from '@/shared/lib/constants'

/** Читает список локальных запросов на обмен из localStorage */
export function getExchangeRequests(): SwapRequest[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEYS.REQUESTS)
    return raw ? (JSON.parse(raw) as SwapRequest[]) : []
  } catch {
    return []
  }
}

function saveExchangeRequests(requests: SwapRequest[]): void {
  localStorage.setItem(LOCAL_STORAGE_KEYS.REQUESTS, JSON.stringify(requests))
}

/** Ищет уже существующий запрос конкретного пользователя на конкретный навык */
export function findExchangeRequest(
  skillId: string,
  fromUserId: string,
  toUserId: string,
): SwapRequest | undefined {
  return getExchangeRequests().find(
    (request) =>
      request.skillId === skillId &&
      request.fromUserId === fromUserId &&
      request.toUserId === toUserId,
  )
}

/**
 * Имитирует отправку предложения обмена: сохраняет запрос локально.
 * Идемпотентна — повторный вызов для той же пары навык/пользователи
 * не создаёт дубликат, а возвращает уже существующую запись.
 */
export function createExchangeRequest(
  skillId: string,
  fromUserId: string,
  toUserId: string,
): SwapRequest {
  const existing = findExchangeRequest(skillId, fromUserId, toUserId)
  if (existing) return existing

  const now = new Date().toISOString()
  const request: SwapRequest = {
    id: `req_${skillId}_${fromUserId}_${Date.now()}`,
    skillId,
    fromUserId,
    toUserId,
    status: 'pending',
    createdAt: now,
    updatedAt: now,
  }

  saveExchangeRequests([...getExchangeRequests(), request])
  return request
}
