// data/projects.ts
export type Project = {
  slug: string;
  title: string;
  year?: number;
  summary?: string;
  madeAt?: string;
  builtWith?: string[];
  link?: string;          // optional external URL
  featured?: boolean;

  // NEW: fields for detail page
  description?: string[]; // paragraphs
  highlights?: string[];  // bullet list
  images?: { src: string; alt?: string; width?: number; height?: number }[];
};

export const projects: Project[] = [
  {
    slug: "site-redesign",
    title: "Company Website Redesign",
    year: 2025,
    summary:
      "Complete redesign with Next.js + Tailwind focused on performance and a11y.",
    madeAt: "Acme Corp",
    builtWith: ["Next.js", "TypeScript", "Tailwind"],
    link: "https://example.com",
    featured: true,
    description: [
    "Led a ground-up redesign focused on performance, accessibility, and maintainability.",
    "Built a modular component system and editorial workflow."
  ],
  highlights: [
    "95+ Core Web Vitals across pages",
    "Edge-rendered pages with fast TTFB",
    "Accessible components with testing"
  ],
  images: [{ src: "/images/redesign-hero.jpg", alt: "Homepage hero" }]
  },
  {
    slug: "analytics-dashboard",
    title: "Analytics Dashboard",
    year: 2024,
    summary: "Realtime charts, filters, and role-based access.",
    madeAt: "Startup XYZ",
    builtWith: ["React", "WebSockets", "Vite"],
    link: "https://example.com",
    featured: true,
  },
  {
    slug: "design-system",
    title: "Design System",
    year: 2023,
    summary:
      "Reusable components, design tokens, documentation adopted across teams.",
    madeAt: "Startup XYZ",
    builtWith: ["Storybook", "TypeScript"],
    link: "https://example.com",
    featured: false, // will only show on Archive
  },
];
