// app/page.tsx
"use client";

import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion"; // 👈 add this
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
          {/* About */}
          <Section id="about" title="About">
            {/* parent controls the stagger */}
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
                I’m a full-stack developer and marketing specialist with 7+ years of experience
                building scalable web applications and websites. Skilled in modern JavaScript
                frameworks such as React and Nextjs, CMS platforms such as WordPress, Contentful and
                Storyblok, and cloud hosting environments such as AWS. I have a proven ability to
                translate technical and marketing data into actionable business growth strategies.
                I’m adept at leading development teams and managing projects from concept to
                deployment in client-facing environments.
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
                My primary focus is managing the development team at{" "}
                <a
                  href="https://springerstudios.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white no-underline hover:underline"
                >
                  Springer Studios
                </a>{" "}
                and contributing to the development of accessible, user-centric interfaces and
                digital experiences for our clients.
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
                In my spare time, I’m usually skiing in the rockies, or hanging somewhere in OBX.
                My home base is split between Wilmington and Raleigh, NC.
              </motion.p>
            </motion.div>
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
                    "Led the development team, year to date, in the deployment of 20 websites and applications.",
                    "Collaborate with product managers, designers, and other developers to transform concepts into production digital experiences at an agile (2-week) cadence.",
                    "Introduced a modern, headless CMS application stack into our client offerings.",
                    "Build, style, and ship high-quality websites, web-apps, ui components and design systems.",
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
                    "Led the development and architecture of technical tools like content management systems, REST APIs, plugins, UI components and CI/CD pipelines to fulfill business and stakeholder requirements.",
                    "Shipped wholesale ecommerce dashboard with dynamic customer order inputs for assigned products and daily order updates to POS systems at multiple storefronts.",
                  ],
                  href: "https://springerstudios.com",
                  external: true,
                },
                {
                  role: "Web Developer & Digital Marketing Specialist",
                  org: "HighClick Media",
                  time: "2019 — 2022",
                  bullets: [
                    "Developed, maintained and shipped production code for client websites primarily using WordPress CMS, HTML, CSS, PHP, and JavaScript.",
                    "Conducted competitive keyword research, technical SEO audits and internal linking strategies to increase organic search rankings for internal brand websites.",
                    "Managed multi-channel digital ad campaigns for internal brands and clients, leveraged Google Ads and SEMRush to optimize ad spend and maximize ROI.",
                    "Leveraged targeted ad campaigns, A/B testing, and custom developed landing pages to increase lead generation and conversions on internal websites.",
                  ],
                  href: "https://dtinetworks.com",
                  external: true,
                },
              ]}
            />

            <div className="mt-8">
              <Link
                href="/"
                className="link-underline text-sm font-medium text-copy no-underline"
              >
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






