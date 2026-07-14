"use client";

import { useRef } from "react";
import { LANDING_DATA } from "@/data/landing";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Search, ArrowRight } from "lucide-react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(
      ".hero-reveal",
      { y: 100, opacity: 0, skewY: 10 },
      { y: 0, opacity: 1, skewY: 0, duration: 1.5, stagger: 0.2, ease: "expo.out", delay: 0.2 }
    );

    gsap.fromTo(
      ".search-box",
      { y: 40, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power4.out", delay: 1 }
    );

    gsap.fromTo(
      ".bg-dot",
      { opacity: 0 },
      { opacity: 0.05, duration: 2, ease: "sine.inOut" }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative pt-32 md:pt-48 pb-16 md:pb-24 px-4 md:px-10 flex flex-col items-center text-center overflow-hidden bg-white">
      {/* Background Decorative Element */}
      <div className="bg-dot absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-0">
        <div 
          className="w-full h-full" 
          style={{ 
            backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', 
            backgroundSize: '48px 48px' 
          }} 
        />
      </div>

      <div className="relative z-10 w-full max-w-4xl space-y-6 md:space-y-8">
        <div className="hero-reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-100 text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500 border border-zinc-200 opacity-0">
          <div className="w-1.5 h-1.5 bg-black rounded-full animate-pulse" />
          {LANDING_DATA.hero.badge}
        </div>

        <h1 className="hero-reveal text-4xl sm:text-6xl md:text-8xl font-semibold tracking-tight leading-[0.95] text-black opacity-0">
          {LANDING_DATA.hero.title} <br/>
          <span className="text-zinc-300">{LANDING_DATA.hero.highlight}</span>
        </h1>

        <p className="hero-reveal text-base sm:text-xl text-zinc-500 font-light max-w-2xl mx-auto leading-relaxed opacity-0">
          {LANDING_DATA.hero.subtitle}
        </p>

        {/* Premium Search Box */}
        <div className="search-box relative w-full max-w-3xl mx-auto pt-4 md:pt-8 opacity-0">
          <div className="relative flex items-center group">
            <Search className="absolute left-6 w-5 h-5 text-zinc-400 group-focus-within:text-black transition-colors" />
            <input 
              type="text" 
              placeholder={LANDING_DATA.hero.searchPlaceholder}
              className="w-full h-16 md:h-20 pl-16 pr-18 md:pr-40 bg-white border border-zinc-200 rounded-full md:rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] text-base md:text-lg placeholder:text-zinc-300 focus:outline-none focus:border-black focus:ring-4 focus:ring-black/5 transition-all"
            />
            <button className="absolute right-2 md:right-3 h-12 md:h-14 w-12 md:w-auto px-0 md:px-8 bg-black text-white rounded-full flex items-center justify-center md:gap-3 hover:bg-zinc-800 transition-all active:scale-[0.98]">
              <span className="hidden md:inline text-[12px] font-bold uppercase tracking-widest">Search</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-6">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Trending:</span>
            {LANDING_DATA.hero.trending.map((item) => (
              <a key={item} href="#" className="text-[10px] font-bold text-zinc-900 hover:underline uppercase tracking-widest transition-all">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
