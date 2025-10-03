import { useEffect, useState } from 'react';
import { AnimatedButton, FadeIn } from '@/components/ui/animated-components';
import { ParallaxImage } from '@/components/ui/parallax';
import { MessageCircle, FileText } from 'lucide-react';
import { imageAssets } from '@/lib/asset-manifest';
import heroVideoSrc from '@/assets/reelsvideo.io_1759436726509.mp4';
import heroPoster from '@/assets/reelsvideo.io_1759436709690.jpeg';
import logoImage from '@/assets/cropped-Logo_Patio.png';

// (Otros variantes experimentales removidos para enfoque en video principal)

const ROTATE = false; // set true if you want background rotation
const ROTATE_INTERVAL = 9000; // ms
const HERO_TYPE = 'video';
// EXPERIMENTAL HERO SELECTOR
// Change this to test different approaches:
// 'traditional' | 'video' | 'mosaic' | 'minimal' | 'split' | 'floating'

const Hero = () => {
  const [index, setIndex] = useState(0);

  // Memoize hero images to prevent recalculation
  const heroImages = imageAssets.filter(a => a.category === 'hero');

  useEffect(() => {
    if (!ROTATE || heroImages.length <= 1) return;
    const id = setInterval(() => {
      setIndex(prev => (prev + 1) % heroImages.length);
    }, ROTATE_INTERVAL);
    return () => clearInterval(id);
  }, [heroImages.length]);

  if (HERO_TYPE === 'video') {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video background directo */}
        <video
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          src={heroVideoSrc}
          poster={heroPoster}
          autoPlay
            // muted + playsInline indispensables para autoplay móvil
          muted
          playsInline
          loop
          preload="auto"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/70" />
        {/* Film grain opcional */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay">
          <div className="w-full h-full bg-noise" />
        </div>
        {/* Contenido */}
        <div className="relative z-10 container mx-auto px-4 text-left text-primary-foreground max-w-6xl">
          <div className="max-w-2xl">
            <FadeIn delay={0.1}>
              <div className="mb-6 flex items-center gap-4">
                <img
                  src={logoImage}
                  alt="Logo El Patio de San Antonio"
                  className="h-16 w-auto md:h-20 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] select-none"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">El Patio de San Antonio</h1>
            </FadeIn>
            <FadeIn delay={0.4}>
              <p className="text-xl md:text-2xl mb-6 font-medium text-primary-foreground/95">Mercado Gastronómico del Oriente</p>
            </FadeIn>
            <FadeIn delay={0.6}>
              <p className="text-lg md:text-xl mb-12 opacity-90 leading-relaxed">Sabores auténticos que cobran vida en cada rincón</p>
            </FadeIn>
            <FadeIn delay={0.8}>
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <AnimatedButton
                  size="lg"
                  onClick={() => window.open('https://wa.me/573001234567?text=Hola! Me gustaría reservar una mesa en El Patio','_blank')}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-4 text-lg shadow-xl"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Reservar Mesa
                </AnimatedButton>
                <AnimatedButton
                  size="lg"
                  variant="outline"
                  onClick={() => document.getElementById('featured-dishes')?.scrollIntoView({behavior:'smooth'})}
                  className="bg-transparent border-2 border-primary-foreground/70 text-primary-foreground hover:bg-primary-foreground hover:text-foreground font-semibold px-8 py-4 text-lg backdrop-blur-sm"
                >
                  <FileText className="mr-2 h-5 w-5" />
                  Ver Carta
                </AnimatedButton>
              </div>
            </FadeIn>
          </div>
        </div>
        {/* Indicador scroll */}
        <FadeIn delay={1.0}>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-primary-foreground rounded-full flex justify-center">
              <div className="w-1.5 h-3 bg-primary-foreground rounded-full mt-2" />
            </div>
          </div>
        </FadeIn>
      </section>
    );
  }


  // Traditional Hero (fallback)
  const primary = heroImages.find(i => i.id === 'hero-primary');
  const active = primary || heroImages[index] || heroImages[0];

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
      {/* Hero Background - Optimized for Sharpness */}
      <div className="absolute inset-0">
        <img
          src={active.src}
          alt={active.alt}
          className="w-full h-full object-cover object-[70%_45%] 
                     [image-rendering:high-quality] [image-rendering:-webkit-optimize-contrast]
                     contrast-[1.05] saturate-[1.02] [filter:unsharp-mask(amount:0.5,radius:0.5,threshold:0)]"
        />
      </div>
      {/* Optimized overlay for nocturnal atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-black/40" />

      {/* Content - Left-aligned for better focal flow */}
      <div className="relative z-10 container mx-auto px-4 text-left text-primary-foreground max-w-6xl">
        <div className="max-w-2xl">
          <FadeIn delay={0.2}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
              El Patio de San Antonio
            </h1>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="text-xl md:text-2xl mb-6 font-medium text-primary-foreground/90">
              Mercado Gastronómico del Oriente
            </p>
          </FadeIn>
          <FadeIn delay={0.6}>
            <p className="text-lg md:text-xl mb-12 opacity-85 leading-relaxed">
              Donde cada mesa cuenta una historia y cada plato despierta emociones
            </p>
          </FadeIn>
        <FadeIn delay={0.8}>
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <AnimatedButton
              size="lg"
              onClick={handleWhatsApp}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-4 text-lg shadow-xl"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Reservar Mesa
            </AnimatedButton>
            <AnimatedButton
              size="lg"
              variant="outline"
              onClick={handleViewMenu}
              className="bg-transparent border-2 border-primary-foreground/70 text-primary-foreground hover:bg-primary-foreground hover:text-foreground font-semibold px-8 py-4 text-lg backdrop-blur-sm"
            >
              <FileText className="mr-2 h-5 w-5" />
              Ver Carta
            </AnimatedButton>
          </div>
        </FadeIn>
        </div>
      </div>

      {/* Scroll Indicator */}
      <FadeIn delay={1.0}>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary-foreground rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-primary-foreground rounded-full mt-2" />
          </div>
        </div>
      </FadeIn>
    </section>
  );
};

export default Hero;
