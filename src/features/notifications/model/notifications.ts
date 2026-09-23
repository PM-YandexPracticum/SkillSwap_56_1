import type { Notification } from './types'

export const defaultNotifications: Notification[] = [
  {
    id: '1',
    title: 'Николай принял ваш обмен',
    description: 'Перейдите в профиль, чтобы обсудить детали',
    date: 'сегодня',
    isRead: false,
    hasAction: true,
    skillId: 'skill-001',
  },
  {
    id: '2',
    title: 'Татьяна предлагает вам обмен',
    description: 'Примите обмен, чтобы обсудить детали',
    date: 'сегодня',
    isRead: false,
    hasAction: true,
    skillId: 'skill-002',
  },
  {
    id: '3',
    title: 'Олег предлагает вам обмен',
    description: 'Примите обмен, чтобы обсудить детали',
    date: 'вчера',
    isRead: true,
    skillId: 'skill-003',
  },
  {
    id: '4',
    title: 'Игорь принял ваш обмен',
    description: 'Перейдите в профиль, чтобы обсудить детали',
    date: '23 мая',
    isRead: true,
    skillId: 'skill-004',
  },
]