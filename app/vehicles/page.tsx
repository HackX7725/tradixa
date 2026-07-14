"use client";

import { LANDING_DATA } from "@/data/landing";
import { Navbar } from "@/components/landing/Navbar";
import { PremiumFooter } from "@/components/landing/Footer";
import { Search, Fuel, Gauge, ShieldCheck, ChevronRight, Zap, ArrowRight, MapPin, Plus } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useListings } from "@/hooks/use-listings";
import { useDebounce } from "@/hooks/use-debounce";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function VehiclesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 500);
  const { listings, loading, error } = useListings("Vehicles", debouncedSearch);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    if (error) {
      toast.error("Showroom telemetry connection failed.");
    }
  }, [error]);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(".vehicle-animate", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
    });
  }, { scope: containerRef });

  const vehicleBrands = ["Toyota", "Honda", "Suzuki", "Kia", "Hyundai", "Audi", "BMW", "Mercedes-Benz", "Range Rover", "Lexus"];
  const popularCities = ["Karachi", "Lahore", "Islamabad", "Faisalabad", "Rawalpindi", "Multan", "Peshawar"];

  // Local filtering logic for sub-categories
  const filteredListings = listings.filter(item => {
    if (activeCategory === "All") return true;
    return item.badge?.toLowerCase() === activeCategory.toLowerCase() || 
           item.title.toLowerCase().includes(activeCategory.toLowerCase());
  });

  return (
    <main ref={containerRef} className="min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-x-hidden">
      <Navbar />
      
      {/* Dynamic Editorial Header */}
      <section className="pt-32 md:pt-48 pb-6 md:pb-12 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-6 vehicle-animate">
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-zinc-800" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Pakistan&apos;s Elite Marketplace</span>
            </div>
            <h1 className="text-4xl sm:text-7xl md:text-[9rem] font-bold tracking-tighter leading-[0.85]">
              FIND YOUR <br /> <span className="text-zinc-600 italic">NEXT MOVE.</span>
            </h1>
          </div>
          
          <div className="mt-10 md:mt-20 flex items-center gap-3 overflow-x-auto no-scrollbar w-full vehicle-animate">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mr-4 shrink-0">Popular Cities:</span>
            {popularCities.map(city => (
              <button 
                key={city} 
                onClick={() => setSearchInput(city)}
                className={`h-10 px-4 md:px-6 rounded-full border text-[10px] font-bold uppercase tracking-widest transition-all shrink-0 ${searchInput === city ? 'bg-white text-black border-white' : 'border-zinc-800 hover:bg-white hover:text-black'}`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Marquee (No Banks) */}
      <section className="py-8 md:py-10 bg-zinc-950 border-y border-zinc-900 overflow-hidden">
        <div className="flex items-center gap-16 md:gap-24 animate-marquee whitespace-nowrap">
          {[...vehicleBrands, ...vehicleBrands].map((brand, i) => (
            <span key={i} className="text-xl md:text-3xl font-bold tracking-tighter text-zinc-700 hover:text-white transition-colors cursor-default uppercase">
              {brand}
            </span>
          ))}
        </div>
      </section>

      {/* Marketplace Navigator */}
      <section className="pt-12 md:pt-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
           <div className="inline-flex bg-zinc-900/50 p-1.5 rounded-2xl border border-zinc-800 w-full md:w-auto justify-center">
              <Link href="/properties" className="flex-1 md:flex-none">
                <button className="w-full md:w-auto px-6 md:px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-all">
                  Properties
                </button>
              </Link>
              <button className="flex-1 md:flex-none px-6 md:px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] bg-white text-black shadow-xl">
                Vehicles
              </button>
           </div>
           
           <div className="flex flex-wrap justify-center gap-4 w-full md:w-auto">
             <Link href="/sell" className="flex-1 md:flex-none">
               <button className="w-full md:w-auto h-14 px-8 md:px-10 bg-white text-black rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-all flex items-center justify-center gap-3">
                 <Plus className="w-4 h-4" /> Post Your Vehicle
               </button>
             </Link>
             <Link href="/dashboard" className="flex-1 md:flex-none">
               <button className="w-full md:w-auto h-14 px-8 md:px-10 border border-zinc-800 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-zinc-900 transition-all text-center">
                 My Showroom
               </button>
             </Link>
           </div>
        </div>
      </section>

      {/* Inventory & Advanced Filters */}
      <section className="py-12 md:py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8 mb-12 md:mb-20">
            <div className="flex gap-3 overflow-x-auto no-scrollbar w-full lg:w-auto">
              {["All", "Exotic", "Family", "SUVs", "Modified", "Electric"].map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 md:px-8 py-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all min-w-fit ${activeCategory === cat ? 'bg-zinc-800 text-white border-zinc-700' : 'bg-transparent text-zinc-600 border-zinc-900 hover:border-zinc-700'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full lg:w-96 group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-white transition-colors" />
              <input 
                type="text" 
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search Model, City or Registration..."
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl py-4 pl-14 pr-6 text-sm outline-none focus:border-zinc-500 transition-all text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="aspect-[4/5] rounded-[2.5rem] bg-zinc-900 w-full" />
              ))
            ) : filteredListings.length > 0 ? (
              filteredListings.map((item) => (
                <Link key={item.id} href={`/listing/${item.id}`} className="group relative aspect-[4/5] rounded-3xl md:rounded-[2.5rem] overflow-hidden bg-zinc-900 vehicle-animate border border-zinc-900 hover:border-zinc-700 transition-all block">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill 
                    className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  
                  <div className="absolute top-6 left-6 md:top-8 md:left-8 flex gap-2">
                    <span className="bg-white text-black px-3 md:px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-tighter">
                      {item.badge || "Verified"}
                    </span>
                    <span className="bg-black/50 backdrop-blur-md text-white px-3 md:px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-tighter border border-white/10">
                      PK Registered
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 space-y-4 md:space-y-6">
                    <div className="space-y-1.5">
                      <h3 className="text-2xl md:text-3xl font-bold tracking-tighter leading-tight line-clamp-1">{item.title}</h3>
                      <div className="flex items-center gap-3 text-zinc-400">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">{item.location}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 md:gap-4 py-3 md:py-5 border-y border-white/5">
                      <div className="space-y-1">
                        <Gauge className="w-4 h-4 text-zinc-500" />
                        <p className="text-[9px] font-black text-zinc-500 uppercase">Km</p>
                        <p className="text-[10px] md:text-[11px] font-bold">12,500</p>
                      </div>
                      <div className="space-y-1">
                        <Fuel className="w-4 h-4 text-zinc-500" />
                        <p className="text-[9px] font-black text-zinc-500 uppercase">Fuel</p>
                        <p className="text-[10px] md:text-[11px] font-bold">Petrol</p>
                      </div>
                      <div className="space-y-1">
                        <Zap className="w-4 h-4 text-zinc-500" />
                        <p className="text-[9px] font-black text-zinc-500 uppercase">Type</p>
                        <p className="text-[10px] md:text-[11px] font-bold">Automatic</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1 md:pt-2">
                      <span className="text-xl md:text-2xl font-bold tracking-tight text-white">{item.price}</span>
                      <div className="h-10 md:h-12 px-4 md:px-6 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300 flex items-center justify-center">
                        View Details
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="lg:col-span-3 py-40 text-center border border-zinc-900 rounded-[3rem] bg-zinc-950/50">
                 <p className="text-xl font-bold text-zinc-700 uppercase tracking-widest">No listings found in this category.</p>
                 <p className="text-zinc-800 mt-4 text-[10px] tracking-[0.4em] font-black">Expand your search to Karachi or Lahore</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Nationwide Verified Program */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-32">
        <div className="bg-zinc-900/50 rounded-3xl md:rounded-[3rem] border border-zinc-800 p-8 sm:p-16 md:p-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-6 md:space-y-10">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 w-fit">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Institutional Grade Audits</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tighter leading-none">Pakistan&apos;s First <br /> Verified Showroom.</h2>
            <p className="text-base md:text-lg text-zinc-500 font-light leading-relaxed">
              Every vehicle on Tradixa undergoes a multi-point inspection and biometric verification to ensure the highest standard of trading in Pakistan.
            </p>
            <div className="flex gap-8">
                <div className="space-y-1">
                  <p className="text-2xl md:text-3xl font-bold">100%</p>
                  <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-zinc-600">Secure Trade</p>
                </div>
                <div className="w-[1px] h-12 bg-zinc-800" />
                <div className="space-y-1">
                  <p className="text-2xl md:text-3xl font-bold">Biometric</p>
                  <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-zinc-600">Verification</p>
                </div>
            </div>
          </div>
          <div className="relative aspect-video w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
            <Image 
              src="https://imgd-ct.aeplcdn.com/1056x660/n/cw/ec/198805/fortuner-legender-left-front-three-quarter.jpeg?isig=0&q=80" 
              alt="Toyota Fortuner Legender - Verified" 
              fill 
              className="object-cover" 
            />
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>

      <PremiumFooter />
    </main>
  );
}
