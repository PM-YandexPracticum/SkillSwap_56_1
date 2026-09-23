import { useMemo, useState } from 'react'
import { defaultNotifications } from './notifications'
import type { Notification } from './types'

interface UseNotificationsResult {
  unreadNotifications: Notification[]
  readNotifications: Notification[]
  hasUnread: boolean
  markAllAsRead: () => void
  clearRead: () => void
}

export const useNotifications = (
  initialNotifications: Notification[] = defaultNotifications,
): UseNotificationsResult => {
  const [unreadNotifications, setUnreadNotifications] = useState(() =>
    initialNotifications.filter((notification) => !notification.isRead),
  )

  const [readNotifications, setReadNotifications] = useState(() =>
    initialNotifications.filter((notification) => notification.isRead),
  )

  const markAllAsRead = () => {
    setReadNotifications((currentRead) => [
      ...currentRead,
      ...unreadNotifications.map((notification) => ({
        ...notification,
        isRead: true,
      })),
    ])

    setUnreadNotifications([])
  }

  const clearRead = () => {
    setReadNotifications([])
  }

  const hasUnread = useMemo(() => unreadNotifications.length > 0, [unreadNotifications])

  return {
    unreadNotifications,
    readNotifications,
    hasUnread,
    markAllAsRead,
    clearRead,
  }
}
