"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChartColumn, ChartPie, Code, Database, FileSpreadsheet, Sigma } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedBackground } from "@/components/animated-background";
import { CountUp } from "@/components/count-up";
import { DashboardCard } from "@/components/dashboard-gallery";
import { InsightLab } from "@/components/insight-lab";
import { SiteFooter, SiteNav } from "@/components/site-nav";
import { withBase } from "@/lib/base-path";
import { site } from "@/lib/site";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const skillIcons = {
  sql: Database,
  python: Code,
  excel: FileSpreadsheet,
  powerbi: ChartColumn,
  tableau: ChartPie,
  stats: Sigma,
};

const heroTools = ["SQL", "Python", "Excel", "Power BI", "Tableau", "Statistics"];

function SectionHeading({ kicker, title, intro }: { kicker: string; title: string; intro: string }) {
  return (
    <>
      <motion.p
        {...fadeUp}
        transition={{ duration: 0.5 }}
        className="font-mono text-xs font-semibold tracking-[0.18em] text-pink-400 uppercase"
      >
        {kicker}
      </motion.p>
      <motion.h2 {...fadeUp} transition={{ delay: 0.05, duration: 0.5 }} className="mt-3 text-3xl font-bold md:text-4xl">
        {title}
      </motion.h2>
      <p className="mt-3 max-w-2xl text-slate-400">{intro}</p>
    </>
  );
}

