import { AnimatedButton, FadeIn } from '@/components/ui/animated-components';
import { MessageCircle, FileText, MapPin, Clock, Star } from 'lucide-react';

const MinimalHero = () => {
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

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Optimized Static Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-red-600 to-amber-700">
        {/* Simplified pattern - no animations for performance */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] bg-[length:40px_40px]" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white max-w-5xl">
        <FadeIn delay={0.2}>
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-sm font-medium mb-6">
              <MapPin className="h-4 w-4" />
              Rionegro, Antioquia
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <h1 className="text-5xl md:text-8xl font-black mb-8 leading-none tracking-tight">
            EL PATIO
            <br />
            <span className="text-4xl md:text-6xl font-light opacity-90">
              de San Antonio
            </span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.6}>
          <p className="text-xl md:text-3xl mb-4 font-medium opacity-95">
            Mercado Gastronómico del Oriente
          </p>
        </FadeIn>

        <FadeIn delay={0.8}>
          <div className="flex flex-wrap justify-center gap-6 mb-12 text-sm md:text-base opacity-90">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>Abierto todos los días</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-current" />
              <span>Experiencia premium</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <span>Reservas disponibles</span>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={1.0}>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <AnimatedButton
              size="lg"
              onClick={handleWhatsApp}
              className="bg-white text-orange-600 hover:bg-gray-50 font-bold px-10 py-5 text-lg shadow-2xl rounded-full transform transition-all duration-300 hover:scale-105"
            >
              <MessageCircle className="mr-3 h-6 w-6" />
              Reservar Mesa Ahora
            </AnimatedButton>
            <AnimatedButton
              size="lg"
              variant="outline"
              onClick={handleViewMenu}
              className="border-3 border-white text-white hover:bg-white hover:text-orange-600 font-bold px-10 py-5 text-lg rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              <FileText className="mr-3 h-6 w-6" />
              Explorar Carta
            </AnimatedButton>
          </div>
        </FadeIn>

        <FadeIn delay={1.2}>
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed opacity-85">
            Donde los sabores tradicionales de Antioquia se encuentran con la innovación culinaria. 
            Cada plato cuenta una historia, cada mesa una experiencia única.
          </p>
        </FadeIn>
      </div>

      {/* Scroll Indicator */}
      <FadeIn delay={1.4}>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-white rounded-full mt-2" />
          </div>
        </div>
      </FadeIn>
    </section>
  );
};

export default MinimalHero;