import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/shared/lib/constants'
import { Button } from '../../shared/ui/Button/Button'
import errorImage from '../../shared/assets/page-error-404.svg'
import styles from './NotFoundPage.module.css'

export default function NotFoundPage() {
  const navigate = useNavigate()

  const handleClickToHome = () => {
    navigate(ROUTES.HOME)
  }

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <div className={styles.message}>
          <img
            src={errorImage}
            alt="Страница не найдена"
            className={styles.image}
          />

          <h1 className={styles.title}>Страница не найдена</h1>

          <p className={styles.description}>
            К сожалению, эта страница недоступна. Вернитесь на главную страницу
            или попробуйте позже
          </p>
        </div>

        <div className={styles.actions}>
          <Button
            text="Сообщить об ошибке"
            className={`${styles.button} ${styles.secondaryButton}`}
          />

          <Button
            text="На главную"
            className={`${styles.button} ${styles.primaryButton}`}
            onClick={handleClickToHome}
          />
        </div>
      </div>
    </main>
  )
}