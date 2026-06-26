"use client";

import Link from "next/link";
import { LANDING_DATA } from "@/data/landing";
import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { useSession, authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Loader2, User, LogOut, LayoutDashboard } from "lucide-react";
import { toast } from "sonner";

import { usePathname } from "next/navigation";

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const isDarkPage = pathname === "/vehicles" || pathname === "/electronics"; 

  useGSAP(() => {
    gsap.fromTo(
      navRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    );
  }, []);

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Signed out successfully");
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  return (
    <nav 
      ref={navRef} 
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-6 backdrop-blur-xl border-b transition-colors duration-500 ${
        isDarkPage 
          ? "bg-black/70 border-zinc-900 text-white" 
          : "bg-white/70 border-zinc-100 text-black"
      }`}
    >
      <div className="flex items-center gap-12">
        <Link 
          href="/" 
          className={`group flex items-center gap-2 p-2 -ml-2 rounded-xl transition-all active:scale-95 ${
            isDarkPage ? "hover:bg-zinc-900" : "hover:bg-zinc-100"
          }`}
        >
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform ${
            isDarkPage ? "bg-white" : "bg-black"
          }`}>
            <div className={`w-3 h-3 rounded-[1px] ${isDarkPage ? "bg-black" : "bg-white"}`} />
          </div>
          <span className={`text-2xl font-bold tracking-tighter ${isDarkPage ? "text-white" : "text-black"}`}>
            {LANDING_DATA.navigation.logo}
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {LANDING_DATA.navigation.links.map((link) => (
            <Link 
              key={link.label} 
              href={link.href} 
              className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-all relative group ${
                isDarkPage ? "text-zinc-500 hover:text-white" : "text-zinc-400 hover:text-black"
              }`}
            >
              {link.label}
              <span className={`absolute -bottom-1 left-0 w-0 h-[1px] transition-all group-hover:w-full ${
                isDarkPage ? "bg-white" : "bg-black"
              }`} />
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <Link href="/sell">
          <Button className={`h-10 px-8 rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition-all shadow-sm ${
            isDarkPage 
              ? "bg-zinc-900 text-white border border-zinc-800 hover:bg-white hover:text-black" 
              : "bg-zinc-100 text-black border border-zinc-200 hover:bg-black hover:text-white"
          }`}>
            + Sell
          </Button>
        </Link>

        {isPending ? (
          <Loader2 className="w-4 h-4 animate-spin text-zinc-400" />
        ) : session ? (
          <div className="flex items-center gap-4">
             <Link href="/dashboard" className="text-[11px] font-bold text-zinc-400 hover:text-black uppercase tracking-[0.2em] transition-all flex items-center gap-2">
               <LayoutDashboard className="w-3.5 h-3.5" />
               Dashboard
             </Link>
             <button 
               onClick={handleLogout}
               className="text-[11px] font-bold text-zinc-400 hover:text-black uppercase tracking-[0.2em] transition-all flex items-center gap-2"
             >
               <LogOut className="w-3.5 h-3.5" />
               Exit
             </button>
             <div className="w-8 h-8 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center overflow-hidden">
               {session.user.image ? (
                 <img src={session.user.image} alt={session.user.name} className="w-full h-full object-cover" />
               ) : (
                 <User className="w-4 h-4 text-zinc-400" />
               )}
             </div>
          </div>
        ) : (
          <>
            <Link 
              href="/login" 
              className="text-[11px] font-bold text-zinc-400 hover:text-black uppercase tracking-[0.2em] transition-all"
            >
              {LANDING_DATA.navigation.auth.login}
            </Link>
            <Link href="/register">
              <Button className="h-10 px-6 bg-black text-white rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all shadow-lg shadow-black/5">
                {LANDING_DATA.navigation.auth.register}
              </Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
