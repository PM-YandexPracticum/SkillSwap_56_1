export interface Notification {
  id: string
  title: string
  description: string
  date: string
  isRead: boolean
  hasAction?: boolean
  skillId?: string
}