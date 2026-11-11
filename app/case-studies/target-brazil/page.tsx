import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AnimatedBackground } from "@/components/animated-background";
import { Reveal } from "@/components/reveal";
import { SectionTitle } from "@/components/section-title";
import { SiteFooter, SiteNav } from "@/components/site-nav";
import { TargetDashboard } from "@/components/target-dashboard";
import { withBase } from "@/lib/base-path";

export const metadata: Metadata = {
  title: "Target Brazil SQL case study | Guntuku Hariprasad",
  description:
    "End-to-end SQL analysis of 99,441 Target orders in Brazil, built for the Scaler Target SQL business case: 30 BigQuery queries and eight recommendations.",
};

const REPO = "https://github.com/dot-hpg/target-brazil-sql-case-study";
const REPORT = `${REPO}/blob/main/report/Target_SQL_Case_Study_Guntuku_Hariprasad.pdf`;
const NOTEBOOK = `${REPO}/blob/main/notebooks/Target_Brazil_SQL_Case_Study.ipynb`;
const QUERIES = `${REPO}/blob/main/sql/bigquery/00_all_queries.sql`;
const BRIEF = `${REPO}/blob/main/docs/problem_statement.md`;

const stats = [
  { value: "99,441", label: "Orders analysed, Sep 2016 to Oct 2018" },
  { value: "30", label: "BigQuery SQL queries" },
  { value: "15", label: "Charts" },
  { value: "8", label: "Ranked recommendations" },
];

const findings = [
  { value: "+137%", title: "Growth came from volume", desc: "Order value rose from R$3.67M to R$8.69M (Jan-Aug 2017 vs 2018). Orders grew 135% while the average order stayed flat at about R$160." },
  { value: "Plateau", title: "Growth has levelled off", desc: "Orders rose from 800 in Jan 2017 to a Black Friday peak of 7,544 in Nov 2017, then held at about 6.2-7.3k a month through 2018." },
  { value: "66.5%", title: "Demand is concentrated", desc: "Two in three customers live in just three states (SP, RJ, MG), and 59.7% of sellers are in São Paulo." },
  { value: "3.5x", title: "A wide delivery gap", desc: "Delivery takes 8.3 days in São Paulo and 29.0 days in Roraima, where freight is also 2.8x higher (R$42.98 vs R$15.15)." },
  { value: "4.32 → 1.70", title: "Lateness destroys reviews", desc: "Orders delivered 15+ days early average 4.32 stars. Orders 8+ days late average 1.70, and 70% of them get 1 star." },
  { value: "96.9%", title: "Almost nobody returns", desc: "Nearly all customers ordered only once, so growth depends on winning new customers." },
];

// From outputs/results/7_1_late_delivery_vs_review_score.csv in the repo.
const reviewRows = [
  { bucket: "15+ days early", orders: "29,453", score: "4.32", oneStar: "6.66%" },
  { bucket: "8-14 days early", orders: "36,676", score: "4.32", oneStar: "6.18%" },
  { bucket: "0-7 days early", orders: "23,314", score: "4.20", oneStar: "7.11%" },
  { bucket: "1-3 days late", orders: "1,852", score: "3.29", oneStar: "25.11%" },
  { bucket: "4-7 days late", orders: "1,748", score: "2.11", oneStar: "58.47%" },
  { bucket: "8+ days late", orders: "2,781", score: "1.70", oneStar: "69.72%" },
];

const questions = [
  { group: "1. Initial exploration", count: 5, desc: "Column types, order time range, customer cities and states, a profile of every table, order status and missing timestamps." },
  { group: "2. In-depth exploration", count: 4, desc: "Yearly and monthly order trends, monthly seasonality and the time of day customers order." },
  { group: "3. Evolution by region", count: 2, desc: "Month-on-month orders in each state and how customers are spread across states." },
  { group: "4. Impact on the economy", count: 4, desc: "Cost growth from 2017 to 2018, plus total and average order price and freight for each state." },
  { group: "5. Sales, freight and delivery", count: 6, desc: "Delivery time per order, estimate vs actual, top and bottom states, and a scorecard for all 27 states." },
  { group: "6. Payments", count: 3, desc: "Month-on-month orders by payment type, each type's share and value, and orders by number of installments." },
  { group: "7. Deep-dives beyond the brief", count: 6, desc: "Lateness vs reviews, same-state vs cross-state, seller coverage, top categories, repeat customers and peak-season lateness." },
];

