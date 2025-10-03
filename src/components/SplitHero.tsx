import { useState, useEffect } from 'react';
import { AnimatedButton, FadeIn } from '@/components/ui/animated-components';
import { MessageCircle, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { imageAssets } from '@/lib/asset-manifest';

const SplitHero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  
  // Get best storytelling images
  const storyImages = [
    imageAssets.find(a => a.category === 'ambiente' && a.id === 'ambiente-1'),
    imageAssets.find(a => a.category === 'plato' && a.id === 'plato-1'),
    imageAssets.find(a => a.category === 'bebida' && a.id === 'bebida-1'),
    imageAssets.find(a => a.category === 'ambiente' && a.id === 'ambiente-2'),
  ].filter(Boolean);

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
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % storyImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [storyImages.length]);

  const nextImage = () => {
    setCurrentImage(prev => (prev + 1) % storyImages.length);
  };

  const prevImage = () => {
    setCurrentImage(prev => (prev - 1 + storyImages.length) % storyImages.length);
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Left Side - Content */}
      <div className="relative z-10 w-full lg:w-1/2 px-6 lg:px-12 py-12 bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white">
        <div className="max-w-xl mx-auto lg:mx-0">
          <FadeIn delay={0.2}>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium mb-8">
              📍 Rionegro, Antioquia
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <h1 className="text-4xl lg:text-6xl font-black mb-6 leading-tight">
              El Patio de<br />
              <span className="text-orange-500">San Antonio</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.6}>
            <p className="text-xl lg:text-2xl mb-4 font-medium text-orange-400">
              Mercado Gastronómico del Oriente
            </p>
          </FadeIn>

          <FadeIn delay={0.8}>
            <p className="text-lg mb-12 opacity-90 leading-relaxed">
              Cada plato cuenta una historia, cada mesa una experiencia única. 
              Tradición e innovación se encuentran en el corazón de Antioquia.
            </p>
          </FadeIn>

          <FadeIn delay={1.0}>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <AnimatedButton
                size="lg"
                onClick={handleWhatsApp}
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 py-4 text-lg shadow-xl rounded-full"
              >
                <MessageCircle className="mr-3 h-6 w-6" />
                Reservar Mesa
              </AnimatedButton>
              <AnimatedButton
                size="lg"
                variant="outline"
                onClick={handleViewMenu}
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold px-8 py-4 text-lg rounded-full"
              >
                <FileText className="mr-3 h-6 w-6" />
                Ver Carta
              </AnimatedButton>
            </div>
          </FadeIn>

          <FadeIn delay={1.2}>
            <div className="flex items-center gap-4 text-sm opacity-75">
              <span>⭐ Experiencia premium</span>
              <span>🕒 Abierto todos los días</span>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Right Side - Interactive Gallery */}
      <div className="relative w-full lg:w-1/2 min-h-screen">
        {storyImages.map((image, index) => (
          <div
            key={image?.id || index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentImage ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            {image && (
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            )}
          </div>
        ))}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/20" />

        {/* Navigation Controls */}
        <div className="absolute bottom-8 left-8 flex items-center gap-4">
          <button
            onClick={prevImage}
            className="bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/70 transition-all duration-300"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <div className="flex gap-2">
            {storyImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentImage ? 'bg-orange-500' : 'bg-white/50'
                }`}
                aria-label={`Ver imagen ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextImage}
            className="bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/70 transition-all duration-300"
            aria-label="Siguiente imagen"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Image Category Label */}
        <div className="absolute top-8 right-8">
          <div className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
            {storyImages[currentImage]?.category === 'ambiente' && '🏛️ Ambiente'}
            {storyImages[currentImage]?.category === 'plato' && '🍽️ Platos'}
            {storyImages[currentImage]?.category === 'bebida' && '🍹 Bebidas'}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SplitHero;