"use client";

import { LANDING_DATA } from "@/data/landing";
import { Navbar } from "@/components/landing/Navbar";
import { PremiumFooter } from "@/components/landing/Footer";
import { Search, Car, Home, Cpu, Smartphone, Gem, Briefcase, MapPin, ArrowRight, Plus } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useListings } from "@/hooks/use-listings";
import { useDebounce } from "@/hooks/use-debounce";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const iconMap: Record<string, any> = {
  vehicles: Car,
  property: Home,
  electronics: Cpu,
  mobile: Smartphone,
  luxury: Gem,
  business: Briefcase,
};

export default function MarketplacePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 500);
  const [activeCategory, setActiveCategory] = useState("All");
  const { listings, loading, error } = useListings(activeCategory === "All" ? "" : activeCategory, debouncedSearch);

  useEffect(() => {
    if (error) {
      toast.error("Marketplace connectivity issue.");
    }
  }, [error]);

  useGSAP(() => {
    gsap.from(".market-animate", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power4.out",
    });
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="min-h-screen bg-[#F8F9FA] selection:bg-black selection:text-white">
      <Navbar />
      
      {/* Search & Categories Hero */}
      <section className="pt-40 pb-20 px-10 bg-white border-b border-zinc-100">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 market-animate">
            <div className="space-y-4">
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none">Pakistan&apos;s Central <br /> Marketplace.</h1>
              <p className="text-xl text-zinc-500 font-light max-w-lg">
                The elite portal for high-value assets. Trade vehicles, properties, electronics and more with institutional security.
              </p>
            </div>
            <Link href="/sell">
              <button className="h-16 px-12 bg-black text-white rounded-2xl text-[13px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-all flex items-center gap-3">
                <Plus className="w-5 h-5" /> Start Selling
              </button>
            </Link>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 market-animate">
            <div className="relative flex-1 group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-black transition-colors" />
              <input 
                type="text" 
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search across all categories (e.g. iPhone 15, DHA Lahore, Land Cruiser)..."
                className="w-full bg-zinc-50 border border-zinc-200 rounded-[1.5rem] py-6 pl-16 pr-16 text-lg outline-none focus:border-black focus:bg-white transition-all shadow-sm"
              />
              {searchInput && (
                <button 
                  onClick={() => setSearchInput("")}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 market-animate">
            <button 
              onClick={() => setActiveCategory("All")}
              className={`flex flex-col items-center justify-center gap-4 p-8 rounded-[2rem] border transition-all duration-500 ${
                activeCategory === "All" 
                  ? "bg-black text-white border-black shadow-2xl shadow-black/20 -translate-y-2" 
                  : "bg-white text-zinc-400 border-zinc-100 hover:border-black hover:text-black"
              }`}
            >
              <div className="w-6 h-6 rounded-lg bg-zinc-100 flex items-center justify-center group-hover:bg-zinc-200">
                <div className={`w-2 h-2 rounded-full ${activeCategory === "All" ? "bg-black" : "bg-zinc-400"}`} />
              </div>
              <div className="text-[11px] font-black uppercase tracking-widest">All Assets</div>
            </button>
            {LANDING_DATA.categories.map((cat) => {
              const Icon = iconMap[cat.id];
              const isActive = activeCategory === cat.label;
              return (
                <button 
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.label)}
                  className={`flex flex-col items-center justify-center gap-4 p-8 rounded-[2rem] border transition-all duration-500 ${
                    isActive 
                      ? "bg-black text-white border-black shadow-2xl shadow-black/20 -translate-y-2" 
                      : "bg-white text-zinc-400 border-zinc-100 hover:border-black hover:text-black"
                  }`}
                >
                  <Icon className={`w-6 h-6 transition-transform ${isActive ? "scale-110" : ""}`} />
                  <div className="text-[11px] font-black uppercase tracking-widest">{cat.label}</div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Results Grid */}
      <section className="py-24 px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12 market-animate">
            <h2 className="text-2xl font-bold tracking-tight">
              {activeCategory === "All" ? "Latest Listings" : `${activeCategory} Listings`}
            </h2>
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
              {listings.length} Results Nationwide
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="aspect-[4/5] rounded-[2rem] bg-white w-full border border-zinc-100" />
              ))
            ) : listings.length > 0 ? (
              listings.map((item) => (
                <Link key={item.id} href={`/listing/${item.id}`} className="group bg-white rounded-[2rem] border border-zinc-100 overflow-hidden hover:border-black transition-all hover:shadow-2xl market-animate block">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image 
                      src={item.image} 
                      alt={item.title} 
                      fill 
                      className="object-cover transition-transform duration-1000 group-hover:scale-110" 
                    />
                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                       <span className="bg-white/90 backdrop-blur-md text-black px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-zinc-200">
                         {item.category}
                       </span>
                       {item.badge && (
                         <span className="bg-black text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest">
                           {item.badge}
                         </span>
                       )}
                    </div>
                  </div>
                  <div className="p-8 space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold tracking-tight line-clamp-2 leading-tight group-hover:text-zinc-600 transition-colors">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 text-zinc-400">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">{item.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-zinc-50">
                      <span className="text-2xl font-bold tracking-tight text-black">{item.price}</span>
                      <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full py-40 text-center border-2 border-dashed border-zinc-200 rounded-[3rem]">
                 <p className="text-xl font-bold text-zinc-400 uppercase tracking-widest">No listings found</p>
                 <button onClick={() => {setSearchInput(""); setActiveCategory("All");}} className="mt-4 text-xs font-black underline underline-offset-4 uppercase tracking-widest hover:text-zinc-500 transition-colors">Clear all filters</button>
              </div>
            )}
          </div>
        </div>
      </section>

      <PremiumFooter />
    </main>
  );
}
