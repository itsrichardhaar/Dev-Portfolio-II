// components/LeftSticky.tsx
"use client";

import { motion, type Variants, type Transition } from "framer-motion";

type SectionLink = { id: string; label: string };

// define easing once so TS is happy
const EASE: Transition["ease"] = [0.22, 1, 0.36, 1];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE },
  },
};

const navItemVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: EASE },
  },
};

const socialsVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: EASE, delay: 0.1 },
  },
};

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
    <motion.div
      className={[
        "flex flex-col gap-3 py-3",
        "lg:sticky lg:top-6 lg:h-[100svh] lg:gap-6 lg:py-8",
      ].join(" ")}
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Heading / bio */}
      <motion.div className="mt-6 lg:mt-0" variants={headingVariants}>
        <h1 className="text-heading text-4xl font-bold tracking-tight sm:text-5xl">
          Richard Haar
        </h1>
        <p className="mt-2 lg:mt-3 max-w-md text-base sm:text-lg font-semibold text-neutral-600 dark:text-neutral-400">
          Senior Web Developer.
        </p>
      </motion.div>

      {/* Scrollspy nav — visible on mobile, same styling on desktop */}
      <nav className="hidden lg:block lg:mt-[3.75rem]">
        <motion.ul className="space-y-1 lg:space-y-2">
          {sections.map((s) => (
            <motion.li key={s.id} variants={navItemVariants}>
              <button
                onClick={() => onNavClick(s.id)}
                className={[
                  "group flex w-full items-center rounded text-left transition uppercase cursor-pointer",
                  "gap-2 px-1.5 py-1.5 text-sm",
                  "lg:gap-3 lg:px-2 lg:py-2 lg:text-base",
                  active === s.id
                    ? "font-bold text-neutral-900 dark:text-white"
                    : "text-copy hover:text-neutral-900 dark:hover:text-white dark:text-neutral-400",
                ].join(" ")}
              >
                {/* animated underline/rail */}
                <motion.span
                  aria-hidden
                  layout
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  className={[
                    "h-px shrink-0",
                    active === s.id
                      ? "bg-neutral-900 dark:bg-white w-8 lg:w-10"
                      : "bg-neutral-300 dark:bg-neutral-700 w-6 lg:w-8",
                  ].join(" ")}
                />
                {s.label}
              </button>
            </motion.li>
          ))}
        </motion.ul>
      </nav>

      {/* Socials */}
      <motion.div
        className="pt-1 lg:mt-auto mb-3 lg:mb-6"
        variants={socialsVariants}
      >
        <ul className="flex flex-wrap gap-x-3 gap-y-2 text-sm lg:text-base text-neutral-500">
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
              href="mailto:richard@springerstudios.com"
              className="hover:text-neutral-900 dark:hover:text-white"
            >
              richard@springerstudios.com
            </a>
          </li>
        </ul>
      </motion.div>
    </motion.div>
  );
}





