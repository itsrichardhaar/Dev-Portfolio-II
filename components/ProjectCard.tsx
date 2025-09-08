import Link from "next/link";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const internalHref = project.slug && !project.link ? `/projects/${project.slug}` : null;

  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    internalHref ? (
      <Link href={internalHref} className="block w-full">
        {children}
      </Link>
    ) : project.link ? (
      <a href={project.link} target="_blank" rel="noreferrer" className="block w-full">
        {children}
      </a>
    ) : (
      <div className="block w-full">{children}</div>
    );

  return (
    <Wrapper>
      <article className="group border-t border-neutral-200 py-5 first:border-0 dark:border-neutral-800 transition-transform will-change-transform hover:translate-x-[2px]">
        <header className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
          <h3 className="text-[1.05rem] font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
            <span className="underline decoration-transparent group-hover:decoration-current underline-offset-4 transition">
              {project.title}
            </span>
          </h3>
          {project.year ? (
            <span className="mt-1 text-sm text-neutral-500 sm:mt-0">
              {project.year}
            </span>
          ) : null}
        </header>

        {project.summary && (
          <p className="mt-1.5 text-[0.95rem] leading-6 text-neutral-600 dark:text-neutral-400">
            {project.summary}
          </p>
        )}

        {project.builtWith?.length ? (
          <ul className="mt-2 flex flex-wrap gap-2 text-xs text-neutral-500 dark:text-neutral-400">
            {project.builtWith.map((t) => (
              <li key={t} className="rounded-full bg-[rgba(45,212,191,0.1)] text-[rgb(94,234,212)] px-2 py-0.5 text-xs">
                {t}
              </li>
            ))}
          </ul>
        ) : null}
      </article>
    </Wrapper>
  );
}


