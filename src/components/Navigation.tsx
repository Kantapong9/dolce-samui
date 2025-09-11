
import { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.features'), href: '#features' },
    { name: t('nav.gallery'), href: '#gallery' },
    { name: t('nav.location'), href: '/location' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ru' : 'en');
  };

  const handleNavClick = (href: string) => {
    if (href.startsWith('#') && location.pathname !== '/') {
      // If clicking on anchor link but not on home page, go to home first
      window.location.href = '/' + href;
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navbar/90 backdrop-blur-md border-b border-navbar/20 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <img src="/lovable-uploads/d4e4a819-5e65-42fe-a278-dd618a63bdcc.png" alt="Dolce Villa Samui" className="h-16 w-auto" />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              item.href.startsWith('#') ? (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="text-navbar-foreground/80 hover:text-navbar-foreground transition-colors duration-200"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-navbar-foreground/80 hover:text-navbar-foreground transition-colors duration-200"
                >
                  {item.name}
                </Link>
              )
            ))}
            
            {/* Language Toggle Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center space-x-1"
            >
              <Globe size={16} />
              <span>{language === 'en' ? 'RU' : 'EN'}</span>
            </Button>
          </div>

          {/* Mobile menu button and language toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center space-x-1"
            >
              <Globe size={14} />
              <span className="text-xs">{language === 'en' ? 'RU' : 'EN'}</span>
            </Button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-navbar-foreground/80 hover:text-navbar-foreground"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-navbar border-t border-navbar-foreground/20">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                item.href.startsWith('#') ? (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className="block px-3 py-2 text-navbar-foreground/80 hover:text-navbar-foreground transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 text-navbar-foreground/80 hover:text-navbar-foreground transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
