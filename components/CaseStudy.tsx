"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { caseStudy } from "@/data/projects";
import { EASE_IN_OUT, EASE_OUT, gsap, registerGsap, ScrollTrigger } from "@/lib/motion";
import { FadeIn } from "./FadeIn";
import { TextReveal } from "./TextReveal";

/** Sticky split layout: text scrolls on the left while imagery swaps on the right. */
export function CaseStudy() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();
    const root = rootRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      // Image swapping still works with reduced motion, just without easing.
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const dur = (s: number) => (reduce ? 0 : s);

      const images = gsap.utils.toArray<HTMLElement>(".case-img", root);
      const steps = gsap.utils.toArray<HTMLElement>("[data-step]", root);
      let current = 0;

      const show = (next: number) => {
        if (next === current || !images[next]) return;
        const prev = current;
        current = next;

        images.forEach((img, i) => {
          if (i !== prev && i !== next) gsap.set(img, { opacity: 0 });
        });
        gsap.to(images[prev], {
          opacity: 0,
          duration: dur(0.9),
          ease: EASE_IN_OUT,
          overwrite: "auto",
        });
        gsap.fromTo(
          images[next],
          { opacity: 0, scale: reduce ? 1 : 1.08 },
          { opacity: 1, scale: 1, duration: dur(1.2), ease: EASE_OUT, overwrite: "auto" }
        );
      };

      steps.forEach((step, i) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => {
            if (self.isActive) show(i);
          },
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="case-study"
      ref={rootRef}
      aria-labelledby="case-title"
      className="relative px-6 py-24 md:px-10 lg:py-40"
    >
      <header className="grid grid-cols-12 gap-x-6 gap-y-8">
        <p className="col-span-12 text-sm uppercase tracking-[0.2em] text-paper/60">
          {caseStudy.eyebrow}
        </p>
        <h2
          id="case-title"
          className="col-span-12 font-display text-h2 font-semibold lg:col-span-7"
        >
          <TextReveal text={caseStudy.title} />
        </h2>
        <div className="col-span-12 lg:col-span-5 lg:self-end">
          <FadeIn as="p" className="text-lg text-paper/80 md:text-xl">
            {caseStudy.intro}
          </FadeIn>
          <FadeIn as="dl" delay={0.05} className="mt-8 grid grid-cols-3 gap-6 border-t border-paper/15 pt-6">
            {caseStudy.meta.map((m) => (
              <div key={m.label}>
                <dt className="text-xs uppercase tracking-[0.16em] text-paper/60">{m.label}</dt>
                <dd className="mt-1 text-base">{m.value}</dd>
              </div>
            ))}
          </FadeIn>
        </div>
      </header>

      <div className="mt-16 grid grid-cols-12 gap-x-6 lg:mt-24">
        <div className="col-span-12 lg:col-span-5">
          {caseStudy.steps.map((step, i) => (
            <article
              key={step.label}
              data-step
              className="flex flex-col justify-center py-12 lg:min-h-[90svh] lg:py-16"
            >
              <FadeIn as="p" className="text-sm uppercase tracking-[0.2em] text-accent">
                {step.label}
              </FadeIn>
              <h3 className="mt-4 font-display text-4xl font-semibold leading-[1.02] tracking-tight md:text-5xl">
                <TextReveal text={step.title} />
              </h3>
              <FadeIn as="p" delay={0.05} className="mt-6 max-w-[46ch] text-lg text-paper/70">
                {step.body}
              </FadeIn>
              {/* Mobile / tablet: image sits inline with its step */}
              <div className="relative mt-8 aspect-[4/5] overflow-hidden lg:hidden">
                <Image
                  src={step.image}
                  alt={step.imageAlt}
                  fill
                  sizes="92vw"
                  className="object-cover"
                  priority={false}
                />
              </div>
              {i === caseStudy.steps.length - 1 ? (
                <FadeIn className="mt-10">
                  <a
                    href={caseStudy.cta.href}
                    className="link-underline font-display text-xl tracking-tight"
                  >
                    {caseStudy.cta.label} →
                  </a>
                </FadeIn>
              ) : null}
            </article>
          ))}
        </div>

        {/* Desktop: sticky image stack */}
        <div className="hidden lg:col-span-6 lg:col-start-7 lg:block">
          <div className="sticky top-0 flex h-screen items-center">
            <div className="relative h-[76svh] max-h-[860px] w-full overflow-hidden bg-[#141414]">
              {caseStudy.steps.map((step, i) => (
                <div
                  key={step.image}
                  className={`case-img absolute inset-0 will-change-transform ${
                    i === 0 ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src={step.image}
                    alt={step.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 0px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
