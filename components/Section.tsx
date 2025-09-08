// components/Section.tsx
import { ReactNode } from "react";

export default function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-16 py-10">
      <h2 className="text-heading text-2xl font-bold tracking-tight sm:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 max-w-prose text-neutral-600 dark:text-neutral-400">
          {subtitle}
        </p>
      )}
      <div className="prose prose-neutral mt-6 max-w-none dark:prose-invert">
        {children}
      </div>
    </section>
  );
}
