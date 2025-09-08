import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-semibold">Project not found</h1>
      <p className="mt-2 text-neutral-600 dark:text-neutral-400">
        The project you’re looking for doesn’t exist.
      </p>
      <div className="mt-6 flex gap-4">
        <Link href="/" className="underline underline-offset-2">
          Back to home
        </Link>
        <Link href="/archive" className="underline underline-offset-2">
          Project archive
        </Link>
      </div>
    </div>
  );
}
