import { createPortal } from 'react-dom'
import FocusTrap from 'focus-trap-react'

import { Button } from '@/shared/ui/button/Button'

import circleOutlineUrl from '@/shared/assets/circle-outline.svg'
import checkmarkUrl from '@/shared/assets/checkmark.svg'

import styles from './OfferCreatedModal.module.css'

interface OfferCreatedModalProps {
  onClose: () => void
  buttonText?: string
}

export const OfferCreatedModal = ({
                                    onClose,
                                    buttonText = 'Готово',
                                  }: OfferCreatedModalProps) => {
  return createPortal(
    <FocusTrap
      focusTrapOptions={{
        returnFocusOnDeactivate: true, // return focus on the previous element
        escapeDeactivates: false, // off incorporated esc not to repeat the closure
      }}
    >
      <div
        className={styles.overlay}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="offer-created-title"
      >
        <div
          className={styles.modalContainer}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.iconWrapper}>
            <img
              src={circleOutlineUrl}
              alt=""
              className={styles.circleImg}
              loading="eager"
            />
            <img
              src={checkmarkUrl}
              alt=""
              className={styles.checkmarkImg}
              loading="eager"
            />
          </div>

          <h2 id="offer-created-title" className={styles.title}>
            Ваше предложение создано
          </h2>
          <p className={styles.subtitle}>
            Теперь вы можете предложить обмен
          </p>

          <Button
            className={styles.button}
            onClick={onClose}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </FocusTrap>,
    document.body,
  )
}
