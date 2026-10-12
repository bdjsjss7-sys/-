// ============================================
// ЦЕНТРАЛЬНЫЙ КОНФИГ САЙТА
// Меняешь здесь — обновляется везде
// ============================================

export const site = {
  url: 'https://remont-grodno.by',
  name: 'РемБытТехника',
  legalName: 'ИП РемБытТехника',
  tagline: 'Ремонт бытовой техники в Гродно',
  description:
    'Профессиональный ремонт бытовой техники в Гродно. Диагностика, замена батареек, ремонт вытяжек, духовок и гнезд зарядки. Принимаем технику в мастерской по адресу Большая Троицкая 48. Гарантия до 12 месяцев.',

  phone: '+375 29 108-79-79',
  phoneRaw: '+375291087979',
  email: 'info@remont-grodno.by',
  address: 'Большая Троицкая ул. 48',
  city: 'Гродно',
  region: 'Гродненская область',
  postalCode: '230024',
  country: 'BY',
  geo: { lat: 53.6667, lng: 23.8333 },

  workingHours: 'Ежедневно 08:00 — 18:00',
  workingHoursShort: 'Пн-Вс 08:00-18:00',

  // Показатели (вместо рейтинга)
  yearsOnMarket: 8,
  repairsDone: 12000,
  warrantyMonths: 12,
  diagnosticTime: '30 минут',

  social: {
    telegram: 'https://t.me/remontgrodno',
    viber: 'viber://chat?number=%2B375291087979',
  },

  // Ключ для форм — получишь бесплатно на web3forms.com
  web3formsKey: 'YOUR_WEB3FORMS_KEY',

  nav: [
    { label: 'Услуги',   href: '/uslugi' },
    { label: 'Цены',     href: '/ceny' },
    { label: 'Работы',   href: '/raboty' },
    { label: 'О нас',    href: '/o-nas' },
    { label: 'Блог',     href: '/blog' },
    { label: 'Контакты', href: '/kontakty' },
  ],
};

// ============================================
// УСЛУГИ — каждая станет страницей /uslugi/{slug}
// ============================================

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  priceFrom: number;
  duration: string;
  icon: string;
  popular?: boolean;
};

export const services: Service[] = [
  {
    slug: 'remont-stiralnyh-mashin',
    title: 'Ремонт стиральных машин',
    shortTitle: 'Стиральные машины',
    description:
      'Диагностика и ремонт стиральных машин всех брендов: Bosch, Samsung, LG, Indesit, Ariston. Замена подшипников, ТЭНов, помп, электронных модулей.',
    priceFrom: 35,
    duration: '1-2 часа',
    icon: 'WashingMachine',
    popular: true,
  },
  {
    slug: 'remont-holodilnikov',
    title: 'Ремонт холодильников',
    shortTitle: 'Холодильники',
    description:
      'Ремонт холодильников и морозильных камер. Заправка фреоном, замена компрессора, устранение утечек, ремонт электроники.',
    priceFrom: 45,
    duration: '1-3 часа',
    icon: 'Refrigerator',
    popular: true,
  },
  {
    slug: 'remont-vytyazhek',
    title: 'Ремонт вытяжек',
    shortTitle: 'Вытяжки',
    description:
      'Чистка и ремонт кухонных вытяжек. Замена двигателя, фильтров, ремонт системы управления и подсветки.',
    priceFrom: 30,
    duration: '1-2 часа',
    icon: 'Wind',
  },
  {
    slug: 'remont-duhovok',
    title: 'Ремонт духовых шкафов',
    shortTitle: 'Духовки',
    description:
      'Ремонт духовок и встраиваемых печей. Замена ТЭНов, термостатов, ремонт конвекции и электронных плат.',
    priceFrom: 40,
    duration: '1-2 часа',
    icon: 'Flame',
  },
  {
    slug: 'remont-mikrovolnovok',
    title: 'Ремонт микроволновых печей',
    shortTitle: 'Микроволновки',
    description:
      'Ремонт СВЧ-печей любой сложности. Замена магнетрона, высоковольтного диода, ремонт дверных механизмов.',
    priceFrom: 30,
    duration: '1 час',
    icon: 'Microwave',
  },
  {
    slug: 'remont-pylesosov',
    title: 'Ремонт пылесосов',
    shortTitle: 'Пылесосы',
    description:
      'Ремонт обычных и роботов-пылесосов. Замена двигателя, аккумулятора, ремонт турбощеток и системы навигации.',
    priceFrom: 25,
    duration: '1 час',
    icon: 'Fan',
  },
  {
    slug: 'zamena-batareek',
    title: 'Замена батареек в часах и технике',
    shortTitle: 'Замена батареек',
    description:
      'Быстрая замена элементов питания в наручных часах, пультах, весах, игрушках и другой технике. Выполняем за 5-10 минут.',
    priceFrom: 5,
    duration: '10 минут',
    icon: 'Battery',
  },
  {
    slug: 'remont-gnezda-zaryadki',
    title: 'Ремонт гнезда зарядки',
    shortTitle: 'Гнездо зарядки',
    description:
      'Замена разъемов питания на ноутбуках, смартфонах, планшетах и другой портативной технике. Пайка высокого качества.',
    priceFrom: 20,
    duration: '30-60 минут',
    icon: 'PlugZap',
  },
];
