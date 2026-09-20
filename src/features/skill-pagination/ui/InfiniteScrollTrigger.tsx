import { useEffect, useRef } from 'react'
import styles from './InfiniteScrollTrigger.module.css'

interface InfiniteScrollTriggerProps {
  /** Есть ли ещё не подгруженные карточки */
  hasMore: boolean
  /** Идёт ли подгрузка следующей порции */
  isLoading: boolean
  /** Вызывается при приближении к нижней части списка */
  onLoadMore: () => void
}

/**
 * Невидимый «сторож» в конце списка карточек.
 * Когда он попадает в область видимости (или вблизи неё),
 * запрашивается следующая порция данных. Во время подгрузки
 * показывается краткий индикатор загрузки.
 */
export const InfiniteScrollTrigger = ({
  hasMore,
  isLoading,
  onLoadMore,
}: InfiniteScrollTriggerProps) => {
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sentinel = sentinelRef.current

    // IntersectionObserver может отсутствовать в старых окружениях/тестах
    if (!sentinel || !hasMore || typeof IntersectionObserver === 'undefined') {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !isLoading) {
          onLoadMore()
        }
      },
      { rootMargin: '300px 0px' },
    )

    observer.observe(sentinel)

    return () => observer.disconnect()
  }, [hasMore, isLoading, onLoadMore])

  // Данные исчерпаны — больше ничего не показываем и не наблюдаем.
  if (!hasMore) return null

  return (
    <div ref={sentinelRef} className={styles.trigger} role="status" aria-live="polite">
      {isLoading && (
        <div className={styles.loader}>
          <span className={styles.spinner} aria-hidden="true" />
          <span className={styles.text}>Загружаем ещё...</span>
        </div>
      )}
    </div>
  )
}
