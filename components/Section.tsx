// components/Section.tsx
"use client";

import { ReactNode } from "react";
import { motion, type Variants, type Transition } from "framer-motion";

type Props = {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
};

const EASE: Transition["ease"] = [0.22, 1, 0.36, 1];

const sectionVariants: Variants = {
  hidden: { opacity: 0},
  // functional variant
  show: (i = 0) => ({
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.08,
      ease: EASE,
    },
  }),
};

export default function Section({ id, title, subtitle, children, className }: Props) {
  const base = "scroll-mt-16 py-10";

  return (
    <motion.section
      id={id}
      className={className ? `${base} ${className}` : base}
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      // if you want to pass a custom index later:
      custom={0}
    >
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
    </motion.section>
  );
}



