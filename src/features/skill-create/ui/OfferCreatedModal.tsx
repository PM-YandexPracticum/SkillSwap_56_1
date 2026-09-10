
import { Button } from '@/shared/ui/button/Button';

import circleOutlineUrl from '@/shared/assets/circle-outline.svg';
import checkmarkUrl from '@/shared/assets/checkmark.svg';

import styles from './OfferCreatedModal.module.css';

interface OfferCreatedModalProps {
  onClose: () => void;
}

export const OfferCreatedModal = ({ onClose }: OfferCreatedModalProps) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.iconWrapper}>
          {/* circle here */}
          <img
            src={circleOutlineUrl}
            alt="круг"
            className={styles.circleImg}
            loading="eager"
          />
          {/* checkmark here */}
          <img
            src={checkmarkUrl}
            alt="галочка"
            className={styles.checkmarkImg}
            loading="eager"
          />
        </div>

        <h2 className={styles.title}>Ваше предложение создано</h2>
        <p className={styles.subtitle}>Теперь вы можете предложить обмен</p>

        <Button
          className={styles.button}
          text="Готово"
          onClick={onClose}
        />
      </div>
    </div>
  );
};
