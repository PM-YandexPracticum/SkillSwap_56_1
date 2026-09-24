import { useNavigate } from 'react-router-dom'
import { Logo } from '../../shared/ui/Logo/logo'
import { Input } from '../../shared/ui/Input/Input'
import { Button } from '../../shared/ui/button/Button'
import AllSkillsMenu from '../AllSkillsMenu/AllSkillsMenu'
import { ROUTES } from '@/shared/lib/constants'
import styles from './GuestHeader.module.css'
import MoonIcon from './moon.svg?react'
import SearchIcon from './search.svg?react'

interface GuestHeaderProps {
  searchQuery?: string
  onSearchChange?: (query: string) => void
}

export const GuestHeader = ({
                              searchQuery = '',
                              onSearchChange,
                            }: GuestHeaderProps) => {
  const navigate = useNavigate()

  return (
    <header className={styles.header}>
      <Logo />

      <nav className={styles.nav}>
        <a href="#">О проекте</a>
        <AllSkillsMenu />
      </nav>

      <div className={styles.search}>
        <SearchIcon />
        <Input
          placeholder="Искать навык"
          value={searchQuery}
          onChange={(e) => onSearchChange?.(e.target.value)}
          style={{
            paddingLeft: '48px',
            border: 'none',
          }}
        />
      </div>

      <button
        type="button"
        aria-label="Переключить тему"
        className={styles.themeButton}
      >
        <MoonIcon />
      </button>

      <div className={styles.authButtons}>
        <Button
          variant="secondary"
          onClick={() => navigate(ROUTES.LOGIN)}
        >
          Войти
        </Button>
        <Button
          variant="primary"
          onClick={() => navigate(ROUTES.REGISTER)}
        >
          Зарегистрироваться
        </Button>
      </div>
    </header>
  )
}
