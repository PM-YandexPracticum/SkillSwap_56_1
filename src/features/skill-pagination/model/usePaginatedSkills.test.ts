import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { LOAD_DELAY_MS, PAGE_SIZE } from './constants'
import { usePaginatedSkills } from './usePaginatedSkills'

describe('usePaginatedSkills', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('показывает только первую порцию карточек', () => {
    const { result } = renderHook(() => usePaginatedSkills(''))

    expect(result.current.totalCount).toBe(24)
    expect(result.current.shownCount).toBe(PAGE_SIZE)
    expect(result.current.visibleSkills).toHaveLength(PAGE_SIZE)
    expect(result.current.hasMore).toBe(true)
    expect(result.current.isLoading).toBe(false)
  })

  it('догружает следующую порцию по loadMore', () => {
    const { result } = renderHook(() => usePaginatedSkills(''))

    act(() => {
      result.current.loadMore()
    })

    // во время «загрузки» показывается индикатор
    expect(result.current.isLoading).toBe(true)

    act(() => {
      vi.advanceTimersByTime(LOAD_DELAY_MS)
    })

    expect(result.current.isLoading).toBe(false)
    expect(result.current.visibleSkills).toHaveLength(PAGE_SIZE * 2)
    expect(result.current.hasMore).toBe(true)
  })

  it('прекращает подгрузку после исчерпания данных', () => {
    const { result } = renderHook(() => usePaginatedSkills(''))

    const pagesCount = Math.ceil(24 / PAGE_SIZE)

    for (let i = 0; i < pagesCount + 1; i++) {
      act(() => {
        result.current.loadMore()
      })
      act(() => {
        vi.advanceTimersByTime(LOAD_DELAY_MS)
      })
    }

    expect(result.current.visibleSkills).toHaveLength(24)
    expect(result.current.shownCount).toBe(24)
    expect(result.current.hasMore).toBe(false)

    // повторные вызовы ничего не меняют
    act(() => {
      result.current.loadMore()
    })
    expect(result.current.visibleSkills).toHaveLength(24)
    expect(result.current.isLoading).toBe(false)
  })

  it('сбрасывает порционную выдачу при смене запроса', () => {
    const { result, rerender } = renderHook(
      ({ query }: { query: string }) => usePaginatedSkills(query),
      { initialProps: { query: '' } },
    )

    // догружаем вторую порцию
    act(() => {
      result.current.loadMore()
    })
    act(() => {
      vi.advanceTimersByTime(LOAD_DELAY_MS)
    })
    expect(result.current.visibleSkills).toHaveLength(PAGE_SIZE * 2)

    // поиск сужает выборку и сбрасывает список на первую порцию
    rerender({ query: 'английский' })

    expect(result.current.totalCount).toBeGreaterThan(0)
    expect(result.current.shownCount).toBeLessThanOrEqual(PAGE_SIZE)
    expect(result.current.hasMore).toBe(true)
  })

  it('фильтрация по запросу применяется ко всему набору данных', () => {
    const { result } = renderHook(() => usePaginatedSkills('гитара'))

    expect(result.current.totalCount).toBeGreaterThan(0)
    expect(result.current.totalCount).toBeLessThan(24)
    expect(result.current.visibleSkills.length).toBeLessThanOrEqual(PAGE_SIZE)
  })
})
