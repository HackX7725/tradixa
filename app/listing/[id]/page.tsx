"use client";

import { useListing } from "@/hooks/use-listing";
import { Navbar } from "@/components/landing/Navbar";
import { PremiumFooter } from "@/components/landing/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, ShieldCheck, Phone, Mail, Share2, Heart, ArrowLeft, Calendar, Gauge, Fuel, Zap, CheckCircle2, Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { useSession } from "@/lib/auth-client";
import { deleteListing } from "@/lib/actions";
import { toast } from "sonner";

export default function ListingDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { listing, loading, error } = useListing(id as string);
  const { data: session } = useSession();
  const containerRef = useRef<HTMLDivElement>(null);

  const isOwner = session?.user && listing?.sellerId === session.user.id;

  useGSAP(() => {
    if (!loading && listing) {
      gsap.from(".listing-animate", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });
    }
  }, [loading, listing]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-32 px-10 max-w-7xl mx-auto space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <Skeleton className="aspect-square rounded-[3rem] bg-zinc-100" />
            <div className="space-y-8">
              <Skeleton className="h-20 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-32 w-full" />
              <div className="flex gap-4">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !listing) {
    return (
      <main className="min-h-screen bg-white flex flex-col items-center justify-center p-10">
        <Navbar />
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold tracking-tighter">Asset Not Found</h1>
          <p className="text-zinc-500">The listing you are looking for has been moved or is no longer available.</p>
          <button 
            onClick={() => router.back()} 
            className="px-10 py-4 bg-black text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-all"
          >
            Go Back
          </button>
        </div>
      </main>
    );
  }

  return (
    <main ref={containerRef} className="min-h-screen bg-[#FBFBFB] text-zinc-900 selection:bg-black selection:text-white">
      <Navbar />

      <section className="pt-32 pb-24 px-10">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-zinc-400 hover:text-black transition-colors mb-12 listing-animate"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Back to Marketplace</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Image Gallery */}
            <div className="lg:col-span-7 space-y-6 listing-animate">
              <div className="relative aspect-square rounded-[3rem] overflow-hidden bg-white border border-zinc-100 shadow-2xl">
                <Image 
                  src={listing.image} 
                  alt={listing.title} 
                  fill 
                  className="object-cover" 
                />
                <div className="absolute top-8 left-8">
                  <span className="bg-black text-white px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                    {listing.badge || "Verified Asset"}
                  </span>
                </div>
              </div>
              
              {/* Feature Grid for specific categories */}
              {listing.category === "Vehicles" && (
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white p-8 rounded-[2rem] border border-zinc-100 space-y-2">
                    <Gauge className="w-5 h-5 text-zinc-400" />
                    <p className="text-[9px] font-black text-zinc-400 uppercase">Mileage</p>
                    <p className="text-lg font-bold">12,500 Km</p>
                  </div>
                  <div className="bg-white p-8 rounded-[2rem] border border-zinc-100 space-y-2">
                    <Fuel className="w-5 h-5 text-zinc-400" />
                    <p className="text-[9px] font-black text-zinc-400 uppercase">Fuel Type</p>
                    <p className="text-lg font-bold">Petrol</p>
                  </div>
                  <div className="bg-white p-8 rounded-[2rem] border border-zinc-100 space-y-2">
                    <Zap className="w-5 h-5 text-zinc-400" />
                    <p className="text-[9px] font-black text-zinc-400 uppercase">Transmission</p>
                    <p className="text-lg font-bold">Automatic</p>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar / Info */}
            <div className="lg:col-span-5 space-y-10 listing-animate">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">{listing.category}</span>
                  <div className="w-1 h-1 rounded-full bg-zinc-300" />
                  <div className="flex items-center gap-1.5 text-emerald-600">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span className="text-[9px] font-black uppercase tracking-widest">Audit Passed</span>
                  </div>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-[0.95] text-black">
                  {listing.title}
                </h1>
                <div className="flex items-center gap-2 text-zinc-400">
                  <MapPin className="w-4 h-4" />
                  <span className="text-[11px] font-bold uppercase tracking-widest">{listing.location}</span>
                </div>
              </div>

              <div className="py-10 border-y border-zinc-100 flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Fixed Listing Price</p>
                  <p className="text-5xl font-bold tracking-tight text-black">{listing.price}</p>
                </div>
                <div className="flex gap-3">
                   <button className="w-14 h-14 rounded-2xl border border-zinc-200 flex items-center justify-center hover:bg-white hover:border-black transition-all">
                      <Heart className="w-5 h-5 text-zinc-400 hover:text-red-500 transition-colors" />
                   </button>
                   <button className="w-14 h-14 rounded-2xl border border-zinc-200 flex items-center justify-center hover:bg-white hover:border-black transition-all">
                      <Share2 className="w-5 h-5 text-zinc-400" />
                   </button>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 p-6 bg-white rounded-[1.5rem] border border-zinc-100">
                   <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center font-bold text-black uppercase">
                      {listing.sellerName?.charAt(0) || "U"}
                   </div>
                   <div className="flex-1">
                      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Institutional Seller</p>
                      <p className="text-sm font-bold text-black">{listing.sellerName || "Anonymous User"}</p>
                   </div>
                   <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      <span className="text-[8px] font-black uppercase tracking-widest">Identity Verified</span>
                   </div>
                </div>

                {isOwner ? (
                  <button 
                    onClick={async () => {
                      if (confirm("Are you sure you want to remove this institutional asset?")) {
                        try {
                          await deleteListing(listing.id);
                          toast.success("Asset removed from portfolio.");
                          router.push("/dashboard");
                        } catch (err) {
                          toast.error("Failed to remove asset.");
                        }
                      }
                    }}
                    className="w-full h-16 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-xl shadow-red-500/10 active:scale-[0.98]"
                  >
                    <Trash2 className="w-4.5 h-4.5" /> Delete Listing
                  </button>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <button className="h-16 bg-black text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-all flex items-center justify-center gap-3 shadow-xl">
                      <Phone className="w-4 h-4" /> Reveal Contact
                    </button>
                    <button className="h-16 bg-white text-black border border-zinc-200 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:border-black transition-all flex items-center justify-center gap-3">
                      <Mail className="w-4 h-4" /> Message Desk
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-6 pt-10">
                 <h3 className="text-sm font-black uppercase tracking-widest text-black">Technical Specifications</h3>
                 <p className="text-zinc-500 font-light leading-relaxed">
                   {listing.description || "No technical description provided by the institutional seller for this asset."}
                 </p>
                 
                 <div className="space-y-4 pt-4">
                    <div className="flex items-center gap-3">
                       <ShieldCheck className="w-5 h-5 text-emerald-500" />
                       <p className="text-[11px] font-bold text-zinc-600">This asset is covered by Tradixa institutional security protocols.</p>
                    </div>
                    <div className="flex items-center gap-3">
                       <Calendar className="w-5 h-5 text-zinc-400" />
                        <p className="text-[11px] font-bold text-zinc-600">
                          Listed on {
                            listing.createdAt
                              ? (typeof listing.createdAt === "string" || typeof listing.createdAt === "number"
                                  ? new Date(listing.createdAt).toLocaleDateString()
                                  : new Date((listing.createdAt.seconds || 0) * 1000).toLocaleDateString())
                              : "N/A"
                          }
                        </p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PremiumFooter />
    </main>
  );
}
