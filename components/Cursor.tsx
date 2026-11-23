"use client";

import { useEffect, useRef } from "react";
import { EASE_OUT, MQ, gsap, prefersReducedMotion } from "@/lib/motion";

const INTERACTIVE = "a, button, [data-cursor], input, textarea, summary";

/** Custom cursor: desktop (fine pointer) only, grows over interactive elements. */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia(MQ.finePointer).matches) return;

    const reduce = prefersReducedMotion();
    const d = reduce ? 0 : 0.6;
    document.documentElement.classList.add("has-cursor");

    gsap.set(el, { xPercent: -50, yPercent: -50, opacity: 0, scale: 1 });
    const xTo = gsap.quickTo(el, "x", { duration: d, ease: EASE_OUT });
    const yTo = gsap.quickTo(el, "y", { duration: d, ease: EASE_OUT });

    let visible = false;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!visible) {
        visible = true;
        gsap.set(el, { x: e.clientX, y: e.clientY });
        gsap.to(el, { opacity: 1, duration: reduce ? 0 : 0.4 });
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      const hit = (e.target as Element | null)?.closest?.(INTERACTIVE);
      gsap.to(el, { scale: hit ? 3.2 : 1, duration: reduce ? 0 : 0.6, ease: EASE_OUT, overwrite: "auto" });
    };
    const onLeave = () => {
      visible = false;
      gsap.to(el, { opacity: 0, duration: reduce ? 0 : 0.3 });
    };

    window.addEventListener("pointermove", onMove);
    document.addEventListener("mouseover", onOver);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("has-cursor");
      gsap.killTweensOf(el);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[80] h-4 w-4 rounded-full bg-white opacity-0 mix-blend-difference"
    />
  );
}
