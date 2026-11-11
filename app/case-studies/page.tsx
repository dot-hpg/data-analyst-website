import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedBackground } from "@/components/animated-background";
import { Reveal } from "@/components/reveal";
import { SiteFooter, SiteNav } from "@/components/site-nav";
import { withBase } from "@/lib/base-path";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Case studies | Guntuku Hariprasad",
  description:
    "Business case studies by Guntuku Hariprasad, a Data Analyst: SQL, exploratory analysis, statistics and recommendations for Target, Walmart, Netflix and more.",
};

export default function CaseStudies() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="relative">
        <AnimatedBackground trendLine={false} />
        <SiteNav />
        <section className="relative z-10 mx-auto max-w-5xl px-6 pt-16 pb-16">
          <Reveal>
            <h1 className="text-5xl font-extrabold tracking-tight md:text-7xl">
              Case{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">studies</span>
            </h1>
            <p className="mt-5 max-w-3xl text-xl leading-relaxed text-slate-300">
              Business case studies from the Scaler Data Science &amp; Machine Learning program. Each one starts from a
              real business question, works through the data in SQL or Python, and ends with recommendations backed by
              the evidence.
            </p>
          </Reveal>
        </section>
      </div>

      <section className="mx-auto max-w-5xl space-y-8 px-6 pb-28">
        {site.caseStudies.map((p, i) => (
          <Reveal
            key={p.title}
            className="rounded-2xl border border-indigo-500/40 bg-gradient-to-br from-indigo-950/50 to-slate-900/60 p-7 md:p-10"
          >
            <span className="w-fit rounded-full bg-pink-500/15 px-3 py-1 text-xs font-medium text-pink-300">
              Case study {i + 1}
              {p.badge && ` · ${p.badge}`}
            </span>
            <h2 className="mt-4 text-2xl font-semibold md:text-3xl">{p.title}</h2>
            <p className="mt-3 max-w-3xl text-slate-400 md:text-lg">{p.desc}</p>

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

            {(p.caseStudy || p.links) && (
              <div className="mt-6 flex flex-wrap gap-3 pt-1">
                {p.caseStudy && (
                  <Link
                    href={p.caseStudy}
                    className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-950 transition-colors hover:bg-slate-200"
                  >
                    Read the full case study →
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
          </Reveal>
        ))}
      </section>

      <SiteFooter />
    </main>
  );
}
