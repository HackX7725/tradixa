"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";

// Shared Components
import { AuthSidebar } from "@/components/shared/AuthSidebar";
import { SocialButton } from "@/components/shared/SocialButton";
import { FormInput } from "@/components/shared/FormInput";

// UI Components
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

// Centralized Data
import { LOGIN_DATA } from "@/data/login";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const formRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "expo.out", delay: 0.2 }
    );
  }, []);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true);
    try {
      const { error } = await signIn.email({
        email: values.email,
        password: values.password,
      });

      if (error) {
        toast.error(error.message || "Invalid credentials.");
        setIsLoading(false);
        return;
      }

      toast.success("Security clearance granted. Entering workspace...");
      setTimeout(() => router.push("/dashboard"), 800);
    } catch (err: any) {
      toast.error("System error. Connection refused.");
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex bg-white text-zinc-900 font-sans selection:bg-black selection:text-white">
      <AuthSidebar 
        branding={LOGIN_DATA.branding} 
        links={LOGIN_DATA.footer.links} 
      />

      <div className="w-full lg:w-[58%] flex items-center justify-center p-12 relative bg-white">
        <div ref={formRef} className="w-full max-w-[340px] space-y-12 opacity-0">
          
          <div className="space-y-4">
            <h2 className="text-5xl font-semibold tracking-tight text-black">{LOGIN_DATA.form.title}</h2>
            <p className="text-zinc-500 text-lg font-light leading-relaxed">{LOGIN_DATA.form.subtitle}</p>
          </div>

          <div className="pt-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-5">
                  {LOGIN_DATA.form.fields.map((field) => (
                    <FormInput
                      key={field.name}
                      control={form.control}
                      name={field.name}
                      label={field.label}
                      placeholder={field.placeholder}
                      type={field.type}
                      rightElement={field.hasRecover && (
                        <Link href="/recover" className="text-[10px] font-bold text-zinc-400 hover:text-black uppercase tracking-[0.2em] transition-all">
                          Recover
                        </Link>
                      )}
                    />
                  ))}
                </div>

                <Button
                  type="submit"
                  className="w-full h-14 bg-black text-white hover:bg-zinc-800 transition-all rounded-2xl font-bold text-[14px] uppercase tracking-[0.2em] shadow-xl shadow-black/10 active:scale-[0.98]"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      {LOGIN_DATA.form.submitButton}
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </Button>
              </form>
            </Form>
          </div>

          <div className="relative pt-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-100"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-[0.3em] font-bold">
              <span className="bg-white px-6 text-zinc-300">{LOGIN_DATA.social.divider}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {LOGIN_DATA.social.providers.map((p) => (
              <SocialButton 
                key={p.id} 
                provider={p.id as "facebook" | "google"} 
                label={p.name} 
                className="h-14 rounded-2xl border-zinc-200/60 shadow-sm"
              />
            ))}
          </div>

          <p className="text-center text-[11px] font-bold text-zinc-400 uppercase tracking-[0.25em] mt-12">
            {LOGIN_DATA.footer.noAccount}{" "}
            <Link href="/register" className="text-black hover:underline decoration-1 underline-offset-8 transition-all">
              {LOGIN_DATA.footer.joinAction}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
