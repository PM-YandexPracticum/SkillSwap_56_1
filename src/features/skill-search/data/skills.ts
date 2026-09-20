// временные мок данные
export interface SkillData {
  id: string
  user: {
    avatarUrl: string | null
    name: string
    city: string
    age: number
    description: string
  }
  teach: {
    teachValue: string
    teachTagColor: string
  }
  learn: {
    learnValue: string[]
    learnTagColor: string
  }
  moreTagColor: string
  isLiked: boolean
  likesCount: number
}

export const SKILLS_DATA: SkillData[] = [
  {
    id: '1',
    user: {
      name: 'Алексей',
      age: 20,
      city: 'Москва',
      avatarUrl: null,
      description: 'Привет! Люблю ритм, кофе по утрам и людей, которые не боятся пробовать новое',
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
  {
    id: '7',
    user: {
      name: 'Наталья',
      age: 26,
      city: 'Воронеж',
      avatarUrl: null,
      description: 'Кондитер с опытом, обожаю экспериментировать с десертами',
    },
    moreTagColor: 'blue',
    teach: { teachValue: 'Выпечка и десерты', teachTagColor: 'orange' },
    learn: {
      learnValue: ['Английский', 'Танцы', 'Фотография'],
      learnTagColor: 'pink',
    },
    isLiked: false,
    likesCount: 9,
  },
  {
    id: '8',
    user: {
      name: 'Сергей',
      age: 33,
      city: 'Ростов-на-Дону',
      avatarUrl: null,
      description: 'Фотограф, снимаю портреты и городские пейзажи',
    },
    moreTagColor: 'green',
    teach: { teachValue: 'Фотография', teachTagColor: 'purple' },
    learn: {
      learnValue: ['Python', 'Играть на барабанах'],
      learnTagColor: 'red',
    },
    isLiked: true,
    likesCount: 14,
  },
  {
    id: '9',
    user: {
      name: 'Анна',
      age: 24,
      city: 'Нижний Новгород',
      avatarUrl: null,
      description: 'Инструктор по йоге, верю в силу медленных тренировок',
    },
    moreTagColor: 'pink',
    teach: { teachValue: 'Йога для начинающих', teachTagColor: 'green' },
    learn: {
      learnValue: ['Испанский', 'Рисование', 'Медитация'],
      learnTagColor: 'yellow',
    },
    isLiked: false,
    likesCount: 11,
  },
  {
    id: '10',
    user: {
      name: 'Павел',
      age: 29,
      city: 'Самара',
      avatarUrl: null,
      description: 'Гитарист, выступаю в местной группе по выходным',
    },
    moreTagColor: 'orange',
    teach: { teachValue: 'Игра на гитаре', teachTagColor: 'red' },
    learn: {
      learnValue: ['Английский', 'Плавание', 'Сведение музыки'],
      learnTagColor: 'blue',
    },
    isLiked: false,
    likesCount: 19,
  },
  {
    id: '11',
    user: {
      name: 'Виктория',
      age: 31,
      city: 'Красноярск',
      avatarUrl: null,
      description: 'Дизайнер, делаю логотипы и айдентику для малого бизнеса',
    },
    moreTagColor: 'purple',
    teach: { teachValue: 'Графический дизайн', teachTagColor: 'purple' },
    learn: {
      learnValue: ['Видеомонтаж', 'Французский'],
      learnTagColor: 'pink',
    },
    isLiked: true,
    likesCount: 22,
  },
  {
    id: '12',
    user: {
      name: 'Михаил',
      age: 27,
      city: 'Пермь',
      avatarUrl: null,
      description: 'Любитель футбола, тренерую дворовую команду детей',
    },
    moreTagColor: 'blue',
    teach: { teachValue: 'Футбол', teachTagColor: 'green' },
    learn: {
      learnValue: ['Программирование', 'Английский'],
      learnTagColor: 'yellow',
    },
    isLiked: false,
    likesCount: 6,
  },
  {
    id: '13',
    user: {
      name: 'Ксения',
      age: 23,
      city: 'Волгоград',
      avatarUrl: null,
      description: 'Вокалистка, учу академическому пению взрослых',
    },
    moreTagColor: 'pink',
    teach: { teachValue: 'Академический вокал', teachTagColor: 'orange' },
    learn: {
      learnValue: ['Фотография', 'Испанский'],
      learnTagColor: 'green',
    },
    isLiked: false,
    likesCount: 13,
  },
  {
    id: '14',
    user: {
      name: 'Андрей',
      age: 38,
      city: 'Уфа',
      avatarUrl: null,
      description: 'Столяр, собираю мебель из массива на заказ',
    },
    moreTagColor: 'green',
    teach: { teachValue: 'Столярное дело', teachTagColor: 'yellow' },
    learn: {
      learnValue: ['Английский', 'Сёрфинг'],
      learnTagColor: 'blue',
    },
    isLiked: false,
    likesCount: 7,
  },
  {
    id: '15',
    user: {
      name: 'Дарья',
      age: 25,
      city: 'Тюмень',
      avatarUrl: null,
      description: 'Иллюстратор, веду скетчбук и рисую заставки',
    },
    moreTagColor: 'orange',
    teach: { teachValue: 'Скетчинг', teachTagColor: 'pink' },
    learn: {
      learnValue: ['Китайский', 'Пилатес'],
      learnTagColor: 'purple',
    },
    isLiked: true,
    likesCount: 18,
  },
  {
    id: '16',
    user: {
      name: 'Николай',
      age: 34,
      city: 'Иркутск',
      avatarUrl: null,
      description: 'Фронтенд-разработчик, пишу на React и TypeScript',
    },
    moreTagColor: 'red',
    teach: { teachValue: 'Веб-разработка', teachTagColor: 'blue' },
    learn: {
      learnValue: ['Фотография', 'Немецкий'],
      learnTagColor: 'green',
    },
    isLiked: false,
    likesCount: 16,
  },
  {
    id: '17',
    user: {
      name: 'Юлия',
      age: 28,
      city: 'Хабаровск',
      avatarUrl: null,
      description: 'Мастер скрапбукинга, люблю создавать альбомы',
    },
    moreTagColor: 'purple',
    teach: { teachValue: 'Скрапбукинг', teachTagColor: 'pink' },
    learn: {
      learnValue: ['Английский', 'Кулинария'],
      learnTagColor: 'orange',
    },
    isLiked: false,
    likesCount: 4,
  },
  {
    id: '18',
    user: {
      name: 'Владимир',
      age: 41,
      city: 'Владивосток',
      avatarUrl: null,
      description: 'Переводчик, преподаю английский онлайн',
    },
    moreTagColor: 'blue',
    teach: { teachValue: 'Разговорный английский', teachTagColor: 'blue' },
    learn: {
      learnValue: ['Python', 'Шахматы'],
      learnTagColor: 'green',
    },
    isLiked: false,
    likesCount: 21,
  },
  {
    id: '19',
    user: {
      name: 'Татьяна',
      age: 30,
      city: 'Челябинск',
      avatarUrl: null,
      description: 'Танцовщица, призёр областных соревнований по бальным танцам',
    },
    moreTagColor: 'green',
    teach: { teachValue: 'Бальные танцы', teachTagColor: 'orange' },
    learn: {
      learnValue: ['Итальянский', 'Рисование'],
      learnTagColor: 'pink',
    },
    isLiked: true,
    likesCount: 25,
  },
  {
    id: '20',
    user: {
      name: 'Денис',
      age: 26,
      city: 'Саратов',
      avatarUrl: null,
      description: 'Геймдизайнер, делаю инди-игры в свободное время',
    },
    moreTagColor: 'red',
    teach: { teachValue: 'Геймдизайн', teachTagColor: 'purple' },
    learn: {
      learnValue: ['Английский', 'Продюсирование музыки'],
      learnTagColor: 'yellow',
    },
    isLiked: false,
    likesCount: 10,
  },
  {
    id: '21',
    user: {
      name: 'Екатерина',
      age: 29,
      city: 'Краснодар',
      avatarUrl: null,
      description: 'Художница, рисую граффити и муралы',
    },
    moreTagColor: 'pink',
    teach: { teachValue: 'Стрит-арт', teachTagColor: 'green' },
    learn: {
      learnValue: ['Йога', 'Немецкий'],
      learnTagColor: 'blue',
    },
    isLiked: false,
    likesCount: 12,
  },
  {
    id: '22',
    user: {
      name: 'Олег',
      age: 36,
      city: 'Омск',
      avatarUrl: null,
      description: 'Шахматист, кандидат в мастера спорта',
    },
    moreTagColor: 'blue',
    teach: { teachValue: 'Шахматы', teachTagColor: 'yellow' },
    learn: {
      learnValue: ['Английский', 'Современные танцы'],
      learnTagColor: 'red',
    },
    isLiked: false,
    likesCount: 8,
  },
  {
    id: '23',
    user: {
      name: 'Марина',
      age: 27,
      city: 'Томск',
      avatarUrl: null,
      description: 'Каллиграф, оформляю свадьбы и открытки',
    },
    moreTagColor: 'orange',
    teach: { teachValue: 'Каллиграфия', teachTagColor: 'pink' },
    learn: {
      learnValue: ['Испанский', 'Пилатес'],
      learnTagColor: 'purple',
    },
    isLiked: true,
    likesCount: 15,
  },
  {
    id: '24',
    user: {
      name: 'Игорь',
      age: 32,
      city: 'Барнаул',
      avatarUrl: null,
      description: 'Триатлет, готовлю любителей к первым стартам',
    },
    moreTagColor: 'green',
    teach: { teachValue: 'Триатлон', teachTagColor: 'red' },
    learn: {
      learnValue: ['Программирование', 'Английский'],
      learnTagColor: 'blue',
    },
    isLiked: false,
    likesCount: 20,
  },
]
