
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useLanguage } from '@/contexts/LanguageContext';

const Gallery = () => {
  const { t } = useLanguage();
  
  const images = [
    {
      src: "/lovable-uploads/447ab717-dc51-4343-8e67-8bed9f7900d6.png",
      alt: "Modern villa living room with pool view"
    },
    {
      src: "/lovable-uploads/f1283176-9bd8-429c-a8c9-72f08c40ccd0.png",
      alt: "Elegant dining area with garden views"
    },
    {
      src: "/lovable-uploads/eb0430cb-146b-4879-b4cf-80012203fa8e.png",
      alt: "Villa exterior with tropical landscaping"
    },
    {
      src: "/lovable-uploads/eeb34356-22f9-47ec-9387-4ece22d33428.png",
      alt: "Master bedroom with modern design"
    },
    {
      src: "/lovable-uploads/cdffae03-4d79-40e7-b0fb-0654e693fe98.png",
      alt: "Luxury bathroom with freestanding tub"
    },
    {
      src: "/lovable-uploads/4a3070a0-af32-4d07-89b3-4a19c730b03a.png",
      alt: "Spa bathroom with garden courtyard"
    },
    {
      src: "/lovable-uploads/e25ac1cc-1296-4001-aba4-4b751152caab.png",
      alt: "Walk-in shower with premium finishes"
    },
    {
      src: "/lovable-uploads/bb126c58-a18d-4da8-b588-f04a3393bea0.png",
      alt: "Double vanity bathroom design"
    },
    {
      src: "/lovable-uploads/37892cda-a26e-4bd6-8565-4d04a5702f21.png",
      alt: "Modern kitchen with island and premium appliances"
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
            {t('gallery.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('gallery.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <div 
                  className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 group aspect-square cursor-pointer"
                >
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] p-0">
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-full object-contain rounded-lg"
                />
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
