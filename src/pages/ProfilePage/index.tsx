import { useState } from 'react';
import { AuthenticatedHeader } from '@/widgets/AuthenticatedHeader/AuthenticatedHeader';
import { Footer } from '@/widgets/Footer/Footer';
import { Input } from '@/shared/ui/Input/Input';
import { Select } from '@/shared/ui/Select';
import { Textarea } from '@/shared/ui/Textarea';
import { Button, buttonStyles } from '@/shared/ui/button/Button';
import styles from './ProfilePage.module.css';
import editIcon from '@/shared/assets/gallery-edit.svg';
import editFieldIcon from '@/shared/assets/edit.svg';
import defaultAvatar from '@/shared/assets/defaultAvatar.svg';

import requestsIcon from '@/shared/assets/requests.svg';
import exchangesIcon from '@/shared/assets/exchanges.svg';
import favoritesIcon from '@/shared/assets/favorites.svg';
import skillsIcon from '@/shared/assets/skills.svg';
import profileIcon from '@/shared/assets/profile.svg';

const GENDER_OPTIONS = [
  { value: 'female', label: 'Женский' },
  { value: 'male', label: 'Мужской' },
];

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
];

function ProfilePage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [about, setAbout] = useState('');
  const [avatar, setAvatar] = useState(defaultAvatar);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleChangePassword = () => {
    alert('just a plug');
  };

  const handleChangeAvatar = () => {
    alert('just a plug');
  };

  return (
    <div className={styles.pageWrapper}>
      <AuthenticatedHeader />

      <main className={styles.mainContent}>
        <aside className={styles.sidebar}>
          <nav className={styles.navList}>
            <a href="#" className={styles.navItem}>
              <img src={requestsIcon} alt="Заявки" className={styles.sidebarIcon} />
              <span>Заявки</span>
            </a>
            <a href="#" className={styles.navItem}>
              <img src={exchangesIcon} alt="Мои обмены" className={styles.sidebarIcon} />
              <span>Мои обмены</span>
            </a>
            <a href="#" className={styles.navItem}>
              <img src={favoritesIcon} alt="Избранное" className={styles.sidebarIcon} />
              <span>Избранное</span>
            </a>
            <a href="#" className={styles.navItem}>
              <img src={skillsIcon} alt="Мои навыки" className={styles.sidebarIcon} />
              <span>Мои навыки</span>
            </a>
            <a href="#" className={styles.navItem}>
              <img src={profileIcon} alt="Личные данные" className={styles.sidebarIcon} />
              <span>Личные данные</span>
            </a>
          </nav>
        </aside>

        <section className={styles.userInfo}>
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
                  onClick={handleChangePassword}
                  className={styles.changePasswordLink}
                  text="Изменить пароль"
                />
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
                text="Сохранить"
                type="submit"
                className={`${buttonStyles.primary} ${styles.saveButton}`}
              />
            </form>

            <div className={styles.avatarWrapper}>
              <img
                src={avatar}
                alt="Avatar"
                className={styles.avatar}
              />
              <Button
                type="button"
                onClick={handleChangeAvatar}
                aria-label="Изменить аватар"
                className={styles.editAvatarBtn}
                icon={<img src={editIcon} alt="Редактировать" className={styles.editIcon} />}
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default ProfilePage;
