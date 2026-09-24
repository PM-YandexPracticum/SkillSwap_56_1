import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import IdeaIcon from '@/shared/assets/idea.svg?react'
import NotificationIcon from '@/shared/assets/notification.svg?react'
import { useNotifications } from '@/features/notifications/model/useNotifications'
import type { Notification } from '@/features/notifications/model/types'
import styles from './NotificationsPanel.module.css'

export interface NotificationsPanelProps {
  notifications?: Notification[]
}

export const NotificationsPanel = ({ notifications }: NotificationsPanelProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const { unreadNotifications, readNotifications, hasUnread, markAllAsRead, clearRead } =
    useNotifications(notifications)

  const togglePanel = () => setIsOpen((current) => !current)

  const handleNotificationAction = (notification: Notification) => {
    if (notification.isRead || !notification.skillId) {
      return
    }

    navigate(`/skill/${notification.skillId}`)
  }

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

                <button type="button" className={styles.actionLink} onClick={markAllAsRead}>
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
                        <button
                          type="button"
                          className={styles.actionButton}
                          onClick={() => handleNotificationAction(notification)}
                        >
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

                <button type="button" className={styles.actionLink} onClick={clearRead}>
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
