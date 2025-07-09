
import Navigation from '@/components/Navigation';
import MapSection from '@/components/location/MapSection';
import LocationDetails from '@/components/location/LocationDetails';
import { MapPin, Clock, Car, Plane } from 'lucide-react';

const Location = () => {
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

      {/* Location Information Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Strategic Location in Koh Samui
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dolce Villa Samui is strategically positioned close to the town center of Samui Island, 
              offering convenient access to the island's most sought-after attractions, dining, and entertainment venues.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-blue-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Town Center Access</h3>
              <p className="text-gray-600">
                Just minutes away from Samui's vibrant town center with shopping, dining, and local markets
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="text-green-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Commute</h3>
              <p className="text-gray-600">
                Easy access to major attractions with most destinations reachable within 15 minutes
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Car className="text-purple-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Transport Links</h3>
              <p className="text-gray-600">
                Well-connected road network with easy access to all parts of the island
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Plane className="text-orange-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Airport Proximity</h3>
              <p className="text-gray-600">
                Only 12 minutes from Samui International Airport for convenient travel
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Nearby Attractions & Amenities
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">Beaches & Recreation</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• Chaweng Beach - 15 minutes</li>
                  <li>• Lamai Beach - 20 minutes</li>
                  <li>• Fisherman's Village - 3 minutes</li>
                  <li>• Big Buddha Temple - 8 minutes</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">Shopping & Dining</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• Central Festival Samui - 10 minutes</li>
                  <li>• Walking Street Market - 5 minutes</li>
                  <li>• Local Restaurants - 2-5 minutes</li>
                  <li>• Night Bazaar - 7 minutes</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">Services & Facilities</h4>
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
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Explore Our Location
            </h2>
            <p className="text-lg text-gray-600">
              See exactly where Dolce Villa Samui is located and explore the surrounding area
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
    </div>
  );
};

export default Location;
