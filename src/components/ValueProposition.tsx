import { ScrollReveal } from "@/components/ui/scroll-reveal";

const ValueProposition = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Más que un restaurante, una experiencia
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            En El Patio reunimos lo mejor de la cocina local, cafés especiales, panadería artesanal, 
            coctelería y experiencias gastronómicas en un mismo lugar. Todo en un ambiente acogedor 
            y pet-friendly donde cada visita se convierte en un momento memorable.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ValueProposition;
