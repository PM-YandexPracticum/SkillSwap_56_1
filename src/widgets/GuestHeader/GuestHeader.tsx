import { Logo } from '../../shared/ui/Logo/logo';
import { Input } from '../../shared/ui/Input/Input';
import { Button, buttonStyles } from '../../shared/ui/button/Button';
import AllSkillsMenu from '../AllSkillsMenu/AllSkillsMenu';
import styles from './GuestHeader.module.css';
import MoonIcon from './moon.svg?react';
import SearchIcon from './search.svg?react';

export const GuestHeader = () => {
  return (
    <header className={styles.header}>
      <Logo />

      <nav className={styles.nav}>
        <a href="#">О проекте</a>
        <AllSkillsMenu />
      </nav>

      <div className={styles.search}>
        <SearchIcon />
        <Input
          placeholder="Искать навык"
          style={{
            paddingLeft: '48px',
            border: 'none',
          }}
        />
      </div>

      <button
        type="button"
        aria-label="Переключить тему"
        className={styles.themeButton}
      >
        <MoonIcon />
      </button>

      <div className={styles.authButtons}>
        <Button text="Войти" className={buttonStyles.secondary} />
        <Button
          text="Зарегистрироваться"
          className={buttonStyles.primary}
        />
      </div>
    </header>
  );
};
