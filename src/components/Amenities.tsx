import { Waves, Car, Home, TreePine, Wifi, Camera } from 'lucide-react';

const Amenities = () => {
  const features = [
    {
      icon: Waves,
      title: "Salt Water Pool",
      description: "Refreshing salt water pools with stunning views and premium finishes"
    },
    {
      icon: Car,
      title: "In-house Parking",
      description: "Convenient covered parking spaces within the property"
    },
    {
      icon: Home,
      title: "Smart Home System",
      description: "Fully integrated smart home systems with premium automation"
    },
    {
      icon: TreePine,
      title: "Garden Corner",
      description: "Beautiful landscaped garden spaces for relaxation and outdoor activities"
    },
    {
      icon: Wifi,
      title: "Hi-speed Internet",
      description: "Ultra-high-speed internet connectivity throughout the property"
    },
    {
      icon: Camera,
      title: "Security Camera",
      description: "Advanced security camera systems with 24/7 monitoring for peace of mind"
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
