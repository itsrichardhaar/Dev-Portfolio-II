// app/archive/page.tsx
import { projects } from "@/data/projects";

export const metadata = {
  title: "Project Archive — Your Name",
  description: "A list of things I’ve worked on over the years.",
};

export default function ArchivePage() {
  // Newest first; tweak to your preference
  const rows = [...projects].sort((a, b) => (b.year ?? 0) - (a.year ?? 0));

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Project Archive</h1>
      <p className="mt-2 text-neutral-600 dark:text-neutral-400">
        A list of things I’ve worked on over the years.
      </p>

      {/* Desktop table */}
      <div className="mt-8 hidden overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800 md:block">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-neutral-100 text-left text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400">
              <th className="px-4 py-3 font-medium">Year</th>
              <th className="px-4 py-3 font-medium">Project</th>
              <th className="px-4 py-3 font-medium">Made at</th>
              <th className="px-4 py-3 font-medium">Built with</th>
              <th className="px-4 py-3 font-medium">Link</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.slug} className="border-t border-neutral-200 align-top dark:border-neutral-800">
                <td className="px-4 py-3 whitespace-nowrap text-neutral-700 dark:text-neutral-300">
                  {p.year ?? "—"}
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium">{p.title}</div>
                  {p.summary && (
                    <div className="mt-1 max-w-prose text-neutral-600 dark:text-neutral-400">
                      {p.summary}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">{p.madeAt ?? "—"}</td>
                <td className="px-4 py-3">
                  <ul className="flex flex-wrap gap-1">
                    {p.builtWith?.map((t) => (
                      <li key={t} className="rounded-full bg-[rgba(45,212,191,0.1)] text-[rgb(94,234,212)] px-2 py-0.5 text-xs">
                        {t}
                      </li>
                    )) || "—"}
                  </ul>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {p.link ? (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="underline underline-offset-2"
                    >
                      Visit ↗
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile stacked list */}
      <div className="md:hidden">
        <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
          {rows.map((p) => (
            <li key={p.slug} className="py-4">
              <div className="flex items-baseline justify-between">
                <h2 className="text-base font-semibold">{p.title}</h2>
                <span className="ml-4 text-sm text-neutral-500">{p.year ?? "—"}</span>
              </div>
              {p.summary && (
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{p.summary}</p>
              )}
              <div className="mt-2 text-sm text-neutral-500">
                {p.madeAt ?? "—"}
              </div>
              {p.builtWith?.length ? (
                <ul className="mt-2 flex flex-wrap gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                  {p.builtWith.map((t) => (
                    <li key={t} className="rounded bg-neutral-100 px-2 py-0.5 dark:bg-neutral-900">
                      {t}
                    </li>
                  ))}
                </ul>
              ) : null}
              {p.link ? (
                <div className="mt-2">
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm underline underline-offset-2"
                  >
                    Visit ↗
                  </a>
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
