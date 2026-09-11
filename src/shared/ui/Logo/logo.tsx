import LogoSvg from './logo.svg?react';
import styles from "./logo.module.css";

export const Logo = () => {
  return (
    <a href="/" aria-label="На главную" className={styles.logo}>
      <LogoSvg />
    </a>
  );
};
