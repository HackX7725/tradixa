"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase-client";
import { Listing } from "@/lib/types";
import { Navbar } from "@/components/landing/Navbar";
import { PremiumFooter } from "@/components/landing/Footer";
import { MapPin, Tag, ShieldCheck, Share2, Heart, MessageCircle, Phone, ArrowLeft, Loader2, Calendar, Info, Trash2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useSession } from "@/lib/auth-client";
import { deleteListing } from "@/lib/actions";

export default function ListingDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  const isOwner = session?.user && listing?.sellerId === session.user.id;

  useEffect(() => {
    async function fetchListing() {
      if (!db || !id) return;
      try {
        const docRef = doc(db!, "listings", id as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setListing({ id: docSnap.id, ...docSnap.data() } as Listing);
        } else {
          toast.error("Asset not found");
          router.push("/marketplace");
        }
      } catch (err) {
        toast.error("Error retrieving asset data");
      } finally {
        setLoading(false);
      }
    }
    fetchListing();
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-black" />
      </div>
    );
  }

  if (!listing) return null;

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <section className="pt-32 pb-20 px-10">
        <div className="max-w-7xl mx-auto">
          {/* Back Button & Actions */}
          <div className="flex items-center justify-between mb-12">
            <button 
              onClick={() => router.back()}
              className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:text-black transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Gallery
            </button>
            <div className="flex gap-4">
              <button className="w-12 h-12 rounded-full border border-zinc-100 flex items-center justify-center hover:bg-zinc-50 transition-all">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="w-12 h-12 rounded-full border border-zinc-100 flex items-center justify-center hover:bg-zinc-50 transition-all">
                <Heart className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            {/* Visuals - Left Column (7/12) */}
            <div className="lg:col-span-7 space-y-10">
              <div className="relative aspect-square md:aspect-[16/10] rounded-[40px] overflow-hidden bg-zinc-100 shadow-2xl">
                <Image 
                  src={listing.image} 
                  alt={listing.title} 
                  fill 
                  className="object-cover" 
                  priority
                />
                <div className="absolute top-10 left-10">
                   <span className="bg-black/90 backdrop-blur-md text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                      {listing.category}
                   </span>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="p-8 rounded-[32px] bg-zinc-50 space-y-3">
                  <Calendar className="w-5 h-5 text-zinc-400" />
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Posted</p>
                  <p className="font-bold text-sm">{new Date(listing.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="p-8 rounded-[32px] bg-zinc-50 space-y-3">
                  <ShieldCheck className="w-5 h-5 text-zinc-400" />
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Status</p>
                  <p className="font-bold text-sm">Verified Audit</p>
                </div>
                <div className="p-8 rounded-[32px] bg-zinc-50 space-y-3">
                  <MapPin className="w-5 h-5 text-zinc-400" />
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Region</p>
                  <p className="font-bold text-sm truncate">{listing.location}</p>
                </div>
                <div className="p-8 rounded-[32px] bg-zinc-50 space-y-3">
                  <Info className="w-5 h-5 text-zinc-400" />
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Category</p>
                  <p className="font-bold text-sm">{listing.category}</p>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-8 pt-10">
                <h2 className="text-3xl font-bold tracking-tight">Asset Narrative</h2>
                <p className="text-xl text-zinc-500 font-light leading-relaxed whitespace-pre-wrap">
                  {listing.description || "No detailed description provided for this institutional asset."}
                </p>
              </div>
            </div>

            {/* Info & Purchase - Right Column (5/12) */}
            <div className="lg:col-span-5">
              <div className="sticky top-40 space-y-12">
                <div className="space-y-4">
                  <h1 className="text-6xl font-bold tracking-tighter leading-tight">{listing.title}</h1>
                  <p className="text-4xl font-light text-zinc-400 tracking-tight">{listing.price}</p>
                </div>

                {/* Seller Card */}
                <div className="p-10 rounded-[40px] border border-zinc-100 bg-white shadow-xl shadow-black/[0.02] space-y-8">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center">
                       <Tag className="w-6 h-6 text-black" />
                    </div>
                    <div>
                       <h4 className="font-bold text-lg">Elite Dealer Services</h4>
                       <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Verified Institution</p>
                    </div>
                  </div>

                  {isOwner ? (
                    <Button 
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
                      className="w-full h-16 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-xl shadow-red-500/10 active:scale-[0.98]"
                    >
                      <Trash2 className="w-5 h-5" />
                      Delete Listing
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <Button className="w-full h-16 bg-black text-white rounded-2xl font-bold uppercase tracking-widest flex items-center gap-3 hover:bg-zinc-800 transition-all">
                         <MessageCircle className="w-5 h-5" />
                         Direct Consultation
                      </Button>
                      <Button variant="outline" className="w-full h-16 border-zinc-200 rounded-2xl font-bold uppercase tracking-widest flex items-center gap-3 hover:bg-zinc-50 transition-all">
                         <Phone className="w-5 h-5" />
                         Show Contact
                      </Button>
                    </div>
                  )}
                </div>

                {/* Protocol Card */}
                <div className="p-8 rounded-[32px] bg-black text-white space-y-4">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Tradixa Protocol</span>
                  </div>
                  <p className="text-sm text-zinc-400 font-light leading-relaxed">
                    This asset is protected by our institutional escrow and audit protocol. We ensure transparent high-value asset exchange for verified members.
                  </p>
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
