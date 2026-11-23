"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { contact, site } from "@/data/projects";
import { EXPO_OUT_BEZIER } from "@/lib/motion";
import { FadeIn } from "./FadeIn";
import { Magnetic } from "./Magnetic";
import { TextReveal } from "./TextReveal";

export function Contact() {
  const [toast, setToast] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
    } catch {
      // Fallback for browsers / contexts without the async clipboard API.
      const area = document.createElement("textarea");
      area.value = site.email;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      try {
        document.execCommand("copy");
      } catch {
        /* nothing more we can do */
      }
      document.body.removeChild(area);
    }
    setToast(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(false), 2400);
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="px-6 pb-16 pt-24 md:px-10 lg:pb-24 lg:pt-40"
    >
      <p className="text-sm uppercase tracking-[0.2em] text-paper/60">{contact.eyebrow}</p>
      <h2
        id="contact-title"
        className="mt-6 max-w-[16ch] font-display text-[clamp(2rem,5vw,5rem)] font-semibold leading-[0.98] tracking-tight"
      >
        <TextReveal text={contact.title} />
      </h2>

      <FadeIn className="mt-16 lg:mt-24">
        <a
          href={`mailto:${site.email}`}
          className="link-underline font-display text-[clamp(1.5rem,7vw,8.5rem)] font-semibold leading-none tracking-tight [overflow-wrap:anywhere]"
        >
          {site.email}
        </a>
      </FadeIn>

      <FadeIn delay={0.05} className="mt-10 flex flex-wrap items-center gap-4">
        <Magnetic>
          <button
            type="button"
            onClick={copyEmail}
            className="rounded-full border border-paper/30 px-6 py-3 text-sm uppercase tracking-[0.16em] transition-colors duration-700 ease-expo-out hover:bg-accent hover:text-ink"
          >
            {contact.copyLabel}
          </button>
        </Magnetic>
        <p className="text-sm text-paper/60">{site.availability}</p>
      </FadeIn>

      <FadeIn as="ul" delay={0.1} className="mt-20 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-paper/15 pt-8 md:grid-cols-4">
        {site.socials.map((s) => (
          <li key={s.label}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <span className="link-underline font-display text-xl tracking-tight">
                {s.label} ↗
              </span>
              <span className="mt-1 block text-sm text-paper/60">{s.handle}</span>
            </a>
          </li>
        ))}
      </FadeIn>

      {/* Live region is always mounted so screen readers announce the toast. */}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-8 z-[75] flex justify-center px-6"
      >
        <AnimatePresence>
          {toast ? (
            <motion.p
              key="toast"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.6, ease: EXPO_OUT_BEZIER }}
              className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-ink shadow-lg"
            >
              {contact.copiedMessage}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
