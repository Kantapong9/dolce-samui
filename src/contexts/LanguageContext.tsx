import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.properties': 'Properties',
    'nav.features': 'Features',
    'nav.gallery': 'Gallery',
    'nav.location': 'Location',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.title': 'Luxurious Villa in Koh Samui',
    'hero.subtitle': 'Experience paradise at our exclusive pool villa in a quiet area close to the beach near to Samui town center.',
    'hero.cta': 'Book Your Stay',
    'hero.learn': 'Learn More',
    
    // Villa Showcase
    'villa.title': 'Villa Highlights',
    'villa.bedroom.title': 'Master Bedroom',
    'villa.bedroom.desc': 'Spacious master bedroom with panoramic ocean views and luxury furnishings',
    'villa.living.title': 'Living Area',
    'villa.living.desc': 'Open-concept living space perfect for relaxation and entertainment',
    'villa.kitchen.title': 'Gourmet Kitchen',
    'villa.kitchen.desc': 'Fully equipped modern kitchen with premium appliances and island seating',
    
    // Project Concept
    'concept.title': 'Project Concept',
    'concept.description': 'Dolce Villa Samui represents a harmonious blend of contemporary luxury and tropical island living. Nestled in the serene landscape of Koh Samui, our exclusive development features thoughtfully designed pool villas that embody modern elegance while embracing the natural beauty of Thailand\'s paradise island. Each villa is crafted with meticulous attention to detail, offering spacious living areas, premium finishes, and private outdoor spaces that create the perfect sanctuary for those seeking a refined lifestyle in one of Asia\'s most coveted destinations.',
    
    // Amenities
    'amenities.title': 'Premium Features',
    'amenities.subtitle': 'Indulge in world-class amenities crafted for the discerning few',
    'amenities.pool.title': 'Salt Water Pool',
    'amenities.pool.desc': 'Larger than standard 8m x 3m salt water pool',
    'amenities.parking.title': 'In-house Parking',
    'amenities.parking.desc': 'Comfortably park 2 large sized trucks or minivan',
    'amenities.smart.title': 'Smart Home System',
    'amenities.smart.desc': 'Advanced automation for lighting, climate, and security',
    'amenities.garden.title': 'Automatic Gate',
    'amenities.garden.desc': 'Sliding gate with remote control for your car’s entrance',
    'amenities.internet.title': 'Hi-speed Internet Ready',
    'amenities.internet.desc': 'Ultra-fast fiber connection for work and entertainment',
    'amenities.security.title': 'Security Camera',
    'amenities.security.desc': 'Professional monitoring system for your peace of mind',
    
    // Gallery
    'gallery.title': 'Villa Gallery',
    'gallery.subtitle': 'Take a visual tour of our stunning property',
    
    // Project Plan Layout
    'projectPlan.title': 'Project Plan Layout',
    'projectPlan.subtitle': 'Explore the comprehensive development plan showcasing all villa units and their strategic positioning',
    
    // House Layout
    'layout.title': 'Villa Layout',
    'layout.subtitle': 'Main living areas including spacious living room, spacious kitchen and dining area with direct pool access.',
    'layout.areas': 'Room Areas',
    'layout.total': 'Total Area',
    'layout.living': 'Living Room',
    'layout.kitchen': 'Kitchen',
    'layout.dining': 'Dining',
    'layout.bedroom1': 'Bedroom 1',
    'layout.bedroom2': 'Bedroom 2',
    'layout.bedroom3': 'Bedroom 3',
    'layout.bedroom4': 'Bedroom 4',
    'layout.pool': 'Swimming Pool',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Ready to book your dream vacation home? Get in touch with us today.',
    'contact.name': 'Full Name',
    'contact.lastname': 'Last Name',
    'contact.email': 'Email Address',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.address': 'Soi Pratamnak, Bophut, Koh Samui, Thailand',
    'contact.phone': '+66 85 564 9899',
    'contact.email.address': 'info@dolcevillasamui.com',
    'contact.salesoffice': 'Office Number',
    'contact.email.label': 'Email',
    'contact.salesgallery': 'Sales Office Address',
    'contact.viewinghours': 'Viewing Hours',
    'contact.hours.weekday': 'Monday - Saturday: 9AM - 6PM',
    'contact.hours.sunday': 'Sunday: 10AM - 4PM',
    'contact.schedule': 'Schedule a Private Viewing',
    'contact.phone.label': 'Phone',
    'contact.phone.placeholder': '+1 (555) 123-4567',
    
    // Payment Terms
    'payment.title': 'Payment Terms',
    'payment.subtitle': 'Flexible payment schedule designed to make your dream villa purchase smooth and convenient',
    'payment.stage': 'Payment Terms',
    'payment.milestone.label': 'Milestone',
    'payment.amount': 'Amount',
    'payment.reservation': 'Reservation & Deposit',
    'payment.first': 'Payment 1',
    'payment.second': 'Payment 2',
    'payment.third': 'Payment 3',
    'payment.fourth': 'Payment 4',
    'payment.fifth': 'Payment 5',
    'payment.milestone.sign': 'Sign Purchase Agreement',
    'payment.milestone.ground': 'Ground Floor Structure Completion',
    'payment.milestone.roof': 'Roof Structure and Tile Completion',
    'payment.milestone.electrical': 'Electrical & Sanitation, Ceiling, Wall and Tiling Completion 20%',
    'payment.milestone.ceiling': 'Doors & Windows Installation',
    'payment.note': 'All payments are subject to the terms and conditions outlined in the purchase agreement.',
    
    // Location Page
    'location.hero.title': 'Prime Location',
    'location.hero.subtitle': 'Discover the perfect location of our luxury developments in the heart of Koh Samui',
    'location.strategic.title': 'Strategic Location',
    'location.strategic.subtitle': 'Dolce Villa Samui is strategically positioned close to the town center of Samui Island, offering convenient access to the island\'s most sought-after attractions, dining, and entertainment venues.',
    'location.town.title': 'Town Center Access',
    'location.town.desc': 'Just minutes away from Samui\'s vibrant town center with shopping, dining, and local markets',
    'location.commute.title': 'Quick Commute',
    'location.commute.desc': 'Easy access to major attractions with most destinations reachable within 15 minutes',
    'location.transport.title': 'Transport Links',
    'location.transport.desc': 'Well-connected road network with easy access to all parts of the island',
    'location.airport.title': 'Airport Proximity',
    'location.airport.desc': 'Only 12 minutes from Samui International Airport for convenient travel',
    'location.attractions.title': 'Nearby Attractions & Amenities',
    'location.beaches.title': 'Beaches & Recreation',
    'location.shopping.title': 'Shopping & Dining',
    'location.services.title': 'Services & Facilities',
    'location.conveniences.title': 'Conveniences',
    'location.explore.title': 'Explore Our Location',
    'location.explore.subtitle': 'See exactly where Dolce Villa Samui is located and explore the surrounding area',
    'location.details.title': 'Development Location',
    'location.address': 'Address',
    'location.coordinates': 'Coordinates',
    'location.directions': 'Get Directions',
    'location.nearby.title': 'Nearby Attractions',
    'location.contact.title': 'Contact Information',
    'location.schedule': 'Schedule Site Visit'
  },
  ru: {
    // Navigation
    'nav.home': 'Главная',
    'nav.properties': 'Недвижимость',
    'nav.features': 'Особенности',
    'nav.gallery': 'Галерея',
    'nav.location': 'Местоположение',
    'nav.contact': 'Контакты',
    
    // Hero Section
    'hero.title': 'Роскошная Вилла на Ко Самуи',
    'hero.subtitle': 'Окунитесь в рай в нашей эксклюзивной вилле с бассейном в тихом районе рядом с пляжем недалеко от центра города Самуи.',
    'hero.cta': 'Забронировать',
    'hero.learn': 'Узнать больше',
    
    // Villa Showcase
    'villa.title': 'Особенности Виллы',
    'villa.bedroom.title': 'Главная Спальня',
    'villa.bedroom.desc': 'Просторная главная спальня с панорамным видом на океан и роскошной мебелью',
    'villa.living.title': 'Гостиная',
    'villa.living.desc': 'Открытое жилое пространство, идеальное для отдыха и развлечений',
    'villa.kitchen.title': 'Кухня Гурмана',
    'villa.kitchen.desc': 'Полностью оборудованная современная кухня с премиальной техникой и барной стойкой',
    
    // Project Concept
    'concept.title': 'Концепция Проекта',
    'concept.description': 'Dolce Villa Samui представляет собой гармоничное сочетание современной роскоши и тропической островной жизни. Расположенный в живописном ландшафте Ко Самуи, наш эксклюзивный комплекс включает продуманно спроектированные виллы с бассейнами, которые воплощают современную элегантность и одновременно сохраняют естественную красоту райского острова Таиланда. Каждая вилла создана с тщательным вниманием к деталям, предлагая просторные жилые зоны, премиальную отделку и частные открытые пространства, которые создают идеальное убежище для тех, кто ищет изысканный образ жизни в одном из самых желанных мест Азии.',
    
    // Amenities
    'amenities.title': 'Премиум Удобства',
    'amenities.subtitle': 'Насладитесь удобствами мирового класса, созданными для самых взыскательных',
    'amenities.pool.title': 'Бассейн с Соленой Водой',
    'amenities.pool.desc': 'Бассейн с соленой водой больше стандартного 8м x 3м',
    'amenities.parking.title': 'Внутренняя Парковка',
    'amenities.parking.desc': 'Удобная парковка для 2 больших грузовиков или минивэна',
    'amenities.smart.title': 'Система Умный Дом',
    'amenities.smart.desc': 'Продвинутая автоматизация освещения, климата и безопасности',
    'amenities.garden.title': 'Садовый Уголок',
    'amenities.garden.desc': 'Ландшафтное садовое пространство для любителей природы',
    'amenities.internet.title': 'Готов Высокоскоростной Интернет',
    'amenities.internet.desc': 'Сверхбыстрое оптоволоконное соединение для работы и развлечений',
    'amenities.security.title': 'Камера Безопасности',
    'amenities.security.desc': 'Профессиональная система мониторинга для вашего спокойствия',
    
    // Gallery
    'gallery.title': 'Галерея Виллы',
    'gallery.subtitle': 'Совершите визуальную экскурсию по нашей потрясающей собственности',
    
    // Project Plan Layout
    'projectPlan.title': 'План Проекта',
    'projectPlan.subtitle': 'Изучите всеобъемлющий план развития, демонстрирующий все виллы и их стратегическое расположение',
    
    // House Layout
    'layout.title': 'Планировка Дома',
    'layout.subtitle': 'Откройте для себя продуманную планировку нашей виллы с просторными комнатами и современными удобствами',
    'layout.areas': 'Площади Комнат',
    'layout.total': 'Общая Площадь',
    'layout.living': 'Гостиная',
    'layout.kitchen': 'Кухня',
    'layout.dining': 'Столовая',
    'layout.bedroom1': 'Спальня 1',
    'layout.bedroom2': 'Спальня 2',
    'layout.bedroom3': 'Спальня 3',
    'layout.bedroom4': 'Спальня 4',
    'layout.pool': 'Бассейн',
    
    // Contact
    'contact.title': 'Свяжитесь с Нами',
    'contact.subtitle': 'Готовы забронировать дом мечты для отпуска? Свяжитесь с нами сегодня.',
    'contact.name': 'Полное Имя',
    'contact.lastname': 'Фамилия',
    'contact.email': 'Электронная Почта',
    'contact.message': 'Сообщение',
    'contact.send': 'Отправить Сообщение',
    'contact.address': 'Сой Пратамнак, Бопхут, Ко Самуи, Таиланд',
    'contact.phone': '+66 85 564 9899',
    'contact.email.address': 'info@dolcevillasamui.com',
    'contact.salesoffice': 'Номер Офиса',
    'contact.email.label': 'Электронная Почта',
    'contact.salesgallery': 'Адрес Офиса Продаж',
    'contact.viewinghours': 'Часы Просмотра',
    'contact.hours.weekday': 'Понедельник - Суббота: 9:00 - 18:00',
    'contact.hours.sunday': 'Воскресенье: 10:00 - 16:00',
    'contact.schedule': 'Запланировать Частный Просмотр',
    'contact.phone.label': 'Телефон',
    'contact.phone.placeholder': '+1 (555) 123-4567',
    
    // Payment Terms
    'payment.title': 'Условия Оплаты',
    'payment.subtitle': 'Гибкий график платежей, разработанный для плавной и удобной покупки виллы вашей мечты',
    'payment.stage': 'Этап Оплаты',
    'payment.milestone.label': 'Этап Работ',
    'payment.amount': 'Сумма',
    'payment.reservation': 'Бронирование и Депозит',
    'payment.first': '1-й Платеж',
    'payment.second': '2-й Платеж',
    'payment.third': '3-й Платеж',
    'payment.fourth': '4-й Платеж',
    'payment.fifth': '5-й Платеж',
    'payment.sixth': '6-й Платеж',
    'payment.milestone.sign': 'Подписание Договора Купли-Продажи',
    'payment.milestone.ground': 'Завершение Конструкции Первого Этажа',
    'payment.milestone.roof': 'Завершение Крыши и Укладки Плитки',
    'payment.milestone.electrical': 'Завершение Электричества и Сантехники',
    'payment.milestone.ceiling': 'Завершение Потолков, Стен и Плитки',
    'payment.milestone.doors': 'Установка Дверей и Окон',
    'payment.note': 'Все платежи подлежат условиям, изложенным в договоре купли-продажи.',
    
    // Location Page
    'location.hero.title': 'Отличное Расположение',
    'location.hero.subtitle': 'Откройте для себя идеальное расположение наших роскошных застроек в сердце Ко Самуи',
    'location.strategic.title': 'Стратегическое Расположение',
    'location.strategic.subtitle': 'Dolce Villa Samui стратегически расположена недалеко от центра города на острове Самуи, предлагая удобный доступ к самым популярным достопримечательностям, ресторанам и развлекательным заведениям острова.',
    'location.town.title': 'Доступ к Центру Города',
    'location.town.desc': 'Всего в нескольких минутах от оживленного центра города Самуи с магазинами, ресторанами и местными рынками',
    'location.commute.title': 'Быстрая Поездка',
    'location.commute.desc': 'Легкий доступ к основным достопримечательностям, большинство мест можно добраться за 15 минут',
    'location.transport.title': 'Транспортные Связи',
    'location.transport.desc': 'Хорошо связанная дорожная сеть с легким доступом ко всем частям острова',
    'location.airport.title': 'Близость к Аэропорту',
    'location.airport.desc': 'Всего 12 минут от международного аэропорта Самуи для удобных путешествий',
    'location.attractions.title': 'Близлежащие Достопримечательности и Удобства',
    'location.beaches.title': 'Пляжи и Отдых',
    'location.shopping.title': 'Покупки и Рестораны',
    'location.services.title': 'Услуги и Объекты',
    'location.conveniences.title': 'Удобства',
    'location.explore.title': 'Исследуйте Наше Расположение',
    'location.explore.subtitle': 'Посмотрите точно, где находится Dolce Villa Samui, и исследуйте окрестности',
    'location.details.title': 'Расположение Комплекса',
    'location.address': 'Адрес',
    'location.coordinates': 'Координаты',
    'location.directions': 'Получить Направления',
    'location.nearby.title': 'Близлежащие Достопримечательности',
    'location.contact.title': 'Контактная Информация',
    'location.schedule': 'Запланировать Визит'
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};