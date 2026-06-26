"use client";

import { LANDING_DATA } from "@/data/landing";
import { Navbar } from "@/components/landing/Navbar";
import { PremiumFooter } from "@/components/landing/Footer";
import { Cpu, Search, Activity, Box, Terminal, ArrowUpRight, MapPin, Plus } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useListings } from "@/hooks/use-listings";
import { useDebounce } from "@/hooks/use-debounce";
import { Skeleton } from "@/components/ui/skeleton";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ElectronicsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 500);
  const { listings, loading } = useListings("Electronics", debouncedSearch);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredListings = listings.filter(item => {
    if (activeCategory === "All") return true;
    return item.title.toLowerCase().includes(activeCategory.toLowerCase()) || 
           item.category?.toLowerCase().includes(activeCategory.toLowerCase()) ||
           item.badge?.toLowerCase().includes(activeCategory.toLowerCase());
  });

  useGSAP(() => {
    gsap.from(".tech-animate", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.1
    });
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="min-h-screen bg-[#0A0A0A] selection:bg-emerald-500 selection:text-black">
      <Navbar />

      {/* Industrial Tech Hero */}
      <section className="pt-48 pb-32 px-10 border-b border-zinc-900 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <div className="space-y-6">
                <div className="tech-animate inline-flex items-center gap-3 px-4 py-2 bg-emerald-500/5 border border-emerald-500/10 rounded-full">
                  <Terminal className="w-4 h-4 text-emerald-500" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">Performance Verified</span>
                </div>
                <h1 className="tech-animate text-7xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-white">Computing <br /> <span className="text-zinc-600">Assets.</span></h1>
                <p className="tech-animate text-xl text-zinc-400 font-light max-w-lg">
                  Institutional grade hardware. From AI workstations to enterprise servers, trade high-performance electronics with zero compromise.
                </p>
              </div>

              <div className="tech-animate flex items-center gap-8">
                 <Link href="/sell">
                   <button className="h-16 px-12 bg-white text-black rounded-full text-[13px] font-black uppercase tracking-widest hover:bg-emerald-500 transition-all flex items-center gap-3">
                     <Plus className="w-5 h-5" /> Post Tech Asset
                   </button>
                 </Link>
                 <div className="hidden md:flex items-center gap-12">
                    <div className="space-y-1">
                       <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Total Value</p>
                       <p className="text-2xl font-bold text-white tracking-tighter">Rs 45.8M+</p>
                    </div>
                    <div className="w-[1px] h-10 bg-zinc-800" />
                    <div className="space-y-1">
                       <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Audit Rate</p>
                       <p className="text-2xl font-bold text-white tracking-tighter">99.8%</p>
                    </div>
                 </div>
              </div>
            </div>

            <div className="tech-animate relative group">
              <div className="absolute inset-0 bg-emerald-500/10 blur-[100px] rounded-full group-hover:bg-emerald-500/20 transition-all" />
              <div className="relative aspect-[4/3] bg-zinc-900 rounded-[3rem] border border-zinc-800 p-12 overflow-hidden shadow-2xl">
                 <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(#10b981 0.5px, transparent 0.5px)", backgroundSize: "20px 20px" }} />
                 <div className="h-full flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                       <Cpu className="w-16 h-16 text-emerald-500" />
                       <Activity className="w-8 h-8 text-emerald-500/40" />
                    </div>
                    <div className="space-y-4">
                       <h2 className="text-4xl font-bold text-white tracking-tighter">Elite Tech <br /> Inventory</h2>
                       <p className="text-sm text-zinc-500 uppercase tracking-[0.2em] font-bold">Updated real-time</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Filter System */}
      <section className="py-16 border-b border-zinc-900 bg-[#0A0A0A] sticky top-24 z-40">
        <div className="max-w-7xl mx-auto px-10 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex items-center gap-4 overflow-x-auto no-scrollbar w-full md:w-auto">
              {["All", "Computers", "Audio", "Cameras", "Gaming", "Servers"].map((type) => (
                <button 
                  key={type}
                  onClick={() => setActiveCategory(type)}
                  className={`px-8 py-3 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeCategory === type 
                      ? "bg-emerald-500 text-black border-emerald-500 shadow-lg shadow-emerald-500/20" 
                      : "bg-transparent text-zinc-500 border-zinc-800 hover:border-zinc-500 hover:text-white"
                  }`}
                >
                  {type}
                </button>
              ))}
           </div>
           <div className="relative w-full md:w-96 group">
             <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" />
             <input 
                type="text" 
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Find specific hardware..."
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-full py-4 pl-14 pr-6 text-sm text-white outline-none focus:border-emerald-500 transition-all"
             />
           </div>
        </div>
      </section>

      {/* Inventory Grid */}
      <section className="py-32 px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-[2rem] bg-zinc-900 w-full" />
              ))
            ) : filteredListings.length > 0 ? (
              filteredListings.map((item) => (
                <Link key={item.id} href={`/listing/${item.id}`} className="group bg-zinc-900/40 rounded-[2.5rem] border border-zinc-800/50 overflow-hidden hover:border-emerald-500/50 transition-all hover:bg-zinc-900 shadow-xl shadow-black/40 block">
                  <div className="relative aspect-square overflow-hidden">
                    <Image 
                      src={item.image} 
                      alt={item.title} 
                      fill 
                      className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100" 
                    />
                    <div className="absolute top-6 left-6 px-4 py-1.5 bg-emerald-500 text-black text-[9px] font-black uppercase tracking-widest rounded-full">
                      {item.badge || "Verified"}
                    </div>
                  </div>
                  <div className="p-10 space-y-8">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold tracking-tight text-white line-clamp-2 leading-tight group-hover:text-emerald-500 transition-colors">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 text-zinc-500">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">{item.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-6 border-t border-zinc-800">
                      <span className="text-2xl font-bold tracking-tight text-white">{item.price}</span>
                      <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-black transition-all">
                        <ArrowUpRight className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full py-40 text-center border-2 border-dashed border-zinc-800 rounded-[3rem]">
                <p className="text-xl font-bold text-zinc-600 uppercase tracking-widest text-center">No hardware assets found</p>
                <button 
                  onClick={() => {setSearchInput(""); setActiveCategory("All");}} 
                  className="mt-4 text-xs font-black underline underline-offset-4 uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
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
