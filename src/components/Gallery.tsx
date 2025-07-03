
const Gallery = () => {
  const images = [
    {
      src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070",
      alt: "Luxury pool villa exterior"
    },
    {
      src: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=2070",
      alt: "Ocean view from villa"
    },
    {
      src: "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=2070",
      alt: "Mountain villa landscape"
    },
    {
      src: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?q=80&w=2070",
      alt: "River and mountain views"
    },
    {
      src: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?q=80&w=2070",
      alt: "Relaxation area"
    },
    {
      src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070",
      alt: "Villa pool area"
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Gallery
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Immerse yourself in the beauty and luxury of our pool villas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 group aspect-square"
            >
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
