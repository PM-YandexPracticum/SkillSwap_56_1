import styles from '../FavoritesPage/FavoritesPage.module.css'
import { AuthenticatedHeader } from '../../widgets/AuthenticatedHeader/AuthenticatedHeader'
import { Footer } from '../../widgets/Footer/Footer'
import requestsIcon from '../../shared/assets/requests.svg'
import exchangesIcon from '../../shared/assets/exchanges.svg'
import favoritesIcon from '../../shared/assets/favorites.svg'
import skillsIcon from '../../shared/assets/skills.svg'
import profileIcon from '../../shared/assets/profile.svg'
import { FavoriteSkillCard } from '@/features/favorites/ui/FavoriteSkillCard'
import { SKILLS_DATA } from '@/features/skill-search/data/skills'
import { useFavoriteIds } from '@/features/favorites/model/useFavoriteIds'

export default function FavoritesPage() {
  const favoriteIds = useFavoriteIds()
  const favoriteSkills = SKILLS_DATA.filter((skill) => favoriteIds.includes(skill.id))

  return (
    <>
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
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>Пока нет избранных навыков</p>
        )}
      </main>
      <Footer />
    </>
  )
}
