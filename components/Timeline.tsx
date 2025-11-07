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
            className="relative lg:grid lg:grid-cols-[auto_1fr] lg:gap-x-3"
          >
            {!isLast && (
              <span
                aria-hidden="true"
                className="absolute left-3 top-5 bottom-[-1.25rem] w-px bg-neutral-200 dark:bg-neutral-800 lg:hidden"
              />
            )}
            <span
              aria-hidden="true"
              className={[
                "absolute left-3 top-4 h-2 w-2 -translate-x-1/2 rounded-full transition-all duration-200 lg:hidden",
                isActive
                  ? "bg-emerald-500 ring-4 ring-emerald-200/80 dark:ring-emerald-900/70 scale-110"
                  : "bg-emerald-400 ring-2 ring-emerald-200 dark:ring-emerald-900 scale-100",
              ].join(" ")}
            />

            <div className={`relative ${leftWidthClass} hidden pb-5 lg:block`}>
              {!isLast && (
                <span
                  aria-hidden="true"
                  className="absolute left-3 top-5 bottom-[-1.25rem] w-px bg-neutral-200 dark:bg-neutral-800"
                />
              )}
              <span
                aria-hidden="true"
                className={[
                  "absolute left-3 top-4 h-2 w-2 -translate-x-1/2 rounded-full transition-all duration-200",
                  isActive
                    ? "bg-emerald-500 ring-4 ring-emerald-200/80 dark:ring-emerald-900/70 scale-110"
                    : "bg-emerald-400 ring-2 ring-emerald-200 dark:ring-emerald-900 scale-100",
                ].join(" ")}
              />
              <div className="pl-6 pt-3 text-xs sm:text-sm text-neutral-500">
                {it.time}
              </div>
            </div>

            <div className="pl-10 lg:hidden">
              <div className="pt-2 text-xs text-neutral-500">{it.time}</div>
            </div>

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
                "mt-1 lg:mt-0",
                "block w-full rounded-lg border border-transparent",
                "pl-10 pr-3 py-3.5",
                "lg:pl-4 lg:pr-4 lg:py-4",
                "transition-all duration-200",
               
                isActive
                  ? "bg-[rgba(45,212,191,0.1)]"
                  : "hover:bg-[rgba(45,212,191,0.1)]",
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









