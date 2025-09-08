"use client";

import { motion } from "framer-motion";

type SectionLink = { id: string; label: string };

export default function LeftSticky({
  sections,
  active,
  onNavClick,
}: {
  sections: SectionLink[];
  active: string;
  onNavClick: (id: string) => void;
}) {
  return (
    <div className="sticky top-0 flex h-[100dvh] flex-col justify-between py-10 lg:py-16">
      {/* Heading / bio */}
      <div>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-heading text-4xl font-bold tracking-tight sm:text-5xl"
        >
          Richard Haar
        </motion.h1>
        <p className="mt-3 max-w-md text-lg text-neutral-600 dark:text-neutral-400">
          Front-end engineer building fast, accessible web apps.
        </p>
      </div>

      {/* Scrollspy nav */}
      <nav className="mt-0 hidden lg:block">
        <ul className="space-y-2">
          {sections.map((s) => (
            <li key={s.id}>
              <button
                onClick={() => onNavClick(s.id)}
                className={
                  "group flex w-full items-center gap-3 rounded px-2 py-2 text-left transition " +
                  (active === s.id
                    ? "font-semibold text-neutral-900 dark:text-white"
                    : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white")
                }
              >
                <span
                  className={
                    "h-px w-8 shrink-0 transition-all " +
                    (active === s.id
                      ? "bg-neutral-900 dark:bg-white w-10"
                      : "bg-neutral-300 dark:bg-neutral-700")
                  }
                  aria-hidden
                />
                {s.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Socials */}
      <div className="mt-10">
        <ul className="flex gap-4 text-neutral-500">
          <li>
            <a
              href="#"
              className="hover:text-neutral-900 dark:hover:text-white"
              aria-label="GitHub"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 .5a12 12 0 0 0-3.794 23.4c.6.113.82-.26.82-.58 0-.287-.01-1.05-.016-2.06-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.334-1.756-1.334-1.756-1.09-.744.083-.73.083-.73 1.206.085 1.84 1.239 1.84 1.239 1.072 1.837 2.813 1.307 3.497.999.108-.79.42-1.307.764-1.607-2.665-.304-5.466-1.333-5.466-5.93 0-1.31.469-2.38 1.236-3.22-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 6.006 0c2.29-1.552 3.296-1.23 3.296-1.23.656 1.653.244 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.806 5.624-5.479 5.92.43.37.815 1.1.815 2.22 0 1.606-.015 2.9-.015 3.296 0 .322.218.698.826.58A12 12 0 0 0 12 .5Z" />
              </svg>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-neutral-900 dark:hover:text-white"
              aria-label="LinkedIn"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7.5 0h3.8v2.05h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V23h-4v-6.6c0-1.57-.03-3.6-2.2-3.6-2.2 0-2.54 1.72-2.54 3.5V23h-4V8z" />
              </svg>
            </a>
          </li>
          <li>
            <a
              href="mailto:hello@example.com"
              className="hover:text-neutral-900 dark:hover:text-white"
            >
              hello@example.com
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}


