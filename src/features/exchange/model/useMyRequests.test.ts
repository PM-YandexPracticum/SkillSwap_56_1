import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { useMyRequests } from './useMyRequests'
import { saveAuthUser, clearAuthUser } from '@/features/auth/model/authUtils'
import { LOCAL_STORAGE_KEYS } from '@/shared/lib/constants'
import type { SwapRequest } from '@/shared/types'

const CURRENT_USER_ID = 'user-1'
const OTHER_USER_ID = 'user-2'

function seedRequests(requests: SwapRequest[]): void {
  localStorage.setItem(LOCAL_STORAGE_KEYS.REQUESTS, JSON.stringify(requests))
}

function readStoredRequests(): SwapRequest[] {
  const raw = localStorage.getItem(LOCAL_STORAGE_KEYS.REQUESTS)
  return raw ? (JSON.parse(raw) as SwapRequest[]) : []
}

function makeRequest(overrides: Partial<SwapRequest>): SwapRequest {
  return {
    id: 'req-1',
    skillId: 'skill-1',
    fromUserId: OTHER_USER_ID,
    toUserId: CURRENT_USER_ID,
    status: 'pending',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
    ...overrides,
  }
}

afterEach(() => {
  clearAuthUser()
  localStorage.removeItem(LOCAL_STORAGE_KEYS.REQUESTS)
})

describe('useMyRequests', () => {
  it('делит заявки на входящие и исходящие для текущего пользователя', () => {
    saveAuthUser({ id: CURRENT_USER_ID, name: 'Мария', email: 'maria@test.ru' })
    seedRequests([
      makeRequest({ id: 'incoming', fromUserId: OTHER_USER_ID, toUserId: CURRENT_USER_ID }),
      makeRequest({ id: 'outgoing', fromUserId: CURRENT_USER_ID, toUserId: OTHER_USER_ID }),
      makeRequest({ id: 'unrelated', fromUserId: OTHER_USER_ID, toUserId: 'user-3' }),
    ])

    const { result } = renderHook(() => useMyRequests())

    expect(result.current.incoming.map((r) => r.id)).toEqual(['incoming'])
    expect(result.current.outgoing.map((r) => r.id)).toEqual(['outgoing'])
  })

  it('принятие входящей заявки переводит её в статус «В работе» и сохраняет в localStorage', () => {
    saveAuthUser({ id: CURRENT_USER_ID, name: 'Мария', email: 'maria@test.ru' })
    seedRequests([makeRequest({ id: 'incoming', status: 'pending' })])

    const { result } = renderHook(() => useMyRequests())

    act(() => result.current.accept('incoming'))

    expect(result.current.incoming[0].status).toBe('inProgress')
    expect(readStoredRequests()[0].status).toBe('inProgress')
  })

  it('отклонение входящей заявки переводит её в статус «Отклонена»', () => {
    saveAuthUser({ id: CURRENT_USER_ID, name: 'Мария', email: 'maria@test.ru' })
    seedRequests([makeRequest({ id: 'incoming', status: 'pending' })])

    const { result } = renderHook(() => useMyRequests())

    act(() => result.current.reject('incoming'))

    expect(result.current.incoming[0].status).toBe('rejected')
    expect(readStoredRequests()[0].status).toBe('rejected')
  })

  it('завершение обмена в работе переводит его в статус «Завершена»', () => {
    saveAuthUser({ id: CURRENT_USER_ID, name: 'Мария', email: 'maria@test.ru' })
    seedRequests([makeRequest({ id: 'incoming', status: 'inProgress' })])

    const { result } = renderHook(() => useMyRequests())

    act(() => result.current.complete('incoming'))

    expect(result.current.incoming[0].status).toBe('done')
    expect(readStoredRequests()[0].status).toBe('done')
  })

  it('без авторизации не возвращает заявки', () => {
    seedRequests([makeRequest({ id: 'incoming' })])

    const { result } = renderHook(() => useMyRequests())

    expect(result.current.incoming).toHaveLength(0)
    expect(result.current.outgoing).toHaveLength(0)
  })
})
