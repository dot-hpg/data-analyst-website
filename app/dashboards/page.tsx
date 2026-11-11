import type { Metadata } from "next";
import { AnimatedBackground } from "@/components/animated-background";
import { DashboardCard } from "@/components/dashboard-gallery";
import { Reveal } from "@/components/reveal";
import { SiteFooter, SiteNav } from "@/components/site-nav";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Dashboards | Guntuku Hariprasad",
  description: "Power BI and Tableau dashboards by Guntuku Hariprasad for operations, audit, education, HR and customer-service teams.",
};

export default function Dashboards() {
  const tools = ["Power BI", "Tableau"] as const;
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="relative">
        <AnimatedBackground trendLine={false} />
        <SiteNav />
        <section className="relative z-10 mx-auto max-w-6xl px-6 pt-16 pb-16">
          <Reveal>
            <h1 className="text-5xl font-extrabold tracking-tight md:text-7xl">
              <span className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">Dashboards</span>
            </h1>
            <p className="mt-5 max-w-3xl text-xl leading-relaxed text-slate-300">
              Interactive reports that let a team answer its own questions. Each one starts with the decisions people
              need to make, then models the data and lays out the KPIs, trends and drill-downs that support them.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { value: site.dashboards.filter((d) => d.tool === "Power BI").length, label: "Power BI reports" },
              { value: site.dashboards.filter((d) => d.tool === "Tableau").length, label: "Tableau dashboards" },
              { value: site.dashboards.reduce((n, d) => n + d.images.length, 0), label: "Report pages" },
              { value: new Set(site.dashboards.map((d) => d.domain)).size, label: "Business areas" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">
                <div className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-3xl font-bold text-transparent">
                  {s.value}
                </div>
                <div className="mt-1 text-sm text-slate-400">{s.label}</div>
              </div>
            ))}
          </Reveal>
        </section>
      </div>

      <div className="mx-auto max-w-6xl space-y-20 px-6 pb-28">
        {tools.map((tool) => (
          <section key={tool}>
            <Reveal>
              <p className="font-mono text-xs font-semibold tracking-[0.18em] text-pink-400 uppercase">{tool}</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                {tool === "Power BI" ? "Power BI reports" : "Tableau dashboards"}
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {site.dashboards
                .filter((d) => d.tool === tool)
                .map((d, i) => (
                  <DashboardCard key={d.slug} d={d} index={i} detailed />
                ))}
            </div>
          </section>
        ))}

        <Reveal className="rounded-3xl border border-slate-800 bg-gradient-to-br from-indigo-950/60 to-slate-900 p-10 text-center md:p-14">
          <h2 className="text-3xl font-bold md:text-4xl">Want to explore the files?</h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            The .pbix and .twbx workbooks are on GitHub. Open them in Power BI Desktop or Tableau to click through every
            filter.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="https://github.com/dot-hpg/power-BI-projects-data-analysis"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-slate-200"
            >
              Power BI projects →
            </a>
            <a
              href="https://github.com/dot-hpg/tableau-projects-data-analysis"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-slate-700 px-5 py-3 text-sm font-medium text-slate-200 transition-colors hover:border-slate-500 hover:bg-slate-800 hover:text-white"
            >
              Tableau projects →
            </a>
          </div>
        </Reveal>
      </div>

      <SiteFooter />
    </main>
  );
}