const recommendations = [
  { title: "Fix reliability before speed", desc: "A late order loses 0.9-2.6 review stars, while an early one gains almost nothing. Make on-time % the headline logistics KPI, and start with RJ (13.5% late, second-largest market)." },
  { title: "Recalibrate delivery estimates per state", desc: "Estimates are padded by 11 days on average and up to 20 days in the North. Show realistic dates at checkout, and add buffer in AL and MA (20-24% late)." },
  { title: "Localise supply", desc: "Same-state items arrive 2x faster with 43% lower freight. Recruit sellers in BA, PE and RJ, which have 70-180 customers per seller, and pilot a North-East cross-dock." },
  { title: "Make freight affordable in remote states", desc: "Freight is 22-29% of the item price in the North and North-East, against 14% in SP. Use bulk carrier contracts, subsidised shipping and free-shipping thresholds." },
  { title: "Plan peak capacity early", desc: "Black Friday 2017 brought 5x a normal day's orders, and late deliveries jumped to 12.4% that month. Pre-book carriers and staff from October, and widen estimates during peaks." },
  { title: "Grow basket size", desc: "Average order value has been flat at about R$160 for two years. Promote 10x interest-free plans, which already carry R$415 tickets, on high-ticket categories, and add bundles." },
  { title: "Build retention", desc: "97% of customers buy once. Loyalty programmes, post-delivery coupons and personalised recommendations are the cheapest growth available now that acquisition has plateaued." },
  { title: "Time marketing to the afternoon and evening", desc: "38% of orders arrive 13:00-18:00 and 28% at night. Focus flash sales and paid media on 13:00-22:00, and run maintenance at dawn." },
];

const methods = [
  { title: "One source of truth", desc: "Each query lives once, in BigQuery SQL. A small translator rewrites the dialect-specific functions for DuckDB, and sqlglot parses every BigQuery query as a syntax check." },
  { title: "Fully reproducible", desc: "One command, python run_all.py, rebuilds the database, queries, charts, screenshots, report and notebook from the raw CSVs in about a minute." },
  { title: "Delivery maths from the brief", desc: "time_to_deliver is delivered minus purchased, and diff_estimated_delivery is delivered minus estimated, in whole days. An order is late when the difference is above zero." },
  { title: "Counting people, not orders", desc: "Customers are counted with customer_unique_id, because customer_id is created once per order and would hide repeat buyers." },
  { title: "Documented data cleaning", desc: "The reviews file's encoding, a renamed category column and duplicate geolocation rows are all handled and written up in the repo's data notes." },
];

const stack = [
  { group: "SQL", items: ["BigQuery Standard SQL", "DuckDB", "sqlglot", "CTEs", "Window functions", "Multi-table joins"] },
  { group: "Analysis", items: ["Python", "pandas", "Jupyter"] },
  { group: "Charts", items: ["matplotlib", "Pillow"] },
  { group: "Reporting", items: ["python-docx", "nbconvert", "PDF and Word report"] },
];

const SQL = `WITH item_level AS (
  SELECT
    o.order_id,
    CASE WHEN s.seller_state = c.customer_state
         THEN 'Same state' ELSE 'Cross state' END AS route,
    oi.freight_value,
    oi.price,
    TIMESTAMP_DIFF(o.order_delivered_customer_date,
                   o.order_purchase_timestamp, DAY) AS actual_days,
    CASE WHEN TIMESTAMP_DIFF(o.order_delivered_customer_date,
                             o.order_estimated_delivery_date, DAY) > 0
         THEN 1 ELSE 0 END AS is_late
  FROM target.orders AS o
  JOIN target.customers   AS c  ON o.customer_id = c.customer_id
  JOIN target.order_items AS oi ON o.order_id = oi.order_id
  JOIN target.sellers     AS s  ON oi.seller_id = s.seller_id
  WHERE o.order_status = 'delivered'
    AND o.order_delivered_customer_date IS NOT NULL
)
SELECT
  route,
  COUNT(*) AS items,
  ROUND(100 * COUNT(*) / SUM(COUNT(*)) OVER (), 2) AS pct_of_items,
  ROUND(AVG(actual_days), 2) AS avg_delivery_days,
  ROUND(AVG(freight_value), 2) AS avg_freight,
  ROUND(100 * SUM(freight_value) / SUM(price), 2) AS freight_pct_of_price,
  ROUND(100 * AVG(is_late), 2) AS pct_late
FROM item_level
GROUP BY route
ORDER BY items DESC;`;


