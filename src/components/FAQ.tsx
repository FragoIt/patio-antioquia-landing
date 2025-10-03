import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal, StaggeredScrollReveal } from '@/components/ui/scroll-reveal';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getAssetById } from '@/lib/asset-manifest';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem = ({ question, answer, isOpen, onToggle }: FAQItemProps) => {
  return (
    <motion.div
      className="border border-border/20 rounded-lg overflow-hidden bg-card shadow-sm"
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors duration-200"
      >
        <h3 className="text-lg font-semibold text-card-foreground pr-4">
          {question}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex-shrink-0"
        >
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        </motion.div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: 1, 
              height: "auto",
              transition: {
                height: {
                  duration: 0.4,
                  ease: [0.04, 0.62, 0.23, 0.98]
                },
                opacity: {
                  duration: 0.25,
                  delay: 0.1
                }
              }
            }}
            exit={{ 
              opacity: 0, 
              height: 0,
              transition: {
                height: {
                  duration: 0.4,
                  ease: [0.04, 0.62, 0.23, 0.98]
                },
                opacity: {
                  duration: 0.25
                }
              }
            }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-4 text-muted-foreground leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const faqData = [
  {
    question: "¿Necesito hacer una reserva?",
    answer: "Para grupos de 6 personas o más, recomendamos hacer una reserva previa. Para grupos más pequeños, generalmente tenemos disponibilidad, pero siempre es mejor reservar para garantizar tu mesa en el horario preferido."
  },
  {
    question: "¿Pueden acomodar restricciones dietéticas?",
    answer: "¡Absolutamente! Tenemos opciones vegetarianas, veganas, sin gluten y para otras restricciones dietéticas. Nuestros chefs pueden adaptar muchos platos según tus necesidades. Solo háznoslo saber al hacer tu reserva."
  },
  {
    question: "¿El menú cambia según la temporada?",
    answer: "Sí, nuestro menú se actualiza regularmente para aprovechar los ingredientes más frescos de temporada. Mantenemos nuestros platos clásicos favoritos mientras introducimos nuevas creaciones que reflejan la temporada actual."
  },
  {
    question: "¿Ofrecen servicios de catering?",
    answer: "Sí, ofrecemos catering completo para eventos de todos los tamaños. Desde cenas íntimas hasta grandes celebraciones, nuestro equipo puede crear menús personalizados y brindar servicio profesional para tu evento especial."
  },
  {
    question: "¿Puedo reservar el restaurante para un evento privado?",
    answer: "¡Por supuesto! Tenemos espacios disponibles para eventos privados. Podemos acomodar desde cenas íntimas hasta grandes celebraciones. Contáctanos para discutir tus necesidades específicas y crear una experiencia memorable."
  },
  {
    question: "¿Son pet-friendly?",
    answer: "¡Sí! Damos la bienvenida a tus compañeros peludos en nuestra terraza exterior. Tenemos agua fresca disponible para las mascotas y nuestro personal estará encantado de cuidar tanto de ti como de tu mascota."
  }
];

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqItems = faqData.map((item, index) => (
    <FAQItem
      key={index}
      question={item.question}
      answer={item.answer}
      isOpen={openItems.includes(index)}
      onToggle={() => toggleItem(index)}
    />
  ));

  const decor = getAssetById('decor-faq') || getAssetById('textura-suave');

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative asset (aria-hidden) */}
      {decor && (
        <motion.div
          aria-hidden
          initial={{ opacity: 0, scale: 0.95, rotate: -3 }}
          whileInView={{ opacity: 0.25, scale: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="pointer-events-none absolute -top-12 -right-12 w-[420px] aspect-[3/4] rounded-3xl overflow-hidden shadow-xl hidden md:block"
          style={{ maskImage: 'radial-gradient(circle at 70% 30%, black 60%, transparent 90%)' }}
        >
          <div
            className="w-full h-full scale-105"
            style={{
              backgroundImage: `url(${decor.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(1px) brightness(0.95) saturate(1.05)',
              transform: 'translateZ(0)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/60 via-background/30 to-background/70 backdrop-blur-[2px]" />
        </motion.div>
      )}
      <div className="container mx-auto px-4 max-w-4xl relative">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
            ¿Tienes alguna pregunta?
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Desde detalles de la comida hasta reservas de eventos, aquí tienes todo lo que necesitas saber para planificar tu visita
          </p>
        </ScrollReveal>

        <StaggeredScrollReveal
          className="space-y-4"
          staggerDelay={0.1}
        >
          {faqItems}
        </StaggeredScrollReveal>
      </div>
    </section>
  );
};

export default FAQ;