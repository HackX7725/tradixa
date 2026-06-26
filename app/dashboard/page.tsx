"use client";

import { useState } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import { Navbar } from "@/components/landing/Navbar";
import { PremiumFooter } from "@/components/landing/Footer";
import { useListings } from "@/hooks/use-listings";
import { Loader2, Plus, Settings, Package, Heart, CreditCard, ChevronRight, LogOut, Trash2 } from "lucide-react";
import { deleteListing } from "@/lib/actions";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [activeTab, setActiveTab] = useState("Buying");
  const { listings, loading: listingsLoading, refresh } = useListings(undefined, undefined, session?.user?.id);

  if (isPending) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#F8F9FA]">
        <Loader2 className="w-8 h-8 animate-spin text-black" />
      </div>
    );
  }

  if (!session) return null;

  return (
    <main className="min-h-screen bg-[#F8F9FA]">
      <Navbar />
      
      <section className="pt-40 pb-32 px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Sidebar */}
          <div className="lg:col-span-3 space-y-8">
            <div className="p-10 rounded-[40px] bg-white border border-zinc-100 shadow-xl shadow-black/[0.02] flex flex-col items-center text-center">
               <div className="w-24 h-24 rounded-full bg-zinc-100 border-4 border-white shadow-xl overflow-hidden mb-6">
                 {session.user.image ? (
                   <img src={session.user.image} alt={session.user.name} className="w-full h-full object-cover" />
                 ) : (
                   <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-zinc-300">
                     {session.user.name?.[0] || "U"}
                   </div>
                 )}
               </div>
               <h2 className="text-2xl font-bold tracking-tight">{session.user.name}</h2>
               <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">Elite Member</p>
            </div>

            <div className="p-4 rounded-[32px] bg-white border border-zinc-100 shadow-sm space-y-2">
               {[
                 { icon: Package, label: "Selling" },
                 { icon: Heart, label: "Buying" },
                 { icon: CreditCard, label: "Billing" },
                 { icon: Settings, label: "Settings" },
               ].map((item) => (
                 <button 
                  key={item.label}
                  onClick={() => setActiveTab(item.label)}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[11px] font-bold uppercase tracking-widest transition-all ${activeTab === item.label ? 'bg-black text-white' : 'text-zinc-400 hover:bg-zinc-50 hover:text-black'}`}
                 >
                   <item.icon className="w-4 h-4" />
                   {item.label}
                 </button>
               ))}
               <button 
                  onClick={async () => {
                    await signOut();
                    router.push("/login");
                  }}
                  className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:bg-red-50 hover:text-red-500 transition-all mt-6"
                >
                   <LogOut className="w-4 h-4" />
                   Sign Out
                </button>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-9 space-y-12">
            {activeTab === "Selling" ? (
              <div className="space-y-12">
                <div className="flex items-center justify-between">
                   <div>
                      <h1 className="text-5xl font-bold tracking-tighter">Selling Portal.</h1>
                      <p className="text-zinc-500 font-light mt-2">Manage your active institutional listings.</p>
                   </div>
                   <Link href="/sell">
                      <Button className="h-14 px-8 bg-black text-white rounded-full text-[11px] font-bold uppercase tracking-widest flex items-center gap-3">
                         <Plus className="w-4 h-4" />
                         New Listing
                      </Button>
                   </Link>
                </div>

                <div className="grid grid-cols-1 gap-6">
                   {listingsLoading ? (
                     <div className="py-20 flex justify-center"><Loader2 className="w-6 h-6 animate-spin" /></div>
                   ) : listings.length > 0 ? (
                     listings.map((item) => (
                       <div key={item.id} className="p-8 rounded-[32px] bg-white border border-zinc-100 shadow-sm flex items-center gap-10 hover:shadow-xl hover:shadow-black/[0.02] transition-all group">
                          <div className="relative w-40 aspect-square rounded-2xl overflow-hidden bg-zinc-100">
                             <Image src={item.image} alt={item.title} fill className="object-cover" />
                          </div>
                          <div className="flex-1 space-y-2">
                             <div className="flex items-center gap-3">
                                <span className="px-3 py-1 rounded-full bg-emerald-50 text-[9px] font-bold text-emerald-600 uppercase tracking-widest">Active</span>
                                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{item.category}</span>
                             </div>
                             <h3 className="text-2xl font-bold tracking-tight">{item.title}</h3>
                             <p className="text-zinc-500 text-sm font-light">{item.location}</p>
                          </div>
                          <div className="text-right space-y-2">
                             <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Current Value</p>
                             <p className="text-xl font-bold">{item.price}</p>
                              <div className="flex items-center gap-4 ml-auto pt-2">
                                 <button 
                                   onClick={async () => {
                                     if (confirm("Are you sure you want to remove this institutional asset?")) {
                                       try {
                                         await deleteListing(item.id);
                                         toast.success("Asset removed from portfolio.");
                                         refresh();
                                       } catch (e) {
                                         toast.error("Failed to remove asset.");
                                       }
                                     }
                                   }}
                                   className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-300 hover:bg-red-50 hover:text-red-500 transition-all"
                                 >
                                    <Trash2 className="w-4 h-4" />
                                 </button>
                                 <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-300 group-hover:text-black transition-all">
                                    Manage <ChevronRight className="w-4 h-4" />
                                 </button>
                              </div>
                          </div>
                       </div>
                     ))
                   ) : (
                     <div className="py-32 text-center bg-white rounded-[40px] border-2 border-dashed border-zinc-100">
                        <Package className="w-12 h-12 text-zinc-200 mx-auto mb-6" />
                        <h3 className="text-xl font-bold mb-2">No active listings</h3>
                        <p className="text-zinc-500 max-w-xs mx-auto">Start building your elite portfolio by posting your first asset.</p>
                     </div>
                   )}
                </div>
              </div>
            ) : (
              <div className="space-y-12">
                 <div className="flex items-center justify-between">
                   <div>
                      <h1 className="text-5xl font-bold tracking-tighter">Buying Portal.</h1>
                      <p className="text-zinc-500 font-light mt-2">Track your acquisitions and saved assets.</p>
                   </div>
                   <Link href="/marketplace">
                      <Button className="h-14 px-8 bg-zinc-100 text-black rounded-full text-[11px] font-bold uppercase tracking-widest flex items-center gap-3 hover:bg-zinc-200 transition-all">
                         Discover Assets <ChevronRight className="w-4 h-4" />
                      </Button>
                   </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-10 rounded-[40px] bg-white border border-zinc-100 shadow-sm space-y-6">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center">
                      <Heart className="w-6 h-6 text-zinc-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold tracking-tight">Saved Assets</h3>
                      <p className="text-sm text-zinc-500 font-light mt-1">Items you're currently monitoring for acquisition.</p>
                    </div>
                    <div className="pt-4 border-t border-zinc-50">
                       <p className="text-[10px] font-bold text-zinc-300 uppercase tracking-[0.2em]">0 Assets Saved</p>
                    </div>
                  </div>

                  <div className="p-10 rounded-[40px] bg-white border border-zinc-100 shadow-sm space-y-6">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-zinc-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold tracking-tight">Acquisition History</h3>
                      <p className="text-sm text-zinc-500 font-light mt-1">Verified records of your past trades on Tradixa.</p>
                    </div>
                    <div className="pt-4 border-t border-zinc-50">
                       <p className="text-[10px] font-bold text-zinc-300 uppercase tracking-[0.2em]">No Active Orders</p>
                    </div>
                  </div>
                </div>

                <div className="p-12 rounded-[40px] bg-zinc-950 text-white relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-white/10 transition-all" />
                   <div className="relative z-10 space-y-6">
                      <h3 className="text-3xl font-bold tracking-tight">Ready to acquire?</h3>
                      <p className="text-zinc-400 font-light max-w-md">Our institutional escrow protocol ensures safe and secure trading for high-value assets across Pakistan.</p>
                      <Link href="/marketplace" className="inline-flex h-12 px-8 bg-white text-black rounded-full text-[11px] font-bold uppercase tracking-widest items-center hover:bg-zinc-200 transition-all">
                        Browse Marketplace
                      </Link>
                   </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      <PremiumFooter />
    </main>
  );
}
