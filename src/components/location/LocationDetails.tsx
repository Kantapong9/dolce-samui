
import { MapPin, Navigation as NavigationIcon, Phone, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const LocationDetails = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="text-blue-600" size={24} />
            Development Location
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900">Address</h4>
            <p className="text-gray-600">Koh Samui, Surat Thani Province, Thailand</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Coordinates</h4>
            <p className="text-gray-600">9.550976° N, 100.032876° E</p>
          </div>
          <Button className="w-full" variant="outline">
            <NavigationIcon size={16} className="mr-2" />
            Get Directions
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Nearby Attractions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span>Convenient Store</span>
            <span className="text-blue-600">&gt;1 min</span>
          </div>
          <div className="flex justify-between">
            <span>Fisherman Village</span>
            <span className="text-blue-600">3 min</span>
          </div>
          <div className="flex justify-between">
            <span>Central Festival Samui</span>
            <span className="text-blue-600">10 min</span>
          </div>
          <div className="flex justify-between">
            <span>Samui International Airport</span>
            <span className="text-blue-600">12 min</span>
          </div>
          <div className="flex justify-between">
            <span>Chaweng Beach</span>
            <span className="text-blue-600">15 min</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3">
            <Phone size={16} className="text-blue-600" />
            <span>+66 85 564 9899</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail size={16} className="text-blue-600" />
            <span>info@dolcevillasamui.com</span>
          </div>
          <Button className="w-full mt-4">
            Schedule Site Visit
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LocationDetails;
