// src/widgets/AllSkillsMenu/AllSkillsMenu.tsx
import React, { useState, useRef, useEffect } from 'react';
import './AllSkillsMenu.css';

interface SkillCategory {
  id: string;
  title: string;
  iconClass: string;
  items: string[];
}

const SKILLS_DATA: SkillCategory[] = [
  // Левая колонка (3 блока)
  {
    id: 'business',
    title: 'Бизнес и карьера',
    iconClass: 'all-skills-menu__category-icon--business',
    items: [
      'Управление командой',
      'Маркетинг и реклама',
      'Продажи и переговоры',
      'Личный бренд',
      'Резюме и собеседование',
      'Тайм-менеджмент',
      'Проектное управление',
      'Предпринимательство',
    ],
  },
  {
    id: 'languages',
    title: 'Иностранные языки',
    iconClass: 'all-skills-menu__category-icon--languages',
    items: [
      'Английский',
      'Французский',
      'Испанский',
      'Немецкий',
      'Китайский',
      'Японский',
      'Подготовка к экзаменам (IELTS, TOEFL)',
    ],
  },
  {
    id: 'home',
    title: 'Дом и уют',
    iconClass: 'all-skills-menu__category-icon--home',
    items: [
      'Уборка и организация',
      'Домашние финансы',
      'Приготовление еды',
      'Домашние растения',
      'Ремонт',
      'Хранение вещей',
    ],
  },
  // Правая колонка (3 блока)
  {
    id: 'creativity',
    title: 'Творчество и искусство',
    iconClass: 'all-skills-menu__category-icon--creativity',
    items: [
      'Рисование и иллюстрация',
      'Фотография',
      'Видеомонтаж',
      'Музыка и звук',
      'Актёрское мастерство',
      'Креативное письмо',
      'Арт-терапия',
      'Декор и DIY',
    ],
  },
  {
    id: 'education',
    title: 'Образование и развитие',
    iconClass: 'all-skills-menu__category-icon--education',
    items: [
      'Личностное развитие',
      'Навыки обучения',
      'Когнитивные техники',
      'Скорочтение',
      'Навыки преподавания',
      'Коучинг',
    ],
  },
  {
    id: 'health',
    title: 'Здоровье и лайфстайл',
    iconClass: 'all-skills-menu__category-icon--health',
    items: [
      'Йога и медитация',
      'Питание и ЗОЖ',
      'Ментальное здоровье',
      'Осознанность',
      'Физические тренировки',
      'Сон и восстановление',
      'Баланс жизни и работы',
    ],
  },
];

interface AllSkillsMenuProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

const AllSkillsMenu: React.FC<AllSkillsMenuProps> = ({ 
  isOpen: externalIsOpen, 
  onToggle 
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isControlled = externalIsOpen !== undefined;
  const isOpen = isControlled ? externalIsOpen : internalIsOpen;

  const toggleMenu = () => {
    if (isControlled && onToggle) {
      onToggle();
    } else {
      setInternalIsOpen(!internalIsOpen);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        if (!isControlled) {
          setInternalIsOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isControlled]);

  // Разделяем данные на левую и правую колонки
  const leftColumn = SKILLS_DATA.slice(0, 3); // первые 3 — левая колонка
  const rightColumn = SKILLS_DATA.slice(3, 6); // последние 3 — правая колонка

  return (
    <div className="all-skills-menu" ref={menuRef}>
      <button className="all-skills-menu__trigger" onClick={toggleMenu}>
        Все навыки
        <svg 
          className={`all-skills-menu__arrow ${isOpen ? 'all-skills-menu__arrow--open' : ''}`}
          width="16" 
          height="16" 
          viewBox="0 0 16 16" 
          fill="none"
        >
          <path 
            d="M4 6L8 10L12 6" 
            stroke="#000000" 
            strokeWidth="1" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="all-skills-menu__wrapper">
          <div className="all-skills-menu__container">
            <div className="all-skills-menu__columns">
              {/* Левая колонка */}
              <div className="all-skills-menu__column">
                {leftColumn.map((category) => (
                  <div key={category.id} className="all-skills-menu__category">
                    <div className="all-skills-menu__category-row">
                      <div 
                        className={`all-skills-menu__category-icon ${category.iconClass}`}
                        data-category={category.id}
                      />
                      <div className="all-skills-menu__category-content">
                        <h3 className="all-skills-menu__category-title">
                          {category.title}
                        </h3>
                        <ul className="all-skills-menu__category-list">
                          {category.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="all-skills-menu__category-item">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Правая колонка */}
              <div className="all-skills-menu__column">
                {rightColumn.map((category) => (
                  <div key={category.id} className="all-skills-menu__category">
                    <div className="all-skills-menu__category-row">
                      <div 
                        className={`all-skills-menu__category-icon ${category.iconClass}`}
                        data-category={category.id}
                      />
                      <div className="all-skills-menu__category-content">
                        <h3 className="all-skills-menu__category-title">
                          {category.title}
                        </h3>
                        <ul className="all-skills-menu__category-list">
                          {category.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="all-skills-menu__category-item">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllSkillsMenu;