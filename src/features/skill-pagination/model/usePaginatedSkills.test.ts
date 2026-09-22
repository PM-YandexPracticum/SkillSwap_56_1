import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { fetchSkills } from '@/api/skills'
import type { Skill } from '@/shared/types'
import { LOAD_DELAY_MS, PAGE_SIZE } from './constants'
import { usePaginatedSkills } from './usePaginatedSkills'

vi.mock('@/api/skills', () => ({
  fetchSkills: vi.fn(),
}))

const mockedFetchSkills = vi.mocked(fetchSkills)

const mockSkills: Skill[] = Array.from({ length: 40 }, (_, index) => ({
  id: `skill-${String(index + 1).padStart(3, '0')}`,
  title: `Skill ${index + 1}`,
  description: `Description ${index + 1}`,
  type: 'teach',
  category: 'Образование',
  subcategory: 'Общее',
  tags: [`tag-${index + 1}`],
  imageUrl: null,
  authorId: `user-${String(index + 1).padStart(3, '0')}`,
  likesCount: index,
  createdAt: '2025-01-01T00:00:00.000Z',
}))

describe('usePaginatedSkills', () => {
  beforeEach(() => {
    mockedFetchSkills.mockResolvedValue(mockSkills)
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.clearAllMocks()
  })

  it('показывает первую порцию навыков после загрузки', async () => {
    const { result } = renderHook(() => usePaginatedSkills())

    await act(async () => {
      await Promise.resolve()
    })

    expect(result.current.totalCount).toBe(40)
    expect(result.current.shownCount).toBe(PAGE_SIZE)
    expect(result.current.visibleSkills).toHaveLength(PAGE_SIZE)
    expect(result.current.hasMore).toBe(true)
    expect(result.current.isLoading).toBe(false)
  })

  it('догружает следующую порцию по loadMore', async () => {
    const { result } = renderHook(() => usePaginatedSkills())

    await act(async () => {
      await Promise.resolve()
    })

    act(() => {
      vi.useFakeTimers()
      result.current.loadMore()
    })

    expect(result.current.isLoading).toBe(true)

    act(() => {
      vi.advanceTimersByTime(LOAD_DELAY_MS)
    })

    expect(result.current.isLoading).toBe(false)
    expect(result.current.visibleSkills).toHaveLength(PAGE_SIZE * 2)
    expect(result.current.shownCount).toBe(40)
    expect(result.current.hasMore).toBe(false)
  })

  it('прекращает подгрузку после исчерпания данных', async () => {
    const { result } = renderHook(() => usePaginatedSkills())

    await act(async () => {
      await Promise.resolve()
    })

    act(() => {
      vi.useFakeTimers()
      result.current.loadMore()
    })

    act(() => {
      vi.advanceTimersByTime(LOAD_DELAY_MS)
    })

    expect(result.current.visibleSkills).toHaveLength(40)
    expect(result.current.shownCount).toBe(40)
    expect(result.current.hasMore).toBe(false)

    act(() => {
      result.current.loadMore()
    })

    expect(result.current.visibleSkills).toHaveLength(40)
    expect(result.current.isLoading).toBe(false)
  })

  it('не запускает повторную загрузку, пока предыдущая ещё выполняется', async () => {
    const { result } = renderHook(() => usePaginatedSkills())

    await act(async () => {
      await Promise.resolve()
    })

    act(() => {
      vi.useFakeTimers()
      result.current.loadMore()
      result.current.loadMore()
    })

    expect(result.current.isLoading).toBe(true)

    act(() => {
      vi.advanceTimersByTime(LOAD_DELAY_MS)
    })

    expect(result.current.visibleSkills).toHaveLength(PAGE_SIZE * 2)
  })
})