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
      <aside className="lg:col-span-5 lg:py-6 relative z-0">
        <LeftSticky sections={sections} active={activeId} onNavClick={onNavClick} />
      </aside>

      <main
        ref={scrollRef}
        className="scrollport relative z-10 lg:col-span-7 lg:h-screen lg:min-h-0 lg:overflow-y-auto lg:pt-6 lg:pb-16 lg:pr-6 [scrollbar-gutter:stable]"
      >
        <div className="py-10 lg:py-0">
          {/* About */}
          <Section id="about" title="About">
            <p>
              I’m an experienced full-stack developer and marketing specialist with 6+ years of experience 
              programming scalable web-applications and driving measurable results through SEO, 
              analytics, and cross-functional collaboration. Skilled in modern JavaScript frameworks, 
              CMS platforms, and cloud hosting environments. Proven ability to translate complex technical and 
              marketing data into actionable business growth strategies. Adept at leading projects from concept to 
              deployment in client-facing environments.

            </p>
            <p className="mt-4">
              My primary focus is managing the development team at{" "}
              <a
                href="https://springerstudios.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white no-underline hover:underline"
              >
                Springer Studios
              </a>{" "}
              and contributing to the development of accessible, user-centric interfaces and digital experiences for our clients.
            </p>

            <p className="mt-4">
              In my spare time, I’m usually skiing in the rockies, or hanging somewhere in OBX. My home base is split between Wilmington and Raleigh, NC.
            </p>
          </Section>

          {/* Experience */}
          <Section
            id="experience"
            title="Experience"
            className={[
              "rounded-xl transition-colors",
              expHover ? "bg-transparent" : "bg-transparent",
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
              "Led development team, year to date, in the build and deployment of 20 websites and applications.",
              "Introduced a modern, headless CMS application stack into our client offerings.",
              "Build, style, and ship high-quality websites, mobile apps, and design systems.",
              "Spearhead company-wide accessibility initiatives such as creating documentation for best practices, establishing a standard accessibility checklist for developers, and facilitating knowledge shares to clients. ",
            ],
            href: "https://springerstudios.com", 
            external: true,                    
          },
          {
            role: "Web Developer",
            org: "Springer Studios",
            time: "2022 — 2025",
            bullets: [
              "Build, style, and ship high-quality websites, mobile apps, and design systems.",
              "Shipped wholesale ecommerce dashboard with daily order updates to multiple storefronts.",
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
        <Link href="/" className="link-underline text-sm font-medium text-copy no-underline">
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
                href="/archive"
                className="link-underline text-sm font-medium text-copy no-underline"
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





