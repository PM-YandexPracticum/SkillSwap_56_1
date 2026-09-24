import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthenticatedHeader } from '@/widgets/AuthenticatedHeader/AuthenticatedHeader'
import { Footer } from '@/widgets/Footer/Footer'
import { fetchSkills } from '@/api/skills'
import { fetchUserById } from '@/api/users'
import { toSkillCardProps } from '@/entities/skill/model/toSkillCardProps'
import { SkillCard, SkillCardProps } from '@/entities/skill/ui/SkillCard'
import { Input } from '@/shared/ui/Input/Input'
import { Select } from '@/shared/ui/Select'
import { Textarea } from '@/shared/ui/Textarea'
import { Button } from '@/shared/ui/button/Button'
import { getProfileUser, updateProfileUser } from '@/features/profile-edit/model/profileUtils'
import { RequestsSection } from '@/features/exchange/ui/RequestsSection'
import styles from './ProfilePage.module.css'
import editIcon from '@/shared/assets/gallery-edit.svg'
import editFieldIcon from '@/shared/assets/edit.svg'
import defaultAvatar from '@/shared/assets/defaultAvatar.svg'

import requestsIcon from '@/shared/assets/requests.svg'
import exchangesIcon from '@/shared/assets/exchanges.svg'
import favoritesIcon from '@/shared/assets/favorites.svg'
import skillsIcon from '@/shared/assets/skills.svg'
import profileIcon from '@/shared/assets/profile.svg'

const GENDER_OPTIONS = [
  { value: 'female', label: 'Женский' },
  { value: 'male', label: 'Мужской' },
]

const CITY_OPTIONS = [
  { value: 'Москва', label: 'Москва' },
  { value: 'Санкт-Петербург', label: 'Санкт-Петербург' },
  { value: 'Новосибирск', label: 'Новосибирск' },
  { value: 'Екатеринбург', label: 'Екатеринбург' },
  { value: 'Казань', label: 'Казань' },
  { value: 'Нижний Новгород', label: 'Нижний Новгород' },
  { value: 'Челябинск', label: 'Челябинск' },
  { value: 'Самара', label: 'Самара' },
  { value: 'Омск', label: 'Омск' },
  { value: 'Ростов-на-Дону', label: 'Ростов-на-Дону' },
  { value: 'Уфа', label: 'Уфа' },
  { value: 'Красноярск', label: 'Красноярск' },
  { value: 'Пермь', label: 'Пермь' },
  { value: 'Воронеж', label: 'Воронеж' },
  { value: 'Волгоград', label: 'Волгоград' },
  { value: 'Краснодар', label: 'Краснодар' },
  { value: 'Саратов', label: 'Саратов' },
  { value: 'Тюмень', label: 'Тюмень' },
  { value: 'Тольятти', label: 'Тольятти' },
  { value: 'Ижевск', label: 'Ижевск' },
]

