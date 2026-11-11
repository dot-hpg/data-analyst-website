"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navLinks, site } from "@/lib/site";

function isActive(pathname: string, href: string) {
  if (href.includes("#")) return false;
  const p = pathname.replace(/\/$/, "") || "/";
  return href === "/" ? p === "/" : p === href || p.startsWith(`${href}/`);
}

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative z-30 mx-auto flex max-w-6xl items-center justify-between gap-x-4 px-6 py-5">
      <Link href="/" className="shrink-0 text-lg font-bold tracking-tight">
        {site.shortName}
        <span className="text-indigo-400">.</span>
      </Link>
      <div className="hidden gap-7 text-sm text-slate-300 md:flex">
        {navLinks.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`relative transition-colors hover:text-white ${isActive(pathname, l.href) ? "text-white" : ""}`}
          >
            {l.label}
            {isActive(pathname, l.href) && (
              <span className="absolute inset-x-0 -bottom-1.5 h-px bg-gradient-to-r from-indigo-400 to-pink-400" />
            )}
          </Link>
        ))}
      </div>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="rounded-lg border border-slate-800 bg-slate-900/60 p-2 text-slate-300 md:hidden"
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-6 top-full rounded-2xl border border-slate-800 bg-slate-900/95 p-2 shadow-2xl shadow-black/40 backdrop-blur md:hidden"
          >
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block rounded-xl px-4 py-3 text-sm transition-colors hover:bg-slate-800 ${
                  isActive(pathname, l.href) ? "bg-slate-800/70 text-white" : "text-slate-300"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-800 py-8 text-center text-sm text-slate-500">
      © {new Date().getFullYear()} {site.name}. All rights reserved.
    </footer>
  );
}
