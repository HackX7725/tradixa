"use client";

import { LANDING_DATA } from "@/data/landing";
import { Navbar } from "@/components/landing/Navbar";
import { PremiumFooter } from "@/components/landing/Footer";
import { Search, Fuel, Gauge, ShieldCheck, ChevronRight, Zap, ArrowRight, MapPin } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { useListings } from "@/hooks/use-listings";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function VehiclesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { listings, loading, error } = useListings("Vehicles");

  useEffect(() => {
    if (error) {
      toast.error("Showroom telemetry connection failed.");
    }
  }, [error]);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(".vehicle-animate", {
      x: -40,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power2.out",
    });
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Cinematic Hero */}
      <section className="relative h-[80vh] flex items-center px-10 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1603584173870-7f30df006d64?auto=format&fit=crop&q=80&w=2000"
            alt="Hero Vehicle"
            fill
            className="object-cover opacity-50 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full space-y-8">
          <div className="flex items-center gap-4 vehicle-animate">
            <Zap className="w-5 h-5 text-zinc-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400">High Performance Showroom</span>
          </div>
          <h1 className="text-8xl md:text-[12rem] font-bold tracking-tighter leading-[0.8] vehicle-animate">
            DRIVE <br /> ELITE.
          </h1>
          <p className="text-xl text-zinc-400 max-w-md font-light leading-relaxed vehicle-animate">
            Hand-selected exotic and luxury vehicles, inspected and certified for the modern connoisseur.
          </p>
        </div>
      </section>

      {/* Dynamic Showroom Grid */}
      <section className="py-32 px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-20">
            <h2 className="text-4xl font-bold tracking-tight">Active Inventory</h2>
            <div className="flex gap-6">
              {["All", "Exotic", "Luxury", "SUVs", "Electric"].map(cat => (
                <button key={cat} className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="aspect-[4/5] rounded-[2rem] bg-zinc-900 w-full" />
              ))
            ) : listings.length > 0 ? (
              listings.map((vehicle) => (
                <div key={vehicle.id} className="group relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-zinc-900 vehicle-animate">
                  <Image 
                    src={vehicle.image} 
                    alt={vehicle.title} 
                    fill 
                    className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
                  
                  <div className="absolute top-8 left-8">
                    <span className="bg-white text-black px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-tighter">
                      {vehicle.badge || "Featured"}
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-10 space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-3xl font-bold tracking-tight">{vehicle.title}</h3>
                      <div className="flex items-center gap-3 text-zinc-400">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">{vehicle.location}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                      <div className="space-y-1">
                        <Fuel className="w-4 h-4 text-zinc-500" />
                        <p className="text-[10px] font-bold text-zinc-400">Hybrid</p>
                      </div>
                      <div className="space-y-1">
                        <Gauge className="w-4 h-4 text-zinc-500" />
                        <p className="text-[10px] font-bold text-zinc-400">650 HP</p>
                      </div>
                      <div className="space-y-1">
                        <ShieldCheck className="w-4 h-4 text-zinc-500" />
                        <p className="text-[10px] font-bold text-zinc-400">Certified</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <span className="text-2xl font-bold">{vehicle.price}</span>
                      <button className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="lg:col-span-3 py-32 text-center border border-zinc-800 rounded-[2rem]">
                 <p className="text-xl font-bold text-zinc-500">The showroom is currently undergoing inventory rotation.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <PremiumFooter />
    </main>
  );
}
