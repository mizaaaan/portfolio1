# Portfolio 2026

A cinematic, animation-driven portfolio built with **Next.js (App Router)**, **React**, **TypeScript**, **Tailwind CSS**, **GSAP + ScrollTrigger**, **Framer Motion** and **Lenis**. Deploys to Cloudflare Pages (or Vercel/Netlify) with no paid services.

## Setup

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # optional: tsc --noEmit
```

Requires Node 18.18+ (Node 20+ recommended). Fonts (Space Grotesk, Inter) are fetched by `next/font` at build time, so the first build needs internet access.

### Deploy: GitHub → Cloudflare Pages (free)

The site is configured as a static export (`output: "export"` in `next.config.mjs`), so Cloudflare just serves the built `out/` folder.

1. Upload this folder to a new GitHub repository (the `.gitignore` already excludes `node_modules` and `.next`).
2. In Cloudflare: **Workers & Pages → Create → Pages → Connect to Git**, pick the repo.
3. Build settings:
   - Framework preset: **Next.js (Static HTML Export)** or "None"
   - Build command: `npm run build`
   - Build output directory: `out`
   - Environment variable (only if the build uses the wrong Node version): `NODE_VERSION` = `20` (a `.node-version` file is already included)
4. **Save and Deploy.** Every push to `main` redeploys automatically.
5. Custom domain: Pages project → **Custom domains**.

Because images are served as-is (no Next image optimizer on Cloudflare), keep your replacement images compressed: WebP/AVIF, roughly under 300 KB each. `public/_headers` already sets long-term caching for images, videos and JS.

Also works on Vercel/Netlify unchanged.

## What to replace

All content lives in **one file: `data/projects.ts`**.

| What | Where |
| --- | --- |
| Your name, initials, role, tagline | `site.name`, `site.nameLines`, `site.initials`, `site.role`, `site.tagline` |
| Email, location, time zone (footer clock), availability | `site.email`, `site.location`, `site.timezone` (IANA name, e.g. `America/New_York`), `site.availability` |
| Site URL and SEO description | `site.url`, `site.description` |
| Social links | `site.socials` |
| **Hero device screenshot** | Replace `/public/hero-product.png` (keep ~16:10, e.g. 1600×1000). If the ratio differs, update `site.hero.width/height/alt`. |
| 4 Selected Work projects | `projects` (title, role, year, category, link, image, optional video) |
| Project images | `/public/images/project-1.webp` … `project-4.webp` (4:3, about 1200×900) |
| Project hover previews | `/public/videos/project-1.mp4` … `project-4.mp4` (short, muted, looping, under ~1 MB). Remove the `video` field from a project to disable it. GIFs are not used; MP4/WebM is far lighter. |
| Case study copy and images | `caseStudy` and `/public/images/case-1.webp` … `case-4.webp` (4:5, about 1400×1750) |
| 5 capabilities | `capabilities.items` and `/public/images/cap-1.webp` … `cap-5.webp` (3:2, about 1200×800) |
| Bio, portrait, experience timeline | `about` and `/public/images/portrait.webp` (4:5, about 1200×1500). Each `about.bio` entry is revealed as one line. |
| Testimonials | `testimonials.items` |
| Contact heading and toast text | `contact` |

Every placeholder image is stamped "PLACEHOLDER" so you can spot what is still unreplaced.

Colours and fonts: `tailwind.config.ts` (`ink`, `paper`, `accent`) and `app/layout.tsx` (fonts). The accent is `#D4FF3A`; change it in `tailwind.config.ts`, and the `212,255,58` RGB values in `app/globals.css` and `components/Hero.tsx` if you want the glows to match.

## Project structure

```
app/
  layout.tsx          fonts, metadata, motion class script, global components
  template.tsx        Framer Motion page transition (client navigations)
  page.tsx            section order
  globals.css         design tokens, grain, masks, marquee, reduced-motion rules
components/
  SmoothScroll.tsx    Lenis + GSAP ticker + ScrollTrigger bridge
  Cursor.tsx          custom cursor (fine pointers only)
  Magnetic.tsx        magnetic hover wrapper
  Nav.tsx             fixed blend-mode navigation
  Hero.tsx            headline, laptop mockup, slide-in, parallax, tilt, float
  SelectedWork.tsx    pinned horizontal gallery + hover video previews
  CaseStudy.tsx       sticky split layout
  Capabilities.tsx    expanding rows with image reveal
  About.tsx           portrait, line reveal, timeline
  Testimonials.tsx    CSS marquee
  Contact.tsx         email link, copy button, toast, socials
  Footer.tsx          local time, back to top
  TextReveal.tsx      masked word / line reveals
  FadeIn.tsx          fade-and-rise on scroll
  Words.tsx           word-mask markup helper
data/projects.ts      ALL content
lib/motion.ts         GSAP registration, easing, media queries
lib/lenis.ts          shared Lenis instance + scrollToTarget
public/               placeholder images and videos
```

## Motion rules (so edits stay consistent)

- Entrances use `expo.out`; transitions use `power2.inOut` (`EASE_OUT` / `EASE_IN_OUT` in `lib/motion.ts`). Durations stay between 0.6s and 1.2s; word and line staggers are 0.04–0.05s.
- Only `transform` and `opacity` are animated by GSAP. The one exception is the capabilities panel, which Framer Motion expands by height.
- Reduced motion: when `prefers-reduced-motion: reduce` is set, Lenis, parallax, slide-ins, reveals and the marquee are all off and content shows in its final state. The gallery becomes a plain grid and the marquee a swipeable row.
- Every GSAP animation is created inside `gsap.matchMedia()` and reverted on unmount; Lenis is destroyed on unmount.

## Behaviour notes

- **Mobile:** the hero device stacks below the headline, and the horizontal gallery becomes a vertical list of cards (the pinned scroll runs on screens 1024px and wider).
- **Custom cursor and tilt:** only on devices with a mouse (`hover: hover` and `pointer: fine`).
- **Video previews** load only on first hover or focus (`preload="none"`), so they cost nothing until used.
