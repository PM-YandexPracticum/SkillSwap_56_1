import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './RegistrationStepOne.module.css'
import { Logo } from '@/shared/ui/Logo/logo'
import { Input } from '@/shared/ui/Input/Input'
import { Button, buttonStyles } from '@/shared/ui/button/Button'
import { SocialAuthButtons } from '@/features/auth/ui/SocialAuthButtons/SocialAuthButtons'
import { ROUTES } from '@/shared/lib/constants'
import eyeIcon from '@/shared/assets/eye.svg'
import lightBulbImage from '@/shared/assets/light-bulb.svg'

const takenEmail = 'petrova@mail.ru'
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const minPasswordLength = 8

interface RegistrationStepOneProps {
  onNext?: () => void
}

export function RegistrationStepOne({ onNext }: RegistrationStepOneProps) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const isPasswordStrong = password.length >= minPasswordLength
  const passwordHint = isPasswordStrong
    ? 'Надёжный'
    : 'Пароль должен содержать не менее 8 знаков'

  const validateEmail = (value: string) => {
    const normalized = value.trim().toLowerCase()

    if (!normalized) {
      return 'Введите email'
    }

    if (!emailPattern.test(normalized)) {
      return 'Некорректный email'
    }

    if (normalized === takenEmail) {
      return 'Email уже используется'
    }

    return ''
  }

  const handleEmailChange = (value: string) => {
    setEmail(value)
    if (emailError) {
      setEmailError('')
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextEmailError = validateEmail(email)
    setEmailError(nextEmailError)

    if (nextEmailError || !isPasswordStrong) {
      return
    }

    onNext?.()
  }

  return (
    <section>
      <header className={styles.header}>
        <Logo />
        <button
          type="button"
          className={styles.closeButton}
          onClick={() => navigate(ROUTES.HOME)}
        >
          <span>Закрыть</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M16.7438 8.28754L8.25847 16.7728C7.96856 17.0627 7.48772 17.0627 7.19781 16.7728C6.9079 16.4829 6.9079 16.0021 7.19781 15.7122L15.6831 7.22688C15.973 6.93697 16.4538 6.93697 16.7438 7.22688C17.0337 7.51679 17.0337 7.99763 16.7438 8.28754Z"
              fill="currentColor"
            />
            <path
              d="M16.7438 16.7728C16.4538 17.0627 15.973 17.0627 15.6831 16.7728L7.19781 8.28755C6.9079 7.99763 6.9079 7.5168 7.19781 7.22689C7.48772 6.93697 7.96856 6.93697 8.25847 7.22689L16.7438 15.7122C17.0337 16.0021 17.0337 16.4829 16.7438 16.7728Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </header>

      <div className={styles.content}>
        <div className={styles.stepIndicator}>
          <span className={styles.stepText}>Шаг 1 из 3</span>
          <div className={styles.stepProgress} aria-hidden="true">
            <span className={styles.stepProgressActive} />
            <span className={styles.stepProgressInactive} />
            <span className={styles.stepProgressInactive} />
          </div>
        </div>

        <div className={styles.columns}>
          <div className={styles.formColumn}>
            <div className={styles.form}>
              <div className={styles.socials}>
                <SocialAuthButtons />
              </div>

              <div className={styles.divider}>или</div>

              <form className={styles.fields} onSubmit={handleSubmit} noValidate>
                <div className={styles.fieldGroup}>
                  <label htmlFor="email">Email</label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Введите email"
                    autoComplete="email"
                    value={email}
                    error={Boolean(emailError)}
                    aria-invalid={Boolean(emailError)}
                    aria-describedby={emailError ? 'email-error' : undefined}
                    onChange={(event) => handleEmailChange(event.target.value)}
                  />
                  {emailError ? (
                    <span id="email-error" className={styles.errorText}>
                      {emailError}
                    </span>
                  ) : null}
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="password">Пароль</label>
                  <div className={styles.passwordWrap}>
                    <Input
                      id="password"
                      type={isPasswordVisible ? 'text' : 'password'}
                      name="password"
                      placeholder="Придумайте надёжный пароль"
                      autoComplete="new-password"
                      value={password}
                      aria-describedby="password-hint"
                      onChange={(event) => setPassword(event.target.value)}
                    />
                    <button
                      type="button"
                      className={styles.eyeButton}
                      aria-label={
                        isPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'
                      }
                      onClick={() => setIsPasswordVisible((visible) => !visible)}
                    >
                      <img src={eyeIcon} alt="" />
                    </button>
                  </div>
                  <span id="password-hint" className={styles.hint}>
                    {passwordHint}
                  </span>
                </div>

                <Button
                  type="submit"
                  text="Далее"
                  className={`${buttonStyles.primary} ${styles.submit}`}
                />
              </form>
            </div>
          </div>

          <div className={styles.infoColumn}>
            <div className={styles.infoImage}>
              <img src={lightBulbImage} alt="" />
            </div>
            <div className={styles.textContainer}>
              <h2>Добро пожаловать в SkillSwap!</h2>
              <p>
                Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками с
                другими людьми
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
