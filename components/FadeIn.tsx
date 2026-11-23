"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { EASE_OUT, MQ, gsap, registerGsap } from "@/lib/motion";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  y?: number;
  start?: string;
};

/** Fade + rise on scroll (transform and opacity only). */
export function FadeIn({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  y = 32,
  start = "top 92%",
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add(MQ.anyMotion, () => {
      gsap.fromTo(
        el,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay,
          ease: EASE_OUT,
          scrollTrigger: { trigger: el, start, once: true },
        }
      );
    });
    return () => mm.revert();
  }, [delay, y, start]);

  const Comp = Tag as ElementType;
  return (
    <Comp ref={ref} data-fade className={className}>
      {children}
    </Comp>
  );
}
