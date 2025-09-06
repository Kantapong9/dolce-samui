import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Home, Bed, Bath, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const VillaShowcase = () => {
  const { t } = useLanguage();
  
  const properties = [
    {
      id: 1,
      name: "Villa Uno",
      images: [
        "/lovable-uploads/9e5ff405-e0ca-4dd4-b147-779cc0769b74.png",
        "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=2070",
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2070",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2070",
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2070"
      ],
      location: "Oceanfront Paradise",
      bedrooms: 4,
      bathrooms: 3,
      area: "3,500 sq ft",
      price: "$2.8M",
      description: "Stunning oceanfront villa with infinity pool and panoramic sea views. Move-in ready."
    },
    {
      id: 2,
      name: "Villa Due",
      images: [
        "/lovable-uploads/7127a7c9-3145-4a97-9f57-b58b9a5d9957.png",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2070",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2070",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2070",
        "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=2070"
      ],
      location: "Mountain Heights",
      bedrooms: 3,
      bathrooms: 2,
      area: "2,800 sq ft",
      price: "$2.2M",
      description: "Secluded mountain villa with private pool and forest surroundings. Perfect for privacy."
    },
    {
      id: 3,
      name: "Villa Tre",
      images: [
        "/lovable-uploads/53521dec-6966-4a3e-823e-dc7b60861922.png",
        "https://images.unsplash.com/photo-1520637836862-4d197d17c87a?q=80&w=2070",
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2070",
        "https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=2070",
        "https://images.unsplash.com/photo-1600298881974-6be191ceeda1?q=80&w=2070",
        "https://images.unsplash.com/photo-1600298882974-db5268c51e2b?q=80&w=2070"
      ],
      location: "Tropical Gardens",
      bedrooms: 5,
      bathrooms: 4,
      area: "4,200 sq ft",
      price: "$3.5M",
      description: "Luxurious tropical estate with multiple pools and entertainment areas. Premium finishes throughout."
    },
    {
      id: 4,
      name: "Villa Quattro",
      images: [
        "/lovable-uploads/32d4622d-e051-4126-8cd2-0b4ea9e86e3c.png",
        "https://images.unsplash.com/photo-1600298881754-5da7e8e0b0e2?q=80&w=2070",
        "https://images.unsplash.com/photo-1600298882638-e27c4f74fbb7?q=80&w=2070",
        "https://images.unsplash.com/photo-1600298882456-2c5a8e6ae6b5?q=80&w=2070",
        "https://images.unsplash.com/photo-1600298881587-a46b3e8a9ae6b5?q=80&w=2070",
        "https://images.unsplash.com/photo-1600298882785-dfb5a8a9ae6b?q=80&w=2070"
      ],
      location: "Cliff Heights",
      bedrooms: 4,
      bathrooms: 4,
      area: "3,800 sq ft",
      price: "$3.2M",
      description: "Dramatic cliffside villa with breathtaking views and modern architecture. Architect-designed masterpiece."
    },
    {
      id: 5,
      name: "Villa Cinque",
      images: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070",
        "https://images.unsplash.com/photo-1600298881456-b8c51e3b9e5d?q=80&w=2070",
        "https://images.unsplash.com/photo-1600298881785-c9b51e3b9e5d?q=80&w=2070",
        "https://images.unsplash.com/photo-1600298882123-c9b51e3b9e5d?q=80&w=2070",
        "https://images.unsplash.com/photo-1600298882456-c9b51e3b9e5d?q=80&w=2070",
        "https://images.unsplash.com/photo-1600298882789-c9b51e3b9e5d?q=80&w=2070"
      ],
      location: "Pristine Beach",
      bedrooms: 6,
      bathrooms: 5,
      area: "5,000 sq ft",
      price: "$4.2M",
      description: "Ultimate beachfront luxury with private beach access and world-class amenities. Resort-style living."
    },
    {
      id: 6,
      name: "Villa Sei",
      images: [
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=2070",
        "https://images.unsplash.com/photo-1600298881234-c9b51e3b9e5d?q=80&w=2070",
        "https://images.unsplash.com/photo-1600298881567-c9b51e3b9e5d?q=80&w=2070",
        "https://images.unsplash.com/photo-1600298881890-c9b51e3b9e5d?q=80&w=2070",
        "https://images.unsplash.com/photo-1600298882123-c9b51e3b9e5d?q=80&w=2070",
        "https://images.unsplash.com/photo-1600298882456-c9b51e3b9e5d?q=80&w=2070"
      ],
      location: "Sunset Hills",
      bedrooms: 3,
      bathrooms: 3,
      area: "3,200 sq ft",
      price: "$2.5M",
      description: "Spectacular sunset views from every room. Contemporary design with infinity pool and spa facilities."
    }
  ];

  return (
    <section id="properties" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('villa.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('villa.bedroom.desc')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <Card key={property.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
              <div className="relative">
                <Carousel className="w-full">
                  <CarouselContent>
                    {property.images.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="h-64 overflow-hidden">
                          <img 
                            src={image} 
                            alt={`${property.name} - Image ${index + 1}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </Carousel>
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full font-semibold z-10">
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
