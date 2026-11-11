"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import { SiteFooter, SiteNav } from "@/components/site-nav";
import { withBase } from "@/lib/base-path";
import { site } from "@/lib/site";

export default function About() {
  const experience = site.experience.filter((e) => !e.placeholder);
  const education = site.education.filter((e) => !e.placeholder);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <SiteNav />

      <section className="mx-auto max-w-3xl px-6 pt-16 pb-24">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold tracking-tight md:text-6xl"
        >
          About{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">me</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400"
        >
          <span className="flex items-center gap-2">
            <MapPin className="size-4 text-pink-400" />
            {site.location}
          </span>
          <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-white">
            <Mail className="size-4 text-pink-400" />
            {site.email}
          </a>
        </motion.div>

        <div className="mt-8 space-y-5 text-lg leading-relaxed text-slate-300">
          {site.about.map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
            >
              {para}
            </motion.p>
          ))}
        </div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-14 text-2xl font-bold"
        >
          Skills
        </motion.h2>
        <div className="mt-5 flex flex-wrap gap-3">
          {site.skills.map((s, i) => (
            <motion.span
              key={s}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + i * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.08 }}
              className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-200"
            >
              {s}
            </motion.span>
          ))}
        </div>

        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-14 text-2xl font-bold"
        >
          Experience
        </motion.h2>
        <div className="mt-5 space-y-4">
          {experience.map((e, i) => (
            <motion.div
              key={e.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-semibold">
                  {e.title} <span className="font-normal text-slate-400">· {e.org}</span>
                </h3>
                <span className="font-mono text-xs text-pink-300">{e.period}</span>
              </div>
              <p className="mt-2 text-slate-400">{e.desc}</p>
            </motion.div>
          ))}
        </div>

        {education.length > 0 && (
          <>
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-14 text-2xl font-bold"
            >
              Education
            </motion.h2>
            <div className="mt-5 space-y-3">
              {education.map((e) => (
                <div key={e.title} className="flex flex-wrap items-baseline justify-between gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-5 py-4">
                  <span>
                    <span className="font-semibold">{e.title}</span> <span className="text-slate-400">· {e.org}</span>
                  </span>
                  {e.period && <span className="font-mono text-xs text-pink-300">{e.period}</span>}
                </div>
              ))}
            </div>
          </>
        )}

        <div className="mt-14 flex flex-wrap gap-3">
          <Link href="/#projects" className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-slate-200">
            See my projects →
          </Link>
          <Link
            href="/dashboards"
            className="rounded-lg border border-slate-700 px-5 py-3 text-sm font-medium text-slate-200 transition-colors hover:border-slate-500 hover:bg-slate-800 hover:text-white"
          >
            Browse dashboards →
          </Link>
          {site.resume && (
            <a
              href={withBase(site.resume)}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-slate-700 px-5 py-3 text-sm font-medium text-slate-200 transition-colors hover:border-slate-500 hover:bg-slate-800 hover:text-white"
            >
              Download résumé →
            </a>
          )}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
