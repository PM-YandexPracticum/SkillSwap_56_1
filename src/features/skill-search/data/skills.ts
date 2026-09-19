// временные мок данные
export interface SkillData {
  id: string;
  user: {
    avatarUrl: string | null;
    name: string;
    city: string;
    age: number;
    description: string;
  };
  teach: {
    teachValue: string;
    teachTagColor: string;
  };
  learn: {
    learnValue: string[];
    learnTagColor: string;
  };
  moreTagColor: string;
  isLiked: boolean;
  likesCount: number;
}

export const SKILLS_DATA: SkillData[] = [
  {
    id: '1',
    user: {
      name: 'Алексей',
      age: 20,
      city: 'Москва',
      avatarUrl: null,
      description:
        'Привет! Люблю ритм, кофе по утрам и людей, которые не боятся пробовать новое',
    },
    moreTagColor: 'pink',
    teach: { teachValue: 'Играть на барабанах', teachTagColor: 'red' },
    learn: {
      learnValue: ['Водить машину', 'Читать', 'Чинить авто', 'Играть на гитаре'],
      learnTagColor: 'yellow',
    },
    isLiked: true,
    likesCount: 24,
  },
  {
    id: '2',
    user: {
      name: 'Мария',
      age: 28,
      city: 'Санкт-Петербург',
      avatarUrl: null,
      description: 'Преподаю английский уже 5 лет, люблю путешествия и книги',
    },
    moreTagColor: 'blue',
    teach: { teachValue: 'Английский язык', teachTagColor: 'blue' },
    learn: {
      learnValue: ['Йога', 'Медитация', 'Фотография'],
      learnTagColor: 'green',
    },
    isLiked: false,
    likesCount: 12,
  },
  {
    id: '3',
    user: {
      name: 'Иван',
      age: 35,
      city: 'Казань',
      avatarUrl: null,
      description: 'Разработчик, учу Python и хочу научиться играть на гитаре',
    },
    moreTagColor: 'purple',
    teach: { teachValue: 'Программирование на Python', teachTagColor: 'purple' },
    learn: {
      learnValue: ['Играть на гитаре', 'Английский', 'Плавание'],
      learnTagColor: 'yellow',
    },
    isLiked: false,
    likesCount: 8,
  },
  {
    id: '4',
    user: {
      name: 'Ольга',
      age: 22,
      city: 'Новосибирск',
      avatarUrl: null,
      description: 'Художник-иллюстратор, люблю скетчи и акварель',
    },
    moreTagColor: 'orange',
    teach: { teachValue: 'Рисование и иллюстрация', teachTagColor: 'orange' },
    learn: {
      learnValue: ['Видеомонтаж', 'Фотография'],
      learnTagColor: 'pink',
    },
    isLiked: true,
    likesCount: 31,
  },
  {
    id: '5',
    user: {
      name: 'Дмитрий',
      age: 40,
      city: 'Екатеринбург',
      avatarUrl: null,
      description: 'Йога-инструктор, помогаю найти баланс тела и духа',
    },
    moreTagColor: 'green',
    teach: { teachValue: 'Йога и медитация', teachTagColor: 'green' },
    learn: {
      learnValue: ['Английский', 'Кулинария'],
      learnTagColor: 'yellow',
    },
    isLiked: false,
    likesCount: 17,
  },
  {
    id: '6',
    user: {
      name: 'Елена',
      age: 30,
      city: 'Сочи',
      avatarUrl: null,
      description: 'Повар-кондитер, учу готовить итальянскую кухню',
    },
    moreTagColor: 'pink',
    teach: { teachValue: 'Приготовление еды', teachTagColor: 'red' },
    learn: {
      learnValue: ['Фотография', 'Испанский'],
      learnTagColor: 'blue',
    },
    isLiked: false,
    likesCount: 5,
  },
];