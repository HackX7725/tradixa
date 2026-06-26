"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
          <section className="py-10 px-10">
            <div className="max-w-7xl mx-auto flex justify-center">
               <div className="inline-flex bg-zinc-100 p-2 rounded-full border border-zinc-200">
                  <Link href="/marketplace">
                    <button className="px-10 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-black transition-all">
                      Marketplace
                    </button>
                  </Link>
                  <Link href="/properties">
                    <button className="px-10 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-black transition-all">
                      Properties
                    </button>
                  </Link>
                  <Link href="/vehicles">
                    <button className="px-10 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-black transition-all">
                      Vehicles
                    </button>
                  </Link>
               </div>
            </div>
          </section>
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
