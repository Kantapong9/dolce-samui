
import { Waves, Car, Home, Dumbbell, Wifi, Shield } from 'lucide-react';

const Amenities = () => {
  const features = [
    {
      icon: Waves,
      title: "Infinity Pools",
      description: "Custom-designed infinity pools with stunning views and premium finishes"
    },
    {
      icon: Car,
      title: "Private Garages",
      description: "Secure multi-car garages with smart home integration"
    },
    {
      icon: Home,
      title: "Smart Home Tech",
      description: "Fully integrated smart home systems with premium automation"
    },
    {
      icon: Dumbbell,
      title: "Private Gyms",
      description: "Dedicated fitness spaces with high-end equipment and spa facilities"
    },
    {
      icon: Wifi,
      title: "Fiber Internet",
      description: "Ultra-high-speed fiber internet infrastructure throughout"
    },
    {
      icon: Shield,
      title: "Premium Security",
      description: "Advanced security systems with 24/7 monitoring and concierge services"
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Premium Features
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Every villa is crafted with the finest materials and cutting-edge technology for the ultimate luxury living experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300 group"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-colors duration-300">
                <feature.icon className="text-blue-600 group-hover:text-white transition-colors duration-300" size={32} />
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
