"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";

// Small, dependency-free SVG charts drawn at the container's real pixel width,
// so text stays crisp and readable on phones. Every chart has a hover/tap tooltip.

// Validated categorical slots for the dark surface (CVD-safe in this order).
export const SERIES = ["#6366f1", "#ec4899", "#0891b2"] as const;

function useWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(Math.floor(entry.contentRect.width)));
    ro.observe(el);
    setWidth(Math.floor(el.getBoundingClientRect().width));
    return () => ro.disconnect();
  }, []);
  return [ref, width] as const;
}

function niceMax(v: number) {
  if (v <= 0) return 1;
  const exp = Math.pow(10, Math.floor(Math.log10(v)));
  const n = v / exp;
  const step = [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10].find((s) => n <= s) ?? 10;
  return step * exp;
}

function ticks(max: number, count = 4) {
  return Array.from({ length: count + 1 }, (_, i) => (max / count) * i);
}

type Tip = { x: number; y: number; title: string; rows: { color?: string; label: string; value: string }[] };

function Tooltip({ tip, width }: { tip: Tip | null; width: number }) {
  if (!tip) return null;
  const left = Math.min(Math.max(tip.x, 90), width - 90);
  return (
    <div
      role="status"
      className="pointer-events-none absolute z-20 min-w-36 -translate-x-1/2 -translate-y-full rounded-lg border border-slate-700 bg-slate-950/95 px-3 py-2 text-xs shadow-xl shadow-black/40 backdrop-blur"
      style={{ left, top: tip.y - 10 }}
    >
      <div className="font-semibold text-white">{tip.title}</div>
      {tip.rows.map((r) => (
        <div key={r.label} className="mt-1 flex items-center justify-between gap-4 text-slate-300">
          <span className="flex items-center gap-1.5">
            {r.color && <span className="inline-block size-2 rounded-full" style={{ background: r.color }} />}
            {r.label}
          </span>
          <span className="font-mono text-white tabular-nums">{r.value}</span>
        </div>
      ))}
    </div>
  );
}

export function Legend({ items }: { items: { label: string; color: string; dashed?: boolean }[] }) {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-slate-400">
      {items.map((i) => (
        <span key={i.label} className="flex items-center gap-2">
          <span
            className="inline-block h-0.5 w-4 rounded-full"
            style={i.dashed ? { backgroundImage: `linear-gradient(to right, ${i.color} 60%, transparent 0)`, backgroundSize: "5px 2px" } : { background: i.color }}
          />
          {i.label}
        </span>
      ))}
    </div>
  );
}

// ---------- Line chart ----------

export type LineSeries = { key: string; label: string; color: string; dashed?: boolean };

