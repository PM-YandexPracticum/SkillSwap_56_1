// TODO: реализовать страницу FavoritesPage
import styles from '../FavoritesPage/FavoritesPage.module.css';
import { AuthenticatedHeader } from '../../widgets/AuthenticatedHeader/AuthenticatedHeader';
import { Footer } from '../../widgets/Footer/Footer';
import requestsIcon from '../../shared/assets/requests.svg';
import exchangesIcon from '../../shared/assets/exchanges.svg';
import favoritesIcon from '../../shared/assets/favorites.svg';
import skillsIcon from '../../shared/assets/skills.svg';
import profileIcon from '../../shared/assets/profile.svg';
import { SkillCard, SkillCardProps } from '../../entities/skill/ui/SkillCard';
import { mock } from '../../entities/skill/ui/mock';

const favorites = [{...mock, withButton: true}];

export default function FavoritesPage() {
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
            <a href="#" className={styles.navItem}>
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
        <ul className={styles.cards}>
        {favorites.map((card, index) => (
          <li key={index}>
            <SkillCard {...card} />
          </li>
        ))}
        </ul>
    </main>
    <Footer/>
    </>
  )
}
