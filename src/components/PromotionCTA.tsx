import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";

const PromotionCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-background/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <Gift className="h-16 w-16 mx-auto mb-6 animate-bounce" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Tu Experiencia Comienza Aquí
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Reserva hoy y recibe un <span className="font-bold underline decoration-accent decoration-4">detalle especial</span> en tu primera visita
          </p>
          <Button 
            size="lg"
            className="bg-background text-foreground hover:bg-background/90 font-bold px-10 py-7 text-xl shadow-2xl transition-all hover:scale-110"
            onClick={() => window.open("https://wa.me/573001234567?text=Hola! Quiero reservar y recibir el detalle especial de primera visita", "_blank")}
          >
            Reservar Ahora por WhatsApp
          </Button>
          <p className="mt-6 text-sm opacity-75">
            *Válido para nuevos visitantes. Cupos limitados.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PromotionCTA;
