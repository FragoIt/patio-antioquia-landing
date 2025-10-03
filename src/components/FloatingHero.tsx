import { useState, useEffect } from 'react';
import { AnimatedButton, FadeIn } from '@/components/ui/animated-components';
import { MessageCircle, FileText, Sparkles } from 'lucide-react';

const FloatingHero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-900 via-orange-800 to-red-900">
      {/* Dynamic Background Pattern */}
      <div 
        className="absolute inset-0 opacity-30 transition-transform duration-700 ease-out"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
        }}
      />
      
      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: `${10 + (i * 8)}%`,
              top: `${20 + (i * 5)}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + (i % 3)}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content Card */}
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 lg:p-12 shadow-2xl border border-white/20">
          {/* Header Badge */}
          <FadeIn delay={0.2}>
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 bg-orange-500/20 backdrop-blur-sm rounded-full px-6 py-3 text-orange-200 font-medium">
                <Sparkles className="h-5 w-5" />
                Experiencia Gastronómica Premium
              </div>
            </div>
          </FadeIn>

          {/* Main Title */}
          <FadeIn delay={0.4}>
            <h1 className="text-center text-5xl lg:text-7xl font-black mb-6 leading-tight text-white">
              EL PATIO
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                de San Antonio
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.6}>
            <p className="text-center text-xl lg:text-2xl mb-6 font-medium text-orange-300">
              Mercado Gastronómico del Oriente
            </p>
          </FadeIn>

          <FadeIn delay={0.8}>
            <p className="text-center text-lg lg:text-xl mb-12 opacity-90 leading-relaxed text-white max-w-2xl mx-auto">
              Un viaje culinario donde cada sabor cuenta una historia y cada momento 
              se convierte en una experiencia inolvidable
            </p>
          </FadeIn>

          {/* Action Cards */}
          <FadeIn delay={1.0}>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Reservation Card */}
              <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-orange-400/50 transition-all duration-300 hover:scale-105">
                <div className="text-center">
                  <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Reserva tu Mesa</h3>
                  <p className="text-orange-200 mb-4">WhatsApp directo</p>
                  <AnimatedButton
                    onClick={handleWhatsApp}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-xl"
                  >
                    Reservar Ahora
                  </AnimatedButton>
                </div>
              </div>

              {/* Menu Card */}
              <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-yellow-400/50 transition-all duration-300 hover:scale-105">
                <div className="text-center">
                  <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Nuestra Carta</h3>
                  <p className="text-yellow-200 mb-4">Descubre nuestros platos</p>
                  <AnimatedButton
                    onClick={handleViewMenu}
                    variant="outline"
                    className="w-full border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900 font-bold py-3 rounded-xl"
                  >
                    Explorar Menú
                  </AnimatedButton>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Location Info */}
          <FadeIn delay={1.2}>
            <div className="text-center">
              <div className="inline-flex items-center gap-4 text-white/80">
                <span className="flex items-center gap-2">
                  📍 Rionegro, Antioquia
                </span>
                <span className="flex items-center gap-2">
                  🕒 Todos los días
                </span>
                <span className="flex items-center gap-2">
                  ⭐ Experiencia Premium
                </span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Scroll Indicator */}
      <FadeIn delay={1.4}>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/70 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-white/70 rounded-full mt-2" />
          </div>
        </div>
      </FadeIn>
    </section>
  );
};

export default FloatingHero;