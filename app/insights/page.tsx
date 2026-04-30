"use client";

import { LANDING_DATA } from "@/data/landing";
import { Navbar } from "@/components/landing/Navbar";
import { PremiumFooter } from "@/components/landing/Footer";
import { ArrowRight, BookOpen, TrendingUp, Calendar, ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import Image from "next/image";

export default function InsightsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".insight-animate", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
    });
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="min-h-screen bg-white">
      <Navbar />
      
      {/* Editorial Header */}
      <section className="pt-44 pb-24 px-10 border-b border-zinc-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-6 max-w-2xl mb-20 insight-animate">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-[0.4em]">Intelligence</span>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9]">
              Market <br /> Insights.
            </h1>
            <p className="text-xl text-zinc-500">
              Expert analysis, real-time trends, and exclusive reports on Pakistan&apos;s high-value asset landscape.
            </p>
          </div>

          {/* Featured Article */}
          <div className="group cursor-pointer insight-animate">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[40px]">
                <Image 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000"
                  alt="Featured Report"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute top-8 left-8">
                  <span className="bg-black text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                    Whitepaper 2026
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-4 text-zinc-400">
                  <span className="text-[11px] font-bold uppercase tracking-widest">Market Report</span>
                  <div className="w-1 h-1 rounded-full bg-zinc-300" />
                  <span className="text-[11px] font-bold uppercase tracking-widest">12 Min Read</span>
                </div>
                <h2 className="text-5xl font-bold tracking-tight leading-tight group-hover:text-zinc-600 transition-colors">
                  The Institutional Shift: <br /> Luxury Real Estate Trends in Pakistan.
                </h2>
                <p className="text-lg text-zinc-500 leading-relaxed">
                  An in-depth analysis of how international investment and urban development protocols are reshaping the high-end property market in Karachi and Islamabad.
                </p>
                <button className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] group-hover:gap-5 transition-all">
                  Read Full Report <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories & Search */}
      <section className="py-12 px-10 border-b border-zinc-100 bg-zinc-50/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex gap-8 overflow-x-auto no-scrollbar py-2">
            {["All", "Real Estate", "Automotive", "Investment", "Economy"].map((cat) => (
              <button key={cat} className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-black transition-colors">
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:text-black">
              <TrendingUp className="w-4 h-4" />
              Trending
            </button>
            <button className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:text-black">
              <BookOpen className="w-4 h-4" />
              Archive
            </button>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-32 px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {LANDING_DATA.insights.articles.map((article) => (
              <div key={article.id} className="group cursor-pointer insight-animate">
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl mb-8">
                  <Image 
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-black bg-zinc-100 px-3 py-1 rounded-full">{article.category}</span>
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Calendar className="w-3 h-3" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{article.date}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 leading-snug group-hover:text-zinc-500 transition-colors">
                  {article.title}
                </h3>
                <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0">
                  Read Article <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Newsletter */}
      <section className="py-32 px-10">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-zinc-950 rounded-[60px] p-20 overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full">
               <div className="absolute inset-0 bg-gradient-to-l from-zinc-950 via-zinc-950/80 to-transparent z-10" />
               <Image 
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200"
                alt="Abstract Network"
                fill
                className="object-cover opacity-30"
               />
            </div>
            
            <div className="relative z-20 max-w-xl">
              <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-[0.4em] mb-6 block">Elite Access</span>
              <h2 className="text-5xl font-bold text-white tracking-tight leading-tight mb-8">
                Get the morning report for Pakistan&apos;s elite traders.
              </h2>
              <div className="flex gap-4 p-2 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
                <input 
                  type="email" 
                  placeholder="Enter your professional email"
                  className="bg-transparent border-none outline-none flex-1 px-6 text-white text-sm"
                />
                <button className="bg-white text-black px-8 py-4 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-zinc-200 transition-all">
                  Subscribe
                </button>
              </div>
              <p className="mt-6 text-zinc-500 text-[10px] font-medium uppercase tracking-widest">
                Join 5,000+ verified institutional investors.
              </p>
            </div>
          </div>
        </div>
      </section>

      <PremiumFooter />
    </main>
  );
}
