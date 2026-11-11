import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnimatedBackground } from "@/components/animated-background";
import { Reveal } from "@/components/reveal";
import { SectionTitle } from "@/components/section-title";
import { SiteFooter, SiteNav } from "@/components/site-nav";
import { withBase } from "@/lib/base-path";
import { caseStudies } from "@/lib/case-studies";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((c) => c.slug === slug);
  if (!study) return {};
  return {
    title: `${study.titleLead.replace(":", "")} case study | Guntuku Hariprasad`,
    description: study.metaDescription,
  };
}


const linkBtn =
  "rounded-lg border border-slate-700 px-5 py-3 text-sm font-medium text-slate-200 transition-colors hover:border-slate-500 hover:bg-slate-800 hover:text-white";
const primaryBtn =
  "rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-slate-200";

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = caseStudies.find((c) => c.slug === slug);
  if (!study) notFound();

  const report = study.reportFile ? withBase(study.reportFile) : `${study.repo}/blob/main/${study.report}`;

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Hero */}
      <div className="relative">
        <AnimatedBackground />
        <SiteNav />
        <section className="relative z-10 mx-auto max-w-5xl px-6 pt-16 pb-20">
          <Link href="/case-studies" className="text-sm text-slate-400 hover:text-white">
            ← All case studies
          </Link>
          <Reveal>
            <span className="mt-8 inline-block rounded-full border border-pink-500/40 bg-pink-500/10 px-4 py-1.5 text-sm font-medium text-pink-300">
              Scaler program · {study.caseName}
            </span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-6xl">
              {study.titleLead}{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
                {study.titleAccent}
              </span>
            </h1>
            <p className="mt-5 max-w-3xl text-xl leading-relaxed text-slate-300">{study.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {study.repo && (
                <a href={study.repo} target="_blank" rel="noreferrer" className={primaryBtn}>
                  View the code on GitHub →
                </a>
              )}
              <a href={report} target="_blank" rel="noreferrer" className={study.repo ? linkBtn : primaryBtn}>
                Read the report (PDF) →
              </a>
              {study.repo && (
                <>
                  <a href={`${study.repo}/blob/main/${study.notebook}`} target="_blank" rel="noreferrer" className={linkBtn}>
                    Open the notebook →
                  </a>
                  <a
                    href={`${study.repo}/blob/main/reports/insights_and_recommendations.md`}
                    target="_blank"
                    rel="noreferrer"
                    className={linkBtn}
                  >
                    Insights summary →
                  </a>
                </>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.15} className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {study.stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">
                <div className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
                  {s.value}
                </div>
                <div className="mt-1 text-sm text-slate-400">{s.label}</div>
              </div>
            ))}
          </Reveal>
        </section>
      </div>

      <div className="mx-auto max-w-5xl space-y-24 px-6 pb-28">
        {/* Brief */}
        <section>
          <SectionTitle kicker="The brief" title="What the business case asked" />
          <Reveal className="mt-6 grid gap-6 md:grid-cols-2">
            {study.brief.map((para) => (
              <p key={para} className="text-lg leading-relaxed text-slate-300">
                {para}
              </p>
            ))}
          </Reveal>
        </section>

        {/* Findings */}
        <section>
          <SectionTitle kicker="Key findings" title="What the data showed" />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {study.findings.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.04} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
                <div className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-3xl font-bold text-transparent">
                  {f.value}
                </div>
                <h3 className="mt-2 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-slate-400">{f.desc}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Results table */}
        <section>
          <SectionTitle kicker={study.table.kicker} title={study.table.title} />
          <Reveal>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300">{study.table.intro}</p>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-800">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead className="bg-slate-900 text-slate-300">
                  <tr>
                    {study.table.headers.map((h) => (
                      <th key={h} className="px-5 py-3 font-semibold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-400">
                  {study.table.rows.map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell, i) => (
                        <td key={i} className={`px-5 py-3 ${i === 0 ? "text-slate-200" : ""}`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </section>

        {/* Charts */}
        <section>
          <SectionTitle kicker="Charts" title="The evidence" />
          <div className="mt-8 space-y-10">
            {study.charts.map((c) => (
              <Reveal key={c.src}>
                <figure className={c.narrow ? "mx-auto max-w-xl" : ""}>
                  <div className="overflow-hidden rounded-2xl border border-slate-800 bg-white shadow-2xl shadow-indigo-950/40">
                    <Image src={withBase(c.src)} alt={c.alt} width={c.width} height={c.height} className="h-auto w-full" sizes="(min-width: 1024px) 960px, 100vw" />
                  </div>
                  <figcaption className="mt-3 text-center text-sm text-slate-500">{c.caption}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Recommendations */}
        <section>
          <SectionTitle kicker="Recommendations" title={study.recommendationsTitle ?? "What the business should do"} />
          <div className="mt-8 space-y-4">
            {study.recommendations.map((r, i) => (
              <Reveal key={r.title} className="flex gap-5 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
                <span className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text font-mono text-2xl font-bold text-transparent">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold">{r.title}</h3>
                  <p className="mt-1 text-slate-400">{r.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Method */}
        <section>
          <SectionTitle kicker="Method" title="How I did the analysis" />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {study.method.map((m, i) => (
              <Reveal key={m.title} delay={i * 0.04} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
                <h3 className="font-semibold">{m.title}</h3>
                <p className="mt-2 text-slate-400">{m.desc}</p>
              </Reveal>
            ))}
          </div>
          {study.note && (
            <Reveal className="mt-5 rounded-2xl border border-pink-500/30 bg-pink-500/5 p-6">
              <h3 className="font-semibold">{study.note.title}</h3>
              <p className="mt-2 text-slate-400">{study.note.desc}</p>
            </Reveal>
          )}
        </section>

        {/* Stack */}
        <section>
          <SectionTitle kicker="Tools" title="Tools I used" />
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {study.stack.map((s) => (
              <Reveal key={s.group} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
                <h3 className="font-semibold">{s.group}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {s.items.map((item) => (
                    <span key={item} className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                      {item}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <Reveal className="rounded-3xl border border-slate-800 bg-gradient-to-br from-indigo-950/60 to-slate-900 p-10 text-center md:p-14">
          <h2 className="text-3xl font-bold md:text-4xl">See the full analysis</h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            {study.repo
              ? "The notebook, data, charts and full report are all on GitHub."
              : "The code, outputs and charts are all in the full PDF report."}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {study.repo && (
              <a href={study.repo} target="_blank" rel="noreferrer" className={primaryBtn}>
                View on GitHub →
              </a>
            )}
            <a href={report} target="_blank" rel="noreferrer" className={study.repo ? linkBtn : primaryBtn}>
              Read the report →
            </a>
            <Link href="/case-studies" className={linkBtn}>
              All case studies →
            </Link>
          </div>
        </Reveal>
      </div>

      <SiteFooter />
    </main>
  );
}
