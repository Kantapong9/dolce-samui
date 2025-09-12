import MapSection from '@/components/location/MapSection';
import LocationDetails from '@/components/location/LocationDetails';
import { MapPin, Clock, Car, Plane } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Location = () => {
  const { t } = useLanguage();
  
  return (
    <>
      {/* Location Information Section */}
      <section id="location" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('location.strategic.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('location.strategic.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-blue-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('location.town.title')}</h3>
              <p className="text-gray-600">
                {t('location.town.desc')}
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="text-green-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('location.commute.title')}</h3>
              <p className="text-gray-600">
                {t('location.commute.desc')}
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Car className="text-purple-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('location.transport.title')}</h3>
              <p className="text-gray-600">
                {t('location.transport.desc')}
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Plane className="text-orange-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('location.airport.title')}</h3>
              <p className="text-gray-600">
                {t('location.airport.desc')}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {t('location.attractions.title')}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">{t('location.beaches.title')}</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• Chaweng Beach - 15 minutes</li>
                  <li>• Lamai Beach - 20 minutes</li>
                  <li>• Fisherman's Village - 3 minutes</li>
                  <li>• Big Buddha Temple - 8 minutes</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">{t('location.shopping.title')}</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• Central Festival Samui - 10 minutes</li>
                  <li>• Walking Street Market - 5 minutes</li>
                  <li>• Local Restaurants - 2-5 minutes</li>
                  <li>• Night Bazaar - 7 minutes</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">{t('location.services.title')}</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• Bangkok Hospital Samui - 12 minutes</li>
                  <li>• International Schools - 8-15 minutes</li>
                  <li>• Golf Courses - 10-20 minutes</li>
                  <li>• Marina & Yacht Club - 5 minutes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('location.explore.title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('location.explore.subtitle')}
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Map */}
            <div className="lg:col-span-2">
              <MapSection apiKey="" />
            </div>

            {/* Location Details */}
            <LocationDetails />
          </div>
        </div>
      </section>
    </>
  );
};

export default Location;