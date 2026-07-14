"use client";

import Link from "next/link";
import { LANDING_DATA } from "@/data/landing";
import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { useSession, authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Loader2, User, LogOut, LayoutDashboard, Menu, X } from "lucide-react";
import { toast } from "sonner";

import { usePathname } from "next/navigation";

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    <>
      <nav 
        ref={navRef} 
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 md:py-6 backdrop-blur-xl border-b transition-colors duration-500 ${
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

        {/* Desktop Nav Controls */}
        <div className="hidden md:flex items-center gap-6">
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

        {/* Mobile Hamburger Toggle */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex md:hidden p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </nav>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white dark:bg-zinc-950 flex flex-col justify-between pt-32 pb-12 px-8 animate-in fade-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-8">
            {LANDING_DATA.navigation.links.map((link) => (
              <Link 
                key={link.label} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-semibold uppercase tracking-widest text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-6 border-t border-zinc-100 dark:border-zinc-900 pt-8">
            <Link href="/sell" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full h-14 rounded-full text-[12px] font-bold uppercase tracking-widest bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200">
                + Sell Asset
              </Button>
            </Link>

            {isPending ? (
              <div className="flex justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
              </div>
            ) : session ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50">
                  <div className="w-10 h-10 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center overflow-hidden">
                    {session.user.image ? (
                      <img src={session.user.image} alt={session.user.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-5 h-5 text-zinc-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold">{session.user.name}</p>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Authorized Identity</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                    <Button variant="outline" className="w-full h-12 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                      <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    onClick={async () => {
                      setIsMobileMenuOpen(false);
                      await handleLogout();
                    }}
                    className="w-full h-12 rounded-xl text-[10px] font-bold uppercase tracking-widest text-red-500 hover:text-red-600 border-red-200 hover:bg-red-50 flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full h-14 rounded-full text-[12px] font-bold uppercase tracking-widest">
                    {LANDING_DATA.navigation.auth.login}
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full h-14 rounded-full text-[12px] font-bold uppercase tracking-widest bg-black text-white hover:bg-zinc-800">
                    {LANDING_DATA.navigation.auth.register}
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
