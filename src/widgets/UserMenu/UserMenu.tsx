import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import defaultAvatar from '@/shared/assets/defaultAvatar.svg'
import { ROUTES } from '@/shared/lib/constants'
import { clearAuthUser } from '@/features/auth/model/authUtils'
import styles from './UserMenu.module.css'

interface UserMenuProps {
  userName: string
  userAvatar?: string | null
}

export const UserMenu = ({ userName, userAvatar }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const handleToggle = () => {
    setIsOpen((prev) => !prev)
  }

  const handleProfileClick = () => {
    setIsOpen(false)
    navigate(ROUTES.PROFILE)
  }

  const handleLogout = () => {
    //console.log('1. Нажали “Выйти”')
    clearAuthUser()
   // console.log('2. Вызвали clearAuthUser')
    navigate(ROUTES.HOME, { replace: true })
   // console.log('3. Вызвали navigate')
  }


  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.userButton}
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <span className={styles.userName}>{userName}</span>

        <img
          src={userAvatar ?? defaultAvatar}
          alt={userName}
          className={styles.avatar}
        />
      </button>

      {isOpen && (
        <div className={styles.menu} role="menu">
          <button
            type="button"
            className={styles.menuItem}
            role="menuitem"
            onClick={handleProfileClick}
          >
            Личный кабинет
          </button>

          <button
            type="button"
            className={styles.menuItem}
            role="menuitem"
            onClick={handleLogout}
          >
            <span>Выйти из аккаунта</span>

            <svg
              className={styles.logoutIcon}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M14 8V6C14 4.89543 13.1046 4 12 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H12C13.1046 20 14 19.1046 14 18V16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M10 12H20M20 12L17 9M20 12L17 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
