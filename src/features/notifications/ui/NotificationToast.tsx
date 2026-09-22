import React from 'react'
import IdeaSvg from '../../../shared/assets/idea.svg?react'
import CrossSvg from '../../../shared/assets/cross.svg?react'
import { Button } from '@/shared/ui/button/Button'
import styles from './NotificationToast.module.css'

interface NotificationToastProps {
  text: string
  showAction?: boolean
  onClose: () => void
  onAction?: () => void
}

export const NotificationToast: React.FC<NotificationToastProps> = ({
  text,
  showAction = false,
  onClose,
  onAction,
}) => {
  return (
    <div className={styles.card}>
      <IdeaSvg />
      <p className={styles.text}>{text} </p>
      <button className={styles.closeBtn} aria-label="закрыть" onClick={onClose}>
        <CrossSvg />
      </button>
      {showAction && onAction && (
        <div className={styles.actionWrapper}>
          <Button className={styles.actionBtn} text="Перейти" onClick={onAction} />
        </div>
      )}
    </div>
  )
}
