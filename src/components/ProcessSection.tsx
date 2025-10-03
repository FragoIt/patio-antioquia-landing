import { ScrollReveal, StaggeredScrollReveal } from '@/components/ui/scroll-reveal';
import { getAssetById } from '@/lib/asset-manifest';
import { motion } from 'framer-motion';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';

// Explicit mapping aligned with actual imagery content
const steps = [
  {
    assetId: 'proceso-1',
    title: 'Maridaje y Selección',
    text: 'Elegimos cuidadosamente bebidas que complementen perfectamente cada plato y momento especial.',
  },
  {
    assetId: 'proceso-2',
    title: 'Coctelería Artesanal',
    text: 'Preparamos bebidas frescas con técnicas precisas y ingredientes naturales de alta calidad.',
  },
  {
    assetId: 'proceso-3',
    title: 'Cocción a la Parrilla',
    text: 'Dominamos el fuego para lograr el punto exacto: texturas perfectas y sabores intensos.',
  },
  {
    assetId: 'proceso-4',
    title: 'Repostería Creativa',
    text: 'Finalizamos con postres que combinan técnica y creatividad para un cierre memorable.',
  },
];

const ProcessSection = () => {
  return (
    <section className="py-24 bg-muted/20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.15]">
        <div className="absolute -top-10 left-1/4 w-80 h-80 bg-primary/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/25 rounded-full blur-3xl" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">Nuestro Proceso</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-14 text-lg">
            Transparencia y detalle detrás de cada plato que llega a tu mesa.
          </p>
        </ScrollReveal>

        <StaggeredScrollReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16" staggerDelay={0.18}>
          {steps.map((step, i) => {
            const asset = getAssetById(step.assetId);
            if (!asset) return null;
            return (
              <motion.div
                key={step.assetId}
                className="group relative flex flex-col rounded-xl overflow-hidden bg-background shadow border border-foreground/10 hover:shadow-xl transition-shadow"
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 320, damping: 26 }}
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <ResponsiveImage asset={asset} className="h-full w-full" rounded={false} />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-sm font-semibold px-3 py-1 rounded-full shadow">
                    Paso {i + 1}
                  </div>
                </div>
                <div className="p-5 flex flex-col h-full">
                  <h3 className="text-xl font-semibold mb-2 tracking-tight">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">{step.text}</p>
                </div>
              </motion.div>
            );
          })}
        </StaggeredScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="max-w-3xl mx-auto text-center text-base md:text-lg text-muted-foreground leading-relaxed">
            Cuidamos cada detalle para que tu experiencia sea integral: sabor, estética y conexión con el origen de los ingredientes.
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ProcessSection;