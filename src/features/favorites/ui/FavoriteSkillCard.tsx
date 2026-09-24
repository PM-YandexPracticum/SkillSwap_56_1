import { SkillCard, type SkillCardProps } from '@/entities/skill/ui/SkillCard'
import { useFavorite } from '../model/useFavorite'

type FavoriteSkillCardProps = Omit<SkillCardProps, 'isLiked' | 'onLikeToggle'> & {
    onFavoriteChange?: () => void
  }

/**
 * SkillCard, подключённая к избранному текущего пользователя.
 * Хранит бизнес-логику лайка в features/favorites/model,
 * сам SkillCard и LikeButton остаются презентационными.
 */
export const FavoriteSkillCard = ({
  onFavoriteChange,
  ...props
}: FavoriteSkillCardProps) => {
  const { isFavorite, toggle } = useFavorite(props.id)
  const handleToggle = () => {
    toggle()
    onFavoriteChange?.()
  }

  return <SkillCard {...props} isLiked={isFavorite} onLikeToggle={handleToggle} />
}
