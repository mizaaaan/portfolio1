"use client";

import { useEffect, useRef } from "react";
import { EASE_OUT, MQ, gsap } from "@/lib/motion";

type Props = {
  children: React.ReactNode;
  /** 0–1. How far the element follows the pointer. */
  strength?: number;
  className?: string;
};

/** Wraps children in an element that gently follows the pointer (desktop only). */
export function Magnetic({ children, strength = 0.3, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add(`${MQ.anyMotion} and ${MQ.finePointer}`, () => {
      const xTo = gsap.quickTo(el, "x", { duration: 0.9, ease: EASE_OUT });
      const yTo = gsap.quickTo(el, "y", { duration: 0.9, ease: EASE_OUT });

      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * strength);
        yTo((e.clientY - (r.top + r.height / 2)) * strength);
      };
      const onLeave = () => {
        xTo(0);
        yTo(0);
      };

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    });

    return () => mm.revert();
  }, [strength]);

  return (
    <span ref={ref} className={`inline-block ${className ?? ""}`}>
      {children}
    </span>
  );
}
