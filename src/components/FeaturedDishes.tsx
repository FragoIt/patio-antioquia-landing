import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import dish1 from "@/assets/dish-1.jpg";
import dish2 from "@/assets/dish-2.jpg";
import dish3 from "@/assets/dish-3.jpg";
import dish4 from "@/assets/dish-4.jpg";

const dishes = [
  {
    image: dish1,
    name: "Bandeja Paisa Gourmet",
    description: "La tradición antioqueña reinventada con ingredientes premium y presentación moderna.",
  },
  {
    image: dish2,
    name: "Café & Panadería",
    description: "Café de origen con notas frutales acompañado de pan artesanal recién horneado.",
  },
  {
    image: dish3,
    name: "Coctelería Tropical",
    description: "Cócteles de autor con frutas tropicales, hierbas frescas y licores premium.",
  },
  {
    image: dish4,
    name: "Ensaladas & Saludable",
    description: "Propuestas frescas y saludables con ingredientes orgánicos y proteínas de calidad.",
  },
];

const FeaturedDishes = () => {
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
          {dishes.map((dish, index) => (
            <Card 
              key={index}
              className="overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="relative overflow-hidden h-64">
                <img 
                  src={dish.image} 
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2 text-card-foreground">{dish.name}</h3>
                <p className="text-muted-foreground">{dish.description}</p>
              </CardContent>
            </Card>
          ))}
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
