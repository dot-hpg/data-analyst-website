"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { withBase } from "@/lib/base-path";
import type { Dashboard } from "@/lib/site";

function ToolBadge({ tool }: { tool: Dashboard["tool"] }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
        tool === "Power BI" ? "bg-amber-400/15 text-amber-300" : "bg-sky-400/15 text-sky-300"
      }`}
    >
      {tool}
    </span>
  );
}

function Lightbox({ d, start, onClose }: { d: Dashboard; start: number; onClose: () => void }) {
  const [i, setI] = useState(start);
  const n = d.images.length;
  const go = useCallback((step: number) => setI((v) => (v + step + n) % n), [n]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [go, onClose]);

  const img = d.images[i];
  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={d.title}
      className="fixed inset-0 z-50 flex flex-col bg-slate-950/90 p-4 backdrop-blur-md md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4" onClick={(e) => e.stopPropagation()}>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <ToolBadge tool={d.tool} />
            <span className="text-xs text-slate-400">
              Page {i + 1} of {n}
            </span>
          </div>
          <h3 className="mt-1 truncate text-lg font-semibold">{d.title}</h3>
        </div>
        <button onClick={onClose} aria-label="Close" className="rounded-full border border-slate-700 p-2 text-slate-300 hover:bg-slate-800 hover:text-white">
          <X className="size-5" />
        </button>
      </div>
      <div className="relative mx-auto mt-4 flex w-full max-w-6xl flex-1 items-center justify-center" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait">
          <motion.div
            key={img.src}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden rounded-xl border border-slate-700 bg-white shadow-2xl"
          >
            <Image
              src={withBase(img.src)}
              alt={img.alt}
              width={img.width}
              height={img.height}
              className="h-auto max-h-[75vh] w-auto"
              sizes="(min-width: 1200px) 1150px, 100vw"
              priority
            />
          </motion.div>
        </AnimatePresence>
        {n > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              aria-label="Previous page"
              className="absolute left-0 rounded-full border border-slate-700 bg-slate-900/90 p-2 text-white hover:bg-slate-800 md:-left-14"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next page"
              className="absolute right-0 rounded-full border border-slate-700 bg-slate-900/90 p-2 text-white hover:bg-slate-800 md:-right-14"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}
      </div>
      <p className="mx-auto mt-3 max-w-3xl text-center text-sm text-slate-400">{img.alt}</p>
    </motion.div>
  );
}

export function DashboardCard({ d, index = 0, detailed = false }: { d: Dashboard; index?: number; detailed?: boolean }) {
  const [open, setOpen] = useState<number | null>(null);
  const cover = d.images[0];

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ delay: (index % 3) * 0.1, duration: 0.5 }}
        whileHover={{ y: -6 }}
        className="group flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 transition-colors hover:border-indigo-500/60"
      >
        <button onClick={() => setOpen(0)} className="relative block overflow-hidden bg-white text-left" aria-label={`Open ${d.title} screenshots`}>
          <Image
            src={withBase(cover.src)}
            alt={cover.alt}
            width={cover.width}
            height={cover.height}
            className="aspect-[16/9] h-auto w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
          <span className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full bg-slate-950/80 px-3 py-1.5 text-xs text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
            <Maximize2 className="size-3.5" />
            {d.images.length > 1 ? `View ${d.images.length} pages` : "View full size"}
          </span>
        </button>
        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center gap-2">
            <ToolBadge tool={d.tool} />
            <span className="text-xs text-slate-500">{d.domain}</span>
          </div>
          <h3 className="mt-3 text-xl font-semibold">{d.title}</h3>
          <p className={`mt-2 text-sm text-slate-400 ${detailed ? "" : "line-clamp-3"}`}>{d.desc}</p>
          {detailed && (
            <>
              <h4 className="mt-5 text-xs font-semibold tracking-wider text-slate-300 uppercase">Questions it answers</h4>
              <ul className="mt-2 space-y-1.5 text-sm text-slate-400">
                {d.questions.map((q) => (
                  <li key={q} className="flex gap-2">
                    <span className="text-pink-400">›</span>
                    {q}
                  </li>
                ))}
              </ul>
            </>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            {d.features.map((f) => (
              <span key={f} className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                {f}
              </span>
            ))}
          </div>
          <div className="mt-auto flex flex-wrap gap-3 pt-5">
            {d.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-slate-700 px-3.5 py-2 text-xs text-slate-200 transition-colors hover:border-slate-500 hover:bg-slate-800 hover:text-white"
              >
                {l.label} →
              </a>
            ))}
          </div>
        </div>
      </motion.article>
      <AnimatePresence>{open !== null && <Lightbox d={d} start={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </>
  );
}
