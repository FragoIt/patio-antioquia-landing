import { ScrollReveal, StaggeredScrollReveal } from '@/components/ui/scroll-reveal';
import { AutoPlayVideo } from '@/components/ui/AutoPlayVideo';
import { getVideoAssets } from '@/lib/asset-manifest';

const videos = getVideoAssets('experiencia').slice(0, 3);

const ExperienceVideoSection = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-accent/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-primary/20 rounded-full blur-3xl" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 tracking-tight text-foreground">
            La Experiencia en Movimiento
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-14 text-lg">
            Momentos vivos que capturan la esencia de nuestro espacio gastronómico.
          </p>
        </ScrollReveal>

        <StaggeredScrollReveal className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.18}>
          {videos.map(v => (
            <div key={v.id} className="aspect-[9/16] rounded-xl overflow-hidden shadow-lg border border-foreground/10 bg-foreground/5">
              <AutoPlayVideo
                src={v.src}
                poster={v.poster}
                ariaLabel={v.alt}
                className="w-full h-full"
                overlayGradient
              />
            </div>
          ))}
        </StaggeredScrollReveal>
      </div>
    </section>
  );
};

export default ExperienceVideoSection;
