import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { site } from "@/data/projects";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/Cursor";
import { Nav } from "@/components/Nav";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} — ${site.role}`,
  description: site.description,
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  colorScheme: "dark",
};

/**
 * Adds the "motion" class before first paint unless the visitor prefers
 * reduced motion. CSS uses it to set the hidden start state for reveals, so
 * reduced-motion and no-JS visitors always see content in its final state.
 */
const motionClassScript = `try{if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('motion')}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionClassScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only-focusable fixed left-6 top-6 z-[90] rounded-full bg-accent px-5 py-3 text-sm font-medium text-ink"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <Cursor />
        <Nav />
        {children}
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
