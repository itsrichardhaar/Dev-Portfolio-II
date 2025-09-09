import Link from "next/link";
import { useCallback, type ReactNode } from "react";

export type TimelineItem = {
  role: string;
  org: string;
  /** Shown next to the dot on the left (e.g., "2025 — Present" or "Mar 2023") */
  time: string;
  bullets?: string[];
  href?: string;       // make the whole right-card clickable
  external?: boolean;  // open in new tab when true
};

type RowWrapperProps = {
  href?: string;
  external?: boolean;
  className?: string;
  children: ReactNode;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

function RowWrapper({
  href,
  external,
  className,
  children,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
}: RowWrapperProps) {
  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className={className}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onFocus={onFocus}
          onBlur={onBlur}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className={className}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {children}
      </Link>
    );
  }
  return (
    <div
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {children}
    </div>
  );
}

export default function Timeline({
  items,
  onItemHover,
  /** tweak the left column width (dates+rail) if needed */
  leftWidthClass = "sm:w-40 w-36",
}: {
  items: TimelineItem[];
  onItemHover?: (active: boolean) => void;
  leftWidthClass?: string;
}) {
  const enter = useCallback(() => onItemHover?.(true), [onItemHover]);
  const leave = useCallback(() => onItemHover?.(false), [onItemHover]);

  return (
    // vertical spacing BETWEEN cards
    <ul className="not-prose space-y-5 sm:space-y-6">
      {items.map((it, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <li
            key={`${it.role}-${it.time}-${idx}`}
            // tighten LEFT/RIGHT gap between dates rail and card
            className="grid grid-cols-[auto_1fr] gap-x-2 sm:gap-x-3"
          >
            {/* LEFT column: rail + dot + time */}
            <div className={`relative ${leftWidthClass}`}>
              {/* rail segment (stop at last) */}
              {!isLast && (
                <span
                  aria-hidden="true"
                  className="absolute left-3 top-5 bottom-[-1.25rem] w-px bg-neutral-200 dark:bg-neutral-800"
                />
              )}
              {/* dot */}
              <span
                aria-hidden="true"
                className="absolute left-3 top-4 h-2 w-2 -translate-x-1/2 rounded-full bg-emerald-400 ring-2 ring-emerald-200 dark:ring-emerald-900"
              />
              {/* time label */}
              <div className="pl-6 pt-3 text-xs sm:text-sm text-neutral-500">
                {it.time}
              </div>
            </div>

            {/* RIGHT column: clickable card; add vertical breathing space */}
            <RowWrapper
              href={it.href}
              external={it.external}
              onMouseEnter={enter}
              onMouseLeave={leave}
              onFocus={enter}
              onBlur={leave}
              className={[
                // spacing inside card (slightly taller)
                "block rounded-lg border border-transparent px-3 py-3.5 md:px-4 md:py-4",
                // extra space ABOVE/BELOW the card itself
                "my-1.5 sm:my-2",
                // interactivity & hover visuals
                "transition-all duration-200",
                "hover:border-neutral-300 dark:hover:border-neutral-700",
                "hover:bg-neutral-50/70 dark:hover:bg-neutral-900/40",
                it.href
                  ? "cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70"
                  : "",
              ].join(" ")}
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <div className="text-base font-semibold">{it.role}</div>
                <div className="text-sm text-neutral-500">{it.org}</div>
              </div>
              {it.bullets?.length ? (
                <ul className="mt-2 list-disc pl-5 text-sm text-neutral-700 dark:text-neutral-300">
                  {it.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              ) : null}
            </RowWrapper>
          </li>
        );
      })}
    </ul>
  );
}






