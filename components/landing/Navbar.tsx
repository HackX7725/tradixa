"use client";

import Link from "next/link";
import { LANDING_DATA } from "@/data/landing";
import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      navRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    );
  }, []);

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-6 bg-white/70 backdrop-blur-xl border-b border-zinc-100 opacity-0">
      <div className="flex items-center gap-12">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-black flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-[1px]" />
          </div>
          {LANDING_DATA.navigation.logo}
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {LANDING_DATA.navigation.links.map((link) => (
            <Link 
              key={link.label} 
              href={link.href} 
              className="text-[11px] font-bold text-zinc-400 hover:text-black uppercase tracking-[0.2em] transition-all"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <Link 
          href="/login" 
          className="text-[11px] font-bold text-zinc-400 hover:text-black uppercase tracking-[0.2em] transition-all"
        >
          {LANDING_DATA.navigation.auth.login}
        </Link>
        <Link href="/register">
          <Button className="h-10 px-6 bg-black text-white rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all shadow-lg shadow-black/5">
            {LANDING_DATA.navigation.auth.register}
          </Button>
        </Link>
      </div>
    </nav>
  );
}