export default function Home() {
  const experience = site.experience.filter((e) => !e.placeholder);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Hero */}
      <div className="relative">
        <AnimatedBackground />
        <SiteNav />
        <section className="relative z-10 flex flex-col items-center px-6 pt-24 pb-36 text-center">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-4 py-1 text-sm text-slate-300"
          >
            {site.availability && (
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
            )}
            {site.availability ? `${site.role} · ${site.availability}` : site.role}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="mt-6 text-5xl font-extrabold tracking-tight md:text-7xl"
          >
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
              {site.shortName}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mt-6 max-w-xl text-lg text-slate-400"
          >
            {site.tagline}
          </motion.p>

          <motion.ul
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.55 } } }}
            className="mt-7 flex max-w-xl flex-wrap justify-center gap-2"
          >
            {heroTools.map((t) => (
              <motion.li
                key={t}
                variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                className="rounded-full border border-slate-800 bg-slate-900/70 px-3 py-1 font-mono text-xs text-slate-300"
              >
                {t}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <Button
              size="lg"
              className="h-11 bg-white px-6 text-slate-950 hover:bg-slate-200"
              nativeButton={false}
              render={<Link href="/#projects" />}
            >
              View my work
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-11 border-slate-700 bg-transparent px-6 text-white hover:bg-slate-800 hover:text-white"
              nativeButton={false}
              render={<Link href="/dashboards" />}
            >
              See dashboards
            </Button>
            {site.resume && (
              <Button
                size="lg"
                variant="outline"
                className="h-11 border-slate-700 bg-transparent px-6 text-white hover:bg-slate-800 hover:text-white"
                nativeButton={false}
                render={<a href={withBase(site.resume)} target="_blank" rel="noreferrer" />}
              >
                Résumé
              </Button>
            )}
          </motion.div>
        </section>
      </div>

      {/* Stats */}
      <section className="relative z-10 mx-auto -mt-16 max-w-6xl px-6">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-800 bg-slate-800 md:grid-cols-4"
        >
          {site.stats.map((s) => (
            <div key={s.label} className="bg-slate-900/95 p-6 backdrop-blur md:p-7">
              <div className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
                <CountUp value={s.value} decimals={s.decimals} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-sm text-slate-400">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Skills */}
      <section id="skills" className="mx-auto max-w-6xl scroll-mt-8 px-6 pt-24">
        <SectionHeading
          kicker="Toolkit"
          title="Skills"
          intro="The tools I reach for at each step, from pulling the data to presenting the answer."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {site.skillGroups.map((g, i) => {
            const Icon = skillIcons[g.icon];
            return (
              <motion.div
                key={g.name}
                {...fadeUp}
                transition={{ delay: (i % 3) * 0.1, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition-colors hover:border-indigo-500/60"
              >
                <div className="absolute -top-16 -right-16 size-40 rounded-full bg-indigo-500/10 blur-2xl transition-colors group-hover:bg-pink-500/15" />
                <div className="relative flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-300">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="text-xl font-semibold">{g.name}</h3>
                </div>
                <p className="relative mt-3 text-sm text-slate-400">{g.summary}</p>
                <div className="relative mt-4 flex flex-wrap gap-1.5">
                  {g.items.map((t) => (
                    <span key={t} className="rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="mx-auto max-w-6xl scroll-mt-8 px-6 py-24">
        <SectionHeading
          kicker="Selected work"
          title="Projects"
          intro="Analytics projects that start with a business question and end with what to do about it."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {site.projects.map((p, i) => (
            <motion.div
              key={p.title}
              {...fadeUp}
              transition={{ delay: p.featured ? 0 : (i % 3) * 0.15, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className={`group flex flex-col rounded-2xl border p-7 transition-colors ${
                p.featured
                  ? "border-indigo-500/40 bg-gradient-to-br from-indigo-950/50 to-slate-900/60 hover:border-indigo-400/70 md:col-span-3 md:p-10"
                  : "border-slate-800 bg-slate-900/60 hover:border-indigo-500/60"
              }`}
            >
              {p.featured && (
                <span
                  className={`mb-4 w-fit rounded-full px-3 py-1 text-xs font-medium ${
                    p.badge ? "bg-pink-500/15 text-pink-300" : "bg-indigo-500/15 text-indigo-300"
                  }`}
                >
                  {p.badge ?? "Featured project"}
                </span>
              )}
              <h3 className={p.featured ? "text-2xl font-semibold md:text-3xl" : "text-xl font-semibold"}>{p.title}</h3>
              <p className={`mt-2 text-slate-400 ${p.featured ? "max-w-3xl md:text-lg" : ""}`}>{p.desc}</p>

              {p.highlights && (
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {p.highlights.map((h) => (
                    <div key={h.label} className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                      <div className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-3xl font-bold text-transparent">
                        {h.value}
                      </div>
                      <div className="mt-1 text-sm text-slate-400">{h.label}</div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-5 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                    {t}
                  </span>
                ))}
              </div>

              {(p.links || p.caseStudy) && (
                <div className="mt-auto flex flex-wrap gap-3 pt-7">
                  {p.caseStudy && (
                    <Link
                      href={p.caseStudy}
                      className={
                        p.featured
                          ? "rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-950 transition-colors hover:bg-slate-200"
                          : "rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-200 transition-colors hover:border-slate-500 hover:bg-slate-800 hover:text-white"
                      }
                    >
                      {p.featured ? "Read the full case study →" : "Case study →"}
                    </Link>
                  )}
                  {p.links?.map((l) => (
                    <a
                      key={l.href}
                      href={withBase(l.href)}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-200 transition-colors hover:border-slate-500 hover:bg-slate-800 hover:text-white"
                    >
                      {l.label} →
                    </a>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="mt-8 text-center">
          <Link href="/case-studies" className="text-sm text-indigo-300 hover:text-white">
            See all {site.caseStudies.length} business case studies →
          </Link>
        </motion.div>
      </section>

      {/* Insight lab */}
      <section id="insights" className="mx-auto max-w-6xl scroll-mt-8 px-6 pb-24">
        <SectionHeading
          kicker="From query to insight"
          title="Insight lab"
          intro="Real queries and code from my case studies, next to the charts they produce. Pick a question, then hover the chart."
        />
        <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="mt-10">
          <InsightLab />
        </motion.div>
      </section>

      {/* Dashboards */}
      <section id="dashboards" className="mx-auto max-w-6xl scroll-mt-8 px-6 pb-24">
        <SectionHeading
          kicker="Business intelligence"
          title="Dashboards"
          intro="Power BI and Tableau dashboards built for operations, audit, HR and customer-service teams. Click one to see every page."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {site.dashboards.slice(0, 3).map((d, i) => (
            <DashboardCard key={d.slug} d={d} index={i} />
          ))}
        </div>
        <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="mt-8 text-center">
          <Link
            href="/dashboards"
            className="inline-block rounded-lg border border-slate-700 px-5 py-2.5 text-sm text-slate-200 transition-colors hover:border-slate-500 hover:bg-slate-800 hover:text-white"
          >
            View all {site.dashboards.length} dashboards →
          </Link>
        </motion.div>
      </section>

      {/* Process */}
      <section id="process" className="mx-auto max-w-6xl scroll-mt-8 px-6 pb-24">
        <SectionHeading
          kicker="How I work"
          title="My analysis process"
          intro="Every project follows the same five steps, so the result is something a team can trust and act on."
        />
        <div className="relative mt-12">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute top-5 right-[10%] left-[10%] hidden h-px origin-left bg-gradient-to-r from-indigo-500 via-pink-500 to-cyan-500 md:block"
          />
          <ol className="grid gap-6 md:grid-cols-5">
            {site.process.map((s, i) => (
              <motion.li
                key={s.title}
                {...fadeUp}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
                className="relative flex gap-4 md:flex-col md:items-center md:text-center"
              >
                <span className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-indigo-500/50 bg-slate-950 font-mono text-sm font-bold text-indigo-300 shadow-[0_0_24px_-4px] shadow-indigo-500/50">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold md:mt-4">{s.title}</h3>
                  <p className="mt-1 text-sm text-slate-400">{s.desc}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="mx-auto max-w-6xl scroll-mt-8 px-6 pb-24">
        <SectionHeading kicker="Background" title="Experience" intro="Where I've built my analytics skills." />
        <div className="mt-10 space-y-5 border-l border-slate-800 pl-6 md:pl-8">
          {experience.map((e, i) => (
            <motion.div
              key={e.title}
              {...fadeUp}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative rounded-2xl border border-slate-800 bg-slate-900/60 p-6"
            >
              <span className="absolute top-8 -left-[31px] size-3 rounded-full border-2 border-slate-950 bg-gradient-to-r from-indigo-400 to-pink-400 md:-left-[39px]" />
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold">
                  {e.title} <span className="font-normal text-slate-400">· {e.org}</span>
                </h3>
                <span className="font-mono text-xs text-pink-300">{e.period}</span>
              </div>
              <p className="mt-2 text-slate-400">{e.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {e.tags.map((t) => (
                  <span key={t} className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl scroll-mt-8 px-6 pb-28">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-slate-800 bg-gradient-to-br from-indigo-950/60 to-slate-900 p-10 text-center md:p-16"
        >
          <h2 className="text-3xl font-bold md:text-4xl">Let&apos;s find the story in your data</h2>
          <p className="mx-auto mt-4 max-w-lg text-slate-400">
            Hiring a data analyst, or have a question your data should be able to answer? I&apos;d love to hear about it.
          </p>
          <Button
            size="lg"
            className="mt-8 h-11 bg-white px-6 text-slate-950 hover:bg-slate-200"
            nativeButton={false}
            render={<a href={`mailto:${site.email}`} />}
          >
            Say hello
          </Button>
          <p className="mt-4 font-mono text-sm text-slate-500">{site.email}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-slate-400">
            {site.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="hover:text-white">
                {s.label}
              </a>
            ))}
          </div>
        </motion.div>
      </section>

      <SiteFooter />
    </main>
  );
}
