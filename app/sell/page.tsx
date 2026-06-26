"use client";

import { useState } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { PremiumFooter } from "@/components/landing/Footer";
import { Camera, MapPin, Tag, ChevronRight, Check, Loader2, Plus } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LANDING_DATA } from "@/data/landing";
import Image from "next/image";
import { useSession } from "@/lib/auth-client";
import { createListing } from "@/lib/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SellPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "Vehicles",
    description: "",
    price: "",
    location: "",
    audit: false,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...selectedFiles]);
      
      const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));
      setPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  useGSAP(() => {
    gsap.from(".form-animate", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
    });
  }, { scope: containerRef, dependencies: [step] });

  const handlePublish = async () => {
    if (!session?.user) {
      toast.error("You must be logged in to post an ad.");
      return;
    }

    if (files.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }

    console.log("Publishing listing...", { session, filesCount: files.length, formData });
    setLoading(true);
    try {
      console.log("Calling createListing server action...");
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("sellerId", session.user.id);
      
      files.forEach(file => {
        formDataToSend.append("images", file);
      });

      await createListing(formDataToSend);
      
      toast.success("Elite asset listed successfully!");
      router.push("/marketplace");
    } catch (err) {
      toast.error("Failed to publish listing. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main ref={containerRef} className="min-h-screen bg-[#F8F9FA] text-zinc-900">
      <Navbar />
      
      <section className="pt-40 pb-32 px-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col gap-4 mb-16 form-animate">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-[0.4em]">Post your asset</span>
            <h1 className="text-6xl font-bold tracking-tighter text-black">Create Listing.</h1>
          </div>

          {/* Stepper */}
          <div className="flex items-center gap-4 mb-12 form-animate">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-4 flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${step >= s ? 'bg-black text-white' : 'bg-white text-zinc-300 border border-zinc-200'}`}>
                  {step > s ? <Check className="w-4 h-4" /> : s}
                </div>
                {s < 3 && <div className={`h-[1px] flex-1 ${step > s ? 'bg-black' : 'bg-zinc-200'}`} />}
              </div>
            ))}
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-[40px] border border-zinc-100 p-12 shadow-2xl shadow-black/[0.02]">
            {step === 1 && (
              <div className="space-y-10 form-animate">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Asset Title</label>
                    <Input 
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                      placeholder="Specify Asset Model & Year" 
                      className="h-14 rounded-2xl border-zinc-100 focus:border-black transition-all bg-zinc-50/50" 
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Category</label>
                    <select 
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                      className="w-full h-14 rounded-2xl border border-zinc-100 bg-zinc-50/50 px-6 text-sm font-medium outline-none focus:border-black transition-all appearance-none"
                    >
                      {LANDING_DATA.categories.map(cat => (
                        <option key={cat.id} value={cat.label}>{cat.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Description</label>
                  <textarea 
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    placeholder="Provide a comprehensive technical description of the asset..."
                    className="w-full min-h-[200px] rounded-[32px] border border-zinc-100 bg-zinc-50/50 p-8 text-sm font-medium outline-none focus:border-black transition-all resize-none"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-10 form-animate">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Price (PKR)</label>
                    <div className="relative">
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 text-sm font-bold text-zinc-400">Rs</span>
                      <Input 
                        value={formData.price}
                        onChange={e => setFormData({...formData, price: e.target.value})}
                        placeholder="" 
                        className="h-14 pl-14 rounded-2xl border-zinc-100 focus:border-black transition-all bg-zinc-50/50" 
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                      <Input 
                        value={formData.location}
                        onChange={e => setFormData({...formData, location: e.target.value})}
                        placeholder="Geographic Region & Hub" 
                        className="h-14 pl-14 rounded-2xl border-zinc-100 focus:border-black transition-all bg-zinc-50/50" 
                      />
                    </div>
                  </div>
                </div>

                <div 
                  onClick={() => setFormData({...formData, audit: !formData.audit})}
                  className={`p-8 rounded-[32px] flex items-center justify-between cursor-pointer transition-all ${
                    formData.audit ? "bg-emerald-600 text-white shadow-xl shadow-emerald-500/20" : "bg-zinc-950 text-white"
                  }`}
                >
                  <div className="flex items-center gap-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                      formData.audit ? "bg-white/20" : "bg-white/10"
                    }`}>
                      <Tag className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold tracking-tight">Institutional Audit</h4>
                      <p className={`text-xs transition-all ${formData.audit ? "text-emerald-100" : "text-zinc-500"}`}>
                        {formData.audit ? "Audit requested - Our team will contact you" : "Enable verified status for faster sales"}
                      </p>
                    </div>
                  </div>
                  <button className={`w-12 h-6 rounded-full relative transition-all ${formData.audit ? "bg-white" : "bg-zinc-800"}`}>
                    <div className={`absolute top-1 w-4 h-4 rounded-full transition-all ${
                      formData.audit ? "right-1 bg-emerald-600" : "left-1 bg-white"
                    }`} />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-10 form-animate">
                <div className="space-y-4">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Asset Imagery</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <label className="aspect-square rounded-3xl border-2 border-dashed border-zinc-200 flex flex-col items-center justify-center gap-3 hover:border-black hover:bg-zinc-50 transition-all group cursor-pointer">
                      <input type="file" multiple accept="image/*" className="hidden" onChange={handleFileChange} />
                      <div className="w-10 h-10 rounded-full bg-zinc-50 group-hover:bg-black group-hover:text-white flex items-center justify-center transition-all">
                        <Plus className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Add Photo</span>
                    </label>
                    {previews.map((src, i) => (
                      <div key={i} className="aspect-square rounded-3xl bg-zinc-50 border border-zinc-100 overflow-hidden relative group">
                        <Image src={src} alt="Preview" fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] font-medium text-zinc-400 uppercase tracking-widest text-center mt-6">Upload up to 20 high-resolution photos</p>
                </div>

                <div className="p-10 rounded-[32px] border border-emerald-100 bg-emerald-50/30">
                  <p className="text-sm font-medium text-emerald-900 leading-relaxed text-center">
                    By listing on Tradixa, you agree to our <span className="underline font-bold cursor-pointer">Institutional Trading Protocols</span> and verify that all asset information provided is accurate and audited.
                  </p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between mt-16 pt-10 border-t border-zinc-100">
              <button 
                onClick={prevStep}
                className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-all ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-zinc-400 hover:text-black'}`}
              >
                Back
              </button>
              <div className="flex gap-4">
                {step < 3 ? (
                  <Button 
                    onClick={nextStep}
                    className="h-14 px-10 bg-black text-white rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all flex items-center gap-3"
                  >
                    Next Step <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button 
                    disabled={loading}
                    onClick={handlePublish}
                    className="h-14 px-10 bg-black text-white rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all flex items-center gap-3 shadow-2xl shadow-black/20"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Publish Listing"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <PremiumFooter />
    </main>
  );
}
