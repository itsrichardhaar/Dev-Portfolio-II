// components/Timeline.tsx
import Link from "next/link";
import { useCallback, type ReactNode } from "react";

export type TimelineItem = {
  role: string;
  org: string;
  time: string;
  bullets?: string[];
  href?: string;       // optional link URL
  external?: boolean;  // open in new tab if true and href present
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

/** Typed wrapper that renders Link, <a>, or <div> (no `any`) */
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
  showRail = true,
}: {
  items: TimelineItem[];
  onItemHover?: (active: boolean) => void;
  showRail?: boolean;
}) {
  const enter = useCallback(() => onItemHover?.(true), [onItemHover]);
  const leave = useCallback(() => onItemHover?.(false), [onItemHover]);

  return (
    <div className="relative">
      {showRail && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-0 bottom-0 w-px bg-neutral-200 dark:bg-neutral-800"
        />
      )}

      <ul className="not-prose space-y-4 pl-8">
        {items.map((it, idx) => (
          <li key={idx} className="relative">
            {/* dot */}
            <span
              aria-hidden="true"
              className="absolute left-2 top-5 h-2 w-2 -translate-x-1/2 rounded-full bg-emerald-400 ring-2 ring-emerald-200 dark:ring-emerald-900"
            />

            <RowWrapper
              href={it.href}
              external={it.external}
              onMouseEnter={enter}
              onMouseLeave={leave}
              onFocus={enter}
              onBlur={leave}
              className={[
                "block rounded-lg border border-transparent",
                "transition-all duration-200",
                "hover:border-neutral-300 dark:hover:border-neutral-700",
                "hover:bg-neutral-50/70 dark:hover:bg-neutral-900/40",
                "px-4 py-3",
                it.href ? "cursor-pointer" : "",
              ].join(" ")}
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <div className="text-base font-semibold">{it.role}</div>
                <div className="text-sm text-neutral-500">{it.time}</div>
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                {it.org}
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
        ))}
      </ul>
    </div>
  );
}




