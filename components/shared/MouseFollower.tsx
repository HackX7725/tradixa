"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function MouseFollower() {
  const followerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const follower = followerRef.current;
    const ring = ringRef.current;
    if (!follower || !ring) return;

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
      });
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: "power2.out"
      });
    };

    const onMouseDown = () => {
      gsap.to([follower, ring], { scale: 0.8, duration: 0.2 });
    };

    const onMouseUp = () => {
      gsap.to([follower, ring], { scale: 1, duration: 0.2 });
    };

    const onMouseEnterLink = () => {
      gsap.to(ring, { 
        scale: 2.5, 
        backgroundColor: "rgba(0,0,0,0.05)", 
        borderColor: "rgba(0,0,0,0.1)",
        duration: 0.3 
      });
      gsap.to(follower, { scale: 0, duration: 0.3 });
    };

    const onMouseLeaveLink = () => {
      gsap.to(ring, { 
        scale: 1, 
        backgroundColor: "transparent", 
        borderColor: "rgba(0,0,0,0.2)",
        duration: 0.3 
      });
      gsap.to(follower, { scale: 1, duration: 0.3 });
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    const links = document.querySelectorAll("a, button");
    links.forEach(link => {
      link.addEventListener("mouseenter", onMouseEnterLink);
      link.addEventListener("mouseleave", onMouseLeaveLink);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      links.forEach(link => {
        link.removeEventListener("mouseenter", onMouseEnterLink);
        link.removeEventListener("mouseleave", onMouseLeaveLink);
      });
    };
  }, []);

  return (
    <>
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-black rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden lg:block" 
      />
      <div 
        ref={ringRef} 
        className="fixed top-0 left-0 w-8 h-8 border border-zinc-900/20 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 hidden lg:block transition-colors duration-300" 
      />
    </>
  );
}
