"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Section = { id: string; label: string };

export default function useScrollSpy(
  rootRef: React.RefObject<HTMLElement | null>,
  sections: { id: string; label: string }[],
  _options?: { offset?: number }
) {
  const [active, setActive] = useState(sections[0]?.id);
  const posRef = useRef<number[]>([]); // cached tops (px, relative to scrollport)

  const els = useMemo(() => {
    const root = rootRef.current;
    if (!root) return [] as HTMLElement[];
    return sections
      .map((s) => root.querySelector<HTMLElement>(`#${s.id}`))
      .filter((el): el is HTMLElement => !!el);
  }, [rootRef, sections]);

  // Compute absolute top of el within the scroll container
  const computeTop = (el: HTMLElement, root: HTMLElement) => {
    const rTop = root.getBoundingClientRect().top;
    const eTop = el.getBoundingClientRect().top;
    return root.scrollTop + (eTop - rTop);
  };

  const recompute = () => {
    const root = rootRef.current;
    if (!root || !els.length) return;
    posRef.current = els.map((el) => computeTop(el, root));
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // initial compute
    recompute();

    // Recompute on resize and when content changes (images load, etc.)
    const ro = new ResizeObserver(() => recompute());
    ro.observe(root);
    els.forEach((el) => ro.observe(el));

    const mo = new MutationObserver(() => {
      // micro debounce
      clearTimeout((recompute as any)._t);
      (recompute as any)._t = setTimeout(recompute, 60);
    });
    mo.observe(root, { subtree: true, childList: true, attributes: true });

    // Recompute when images load inside the scrollport
    const imgs = root.querySelectorAll("img");
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener("load", recompute, { once: true });
    });

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const tops = posRef.current;
        if (!tops.length) {
          ticking = false;
          return;
        }

        const { scrollTop, scrollHeight, clientHeight } = root;

        // 1) Near-bottom safety: if we're basically at the end, force last section.
        const nearBottom = scrollHeight - (scrollTop + clientHeight) <= 24; // px
        if (nearBottom) {
          const lastId = sections[sections.length - 1]?.id ?? sections[0]?.id;
          setActive((prev) => (prev === lastId ? prev : lastId));
          ticking = false;
          return;
        }

        // 2) Pivot ~35% down viewport so short sections activate earlier
        const pivot = scrollTop + Math.min(clientHeight * 0.35, 320);

        // Pick the last section whose top <= pivot
        let idx = 0;
        for (let i = 0; i < tops.length; i++) {
          if (tops[i] <= pivot) idx = i;
        }
        const nextId = sections[idx]?.id ?? sections[0].id;
        setActive((prev) => (prev === nextId ? prev : nextId));
        ticking = false;
      });
    };

    // kick once so the correct section is active at load
    onScroll();

    root.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      root.removeEventListener("scroll", onScroll);
      ro.disconnect();
      mo.disconnect();
      imgs.forEach((img) => img.removeEventListener("load", recompute));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [els.length]); // recompute bindings if the list of sections changes

  return { active, recompute };
}

