"use client";

import { useEffect, useRef, useState } from "react";

export default function useScrollSpy(
  rootRef: React.RefObject<HTMLElement | null>,
  sections: { id: string; label: string }[]
) {
  const [active, setActive] = useState(sections[0]?.id);
  const topsRef = useRef<number[]>([]);
  const debounceId = useRef<ReturnType<typeof setTimeout> | null>(null);

  const computeTop = (el: HTMLElement, root: HTMLElement) => {
    const rTop = root.getBoundingClientRect().top;
    const eTop = el.getBoundingClientRect().top;
    return root.scrollTop + (eTop - rTop);
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const getEls = () =>
      sections
        .map((s) => root.querySelector<HTMLElement>(`#${s.id}`))
        .filter((el): el is HTMLElement => !!el);

    let els = getEls();

    const recompute = () => {
      els = getEls(); // re-grab in case DOM changed
      topsRef.current = els.map((el) => computeTop(el, root));
    };

    // Initial
    recompute();

    // Recompute on resize/relayout
    const ro = new ResizeObserver(() => recompute());
    ro.observe(root);
    els.forEach((el) => ro.observe(el));

    // Recompute on DOM mutations (images loaded, content toggles, etc.)
    const mo = new MutationObserver(() => {
      if (debounceId.current) clearTimeout(debounceId.current);
      debounceId.current = setTimeout(recompute, 60);
    });
    mo.observe(root, { subtree: true, childList: true, attributes: true });

    // Recompute when images load
    const imgs = root.querySelectorAll("img");
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener("load", recompute, { once: true });
    });

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const { scrollTop, scrollHeight, clientHeight } = root;

        // If we're at the end, force last section active
        const nearBottom = scrollHeight - (scrollTop + clientHeight) <= 24;
        if (nearBottom) {
          const lastId = sections[sections.length - 1]?.id ?? sections[0]?.id;
          setActive((prev) => (prev === lastId ? prev : lastId));
          ticking = false;
          return;
        }

        // Pivot ~35% down viewport so short sections activate
        const pivot = scrollTop + Math.min(clientHeight * 0.35, 320);

        // Pick the last section whose top <= pivot
        const tops = topsRef.current;
        let idx = 0;
        for (let i = 0; i < tops.length; i++) {
          if (tops[i] <= pivot) idx = i;
        }
        const nextId = sections[idx]?.id ?? sections[0]?.id;
        setActive((prev) => (prev === nextId ? prev : nextId));
        ticking = false;
      });
    };

    // Prime once
    onScroll();

    root.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      root.removeEventListener("scroll", onScroll);
      ro.disconnect();
      mo.disconnect();
      imgs.forEach((img) => img.removeEventListener("load", recompute));
      if (debounceId.current) clearTimeout(debounceId.current);
    };
  }, [rootRef, sections]);

  // optional manual recompute export (rarely needed)
  const recompute = () => {
    const root = rootRef.current;
    if (!root) return;
    const els = sections
      .map((s) => root.querySelector<HTMLElement>(`#${s.id}`))
      .filter((el): el is HTMLElement => !!el);
    topsRef.current = els.map((el) => computeTop(el, root));
  };

  return { active, recompute };
}


