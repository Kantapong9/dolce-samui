
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Bed, Bath, MapPin } from 'lucide-react';

const VillaShowcase = () => {
  const properties = [
    {
      id: 1,
      name: "Ocean Breeze Villa",
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=2070",
      location: "Oceanfront Paradise",
      bedrooms: 4,
      bathrooms: 3,
      area: "3,500 sq ft",
      price: "$2.8M",
      description: "Stunning oceanfront villa with infinity pool and panoramic sea views. Move-in ready."
    },
    {
      id: 2,
      name: "Mountain View Retreat",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=2070",
      location: "Mountain Heights",
      bedrooms: 3,
      bathrooms: 2,
      area: "2,800 sq ft",
      price: "$2.2M",
      description: "Secluded mountain villa with private pool and forest surroundings. Perfect for privacy."
    },
    {
      id: 3,
      name: "Tropical Paradise Estate",
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?q=80&w=2070",
      location: "Tropical Gardens",
      bedrooms: 5,
      bathrooms: 4,
      area: "4,200 sq ft",
      price: "$3.5M",
      description: "Luxurious tropical estate with multiple pools and entertainment areas. Premium finishes throughout."
    }
  ];

  return (
    <section id="properties" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Properties
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our exclusive collection of luxury pool villas, each designed with meticulous attention to detail and premium finishes
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <Card key={property.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={property.image} 
                  alt={property.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full font-semibold">
                  {property.price}
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{property.name}</h3>
                <div className="flex items-center gap-1 text-gray-500 mb-3">
                  <MapPin size={14} />
                  <span className="text-sm">{property.location}</span>
                </div>
                <p className="text-gray-600 mb-4">{property.description}</p>
                
                <div className="flex items-center gap-4 mb-4 text-gray-500">
                  <div className="flex items-center gap-1">
                    <Bed size={16} />
                    <span>{property.bedrooms} bed</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath size={16} />
                    <span>{property.bathrooms} bath</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Home size={16} />
                    <span>{property.area}</span>
                  </div>
                </div>
                
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Schedule Viewing
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VillaShowcase;
