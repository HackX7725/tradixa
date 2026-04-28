"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Loader2, Mail } from "lucide-react";
import { toast } from "sonner";

// Shared Components
import { AuthSidebar } from "@/components/shared/AuthSidebar";
import { FormInput } from "@/components/shared/FormInput";

// UI Components
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

// Centralized Data
import { RECOVER_DATA } from "@/data/recover";

const recoverSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export default function RecoverPage() {
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

  const form = useForm<z.infer<typeof recoverSchema>>({
    resolver: zodResolver(recoverSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: z.infer<typeof recoverSchema>) {
    setIsLoading(true);
    try {
      toast.success("Security protocol initiated. Check your encrypted mail.");
      setTimeout(() => router.push("/login"), 2000);
    } catch (err: any) {
      toast.error("Recovery protocol failed. Connection reset.");
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex bg-white text-zinc-900 font-sans selection:bg-black selection:text-white">
      <AuthSidebar 
        branding={RECOVER_DATA.branding} 
        links={RECOVER_DATA.footer.links} 
      />

      <div className="w-full lg:w-[58%] flex items-center justify-center p-12 relative bg-white">
        <div ref={formRef} className="w-full max-w-[340px] space-y-10 opacity-0">
          
          <div className="space-y-4">
            <h2 className="text-5xl font-semibold tracking-tight text-black">{RECOVER_DATA.form.title}</h2>
            <p className="text-zinc-500 text-lg font-light leading-relaxed">{RECOVER_DATA.form.subtitle}</p>
          </div>

          <div className="pt-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-5">
                  {RECOVER_DATA.form.fields.map((field) => (
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
                  className="w-full h-14 bg-black text-white hover:bg-zinc-800 transition-all rounded-2xl font-bold text-[14px] uppercase tracking-[0.2em] shadow-xl shadow-black/10 active:scale-[0.98]"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      {RECOVER_DATA.form.submitButton}
                      <Mail className="w-4 h-4" />
                    </div>
                  )}
                </Button>
              </form>
            </Form>
          </div>

          <p className="text-center text-[11px] font-bold text-zinc-400 uppercase tracking-[0.25em] mt-12">
            {RECOVER_DATA.footer.backToLogin}{" "}
            <Link href="/login" className="text-black hover:underline decoration-1 underline-offset-8 transition-all">
              {RECOVER_DATA.footer.loginAction}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
