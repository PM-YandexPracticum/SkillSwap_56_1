import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { useProposeExchange } from './useProposeExchange'
import { saveAuthUser, clearAuthUser } from '@/features/auth/model/authUtils'
import { LOCAL_STORAGE_KEYS } from '@/shared/lib/constants'
import type { SwapRequest } from '@/shared/types'

const SKILL_ID = 'skill-1'
const AUTHOR_ID = 'author-1'

function readStoredRequests(): SwapRequest[] {
  const raw = localStorage.getItem(LOCAL_STORAGE_KEYS.REQUESTS)
  return raw ? (JSON.parse(raw) as SwapRequest[]) : []
}

afterEach(() => {
  clearAuthUser()
  localStorage.removeItem(LOCAL_STORAGE_KEYS.REQUESTS)
})

describe('useProposeExchange', () => {
  it('гостю показывает модалку регистрации и не создаёт запрос', () => {
    const { result } = renderHook(() => useProposeExchange({ skillId: SKILL_ID, toUserId: AUTHOR_ID }))

    act(() => result.current.proposeExchange())

    expect(result.current.modal).toBe('registrationRequired')
    expect(result.current.isProposed).toBe(false)
    expect(readStoredRequests()).toHaveLength(0)
  })

  it('авторизованному пользователю сохраняет запрос и показывает подтверждение', () => {
    saveAuthUser({ id: 'user-1', name: 'Мария', email: 'maria@test.ru' })
    const { result } = renderHook(() => useProposeExchange({ skillId: SKILL_ID, toUserId: AUTHOR_ID }))

    act(() => result.current.proposeExchange())

    expect(result.current.modal).toBe('created')
    expect(result.current.isProposed).toBe(true)
    expect(readStoredRequests()).toHaveLength(1)
    expect(readStoredRequests()[0]).toMatchObject({
      skillId: SKILL_ID,
      fromUserId: 'user-1',
      toUserId: AUTHOR_ID,
      status: 'pending',
    })
  })

  it('повторный вызов после успешного предложения не создаёт дубликат', () => {
    saveAuthUser({ id: 'user-1', name: 'Мария', email: 'maria@test.ru' })
    const { result } = renderHook(() => useProposeExchange({ skillId: SKILL_ID, toUserId: AUTHOR_ID }))

    act(() => result.current.proposeExchange())
    act(() => result.current.closeModal())
    act(() => result.current.proposeExchange())

    expect(readStoredRequests()).toHaveLength(1)
  })

  it('если запрос уже существовал до монтирования, сразу считает обмен предложенным', () => {
    saveAuthUser({ id: 'user-1', name: 'Мария', email: 'maria@test.ru' })
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.REQUESTS,
      JSON.stringify([
        {
          id: 'existing',
          skillId: SKILL_ID,
          fromUserId: 'user-1',
          toUserId: AUTHOR_ID,
          status: 'pending',
          createdAt: '2026-01-01T00:00:00.000Z',
          updatedAt: '2026-01-01T00:00:00.000Z',
        },
      ]),
    )

    const { result } = renderHook(() => useProposeExchange({ skillId: SKILL_ID, toUserId: AUTHOR_ID }))

    expect(result.current.isProposed).toBe(true)
    expect(result.current.modal).toBe('none')

    act(() => result.current.proposeExchange())

    expect(readStoredRequests()).toHaveLength(1)
    expect(result.current.modal).toBe('none')
  })
})
