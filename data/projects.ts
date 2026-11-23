/**
 * SINGLE SOURCE OF CONTENT
 * Edit this file to change every word and image path on the site.
 * Images live in /public. Paths below start with "/" (relative to /public).
 */

export type NavLink = { label: string; href: string };
export type Social = { label: string; href: string; handle: string };

export type Project = {
  slug: string;
  title: string;
  role: string;
  year: string;
  category: string;
  href: string;
  image: string;
  imageAlt: string;
  /** Short looping preview (mp4/webm). Lazy-loaded on hover/focus. Optional. */
  video?: string;
};

export type CaseStep = {
  label: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
};

export type Capability = {
  title: string;
  description: string;
  tags: string[];
  image: string;
  imageAlt: string;
};

export type TimelineItem = {
  period: string;
  role: string;
  company: string;
  note: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export const site = {
  name: "Alex Morrow",
  /** Shown as two stacked words in the hero. */
  nameLines: ["Alex", "Morrow"],
  initials: "AM",
  role: "Product designer & creative developer",
  tagline: "Designing digital products that feel inevitable.",
  description:
    "Alex Morrow is a product designer and creative developer crafting cinematic, high-performance digital experiences.",
  url: "https://alexmorrow.com",
  email: "hello@alexmorrow.com",
  location: "London, UK",
  /** IANA time zone used for the footer clock. */
  timezone: "Europe/London",
  availability: "Booking projects for Q1 2027",
  year: "2026",
  hero: {
    /** Swap this file in /public to change the hero device screenshot. */
    image: "/hero-product.png",
    width: 1600,
    height: 1000,
    alt: "Screenshot of a featured product dashboard shown on a laptop",
  },
  nav: [
    { label: "Work", href: "#work" },
    { label: "Skills", href: "#capabilities" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ] as NavLink[],
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/", handle: "in/alexmorrow" },
    { label: "GitHub", href: "https://github.com/", handle: "@alexmorrow" },
    { label: "Dribbble", href: "https://dribbble.com/", handle: "@alexmorrow" },
    { label: "Instagram", href: "https://www.instagram.com/", handle: "@alex.morrow" },
  ] as Social[],
};

export const projects: Project[] = [
  {
    slug: "halcyon",
    title: "Halcyon",
    role: "Product design, Front-end",
    year: "2026",
    category: "Fintech",
    href: "#",
    image: "/images/project-1.webp",
    imageAlt: "Halcyon banking app interface on a deep green background",
    video: "/videos/project-1.mp4",
  },
  {
    slug: "northwind",
    title: "Northwind",
    role: "Art direction, Web",
    year: "2025",
    category: "Travel",
    href: "#",
    image: "/images/project-2.webp",
    imageAlt: "Northwind travel site hero in cool blue tones",
    video: "/videos/project-2.mp4",
  },
  {
    slug: "moda-labs",
    title: "Moda Labs",
    role: "Brand, Design system",
    year: "2025",
    category: "E-commerce",
    href: "#",
    image: "/images/project-3.webp",
    imageAlt: "Moda Labs storefront in warm orange tones",
    video: "/videos/project-3.mp4",
  },
  {
    slug: "pulse",
    title: "Pulse",
    role: "UX, Creative development",
    year: "2024",
    category: "Health",
    href: "#",
    image: "/images/project-4.webp",
    imageAlt: "Pulse health tracker interface in violet tones",
    video: "/videos/project-4.mp4",
  },
];

export const work = {
  eyebrow: "Selected work",
  title: "Selected Work",
  count: "(04)",
  hint: "Scroll",
};

export const caseStudy = {
  eyebrow: "Featured case study",
  title: "Halcyon",
  intro:
    "Rebuilding the way a million people look at their money, from first sign-up to daily habit.",
  meta: [
    { label: "Client", value: "Halcyon Bank" },
    { label: "Role", value: "Lead designer" },
    { label: "Year", value: "2026" },
  ],
  steps: [
    {
      label: "01 / Challenge",
      title: "Banking that felt like paperwork.",
      body: "Halcyon's app had every feature customers asked for and none of the clarity. Onboarding lost four in ten people before the first deposit, and support tickets were mostly people asking where things lived.",
      image: "/images/case-1.webp",
      imageAlt: "Before and after of the original Halcyon app on a dark background",
    },
    {
      label: "02 / Approach",
      title: "One question per screen.",
      body: "We interviewed sixty customers, mapped every task to a single question, and rebuilt the flows around it. Prototypes went into hands within two weeks, long before anything was pretty.",
      image: "/images/case-2.webp",
      imageAlt: "Prototype flow diagram in green and off-white",
    },
    {
      label: "03 / System",
      title: "A design system with a pulse.",
      body: "Tokens, components and motion rules shipped as one package, so design and engineering finally spoke the same language. Every interaction follows one easing curve and one rhythm.",
      image: "/images/case-3.webp",
      imageAlt: "Component library laid out as a grid of cards",
    },
    {
      label: "04 / Outcome",
      title: "Onboarding completion up 38%.",
      body: "Support volume fell by a third, app store rating climbed to 4.8, and the team now ships interface changes in days instead of quarters.",
      image: "/images/case-4.webp",
      imageAlt: "Final Halcyon interface shown across three phones",
    },
  ] as CaseStep[],
  cta: { label: "Read the full case study", href: "#" },
};

export const capabilities = {
  eyebrow: "Capabilities",
  title: "What I do",
  items: [
    {
      title: "Product design",
      description:
        "From research to shipped interface: flows, prototypes and the details that make software feel considered.",
      tags: ["Research", "UX", "Prototyping"],
      image: "/images/cap-1.webp",
      imageAlt: "Abstract composition representing product design",
    },
    {
      title: "Art direction",
      description:
        "A point of view for your brand, translated into type, colour, imagery and motion that hold together.",
      tags: ["Identity", "Campaign", "Direction"],
      image: "/images/cap-2.webp",
      imageAlt: "Abstract composition representing art direction",
    },
    {
      title: "Creative development",
      description:
        "Next.js, WebGL and scroll-driven storytelling built to run at 60fps on the devices people actually own.",
      tags: ["Next.js", "GSAP", "WebGL"],
      image: "/images/cap-3.webp",
      imageAlt: "Abstract composition representing creative development",
    },
    {
      title: "Motion design",
      description:
        "Interface choreography with intent: entrances, transitions and micro-interactions that guide rather than decorate.",
      tags: ["Interaction", "Transitions", "Lottie"],
      image: "/images/cap-4.webp",
      imageAlt: "Abstract composition representing motion design",
    },
    {
      title: "Design systems",
      description:
        "Tokens, components and documentation that let teams move fast without drifting off brand.",
      tags: ["Tokens", "Components", "Docs"],
      image: "/images/cap-5.webp",
      imageAlt: "Abstract composition representing design systems",
    },
  ] as Capability[],
};

export const about = {
  eyebrow: "About",
  title: "Hello, I'm Alex.",
  portrait: "/images/portrait.webp",
  portraitAlt: "Portrait of Alex Morrow",
  /** Each entry is revealed as one masked line, in order. */
  bio: [
    "I'm a designer who writes code, based in London.",
    "For ten years I've helped startups and global brands",
    "turn complicated ideas into interfaces people enjoy using.",
    "I care about craft, performance and restraint,",
    "and I believe the best motion is the kind you feel more than see.",
  ],
  timelineTitle: "Experience",
  timeline: [
    {
      period: "2023 — Now",
      role: "Independent designer & developer",
      company: "Studio Morrow",
      note: "Product and brand work for fintech, health and culture clients.",
    },
    {
      period: "2020 — 2023",
      role: "Senior product designer",
      company: "Northwind",
      note: "Led the redesign of the booking platform used in 40 countries.",
    },
    {
      period: "2017 — 2020",
      role: "Interaction designer",
      company: "Moda Labs",
      note: "Built the first design system and the motion language behind it.",
    },
    {
      period: "2015 — 2017",
      role: "Front-end developer",
      company: "Field & Co.",
      note: "Shipped campaign sites and learned how to make the web fast.",
    },
  ] as TimelineItem[],
};

export const testimonials = {
  eyebrow: "Kind words",
  items: [
    {
      quote: "Alex raised the bar for the whole team. The product finally feels as good as it works.",
      name: "Maya Okafor",
      role: "VP Product, Halcyon",
    },
    {
      quote: "Rare to find someone who designs the interaction and then ships it perfectly.",
      name: "Jonas Lindqvist",
      role: "CTO, Northwind",
    },
    {
      quote: "Every detail was considered. Our conversion rate noticed before we did.",
      name: "Priya Raman",
      role: "Head of Growth, Moda Labs",
    },
    {
      quote: "Calm, sharp and fast. The best collaborator we've had on a launch.",
      name: "Tom Hadley",
      role: "Founder, Pulse",
    },
    {
      quote: "He turned a vague brief into something we're proud to put our name on.",
      name: "Elena Rossi",
      role: "Creative Director, Field & Co.",
    },
    {
      quote: "Motion that actually means something. Users keep telling us the app feels alive.",
      name: "Sam Whitfield",
      role: "Design Lead, Halcyon",
    },
  ] as Testimonial[],
};

export const contact = {
  eyebrow: "Contact",
  title: "Let's make something worth remembering.",
  copyLabel: "Copy email",
  copiedMessage: "Email copied to clipboard",
};

export const footer = {
  backToTop: "Back to top",
  legal: `© ${site.year} ${site.name}. All rights reserved.`,
};
