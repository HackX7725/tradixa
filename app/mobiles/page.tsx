"use client";

import { LANDING_DATA } from "@/data/landing";
import { Navbar } from "@/components/landing/Navbar";
import { PremiumFooter } from "@/components/landing/Footer";
import { Smartphone, Search, ShieldCheck, Zap, ArrowRight, MapPin, Plus, Cpu } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useListings } from "@/hooks/use-listings";
import { useDebounce } from "@/hooks/use-debounce";
import { Skeleton } from "@/components/ui/skeleton";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function MobilesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 500);
  const { listings, loading } = useListings("Mobiles", debouncedSearch);
  const [activeBrand, setActiveBrand] = useState("All");

  const filteredListings = listings.filter(item => {
    if (activeBrand === "All") return true;
    return item.title.toLowerCase().includes(activeBrand.toLowerCase()) || 
           item.category?.toLowerCase().includes(activeBrand.toLowerCase());
  });

  useGSAP(() => {
    gsap.from(".mobile-animate", {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
      stagger: 0.1
    });
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="min-h-screen bg-white selection:bg-black selection:text-white">
      <Navbar />

      {/* Boutique Mobile Hero */}
      <section className="pt-48 pb-32 px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-12">
            <div className="space-y-6 max-w-3xl">
              <span className="mobile-animate text-[11px] font-black uppercase tracking-[0.5em] text-zinc-400">Institutional Tech Exchange</span>
              <h1 className="mobile-animate text-7xl md:text-9xl font-bold tracking-tighter leading-[0.85] text-black">
                Flagship <br /> Exchange.
              </h1>
              <p className="mobile-animate text-2xl text-zinc-500 font-light leading-relaxed">
                The curated portal for high-value mobile assets. Trade flagships with verified hardware audits and PTA authentication.
              </p>
            </div>

            <div className="mobile-animate flex flex-col md:flex-row items-center gap-6 pt-12">
              <Link href="/sell">
                <button className="h-16 px-12 bg-black text-white rounded-2xl text-[13px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-all flex items-center gap-3">
                  <Plus className="w-5 h-5" /> Post Your Device
                </button>
              </Link>
              <div className="relative flex-1 max-w-2xl group">
                <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-black transition-colors" />
                <input 
                  type="text" 
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search flagships, models, or serials..." 
                  className="w-full h-16 pl-20 pr-8 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none focus:border-black focus:bg-white transition-all text-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Minimal Brand Navigation */}
      <section className="py-10 border-y border-zinc-100 bg-white sticky top-24 z-40">
        <div className="max-w-7xl mx-auto px-10 flex items-center justify-between">
           <div className="flex items-center gap-10 overflow-x-auto no-scrollbar">
              {["All", "Apple", "Samsung", "Google", "OnePlus", "Xiaomi"].map((brand) => (
                <button 
                  key={brand}
                  onClick={() => setActiveBrand(brand)}
                  className={`text-[11px] font-black uppercase tracking-[0.3em] transition-all relative py-2 ${activeBrand === brand ? 'text-black' : 'text-zinc-300 hover:text-zinc-500'}`}
                >
                  {brand}
                  {activeBrand === brand && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />}
                </button>
              ))}
           </div>
           <div className="hidden lg:flex items-center gap-6">
              <div className="flex items-center gap-2">
                 <ShieldCheck className="w-4 h-4 text-emerald-600" />
                 <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">PTA Verified</span>
              </div>
              <div className="flex items-center gap-2">
                 <Zap className="w-4 h-4 text-amber-500" />
                 <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Instant Trade</span>
              </div>
           </div>
        </div>
      </section>

      {/* Curated Listing Grid */}
      <section className="py-24 px-10 bg-[#FBFBFB]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="aspect-[4/5] rounded-[3rem] bg-white w-full border border-zinc-100" />
              ))
            ) : filteredListings.length > 0 ? (
              filteredListings.map((item) => (
                <Link key={item.id} href={`/listing/${item.id}`} className="group mobile-animate block">
                  <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden bg-white border border-zinc-100 transition-all duration-700 group-hover:border-black group-hover:shadow-2xl">
                    <Image 
                      src={item.image} 
                      alt={item.title} 
                      fill 
                      className="object-cover transition-transform duration-1000 group-hover:scale-110" 
                    />
                    <div className="absolute top-8 left-8 flex flex-col gap-2">
                      <span className="bg-black text-white px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest">
                        {item.badge || "Verified"}
                      </span>
                    </div>
                    <div className="absolute bottom-8 left-8 right-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                      <div className="w-full h-14 bg-white text-black rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl">
                        Examine Details <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 space-y-4 px-2">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{item.category}</p>
                      <h3 className="text-2xl font-bold tracking-tighter text-black group-hover:text-zinc-600 transition-colors">{item.title}</h3>
                    </div>
                    <div className="flex items-center justify-between pt-6 border-t border-zinc-100">
                      <p className="text-2xl font-bold tracking-tight">{item.price}</p>
                      <div className="flex items-center gap-2 text-zinc-400">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">{item.location}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full py-40 text-center border-2 border-dashed border-zinc-100 rounded-[3rem]">
                <p className="text-xl font-bold text-zinc-400 uppercase tracking-widest">No listings found</p>
                <button 
                  onClick={() => {setSearchInput(""); setActiveBrand("All");}} 
                  className="mt-4 text-xs font-black underline underline-offset-4 uppercase tracking-widest hover:text-zinc-500 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <PremiumFooter />
    </main>
  );
}
