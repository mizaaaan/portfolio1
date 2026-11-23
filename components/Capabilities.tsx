"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { capabilities } from "@/data/projects";
import { EXPO_OUT_BEZIER } from "@/lib/motion";
import { FadeIn } from "./FadeIn";
import { TextReveal } from "./TextReveal";

/** Five skills. Hover (or focus / tap) expands a row and reveals its image. */
export function Capabilities() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      id="capabilities"
      aria-labelledby="cap-title"
      className="px-6 py-24 md:px-10 lg:py-40"
    >
      <header className="mb-16 grid grid-cols-12 gap-x-6 gap-y-6 lg:mb-24">
        <p className="col-span-12 text-sm uppercase tracking-[0.2em] text-paper/60">
          {capabilities.eyebrow}
        </p>
        <h2
          id="cap-title"
          className="col-span-12 font-display text-h2 font-semibold lg:col-span-9"
        >
          <TextReveal text={capabilities.title} />
        </h2>
      </header>

      <ul className="border-t border-paper/15" onPointerLeave={() => setActive(null)}>
        {capabilities.items.map((item, i) => {
          const open = active === i;
          return (
            <li
              key={item.title}
              className="relative border-b border-paper/15"
              onPointerEnter={(e) => {
                if (e.pointerType === "mouse") setActive(i);
              }}
            >
              <h3 className="m-0">
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`cap-panel-${i}`}
                  onClick={() => setActive(open ? null : i)}
                  onFocus={(e) => {
                    // Keyboard focus opens the row; mouse clicks are handled by onClick.
                    if (e.currentTarget.matches(":focus-visible")) setActive(i);
                  }}
                  className="grid w-full grid-cols-12 items-center gap-x-6 py-8 text-left lg:py-10"
                >
                  <span className="col-span-2 text-sm tabular-nums text-paper/60 lg:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`col-span-10 font-display text-[clamp(2rem,6vw,6rem)] font-semibold leading-none tracking-tight transition duration-700 ease-expo-out lg:col-span-7 ${
                      open ? "translate-x-4 text-accent" : ""
                    }`}
                  >
                    <TextReveal text={item.title} />
                  </span>
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {open ? (
                  <motion.div
                    id={`cap-panel-${i}`}
                    key="panel"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.8, ease: EXPO_OUT_BEZIER }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-12 gap-x-6 pb-10">
                      <div className="col-span-10 col-start-3 lg:col-span-6 lg:col-start-2">
                        <p className="max-w-[48ch] text-lg text-paper/70">{item.description}</p>
                        <ul className="mt-6 flex flex-wrap gap-2">
                          {item.tags.map((tag) => (
                            <li
                              key={tag}
                              className="rounded-full border border-paper/25 px-4 py-1 text-xs uppercase tracking-[0.14em] text-paper/70"
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>
                        {/* Small screens: image inside the panel */}
                        <div className="relative mt-8 aspect-[3/2] overflow-hidden lg:hidden">
                          <Image
                            src={item.image}
                            alt={item.imageAlt}
                            fill
                            sizes="80vw"
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              {/* Desktop: floating image on the right of the row */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 lg:block"
              >
                <AnimatePresence>
                  {open ? (
                    <motion.div
                      key="img"
                      initial={{ opacity: 0, scale: 0.92, x: 32 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.96, x: 16 }}
                      transition={{ duration: 0.8, ease: EXPO_OUT_BEZIER }}
                      className="relative aspect-[3/2] w-[22vw] max-w-[420px] overflow-hidden"
                    >
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        sizes="22vw"
                        className="object-cover"
                      />
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </li>
          );
        })}
      </ul>

      <FadeIn as="p" className="mt-8 text-sm text-paper/60 lg:hidden">
        Tap a skill to expand.
      </FadeIn>
    </section>
  );
}