function Chart({ src, alt, width, height, caption }: { src: string; alt: string; width: number; height: number; caption: string }) {
  return (
    <Reveal>
      <figure>
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-white shadow-2xl shadow-indigo-950/40">
          <Image src={withBase(src)} alt={alt} width={width} height={height} className="h-auto w-full" sizes="(min-width: 1024px) 960px, 100vw" />
        </div>
        <figcaption className="mt-3 text-center text-sm text-slate-500">{caption}</figcaption>
      </figure>
    </Reveal>
  );
}

const linkBtn =
  "rounded-lg border border-slate-700 px-5 py-3 text-sm font-medium text-slate-200 transition-colors hover:border-slate-500 hover:bg-slate-800 hover:text-white";
const primaryBtn =
  "rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-slate-200";

export default function TargetBrazilCaseStudy() {
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
              Scaler program · Target SQL business case
            </span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-6xl">
              Target Brazil:{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
                e-commerce operations in SQL
              </span>
            </h1>
            <p className="mt-5 max-w-3xl text-xl leading-relaxed text-slate-300">
              What drives growth, delivery performance and customer satisfaction across Brazil? A full SQL analysis of
              two years of orders, ending in eight recommendations the business can act on.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={REPO} target="_blank" rel="noreferrer" className={primaryBtn}>
                View the code on GitHub →
              </a>
              <a href={REPORT} target="_blank" rel="noreferrer" className={linkBtn}>
                Read the report (PDF) →
              </a>
              <a href={NOTEBOOK} target="_blank" rel="noreferrer" className={linkBtn}>
                Open the notebook →
              </a>
              <a href={QUERIES} target="_blank" rel="noreferrer" className={linkBtn}>
                See all queries →
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((s) => (
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

      <div className="mx-auto max-w-5xl space-y-24 px-6 pb-28">
        {/* Brief */}
        <section>
          <SectionTitle kicker="The brief" title="What the business case asked" />
          <Reveal className="mt-6 grid gap-6 md:grid-cols-2">
            <p className="text-lg leading-relaxed text-slate-300">
              Target is a major US retailer, and this case looks at its operations in Brazil. Acting as a data analyst
              at Target, the task was to analyse about 100,000 orders from 2016 to 2018, then extract insights and
              make actionable recommendations.
            </p>
            <p className="text-lg leading-relaxed text-slate-300">
              I answered{" "}
              <a href={BRIEF} target="_blank" rel="noreferrer" className="text-indigo-300 underline underline-offset-4 hover:text-white">
                every question in the brief
              </a>{" "}
              with a query, then added six deep-dives of my own to explain <b className="text-white">why</b> the
              numbers look the way they do.
            </p>
          </Reveal>
        </section>

        {/* Findings */}
        <section>
          <SectionTitle kicker="Key findings" title="What the data showed" />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {findings.map((f, i) => (
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

        {/* Interactive dashboard */}
        <section>
          <SectionTitle kicker="Interactive dashboard" title="Explore the results yourself" />
          <Reveal>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300">
              The query results, rebuilt as a live dashboard. Hover the trends, then switch the state scorecard between
              delivery time, lateness, freight and volume to see where the network struggles.
            </p>
          </Reveal>
          <Reveal className="mt-8">
            <TargetDashboard />
          </Reveal>
        </section>

        {/* Reviews */}
        <section>
          <SectionTitle kicker="The biggest insight" title="Late delivery is what customers punish" />
          <Reveal>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300">
              Arriving early barely raises review scores, but arriving late drags them down fast. That is why the first
              recommendation is to fix reliability before chasing speed.
            </p>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-800">
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead className="bg-slate-900 text-slate-300">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Delivered</th>
                    <th className="px-5 py-3 font-semibold">Orders</th>
                    <th className="px-5 py-3 font-semibold">Avg review</th>
                    <th className="px-5 py-3 font-semibold">1-star share</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-400">
                  {reviewRows.map((r) => (
                    <tr key={r.bucket}>
                      <td className="px-5 py-3 text-slate-200">{r.bucket}</td>
                      <td className="px-5 py-3">{r.orders}</td>
                      <td className="px-5 py-3">{r.score}</td>
                      <td className="px-5 py-3">{r.oneStar}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <div className="mt-10">
            <Chart
              src="/case-studies/target-brazil/10_review_score_vs_delivery_delay.png"
              alt="Chart of average review score falling sharply as orders arrive later"
              width={1870}
              height={748}
              caption="Review scores against delivery delay."
            />
          </div>
        </section>

        {/* SQL */}
        <section>
          <SectionTitle kicker="The SQL" title="Same state or cross state?" />
          <Reveal>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300">
              One of the deep-dives beyond the brief. It joins four tables to compare orders where the seller is in the
              customer&apos;s state with those shipped from elsewhere.
            </p>
            <pre className="mt-6 overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/80 p-5 font-mono text-xs leading-relaxed text-slate-300 md:text-sm">
              <code>{SQL}</code>
            </pre>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
                <div className="font-semibold">Same state</div>
                <p className="mt-2 text-sm text-slate-400">7.46 days · R$13.45 average freight · 4.45% late</p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
                <div className="font-semibold">Cross state</div>
                <p className="mt-2 text-sm text-slate-400">14.58 days · R$23.63 average freight · 7.81% late</p>
              </div>
            </div>
          </Reveal>
          <div className="mt-10">
            <Chart
              src="/case-studies/target-brazil/13_same_vs_cross_state.png"
              alt="Comparison of delivery time and freight for same-state and cross-state orders"
              width={1870}
              height={612}
              caption="Same-state orders arrive twice as fast, with 43% lower freight."
            />
          </div>
        </section>

        {/* Questions */}
        <section>
          <SectionTitle kicker="Coverage" title="All 30 queries" />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {questions.map((q, i) => (
              <Reveal key={q.group} delay={i * 0.03} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-semibold">{q.group}</h3>
                  <span className="shrink-0 text-sm text-pink-300">{q.count} queries</span>
                </div>
                <p className="mt-2 text-sm text-slate-400">{q.desc}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Delivery charts */}
        <section>
          <SectionTitle kicker="Delivery" title="Where the network struggles" />
          <div className="mt-8 space-y-10">
            <Chart
              src="/case-studies/target-brazil/14_delivery_time_map.png"
              alt="Map of Brazil shaded by average delivery time in each state"
              width={1360}
              height={1360}
              caption="Average delivery time by state: the gap between the South-East and the North is clear."
            />
            <Chart
              src="/case-studies/target-brazil/08_delivery_actual_vs_estimate.png"
              alt="Chart comparing actual and estimated delivery times by state"
              width={1700}
              height={1190}
              caption="Actual vs estimated delivery: estimates are padded by 11 days on average."
            />
            <Chart
              src="/case-studies/target-brazil/15_late_delivery_rate_trend.png"
              alt="Line chart of the monthly late delivery rate with spikes after demand peaks"
              width={1700}
              height={748}
              caption="Late deliveries spike after demand peaks: Black Friday 2017 and the Q1 2018 surge."
            />
          </div>
        </section>

        {/* Recommendations */}
        <section>
          <SectionTitle kicker="Recommendations" title="Eight actions, ranked" />
          <div className="mt-8 space-y-4">
            {recommendations.map((r, i) => (
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
          <SectionTitle kicker="Method" title="How I kept the work trustworthy" />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {methods.map((m, i) => (
              <Reveal key={m.title} delay={i * 0.04} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
                <h3 className="font-semibold">{m.title}</h3>
                <p className="mt-2 text-slate-400">{m.desc}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-10">
            <Chart
              src="/case-studies/target-brazil/schema.png"
              alt="Database schema showing the tables in the dataset and how they connect"
              width={1600}
              height={962}
              caption="The dataset: 8 connected tables, from orders and customers to reviews and geolocation."
            />
          </div>
        </section>

        {/* Stack */}
        <section>
          <SectionTitle kicker="Tools" title="Tools I used" />
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {stack.map((s) => (
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
            Every query, result, chart and the full report are on GitHub, ready to rerun.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={REPO} target="_blank" rel="noreferrer" className={primaryBtn}>
              View on GitHub →
            </a>
            <a href={REPORT} target="_blank" rel="noreferrer" className={linkBtn}>
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
