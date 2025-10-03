import { memo, useCallback } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingWhatsApp = memo(() => {
  const handleClick = useCallback(() => {
    window.open("https://wa.me/573001234567?text=Hola! Me gustaría más información sobre El Patio", "_blank");
  }, []);

  return (
    <Button
      onClick={handleClick}
      size="lg"
      className="fixed bottom-6 right-6 z-50 rounded-full w-16 h-16 p-0 bg-[#25D366] hover:bg-[#128C7E] shadow-2xl hover:scale-110 transition-all duration-300 animate-bounce gpu-accelerated"
      aria-label="Contactar por WhatsApp - Abre en nueva ventana"
      title="¡Contáctanos por WhatsApp!"
    >
      <MessageCircle className="h-8 w-8 text-white" aria-hidden="true" />
    </Button>
  );
});

export default FloatingWhatsApp;
