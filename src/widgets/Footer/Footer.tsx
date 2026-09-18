import React from 'react'
import styles from './Footer.module.css'
import { Logo } from '@/shared/ui/Logo/logo'

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__brand}>
        <Logo />
        <p className={styles.footer__copyright}>SkillSwap - 2025</p>
      </div>
      <nav className={styles.footer__nav}>
        <ul className={styles.footer__list}>
          <li className={styles.footer__item}>
            <a href="#" className={styles.footer__link}>
              О проекте
            </a>
            {/* сейчас оставил обычную ссылку, но в дальнейшем ссылки "О проекте" и "Все
            навыки" следует обернуть в теги Link с соответствующими маршрутами на нужные страницы */}
          </li>
          <li className={styles.footer__item}>
            <a href="#" className={styles.footer__link}>
              Все навыки
            </a>
          </li>
        </ul>

        <ul className={styles.footer__list}>
          <li className={styles.footer__item}>
            <a href="#" className={styles.footer__link}>
              Контакты
            </a>
          </li>
          <li className={styles.footer__item}>
            <a href="#" className={styles.footer__link}>
              Блог
            </a>
          </li>
        </ul>

        <ul className={styles.footer__list}>
          <li className={styles.footer__item}>
            <a href="#" className={styles.footer__link}>
              Политика конфиденциальности
            </a>
          </li>
          <li className={styles.footer__item}>
            <a href="#" className={styles.footer__link}>
              Пользовательское соглашение
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  )
}
