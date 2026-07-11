// app/page.tsx
"use client";

import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
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
  const activeId = active ?? sections[0].id;

  const onNavClick = (id: string) => {
    const root = scrollRef.current;
    const el = (root ?? document).querySelector<HTMLElement>(`#${id}`);
    if (!el) return;

    const isLg =
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 1024px)").matches;

    if (isLg && root) {
      el.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
      const rootTop = root.getBoundingClientRect().top;
      const elTop = el.getBoundingClientRect().top;
      const target = root.scrollTop + (elTop - rootTop);
      root.scrollTo({ top: Math.max(0, Math.round(target)), behavior: "smooth" });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    }

    (document.activeElement as HTMLElement | null)?.blur?.();
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
          <Section id="about" title="About">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.12,
                  },
                },
              }}
              className="space-y-4"
            >
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
              >
                As a full-stack engineer, I thrive working in a team to design, build, and optimize software solutions, web
                applications, automation workflows, and AI-powered solutions. I enjoy solving complex technical challenges and 
                finding innovative ways to improve efficiency, streamline operations, and deliver measurable business value.  My 
                background has equipped me with the skills to create secure, scalable, realiable systems that meet the needs of
                users while maitaining a high standard of code quality.
              </motion.p>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
              >
                My experience spans the entire development lifecycle from building UI components and backend APIs to integrating 
                cloud services, databases, and AI technologies into production-ready applications. I value collaborating with teams 
                and continually learning new technologies to stay at the forefront of software and application engineering.
              </motion.p>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                className="mt-0"
              >
                My primary focus is leading the engineering team at{" "}
                <a
                  href="https://springerstudios.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white no-underline hover:underline"
                >
                  Springer Studios
                </a>{" "}
                and contributing to the development of user-centric, intelligent systems.
              </motion.p>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                className="mt-0"
              >
                In my spare time, I enjoy traveling, skiing in the rockies, or hanging somewhere on the NC coast.
                My home base is currently Raleigh, NC.
              </motion.p>
            </motion.div>
          </Section>
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
                  role: "Full-Stack Engineer",
                  org: "Springer Studios",
                  time: "2022 — Present",
                  bullets: [
                    "Developed an internal analytics platform using TypeScript, React, Node.js, LLM APIs, Docker and CI/CD piplines to track LLM token usage and improve cost visibility and resources mamangement across engineering team.",
                    "Built an AI Chatbot using TypeScript, Python, LangGraph and ChromaDB RAG pipelines over internal documents to improve employee onboarding and SOP research.",
                    "Automated manual, labor-heavy business process with LLM APIs using Claude Code and Open AI Codex, replacing repetitive human steps and reducing turnaround time.",
                    "Build, style, and ship high-quality websites, mobile apps, and design systems.",
                    "Served as technical lead for client onboarding, implementations and training, gathered technical requirements from stakeholders and translated them to product managers, designers and other engineers.",
                    "Engineered an AI workspace desktop application using TypeScript, Python, SQL, HTML, CSS, integrated with Claude Code and Open AI Codex SDKs to organize code projects, agent sessions, manage orchestration, search session history, and resume past sessions in CLI.",
                  ],
                  href: "https://springerstudios.com",
                  external: true,
                },
                {
                  role: "Web Engineer",
                  org: "Datagroup Technologies",
                  time: "2019 — 2022",
                  bullets: [
                    "Shipped and maintained production code using JavaScript, HTML, CSS, TypeScript, React, PostgreSQL across client web applications, serving as a senior IC other engineers relied on for technical direction.",
                    "Diagnosed and resolved issues across AWS intances and client apps, owned QA and cross-browser/accessibility testing, and improved monitoring processes.",
                    "Collaborated directly with designers and stakeholders to gather requirements and deliver UI updates, feature enhancements, and CMS improvements.",
                    "Drove front-end architecture decisions across performance, accessibility (WCAG 2.1 AA).",
                  ],
                  href: "https://dtinetworks.com",
                  external: true,
                },
              ]}
            />

            <div className="mt-8">
              <Link
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-sm font-medium text-copy no-underline"
              >
                View full resume →
              </Link>
            </div>
          </Section>
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






