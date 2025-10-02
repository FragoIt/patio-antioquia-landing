import { Facebook, Instagram, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-3">El Patio de San Antonio</h3>
            <p className="text-background/70 mb-4 max-w-md">
              Mercado gastronómico premium en Rionegro, Antioquia. 
              Tu destino para experiencias culinarias únicas en el Oriente antioqueño.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://instagram.com/elpatiodesanantonio" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-background/10 hover:bg-background/20 p-2 rounded-full transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://facebook.com/elpatiodesanantonio" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-background/10 hover:bg-background/20 p-2 rounded-full transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="mailto:info@elpatiodesanantonio.com"
                className="bg-background/10 hover:bg-background/20 p-2 rounded-full transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-3">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-background/70">
              <li>
                <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-background transition-colors">
                  Inicio
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("featured-dishes")} className="hover:text-background transition-colors">
                  Carta
                </button>
              </li>
              <li>
                <button onClick={() => window.open("https://wa.me/573001234567?text=Hola! Me gustaría reservar", "_blank")} className="hover:text-background transition-colors">
                  Reservas
                </button>
              </li>
              <li>
                <button onClick={() => window.open("https://wa.me/573001234567?text=Hola! Necesito información sobre eventos", "_blank")} className="hover:text-background transition-colors">
                  Eventos
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-3">Contacto</h4>
            <ul className="space-y-2 text-background/70">
              <li>Carrera 55a #22-24</li>
              <li>San Antonio de Pereira</li>
              <li>Rionegro, Antioquia</li>
              <li className="pt-2">
                <a href="tel:+573001234567" className="hover:text-background transition-colors">
                  +57 300 123 4567
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 pt-6 text-center text-background/60 text-sm">
          <p>&copy; {currentYear} El Patio de San Antonio. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
