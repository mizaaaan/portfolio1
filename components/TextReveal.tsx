"use client";

import { useEffect, useRef, type ElementType } from "react";
import { EASE_OUT, MQ, gsap, registerGsap } from "@/lib/motion";
import { Words } from "./Words";

type WordProps = {
  text: string;
  as?: ElementType;
  className?: string;
  /** Seconds between words. Keep within 0.03–0.05. */
  stagger?: number;
  delay?: number;
  start?: string;
};

/** Masked word-by-word reveal, triggered once when scrolled into view. */
export function TextReveal({
  text,
  as: Tag = "span",
  className,
  stagger = 0.04,
  delay = 0,
  start = "top 90%",
}: WordProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add(MQ.anyMotion, () => {
      gsap.fromTo(
        el.querySelectorAll(".word-inner"),
        { y: 0, yPercent: 110 },
        {
          y: 0,
          yPercent: 0,
          duration: 1,
          ease: EASE_OUT,
          stagger,
          delay,
          scrollTrigger: { trigger: el, start, once: true },
        }
      );
    });
    return () => mm.revert();
  }, [stagger, delay, start]);

  const Comp = Tag as ElementType;
  return (
    <Comp ref={ref} className={className}>
      <Words text={text} />
    </Comp>
  );
}

type LineProps = {
  lines: string[];
  className?: string;
  stagger?: number;
  start?: string;
};

/** Masked line-by-line reveal. Each array entry is one line of text. */
export function LineReveal({ lines, className, stagger = 0.05, start = "top 85%" }: LineProps) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add(MQ.anyMotion, () => {
      gsap.fromTo(
        el.querySelectorAll(".line-inner"),
        { y: 0, yPercent: 110 },
        {
          y: 0,
          yPercent: 0,
          duration: 1,
          ease: EASE_OUT,
          stagger,
          scrollTrigger: { trigger: el, start, once: true },
        }
      );
    });
    return () => mm.revert();
  }, [stagger, start]);

  return (
    <p ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="line-mask">
          <span className="line-inner">{line}</span>
        </span>
      ))}
    </p>
  );
}
