import { Waves, Car, Home, TreePine, Wifi, Camera } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Amenities = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: Waves,
      title: t('amenities.pool.title'),
      description: t('amenities.pool.desc')
    },
    {
      icon: Car,
      title: t('amenities.parking.title'),
      description: t('amenities.parking.desc')
    },
    {
      icon: Home,
      title: t('amenities.smart.title'),
      description: t('amenities.smart.desc')
    },
    {
      icon: TreePine,
      title: t('amenities.garden.title'),
      description: t('amenities.garden.desc')
    },
    {
      icon: Wifi,
      title: t('amenities.internet.title'),
      description: t('amenities.internet.desc')
    },
    {
      icon: Camera,
      title: t('amenities.security.title'),
      description: t('amenities.security.desc')
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
            {t('amenities.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('amenities.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300 group"
            >
              <div className="w-16 h-16 bg-navbar rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-navbar/80 transition-colors duration-300">
                <feature.icon className="text-white transition-colors duration-300" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Amenities;
