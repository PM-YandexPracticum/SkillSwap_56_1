import styles from './FiltersSidebar.module.css'
import RadioButtonUI from '@/shared/ui/Radio/Radio'
import { skillsData, citiesData } from './mockData'
import { CheckboxUI } from '@/shared/ui/Checkbox/CheckboxUI'
import { useState } from 'react'

const FiltersSidebar = () => {
  // Открытые категории навыков
  const [openCategories, setOpenCategories] = useState<string[]>([])

  // Показывать все категории
  const [showAllCategories, setShowAllCategories] = useState(false)

  // Показывать все города
  const [showAllCities, setShowAllCities] = useState(false)

  const toggleCategory = (categoryName: string) => {
    setOpenCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((name) => name !== categoryName)
        : [...prev, categoryName],
    )
  }

  return (
    <aside className={styles.sidebar}>
      {/* Шапка */}
      <div className={styles.header}>
        <h2 className={styles.title}>Фильтры</h2>
        <button type="button" className={styles.resetButton} aria-label="Сбросить фильтры">
          <span>Сбросить</span>
          <span aria-hidden="true">×</span>
        </button>
      </div>
      {/* Тип взаимодействия */}
      <div className={styles.options}>
        <RadioButtonUI
          text="Всё"
          name="interaction"
          value="all"
          checked={false}
          onChange={() => {}}
        />

        <RadioButtonUI
          text="Хочу научиться"
          name="interaction"
          value="learn"
          checked={false}
          onChange={() => {}}
        />

        <RadioButtonUI
          text="Могу научить"
          name="interaction"
          value="teach"
          checked={false}
          onChange={() => {}}
        />
      </div>
      {/* Навыки */}
      <div className={styles.categorySection}>
        <h3 className={styles.categoryTitle}>Навыки</h3>

        <div className={styles.categories}>
          {(showAllCategories ? skillsData : skillsData.slice(0, 6)).map((category) => {
            const isOpen = openCategories.includes(category.id)

            return (
              <div key={category.id} className={styles.category}>
                <div className={styles.categoryHeader}>
                  <CheckboxUI
                    name="category"
                    value={category.id}
                    text={category.title}
                    checked={false}
                    onChange={() => {}}
                  />

                  <button
                    type="button"
                    className={styles.categoryToggle}
                    onClick={() => toggleCategory(category.id)}
                    aria-label={
                      isOpen
                        ? `Закрыть категорию ${category.title}`
                        : `Открыть категорию ${category.title}`
                    }
                  >
                    <svg
                      className={`${styles.categoryArrow} ${
                        isOpen ? styles.categoryArrowOpen : ''
                      }`}
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M12 15.9354C11.3539 15.9354 10.7078 15.6862 10.2186 15.197L4.20075 9.17912C3.93308 8.91145 3.93308 8.46842 4.20075 8.20075C4.46842 7.93308 4.91145 7.93308 5.17912 8.20075L11.197 14.2186C11.64 14.6617 12.36 14.6617 12.803 14.2186L18.8209 8.20075C19.0885 7.93308 19.5316 7.93308 19.7992 8.20075C20.0669 8.46842 20.0669 8.91145 19.7992 9.17912L13.7814 15.197C13.2922 15.6862 12.6461 15.9354 12 15.9354Z"
                        fill="#253017"
                      />
                    </svg>
                  </button>
                </div>

                {isOpen && (
                  <div className={styles.subcategories}>
                    {category.items.map((skill) => (
                      <CheckboxUI
                        key={skill}
                        name="skills"
                        value={skill}
                        text={skill}
                        checked={false}
                        onChange={() => {}}
                      />
                    ))}
                  </div>
                )}
              </div>
            )
          })}
          <button
            type="button"
            className={styles.allCategoriesButton}
            onClick={() => setShowAllCategories((prev) => !prev)}
          >
            <span>Все категории</span>
            <svg
              className={`${styles.categoryArrow} ${
                showAllCategories ? styles.categoryArrowOpen : ''
              }`}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M12 15.9354C11.3539 15.9354 10.7078 15.6862 10.2186 15.197L4.20075 9.17912C3.93308 8.91145 3.93308 8.46842 4.20075 8.20075C4.46842 7.93308 4.91145 7.93308 5.17912 8.20075L11.197 14.2186C11.64 14.6617 12.36 14.6617 12.803 14.2186L18.8209 8.20075C19.0885 7.93308 19.5316 7.93308 19.7992 8.20075C20.0669 8.46842 20.0669 8.91145 19.7992 9.17912L13.7814 15.197C13.2922 15.6862 12.6461 15.9354 12 15.9354Z"
                fill="#253017"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Пол автора */}
      <div className={styles.categorySection}>
        <h3 className={styles.categoryTitle}>Пол автора</h3>

        <div className={styles.categoryOptions}>
          <RadioButtonUI
            text="Не имеет значения"
            name="gender"
            value="any"
            checked={false}
            onChange={() => {}}
          />

          <RadioButtonUI
            text="Мужской"
            name="gender"
            value="male"
            checked={false}
            onChange={() => {}}
          />

          <RadioButtonUI
            text="Женский"
            name="gender"
            value="female"
            checked={false}
            onChange={() => {}}
          />
        </div>
      </div>
      {/* Города */}
      <div className={styles.categorySection}>
        <h3 className={styles.categoryTitle}>Город</h3>

        <div className={styles.categoryOptions}>
          {(showAllCities ? citiesData : citiesData.slice(0, 5)).map((city) => (
            <CheckboxUI
              key={city}
              name="city"
              value={city}
              text={city}
              checked={false}
              onChange={() => {}}
            />
          ))}

          <button
            type="button"
            className={styles.allCitiesButton}
            onClick={() => setShowAllCities((prev) => !prev)}
          >
            <span>Все города</span>
            <svg
              className={`${styles.categoryArrow} ${showAllCities ? styles.categoryArrowOpen : ''}`}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M12 15.9354C11.3539 15.9354 10.7078 15.6862 10.2186 15.197L4.20075 9.17912C3.93308 8.91145 3.93308 8.46842 4.20075 8.20075C4.46842 7.93308 4.91145 7.93308 5.17912 8.20075L11.197 14.2186C11.64 14.6617 12.36 14.6617 12.803 14.2186L18.8209 8.20075C19.0885 7.93308 19.5316 7.93308 19.7992 8.20075C20.0669 8.46842 20.0669 8.91145 19.7992 9.17912L13.7814 15.197C13.2922 15.6862 12.6461 15.9354 12 15.9354Z"
                fill="#253017"
              />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  )
}

export default FiltersSidebar
