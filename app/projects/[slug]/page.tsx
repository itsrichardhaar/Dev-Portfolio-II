import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const p = getProject(params.slug);
  if (!p) return { title: "Project not found" };
  return {
    title: `${p.title} — Project`,
    description: p.summary,
    openGraph: {
      title: p.title,
      description: p.summary,
      images: p.images?.map((img) => ({ url: img.src })) ?? [],
    },
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const p = getProject(params.slug);
  if (!p) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Link
        href="/"
        className="text-sm text-neutral-600 underline-offset-4 hover:underline dark:text-neutral-400"
      >
        ← Back to home
      </Link>

      <header className="mt-4">
        <h1 className="text-heading text-4xl font-bold tracking-tight">{p.title}</h1>
        <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-neutral-500">
          {p.year ? <span>{p.year}</span> : null}
          {p.madeAt ? <span>• {p.madeAt}</span> : null}
        </div>
        {p.builtWith?.length ? (
          <ul className="mt-3 flex flex-wrap gap-1">
            {p.builtWith.map((t) => (
              <li
                key={t}
                className="rounded-full bg-[rgba(45,212,191,0.1)] text-[rgb(94,234,212)] px-2 py-0.5 text-xs"
              >
                {t}
              </li>
            ))}
          </ul>
        ) : null}
      </header>

      {p.images?.length ? (
        <div className="mt-6 grid gap-4">
          {p.images.map((img, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800"
            >
              {img.width && img.height ? (
                <Image
                  src={img.src}
                  alt={img.alt ?? ""}
                  width={img.width}
                  height={img.height}
                  className="h-auto w-full"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={img.src} alt={img.alt ?? ""} className="h-auto w-full" />
              )}
            </div>
          ))}
        </div>
      ) : null}

      {p.description?.length ? (
        <div className="prose prose-neutral mt-8 dark:prose-invert">
          {p.description.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      ) : null}

      {p.highlights?.length ? (
        <div className="prose prose-neutral mt-6 dark:prose-invert">
          <h2>Highlights</h2>
          <ul>
            {p.highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <footer className="mt-10 flex gap-4">
        {p.link ? (
          <a
            className="rounded-md border border-neutral-300 px-3 py-1.5 text-sm hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-900"
            href={p.link}
            target="_blank"
            rel="noreferrer"
          >
            Visit project ↗
          </a>
        ) : null}
        <Link
          className="rounded-md border border-neutral-300 px-3 py-1.5 text-sm hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-900"
          href="/archive"
        >
          View archive
        </Link>
      </footer>
    </div>
  );
}