export function LineChart<T extends Record<string, string | number>>({
  data,
  x,
  series,
  height = 260,
  formatY = (v) => v.toLocaleString("en-US"),
  formatX = (v) => String(v),
  xTickEvery = 1,
  area = true,
  annotations = [],
  ariaLabel,
}: {
  data: T[];
  x: keyof T;
  series: LineSeries[];
  height?: number;
  formatY?: (v: number) => string;
  formatX?: (v: string | number) => string;
  xTickEvery?: number;
  area?: boolean;
  annotations?: { index: number; label: string }[];
  ariaLabel: string;
}) {
  const [ref, width] = useWidth<HTMLDivElement>();
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [hover, setHover] = useState<number | null>(null);
  const gid = useId().replace(/:/g, "");

  const m = { top: 16, right: 14, bottom: 28, left: 46 };
  const w = Math.max(width - m.left - m.right, 10);
  const h = height - m.top - m.bottom;
  const max = niceMax(Math.max(...data.flatMap((d) => series.map((s) => Number(d[s.key])))));
  const sx = (i: number) => (data.length === 1 ? w / 2 : (i / (data.length - 1)) * w);
  const sy = (v: number) => h - (v / max) * h;

  const path = (key: string) => data.map((d, i) => `${i ? "L" : "M"}${sx(i)},${sy(Number(d[key]))}`).join("");
  const areaPath = (key: string) => `${path(key)}L${sx(data.length - 1)},${h}L0,${h}Z`;

  const onMove = (clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = clientX - rect.left - m.left;
    const i = Math.round((px / w) * (data.length - 1));
    setHover(Math.min(Math.max(i, 0), data.length - 1));
  };

  const tip: Tip | null =
    hover === null
      ? null
      : {
          x: m.left + sx(hover),
          y: m.top + Math.min(...series.map((s) => sy(Number(data[hover][s.key])))),
          title: formatX(data[hover][x]),
          rows: series.map((s) => ({ color: s.color, label: s.label, value: formatY(Number(data[hover][s.key])) })),
        };

  return (
    <div
      ref={ref}
      className="relative touch-pan-y select-none"
      onMouseMove={(e) => onMove(e.clientX)}
      onMouseLeave={() => setHover(null)}
      onTouchStart={(e) => onMove(e.touches[0].clientX)}
      onTouchMove={(e) => onMove(e.touches[0].clientX)}
    >
      {width > 0 && (
        <svg width={width} height={height} role="img" aria-label={ariaLabel} className="block overflow-visible">
          <defs>
            {series.map((s) => (
              <linearGradient key={s.key} id={`${gid}-${s.key}`} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={s.color} stopOpacity={0.28} />
                <stop offset="100%" stopColor={s.color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <g transform={`translate(${m.left},${m.top})`}>
            {ticks(max).map((t) => (
              <g key={t} transform={`translate(0,${sy(t)})`}>
                <line x2={w} stroke="rgb(51 65 85 / 0.5)" strokeDasharray={t === 0 ? undefined : "2 4"} />
                <text x={-10} dy="0.32em" textAnchor="end" className="fill-slate-500 text-[11px] tabular-nums">
                  {formatY(t)}
                </text>
              </g>
            ))}
            {data.map((d, i) =>
              i % xTickEvery === 0 ? (
                <text key={i} x={sx(i)} y={h + 18} textAnchor="middle" className="fill-slate-500 text-[11px]">
                  {formatX(d[x])}
                </text>
              ) : null,
            )}
            {area &&
              series.slice(0, 1).map((s) => (
                <motion.path
                  key={`a-${s.key}`}
                  d={areaPath(s.key)}
                  fill={`url(#${gid}-${s.key})`}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.6, duration: 0.8 }}
                />
              ))}
            {series.map((s, si) => (
              <motion.path
                key={s.key}
                d={path(s.key)}
                fill="none"
                stroke={s.color}
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeDasharray={s.dashed ? "5 5" : undefined}
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.4, delay: si * 0.25, ease: "easeInOut" }}
              />
            ))}
            {annotations.map((a) => {
              const s = series[0];
              const cx = sx(a.index);
              const cy = sy(Number(data[a.index][s.key]));
              const anchor = cx > w - 80 ? "end" : cx < 80 ? "start" : "middle";
              return (
                <motion.g key={a.label} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1.4 }}>
                  <circle cx={cx} cy={cy} r={4} fill={s.color} stroke="#020617" strokeWidth={2} />
                  <text x={cx} y={cy - 10} textAnchor={anchor} className="fill-slate-300 text-[11px] font-medium">
                    {a.label}
                  </text>
                </motion.g>
              );
            })}
            {hover !== null && (
              <g>
                <line x1={sx(hover)} x2={sx(hover)} y2={h} stroke="rgb(148 163 184 / 0.5)" />
                {series.map((s) => (
                  <circle key={s.key} cx={sx(hover)} cy={sy(Number(data[hover][s.key]))} r={4.5} fill={s.color} stroke="#020617" strokeWidth={2} />
                ))}
              </g>
            )}
          </g>
        </svg>
      )}
      {!width && <div style={{ height }} />}
      <Tooltip tip={tip} width={width} />
    </div>
  );
}

// ---------- Bar chart (vertical) ----------

