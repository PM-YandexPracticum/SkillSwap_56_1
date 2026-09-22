import { Logo } from '@/shared/ui/Logo/logo'
import { Input } from '@/shared/ui/Input/Input'
import { NotificationsPanel } from '@/features/notifications/ui/NotificationsPanel'
import AllSkillsMenu from '../AllSkillsMenu/AllSkillsMenu'
import SearchIcon from '../GuestHeader/search.svg?react'
import MoonIcon from './moon.svg?react'
import FavoriteIcon from './like.svg?react'
import styles from './AuthenticatedHeader.module.css'

interface AuthenticatedHeaderProps {
  userName?: string
  userAvatar?: string | null
  likesCount?: number
  isLiked?: boolean
  onLikeToggle?: () => void
<<<<<<< HEAD
  searchQuery?: string
  onSearchChange?: (value: string) => void
=======
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
>>>>>>> 7ec2f4e100bbcc1fe7bd11b29dbc2eaa0e604af6
}

export const AuthenticatedHeader = ({
  userName = 'Ким',
  userAvatar,
  likesCount = 5,
  onLikeToggle,
  searchQuery = '',
  onSearchChange,
}: AuthenticatedHeaderProps) => {
  return (
    <header className={styles.header}>
      <Logo />

      <nav className={styles.nav}>
        <a href="#" className={styles.navLink}>О проекте</a>
        <AllSkillsMenu />
      </nav>

      <div className={styles.search}>
        <SearchIcon />
<<<<<<< HEAD
        <Input
          placeholder="Искать навык"
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => onSearchChange?.(e.target.value)}
=======
        <Input 
          placeholder="Искать навык" 
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => onSearchChange?.(e.target.value)} 
>>>>>>> 7ec2f4e100bbcc1fe7bd11b29dbc2eaa0e604af6
        />
      </div>

      <div className={styles.actions}>
        <button type="button" aria-label="Переключить тему" className={styles.iconButton}>
          <MoonIcon />
        </button>

        <NotificationsPanel />

        <div className={styles.iconWrapper}>
          <button
            type="button"
            aria-label="Избранное"
            className={styles.iconButton}
            onClick={onLikeToggle}
          >
            <FavoriteIcon />
          </button>
          {likesCount > 0 && <span className={styles.badge}>{likesCount}</span>}
        </div>

        <div className={styles.userWrapper}>
          <span className={styles.userName}>{userName}</span>
          <img
            src={userAvatar ?? '/src/shared/assets/defaultAvatar.svg'}
            alt={userName}
            className={styles.avatar}
          />
        </div>
      </div>
    </header>
  )
}