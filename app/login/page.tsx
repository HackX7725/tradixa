"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";

import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Sophisticated entrance for the form
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.1 }
      );

      // Smooth entrance for the branding side
      gsap.fromTo(
        ".abstract-element",
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.08, ease: "power1.out" }
      );
    },
    { scope: containerRef }
  );

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true);

    try {
      const { data, error } = await signIn.email({
        email: values.email,
        password: values.password,
      });

      if (error) {
        toast.error(error.message || "Authentication failed. Please verify your credentials.");
        setIsLoading(false);
        return;
      }

      toast.success("Identity verified. Redirecting...");
      
      setTimeout(() => {
        router.push("/dashboard");
      }, 800);
    } catch (err: any) {
      toast.error("A network error occurred. Please try again.");
      setIsLoading(false);
    }
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full flex bg-[#fafafa] text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white"
    >
      {/* Left Column - Institutional Branding */}
      <div className="hidden lg:flex w-[42%] relative overflow-hidden bg-white border-r border-zinc-200 flex-col justify-between p-16">
        
        {/* Minimal Grid Overlay */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', 
            backgroundSize: '32px 32px' 
          }} 
        />

        {/* Content */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-9 h-9 border border-zinc-200 bg-white rounded-lg flex items-center justify-center abstract-element shadow-sm">
            <div className="w-4 h-4 bg-zinc-900 rounded-[2px]" />
          </div>
          <span className="text-xl font-bold tracking-tight abstract-element">Tradixa</span>
        </div>

        <div className="relative z-10 abstract-element">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-zinc-100 text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-500 mb-8 border border-zinc-200">
            Enterprise Suite
          </div>
          <h1 className="text-5xl font-semibold tracking-tight leading-[1.1] mb-8">
            High-fidelity trading <br/>
            <span className="text-zinc-400 font-normal">engineered for speed.</span>
          </h1>
          <p className="text-lg text-zinc-500 leading-relaxed font-light max-w-sm">
            The platform of choice for institutional liquidity and precision market analysis.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-8 text-[11px] font-semibold text-zinc-400 uppercase tracking-widest abstract-element">
          <span>© 2026 Tradixa Inc.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-zinc-900 transition-colors">Privacy</a>
            <a href="#" className="hover:text-zinc-900 transition-colors">Terms</a>
          </div>
        </div>
      </div>

      {/* Right Column - Authentication Interface */}
      <div className="w-full lg:w-[58%] flex items-center justify-center p-8 relative">
        <div ref={formRef} className="w-full max-w-[340px] space-y-12 opacity-0">
          
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold tracking-tight">Sign in</h2>
            <p className="text-zinc-500 text-sm">
              Please enter your authorized credentials.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Email Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="name@company.com"
                          type="email"
                          className="h-11 bg-white border-zinc-300 text-zinc-900 focus-visible:border-zinc-900 focus-visible:ring-0 transition-all rounded-md px-3.5 shadow-none text-[15px] placeholder:text-zinc-300"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-[11px] font-medium" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Password</FormLabel>
                        <a href="#" className="text-[10px] font-bold text-zinc-400 hover:text-zinc-900 uppercase tracking-widest transition-colors">Recover</a>
                      </div>
                      <FormControl>
                        <Input
                          placeholder="••••••••"
                          type="password"
                          className="h-11 bg-white border-zinc-300 text-zinc-900 focus-visible:border-zinc-900 focus-visible:ring-0 transition-all rounded-md px-3.5 shadow-none text-[15px] placeholder:text-zinc-300"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-[11px] font-medium" />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-zinc-900 text-white hover:bg-zinc-800 transition-all rounded-md font-bold text-[13px] uppercase tracking-widest mt-4 shadow-md shadow-zinc-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    Access Account
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </Button>
            </form>
          </Form>

          <div className="relative pt-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-100"></div>
            </div>
            <div className="relative flex justify-center text-[9px] uppercase tracking-[0.25em] font-bold">
              <span className="bg-[#fafafa] px-4 text-zinc-300">Identity Provider</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              type="button"
              className="h-11 bg-white border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 hover:border-zinc-400 text-zinc-700 rounded-md transition-all font-bold text-[11px] uppercase tracking-widest group"
            >
              <svg className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </Button>
            <Button
              variant="outline"
              type="button"
              className="h-11 bg-white border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 hover:border-zinc-400 text-zinc-700 rounded-md transition-all font-bold text-[11px] uppercase tracking-widest group"
            >
              <svg className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </Button>
          </div>

          <p className="text-center text-[11px] font-bold text-zinc-400 uppercase tracking-widest mt-10">
            No account?{" "}
            <a href="/register" className="text-zinc-900 hover:underline decoration-1 underline-offset-4">
              Join Tradixa
            </a>
          </p>

        </div>
      </div>
    </div>
  );
}
