import { createPortal } from 'react-dom'
import FocusTrap from 'focus-trap-react'

import { Button } from '@/shared/ui/button/Button'

import bellUrl from '@/shared/assets/bell.svg'

import styles from './ExchangeCreatedModal.module.css'

interface ExchangeCreatedModalProps {
  onClose: () => void
  buttonText?: string
}

export const ExchangeCreatedModal = ({
  onClose,
  buttonText = 'Готово',
}: ExchangeCreatedModalProps) => {
  return createPortal(
    <FocusTrap
      focusTrapOptions={{
        returnFocusOnDeactivate: true,
        escapeDeactivates: false,
      }}
    >
      <div
        className={styles.overlay}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="exchange-created-title"
      >
        <div
          className={styles.modalContainer}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.iconWrapper}>
            <img src={bellUrl} alt="" className={styles.bellImg} loading="eager" />
          </div>

          <h2 id="exchange-created-title" className={styles.title}>
            Вы предложили обмен
          </h2>
          <p className={styles.subtitle}>
            Теперь дождитесь подтверждения. Вам придёт уведомление
          </p>

          <Button className={styles.button} text={buttonText} onClick={onClose} />
        </div>
      </div>
    </FocusTrap>,
    document.body,
  )
}
