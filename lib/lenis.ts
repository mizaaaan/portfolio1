import type Lenis from "lenis";

let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis() {
  return instance;
}

/** Scroll to a hash selector or the top, using Lenis when available. */
export function scrollToTarget(target: string | number, offset = 0) {
  if (typeof window === "undefined") return;
  if (instance) {
    instance.scrollTo(target, { offset, duration: 1.2 });
    return;
  }
  if (typeof target === "number") {
    window.scrollTo({ top: target });
    return;
  }
  document.querySelector(target)?.scrollIntoView();
}
