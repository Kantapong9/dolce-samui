
import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { MapPin, Navigation as NavigationIcon, Phone, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Location = () => {
  const [apiKey, setApiKey] = useState(localStorage.getItem('googleMapsApiKey') || '');
  const [showApiInput, setShowApiInput] = useState(!apiKey);

  const handleApiKeySubmit = () => {
    if (apiKey.trim()) {
      localStorage.setItem('googleMapsApiKey', apiKey.trim());
      setShowApiInput(false);
    }
  };

  useEffect(() => {
    if (apiKey && !showApiInput) {
      // Load Google Maps script
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        initMap();
      };
      
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, [apiKey, showApiInput]);

  const initMap = () => {
    // Koh Samui coordinates
    const kohSamui = { lat: 9.5380, lng: 100.0614 };
    
    const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      zoom: 12,
      center: kohSamui,
      mapTypeId: 'satellite',
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'on' }]
        }
      ]
    });

    // Add marker for the development location
    const marker = new google.maps.Marker({
      position: kohSamui,
      map: map,
      title: 'AquaLux Developments - Koh Samui',
      draggable: true,
      animation: google.maps.Animation.DROP,
    });

    // Info window
    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div style="padding: 10px;">
          <h3 style="margin: 0 0 10px 0; color: #1e40af;">AquaLux Developments</h3>
          <p style="margin: 0; color: #374151;">Premium Pool Villas in Koh Samui</p>
          <p style="margin: 5px 0 0 0; font-size: 12px; color: #6b7280;">Drag the marker to adjust location</p>
        </div>
      `
    });

    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });

    // Update coordinates when marker is dragged
    marker.addListener('dragend', (event: any) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      console.log(`New coordinates: ${lat}, ${lng}`);
    });

    // Open info window by default
    infoWindow.open(map, marker);
  };

  if (showApiInput) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="pt-20 px-4">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Google Maps API Key Required</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 text-center">
                  To display the interactive map, please enter your Google Maps API key. 
                  You can get one from the Google Cloud Console.
                </p>
                <div className="space-y-2">
                  <Label htmlFor="apiKey">Google Maps API Key</Label>
                  <Input
                    id="apiKey"
                    type="password"
                    placeholder="Enter your Google Maps API key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                </div>
                <Button onClick={handleApiKeySubmit} className="w-full">
                  Load Map
                </Button>
                <p className="text-xs text-gray-500 text-center">
                  Get your API key at: console.cloud.google.com
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-blue-900 to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Prime Location
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Discover the perfect location of our luxury developments in the heart of Koh Samui
          </p>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Map */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden">
                <div id="map" className="w-full h-96 lg:h-[500px]"></div>
              </Card>
            </div>

            {/* Location Details */}
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
                    <p className="text-gray-600">9.5380° N, 100.0614° E</p>
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
                    <span>Chaweng Beach</span>
                    <span className="text-blue-600">5 min</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Big Buddha Temple</span>
                    <span className="text-blue-600">10 min</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Samui Airport</span>
                    <span className="text-blue-600">15 min</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fisherman's Village</span>
                    <span className="text-blue-600">20 min</span>
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
                    <span>+66 77 123 456</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-blue-600" />
                    <span>info@aqualux.com</span>
                  </div>
                  <Button className="w-full mt-4">
                    Schedule Site Visit
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Location;
