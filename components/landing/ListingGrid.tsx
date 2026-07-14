"use client";

import { LANDING_DATA } from "@/data/landing";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);
import Link from "next/link";
import { Car, Cpu, Home, Gem, Briefcase, PlusCircle, MapPin, Heart, Smartphone } from "lucide-react";

const iconMap: Record<string, any> = {
  vehicles: Car,
  electronics: Cpu,
  property: Home,
  luxury: Gem,
  business: Briefcase,
  mobile: Smartphone
};

export function CategoryBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".cat-item",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: "power2.out", delay: 0.5 }
    );
  }, { scope: barRef });

  return (
    <div ref={barRef} className="w-full border-b border-zinc-100 bg-white sticky top-20 md:top-24 z-40">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-start md:justify-center gap-8 md:gap-12 h-24 overflow-x-auto no-scrollbar">
        {LANDING_DATA.categories.map((cat) => {
          const Icon = iconMap[cat.id] || PlusCircle;
          return (
            <Link key={cat.id} href={`/marketplace?category=${cat.label}`} className="cat-item flex flex-col items-center gap-2 group min-w-fit opacity-0">
              <div className="w-10 h-10 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all group-hover:-translate-y-1">
                <Icon className="w-5 h-5 text-zinc-400 group-hover:text-white transition-all" />
              </div>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest group-hover:text-black transition-all">
                {cat.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

import { useListings } from "@/hooks/use-listings";
import { Skeleton } from "@/components/ui/skeleton";

export function ListingGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const { listings, loading } = useListings(); // Fetch first few listings
  const displayListings = listings.slice(0, 8);

  useGSAP(() => {
    if (!loading && displayListings.length > 0) {
      gsap.fromTo(
        ".listing-card",
        { y: 60, opacity: 0, scale: 0.9, rotationX: 15 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          rotationX: 0,
          duration: 1, 
          stagger: 0.1, 
          ease: "expo.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
          }
        }
      );
    }
  }, [loading, displayListings]);

  return (
    <section ref={gridRef} className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-24 perspective-2000">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 md:mb-12">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-black">Pakistan's Elite Listings</h2>
        <Link href="/marketplace" className="text-[11px] font-bold text-zinc-400 hover:text-black uppercase tracking-widest transition-all">
          View All Marketplace
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[4/5] rounded-[2.5rem] bg-zinc-100 w-full" />
          ))
        ) : displayListings.length > 0 ? (
          displayListings.map((item) => (
            <Link key={item.id} href={`/listing/${item.id}`} className="listing-card group cursor-pointer opacity-0 block">
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-zinc-100 border border-zinc-200/60 shadow-sm mb-5 transition-all duration-500 group-hover:shadow-3xl group-hover:shadow-black/10 group-hover:-translate-y-3">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute top-5 right-5 w-10 h-10 bg-white/70 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white active:scale-90">
                  <Heart className="w-4 h-4 text-black" />
                </div>
                {item.badge && (
                  <div className="absolute bottom-6 left-6 px-3 py-1 bg-black text-white text-[9px] font-bold uppercase tracking-widest rounded-full">
                    {item.badge}
                  </div>
                )}
              </div>

              <div className="space-y-1 px-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{item.category}</span>
                  <div className="flex items-center gap-1 text-zinc-400">
                    <MapPin className="w-3 h-3" />
                    <span className="text-[9px] font-bold uppercase tracking-widest">{item.location}</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-black line-clamp-1 group-hover:text-zinc-500 transition-colors">{item.title}</h3>
                <p className="text-xl font-bold text-black">{item.price}</p>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-zinc-100 rounded-[2.5rem]">
             <p className="text-zinc-400 font-bold uppercase tracking-widest">No active listings in the portal</p>
             <Link href="/sell" className="mt-4 inline-block text-[10px] font-black underline underline-offset-4 uppercase tracking-widest">Post a new asset</Link>
          </div>
        )}
      </div>
    </section>
  );
}
