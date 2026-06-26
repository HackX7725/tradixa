"use client";

import { Navbar } from "@/components/landing/Navbar";
import { PremiumFooter } from "@/components/landing/Footer";
import { Send, MapPin, Phone, Mail, Clock, ShieldCheck, ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { toast } from "sonner";

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useGSAP(() => {
    gsap.from(".contact-animate", {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out"
    });
  }, { scope: containerRef });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success("Institutional request transmitted successfully.");
      setIsSubmitting(false);
      (e.target as HTMLFormElement).reset();
    }, 2000);
  };

  return (
    <main ref={containerRef} className="min-h-screen bg-[#F8F9FA] selection:bg-black selection:text-white">
      <Navbar />

      <section className="pt-48 pb-32 px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
            
            {/* Contact Info */}
            <div className="space-y-16">
              <div className="space-y-8">
                <span className="contact-animate text-[11px] font-black uppercase tracking-[0.5em] text-zinc-400">Executive Channels</span>
                <h1 className="contact-animate text-7xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-black">Get in <br /> Touch.</h1>
                <p className="contact-animate text-xl text-zinc-500 font-light max-w-lg leading-relaxed">
                  Connect with our elite support division for inquiries regarding institutional partnerships, high-value asset verification, or platform assistance.
                </p>
              </div>

              <div className="contact-animate space-y-10">
                <div className="flex items-start gap-8 group">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-zinc-100 flex items-center justify-center group-hover:border-black transition-all">
                    <Mail className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Email Protocol</p>
                    <p className="text-xl font-bold text-black tracking-tight">concierge@tradixa.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-8 group">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-zinc-100 flex items-center justify-center group-hover:border-black transition-all">
                    <Phone className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Priority Line</p>
                    <p className="text-xl font-bold text-black tracking-tight">+92 (300) ELITE-TX</p>
                  </div>
                </div>
                <div className="flex items-start gap-8 group">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-zinc-100 flex items-center justify-center group-hover:border-black transition-all">
                    <MapPin className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Global Hub</p>
                    <p className="text-xl font-bold text-black tracking-tight">DHA Phase VI, Lahore, PK</p>
                  </div>
                </div>
              </div>

              <div className="contact-animate p-10 bg-black rounded-[3rem] text-white flex items-center justify-between overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 flex items-center gap-6">
                   <ShieldCheck className="w-10 h-10 text-emerald-500" />
                   <div>
                     <h4 className="font-bold tracking-tight">Institutional Audit</h4>
                     <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Priority Verification Access</p>
                   </div>
                </div>
                <ArrowRight className="w-6 h-6 text-zinc-700 group-hover:text-white group-hover:translate-x-2 transition-all relative z-10" />
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-animate">
              <div className="bg-white rounded-[4rem] border border-zinc-100 p-16 shadow-2xl shadow-black/[0.02]">
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Full Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="Specify name..."
                        className="w-full h-14 bg-zinc-50/50 border border-zinc-100 rounded-2xl px-6 outline-none focus:border-black transition-all text-sm"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Email Address</label>
                      <input 
                        required
                        type="email" 
                        placeholder="Specify institutional email..."
                        className="w-full h-14 bg-zinc-50/50 border border-zinc-100 rounded-2xl px-6 outline-none focus:border-black transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Subject</label>
                    <select className="w-full h-14 bg-zinc-50/50 border border-zinc-100 rounded-2xl px-6 outline-none focus:border-black transition-all text-sm appearance-none">
                      <option>General Inquiry</option>
                      <option>Asset Verification Request</option>
                      <option>Institutional Partnership</option>
                      <option>Legal & Compliance</option>
                    </select>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Transmission Message</label>
                    <textarea 
                      required
                      placeholder="Describe your request in detail..."
                      className="w-full min-h-[200px] bg-zinc-50/50 border border-zinc-100 rounded-[2.5rem] p-8 outline-none focus:border-black transition-all text-sm resize-none"
                    />
                  </div>

                  <button 
                    disabled={isSubmitting}
                    className="w-full h-16 bg-black text-white rounded-2xl text-[13px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isSubmitting ? "Transmitting..." : (
                      <>
                        Send Request <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <p className="text-[10px] font-medium text-zinc-400 uppercase tracking-widest text-center leading-relaxed">
                    By transmitting this request, you agree to our <span className="underline font-bold cursor-pointer">Protocol Privacy Standards</span>.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PremiumFooter />
    </main>
  );
}
