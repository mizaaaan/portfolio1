"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { about } from "@/data/projects";
import { MQ, gsap, registerGsap } from "@/lib/motion";
import { FadeIn } from "./FadeIn";
import { LineReveal, TextReveal } from "./TextReveal";

export function About() {
  const rootRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    registerGsap();
    const portrait = portraitRef.current;
    const line = lineRef.current;
    const list = listRef.current;
    if (!portrait || !line || !list) return;

    const mm = gsap.matchMedia();
    mm.add(MQ.anyMotion, () => {
      // Portrait settles from a slight zoom as it passes through the viewport.
      gsap.fromTo(
        portrait,
        { scale: 1.2 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: portrait.parentElement, start: "top bottom", end: "bottom 40%", scrub: true },
        }
      );
      // Timeline rule draws down as you read.
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: list, start: "top 80%", end: "bottom 70%", scrub: true },
        }
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      id="about"
      ref={rootRef}
      aria-labelledby="about-title"
      className="px-6 py-24 md:px-10 lg:py-40"
    >
      <div className="grid grid-cols-12 gap-x-6 gap-y-16">
        <div className="col-span-12 lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden bg-[#141414] lg:sticky lg:top-24">
            <div ref={portraitRef} className="absolute inset-0 will-change-transform">
              <Image
                src={about.portrait}
                alt={about.portraitAlt}
                fill
                sizes="(min-width: 1024px) 40vw, 92vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          <p className="text-sm uppercase tracking-[0.2em] text-paper/60">{about.eyebrow}</p>
          <h2
            id="about-title"
            className="mt-6 font-display text-[clamp(2.5rem,5.5vw,5.5rem)] font-semibold leading-[0.95] tracking-tight"
          >
            <TextReveal text={about.title} />
          </h2>

          <LineReveal
            lines={about.bio}
            className="mt-12 font-display text-2xl leading-snug text-paper/90 md:text-3xl"
          />

          <h3 className="mt-24 text-sm uppercase tracking-[0.2em] text-paper/60">
            {about.timelineTitle}
          </h3>
          <div className="relative mt-8">
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-0 top-0 w-px bg-paper/15"
            />
            <div
              ref={lineRef}
              aria-hidden="true"
              className="absolute bottom-0 left-0 top-0 w-px origin-top bg-accent"
            />
            <ol ref={listRef} className="space-y-12">
              {about.timeline.map((item, i) => (
                <FadeIn
                  as="li"
                  key={item.period}
                  delay={i * 0.04}
                  className="relative pl-8"
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-2 h-2 w-2 -translate-x-1/2 rounded-full bg-accent"
                  />
                  <p className="text-sm tabular-nums text-paper/60">{item.period}</p>
                  <p className="mt-1 font-display text-2xl font-semibold tracking-tight">
                    {item.role}
                    <span className="text-paper/60"> · {item.company}</span>
                  </p>
                  <p className="mt-2 max-w-[48ch] text-paper/70">{item.note}</p>
                </FadeIn>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
