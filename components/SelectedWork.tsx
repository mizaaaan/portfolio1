"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { projects, work, type Project } from "@/data/projects";
import { MQ, gsap, registerGsap } from "@/lib/motion";
import { TextReveal } from "./TextReveal";

export function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const section = sectionRef.current;
    const track = trackRef.current;
    const bar = barRef.current;
    if (!section || !track || !bar) return;

    const mm = gsap.matchMedia();

    // Desktop: pin the section and scroll the track horizontally.
    mm.add(MQ.desktop, () => {
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      tl.to(track, { x: () => -distance() }, 0).fromTo(bar, { scaleX: 0 }, { scaleX: 1 }, 0);
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      aria-labelledby="work-title"
      className="work-section relative lg:h-screen lg:overflow-hidden"
    >
      <div className="work-inner flex flex-col py-24 lg:h-full lg:justify-center lg:py-0">
        <header className="mb-12 flex items-end justify-between px-6 md:px-10 lg:mb-8">
          <h2 id="work-title" className="font-display text-h2 font-semibold">
            <TextReveal text={work.title} />
          </h2>
          <span aria-hidden="true" className="pb-2 font-display text-xl text-paper/60 md:text-3xl">
            {work.count}
          </span>
        </header>

        <div
          ref={trackRef}
          className="work-track flex flex-col gap-16 px-6 will-change-transform md:px-10 lg:w-max lg:flex-row lg:gap-10 lg:pr-[10vw]"
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        <div
          aria-hidden="true"
          className="work-bar mx-6 mt-10 hidden h-px bg-paper/15 md:mx-10 lg:block"
        >
          <div ref={barRef} className="h-full origin-left bg-accent" style={{ transform: "scaleX(0)" }} />
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [armed, setArmed] = useState(false); // video src is attached on first intent
  const [hover, setHover] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !armed) return;
    if (hover) {
      v.play().catch(() => undefined);
    } else {
      v.pause();
    }
  }, [armed, hover]);

  const engage = () => {
    if (!project.video || failed) return;
    setArmed(true);
    setHover(true);
  };
  const release = () => setHover(false);

  return (
    <article className="work-card shrink-0 lg:w-[min(44vw,calc((100svh_-_20rem)*1.3333))] lg:min-w-[22rem]">
      <a
        href={project.href}
        data-cursor
        className="group block"
        onMouseEnter={engage}
        onMouseLeave={release}
        onFocus={engage}
        onBlur={release}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-[#141414]">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            sizes="(min-width: 1024px) 44vw, 92vw"
            className="object-cover transition-transform duration-[1200ms] ease-expo-out group-hover:scale-105 group-focus-visible:scale-105"
          />
          {project.video && !failed ? (
            <video
              ref={videoRef}
              src={armed ? project.video : undefined}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden="true"
              tabIndex={-1}
              onError={() => setFailed(true)}
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 ease-expo-out group-hover:opacity-100 group-focus-visible:opacity-100"
            />
          ) : null}
          <span
            aria-hidden="true"
            className="absolute bottom-4 left-4 translate-y-2 rounded-full bg-accent px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-ink opacity-0 transition duration-700 ease-expo-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
          >
            View project
          </span>
        </div>

        <div className="mt-6 flex items-start justify-between gap-6">
          <div>
            <h3 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              <span className="mr-3 text-base font-normal text-paper/60">
                {String(index + 1).padStart(2, "0")}
              </span>
              {project.title}
            </h3>
            <p className="mt-2 text-paper/60">{project.role}</p>
          </div>
          <p className="pt-2 text-sm uppercase tracking-[0.16em] text-paper/60">
            {project.category} · {project.year}
          </p>
        </div>
      </a>
    </article>
  );
}
