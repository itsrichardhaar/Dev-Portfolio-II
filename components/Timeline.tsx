// components/Timeline.tsx
export default function Timeline({
  items,
}: {
  items: Array<{ role: string; org: string; time: string; bullets: string[] }>;
}) {
  return (
    <ol className="relative ml-4 border-l border-neutral-200 pl-6 dark:border-neutral-800">
      {items.map((item, idx) => (
        <li key={idx} className="mb-10">
          {/* timeline dot */}
          <div className="absolute -left-1.5 mt-2 h-3 w-3 rounded-full border border-white bg-neutral-300 dark:border-neutral-900 dark:bg-neutral-700" />
          
          {/* heading line */}
          <div className="flex flex-wrap items-baseline gap-x-3">
            <h3 className="text-lg font-semibold">{item.role}</h3>
            <span className="text-sm text-neutral-500">{item.org}</span>
            <span className="ml-auto text-sm text-neutral-500">{item.time}</span>
          </div>

          {/* bullets */}
          <ul className="mt-2 list-disc space-y-1 pl-5 text-neutral-700 dark:text-neutral-300">
            {item.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
