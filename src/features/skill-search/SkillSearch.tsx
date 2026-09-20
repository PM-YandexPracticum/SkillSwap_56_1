// вызывает хук, рендерит сетку SkillCard или пустое состояние
import { SkillCard } from '@/entities/skill/ui/SkillCard';
import { useSkillSearch } from './model/useSkillSearch';
import styles from './SkillSearch.module.css';

interface SkillSearchProps {
  query: string;
}

export const SkillSearch = ({ query }: SkillSearchProps) => {
  const { filteredSkills, isEmpty, isSearching, totalCount } =
    useSkillSearch(query);

  if (isEmpty && isSearching) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyTitle}>Ничего не найдено</p>
        <p className={styles.emptyText}>Попробуйте изменить запрос</p>
      </div>
    );
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
          <SkillCard
            key={skill.id}
            user={skill.user}
            teach={skill.teach}
            learn={skill.learn}
            moreTagColor={skill.moreTagColor}
            isLiked={skill.isLiked}
            likesCount={skill.likesCount}
            withButton
            withDescription={false}
            withLikeButton
          />
        ))}
      </div>
    </div>
  );
};