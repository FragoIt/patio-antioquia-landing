import { ScrollReveal, StaggeredScrollReveal } from "@/components/ui/scroll-reveal";
import { motion } from "framer-motion";
import { imageAssets } from "@/lib/asset-manifest";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";

// Curate subset: select some ambiente + bebida + plato fresco
const curated = imageAssets
  .filter((a) =>
    [
      "ambiente-1",
      "ambiente-2",
      "ambiente-3",
      "bebida-1",
      "bebida-2",
      "plato-7", // ensalada fresca
      "plato-8", // vegetal saludable
      "plato-5",
    ].includes(a.id)
  )
  .slice(0, 8);

const Gallery = () => {
  const galleryItems = curated.map((asset) => (
    <motion.div
      key={asset.id}
      className="relative overflow-hidden rounded-lg aspect-square group cursor-pointer shadow-lg"
      whileHover={{
        scale: 1.02,
        y: -4,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.08)",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      <ResponsiveImage
        asset={asset}
        rounded={false}
        className="w-full h-full"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <p className="text-background font-medium text-sm line-clamp-2">
          {asset.alt}
        </p>
      </div>
    </motion.div>
  ));

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
            Vive la Experiencia
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Un vistazo a los momentos especiales en El Patio
          </p>
        </ScrollReveal>

        <StaggeredScrollReveal
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          staggerDelay={0.15}
        >
          {galleryItems}
        </StaggeredScrollReveal>
      </div>
    </section>
  );
};

export default Gallery;
