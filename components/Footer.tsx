"use client";

import { useEffect, useState } from "react";
import { footer, site } from "@/data/projects";
import { scrollToTarget } from "@/lib/lenis";
import { Magnetic } from "./Magnetic";

function formatTime(zone: string) {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: zone,
      timeZoneName: "short",
    }).format(new Date());
  } catch {
    return "";
  }
}

export function Footer() {
  // Empty on the server and first client render to avoid hydration mismatch.
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => setTime(formatTime(site.timezone));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="border-t border-paper/15 px-6 py-8 md:px-10">
      <div className="grid grid-cols-1 items-center gap-6 text-sm text-paper/60 md:grid-cols-3">
        <p>{footer.legal}</p>
        <p className="md:text-center">
          {site.location} ·{" "}
          <time aria-label="Local time" className="tabular-nums text-paper">
            {time || "--:--"}
          </time>
        </p>
        <div className="md:text-right">
          <Magnetic>
            <button
              type="button"
              onClick={() => scrollToTarget(0)}
              className="link-underline py-2 uppercase tracking-[0.16em] text-paper"
            >
              {footer.backToTop} ↑
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
