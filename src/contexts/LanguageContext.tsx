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
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Ready to book your dream vacation? Get in touch with us today.',
    'contact.name': 'Full Name',
    'contact.email': 'Email Address',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.address': 'Koh Samui, Thailand',
    'contact.phone': '+66 123 456 789',
    'contact.email.address': 'info@dolcevillasamui.com'
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
    
    // Contact
    'contact.title': 'Свяжитесь с Нами',
    'contact.subtitle': 'Готовы забронировать отпуск мечты? Свяжитесь с нами сегодня.',
    'contact.name': 'Полное Имя',
    'contact.email': 'Электронная Почта',
    'contact.message': 'Сообщение',
    'contact.send': 'Отправить Сообщение',
    'contact.address': 'Ко Самуи, Таиланд',
    'contact.phone': '+66 123 456 789',
    'contact.email.address': 'info@dolcevillasamui.com'
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