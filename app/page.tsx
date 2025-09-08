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
    <div className="mx-auto grid lg:h-screen max-w-6xl grid-cols-1 gap-0 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:overflow-hidden">
      <aside className="lg:col-span-5 lg:py-16">
        <LeftSticky sections={sections} active={active} onNavClick={onNavClick} />
      </aside>

      <main ref={scrollRef} className="scrollport relative lg:col-span-7 lg:h-screen lg:min-h-0 lg:overflow-y-auto lg:py-16 lg:pr-6 [scrollbar-gutter:stable]">
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
          <Section id="experience" title="Experience">
            <Timeline
              items={[
                {
                  role: "Senior Web Developer",
                  org: "Springer Studios",
                  time: "2025 — Present",
                  bullets: [
                    "Rebuilt marketing site with Next.js; 95+ Core Web Vitals.",
                    "Authored component library used across product teams.",
                  ],
                },
                {
                  role: "Web Developer",
                  org: "Springer Studios",
                  time: "2022 — 2025",
                  bullets: [
                    "Introduced design system and a11y audits.",
                    "Shipped analytics dashboard with realtime data.",
                  ],
                },
                {
                  role: "Web Developer & Digital Marketing Specialist",
                  org: "HighClick Media",
                  time: "2019 — 2022",
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
            <div className="not-prose">
              {featured.map((proj) => (
                <ProjectCard key={proj.slug} project={proj} />
              ))}
            </div>

            <div className="mt-8">
              <a
                href="/archive"
                className="text-sm font-medium text-copy"
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


