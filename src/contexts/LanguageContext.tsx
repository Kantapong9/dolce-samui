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
    
    // Amenities
    'amenities.title': 'Premium Features',
    'amenities.pool.title': 'Salt Water Pool',
    'amenities.pool.desc': 'Refreshing salt water pool with stunning views',
    'amenities.parking.title': 'In-house Parking',
    'amenities.parking.desc': 'Secure covered parking for your convenience',
    'amenities.smart.title': 'Smart Home System',
    'amenities.smart.desc': 'Advanced automation for lighting, climate, and security',
    'amenities.garden.title': 'Garden Corner',
    'amenities.garden.desc': 'Beautiful landscaped garden area for relaxation',
    'amenities.internet.title': 'Hi-speed Internet',
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
    'layout.title': 'House Layout',
    'layout.subtitle': 'Discover the thoughtfully designed layout of our villa with spacious rooms and modern amenities',
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
    'contact.subtitle': 'Ready to book your dream vacation? Get in touch with us today.',
    'contact.name': 'Full Name',
    'contact.email': 'Email Address',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.address': 'Soi Pratamnak, Bophut, Koh Samui, Thailand',
    'contact.phone': '+66 123 456 789',
    'contact.email.address': 'info@dolcevillasamui.com',
    
    // Location Page
    'location.hero.title': 'Prime Location',
    'location.hero.subtitle': 'Discover the perfect location of our luxury developments in the heart of Koh Samui',
    'location.strategic.title': 'Strategic Location in Koh Samui',
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
    
    // Amenities
    'amenities.title': 'Премиум Удобства',
    'amenities.pool.title': 'Бассейн с Соленой Водой',
    'amenities.pool.desc': 'Освежающий бассейн с соленой водой и потрясающими видами',
    'amenities.parking.title': 'Внутренняя Парковка',
    'amenities.parking.desc': 'Безопасная крытая парковка для вашего удобства',
    'amenities.smart.title': 'Система Умный Дом',
    'amenities.smart.desc': 'Продвинутая автоматизация освещения, климата и безопасности',
    'amenities.garden.title': 'Садовый Уголок',
    'amenities.garden.desc': 'Красивый ландшафтный сад для отдыха',
    'amenities.internet.title': 'Высокоскоростной Интернет',
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
    'contact.subtitle': 'Готовы забронировать отпуск мечты? Свяжитесь с нами сегодня.',
    'contact.name': 'Полное Имя',
    'contact.email': 'Электронная Почта',
    'contact.message': 'Сообщение',
    'contact.send': 'Отправить Сообщение',
    'contact.address': 'Сой Пратамнак, Бопхут, Ко Самуи, Таиланд',
    'contact.phone': '+66 123 456 789',
    'contact.email.address': 'info@dolcevillasamui.com',
    
    // Location Page
    'location.hero.title': 'Отличное Расположение',
    'location.hero.subtitle': 'Откройте для себя идеальное расположение наших роскошных застроек в сердце Ко Самуи',
    'location.strategic.title': 'Стратегическое Расположение на Ко Самуи',
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