import { useState, useEffect } from 'react'
import { Logo } from '@/shared/ui/Logo/logo'
import { Input } from '@/shared/ui/Input/Input'
import { NotificationsPanel } from '@/features/notifications/ui/NotificationsPanel'
import AllSkillsMenu from '../AllSkillsMenu/AllSkillsMenu'
import { UserMenu } from '../UserMenu/UserMenu'
import SearchIcon from '../GuestHeader/search.svg?react'
import MoonIcon from './moon.svg?react'
import FavoriteIcon from './like.svg?react'
import { getAuthUser } from '@/features/auth/model/authUtils'
import styles from './AuthenticatedHeader.module.css'

interface AuthenticatedHeaderProps {
  likesCount?: number
  isLiked?: boolean
  onLikeToggle?: () => void
  searchQuery?: string
  onSearchChange?: (value: string) => void
  notificationsCount?: number
}

export const AuthenticatedHeader = ({
                                      likesCount = 5,
                                      onLikeToggle,
                                      searchQuery = '',
                                      onSearchChange,
                                    }: AuthenticatedHeaderProps) => {
  const [userName, setUserName] = useState('Пользователь')

  useEffect(() => {
    const user = getAuthUser()
    if (user) {
      setUserName(user.name)
    }
  }, [])

  return (
    <header className={styles.header}>
      <Logo />

      <nav className={styles.nav}>
        <a href="#" className={styles.navLink}>О проекте</a>
        <AllSkillsMenu />
      </nav>

      <div className={styles.search}>
        <SearchIcon />
        <Input
          placeholder="Искать навык"
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => onSearchChange?.(e.target.value)}
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

        <UserMenu userName={userName} />
      </div>
    </header>
  )
}
