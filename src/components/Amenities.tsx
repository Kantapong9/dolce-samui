
import { Waves, Car, Utensils, Dumbbell, Wifi, Shield } from 'lucide-react';

const Amenities = () => {
  const amenities = [
    {
      icon: Waves,
      title: "Private Pool",
      description: "Infinity pools with stunning views and perfect temperature control"
    },
    {
      icon: Car,
      title: "Free Parking",
      description: "Secure parking spaces for all guests with 24/7 surveillance"
    },
    {
      icon: Utensils,
      title: "Gourmet Kitchen",
      description: "Fully equipped kitchens with premium appliances and utensils"
    },
    {
      icon: Dumbbell,
      title: "Fitness Center",
      description: "State-of-the-art gym equipment and wellness facilities"
    },
    {
      icon: Wifi,
      title: "High-Speed WiFi",
      description: "Complimentary high-speed internet throughout the property"
    },
    {
      icon: Shield,
      title: "24/7 Security",
      description: "Round-the-clock security and concierge services for peace of mind"
    }
  ];

  return (
    <section id="amenities" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            World-Class Amenities
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Every detail carefully crafted to ensure your stay is nothing short of extraordinary
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {amenities.map((amenity, index) => (
            <div 
              key={index} 
              className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300 group"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-colors duration-300">
                <amenity.icon className="text-blue-600 group-hover:text-white transition-colors duration-300" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{amenity.title}</h3>
              <p className="text-gray-600">{amenity.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Amenities;
