"use client";

import { useEffect, useRef } from "react";

type Props = {
  /** Diameter in px of the glow (default 600 like your snippet) */
  size?: number;
  /** CSS color for the glow center (accepts rgba/hex/hsl). Default: rgba(29,78,216,0.15) */
  color?: string;
  /** Where the gradient fades out (0–100%). Default: 80% */
  fade?: number;
  /** Optional: only show on desktop pointers (default true) */
  desktopOnly?: boolean;
};

export default function MouseTracker({
  size = 600,
  color = "rgba(29, 78, 216, 0.15)", // Tailwind indigo-700 @ 0.15
  fade = 80,
  desktopOnly = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // initialize CSS variables
    el.style.setProperty("--mx", "50vw");
    el.style.setProperty("--my", "50vh");
    el.style.setProperty("--msize", `${size}px`);
    el.style.setProperty("--mcolor", color);
    el.style.setProperty("--mfade", `${fade}%`);

    const onMove = (e: PointerEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (!rafRef.current) rafRef.current = requestAnimationFrame(update);
    };

    const ease = 0.15; // smoothing (0.1–0.25 feels good)
    const update = () => {
      const { x: tx, y: ty } = target.current;
      const { x, y } = current.current;
      const nx = x + (tx - x) * ease;
      const ny = y + (ty - y) * ease;
      current.current = { x: nx, y: ny };
      el.style.setProperty("--mx", `${nx}px`);
      el.style.setProperty("--my", `${ny}px`);
      rafRef.current = requestAnimationFrame(update);
    };

    // respect user preferences / touch devices if requested
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if ((prefersReduced || (desktopOnly && isCoarse))) {
      el.style.display = "none";
      return;
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [size, color, fade, desktopOnly]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60]"
      style={{
        // Use a CSS var–driven radial gradient like your original
        background:
          "radial-gradient(var(--msize) circle at var(--mx) var(--my), var(--mcolor), transparent var(--mfade))",
        transition: "background 0.1s ease", // keeps parity with your old version
        mixBlendMode: "screen",             // nice on dark backgrounds
        filter: "blur(40px)",               // soften edges
      }}
    />
  );
}
