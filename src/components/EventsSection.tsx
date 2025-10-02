import { Button } from "@/components/ui/button";
import { Calendar, Users, Sparkles } from "lucide-react";

const EventsSection = () => {
  return (
    <section className="py-20 bg-secondary text-secondary-foreground relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <Sparkles className="h-12 w-12 mx-auto mb-6 text-accent" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Celebra con Nosotros
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90 leading-relaxed">
            Desde cumpleaños y aniversarios hasta eventos corporativos, en El Patio hacemos 
            que cada ocasión sea inolvidable. También llevamos nuestro sabor a tu evento con 
            servicio de catering personalizado.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-background/10 backdrop-blur-sm rounded-lg p-6 hover:bg-background/20 transition-colors">
              <Calendar className="h-8 w-8 mx-auto mb-3 text-accent" />
              <h3 className="font-semibold text-lg mb-2">Eventos Privados</h3>
              <p className="text-sm opacity-80">Celebraciones personalizadas con menú a tu medida</p>
            </div>
            <div className="bg-background/10 backdrop-blur-sm rounded-lg p-6 hover:bg-background/20 transition-colors">
              <Users className="h-8 w-8 mx-auto mb-3 text-accent" />
              <h3 className="font-semibold text-lg mb-2">Eventos Corporativos</h3>
              <p className="text-sm opacity-80">El espacio ideal para tu equipo de trabajo</p>
            </div>
            <div className="bg-background/10 backdrop-blur-sm rounded-lg p-6 hover:bg-background/20 transition-colors">
              <Sparkles className="h-8 w-8 mx-auto mb-3 text-accent" />
              <h3 className="font-semibold text-lg mb-2">Catering</h3>
              <p className="text-sm opacity-80">Llevamos nuestra gastronomía a tu evento</p>
            </div>
          </div>

          <Button 
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-6 text-lg transition-all hover:scale-105"
            onClick={() => window.open("https://wa.me/573001234567?text=Hola! Me gustaría información sobre eventos y catering", "_blank")}
          >
            Consulta Eventos y Catering
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
