import { memo, lazy, Suspense } from 'react';
import Hero from "@/components/Hero";
import ValueProposition from "@/components/ValueProposition";
import Experiences from "@/components/Experiences";
import FeaturedDishes from "@/components/FeaturedDishes";
import EventsSection from "@/components/EventsSection";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

// Lazy load below-fold components
const ExperienceVideoSection = lazy(() => import("@/components/ExperienceVideoSection"));
const ProcessSection = lazy(() => import("@/components/ProcessSection"));
const FAQ = lazy(() => import("@/components/FAQ"));
const PromotionCTA = lazy(() => import("@/components/PromotionCTA"));
const LocationContact = lazy(() => import("@/components/LocationContact"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = memo(() => {
  return (
    <div className="min-h-screen">
      <Hero />
      <ValueProposition />
      <Experiences />
      <FeaturedDishes />
      <EventsSection />
      <Suspense fallback={<div className="h-32 bg-gray-100 animate-pulse" />}>
        <ProcessSection />
      </Suspense>
      <Testimonials />
      <Gallery />
      <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
        <ExperienceVideoSection />
      </Suspense>
      <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse" />}>
        <FAQ />
      </Suspense>
      <Suspense fallback={<div className="h-32 bg-orange-100 animate-pulse" />}>
        <PromotionCTA />
      </Suspense>
      <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse" />}>
        <LocationContact />
      </Suspense>
      <Suspense fallback={<div className="h-16 bg-gray-800 animate-pulse" />}>
        <Footer />
      </Suspense>
      <FloatingWhatsApp />
    </div>
  );
});

export default Index;
