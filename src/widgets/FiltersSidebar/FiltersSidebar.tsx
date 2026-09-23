import styles from './FiltersSidebar.module.css'
import RadioButtonUI from '@/shared/ui/Radio/Radio'
import { CITY_OPTIONS } from '@/entities/city/model/cities'
import { SKILL_CATEGORIES, Subcategory } from '@/entities/skill/model/categories'
import { CheckboxUI } from '@/shared/ui/Checkbox/CheckboxUI'
import { useState } from 'react'
import { FilterState, initialFilterState } from '@/features/skill-filter'

interface FiltersSidebarProps {
  filters: FilterState
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>
}

const FiltersSidebar = ({ filters, setFilters }: FiltersSidebarProps) => {
  const [openCategories, setOpenCategories] = useState<string[]>([])

  const [showAllCategories, setShowAllCategories] = useState(false)
  const [showAllCities, setShowAllCities] = useState(false)

  const toggleCategory = (categoryName: string) => {
    setOpenCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((name) => name !== categoryName)
        : [...prev, categoryName],
    )
  }

  const handleCityChange = (city: string) => {
    setFilters((prev) => {
      const exists = prev.cities.includes(city)
      const updatedCities = exists ? prev.cities.filter((c) => c !== city) : [...prev.cities, city]

      return {
        ...prev,
        cities: updatedCities,
      }
    })
  }

  const handleGenderChange = (gender: FilterState['gender']) => {
    setFilters((prev) => ({ ...prev, gender }))
  }

  const handleInteractionChange = (interaction: FilterState['interaction']) => {
    setFilters((prev) => ({ ...prev, interaction }))
  }

  const handleCategoryToggle = (subcategories: Subcategory[]) => {
    const subIds = subcategories.map((sub) => sub.id)
    const allSelected = subIds.every((id) => filters.skills.includes(id))

    setFilters((prev) => ({
      ...prev,
      skills: allSelected
        ? prev.skills.filter((id) => !subIds.includes(id))
        : Array.from(new Set([...prev.skills, ...subIds])),
    }))
  }

  const handleSkillChange = (skill: string) => {
    setFilters((prev) => {
      const exists = prev.skills.includes(skill)
      const updatedSkills = exists
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill]

      return {
        ...prev,
        skills: updatedSkills,
      }
    })
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <h2 className={styles.title}>Фильтры</h2>
        <button
          type="button"
          onClick={() => setFilters(initialFilterState)}
          className={styles.resetButton}
          aria-label="Сбросить фильтры"
        >
          <span>Сбросить</span>
          <span aria-hidden="true">×</span>
        </button>
      </div>

      <div className={styles.options}>
        <RadioButtonUI
          text="Всё"
          name="interaction"
          value="all"
          checked={filters.interaction === 'all'}
          onChange={() => handleInteractionChange('all')}
        />

        <RadioButtonUI
          text="Хочу научиться"
          name="interaction"
          value="learn"
          checked={filters.interaction === 'learn'}
          onChange={() => handleInteractionChange('learn')}
        />

        <RadioButtonUI
          text="Могу научить"
          name="interaction"
          value="teach"
          checked={filters.interaction === 'teach'}
          onChange={() => handleInteractionChange('teach')}
        />
      </div>

      <div className={styles.categorySection}>
        <h3 className={styles.categoryTitle}>Навыки</h3>

        <div className={styles.categories}>
          {(showAllCategories ? SKILL_CATEGORIES : SKILL_CATEGORIES.slice(0, 6)).map((category) => {
            const isOpen = openCategories.includes(category.id)

            const isCategoryActive = category.subcategories.some((sub) =>
              filters.skills.includes(sub.id),
            )

            return (
              <div key={category.id} className={styles.category}>
                <div className={styles.categoryHeader}>
                  <CheckboxUI
                    name="category"
                    value={category.id}
                    text={category.name}
                    checked={isCategoryActive}
                    onChange={() => handleCategoryToggle(category.subcategories)}
                  />

                  <button
                    type="button"
                    className={styles.categoryToggle}
                    onClick={() => toggleCategory(category.id)}
                    aria-label={
                      isOpen
                        ? `Закрыть категорию ${category.name}`
                        : `Открыть категорию ${category.name}`
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
                    {category.subcategories.map((sub) => (
                      <CheckboxUI
                        key={sub.id}
                        name="skills"
                        value={sub.id}
                        text={sub.name}
                        checked={filters.skills.includes(sub.id)}
                        onChange={() => handleSkillChange(sub.id)}
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
            <span>{showAllCategories ? 'Скрыть' : 'Все категории'}</span>
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

      <div className={styles.categorySection}>
        <h3 className={styles.categoryTitle}>Пол автора</h3>

        <div className={styles.categoryOptions}>
          <RadioButtonUI
            text="Не имеет значения"
            name="gender"
            value="any"
            checked={filters.gender === 'any'}
            onChange={() => handleGenderChange('any')}
          />

          <RadioButtonUI
            text="Мужской"
            name="gender"
            value="male"
            checked={filters.gender === 'male'}
            onChange={() => handleGenderChange('male')}
          />

          <RadioButtonUI
            text="Женский"
            name="gender"
            value="female"
            checked={filters.gender === 'female'}
            onChange={() => handleGenderChange('female')}
          />
        </div>
      </div>

      <div className={styles.categorySection}>
        <h3 className={styles.categoryTitle}>Город</h3>

        <div className={styles.categoryOptions}>
          {(showAllCities ? CITY_OPTIONS : CITY_OPTIONS.slice(0, 5)).map((city) => (
            <CheckboxUI
              key={city.value}
              name="city"
              value={city.value}
              text={city.label}
              checked={filters.cities.includes(city.value)}
              onChange={() => handleCityChange(city.value)}
            />
          ))}

          <button
            type="button"
            className={styles.allCitiesButton}
            onClick={() => setShowAllCities((prev) => !prev)}
          >
            <span>{showAllCities ? 'Скрыть' : 'Все города'}</span>
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
