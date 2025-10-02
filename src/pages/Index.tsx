import Hero from "@/components/Hero";
import ValueProposition from "@/components/ValueProposition";
import Experiences from "@/components/Experiences";
import FeaturedDishes from "@/components/FeaturedDishes";
import EventsSection from "@/components/EventsSection";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import PromotionCTA from "@/components/PromotionCTA";
import LocationContact from "@/components/LocationContact";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <ValueProposition />
      <Experiences />
      <FeaturedDishes />
      <EventsSection />
      <Testimonials />
      <Gallery />
      <PromotionCTA />
      <LocationContact />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Index;
