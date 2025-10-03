import { AnimatedCard } from "@/components/ui/animated-components";
import { ScrollReveal, StaggeredScrollReveal } from "@/components/ui/scroll-reveal";
import { CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { getAssetById } from "@/lib/asset-manifest";
import { motion } from "framer-motion";

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
  const bg = getAssetById('ambiente-blur-base');
  const testimonialCards = testimonials.map((testimonial, index) => (
    <AnimatedCard 
      key={index}
      className="bg-background/10 backdrop-blur-sm border-background/20 hover:bg-background/15 transition-all duration-300"
      hoverScale={1.05}
      hoverY={-6}
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
    </AnimatedCard>
  ));

  return (
    <section className="py-24 bg-foreground text-background relative overflow-hidden">
      {/* Background image with layered gradients */}
      {bg && (
        <div className="absolute inset-0 -z-10">
          <motion.div
            aria-hidden
            initial={{ scale: 1.05, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.5 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${bg.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(18px) brightness(0.9) saturate(1.1)',
              transform: 'translateZ(0)',
            }}
          />
          {/* overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/60 to-foreground/80" />
          <div className="absolute inset-0 mix-blend-overlay opacity-30 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.15),transparent_60%)]" />
        </div>
      )}
      {/* Accent glows */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-accent/25 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-primary/25 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Lo que dicen nuestros visitantes
          </h2>
          <p className="text-center text-background/70 mb-12 text-lg">
            Experiencias reales de quienes nos han visitado
          </p>
        </ScrollReveal>

        <StaggeredScrollReveal
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          staggerDelay={0.2}
        >
          {testimonialCards}
        </StaggeredScrollReveal>
      </div>
    </section>
  );
};

export default Testimonials;
