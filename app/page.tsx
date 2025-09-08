"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import LeftSticky from "../components/LeftSticky";
import Section from "../components/Section";
import Timeline from "../components/Timeline";
import ProjectCard from "../components/ProjectCard"; // NEW
import { projects } from "../data/projects";         // NEW

export default function HomePage() {
  const sections = useMemo(
    () => [
      { id: "about", label: "About" },
      { id: "experience", label: "Experience" },
      { id: "projects", label: "Projects" }, // NEW
    ],
    []
  );

  const [active, setActive] = useState(sections[0].id);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { root, rootMargin: "0px 0px -60% 0px", threshold: [0.1, 0.25, 0.5] }
    );

    sections.forEach(({ id }) => {
      const el = root.querySelector<HTMLElement>(`#${id}`);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, [sections]);

  const onNavClick = (id: string) => {
    const root = scrollRef.current;
    const el = root?.querySelector<HTMLElement>(`#${id}`);
    if (root && el) root.scrollTo({ top: el.offsetTop - 16, behavior: "smooth" });
  };

  // Featured only for homepage
  const featured = projects.filter((p) => p.featured);

  return (
    <div className="mx-auto grid h-screen max-w-6xl grid-cols-1 gap-0 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8">
      <aside className="lg:col-span-5 lg:py-16">
        <LeftSticky sections={sections} active={active} onNavClick={onNavClick} />
      </aside>

      <main ref={scrollRef} className="lg:col-span-7 lg:h-screen lg:overflow-y-auto lg:py-16">
        <div className="py-10 lg:py-0">
          {/* About */}
          <Section id="about" title="About">
            <p>
              I’m a front-end engineer focusing on fast, accessible web apps. I enjoy React,
              TypeScript, and motion that adds meaning.
            </p>
            <p className="mt-4">
              I care about design systems, performance, and progressive enhancement.
            </p>
          </Section>

          {/* Experience */}
          <Section id="experience" title="Experience">
            <Timeline
              items={[
                {
                  role: "Senior Front-end Engineer",
                  org: "Acme Corp",
                  time: "2023 — Present",
                  bullets: [
                    "Rebuilt marketing site with Next.js; 95+ Core Web Vitals.",
                    "Authored component library used across product teams.",
                  ],
                },
                {
                  role: "Front-end Engineer",
                  org: "Startup XYZ",
                  time: "2021 — 2023",
                  bullets: [
                    "Introduced design system and a11y audits.",
                    "Shipped analytics dashboard with realtime data.",
                  ],
                },
              ]}
            />
          </Section>

          {/* Projects */}
          <Section
            id="projects"
            title="Featured Projects"
            subtitle="A few favorites—see the archive for more."
          >
            <div>
              {featured.map((proj) => (
                <ProjectCard key={proj.slug} project={proj} />
              ))}
            </div>

            <div className="mt-8">
              <a
                href="/archive"
                className="text-sm font-medium text-neutral-700 underline-offset-4 hover:underline dark:text-neutral-300"
              >
                View full project archive →
              </a>
            </div>
          </Section>
        </div>
      </main>
    </div>
  );
}


