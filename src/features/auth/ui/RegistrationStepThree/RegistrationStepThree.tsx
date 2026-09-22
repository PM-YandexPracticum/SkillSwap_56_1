import styles from './RegistrationStepThree.module.css'
import { Logo } from '@/shared/ui/Logo/logo'
import { Input } from '@/shared/ui/Input/Input'
import { Select } from '@/shared/ui/Select'
import { Button, buttonStyles } from '@/shared/ui/button/Button'
import { Textarea } from '@/shared/ui/Textarea'
import onboardingImg from './step-three-img.svg'
import { categoryOptions } from '@/entities/skill/model/categories'
import { useCategorySubcategorySelection } from '@/features/skill-category-selection/model/useCategorySubcategorySelection'

export const RegistrationStepThree: React.FC = () => {
  const {
    categoryIds,
    subcategoryIds,
    subcategoryOptions,
    handleCategoriesChange,
    handleSubcategoriesChange,
  } = useCategorySubcategorySelection()

  return (
    <section>
      {/* Шапка */}
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

      {/* Индикатор прогресса */}
      <div className={styles.progress}>
        <span className={styles.stepText}>Шаг 3 из 3</span>

        <div className={styles.stepProgress}>
          <span className={styles.stepProgressActive} />
          <span className={styles.stepProgressActive} />
          <span className={styles.stepProgressActive} />
        </div>
      </div>

      <div className={styles.content}>
        {/* Форма */}
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          {/* Название навыка */}
          <div>
            <label>Название навыка</label>
            <Input type="text" placeholder="Введите название вашего навыка" />
          </div>

          {/* Категория */}
          <div>
            <Select
              multiple
              label="Категория навыка"
              placeholder="Выберите категорию навыка"
              options={categoryOptions}
              value={categoryIds}
              onChange={handleCategoriesChange}
            />
          </div>

          {/* Подкатегория */}
          <div>
            <Select
              multiple
              label="Подкатегория навыка"
              placeholder="Выберите подкатегорию навыка"
              options={subcategoryOptions}
              value={subcategoryIds}
              onChange={handleSubcategoriesChange}
            />
          </div>

          {/* Описание навыка */}
          <div>
            <label>Описание</label>
            <Textarea placeholder="Коротко опишите, чему можете научить" rows={3} />
          </div>

          {/* Загрузка фотографий */}
          <div className={styles.photoUpload}>
            <p className={styles.photoText}>Перетащите или выберите изображения навыка</p>
            <button type="button" className={styles.imgButton}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.20951 10.837C7.79555 10.837 6.65137 9.6928 6.65137 8.27884C6.65137 6.86489 7.79555 5.7207 9.20951 5.7207C10.6235 5.7207 11.7676 6.86489 11.7676 8.27884C11.7676 9.6928 10.6235 10.837 9.20951 10.837ZM9.20951 7.11605C8.56765 7.11605 8.04672 7.63698 8.04672 8.27884C8.04672 8.9207 8.56765 9.44163 9.20951 9.44163C9.85137 9.44163 10.3723 8.9207 10.3723 8.27884C10.3723 7.63698 9.85137 7.11605 9.20951 7.11605Z"
                  fill="#508826"
                />
                <path
                  d="M14.7907 22H9.2093C4.15814 22 2 19.8419 2 14.7907V9.2093C2 4.15814 4.15814 2 9.2093 2H12.9302C13.3116 2 13.6279 2.31628 13.6279 2.69767C13.6279 3.07907 13.3116 3.39535 12.9302 3.39535H9.2093C4.92093 3.39535 3.39535 4.92093 3.39535 9.2093V14.7907C3.39535 19.0791 4.92093 20.6047 9.2093 20.6047H14.7907C19.0791 20.6047 20.6047 19.0791 20.6047 14.7907V10.1395C20.6047 9.75814 20.9209 9.44186 21.3023 9.44186C21.6837 9.44186 22 9.75814 22 10.1395V14.7907C22 19.8419 19.8419 22 14.7907 22Z"
                  fill="#508826"
                />
                <path
                  d="M20.6045 6.18636H15.4882C15.1068 6.18636 14.7905 5.87009 14.7905 5.48869C14.7905 5.10729 15.1068 4.79102 15.4882 4.79102H20.6045C20.9859 4.79102 21.3022 5.10729 21.3022 5.48869C21.3022 5.87009 20.9859 6.18636 20.6045 6.18636Z"
                  fill="#508826"
                />
                <path
                  d="M18.0463 8.74405C17.6649 8.74405 17.3486 8.42777 17.3486 8.04638V2.9301C17.3486 2.5487 17.6649 2.23242 18.0463 2.23242C18.4277 2.23242 18.744 2.5487 18.744 2.9301V8.04638C18.744 8.42777 18.4277 8.74405 18.0463 8.74405Z"
                  fill="#508826"
                />
                <path
                  d="M3.32078 19.1636C3.09753 19.1636 2.87427 19.0519 2.74404 18.8566C2.53008 18.5403 2.61381 18.1031 2.93009 17.8892L7.51613 14.8101C8.52078 14.1403 9.90683 14.2147 10.8185 14.9868L11.1254 15.2566C11.5906 15.6566 12.3812 15.6566 12.8371 15.2566L16.7068 11.9357C17.7022 11.0892 19.2464 11.0892 20.2417 11.9357L21.758 13.238C22.0464 13.4892 22.0836 13.9264 21.8324 14.224C21.5812 14.5124 21.144 14.5496 20.8464 14.2985L19.3301 12.9961C18.865 12.5961 18.0743 12.5961 17.6185 12.9961L13.7487 16.3171C12.7626 17.1636 11.2092 17.1636 10.2138 16.3171L9.90683 16.0473C9.47892 15.6845 8.77195 15.6473 8.29753 15.9729L3.72078 19.0519C3.59055 19.1264 3.45102 19.1636 3.32078 19.1636Z"
                  fill="#508826"
                />
              </svg>
              <span>Выбрать изображения</span>
            </button>
          </div>

          {/* Кнопки навигации */}
          <div className={styles.buttons}>
            <Button type="button" text="Назад" className={buttonStyles.secondary} />
            <Button type="button" text="Продолжить" className={buttonStyles.primary} />
          </div>
        </form>

        {/* Онбординг */}
        <div className={styles.onboarding}>
          <div className={styles.onboardingImage}>
            <img src={onboardingImg} />
          </div>
          <div className={styles.onboardingText}>
            <h2>Укажите, чем вы готовы поделиться</h2>
            <p>Так другие люди смогут увидеть ваши предложения и предложить вам обмен!</p>
          </div>
        </div>
      </div>
    </section>
  )
}
