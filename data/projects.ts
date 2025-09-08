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
    slug: "three-d-model-configurator",
    title: "BuiltRite Model Configurator",
    year: 2025,
    summary: "Configure your own storage unit model.",
    madeAt: "Springer Studios",
    builtWith: ["React", "Three.js", "TypeScript"],
    link: "https://built-rite-model-configurator-59t1.vercel.app",
    featured: true,
  },
  {
    slug: "builtrite-storage-systems-website",
    title: "BuiltRite Storage Systems Website",
    year: 2025,
    summary: "Built and deployed a new website for BuiltRite Storage Systems.",
    madeAt: "Springer Studios",
    builtWith: ["WordPress", "PHP", "JavaScript"],
    link: "https://builtritestoragesystems.com",
    featured: false,
  },
  {
    slug: "cvcc-website-redesign",
    title: "CVCC Website Redesign",
    year: 2025,
    summary:
      "Built and deployed a full site redesign for Catawba Valley Community College.",
    madeAt: "Springer Studios",
    builtWith: ["WordPress" ,"PHP", "JavaScript", "mySQL"],
    link: "https://cvcc.edu/programs-of-study/",
    featured: false, // will only show on Archive
  },
  {
    slug: "cvcc-program-filter",
    title: "CVCC Programs of Study Filter",
    year: 2025,
    summary:
      "UI system built to help CVCC students find specific programs of study.",
    madeAt: "Startup XYZ",
    builtWith: ["PHP", "JavaScript", "mySQL"],
    link: "https://cvcc.edu/programs-of-study/",
    featured: true, // will only show on Archive
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
    featured: true, // will only show on Archive
  },
];