function ProfilePage() {
  const [savedUser, setSavedUser] = useState(getProfileUser())
  const [activeSection, setActiveSection] = useState<'profile' | 'skills' | 'requests'>('profile')
  const [mySkills, setMySkills] = useState<SkillCardProps[]>([])

  useEffect(() => {
    const loadMySkills = async () => {
      if (!savedUser) return

      const skills = await fetchSkills()
      const userSkills = skills.filter((skill) => skill.authorId === savedUser.id)

      const skillCards = await Promise.all(
        userSkills.map(async (skill) => {
          const user = await fetchUserById(skill.authorId)

          if (!user) return null

          return {
            ...toSkillCardProps(skill, user),
            withButton: false,
            isLiked: false,
          }
        }),
      )

      setMySkills(skillCards.filter((skill) => skill !== null) as SkillCardProps[])
    }

    loadMySkills()
  }, [savedUser])

  const [email, setEmail] = useState(savedUser?.email ?? '')
  const [name, setName] = useState(savedUser?.name ?? '')
  const [birthDate, setBirthDate] = useState(savedUser?.birthDate ?? '')
  const [gender, setGender] = useState(savedUser?.gender ?? '')
  const [city, setCity] = useState(savedUser?.city ?? '')
  const [about, setAbout] = useState(savedUser?.about ?? '')
  const [isPasswordEditing, setIsPasswordEditing] = useState(false)
  const [password, setPassword] = useState('')
  //const [avatar, setAvatar] = useState(defaultAvatar); - todo: use it when implement avatar change
  const hasChanges =
    email !== (savedUser?.email ?? '') ||
    name !== (savedUser?.name ?? '') ||
    birthDate !== (savedUser?.birthDate ?? '') ||
    gender !== (savedUser?.gender ?? '') ||
    city !== (savedUser?.city ?? '') ||
    about !== (savedUser?.about ?? '') ||
    password !== ''
  const avatar = defaultAvatar
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()

    if (!savedUser || !hasChanges) return

    const updatedUser = updateProfileUser({
      id: savedUser.id,
      name,
      email,
      birthDate,
      gender,
      city,
      about,
    })

    setSavedUser(updatedUser)
  }

  const handleChangeAvatar = () => {
    alert('just a plug')
  }

  return (
    <div className={styles.pageWrapper}>
      <AuthenticatedHeader />

      <main className={styles.mainContent}>
        <aside className={styles.sidebar}>
          <nav className={styles.navList}>
            <button
              type="button"
              className={styles.navItem}
              onClick={() => setActiveSection('requests')}
            >
              <img src={requestsIcon} alt="Заявки" className={styles.sidebarIcon} />
              <span>Заявки</span>
            </button>
            <a href="#" className={styles.navItem}>
              <img src={exchangesIcon} alt="Мои обмены" className={styles.sidebarIcon} />
              <span>Мои обмены</span>
            </a>
            <a href="#" className={styles.navItem}>
              <img src={favoritesIcon} alt="Избранное" className={styles.sidebarIcon} />
              <span>Избранное</span>
            </a>
            <button
              type="button"
              className={styles.navItem}
              onClick={() => setActiveSection('skills')}
            >
              <img src={skillsIcon} alt="Мои навыки" className={styles.sidebarIcon} />
              <span>Мои навыки</span>
            </button>
            <button
              type="button"
              className={styles.navItem}
              onClick={() => setActiveSection('profile')}
            >
              <img src={profileIcon} alt="Личные данные" className={styles.sidebarIcon} />
              <span>Личные данные</span>
            </button>
          </nav>
        </aside>

        <section className={styles.userInfo}>
          {activeSection === 'profile' ? (
            <div className={styles.formWithAvatar}>
              <form onSubmit={handleSave} className={styles.profileForm}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Почта</label>
                  <div className={styles.inputWithIcon}>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@mail.ru"
                      className={`${styles.input} ${styles.inputHasIcon}`}
                    />
                    <img src={editFieldIcon} alt="" className={styles.fieldEditIcon} />
                  </div>
                  <Button
                    type="button"
                    onClick={() => {
                      setIsPasswordEditing(!isPasswordEditing)
                      setPassword('')
                    }}
                    className={styles.changePasswordLink}
                  >
                    {isPasswordEditing ? 'Отменить' : 'Изменить пароль'}
                  </Button>
                  {isPasswordEditing && (
                    <div className={styles.fieldGroup}>
                      <label className={styles.label}>Новый пароль</label>
                      <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Введите новый пароль"
                        className={styles.input}
                      />
                    </div>
                  )}
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Имя</label>
                  <div className={styles.inputWithIcon}>
                    <Input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Введите имя"
                      className={`${styles.input} ${styles.inputHasIcon}`}
                    />
                    <img src={editFieldIcon} alt="" className={styles.fieldEditIcon} />
                  </div>
                </div>

                <div className={styles.rowGroup}>
                  <div className={styles.halfField}>
                    <label className={styles.label}>Дата рождения</label>
                    <input
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className={styles.inputDate}
                      placeholder="ДД.ММ.ГГГГ"
                    />
                  </div>
                  <div className={styles.halfField}>
                    <label className={styles.label}>Пол</label>
                    <div className={styles.selectWrapper}>
                      <Select
                        value={gender}
                        onChange={(value: string | null) => setGender(value ?? '')}
                        options={GENDER_OPTIONS}
                        placeholder="Выберите пол"
                        className={styles.select}
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Город</label>
                  <div className={styles.selectWrapper}>
                    <Select
                      value={city}
                      onChange={(value: string | null) => setCity(value ?? '')}
                      options={CITY_OPTIONS}
                      placeholder="Выберите город"
                      className={styles.select}
                      searchable={true}
                    />
                  </div>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>О себе</label>
                  <div className={styles.inputWithIcon}>
                    <Textarea
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                      placeholder="Расскажите о себе..."
                      className={`${styles.textarea} ${styles.inputHasIcon}`}
                    />
                    <img src={editFieldIcon} alt="" className={styles.fieldEditIcon} />
                  </div>
                </div>

                <Button
                  variant='primary'
                  type="submit"
                  disabled={!hasChanges}
                  className={`${styles.saveButton}`}
                >
                  Сохранить
                </Button>
              </form>

              <div className={styles.avatarWrapper}>
                <img src={avatar} alt="Avatar" className={styles.avatar} />
                <Button
                  type="button"
                  onClick={handleChangeAvatar}
                  aria-label="Изменить аватар"
                  className={styles.editAvatarBtn}
                >
                  <img src={editIcon} alt="Редактировать" className={styles.editIcon} />
                </Button>
              </div>
            </div>
          ) : activeSection === 'skills' ? (
            <div>
              {mySkills.length > 0 ? (
                mySkills.map((skill, index) => (
                  <SkillCard key={index} {...skill} withDescription={false} />
                ))
              ) : (
                <div>
                  <p>У вас пока нет навыков</p>
                  <Link to="/create">Добавить навык</Link>
                </div>
              )}
            </div>
          ) : (
            <RequestsSection />
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default ProfilePage
