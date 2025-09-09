// components/Timeline.tsx
import Link from "next/link";
import { useCallback } from "react";

export type TimelineItem = {
  role: string;
  org: string;
  time: string;
  bullets?: string[];
  href?: string;       // clickable link
  external?: boolean;  // open in new tab
};

export default function Timeline({
  items,
  onItemHover,
}: {
  items: TimelineItem[];
  onItemHover?: (active: boolean) => void;
}) {
  const enter = useCallback(() => onItemHover?.(true), [onItemHover]);
  const leave = useCallback(() => onItemHover?.(false), [onItemHover]);

  return (
    <ul className="not-prose space-y-4">
      {items.map((it, idx) => {
        const isLink = Boolean(it.href);
        const Wrapper: any = isLink ? (it.external ? "a" : Link) : "div";
        const wrapperProps = isLink
          ? it.external
            ? { href: it.href, target: "_blank", rel: "noreferrer" }
            : { href: it.href }
          : {};

        return (
          <li key={idx}>
            <Wrapper
              {...wrapperProps}
              onMouseEnter={enter}
              onMouseLeave={leave}
              onFocus={enter}
              onBlur={leave}
              className={[
                "block rounded-lg border border-transparent",
                "transition-all duration-200",
                "hover:border-neutral-300 dark:hover:border-neutral-700",
                "hover:bg-neutral-50/70 dark:hover:bg-neutral-900/40",
                "p-4 -mx-4 sm:-mx-4",
                isLink ? "cursor-pointer" : "",
              ].join(" ")}
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <div className="text-base font-semibold">{it.role}</div>
                <div className="text-sm text-neutral-500">{it.time}</div>
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">{it.org}</div>
              {it.bullets?.length ? (
                <ul className="mt-2 list-disc pl-5 text-sm text-neutral-700 dark:text-neutral-300">
                  {it.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              ) : null}
            </Wrapper>
          </li>
        );
      })}
    </ul>
  );
}


