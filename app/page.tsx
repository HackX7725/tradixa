"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Components
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { CategoryBar, ListingGrid } from "@/components/landing/ListingGrid";
import { Splash } from "@/components/landing/Splash";
import { MouseFollower } from "@/components/shared/MouseFollower";
import { PremiumFooter, GlobalPresence } from "@/components/landing/Footer";
import { 
  SellSection,
  FeaturedSpotlight, 
  InsightsSection,
  SecurityProtocol, 
  PartnerLogos, 
  FinalCTA,
  FAQSection
} from "@/components/landing/Sections";

// Data
import { LANDING_DATA } from "@/data/landing";

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }
  }, [isLoaded]);

  return (
    <>
      <MouseFollower />
      {!isLoaded && <Splash onComplete={() => setIsLoaded(true)} />}
      
      <main className={`min-h-screen bg-white font-sans selection:bg-black selection:text-white overflow-x-hidden transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar />
        
        <Hero />
        
        <div className="relative z-20">
          <CategoryBar />
          <ListingGrid />
        </div>

        <SellSection />
        <FeaturedSpotlight />
        <GlobalPresence />
        <InsightsSection />
        <SecurityProtocol />
        <FAQSection />
        <PartnerLogos />
        <FinalCTA />
        <PremiumFooter />
      </main>
    </>
  );
}
