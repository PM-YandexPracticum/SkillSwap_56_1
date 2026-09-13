import styles from './RegistrationStepTwo.module.css'
import { Logo } from '@/shared/ui/Logo/logo'
import { Input } from '@/shared/ui/Input/Input'
import { Select } from '@/shared/ui/Select'
import { Button, buttonStyles } from '@/shared/ui/button/Button'
import { citiesData, skillsData } from './mockData'
import avatarAddIcon from './Icon+Add.svg'
import infoImage from './user-info.svg'
import calendarIcon from './calendar.svg'

const genderOptions = [
  { value: 'not-specified', label: 'Не указан' },
  { value: 'male', label: 'Мужской' },
  { value: 'female', label: 'Женский' },
]

const cityOptions = citiesData.map((city) => ({
  value: city,
  label: city,
}))

const categoryOptions = skillsData.map((category) => ({
  value: category.id,
  label: category.title,
}))

const subcategoryOptions = skillsData.flatMap((category) =>
  category.items.map((item) => ({
    value: item,
    label: item,
  })),
)

export function RegistrationStepTwo() {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <Logo />
        <button type="button" className={styles.closeButton}>
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
          <span className={styles.stepText}>Шаг 2 из 3</span>

          <div className={styles.stepProgress}>
            <span className={styles.stepProgressActive} />
            <span className={styles.stepProgressActive} />
            <span className={styles.stepProgressInactive} />
          </div>
        </div>
        <div className={styles.columns}>
          <div className={styles.formColumn}>
            <button type="button" className={styles.avatarButton} aria-label="Добавить аватар">
              <img src={avatarAddIcon} alt="" />
            </button>

            <div className={styles.form}>
              <div className={styles.fieldGroup}>
                <label htmlFor="name">Имя</label>
                <Input id="name" type="text" placeholder="Введите имя" />
              </div>

              <div className={styles.formRow}>
                <div className={styles.dateField}>
                  <label htmlFor="birthDate">Дата рождения</label>
                  <div className={styles.dateInput}>
                    <Input id="birthDate" type="text" placeholder="дд.мм.гггг" />

                    <button
                      type="button"
                      className={styles.calendarButton}
                      aria-label="Открыть календарь"
                    >
                      <img src={calendarIcon} alt="" />
                    </button>
                  </div>
                </div>
                <Select
                  label="Пол"
                  value={null}
                  onChange={() => {}}
                  options={genderOptions}
                  placeholder="Выберите пол"
                />
              </div>

              <Select
                label="Город"
                value={null}
                onChange={() => {}}
                options={cityOptions}
                placeholder="Выберите город"
                searchable
              />

              <Select
                multiple
                label="Категория навыка, которому хотите научиться"
                value={[]}
                onChange={() => {}}
                options={categoryOptions}
                placeholder="Выберите категорию"
              />

              <Select
                multiple
                label="Подкатегория навыка, которому хотите научиться"
                value={[]}
                onChange={() => {}}
                options={subcategoryOptions}
                placeholder="Выберите подкатегорию"
              />
            </div>
            <div className={styles.actions}>
              <Button type="button" text="Назад" className={buttonStyles.secondary} />
              <Button type="button" text="Продолжить" className={buttonStyles.primary} />
            </div>
          </div>

          <div className={styles.infoColumn}>
            <div className={styles.infoImage}>
              <img src={infoImage} alt="Иллюстрация" />
            </div>
            <div className={styles.textContainer}>
              <h2>Расскажите немного о себе</h2>
              <p>Это поможет другим людям лучше вас узнать, чтобы выбрать для обмена</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
