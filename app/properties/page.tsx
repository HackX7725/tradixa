"use client";

import { LANDING_DATA } from "@/data/landing";
import { Navbar } from "@/components/landing/Navbar";
import { PremiumFooter } from "@/components/landing/Footer";
import { Search, MapPin, Maximize2, BedDouble, Bath, ArrowUpRight, Tag, ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { useListings } from "@/hooks/use-listings";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function PropertiesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { listings, loading, error } = useListings("Property");

  useEffect(() => {
    if (error) {
      toast.error("Institutional data feed interrupted.");
    }
  }, [error]);

  useGSAP(() => {
    gsap.from(".property-animate", {
      y: 60,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: "power4.out",
    });
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="min-h-screen bg-[#F8F9FA]">
      <Navbar />
      
      {/* Editorial Header */}
      <section className="pt-40 pb-24 px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-end">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4 property-animate">
              <div className="w-12 h-[1px] bg-black" />
              <span className="text-[11px] font-bold uppercase tracking-[0.4em]">Real Estate</span>
            </div>
            <h1 className="text-7xl md:text-9xl font-bold tracking-tighter leading-[0.8] property-animate">
              Elite <br /> Estates.
            </h1>
          </div>
          <div className="property-animate">
            <p className="text-2xl text-zinc-500 leading-relaxed max-w-lg mb-10">
              From the serene heights of Islamabad to the urban prestige of DHA Lahore, discover Pakistan&apos;s most coveted addresses.
            </p>
            <div className="flex gap-4">
              <button className="h-14 px-10 bg-black text-white rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all">
                Book a Viewing
              </button>
              <button className="h-14 px-10 border border-zinc-200 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-white transition-all">
                Virtual Tours
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Partnerships Marquee */}
      <section className="py-10 px-10 bg-black text-white overflow-hidden">
        <div className="flex items-center gap-20 animate-marquee whitespace-nowrap">
          {[...LANDING_DATA.partners, ...LANDING_DATA.partners].map((partner, i) => (
            <span key={i} className="text-3xl font-bold tracking-tighter opacity-40 hover:opacity-100 transition-opacity cursor-default uppercase">
              {partner}
            </span>
          ))}
        </div>
      </section>

      {/* Property Filters & Featured */}
      <section className="py-32 px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-20 property-animate">
            <div className="flex gap-4 overflow-x-auto no-scrollbar w-full md:w-auto">
              {["All", "Houses", "Apartments", "Plots", "Commercial"].map((type) => (
                <button key={type} className="px-8 py-4 rounded-xl bg-white border border-zinc-100 text-[11px] font-bold uppercase tracking-widest hover:border-black transition-all">
                  {type}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-96">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input 
                type="text" 
                placeholder="Find a city or project..."
                className="w-full bg-white border border-zinc-100 rounded-xl py-4 pl-14 pr-6 text-sm outline-none focus:border-black transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-8">
                   <Skeleton className="aspect-video rounded-[3rem] w-full" />
                   <div className="space-y-4">
                     <Skeleton className="h-10 w-3/4" />
                     <Skeleton className="h-6 w-1/2" />
                   </div>
                </div>
              ))
            ) : listings.length > 0 ? (
              listings.map((item) => (
                <div key={item.id} className="group cursor-pointer property-animate">
                  <div className="relative aspect-video rounded-[3rem] overflow-hidden bg-zinc-100 mb-10 shadow-2xl">
                    <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                    <div className="absolute top-10 left-10">
                      <span className="bg-white/90 backdrop-blur-md px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">
                        {item.badge || "Verified Asset"}
                      </span>
                    </div>
                    <div className="absolute bottom-10 right-10">
                      <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 shadow-2xl">
                        <ArrowRight className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4 px-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-4xl font-bold tracking-tighter group-hover:text-zinc-500 transition-colors">{item.title}</h3>
                      <span className="text-2xl font-light text-zinc-400">{item.price}</span>
                    </div>
                    <div className="flex items-center gap-6 text-zinc-400">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span className="text-[11px] font-bold uppercase tracking-widest">{item.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4" />
                        <span className="text-[11px] font-bold uppercase tracking-widest">Institutional Grade</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 py-32 text-center border-2 border-dashed border-zinc-100 rounded-[3rem]">
                 <p className="text-2xl font-bold tracking-tight mb-2">No properties currently listed</p>
                 <p className="text-zinc-500">Check back soon for new high-value estate opportunities.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>

      <PremiumFooter />
    </main>
  );
}
