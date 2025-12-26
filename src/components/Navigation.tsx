
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  const navItems = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.features'), href: '#features' },
    { name: t('nav.gallery'), href: '#gallery' },
    { name: t('nav.location'), href: '#location' },
    { name: t('nav.contact'), href: '#contact' },
  ];

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
          {!isMobile && (
            <div className="flex items-center space-x-8">
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
            </div>
          )}

          {/* Mobile menu button */}
          {isMobile && (
            <div className="flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-navbar-foreground/80 hover:text-navbar-foreground"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        {isMobile && isOpen && (
          <div className="bg-navbar border-t border-navbar-foreground/20">
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
