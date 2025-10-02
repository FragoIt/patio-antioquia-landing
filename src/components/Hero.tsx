import { Button } from "@/components/ui/button";
import { MessageCircle, FileText } from "lucide-react";
import heroImage from "@/assets/hero-background.jpg";

const Hero = () => {
  const handleWhatsApp = () => {
    window.open("https://wa.me/573001234567?text=Hola! Me gustaría reservar una mesa en El Patio", "_blank");
  };

  const handleViewMenu = () => {
    const menuSection = document.getElementById("featured-dishes");
    menuSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-primary-foreground animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          El Patio de San Antonio
        </h1>
        <p className="text-xl md:text-3xl mb-4 font-medium">
          Mercado Gastronómico del Oriente
        </p>
        <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto opacity-90">
          Un espacio para vivir sabores, experiencias y momentos únicos en Rionegro
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg"
            onClick={handleWhatsApp}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg group transition-all hover:scale-105"
          >
            <MessageCircle className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
            Reservar Mesa
          </Button>
          <Button 
            size="lg"
            variant="outline"
            onClick={handleViewMenu}
            className="bg-background/10 backdrop-blur-sm border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-foreground font-semibold px-8 py-6 text-lg transition-all hover:scale-105"
          >
            <FileText className="mr-2 h-5 w-5" />
            Ver Carta
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-primary-foreground rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
