import { useEffect, useMemo, useState } from 'react'
import type { Skill, User } from '@/shared/types'
import { fetchSkills } from '@/api/skills'
import { fetchUsers } from '@/api/users'
import { toSkillCardProps } from '@/entities/skill/model/toSkillCardProps'

import styles from '../FavoritesPage/FavoritesPage.module.css'
import { AuthenticatedHeader } from '../../widgets/AuthenticatedHeader/AuthenticatedHeader'
import { Footer } from '../../widgets/Footer/Footer'
import requestsIcon from '../../shared/assets/requests.svg'
import exchangesIcon from '../../shared/assets/exchanges.svg'
import favoritesIcon from '../../shared/assets/favorites.svg'
import skillsIcon from '../../shared/assets/skills.svg'
import profileIcon from '../../shared/assets/profile.svg'
import { FavoriteSkillCard } from '@/features/favorites/ui/FavoriteSkillCard'
import { useFavoriteIds } from '@/features/favorites/model/useFavoriteIds'
import { Button } from '@/shared/ui/button/Button'
import { ROUTES } from '@/shared/lib/constants'
import { useNavigate } from 'react-router-dom'

export default function FavoritesPage() {
  const navigate = useNavigate()
  const [, setFavoritesUpdate] = useState(false)
  const favoriteIds = useFavoriteIds()

  const [skills, setSkills] = useState<Skill[]>([])
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const load = async () => {
      const [skillsData, usersData] = await Promise.all([
        fetchSkills(),
        fetchUsers(),
      ])
      setSkills(skillsData)
      setUsers(usersData)
    }
    void load()
  }, [])

  const usersById = useMemo(
    () => new Map(users.map((user) => [user.id, user])),
    [users],
  )

  const favoriteSkills = useMemo(
    () =>
      skills.flatMap((skill) => {
        if (!favoriteIds.includes(skill.id)) return []
        const user = usersById.get(skill.authorId)
        if (!user) return []
        return [toSkillCardProps(skill, user)]
      }),
    [skills, usersById, favoriteIds],
  )

  return (
    <div className={styles.pageWrapper}>
      <AuthenticatedHeader />
      <main className={styles.main}>
        <aside className={styles.sidebar}>
          <nav className={styles.navList}>
            <a href="#" className={styles.navItem}>
              <img src={requestsIcon} alt="Заявки" className={styles.sidebarIcon} />
              <span>Заявки</span>
            </a>
            <a href="#" className={styles.navItem}>
              <img src={exchangesIcon} alt="Мои обмены" className={styles.sidebarIcon} />
              <span>Мои обмены</span>
            </a>
            <a href="#" className={`${styles.navItem} ${styles.active}`}>
              <img src={favoritesIcon} alt="Избранное" className={styles.sidebarIcon} />
              <span>Избранное</span>
            </a>
            <a href="#" className={styles.navItem}>
              <img src={skillsIcon} alt="Мои навыки" className={styles.sidebarIcon} />
              <span>Мои навыки</span>
            </a>
            <a href="#" className={styles.navItem}>
              <img src={profileIcon} alt="Личные данные" className={styles.sidebarIcon} />
              <span>Личные данные</span>
            </a>
          </nav>
        </aside>

        {favoriteSkills.length > 0 ? (
          <ul className={styles.cards}>
            {favoriteSkills.map((skill) => (
              <li key={skill.id}>
                <FavoriteSkillCard
                  id={skill.id}
                  user={skill.user}
                  teach={skill.teach}
                  learn={skill.learn}
                  moreTagColor={skill.moreTagColor}
                  likesCount={skill.likesCount}
                  withButton
                  withLikeButton
                  onFavoriteChange={() => setFavoritesUpdate((prev) => !prev)}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>Пока нет избранных навыков</p>
            <Button
              onClick={() => navigate(ROUTES.HOME)}
              className={`${styles.button} ${styles.primaryButton}`}
            >Вернуться в каталог</Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}