"use client";

import { Navbar } from "@/components/landing/Navbar";
import { PremiumFooter } from "@/components/landing/Footer";
import { Headphones, Mail, MessageSquare, Shield, FileText, HelpCircle, ArrowRight, PhoneCall, Clock } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import Link from "next/link";

export default function SupportPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".support-animate", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out"
    });
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="min-h-screen bg-[#F8F9FA] selection:bg-black selection:text-white">
      <Navbar />

      {/* Concierge Hero */}
      <section className="pt-48 pb-32 px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div className="space-y-6">
                <span className="support-animate text-[11px] font-black uppercase tracking-[0.5em] text-zinc-400">Resolution Desk</span>
                <h1 className="support-animate text-7xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-black">Institutional <br /> Concierge.</h1>
                <p className="support-animate text-xl text-zinc-500 font-light max-w-lg leading-relaxed">
                  Experience priority assistance. Our dedicated concierge team ensures every transaction on Tradixa is audited, secure, and seamless.
                </p>
              </div>

              <div className="support-animate flex flex-wrap gap-4">
                 <button className="h-16 px-10 bg-black text-white rounded-2xl text-[13px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-all flex items-center gap-3">
                   <PhoneCall className="w-5 h-5" /> Priority Line
                 </button>
                 <button className="h-16 px-10 border border-zinc-200 text-black rounded-2xl text-[13px] font-black uppercase tracking-widest hover:bg-zinc-50 transition-all flex items-center gap-3">
                   <MessageSquare className="w-5 h-5" /> Live Chat
                 </button>
              </div>
            </div>

            <div className="support-animate grid grid-cols-2 gap-6">
               {[
                 { icon: Clock, label: "24/7 Response", desc: "Institutional grade uptime" },
                 { icon: Shield, label: "Secure Escrow", desc: "Monitored transactions" },
                 { icon: Headphones, label: "Expert Audit", desc: "Technical verification" },
                 { icon: FileText, label: "Legal Desk", desc: "Title & Documentation" }
               ].map((item, i) => (
                 <div key={i} className="p-8 bg-[#F8F9FA] rounded-[2rem] border border-zinc-100 hover:border-black transition-all group">
                    <item.icon className="w-8 h-8 text-black mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold tracking-tight mb-2">{item.label}</h3>
                    <p className="text-xs text-zinc-400 uppercase tracking-widest font-bold">{item.desc}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-32 px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center gap-6 mb-20">
             <h2 className="support-animate text-4xl font-bold tracking-tight">How can we assist you?</h2>
             <div className="support-animate relative w-full max-w-2xl group">
                <HelpCircle className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-black transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search documentation, policies, or guides..." 
                  className="w-full h-16 pl-16 pr-8 bg-white border border-zinc-200 rounded-full outline-none focus:border-black transition-all shadow-sm text-lg"
                />
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
               { title: "Buying Protocol", items: ["Verified Inspections", "Escrow Protection", "Title Transfer Hub"] },
               { title: "Selling Strategy", items: ["Institutional Audit", "Premium Listing", "Seller Verification"] },
               { title: "Platform Security", items: ["Account Privacy", "Scam Protection", "Legal Framework"] }
             ].map((cat, i) => (
               <div key={i} className="support-animate bg-white p-12 rounded-[3rem] border border-zinc-100 hover:shadow-2xl transition-all">
                  <h3 className="text-2xl font-bold tracking-tight mb-10">{cat.title}</h3>
                  <div className="space-y-6">
                     {cat.items.map((item, j) => (
                       <div key={j} className="flex items-center justify-between group cursor-pointer">
                          <span className="text-zinc-500 group-hover:text-black transition-colors">{item}</span>
                          <ArrowRight className="w-4 h-4 text-zinc-200 group-hover:text-black group-hover:translate-x-2 transition-all" />
                       </div>
                     ))}
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Direct Contact */}
      <section className="pb-40 px-10">
         <div className="max-w-7xl mx-auto">
            <div className="bg-black rounded-[4rem] p-20 text-center space-y-10 relative overflow-hidden">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-transparent to-transparent pointer-events-none" />
               
               <div className="space-y-4 relative z-10">
                  <h2 className="text-5xl font-bold tracking-tighter text-white">Still require assistance?</h2>
                  <p className="text-zinc-400 text-lg font-light max-w-xl mx-auto">
                    Connect with our executive support desk for immediate resolution of complex institutional matters.
                  </p>
               </div>

               <div className="flex flex-col md:flex-row items-center justify-center gap-12 relative z-10">
                  <div className="space-y-2">
                     <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">General Enquiries</p>
                     <p className="text-2xl font-bold text-white tracking-tight">concierge@tradixa.com</p>
                  </div>
                  <div className="w-[1px] h-10 bg-zinc-800 hidden md:block" />
                  <div className="space-y-2">
                     <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Resolution Desk</p>
                     <p className="text-2xl font-bold text-white tracking-tight">audit@tradixa.com</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <PremiumFooter />
    </main>
  );
}
