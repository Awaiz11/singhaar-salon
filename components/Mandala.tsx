"use client";

import { useEffect, useRef } from "react";

// A mehndi-style mandala built from rings of petals, scallops and dots.
// Each ring is drawn in turn, like a henna cone working outward from the centre.

const r2 = (n: number) => Math.round(n * 100) / 100;
const pt = (r: number, deg: number) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [r2(r * Math.cos(a)), r2(r * Math.sin(a))];
};

// Teardrop petal from radius r0 (base) to r1 (tip), half-width w in degrees at the base.
function petal(r0: number, r1: number, deg: number, w: number, belly = 0.55) {
  const [bx1, by1] = pt(r0, deg - w);
  const [bx2, by2] = pt(r0, deg + w);
  const [tx, ty] = pt(r1, deg);
  const mid = r0 + (r1 - r0) * belly;
  const [c1x, c1y] = pt(mid, deg - w * 1.9);
  const [c2x, c2y] = pt(mid, deg + w * 1.9);
  return `M${bx1} ${by1} Q${c1x} ${c1y} ${tx} ${ty} Q${c2x} ${c2y} ${bx2} ${by2}`;
}

// Outward-bulging scallops around a circle of radius r.
function scallops(r: number, count: number, depth: number) {
  const step = 360 / count;
  let d = "";
  for (let i = 0; i < count; i++) {
    const a0 = i * step;
    const [x0, y0] = pt(r, a0);
    const [x1, y1] = pt(r, a0 + step);
    const [cx, cy] = pt(r + depth, a0 + step / 2);
    d += `${i === 0 ? `M${x0} ${y0}` : ""} Q${cx} ${cy} ${x1} ${y1}`;
  }
  return d + " Z";
}

const ring = (n: number) => Array.from({ length: n }, (_, i) => (360 / n) * i);

type Layer = { d: string; dots?: never } | { dots: [number, number, number][]; d?: never };

const LAYERS: Layer[] = [
  { d: `M0 -14 A14 14 0 1 1 0 14 A14 14 0 1 1 0 -14` },
  { d: ring(8).map((a) => petal(16, 50, a, 13)).join(" ") },
  { dots: ring(24).map((a) => [...pt(58, a), 2] as [number, number, number]) },
  { d: `M0 -66 A66 66 0 1 1 0 66 A66 66 0 1 1 0 -66` },
  {
    d:
      ring(12).map((a) => petal(68, 116, a, 11.5)).join(" ") +
      " " +
      ring(12)
        .map((a) => {
          const [x0, y0] = pt(74, a);
          const [x1, y1] = pt(104, a);
          return `M${x0} ${y0} L${x1} ${y1}`;
        })
        .join(" "),
  },
  { d: scallops(124, 24, 9) },
  { dots: ring(36).map((a) => [...pt(140, a + 5), 1.8] as [number, number, number]) },
  {
    d:
      ring(16).map((a) => petal(148, 206, a, 8.5, 0.5)).join(" ") +
      " " +
      ring(16).map((a) => petal(156, 190, a, 4.5, 0.5)).join(" "),
  },
  { dots: ring(16).map((a) => [...pt(216, a), 3] as [number, number, number]) },
  { d: scallops(228, 48, 6) },
];

export default function Mandala({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Start drawing only when the mandala is on screen (it sits below the copy on phones).
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("is-drawn");
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <svg ref={ref} className={`mandala ${className}`} viewBox="-240 -240 480 480" aria-hidden="true">
      <circle className="mandala__seed" r="4" />
      {LAYERS.map((l, i) =>
        l.d ? (
          <path key={i} d={l.d} pathLength={1} className="mandala__line" style={{ "--i": i } as React.CSSProperties} />
        ) : (
          <g key={i} className="mandala__dots" style={{ "--i": i } as React.CSSProperties}>
            {l.dots!.map(([x, y, r], j) => (
              <circle key={j} cx={x} cy={y} r={r} />
            ))}
          </g>
        )
      )}
    </svg>
  );
}
