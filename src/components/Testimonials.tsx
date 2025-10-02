import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "María Gómez",
    text: "Un lugar mágico en Rionegro. La comida es excelente y el ambiente es perfecto para compartir en familia. ¡Totalmente recomendado!",
    rating: 5,
  },
  {
    name: "Carlos Henao",
    text: "El mejor mercado gastronómico del Oriente. Variedad increíble, café espectacular y los cocteles son de otro nivel. Siempre volvemos.",
    rating: 5,
  },
  {
    name: "Laura Martínez",
    text: "Celebramos nuestro aniversario aquí y fue una experiencia inolvidable. Atención personalizada, comida deliciosa y un ambiente acogedor.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-foreground text-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Lo que dicen nuestros visitantes
        </h2>
        <p className="text-center text-background/70 mb-12 text-lg">
          Experiencias reales de quienes nos han visitado
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="bg-background/10 backdrop-blur-sm border-background/20 hover:bg-background/15 transition-all duration-300 hover:scale-105"
            >
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-background/90 mb-4 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                <p className="font-semibold text-background">
                  — {testimonial.name}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
