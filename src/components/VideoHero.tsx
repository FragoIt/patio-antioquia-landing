import { useEffect, useState, useRef, memo, useCallback } from 'react';
import { AnimatedButton, FadeIn } from '@/components/ui/animated-components';
import { MessageCircle, FileText, Play, Pause } from 'lucide-react';
import { imageAssets } from '@/lib/asset-manifest';
// Import the requested hero video & poster asset so bundler handles them
import heroVideoSrc from '@/assets/reelsvideo.io_1759436726509.mp4';
import heroPoster from '@/assets/reelsvideo.io_1759436709690.jpeg';

const VideoHero = memo(() => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Specific forced hero video (per user request)
  const heroVideo = {
    src: heroVideoSrc,
    poster: heroPoster,
    alt: 'Ambiente animado de clientes disfrutando en el patio'
  };
  const fallbackImage = imageAssets.find(a => a.category === 'ambiente');

  const handleWhatsApp = useCallback(() => {
    window.open(
      'https://wa.me/573001234567?text=Hola! Me gustaría reservar una mesa en El Patio',
      '_blank'
    );
  }, []);

  const handleViewMenu = useCallback(() => {
    const menuSection = document.getElementById('featured-dishes');
    menuSection?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const togglePlayPause = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => setIsLoaded(true);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    // Auto-play attempt
    video.play().catch(() => {
      // Fallback if autoplay is blocked
      setIsPlaying(false);
    });

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      {heroVideo && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          loop
          muted
          playsInline
          autoPlay
          preload="auto"
          poster={heroVideo.poster}
        >
          <source src={heroVideo.src} type="video/mp4" />
        </video>
      )}

      {/* Fallback Image (if video fails) */}
      {fallbackImage && (
        <img
          src={fallbackImage.src}
          alt={fallbackImage.alt}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isLoaded ? 'opacity-0' : 'opacity-100'
          }`}
        />
      )}

      {/* Cinematic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/70" />
      
      {/* Film Grain Effect */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay">
        <div className="w-full h-full bg-noise" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-left text-primary-foreground max-w-6xl">
        <div className="max-w-2xl">
          <FadeIn delay={0.3}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
              El Patio de San Antonio
            </h1>
          </FadeIn>
          <FadeIn delay={0.5}>
            <p className="text-xl md:text-2xl mb-6 font-medium text-primary-foreground/95">
              Mercado Gastronómico del Oriente
            </p>
          </FadeIn>
          <FadeIn delay={0.7}>
            <p className="text-lg md:text-xl mb-12 opacity-90 leading-relaxed">
              Sabores auténticos que cobran vida en cada rincón
            </p>
          </FadeIn>
          <FadeIn delay={0.9}>
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

      {/* Video Controls */}
      <FadeIn delay={1.2}>
        <button
          onClick={togglePlayPause}
          className="absolute bottom-8 right-8 bg-black/50 backdrop-blur-sm border border-white/20 text-white p-3 rounded-full hover:bg-black/70 transition-all duration-300 z-20"
          aria-label={isPlaying ? 'Pausar video' : 'Reproducir video'}
        >
          {isPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5 ml-0.5" />
          )}
        </button>
      </FadeIn>

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
});

export default VideoHero;