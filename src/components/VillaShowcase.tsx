
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Bed, Bath, Wifi } from 'lucide-react';

const VillaShowcase = () => {
  const villas = [
    {
      id: 1,
      name: "Ocean Breeze Villa",
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=2070",
      guests: 8,
      bedrooms: 4,
      bathrooms: 3,
      price: "$450/night",
      description: "Stunning oceanfront villa with infinity pool and panoramic sea views"
    },
    {
      id: 2,
      name: "Mountain View Retreat",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=2070",
      guests: 6,
      bedrooms: 3,
      bathrooms: 2,
      price: "$320/night",
      description: "Secluded mountain villa with private pool and forest surroundings"
    },
    {
      id: 3,
      name: "Tropical Paradise",
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?q=80&w=2070",
      guests: 10,
      bedrooms: 5,
      bathrooms: 4,
      price: "$680/night",
      description: "Luxurious tropical villa with multiple pools and entertainment areas"
    }
  ];

  return (
    <section id="villas" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Exclusive Villas
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked collection of luxury pool villas, each offering unique experiences and breathtaking views
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {villas.map((villa) => (
            <Card key={villa.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={villa.image} 
                  alt={villa.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full font-semibold">
                  {villa.price}
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{villa.name}</h3>
                <p className="text-gray-600 mb-4">{villa.description}</p>
                
                <div className="flex items-center gap-4 mb-4 text-gray-500">
                  <div className="flex items-center gap-1">
                    <Users size={16} />
                    <span>{villa.guests}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bed size={16} />
                    <span>{villa.bedrooms}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath size={16} />
                    <span>{villa.bathrooms}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Wifi size={16} />
                  </div>
                </div>
                
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  View Details
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
