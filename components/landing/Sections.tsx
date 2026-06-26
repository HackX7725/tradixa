"use client";

import { LANDING_DATA } from "@/data/landing";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);
import { Shield, Lock, Eye, ArrowRight, ArrowUpRight, MapPin, Heart, ChevronDown, Camera } from "lucide-react";
import Link from "next/link";

export function SellSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      }
    });

    tl.fromTo(
      ".sell-container",
      { y: 60, opacity: 0, skewY: 2 },
      { y: 0, opacity: 1, skewY: 0, duration: 1.2, ease: "expo.out" }
    )
    .fromTo(
      ".sell-image",
      { scale: 1.2, filter: "blur(10px)" },
      { scale: 1, filter: "blur(0px)", duration: 1.5, ease: "power2.out" },
      "-=0.8"
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="max-w-7xl mx-auto px-10 py-32 overflow-hidden">
      <div className="sell-container bg-zinc-900 rounded-[4rem] p-16 md:p-24 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center opacity-0">
        <div className="space-y-10">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10">
            <Camera className="w-8 h-8 text-white" />
          </div>
          <div className="space-y-6">
            <h2 className="text-6xl font-semibold tracking-tight leading-[1.1] text-white">{LANDING_DATA.sell.title}</h2>
            <p className="text-xl text-zinc-400 font-light leading-relaxed max-w-md">{LANDING_DATA.sell.subtitle}</p>
          </div>
          <Link href="/sell">
            <button className="h-16 px-12 bg-white text-black rounded-full text-[13px] font-bold uppercase tracking-[0.2em] hover:bg-zinc-200 transition-all shadow-2xl active:scale-[0.98]">
              {LANDING_DATA.sell.button}
            </button>
          </Link>
        </div>
        <div className="sell-image relative aspect-[16/10] rounded-[3rem] overflow-hidden shadow-2xl">
          <img src={LANDING_DATA.sell.image} className="w-full h-full object-cover" alt="Sell" />
        </div>
      </div>
    </section>
  );
}

export function FeaturedSpotlight() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
      }
    });

    tl.fromTo(
      ".spotlight-mask",
      { xPercent: 0 },
      { xPercent: 100, duration: 1.5, ease: "expo.inOut" }
    )
    .fromTo(
      ".spotlight-content",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=0.5"
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="max-w-7xl mx-auto px-10 py-32 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="spotlight-content space-y-8 opacity-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black text-[9px] font-bold uppercase tracking-widest text-white">
            {LANDING_DATA.featured.badge}
          </div>
          <h2 className="text-6xl font-semibold tracking-tight leading-[1.05] text-black">
            {LANDING_DATA.featured.title}
          </h2>
          <p className="text-xl text-zinc-500 font-light leading-relaxed">
            {LANDING_DATA.featured.subtitle}
          </p>
          <button className="flex items-center gap-3 group">
            <span className="text-[12px] font-bold uppercase tracking-widest border-b border-zinc-200 group-hover:border-black pb-1 transition-all duration-300">
              {LANDING_DATA.featured.button}
            </span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
        <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl bg-zinc-100">
          <div className="spotlight-mask absolute inset-0 z-10 bg-white" />
          <img src={LANDING_DATA.featured.image} className="w-full h-full object-cover" alt="Featured" />
        </div>
      </div>
    </section>
  );
}

export function InsightsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".insight-card",
      { opacity: 0, y: 60, rotationX: 10 },
      { 
        opacity: 1, 
        y: 0, 
        rotationX: 0,
        duration: 1.2, 
        stagger: 0.2, 
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="max-w-7xl mx-auto px-10 py-32 bg-[#fafafa] rounded-[4rem] mx-6 my-20">
      <div className="flex items-center justify-between mb-20">
        <div className="space-y-4">
          <h2 className="text-5xl font-semibold tracking-tight text-black">{LANDING_DATA.insights.title}</h2>
          <p className="text-zinc-500 text-lg font-light">Global analysis and strategic updates.</p>
        </div>
        <button className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:text-black transition-all">
          Explore Insights <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {LANDING_DATA.insights.articles.map((article) => (
          <div key={article.id} className="insight-card space-y-6 group cursor-pointer opacity-0 perspective-1000">
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
              <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            </div>
            <div className="space-y-3 px-2">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{article.date}</span>
              <h3 className="text-2xl font-semibold tracking-tight leading-tight text-black group-hover:text-zinc-500 transition-colors">{article.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function SecurityProtocol() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".security-item",
      { opacity: 0, x: 20 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 1, 
        stagger: 0.15, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-black text-white py-32 rounded-[4rem] mx-6 my-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 lg:grid-cols-2 gap-24">
        <div className="space-y-8">
          <h2 className="text-5xl font-semibold tracking-tight">{LANDING_DATA.security.title}</h2>
          <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-md">
            {LANDING_DATA.security.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-12">
          {LANDING_DATA.security.features.map((f, i) => (
            <div key={f.title} className="security-item flex gap-6 items-start group opacity-0">
              <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-500">
                <Shield className="w-5 h-5 text-zinc-500 group-hover:text-black transition-colors" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold tracking-tight">{f.title}</h3>
                <p className="text-zinc-500 font-light">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".faq-item",
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.1, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="max-w-3xl mx-auto px-10 py-32 space-y-20">
      <h2 className="text-5xl font-semibold tracking-tight text-center text-black">{LANDING_DATA.faq.title}</h2>
      <div className="space-y-6">
        {LANDING_DATA.faq.items.map((item, i) => (
          <div key={i} className="faq-item group border-b border-zinc-100 pb-8 cursor-pointer opacity-0 hover:translate-x-2 transition-all duration-300">
            <div className="flex items-center justify-between gap-8">
              <h3 className="text-xl font-semibold tracking-tight text-black group-hover:text-zinc-500 transition-colors">{item.q}</h3>
              <ChevronDown className="w-5 h-5 text-zinc-300 group-hover:text-black transition-all group-hover:rotate-180" />
            </div>
            <p className="mt-4 text-zinc-500 font-light leading-relaxed max-w-2xl overflow-hidden max-h-0 group-hover:max-h-40 transition-all duration-500">
              {item.a}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function PartnerLogos() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".partner-logo",
      { opacity: 0, scale: 0.8 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 1, 
        stagger: 0.1, 
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-24 border-b border-zinc-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-10">
        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.4em] mb-12 block text-center">
          Institutional Partners
        </span>
        <div className="flex flex-wrap items-center justify-center gap-20">
          {LANDING_DATA.partners.map((p) => (
            <span key={p} className="partner-logo text-2xl font-bold tracking-tighter text-zinc-400 hover:text-black hover:scale-105 transition-all duration-300 cursor-pointer opacity-0">
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".cta-content",
      { opacity: 0, y: 40, scale: 0.95 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 1.2, 
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="max-w-7xl mx-auto px-10 py-40 flex flex-col items-center text-center space-y-10">
      <div className="cta-content space-y-10 opacity-0">
        <h2 className="text-7xl font-semibold tracking-tight leading-[0.95] text-black">
          {LANDING_DATA.cta.title}
        </h2>
        <p className="text-xl text-zinc-500 font-light max-w-xl mx-auto leading-relaxed">
          {LANDING_DATA.cta.subtitle}
        </p>
        <Link href="/sell">
          <button className="h-16 px-12 bg-black text-white rounded-full text-[13px] font-bold uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all shadow-2xl active:scale-[0.98]">
            {LANDING_DATA.cta.button}
          </button>
        </Link>
      </div>
    </section>
  );
}
