import { FavoriteSkillCard } from '@/features/favorites/ui/FavoriteSkillCard'
import type { SkillCardData } from '@/entities/skill/model/types'
import { useSkillSearch } from './model/useSkillSearch'
import styles from './SkillSearch.module.css'

interface SkillSearchProps {
  query: string
  cards: SkillCardData[]
}

export const SkillSearch = ({ query, cards }: SkillSearchProps) => {
  const { filteredSkills, isEmpty, isSearching, totalCount } =
    useSkillSearch(query, cards)

  if (isEmpty && isSearching) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyTitle}>Ничего не найдено</p>
        <p className={styles.emptyText}>Попробуйте изменить запрос</p>
      </div>
    )
  }

  return (
    <div className={styles.results}>
      <p className={styles.counter}>
        {isSearching
          ? `Найдено: ${filteredSkills.length} из ${totalCount}`
          : `Все навыки: ${totalCount}`}
      </p>
      <div className={styles.grid}>
        {filteredSkills.map((skill) => (
          <FavoriteSkillCard
            key={skill.id}
            id={skill.id}
            user={skill.user}
            teach={skill.teach}
            learn={skill.learn}
            moreTagColor={skill.moreTagColor}
            likesCount={skill.likesCount}
            withButton
            withDescription={false}
            withLikeButton
          />
        ))}
      </div>
    </div>
  )
}