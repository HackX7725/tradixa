"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Splash({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: onComplete
        });
      }
    });

    tl.fromTo(
      contentRef.current,
      { opacity: 0, y: 10, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" }
    )
    .fromTo(
      ".progress-line",
      { width: 0 },
      { width: "100%", duration: 1.2, ease: "power2.inOut" },
      "-=0.5"
    )
    .to(contentRef.current, {
      opacity: 0,
      y: -10,
      duration: 0.6,
      ease: "power2.in",
      delay: 0.2
    });
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center">
      <div ref={contentRef} className="flex flex-col items-center gap-5 opacity-0">
        {/* Small, Decent Logo Badge */}
        <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center shadow-lg shadow-black/5">
          <div className="w-4 h-4 bg-white rounded-[1px]" />
        </div>
        
        {/* Understated Typography */}
        <div className="flex flex-col items-center gap-3">
          <span className="text-xl font-bold tracking-tight text-black">Tradixa</span>
          
          {/* Subtle Progress Indicator */}
          <div className="w-24 h-[1px] bg-zinc-100 relative overflow-hidden">
            <div className="progress-line absolute top-0 left-0 h-full w-0 bg-zinc-300" />
          </div>
        </div>

        <span className="text-[9px] font-bold text-zinc-300 uppercase tracking-[0.3em]">
          Identity Verified
        </span>
      </div>
    </div>
  );
}
