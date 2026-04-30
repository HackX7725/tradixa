"use client";

import { LANDING_DATA } from "@/data/landing";
import { Navbar } from "@/components/landing/Navbar";
import { PremiumFooter } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, MapPin, Tag, ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useListings } from "@/hooks/use-listings";
import { useDebounce } from "@/hooks/use-debounce";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 500);
  const { listings, loading, error } = useListings(selectedCategory, debouncedSearch);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".animate-up", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power4.out",
    });
  }, { scope: containerRef });

  useEffect(() => {
    if (error) {
      toast.error("Failed to load marketplace assets.");
    }
  }, [error]);

  return (
    <main ref={containerRef} className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-44 pb-20 px-10 border-b border-zinc-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-6 max-w-3xl">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-[0.3em] animate-up">
              The Collection
            </span>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-black leading-[0.9] animate-up">
              Curated <br /> Marketplace.
            </h1>
            <p className="text-xl text-zinc-500 max-w-xl animate-up">
              Browse Pakistan&apos;s most exclusive selection of high-value assets, from luxury estates to high-performance machinery.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-16 animate-up">
            <div className="relative flex items-center p-2 bg-zinc-50 rounded-2xl border border-zinc-100 focus-within:border-black transition-all group">
              <div className="flex-1 flex items-center gap-4 px-6">
                <Search className="w-5 h-5 text-zinc-400 group-focus-within:text-black transition-colors" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search by asset name, location, or SKU..."
                  className="w-full bg-transparent border-none outline-none text-sm font-medium py-4 placeholder:text-zinc-400"
                />
              </div>
              <div className="h-10 w-[1px] bg-zinc-200 hidden md:block" />
              <button className="hidden md:flex items-center gap-2 px-8 text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:text-black transition-colors">
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>
              <button className="bg-black text-white px-10 py-4 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-xl shadow-black/5">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-10 border-b border-zinc-100 bg-zinc-50/50">
        <div className="max-w-7xl mx-auto flex items-center gap-8 overflow-x-auto no-scrollbar py-2">
          {[{ id: "all", label: "All" }, ...LANDING_DATA.categories].map((cat) => (
            <button 
              key={cat.id} 
              onClick={() => setSelectedCategory(cat.label)}
              className={`flex items-center gap-3 whitespace-nowrap px-6 py-3 rounded-full border transition-all text-[11px] font-bold uppercase tracking-widest shadow-sm ${selectedCategory === cat.label ? 'bg-black text-white border-black' : 'bg-white border-zinc-100 hover:border-black'}`}
            >
              <span className={selectedCategory === cat.label ? 'text-white' : 'text-zinc-400'}>/</span>
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Listings Grid */}
      <section className="py-24 px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16 animate-up">
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-bold tracking-tight">Active Listings</h2>
              <p className="text-zinc-500">Displaying 1,240 verified assets across Pakistan</p>
            </div>
            <div className="flex gap-4">
              <button className="px-6 py-3 rounded-full border border-zinc-200 text-[11px] font-bold uppercase tracking-widest hover:bg-zinc-50 transition-all">Sort: Latest</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-6">
                  <Skeleton className="aspect-[4/5] rounded-3xl w-full" />
                  <div className="space-y-3 px-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))
            ) : listings.length > 0 ? (
              listings.map((listing, i) => (
                <div key={listing.id} className="group cursor-pointer animate-up">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-zinc-100 mb-6">
                    <Image 
                      src={listing.image} 
                      alt={listing.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                      {listing.badge && (
                        <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-sm">
                          {listing.badge}
                        </span>
                      )}
                      <span className="bg-black/80 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter">
                        {listing.category}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-expo">
                      <div className="bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-2xl">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2 text-zinc-500">
                            <MapPin className="w-3 h-3" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">{listing.location}</span>
                          </div>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Price</p>
                        <p className="text-lg font-bold">{listing.price}</p>
                      </div>
                    </div>
                  </div>
                  <div className="px-2">
                    <h3 className="text-lg font-bold mb-2 group-hover:text-zinc-500 transition-colors">{listing.title}</h3>
                    <div className="flex items-center gap-4 text-zinc-400">
                      <div className="flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Verified Seller</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="lg:col-span-3 py-32 text-center">
                 <p className="text-2xl font-bold tracking-tight mb-2">No assets found</p>
                 <p className="text-zinc-500">Try selecting a different category or refining your search.</p>
              </div>
            )}
          </div>

          <div className="mt-24 flex justify-center animate-up">
            <Button className="h-16 px-12 bg-black text-white rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all shadow-2xl">
              Load More Assets
            </Button>
          </div>
        </div>
      </section>

      <PremiumFooter />
    </main>
  );
}

