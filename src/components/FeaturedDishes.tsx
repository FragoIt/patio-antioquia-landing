import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { getAssetsByCategory } from "@/lib/asset-manifest";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";

const dishes = [
  {
    name: "Parrilla Mixta",
    description: "Parrilla mixta con cortes selectos y guarniciones tradicionales.",
    assetId: "plato-1"
  },
  {
    name: "Arepas Artesanales",
    description: "Arepas artesanales acompañadas de guarniciones frescas y salsas caseras.",
    assetId: "plato-2"
  },
  {
    name: "Pescado a la Plancha",
    description: "Filete de pescado a la plancha con camarones y salsa.",
    assetId: "plato-3"
  },
  {
    name: "Tabla de Entradas",
    description: "Selección gourmet de entradas sobre tabla rústica de madera.",
    assetId: "plato-4"
  },
];

const FeaturedDishes = () => {
  const dishImages = getAssetsByCategory('plato');

  return (
    <section id="featured-dishes" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
          Nuestros Recomendados
        </h2>
        <p className="text-center text-muted-foreground mb-12 text-lg">
          Descubre algunos de nuestros platos más populares
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {dishes.map((dish, index) => {
            const dishImage = dishImages.find(img => img.id === dish.assetId);
            return (
              <Card 
                key={index}
                className="overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="relative overflow-hidden h-64">
                  {dishImage ? (
                    <ResponsiveImage 
                      asset={dishImage} 
                      className="h-full w-full group-hover:scale-110 transition-transform duration-500" 
                      rounded={false}
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <span className="text-muted-foreground">Imagen no disponible</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-card-foreground">{dish.name}</h3>
                  <p className="text-muted-foreground">{dish.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button 
            size="lg"
            variant="outline"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-8 py-6 text-lg transition-all hover:scale-105"
            onClick={() => window.open("https://wa.me/573001234567?text=Hola! Me gustaría ver la carta completa", "_blank")}
          >
            <ExternalLink className="mr-2 h-5 w-5" />
            Explora la Carta Completa
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDishes;
