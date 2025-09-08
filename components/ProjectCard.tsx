// components/ProjectCard.tsx
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const href = project.link ?? "#";
  const external = Boolean(project.link);

  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    external ? (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="block w-full transition hover:opacity-80"
      >
        {children}
      </a>
    ) : (
      <div className="block w-full">{children}</div>
    );

  return (
    <Wrapper>
      <article className="group border-t border-neutral-200 py-6 first:border-0 dark:border-neutral-800">
        <header className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
          <h3 className="text-lg font-semibold tracking-tight text-neutral-900 group-hover:text-indigo-600 dark:text-neutral-100 dark:group-hover:text-indigo-400">
            {project.title}
          </h3>
          {project.year ? (
            <span className="mt-1 text-sm text-neutral-500 sm:mt-0">
              {project.year}
            </span>
          ) : null}
        </header>

        {project.summary && (
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            {project.summary}
          </p>
        )}

        {project.builtWith?.length ? (
          <ul className="mt-3 flex flex-wrap gap-2 text-xs text-neutral-500 dark:text-neutral-400">
            {project.builtWith.map((t) => (
              <li
                key={t}
                className="rounded bg-neutral-100 px-2 py-0.5 dark:bg-neutral-900"
              >
                {t}
              </li>
            ))}
          </ul>
        ) : null}
      </article>
    </Wrapper>
  );
}

