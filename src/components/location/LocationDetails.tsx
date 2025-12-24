
import { MapPin, Navigation as NavigationIcon, Phone, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const LocationDetails = () => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-light">
            <MapPin className="text-blue-600" size={24} />
            {t('location.details.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900">{t('location.address')}</h4>
            <p className="text-gray-600">Soi Pratamnak, Bophut, Koh Samui, Surat Thani Province, Thailand</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{t('location.coordinates')}</h4>
            <p className="text-gray-600">9.550976° N, 100.032876° E</p>
          </div>
          <Button className="w-full" variant="outline">
            <NavigationIcon size={16} className="mr-2" />
            {t('location.directions')}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-light">{t('location.contact.title')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3">
            <Phone size={16} className="text-blue-600" />
            <span>+66 85 564 9899</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail size={16} className="text-blue-600" />
            <span>kantapong@dolcevillasamui.com</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LocationDetails;
