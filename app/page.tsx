// app/page.tsx
"use client";

import { useMemo, useRef, useState } from "react";
import LeftSticky from "../components/LeftSticky";
import Section from "../components/Section";
import Timeline from "../components/Timeline";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";
import useScrollSpy from "../components/useScrollSpy";
import Link from "next/link";

export default function HomePage() {
  const [expHover, setExpHover] = useState(false);
  const sections = useMemo(
    () => [
      { id: "about", label: "About" },
      { id: "experience", label: "Experience" },
      { id: "projects", label: "Projects" },
    ],
    []
  );

  const scrollRef = useRef<HTMLElement | null>(null);
  const { active } = useScrollSpy(scrollRef, sections);
  const activeId = active ?? sections[0].id; // <-- remove non-null assertion

  const onNavClick = (id: string) => {
    const root = scrollRef.current;
    const el = root?.querySelector<HTMLElement>(`#${id}`);
    if (!root || !el) return;
    const rootTop = root.getBoundingClientRect().top;
    const elTop = el.getBoundingClientRect().top;
    const target = root.scrollTop + (elTop - rootTop) - 16;
    root.scrollTo({ top: Math.max(0, Math.round(target)), behavior: "smooth" });
  };

  const featured = projects.filter((p) => p.featured);

  return (
    <div className="mx-auto grid lg:h-screen max-w-6xl grid-cols-1 gap-0 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:overflow-hidden">
      <aside className="lg:col-span-5 lg:py-16 relative z-0">
        <LeftSticky sections={sections} active={activeId} onNavClick={onNavClick} />
      </aside>

      <main
        ref={scrollRef}
        className="scrollport relative z-10 lg:col-span-7 lg:h-screen lg:min-h-0 lg:overflow-y-auto lg:py-16 lg:pr-6 [scrollbar-gutter:stable]"
      >
        <div className="py-10 lg:py-0">
          {/* About */}
          <Section id="about" title="About">
            <p>
              I’m a senior web developer and marketing analyst with 6 years of experience 
              in web application programming, digital marketing and brand development. 
              I excel in cross-functional collaboration to provide innovative, high-quality products and services. 
              My unique blend of technical expertise and analytical marketing insight enables me to enhance user-experience, 
              optimize performance, and drive business growth across multi-channel marketing strategies and campaigns.
            </p>
            <p className="mt-4">
              I care about design systems, performance, and progressive enhancement.
            </p>
          </Section>

          {/* Experience */}
          <Section
            id="experience"
            title="Experience"
            className={[
              "rounded-xl transition-colors",
              expHover ? "bg-neutral-50 dark:bg-neutral-900/40" : "bg-transparent",
            ].join(" ")}
          >
      <Timeline
        onItemHover={setExpHover}
        items={[
          {
            role: "Senior Web Developer",
            org: "Springer Studios",
            time: "2025 — Present",
            bullets: [
              "Rebuilt marketing site with Next.js; 95+ Core Web Vitals.",
              "Authored component library used across product teams.",
            ],
            href: "https://springerstudios.com", 
            external: true,                    
          },
          {
            role: "Web Developer",
            org: "Springer Studios",
            time: "2022 — 2025",
            bullets: [
              "Introduced design system and a11y audits.",
              "Shipped analytics dashboard with realtime data.",
            ],
            href: "https://springerstudios.com", 
            external: true,  
          },
          {
            role: "Developer & Digital Marketing Specialist",
            org: "HighClick Media",
            time: "2019 — 2022",
            bullets: [
              "Introduced design system and a11y audits.",
              "Shipped analytics dashboard with realtime data.",
            ],
            href: "https://dtinetworks.com", 
            external: true,  
          },
        ]}
      />

      <div className="mt-8">
        <Link href="/" className="text-sm font-medium text-copy">
          View full resume →
        </Link>
      </div>
    </Section>

          {/* Projects */}
          <Section
            id="projects"
            title="Featured Projects"
            subtitle="A few favorites—see the archive for more."
          >
            <div className="not-prose">
              {featured.map((proj) => (
                <ProjectCard key={proj.slug} project={proj} />
              ))}
            </div>

            <div className="mt-8">
              <Link
                href="/"
                className="text-sm font-medium text-copy"
              >
              View full project archive →
              </Link>
            </div>
          </Section>
        </div>
      </main>
    </div>
  );
}





