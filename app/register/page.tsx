"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signUp } from "@/lib/auth-client"; // Assuming signUp is available
import { useRouter } from "next/navigation";
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
import { REGISTER_DATA } from "@/data/register";

const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
});

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const formRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.1 }
    );
  }, []);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    setIsLoading(true);
    try {
      // In a real scenario, you'd use better-auth signUp
      toast.success("Account created successfully!");
      setTimeout(() => router.push("/login"), 1500);
    } catch (err: any) {
      toast.error("Registration failed. Please try again.");
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-row-reverse bg-[#fafafa] text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white">
      {/* Shared Sidebar Component - Now on the Right */}
      <AuthSidebar 
        branding={REGISTER_DATA.branding} 
        links={REGISTER_DATA.footer.links} 
      />

      {/* Authentication Interface - Now on the Left */}
      <div className="w-full lg:w-[58%] flex items-center justify-center p-8 relative">
        <div ref={formRef} className="w-full max-w-[340px] space-y-12 opacity-0">
          
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold tracking-tight">{REGISTER_DATA.form.title}</h2>
            <p className="text-zinc-500 text-sm">{REGISTER_DATA.form.subtitle}</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                {REGISTER_DATA.form.fields.map((field) => (
                  <FormInput
                    key={field.name}
                    control={form.control}
                    name={field.name}
                    label={field.label}
                    placeholder={field.placeholder}
                    type={field.type}
                  />
                ))}
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
                    {REGISTER_DATA.form.submitButton}
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
              <span className="bg-[#fafafa] px-4 text-zinc-300">{REGISTER_DATA.social.divider}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {REGISTER_DATA.social.providers.map((p) => (
              <SocialButton 
                key={p.id} 
                provider={p.id} 
                label={p.name} 
              />
            ))}
          </div>

          <p className="text-center text-[11px] font-bold text-zinc-400 uppercase tracking-widest mt-10">
            {REGISTER_DATA.footer.hasAccount}{" "}
            <a href="/login" className="text-zinc-900 hover:underline decoration-1 underline-offset-4">
              {REGISTER_DATA.footer.loginAction}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
