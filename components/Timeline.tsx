import Link from "next/link";
import { useCallback, useState, type ReactNode } from "react";

export type TimelineItem = {
  role: string;
  org: string;
  time: string;        
  bullets?: string[];
  href?: string;       
  external?: boolean;  
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
  leftWidthClass = "sm:w-40 w-36",
}: {
  items: TimelineItem[];
  onItemHover?: (active: boolean) => void;
  leftWidthClass?: string;
}) {
  const [hovered, setHovered] = useState<number | null>(null);

  const enter = useCallback(() => onItemHover?.(true), [onItemHover]);
  const leave = useCallback(() => onItemHover?.(false), [onItemHover]);

  return (
    <ul className="not-prose space-y-5 sm:space-y-6">
      {items.map((it, idx) => {
        const isLast = idx === items.length - 1;
        const isActive = hovered === idx;

        return (
          <li
            key={`${it.role}-${it.time}-${idx}`}
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

              {/* dot (lights up when the card is hovered/focused) */}
              <span
                aria-hidden="true"
                className={[
                  "absolute left-3 top-4 h-2 w-2 -translate-x-1/2 rounded-full transition-all duration-200",
                  isActive
                    ? "bg-emerald-500 ring-4 ring-emerald-200/80 dark:ring-emerald-900/70 scale-110"
                    : "bg-emerald-400 ring-2 ring-emerald-200 dark:ring-emerald-900 scale-100",
                ].join(" ")}
              />

              {/* time label */}
              <div className="pl-6 pt-3 text-xs sm:text-sm text-neutral-500">
                {it.time}
              </div>
            </div>

            {/* RIGHT column: clickable card */}
            <RowWrapper
              href={it.href}
              external={it.external}
              onMouseEnter={() => {
                setHovered(idx);
                enter();
              }}
              onMouseLeave={() => {
                setHovered(null);
                leave();
              }}
              onFocus={() => {
                setHovered(idx);
                enter();
              }}
              onBlur={() => {
                setHovered(null);
                leave();
              }}
              className={[
                "block rounded-lg border border-transparent px-3 py-3.5 md:px-4 md:py-4",
                "my-1.5 sm:my-2",
                "transition-all duration-200",
                isActive
                  ? "border-neutral-300 bg-neutral-50/70 dark:border-neutral-700 dark:bg-neutral-900/40"
                  : "hover:border-neutral-300 hover:bg-neutral-50/70 dark:hover:border-neutral-700 dark:hover:bg-neutral-900/40",
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







