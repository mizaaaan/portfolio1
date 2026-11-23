"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, registerGsap, prefersReducedMotion } from "@/lib/motion";
import { setLenis } from "@/lib/lenis";

/** Lenis smooth scroll wired into GSAP's ticker and ScrollTrigger. */
export function SmoothScroll() {
  useEffect(() => {
    registerGsap();

    // Reduced motion: keep native scrolling.
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), // expo-out
      smoothWheel: true,
    });
    setLenis(lenis);

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
