// components/ProjectCard.tsx
import Link from "next/link";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const internalHref =
    project.slug && !project.link ? `/projects/${project.slug}` : null;

  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    internalHref ? (
      <Link href={internalHref} className="block w-full no-underline">
        {children}
      </Link>
    ) : project.link ? (
      <a
        href={project.link}
        target="_blank"
        rel="noreferrer"
        className="block w-full no-underline"
      >
        {children}
      </a>
    ) : (
      <div className="block w-full">{children}</div>
    );

  // Use the first image if provided
  const thumb = project.images?.[0];

  return (
    <Wrapper>
      <article className="group border-t border-border rounded-xl pr-5 pt-5 pb-5 pl-0 first:border-0 transition-all hover:bg-[rgba(30,41,59,.5)]">
        <div className="flex items-start gap-4">
          {/* Thumbnail */}
          <div className="relative shrink-0 overflow-hidden rounded-lg border border-border/60">
            {/* fixed box to prevent layout shift; tweak size to taste */}
            <div className="h-20 w-28 sm:h-28 sm:w-36 bg-white/5" />
            {thumb ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={thumb.src}
                alt={thumb.alt ?? project.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : null}
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
              <p className="mt-1.5 text-[0.95rem] leading-6 mr-10">
                {project.summary}
              </p>
            )}

            {project.builtWith?.length ? (
              <ul className="mt-2 flex flex-wrap gap-2">
                {project.builtWith.map((t) => (
                  <li
                    key={t}
                    className="rounded-full px-2.5 py-1 text-[11px] leading-none
                               bg-[rgba(45,212,191,0.1)] text-[rgb(94,234,212)]
                               border border-[rgba(45,212,191,0.25)]"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </article>
    </Wrapper>
  );
}



