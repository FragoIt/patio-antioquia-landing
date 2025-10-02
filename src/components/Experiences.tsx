import { Utensils, Coffee, Wine, PartyPopper } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const experiences = [
  {
    icon: Utensils,
    title: "Variedad Gastronómica",
    description: "Platos típicos antioqueños, fusión internacional y propuestas innovadoras que deleitan todos los paladares.",
  },
  {
    icon: Coffee,
    title: "Café & Panadería Artesanal",
    description: "Cafés especiales de origen colombiano y panadería recién horneada todos los días.",
  },
  {
    icon: Wine,
    title: "Bar & Coctelería",
    description: "Coctelería de autor con ingredientes tropicales y una cuidada selección de vinos y cervezas artesanales.",
  },
  {
    icon: PartyPopper,
    title: "Eventos & Celebraciones",
    description: "El espacio perfecto para cumpleaños, aniversarios y eventos corporativos con servicio personalizado.",
  },
];

const Experiences = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
          Qué encuentras en El Patio
        </h2>
        <p className="text-center text-muted-foreground mb-12 text-lg max-w-2xl mx-auto">
          Un mercado gastronómico donde convergen sabores, aromas y experiencias únicas
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {experiences.map((exp, index) => (
            <Card 
              key={index}
              className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card"
            >
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <exp.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-card-foreground">{exp.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experiences;
