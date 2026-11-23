"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { site } from "@/data/projects";
import { EASE_IN_OUT, EASE_OUT, MQ, gsap, registerGsap } from "@/lib/motion";
import { Words } from "./Words";

/**
 * Transform layers (each owns one job so transforms never fight):
 *   parallax  → scroll-linked y / scale / fade
 *   tilt      → cursor-follow rotateX / rotateY
 *   slide     → load-in x / rotateY / opacity
 *   float     → idle 4px oscillation
 */
export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const root = rootRef.current;
    const parallax = parallaxRef.current;
    const tilt = tiltRef.current;
    const slide = slideRef.current;
    const float = floatRef.current;
    const shadow = shadowRef.current;
    if (!root || !parallax || !tilt || !slide || !float || !shadow) return;

    const mm = gsap.matchMedia();

    // 1) Load-in sequence (any visitor without reduced motion)
    mm.add(MQ.anyMotion, () => {
      const words = root.querySelectorAll(".hero-word");
      const meta = root.querySelectorAll(".hero-meta");
      const travel = window.innerWidth >= 1024 ? "26vw" : "12vw";

      gsap.set([tilt, slide], { transformPerspective: 1400 });

      const idle = gsap.to(float, {
        y: -4,
        duration: 2.4,
        ease: EASE_IN_OUT,
        yoyo: true,
        repeat: -1,
        paused: true,
      });

      const tl = gsap.timeline({
        defaults: { ease: EASE_OUT },
        onComplete: () => {
          idle.play();
        },
      });

      tl.fromTo(
        words,
        { y: 0, yPercent: 110 },
        { y: 0, yPercent: 0, duration: 1.1, stagger: 0.04 },
        0.1
      )
        .fromTo(
          slide,
          { x: travel, rotateY: -12, opacity: 0 },
          { x: 0, rotateY: 0, opacity: 1, duration: 1.2 },
          0.25
        )
        .fromTo(shadow, { opacity: 0.15 }, { opacity: 1, duration: 1.2 }, 0.25)
        .to(meta, { opacity: 1, duration: 0.9, stagger: 0.05 }, 0.9);
    });

    // 2) Scroll-linked behaviour
    mm.add({ desktop: MQ.desktop, mobile: MQ.mobile }, (ctx) => {
      const isDesktop = Boolean(ctx.conditions?.desktop);
      const words = root.querySelectorAll(".hero-word");

      // Headline fades out word by word
      gsap.to(words, {
        y: -64,
        opacity: 0,
        ease: "none",
        stagger: 0.06,
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "60% top",
          scrub: true,
        },
      });

      if (isDesktop) {
        // Product moves at 0.6x scroll speed (so it drifts down 0.4x relative to the page),
        // scales up slightly and fades as the hero leaves.
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
        tl.to(parallax, { y: () => root.offsetHeight * 0.4, scale: 1.06, duration: 1 }, 0).to(
          parallax,
          { opacity: 0, duration: 0.5 },
          0.5
        );
      }
    });

    // 3) Cursor-follow tilt (desktop + fine pointer only)
    mm.add(`${MQ.desktop} and ${MQ.finePointer}`, () => {
      const rx = gsap.quickTo(tilt, "rotateX", { duration: 0.9, ease: EASE_OUT });
      const ry = gsap.quickTo(tilt, "rotateY", { duration: 0.9, ease: EASE_OUT });

      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        ry(nx * 10);
        rx(-ny * 7);
      };
      const onLeave = () => {
        rx(0);
        ry(0);
      };

      root.addEventListener("pointermove", onMove);
      root.addEventListener("pointerleave", onLeave);
      return () => {
        root.removeEventListener("pointermove", onMove);
        root.removeEventListener("pointerleave", onLeave);
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="top"
      ref={rootRef}
      aria-labelledby="hero-title"
      className="relative min-h-[100svh] overflow-x-clip px-6 pb-10 pt-28 md:px-10 lg:pb-12"
    >
      {/* Soft light behind the device so its shadow reads on the dark base */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_74%_48%,rgba(212,255,58,0.10),transparent_70%)]"
      />

      <div className="relative z-20 flex flex-col lg:min-h-[calc(100svh-10rem)] lg:justify-between">
        <p
          data-fade
          className="hero-meta flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-paper/60 md:text-sm"
        >
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" />
          {site.role}
        </p>

        <div className="mt-16 lg:mt-0 lg:max-w-[64vw]">
          <h1
            id="hero-title"
            className="font-display text-hero font-semibold"
            aria-label={site.name}
          >
            {site.nameLines.map((line) => (
              <span key={line} className="block" aria-hidden="true">
                <Words text={line} innerClass="hero-word" />
              </span>
            ))}
          </h1>
          <p className="mt-8 max-w-[22ch] font-display text-2xl leading-tight text-paper/80 md:text-4xl">
            <Words text={site.tagline} innerClass="hero-word" />
          </p>
        </div>

        <div
          data-fade
          className="hero-meta hidden items-end justify-between text-sm uppercase tracking-[0.2em] text-paper/60 lg:flex lg:max-w-[40vw]"
        >
          <span>{site.availability}</span>
          <span aria-hidden="true">Scroll ↓</span>
        </div>
      </div>

      {/* Product visual: stacked on mobile, overlapping on desktop */}
      <div className="relative z-10 mt-14 lg:absolute lg:right-[-6vw] lg:top-[14svh] lg:mt-0 lg:w-[58vw]">
        <div ref={parallaxRef} className="will-change-transform">
          <div ref={tiltRef}>
            <div ref={slideRef} data-fade className="relative">
              <div
                ref={shadowRef}
                data-fade
                aria-hidden="true"
                className="absolute inset-x-[6%] -bottom-8 h-24 rounded-[50%] bg-black blur-3xl"
              />
              <div ref={floatRef} className="relative">
                <Device />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** CSS laptop mockup. The screen image is /public/hero-product.png */
function Device() {
  const { image, width, height, alt } = site.hero;
  return (
    <div className="relative">
      <div className="rounded-[1.1rem] bg-[#161616] p-[1.8%] shadow-[0_0_0_1px_rgba(255,255,255,0.14),0_40px_80px_-20px_rgba(0,0,0,0.9)]">
        <div className="relative overflow-hidden rounded-[0.5rem] bg-ink" style={{ aspectRatio: `${width} / ${height}` }}>
          <Image
            src={image}
            alt={alt}
            fill
            priority
            sizes="(min-width: 1024px) 58vw, 92vw"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.10)_0%,transparent_38%)]"
          />
        </div>
      </div>
      <div
        aria-hidden="true"
        className="relative mx-[-4%] h-3 rounded-b-[1.2rem] bg-gradient-to-b from-[#3b3b3b] to-[#151515] md:h-4"
      >
        <div className="mx-auto h-1.5 w-[16%] rounded-b-md bg-[#0b0b0b]" />
      </div>
    </div>
  );
}
