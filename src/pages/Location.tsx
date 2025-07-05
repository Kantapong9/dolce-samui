
import Navigation from '@/components/Navigation';
import MapSection from '@/components/location/MapSection';
import LocationDetails from '@/components/location/LocationDetails';

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

      {/* Map Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
