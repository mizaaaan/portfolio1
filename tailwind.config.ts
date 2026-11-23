import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0A",
        paper: "#F2F0EB",
        accent: "#D4FF3A",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Display scale: 8–12vw headline range, clamped for very large screens.
        hero: ["clamp(3.5rem, 11vw, 12rem)", { lineHeight: "0.88", letterSpacing: "-0.04em" }],
        mega: ["clamp(2.25rem, 8vw, 9rem)", { lineHeight: "0.95", letterSpacing: "-0.035em" }],
        h2: ["clamp(2.5rem, 8vw, 8rem)", { lineHeight: "0.92", letterSpacing: "-0.035em" }],
      },
      transitionTimingFunction: {
        "expo-out": "cubic-bezier(0.16, 1, 0.3, 1)",
        "power2-in-out": "cubic-bezier(0.45, 0, 0.55, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
