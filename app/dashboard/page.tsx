"use client";

import { useState } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import { Navbar } from "@/components/landing/Navbar";
import { PremiumFooter } from "@/components/landing/Footer";
import { useListings } from "@/hooks/use-listings";
import { Loader2, Plus, Settings, Package, Heart, CreditCard, ChevronRight, LogOut, Trash2, X } from "lucide-react";
import { deleteListing, updateListing } from "@/lib/actions";
import { toast } from "sonner";
import { LANDING_DATA } from "@/data/landing";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [activeTab, setActiveTab] = useState("Selling");
  const { listings, loading: listingsLoading, refresh } = useListings(undefined, undefined, session?.user?.id);

  const [editingListing, setEditingListing] = useState<any | null>(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    category: "Vehicles",
    description: "",
    price: "",
    location: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);

  const handleEditClick = (item: any) => {
    setEditingListing(item);
    setEditFormData({
      title: item.title,
      category: item.category,
      description: item.description || "",
      price: item.price,
      location: item.location,
    });
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingListing) return;
    setIsUpdating(true);
    try {
      await updateListing(editingListing.id, editFormData);
      toast.success("Listing updated successfully!");
      setEditingListing(null);
      refresh();
    } catch (error) {
      toast.error("Failed to update listing.");
    } finally {
      setIsUpdating(false);
    }
  };

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
      
      <section className="pt-32 pb-16 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16">
          
          {/* Sidebar */}
          <div className="lg:col-span-3 space-y-6 md:space-y-8">
            <div className="p-6 md:p-10 rounded-3xl md:rounded-[40px] bg-white border border-zinc-100 shadow-xl shadow-black/[0.02] flex flex-row lg:flex-col items-center gap-6 lg:text-center">
               <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-zinc-100 border-4 border-white shadow-xl overflow-hidden shrink-0">
                 {session.user.image ? (
                   <img src={session.user.image} alt={session.user.name} className="w-full h-full object-cover" />
                 ) : (
                   <div className="w-full h-full flex items-center justify-center text-xl md:text-3xl font-bold text-zinc-300">
                     {session.user.name?.[0] || "U"}
                   </div>
                 )}
               </div>
               <div className="lg:space-y-1">
                 <h2 className="text-xl md:text-2xl font-bold tracking-tight">{session.user.name}</h2>
                 <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-0.5">Elite Member</p>
               </div>
            </div>

            <div className="p-3 rounded-2xl md:rounded-[32px] bg-white border border-zinc-100 shadow-sm flex flex-row lg:flex-col gap-2 overflow-x-auto no-scrollbar">
               {[
                 { icon: Package, label: "Selling" },
                 { icon: Heart, label: "Buying" },
                 { icon: CreditCard, label: "Billing" },
                 { icon: Settings, label: "Settings" },
               ].map((item) => (
                 <button 
                  key={item.label}
                  onClick={() => setActiveTab(item.label)}
                  className={`flex-1 lg:flex-none flex items-center justify-center lg:justify-start gap-3 md:gap-4 px-5 py-3 md:py-4 rounded-xl md:rounded-2xl text-[10px] md:text-[11px] font-bold uppercase tracking-widest transition-all min-w-fit ${activeTab === item.label ? 'bg-black text-white' : 'text-zinc-400 hover:bg-zinc-50 hover:text-black'}`}
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
                  className="flex items-center justify-center lg:justify-start gap-3 md:gap-4 px-5 py-3 md:py-4 rounded-xl md:rounded-2xl text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:bg-red-50 hover:text-red-500 transition-all min-w-fit lg:mt-6"
                >
                   <LogOut className="w-4 h-4" />
                   Sign Out
                </button>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-9 space-y-8 md:space-y-12">
            {activeTab === "Selling" ? (
              <div className="space-y-8 md:space-y-12">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                   <div>
                      <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">Selling Portal.</h1>
                      <p className="text-zinc-500 font-light mt-1">Manage your active institutional listings.</p>
                   </div>
                   <Link href="/sell" className="inline-block shrink-0">
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
                       <div key={item.id} className="p-6 md:p-8 rounded-2xl md:rounded-[32px] bg-white border border-zinc-100 shadow-sm flex flex-col md:flex-row items-stretch md:items-center gap-6 md:gap-10 hover:shadow-xl hover:shadow-black/[0.02] transition-all group">
                          <div className="relative w-full h-48 md:w-40 md:h-40 md:aspect-square rounded-xl overflow-hidden bg-zinc-100 shrink-0">
                             <Image src={item.image} alt={item.title} fill className="object-cover" />
                          </div>
                          <div className="flex-1 space-y-2">
                             <div className="flex items-center gap-3">
                                <span className="px-3 py-1 rounded-full bg-emerald-50 text-[9px] font-bold text-emerald-600 uppercase tracking-widest">Active</span>
                                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{item.category}</span>
                             </div>
                             <h3 className="text-xl md:text-2xl font-bold tracking-tight">{item.title}</h3>
                             <p className="text-zinc-500 text-sm font-light">{item.location}</p>
                          </div>
                          <div className="text-left md:text-right space-y-2 w-full md:w-auto pt-4 md:pt-0 border-t border-zinc-100 md:border-t-0 flex flex-row md:flex-col justify-between items-center md:items-end">
                             <div className="space-y-1">
                                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Current Value</p>
                                <p className="text-xl font-bold">{item.price}</p>
                             </div>
                              <div className="flex items-center gap-4 pt-2">
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
                                    className="w-10 h-10 rounded-full flex items-center justify-center bg-zinc-50 border border-zinc-100 text-zinc-400 hover:bg-red-50 hover:text-red-600 transition-all shadow-sm"
                                 >
                                    <Trash2 className="w-4 h-4" />
                                 </button>
                                  <button 
                                    onClick={() => handleEditClick(item)}
                                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-black transition-all"
                                  >
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

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div className="p-6 sm:p-10 rounded-3xl md:rounded-[40px] bg-white border border-zinc-100 shadow-sm space-y-6">
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

                  <div className="p-6 sm:p-10 rounded-3xl md:rounded-[40px] bg-white border border-zinc-100 shadow-sm space-y-6">
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

                <div className="p-6 sm:p-12 rounded-3xl md:rounded-[40px] bg-zinc-950 text-white relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-white/10 transition-all" />
                   <div className="relative z-10 space-y-6">
                      <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">Ready to acquire?</h3>
                      <p className="text-zinc-400 text-sm sm:text-base font-light max-w-md">Our institutional escrow protocol ensures safe and secure trading for high-value assets across Pakistan.</p>
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

      {editingListing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-3xl md:rounded-[40px] border border-zinc-100 p-6 sm:p-12 shadow-2xl relative overflow-y-auto max-h-[90vh] space-y-8 animate-in zoom-in-95 duration-200">
            <button 
              type="button"
              onClick={() => setEditingListing(null)}
              className="absolute top-4 right-4 md:top-8 md:right-8 w-10 h-10 md:w-12 md:h-12 rounded-full border border-zinc-100 flex items-center justify-center hover:bg-zinc-50 transition-all text-zinc-400 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 pt-4 sm:pt-0">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.4em]">Quick Customizer</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">Manage Asset.</h2>
            </div>

            <form onSubmit={handleUpdateSubmit} className="space-y-6 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Asset Title</label>
                  <input 
                    type="text"
                    required
                    value={editFormData.title}
                    onChange={e => setEditFormData({...editFormData, title: e.target.value})}
                    className="w-full h-14 px-6 rounded-2xl border border-zinc-200 bg-zinc-50/50 text-sm font-medium outline-none focus:border-black transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Category</label>
                  <select 
                    value={editFormData.category}
                    onChange={e => setEditFormData({...editFormData, category: e.target.value})}
                    className="w-full h-14 rounded-2xl border border-zinc-200 bg-zinc-50/50 px-6 text-sm font-medium outline-none focus:border-black transition-all appearance-none"
                  >
                    {LANDING_DATA.categories.map(cat => (
                      <option key={cat.id} value={cat.label}>{cat.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Price</label>
                  <input 
                    type="text"
                    required
                    value={editFormData.price}
                    onChange={e => setEditFormData({...editFormData, price: e.target.value})}
                    className="w-full h-14 px-6 rounded-2xl border border-zinc-200 bg-zinc-50/50 text-sm font-medium outline-none focus:border-black transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Location</label>
                  <input 
                    type="text"
                    required
                    value={editFormData.location}
                    onChange={e => setEditFormData({...editFormData, location: e.target.value})}
                    className="w-full h-14 px-6 rounded-2xl border border-zinc-200 bg-zinc-50/50 text-sm font-medium outline-none focus:border-black transition-all" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Description</label>
                <textarea 
                  value={editFormData.description}
                  onChange={e => setEditFormData({...editFormData, description: e.target.value})}
                  className="w-full min-h-[120px] md:min-h-[150px] rounded-3xl border border-zinc-200 bg-zinc-50/50 p-6 text-sm font-medium outline-none focus:border-black transition-all resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-3 md:gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setEditingListing(null)}
                  className="h-14 px-8 border border-zinc-200 text-black hover:bg-zinc-50 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all w-full sm:w-auto"
                >
                  Cancel
                </button>
                <Button 
                  type="submit"
                  disabled={isUpdating}
                  className="h-14 px-8 bg-black text-white rounded-full text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-3 w-full sm:w-auto"
                >
                  {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
