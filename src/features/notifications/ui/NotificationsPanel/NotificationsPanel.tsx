import { useState } from 'react'
import styles from './NotificationsPanel.module.css'

export interface Notification {
  id: string
  title: string
  description: string
  date: string
  isRead: boolean
  hasAction?: boolean
}

export interface NotificationsPanelProps {
  notifications?: Notification[]
  onMarkAllAsRead?: () => void
  onClearRead?: () => void
}

export const defaultNotifications: Notification[] = [
  {
    id: '1',
    title: 'Николай принял ваш обмен',
    description: 'Перейдите в профиль, чтобы обсудить детали',
    date: 'сегодня',
    isRead: false,
    hasAction: true,
  },
  {
    id: '2',
    title: 'Татьяна предлагает вам обмен',
    description: 'Примите обмен, чтобы обсудить детали',
    date: 'сегодня',
    isRead: false,
    hasAction: true,
  },
  {
    id: '3',
    title: 'Олег предлагает вам обмен',
    description: 'Примите обмен, чтобы обсудить детали',
    date: 'вчера',
    isRead: true,
  },
  {
    id: '4',
    title: 'Игорь принял ваш обмен',
    description: 'Перейдите в профиль, чтобы обсудить детали',
    date: '23 мая',
    isRead: true,
  },
]

export const NotificationsPanel = ({
  notifications = defaultNotifications,
  onMarkAllAsRead,
  onClearRead,
}: NotificationsPanelProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const unreadNotifications = notifications.filter((n) => !n.isRead)
  const readNotifications = notifications.filter((n) => n.isRead)

  const togglePanel = () => setIsOpen(!isOpen)

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={styles.trigger}
        onClick={togglePanel}
        aria-label="Уведомления"
        aria-expanded={isOpen}
      >
        <svg
          className={styles.bellIcon}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.73 21a2 2 0 0 1-3.46 0"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div className={styles.panel}>
          {unreadNotifications.length > 0 && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>Новые уведомления</h3>
                <button
                  type="button"
                  className={styles.actionLink}
                  onClick={onMarkAllAsRead}
                >
                  Прочитать все
                </button>
              </div>
              <ul className={styles.list}>
                {unreadNotifications.map((notification) => (
                  <li key={notification.id} className={styles.item}>
                    <div className={styles.itemIcon}>
                      {/* Лампочка как на макете */}
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M9 18h6M10 22h4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M12 2a7 7 0 0 0-7 7c0 2.5 1.5 4.5 3 6v1h8v-1c1.5-1.5 3-3.5 3-6a7 7 0 0 0-7-7z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </div>
                    <div className={styles.itemContent}>
                      <p className={styles.itemTitle}>{notification.title}</p>
                      <p className={styles.itemDescription}>{notification.description}</p>
                      {notification.hasAction && (
                        <button type="button" className={styles.actionButton}>
                          Перейти
                        </button>
                      )}
                    </div>
                    <span className={styles.itemDate}>{notification.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {readNotifications.length > 0 && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>Просмотренные</h3>
                <button
                  type="button"
                  className={styles.actionLink}
                  onClick={onClearRead}
                >
                  Очистить
                </button>
              </div>
              <ul className={styles.list}>
                {readNotifications.map((notification) => (
                  <li key={notification.id} className={`${styles.item} ${styles.itemRead}`}>
                    <div className={styles.itemIcon}>
                      {/* Лампочка как на макете */}
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M9 18h6M10 22h4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M12 2a7 7 0 0 0-7 7c0 2.5 1.5 4.5 3 6v1h8v-1c1.5-1.5 3-3.5 3-6a7 7 0 0 0-7-7z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </div>
                    <div className={styles.itemContent}>
                      <p className={styles.itemTitle}>{notification.title}</p>
                      <p className={styles.itemDescription}>{notification.description}</p>
                    </div>
                    <span className={styles.itemDate}>{notification.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}