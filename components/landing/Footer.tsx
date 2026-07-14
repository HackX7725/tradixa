"use client";

import { LANDING_DATA } from "@/data/landing";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { ArrowUp, Globe2 } from "lucide-react";

export function GlobalPresence() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".city-item",
      { opacity: 0, x: -20 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 0.8, 
        stagger: 0.1, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-32 flex flex-col items-center text-center">
      <div className="space-y-4 md:space-y-6 mb-12 md:mb-20">
        <div className="w-12 h-12 md:w-16 md:h-16 bg-zinc-50 rounded-full flex items-center justify-center border border-zinc-100 mx-auto mb-6 md:mb-8 animate-pulse animate-duration-1000">
          <Globe2 className="w-6 h-6 md:w-8 md:h-8 text-black" />
        </div>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">{LANDING_DATA.global.title}</h2>
        <p className="text-zinc-500 text-base md:text-lg font-light">{LANDING_DATA.global.subtitle}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-x-10 md:gap-x-20 gap-y-6 md:gap-y-10">
        {LANDING_DATA.global.cities.map((city) => (
          <div key={city.name} className="city-item space-y-1 md:space-y-2 text-left opacity-0">
            <span className="text-[9px] md:text-[10px] font-bold text-zinc-300 uppercase tracking-widest">{city.region}</span>
            <div className="text-xl md:text-3xl font-semibold tracking-tight group cursor-pointer">
              <span className="group-hover:text-zinc-400 transition-colors">{city.name}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function PremiumFooter() {
  const footerRef = useRef<HTMLElement>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={footerRef} className="bg-[#fafafa] border-t border-zinc-100 pt-16 pb-8 md:pt-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-16 mb-16 md:mb-24">
          {/* Brand Info */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-6 md:space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-[1px]" />
              </div>
              <span className="text-2xl font-bold tracking-tighter text-black">{LANDING_DATA.navigation.logo}</span>
            </div>
            <p className="text-zinc-500 font-light leading-relaxed max-w-sm text-base md:text-lg">
              The premier destination for high-fidelity asset exchange. Secure, audited, and engineered for the world's elite.
            </p>
            <div className="flex gap-4">
              {LANDING_DATA.footer.socials.map((s) => (
                <a key={s} href="#" className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:bg-black hover:text-white hover:border-black transition-all">
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Columns */}
          {LANDING_DATA.footer.columns.map((col) => (
            <div key={col.title} className="space-y-4 md:space-y-6">
              <span className="text-[10px] font-bold text-black uppercase tracking-[0.3em]">{col.title}</span>
              <ul className="space-y-3 md:space-y-4">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-zinc-500 hover:text-black transition-colors font-light">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 md:pt-12 border-t border-zinc-200/60 gap-6 md:gap-8 text-center md:text-left">
          <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-[0.2em]">
            {LANDING_DATA.footer.copyright}
          </span>
          
          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-3 text-[10px] font-bold text-zinc-400 uppercase tracking-widest hover:text-black transition-all"
          >
            Back to Top
            <div className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center group-hover:bg-zinc-100 group-hover:border-zinc-300 transition-all">
              <ArrowUp className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
