import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";

const images = [
  { src: gallery1, alt: "Ambiente acogedor del restaurante" },
  { src: gallery2, alt: "Café artesanal y panadería" },
  { src: gallery3, alt: "Terraza al aire libre" },
  { src: gallery4, alt: "Variedad de platos gourmet" },
];

const Gallery = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
          Vive la Experiencia
        </h2>
        <p className="text-center text-muted-foreground mb-12 text-lg">
          Un vistazo a los momentos especiales en El Patio
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div 
              key={index}
              className="relative overflow-hidden rounded-lg aspect-square group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-background font-medium">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
