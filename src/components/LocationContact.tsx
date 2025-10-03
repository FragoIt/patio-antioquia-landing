import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Phone, Mail } from "lucide-react";

const LocationContact = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
          Visítanos
        </h2>
        <p className="text-center text-muted-foreground mb-12 text-lg">
          Te esperamos en el corazón de San Antonio de Pereira
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Map */}
          <div className="rounded-lg overflow-hidden shadow-lg h-96">
            {/* dale formato a este iframe para que ocupe todo el contenedor y sea responsive */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126940.00058904107!2d-75.441523461773!3d6.147483423469593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e469f2f7aaa1f25%3A0x7af532e1bbc4fed5!2srestaurante%20el%20patio%20de%20san%20antonio!5e0!3m2!1ses!2sco!4v1759450146377!5m2!1ses!2sco"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Dirección</h3>
                    <p className="text-muted-foreground">
                      Carrera 55a #22-24<br />
                      San Antonio de Pereira, Rionegro<br />
                      Antioquia, Colombia
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-secondary/10 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Horarios</h3>
                    <p className="text-muted-foreground">
                      Lunes a Jueves: 12:00 PM - 10:00 PM<br />
                      Viernes a Sábado: 12:00 PM - 11:00 PM<br />
                      Domingo: 11:00 AM - 9:00 PM
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                size="lg"
                onClick={() => window.open("https://wa.me/573001234567", "_blank")}
              >
                <Phone className="mr-2 h-5 w-5" />
                WhatsApp
              </Button>
              <Button 
                className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold"
                size="lg"
                onClick={() => window.open("tel:+573001234567", "_blank")}
              >
                <Phone className="mr-2 h-5 w-5" />
                Llamar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationContact;
