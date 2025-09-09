// components/ProjectCard.tsx
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
          "group rounded-xl border border-border/80 pr-5 pl-0 pt-5 pb-5 first:border-0",
          // compositing & paint-friendly hover
          "transition-colors duration-200",
          "hover:bg-neutral-50/60 dark:hover:bg-neutral-900/40",
          "hover:border-neutral-300 dark:hover:border-neutral-700",
        ].join(" ")}
      >
        <div className="flex items-start gap-4">
          {/* Thumbnail (own layer, no layout shift) */}
          <div
            className={[
              "relative shrink-0 overflow-hidden rounded-lg border border-border/60",
              // fixed box prevents CLS
              "h-20 w-28 sm:h-28 sm:w-36",
              // promote to separate layer so parent repaints don’t flash the image
              "transform-gpu will-change-transform [backface-visibility:hidden]",
              // ensure smoother scaling on some GPUs
              "[transform:translateZ(0)]",
            ].join(" ")}
          >
            {thumb ? (
              <Image
                src={thumb.src}
                alt={thumb.alt ?? project.title}
                fill
                sizes="(min-width: 1024px) 12rem, 9rem"
                // user-perceived stability
                priority={false}
                placeholder="empty" // switch to 'blur' if you add blurDataURL
                // performance hints
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
            <header className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="truncate text-[1.05rem] font-semibold tracking-tight text-heading">
                {project.title}
              </h3>
              {project.year ? (
                <span className="mt-1 text-sm text-copy/80 sm:mt-0">
                  {project.year}
                </span>
              ) : null}
            </header>

            {project.summary && (
              <p className="mt-1.5 mr-10 text-[0.95rem] leading-6">
                {project.summary}
              </p>
            )}

            {project.builtWith?.length ? (
              <ul className="mt-2 flex flex-wrap gap-2">
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




