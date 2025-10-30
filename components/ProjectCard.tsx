// components/ProjectCard.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { memo } from "react";
import type { Project } from "@/data/projects";

type WrapperProps = {
  href?: string | null;
  external?: string | null;
  children: React.ReactNode;
};

function CardLinkWrapper({ href, external, children }: WrapperProps) {
  if (href) {
    return (
      <Link href={href} className="block w-full no-underline">
        {children}
      </Link>
    );
  }
  if (external) {
    return (
      <a
        href={external}
        target="_blank"
        rel="noreferrer"
        className="block w-full no-underline"
      >
        {children}
      </a>
    );
  }
  return <div className="block w-full">{children}</div>;
}

function ProjectCardImpl({ project }: { project: Project }) {
  const internalHref =
    project.slug && !project.link ? `/projects/${project.slug}` : null;
  const externalHref = project.link ?? null;
  const thumb = project.images?.[0];

  return (
    <CardLinkWrapper href={internalHref} external={externalHref}>
      <article
        className={[
          // layout & spacing
          "group rounded-xl border border-border/80 px-5 pt-5 pb-5 first:border-0",
          // compositing & paint-friendly hover
          "transition-colors duration-200",
          "hover:bg-[rgba(45,212,191,0.1)]",
          "hover:border-neutral-300 dark:hover:border-neutral-700",
        ].join(" ")}
      >
        {/* 👇 stack on mobile, row on sm+ */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          {/* Thumbnail */}
          <div
            className={[
              "relative overflow-hidden rounded-lg border border-border/60",
              // fixed boxes
              "h-40 w-full sm:h-24 sm:w-32 md:h-28 md:w-36",
              "shrink-0",
              // promote
              "transform-gpu will-change-transform [backface-visibility:hidden]",
              "[transform:translateZ(0)]",
            ].join(" ")}
          >
            {thumb ? (
              <Image
                src={thumb.src}
                alt={thumb.alt ?? project.title}
                fill
                sizes="(min-width: 1024px) 12rem, 9rem"
                priority={false}
                placeholder="empty"
                decoding="async"
                className="object-cover select-none"
                draggable={false}
              />
            ) : (
              <div className="h-full w-full bg-white/5" />
            )}
          </div>

          {/* Text side */}
          <div className="min-w-0 flex-1">
            <header className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <h3 className="truncate text-[1.05rem] font-semibold tracking-tight text-copy">
                {project.title}
              </h3>
              {project.year ? (
                <span className="text-sm text-copy/80 sm:mt-0">
                  {project.year}
                </span>
              ) : null}
            </header>

            {project.summary && (
              <p className="mt-1.5 md:mr-10 text-[0.95rem] leading-6">
                {project.summary}
              </p>
            )}

            {project.builtWith?.length ? (
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.builtWith.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-[rgba(45,212,191,0.25)] bg-[rgba(45,212,191,0.1)] px-2.5 py-1 text-[11px] leading-none text-[rgb(94,234,212)]"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </article>
    </CardLinkWrapper>
  );
}

export default memo(ProjectCardImpl);





