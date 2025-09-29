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
    slug: "three-d-model-configurator",
    title: "BuiltRite Model Configurator",
    year: 2025,
    summary: "Built in React / TypeScript, this application leverages three.js to render a 3D storage facility model. The application allows users to customzie their own digital building and dynamically select from different textures that are mapped to different mesh layers.",
    madeAt: "Springer Studios",
    builtWith: ["React", "Three.js", "TypeScript", "JavaScript"],
    link: "https://built-rite-model-configurator-59t1.vercel.app",
    featured: true,
    description: [
    "Led a ground-up redesign focused on performance, accessibility, and maintainability.",
    "Built a modular component and template system."
  ],
  highlights: [
    "95+ Core Web Vitals across pages",
    "Edge-rendered pages with fast TTFB",
    "Accessible components with testing"
  ],
  images: [{ src: "/images/BuiltRite-Demo.png", alt: "BuiltRite Model" }]
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
    featured: false, 
  },
  { 
    slug: "project-management-app-2025", 
    title: "Project Management App", 
    year: 2025, 
    summary:
      "A project and task management for our internal teams to utilize and test.",
    madeAt: "Springer Studios", 
    builtWith: ["TypeScript", "JavaScript", "React", "PostgreSQL"], 
    link: "https://main.dp9uus28slxd2.amplifyapp.com/", 
    featured: false 
  },
  {
    slug: "cvcc-program-filter",
    title: "CVCC Programs of Study Filter",
    year: 2025,
    summary:
      "A UI component system built with PHP, JavaScript and ACF fields. The goal of this system was to help Catawba Valley Community College students find specific programs of study in as few clicks as possible. The secondary goal was to drive enrollment conversions by simplifying the process for locating programs offerings. We achieved these goals by building a UI system that included a predective search field and checkbox filters for school, area of interest, program type and mode of study. Our UI components have simplified the program search process for students and increased course enrollments by 109% this past semester.",
    madeAt: "Springer Studios",
    builtWith: ["PHP", "JavaScript", "mySQL"],
    link: "https://cvcc.edu/programs-of-study/",
    featured: true, 
    description: [
    "Led a ground-up redesign focused on performance, accessibility, and maintainability.",
    "Built a modular component and template system."
  ],
  highlights: [
    "95+ Core Web Vitals across pages",
    "Edge-rendered pages with fast TTFB",
    "Accessible components with testing"
  ],
  images: [{ src: "/images/Programs-Filter.png", alt: "CVCC Programs Filter" }]
  },
  {
    slug: "design-system",
    title: "Design System",
    year: 2023,
    summary:
      "Reusable components, design tokens, documentation adopted across teams.",
    madeAt: "Springer Studios",
    builtWith: ["Storybook", "TypeScript"],
    link: "https://example.com",
    featured: false, 
  },
  { 
    slug: "carteret-community-college", 
    title: "Carteret Community College", 
    year: 2024, 
    summary:
      "Built and deployed a full site redesign for Carteret Community College.",
    madeAt: "Springer Studios", 
    builtWith: ["WordPress", "PHP", "JavaScript"], 
    link: "https://carteret.edu/", 
    featured: false 
  },
  { 
    slug: "vance-granville-community-college", 
    title: "Vance-Granville Community College", 
    year: 2024, 
    summary:
      "Built and deployed a full site redesign for Vance Granville Community College.",
    madeAt: "Springer Studios", 
    builtWith: ["WordPress", "PHP", "JavaScript"], 
    link: "https://www.vgcc.edu", 
    featured: false 
  },
  { 
    slug: "personal-website-v2-2024", 
    title: "Personal Website V2", 
    year: 2024, 
    summary:
      "Version two of my dev portfolio site.",
    madeAt: "", 
    builtWith: ["React", "JavaScript", "Styled Components"], 
    link: "https://www.richardhaar.com/", 
    featured: false 
  },
  { 
    slug: "cooks-mill-whiskey", 
    title: "Cooks Mill Whiskey", 
    year: 2024, 
    summary:
      "Collaborated in the site design of Cooks Mill Whiskey using Webflow CMS.",
    madeAt: "Springer Studios", 
    builtWith: ["Webflow"], 
    link: "https://www.cooksmillwhiskey.com", 
    featured: false 
  },
  { 
    slug: "tenrecx", 
    title: "TenrecX", 
    year: 2024, 
    summary:
      "Collaborated in the site design of the Tenrecx site using Webflow CMS. Implemented GSAP animations.",
    madeAt: "Springer Studios", 
    builtWith: ["Webflow", "jQuery", "Lottie", "GSAP"], 
    link: "https://www.tenrecx.com", 
    featured: false 
  },
  { 
    slug: "essential-personnel", 
    title: "Essential Personnel", 
    year: 2024, 
    summary:
      "Full site redesign and CMS platform development using Webflow and integrating JavaScript animation libraries. Essential Personnell is a SaaS, performance development and safety/wellness, platform designed for the public sector. The platform and website were built with fire, law enforcement, EMS and the municipal government workforces in mind.",
    madeAt: "Springer Studios", 
    builtWith: ["Webflow", "jQuery", "SwiperJS"], 
    link: "https://www.essper.com", 
    featured: true,
    description: [
    "Led a ground-up redesign focused on performance, accessibility, and maintainability.",
    "Built a modular component and template system."
  ],
  highlights: [
    "95+ Core Web Vitals across pages",
    "Edge-rendered pages with fast TTFB",
    "Accessible components with testing"
  ],
  images: [{ src: "/images/essper.png", alt: "Essential Personnel Homepage" }]
  },
  { 
    slug: "springer-studios-redesign", 
    title: "Springer Studios Redesign", 
    year: 2024, 
    summary:
      "Collaborated on the site design and development of the new Springer Studios webiste. We pivoted from using WordPress CMS to using Webflow CMS.",
    madeAt: "Springer Studios", 
    builtWith: ["Webflow", "jQuery", "GSAP", "SwiperJS"], 
    link: "https://www.springerstudios.com", 
    featured: false 
  },
  { 
    slug: "infintegration", 
    title: "Infintegration", 
    year: 2024, 
    summary:
      "Built and deployed the Infintegration site.",
    madeAt: "Springer Studios", 
    builtWith: ["WordPress", "PHP", "jQuery", "SwiperJS"], 
    link: "https://infintegration.com/", 
    featured: false 
  },
  { 
    slug: "cameron-art-museum", 
    title: "Cameron Art Museum", 
    year: 2023, 
    summary:
      "Built and deployed a full redesign of the Cameron Art Museum site.",
    madeAt: "Springer Studios", 
    builtWith: ["WordPress", "PHP", "JavaScript"], 
    link: "https://cameronartmuseum.org", 
    featured: false 
  },
  { 
    slug: "iredell-ready", 
    title: "Iredell Ready", 
    year: 2023, 
    summary:
      "Built and deployed a new site for Iredell Ready. Iredell Ready was established in 2022 in partnership with industry, academia, government, and the nonprofit community to identify, align, and enhance strategic priorities across the workforce development pipeline from early childhood education to retirement.",
    madeAt: "Springer Studios", 
    builtWith: ["WordPress", "PHP", "JavaScript", "SwiperJS"], 
    link: "https://iredellready.com", 
    featured: false 
  },
  { 
    slug: "honeycutt-construction-services", 
    title: "Honeycutt Construction Services", 
    year: 2023, 
    summary:
      "Built and deployed a full redesign for Honeycutt Construction Services.",
    madeAt: "Springer Studios", 
    builtWith: ["WordPress", "PHP", "JavaScript"], 
    link: "https://honeycuttcorp.com", 
    featured: false 
  },
  { 
    slug: "southeastern-community-college", 
    title: "Southeastern Community College", 
    year: 2023, 
    summary:
      "Built and deployed a full wesbite redesign for Southeastern Community College.",
    madeAt: "Springer Studios", 
    builtWith: ["WordPress", "PHP", "JavaScript"], 
    link: "https://www.sccnc.edu", 
    featured: false 
  },
  {
    slug: "site-redesign",
    title: "Studsvik Website Redesign",
    year: 2023,
    summary:
      "Complete redesign with WordPress and PHP reusable templates.",
    madeAt: "Springer Studios",
    builtWith: ["WordPress", "PHP", "JavaScript"],
    link: "https://www.studsvik.com",
    featured: false,
    description: [
    "Led a ground-up redesign focused on performance, accessibility, and maintainability.",
    "Built a modular component and template system."
  ],
  highlights: [
    "95+ Core Web Vitals across pages",
    "Edge-rendered pages with fast TTFB",
    "Accessible components with testing"
  ],
  images: [{ src: "/images/Studsvik-2.png", alt: "Studsvik Homepage" }]
  },
  { 
    slug: "durham-charter", 
    title: "Durham Charter", 
    year: 2023, 
    summary:
      "Built and deployed a full redesign for Durham Charter School.",
    madeAt: "Springer Studios", 
    builtWith: ["WordPress", "PHP", "JavaScript"], 
    link: "https://www.durhamcharter.org", 
    featured: false 
  },
  { 
    slug: "bladen-community-college", 
    title: "Bladen Community College", 
    year: 2022, 
    summary:
      "Built and deployed a full redesign for Bladen Community College.",
    madeAt: "Springer Studios", 
    builtWith: ["WordPress", "PHP", "JavaScript", "mySQL"], 
    link: "https://www.bladencc.edu", 
    featured: false 
  },
  {
  slug: "james-sprunt-community-college",
  title: "James Sprunt Community College",
  year: 2022,
  summary:
    "Built and deployed a full redesign for James Sprunt Community College.",
  madeAt: "Springer Studios",
  builtWith: ["WordPress", "PHP", "JavaScript", "mySQL"],
  link: "https://jamessprunt.edu", 
  featured: false,
},
  { 
    slug: "cape-fear-community-college", 
    title: "Cape Fear Community College", 
    year: 2022, 
    summary:
      "Collaborated on an overhaul of the Programs of Study structure and Course Registration API.",
    madeAt: "Springer Studios", 
    builtWith: ["WordPress", "PHP", "JavaScript", "mySQL", "Rest API"], 
    link: "https://cfcc.edu/", 
    featured: false 
  },
  { 
    slug: "trask-land-company-2022", 
    title: "Trask Land Company", 
    year: 2022, 
    summary:
      "Built and deployed a full redesign for Trask Land Company.",
    madeAt: "Springer Studios", 
    builtWith: ["WordPress", "PHP"], 
    link: "https://trasklandco.com", 
    featured: false 
  },
  { 
    slug: "thomas-construction-group", 
    title: "Thomas Construction Group", 
    year: 2022, 
    summary:
      "Built and deployed a full redesign for Thomas Construction Company.",
    madeAt: "Springer Studios", 
    builtWith: ["WordPress", "PHP", "JavaScript"], 
    link: "https://thomasconstructiongroup.com", 
    featured: false 
  },
  { 
    slug: "mccord-contractors-inc", 
    title: "McCord Contractors Inc", 
    year: 2022, 
    summary:
      "Built and deployed a full redesign for McCord Contractors Inc.",
    madeAt: "HighClick Media", 
    builtWith: ["WordPress", "PHP"], 
    link: "https://mccordcontractors.com", 
    featured: false 
  },
  { 
    slug: "silvercare", 
    title: "SilverCare", 
    year: 2022, 
    madeAt: "HighClick Media", 
    summary:
      "Built and deployed a full redesign for Silvercare.",
    builtWith: ["WordPress", "PHP"], 
    link: "https://silvercareweb.com", 
    featured: false 
  },
  { 
    slug: "edge-dental-solutions", 
    title: "Edge Dental Solutions", 
    year: 2022, 
    summary:
      "Built and deployed a full redesign for Edge Dental Solutions.",
    madeAt: "HighClick Media", 
    builtWith: ["WordPress", "PHP"], 
    link: "https://edgedentalsolutions.com", 
    featured: false 
  },
  { 
    slug: "td-goodwin", 
    title: "TD Goodwin", 
    year: 2021, 
    summary:
      "Built and deployed a full redesign for TD Goodwin Construction.",
    madeAt: "HighClick Media", 
    builtWith: ["WordPress", "PHP"], 
    link: "https://www.tdgoodwin.com", 
    featured: false 
  },
  { 
    slug: "encounterworks-ehr", 
    title: "EncounterWorks EHR", 
    year: 2020, 
    summary:
      "Built and deployed a site for EncounterWorks EHR.",
    madeAt: "HighClick Media", 
    builtWith: ["WordPress", "PHP"], 
    link: "https://encounterworks.com/", 
    featured: false 
  },
  { 
    slug: "hidden-talents-2018", 
    title: "Hidden Talents", 
    year: 2018, 
    madeAt: "UNC Coding Bootcamp", 
    builtWith: ["React", "JavaScript", "Node.js"], 
    link: "https://github.com/itsrichardhaar/Hidden-Talents", 
    featured: false 
  },
  { 
    slug: "know-your-vote-2018", 
    title: "Know Your Vote", 
    year: 2018, 
    madeAt: "UNC Coding Bootcamp", 
    builtWith: ["React", "JavaScript", "Node.js"], 
    link: "https://github.com/merinogeospatial/know-your-vote", 
    featured: false 
  },
  { 
    slug: "hijack-2018", 
    title: "HiJack", 
    year: 2018, 
    madeAt: "UNC Coding Bootcamp", 
    builtWith: ["React", "JavaScript", "Node.js"], 
    link: "https://github.com/itsrichardhaar/HiJack/tree/master/Alice", 
    featured: false 
  },
  { 
    slug: "trivia-game-2018", 
    title: "Trivia Game", 
    year: 2018, 
    madeAt: "UNC Coding Bootcamp", 
    builtWith: ["JavaScript"], 
    link: "https://github.com/itsrichardhaar/Homework-5/", 
    featured: false 
  },
  { 
    slug: "bamazon-app-2018", 
    title: "Bamazon App", 
    year: 2018, 
    madeAt: "UNC Coding Bootcamp", 
    builtWith: ["Node.js"], 
    link: "https://github.com/itsrichardhaar/bamazon-app", 
    featured: false 
  },
  { 
    slug: "liri-node-app-2018", 
    title: "Liri Node App", 
    year: 2018, 
    madeAt: "UNC Coding Bootcamp", 
    builtWith: ["Node.js"], 
    link: "https://github.com/itsrichardhaar/liri-node-app", 
    featured: false 
  },
  { 
    slug: "mongo-scraper-2018", 
    title: "Mongo Scraper", 
    year: 2018, 
    madeAt: "UNC Coding Bootcamp", 
    builtWith: ["JavaScript"], 
    link: "https://github.com/itsrichardhaar/mongo-scraper", 
    featured: false 
  },
];
