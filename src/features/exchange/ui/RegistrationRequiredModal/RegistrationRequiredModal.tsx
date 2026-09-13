import { Button } from '@/shared/ui/Button/Button'
import defaultAvatarUrl from '@/shared/assets/defaultAvatar.svg'
import styles from './RegistrationRequiredModal.module.css'

interface RegistrationRequiredModalProps {
  onClose: () => void
}

export const RegistrationRequiredModal = ({ onClose }: RegistrationRequiredModalProps) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.iconWrapper}>
          <img src={defaultAvatarUrl} alt="" className={styles.icon} loading="eager" />
        </div>

        <h2 className={styles.title}>Нужна регистрация</h2>
        <p className={styles.subtitle}>
          Чтобы предложить обмен, войдите в систему или зарегистрируйтесь
        </p>

        <Button className={styles.button} text="Зарегистрироваться" />
      </div>
    </div>
  )
}
