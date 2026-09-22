import { useState } from 'react'
import IdeaIcon from '@/shared/assets/idea.svg?react'
import NotificationIcon from '@/shared/assets/notification.svg?react'
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
  const hasUnread = unreadNotifications.length > 0

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
        <NotificationIcon className={styles.bellIcon} />
        {hasUnread && <span className={styles.badge} />}
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
                      <IdeaIcon />
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
                  <li key={notification.id} className={styles.item}>
                    <div className={styles.itemIcon}>
                      <IdeaIcon />
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