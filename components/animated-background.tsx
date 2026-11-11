"use client";

import { motion } from "framer-motion";

// Slowly drifting gradient blobs over a faint grid, in the style of 21st.dev hero backgrounds,
// with a faint trend line that draws itself across the hero, like a chart coming to life.
const blobs = [
  { className: "bg-indigo-500/30 left-[10%] top-[10%] size-[28rem]", x: [0, 80, -40, 0], y: [0, 40, 80, 0], duration: 18 },
  { className: "bg-pink-500/25 right-[5%] top-[20%] size-[24rem]", x: [0, -60, 30, 0], y: [0, 60, -30, 0], duration: 22 },
  { className: "bg-cyan-500/20 left-[35%] bottom-[0%] size-[26rem]", x: [0, 50, -60, 0], y: [0, -50, 20, 0], duration: 26 },
];

// A made-up upward trend, used only as decoration.
const trend = [62, 58, 64, 55, 60, 48, 52, 41, 45, 36, 40, 30, 33, 24, 27, 18, 21, 12];
const trendPath = trend.map((v, i) => `${i ? "L" : "M"}${(i / (trend.length - 1)) * 1200},${v * 4}`).join(" ");

export function AnimatedBackground({ trendLine = true }: { trendLine?: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(148_163_184/0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgb(148_163_184/0.07)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl ${b.className}`}
          animate={{ x: b.x, y: b.y }}
          transition={{ duration: b.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      {trendLine && (
        <svg
          viewBox="0 0 1200 280"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-0 h-28 w-full opacity-30 sm:bottom-10 sm:h-48 sm:opacity-40 [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]"
        >
          <defs>
            <linearGradient id="bg-trend" x1="0" x2="1">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#f472b6" />
            </linearGradient>
          </defs>
          <motion.path
            d={trendPath}
            fill="none"
            stroke="url(#bg-trend)"
            strokeWidth={2}
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.4, delay: 0.6, ease: "easeInOut" }}
          />
        </svg>
      )}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-slate-950" />
    </div>
  );
}
