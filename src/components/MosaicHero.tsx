import { useEffect, useState } from 'react';
import { AnimatedButton, FadeIn } from '@/components/ui/animated-components';
import { MessageCircle, FileText } from 'lucide-react';
import { imageAssets } from '@/lib/asset-manifest';

const MosaicHero = () => {
  const [visibleTiles, setVisibleTiles] = useState(0);
  
  // Get strategic selection for mosaic (performance optimized)
  const heroImages = [
    imageAssets.find(a => a.category === 'ambiente'),
    ...imageAssets.filter(a => a.category === 'plato').slice(0, 2),
    imageAssets.find(a => a.category === 'bebida'),
    ...imageAssets.filter(a => a.category === 'ambiente').slice(1, 2),
  ].filter(Boolean).slice(0, 5); // Max 5 images for performance

  const handleWhatsApp = () => {
    window.open(
      'https://wa.me/573001234567?text=Hola! Me gustaría reservar una mesa en El Patio',
      '_blank'
    );
  };

  const handleViewMenu = () => {
    const menuSection = document.getElementById('featured-dishes');
    menuSection?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Throttled reveal for better performance
    const timer = setInterval(() => {
      setVisibleTiles(prev => {
        if (prev < heroImages.length) return prev + 1;
        return prev;
      });
    }, 300); // Slower reveal

    return () => clearInterval(timer);
  }, [heroImages.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Optimized Mosaic Background */}
      <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 gap-3 p-6 opacity-30">
        {heroImages.map((image, index) => (
          <div
            key={image?.id || index}
            className={`
              relative overflow-hidden rounded-xl transition-all duration-500 ease-out will-change-transform
              ${index < visibleTiles ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
              ${index === 0 ? 'col-span-2 row-span-2' : ''}
              ${index === 1 ? 'col-span-1 row-span-1' : ''}
              ${index === 2 ? 'col-span-1 row-span-2' : ''}
              ${index === 3 ? 'col-span-2 row-span-1' : ''}
              ${index === 4 ? 'col-span-1 row-span-1' : ''}
            `}
            style={{
              transitionDelay: `${index * 200}ms`
            }}
          >
            {image && (
              <>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  loading={index < 2 ? 'eager' : 'lazy'} // Prioritize first images
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </>
            )}
          </div>
        ))}
      </div>

      {/* Central Content Area */}
      <div className="relative z-10 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 max-w-2xl mx-4">
        <div className="text-center">
          <FadeIn delay={0.8}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight text-gray-900 dark:text-white">
              El Patio de San Antonio
            </h1>
          </FadeIn>
          <FadeIn delay={1.0}>
            <p className="text-xl md:text-2xl mb-6 font-medium text-orange-600 dark:text-orange-400">
              Mercado Gastronómico del Oriente
            </p>
          </FadeIn>
          <FadeIn delay={1.2}>
            <p className="text-lg md:text-xl mb-12 opacity-80 leading-relaxed text-gray-700 dark:text-gray-300">
              Una experiencia culinaria que conecta tradición e innovación
            </p>
          </FadeIn>
          <FadeIn delay={1.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <AnimatedButton
                size="lg"
                onClick={handleWhatsApp}
                className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-4 text-lg shadow-xl"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Reservar Mesa
              </AnimatedButton>
              <AnimatedButton
                size="lg"
                variant="outline"
                onClick={handleViewMenu}
                className="border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white font-semibold px-8 py-4 text-lg"
              >
                <FileText className="mr-2 h-5 w-5" />
                Ver Carta
              </AnimatedButton>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Scroll Indicator */}
      <FadeIn delay={1.6}>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-orange-600 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-orange-600 rounded-full mt-2" />
          </div>
        </div>
      </FadeIn>
    </section>
  );
};

export default MosaicHero;