export function BarChart<T extends Record<string, string | number>>({
  data,
  x,
  y,
  height = 260,
  formatY = (v) => v.toLocaleString("en-US"),
  colorFor = () => SERIES[0],
  tipRows,
  valueLabels = true,
  ariaLabel,
  maxOverride,
}: {
  data: T[];
  x: keyof T;
  y: keyof T;
  height?: number;
  formatY?: (v: number) => string;
  colorFor?: (d: T, i: number) => string;
  tipRows?: (d: T) => { label: string; value: string }[];
  valueLabels?: boolean;
  ariaLabel: string;
  maxOverride?: number;
}) {
  const [ref, width] = useWidth<HTMLDivElement>();
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [hover, setHover] = useState<number | null>(null);

  const m = { top: 22, right: 6, bottom: 54, left: 40 };
  const w = Math.max(width - m.left - m.right, 10);
  const h = height - m.top - m.bottom;
  const max = maxOverride ?? niceMax(Math.max(...data.map((d) => Number(d[y]))));
  const band = w / data.length;
  const bw = Math.min(band - 6, 56);
  const sy = (v: number) => h - (v / max) * h;

  const tip: Tip | null =
    hover === null
      ? null
      : {
          x: m.left + band * hover + band / 2,
          y: m.top + sy(Number(data[hover][y])),
          title: String(data[hover][x]),
          rows: tipRows ? tipRows(data[hover]) : [{ label: String(y), value: formatY(Number(data[hover][y])) }],
        };

  return (
    <div ref={ref} className="relative select-none" onMouseLeave={() => setHover(null)}>
      {width > 0 && (
        <svg width={width} height={height} role="img" aria-label={ariaLabel} className="block overflow-visible">
          <g transform={`translate(${m.left},${m.top})`}>
            {ticks(max, max === 5 ? 5 : 4).map((t) => (
              <g key={t} transform={`translate(0,${sy(t)})`}>
                <line x2={w} stroke="rgb(51 65 85 / 0.5)" strokeDasharray={t === 0 ? undefined : "2 4"} />
                <text x={-10} dy="0.32em" textAnchor="end" className="fill-slate-500 text-[11px] tabular-nums">
                  {formatY(t)}
                </text>
              </g>
            ))}
            {data.map((d, i) => {
              const v = Number(d[y]);
              const bh = h - sy(v);
              const cx = band * i + band / 2;
              const label = String(d[x]);
              const words = label.split(" ");
              const mid = Math.ceil(words.length / 2);
              const lines =
                band < 64 ? words : width < 520 && words.length > 1 ? [words.slice(0, mid).join(" "), words.slice(mid).join(" ")] : [label];
              return (
                <g key={label} onMouseEnter={() => setHover(i)} onClick={() => setHover(i)}>
                  <rect x={band * i} width={band} height={h} fill="transparent" />
                  <motion.rect
                    x={cx - bw / 2}
                    width={bw}
                    rx={4}
                    fill={colorFor(d, i)}
                    opacity={hover === null || hover === i ? 1 : 0.45}
                    initial={{ y: h, height: 0 }}
                    animate={inView ? { y: sy(v), height: bh } : {}}
                    transition={{ duration: 0.7, delay: i * 0.07, ease: "easeOut" }}
                  />
                  {valueLabels && (
                    <motion.text
                      x={cx}
                      y={sy(v) - 7}
                      textAnchor="middle"
                      className="fill-slate-200 text-[11px] font-semibold tabular-nums"
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.5 + i * 0.07 }}
                    >
                      {formatY(v)}
                    </motion.text>
                  )}
                  {lines.map((ln, li) => (
                    <text key={li} x={cx} y={h + 16 + li * 13} textAnchor="middle" className="fill-slate-400 text-[11px]">
                      {ln}
                    </text>
                  ))}
                </g>
              );
            })}
          </g>
        </svg>
      )}
      {!width && <div style={{ height }} />}
      <Tooltip tip={tip} width={width} />
    </div>
  );
}

// ---------- Horizontal bar list (ranked) ----------

export function RankedBars<T extends Record<string, string | number>>({
  data,
  label,
  value,
  format = (v) => v.toLocaleString("en-US"),
  color = SERIES[0],
  highlight,
  detail,
}: {
  data: T[];
  label: keyof T;
  value: keyof T;
  format?: (v: number) => string;
  color?: string;
  highlight?: (d: T) => boolean;
  detail?: (d: T) => string;
}) {
  const ref = useRef<HTMLUListElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const max = Math.max(...data.map((d) => Number(d[value])));
  return (
    <ul ref={ref} className="space-y-2.5">
      {data.map((d, i) => {
        const v = Number(d[value]);
        const hl = highlight?.(d);
        return (
          <li key={String(d[label])} className="group grid grid-cols-[4.5rem_1fr_auto] items-center gap-3 text-sm sm:grid-cols-[9rem_1fr_auto]" title={detail?.(d)}>
            <span className={`truncate ${hl ? "font-semibold text-white" : "text-slate-300"}`}>{String(d[label])}</span>
            <span className="relative h-2.5 overflow-hidden rounded-full bg-slate-800/70">
              <motion.span
                layout
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ background: hl ? SERIES[1] : color }}
                initial={{ width: 0 }}
                animate={inView ? { width: `${(v / max) * 100}%` } : {}}
                transition={{ duration: 0.8, delay: i * 0.04, ease: "easeOut" }}
              />
            </span>
            <span className="w-16 text-right font-mono text-xs text-slate-200 tabular-nums">{format(v)}</span>
          </li>
        );
      })}
    </ul>
  );
}
