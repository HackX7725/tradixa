"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface AuthSidebarProps {
  branding: {
    name: string;
    badge: string;
    heading: string;
    subheading: string;
    description: string;
    copyright: string;
  };
  links: Array<{ label: string; href: string }>;
}

export function AuthSidebar({ branding, links }: AuthSidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".abstract-element",
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.8, stagger: 0.08, ease: "power1.out" }
    );
  }, { scope: sidebarRef });

  return (
    <div ref={sidebarRef} className="hidden lg:flex w-[42%] relative overflow-hidden bg-white border-r border-zinc-200 flex-col justify-between p-16">
      <div 
        className="absolute inset-0 z-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', 
          backgroundSize: '32px 32px' 
        }} 
      />

      <div className="relative z-10 flex items-center gap-3">
        <div className="w-9 h-9 border border-zinc-200 bg-white rounded-lg flex items-center justify-center abstract-element shadow-sm">
          <div className="w-4 h-4 bg-zinc-900 rounded-[2px]" />
        </div>
        <span className="text-xl font-bold tracking-tight abstract-element">{branding.name}</span>
      </div>

      <div className="relative z-10 abstract-element">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-zinc-100 text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-500 mb-8 border border-zinc-200">
          {branding.badge}
        </div>
        <h1 className="text-5xl font-semibold tracking-tight leading-[1.1] mb-8">
          {branding.heading} <br/>
          <span className="text-zinc-400 font-normal">{branding.subheading}</span>
        </h1>
        <p className="text-lg text-zinc-500 leading-relaxed font-light max-w-sm">
          {branding.description}
        </p>
      </div>

      <div className="relative z-10 flex items-center gap-8 text-[11px] font-semibold text-zinc-400 uppercase tracking-widest abstract-element">
        <span>{branding.copyright}</span>
        <div className="flex gap-4">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="hover:text-zinc-900 transition-colors">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
