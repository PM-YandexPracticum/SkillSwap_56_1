import { SectionHeader } from '../../shared/ui/SectionHeader/SectionHeader'
import { SkillCard, SkillCardProps } from '../../entities/skill/ui/SkillCard'
import styles from './RecommendedSkills.module.css'
import { useEffect, useState, useRef, useMemo } from 'react'

const shuffle = (items: SkillCardProps[]) => {
  const shuffled = [...items]

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1))

    ;[shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]]
  }

  return shuffled
}

export interface RecommendedSkillsProps {
  recommendedUsers: SkillCardProps[]
}

export const RecommendedSkills = ({ recommendedUsers }: RecommendedSkillsProps) => {
  const [visibleCount, setVisibleCount] = useState(12)
  const loadMoreRef = useRef<HTMLLIElement>(null)
  const isLoadingRef = useRef(false)
  const [isLoading, setIsLoading] = useState(false)
  const shuffled = useMemo(() => shuffle(recommendedUsers), [recommendedUsers])

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0]

      if (entry.isIntersecting && visibleCount < 12 && !isLoadingRef.current) {
        setIsLoading(true)
        isLoadingRef.current = true

        timeout = setTimeout(() => {
          setVisibleCount(12)

          setIsLoading(false)
          isLoadingRef.current = false
        }, 500)
      }
    })

    const element = loadMoreRef.current

    if (element) {
      observer.observe(element)
    }

    return () => {
      observer.disconnect()

      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [visibleCount, shuffled.length])

  return (
    <>
      <SectionHeader title="Рекомендуемое" showButton={false} />
      <ul className={styles.cards}>
        {shuffled.slice(0, visibleCount).map((user, index) => (
          <li key={index}>
            <SkillCard {...user} />
          </li>
        ))}

        {isLoading && (
          <li className={styles.loaderItem}>
            <div className={styles.loader} aria-label="Загрузка" />
          </li>
        )}

        <li ref={loadMoreRef} className={styles.loadMore} aria-hidden="true" />
      </ul>
    </>
  )
}
