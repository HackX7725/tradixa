"use client";

import { Navbar } from "@/components/landing/Navbar";
import { PremiumFooter } from "@/components/landing/Footer";
import { Shield, Eye, Lock, FileCheck } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function PrivacyPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".privacy-animate", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out"
    });
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="min-h-screen bg-white selection:bg-black selection:text-white">
      <Navbar />

      <section className="pt-48 pb-32 px-10">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12 mb-24">
            <span className="privacy-animate text-[11px] font-black uppercase tracking-[0.5em] text-zinc-400">Institutional Safeguards</span>
            <h1 className="privacy-animate text-7xl md:text-8xl font-bold tracking-tighter text-black leading-none">Privacy <br /> Protocol.</h1>
            <p className="privacy-animate text-2xl text-zinc-500 font-light leading-relaxed">
              At Tradixa, we treat your data as an institutional asset. Our privacy framework is engineered to provide absolute transparency and cryptographic security.
            </p>
          </div>

          <div className="space-y-20">
            {[
              { 
                icon: Shield, 
                title: "Data Sovereignty", 
                desc: "You maintain absolute ownership of your asset data. We never monetize personal information or transaction history through third-party channels." 
              },
              { 
                icon: Lock, 
                title: "Cryptographic Security", 
                desc: "All communication and documentation transfers are protected by 256-bit institutional-grade encryption protocols." 
              },
              { 
                icon: Eye, 
                title: "Absolute Transparency", 
                desc: "Our auditing processes are designed to provide clear insight into how your information is utilized to verify asset authenticity." 
              }
            ].map((section, i) => (
              <div key={i} className="privacy-animate flex gap-12 group">
                 <div className="w-16 h-16 rounded-3xl bg-zinc-50 border border-zinc-100 flex items-center justify-center shrink-0 group-hover:bg-black group-hover:text-white transition-all">
                    <section.icon className="w-8 h-8" />
                 </div>
                 <div className="space-y-4">
                    <h2 className="text-3xl font-bold tracking-tight text-black">{section.title}</h2>
                    <p className="text-zinc-500 text-lg font-light leading-relaxed">{section.desc}</p>
                 </div>
              </div>
            ))}

            <div className="privacy-animate pt-20 border-t border-zinc-100">
               <div className="p-12 bg-zinc-950 rounded-[3rem] text-white space-y-8">
                  <div className="flex items-center gap-4">
                     <FileCheck className="w-6 h-6 text-emerald-500" />
                     <span className="text-[10px] font-black uppercase tracking-widest">Compliance Status: Active</span>
                  </div>
                  <p className="text-lg text-zinc-400 font-light">
                    Tradixa complies with international institutional standards for data protection and asset exchange protocols. For detailed legal documentation, contact our <span className="text-white underline underline-offset-4 cursor-pointer">Legal Desk</span>.
                  </p>
               </div>
            </div>
          </div>
        </div>
      </section>

      <PremiumFooter />
    </main>
  );
}
