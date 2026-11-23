import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect } from "react";

let registered = false;

/** Register GSAP plugins once (client only). */
export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

/** One easing family across the whole site. */
export const EASE_OUT = "expo.out"; // entrances
export const EASE_IN_OUT = "power2.inOut"; // transitions
/** Same expo-out curve for Framer Motion / CSS. */
export const EXPO_OUT_BEZIER: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Media queries. Reduced-motion visitors match none of the animated queries. */
export const MQ = {
  desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  mobile: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
  anyMotion: "(prefers-reduced-motion: no-preference)",
  finePointer: "(hover: hover) and (pointer: fine)",
};

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export { gsap, ScrollTrigger };
