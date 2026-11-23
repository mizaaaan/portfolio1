"use client";

import type { MouseEvent } from "react";
import { site } from "@/data/projects";
import { scrollToTarget } from "@/lib/lenis";
import { Magnetic } from "./Magnetic";

/** Fixed minimal navigation. mix-blend-difference keeps it legible over any section. */
export function Nav() {
  const go = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToTarget(href === "#top" ? 0 : href);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 text-white mix-blend-difference">
      <nav
        aria-label="Primary"
        className="flex items-center justify-between px-6 py-6 md:px-10"
      >
        <Magnetic>
          <a
            href="#top"
            onClick={(e) => go(e, "#top")}
            aria-label={`${site.name}, back to top`}
            className="block font-display text-lg font-semibold tracking-tight"
          >
            {site.initials}
          </a>
        </Magnetic>
        <ul className="flex items-center gap-5 md:gap-10">
          {site.nav.map((item) => (
            <li key={item.href}>
              <Magnetic>
                <a
                  href={item.href}
                  onClick={(e) => go(e, item.href)}
                  className="link-underline block py-2 text-xs uppercase tracking-[0.18em] md:text-sm"
                >
                  {item.label}
                </a>
              </Magnetic>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
