import { renderHook, act } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useNotifications } from './useNotifications'

describe('useNotifications', () => {
  it('разделяет уведомления на новые и просмотренные', () => {
    const { result } = renderHook(() => useNotifications())

    expect(result.current.unreadNotifications).toHaveLength(2)
    expect(result.current.readNotifications).toHaveLength(2)
    expect(result.current.hasUnread).toBe(true)
  })

  it('переводит все новые уведомления в просмотренные', () => {
    const { result } = renderHook(() => useNotifications())

    act(() => {
      result.current.markAllAsRead()
    })

    expect(result.current.unreadNotifications).toHaveLength(0)
    expect(result.current.readNotifications).toHaveLength(4)
    expect(result.current.hasUnread).toBe(false)

    expect(result.current.readNotifications.every((notification) => notification.isRead)).toBe(true)
  })

  it('очищает просмотренные уведомления', () => {
    const { result } = renderHook(() => useNotifications())

    act(() => {
      result.current.clearRead()
    })

    expect(result.current.readNotifications).toHaveLength(0)

    expect(result.current.unreadNotifications).toHaveLength(2)
    expect(result.current.hasUnread).toBe(true)
  })

  it('сохраняет skillId у уведомлений для перехода', () => {
    const { result } = renderHook(() => useNotifications())

    expect(result.current.unreadNotifications[0]).toMatchObject({
      id: '1',
      skillId: 'skill-001',
      isRead: false,
    })

    expect(result.current.unreadNotifications[1]).toMatchObject({
      id: '2',
      skillId: 'skill-002',
      isRead: false,
    })
  })
})
