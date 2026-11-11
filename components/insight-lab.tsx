"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { BarChart, Legend, LineChart, SERIES } from "@/components/charts";
import { CodeBlock } from "@/components/code-block";
import { netflixTvShare, targetMonthlyOrders, targetReviewByDelivery, yuluHourly } from "@/lib/showcase-data";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const fmtMonth = (v: string | number) => {
  const [y, m] = String(v).split("-");
  return `${MONTHS[Number(m) - 1]} ${y.slice(2)}`;
};
const fmtHour = (v: string | number) => {
  const h = Number(v);
  return h === 0 ? "12am" : h < 12 ? `${h}am` : h === 12 ? "12pm" : `${h - 12}pm`;
};

const tabs = [
  {
    id: "reviews",
    tool: "SQL",
    dataset: "Target Brazil · 95,824 delivered orders with reviews",
    question: "Do late deliveries hurt review scores?",
    insight:
      "Arriving early barely moves the score, but arriving late drags it down fast: orders 8+ days late average 1.70 stars, and 70% of them get 1 star. Reliability matters more than speed.",
    href: "/case-studies/target-brazil",
    file: "7_1_late_delivery_vs_review_score.sql",
    lang: "sql" as const,
    code: `WITH d AS (
  SELECT o.order_id,
    TIMESTAMP_DIFF(o.order_delivered_customer_date,
                   o.order_estimated_delivery_date, DAY) AS days_vs_estimate
  FROM target.orders AS o
  WHERE o.order_status = 'delivered'
),
r AS (
  SELECT order_id, AVG(review_score) AS review_score
  FROM target.order_reviews
  GROUP BY order_id
)
SELECT
  CASE
    WHEN d.days_vs_estimate <= -15 THEN '15+ days early'
    WHEN d.days_vs_estimate <= -8  THEN '8-14 days early'
    WHEN d.days_vs_estimate <= 0   THEN '0-7 days early'
    WHEN d.days_vs_estimate <= 3   THEN '1-3 days late'
    WHEN d.days_vs_estimate <= 7   THEN '4-7 days late'
    ELSE '8+ days late'
  END AS delivery_bucket,
  COUNT(*) AS orders,
  ROUND(AVG(r.review_score), 2) AS avg_review_score,
  ROUND(100 * AVG(CASE WHEN r.review_score <= 1
                       THEN 1 ELSE 0 END), 2) AS pct_1_star
FROM d JOIN r ON d.order_id = r.order_id
GROUP BY delivery_bucket;`,
  },
  {
    id: "growth",
    tool: "SQL",
    dataset: "Target Brazil · 99,441 orders",
    question: "Is the business still growing?",
    insight:
      "Orders grew ninefold through 2017 and peaked at 7,544 on Black Friday, then held flat at 6-7k a month in 2018. Growth has plateaued, so retention and basket size are the next levers.",
    href: "/case-studies/target-brazil",
    file: "2_2_monthly_trend.sql",
    lang: "sql" as const,
    code: `WITH monthly AS (
  SELECT
    FORMAT_TIMESTAMP('%Y-%m', order_purchase_timestamp) AS order_month,
    COUNT(*) AS total_orders
  FROM target.orders
  GROUP BY order_month
)
SELECT
  order_month,
  total_orders,
  -- month-on-month change with a window function
  total_orders - LAG(total_orders) OVER (ORDER BY order_month) AS mom_change,
  ROUND(AVG(total_orders) OVER (
          ORDER BY order_month
          ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 0) AS rolling_3m_avg
FROM monthly
ORDER BY order_month;`,
  },
  {
    id: "yulu",
    tool: "Python",
    dataset: "Yulu · 10,886 hourly rental records",
    question: "When do people actually ride?",
    insight:
      "Working days have two sharp commuter peaks at 8am and 5-6pm, while weekends and holidays build to a single midday hump. Same total demand, completely different shape, so fleet rebalancing should follow the calendar.",
    href: "/case-studies/yulu",
    file: "yulu_hourly_profile.py",
    lang: "python" as const,
    code: `import pandas as pd

df = pd.read_csv("data/yulu_bike_sharing.csv",
                 parse_dates=["datetime"])
df["hour"] = df["datetime"].dt.hour

# Mean rentals for each hour, split by working day
hourly = (
    df.groupby(["workingday", "hour"])["count"]
      .mean()
      .round()
      .unstack(0)
      .rename(columns={1: "working_day", 0: "non_working_day"})
)

hourly.plot(title="Average rentals by hour")`,
  },
  {
    id: "netflix",
    tool: "Python",
    dataset: "Netflix · 8,807 titles",
    question: "Is Netflix shifting from movies to TV?",
    insight:
      "TV's share of new additions fell to 25% in 2018 as the movie library ballooned, then climbed every year to 34% in 2021. Netflix is quietly pivoting back to series.",
    href: "/case-studies/netflix",
    file: "netflix_tv_share.py",
    lang: "python" as const,
    code: `import pandas as pd

df = pd.read_csv("data/processed/netflix_cleaned.csv")

added = (
    df.query("year_added >= 2015")
      .groupby(["year_added", "type"])
      .size()
      .unstack()
)

# TV shows as a share of everything added that year
added["tv_share"] = (
    added["TV Show"] / added.sum(axis=1) * 100
).round(1)`,
  },
];

function TabChart({ id }: { id: string }) {
  if (id === "reviews")
    return (
      <>
        <div className="mb-3">
          <Legend
            items={[
              { label: "Early or on time", color: SERIES[0] },
              { label: "Late", color: SERIES[1] },
            ]}
          />
        </div>
        <BarChart
          data={targetReviewByDelivery}
          x="bucket"
          y="score"
          maxOverride={5}
          formatY={(v) => v.toFixed(v % 1 ? 2 : 0)}
          colorFor={(d) => (d.bucket.includes("late") ? SERIES[1] : SERIES[0])}
          tipRows={(d) => [
            { label: "Avg review", value: `${d.score.toFixed(2)} ★` },
            { label: "Orders", value: d.orders.toLocaleString("en-US") },
            { label: "1-star share", value: `${d.oneStar}%` },
          ]}
          ariaLabel="Bar chart: average review score by delivery timing. 15+ days early 4.32, 8-14 days early 4.32, 0-7 days early 4.20, 1-3 days late 3.29, 4-7 days late 2.11, 8+ days late 1.70."
        />
      </>
    );
  if (id === "growth")
    return (
      <LineChart
        data={targetMonthlyOrders}
        x="month"
        series={[{ key: "orders", label: "Orders", color: SERIES[0] }]}
        formatX={fmtMonth}
        formatY={(v) => (v >= 1000 ? `${(v / 1000).toFixed(v % 1000 ? 1 : 0)}k` : String(v))}
        xTickEvery={4}
        annotations={[{ index: 10, label: "Black Friday · 7,544" }]}
        ariaLabel="Line chart of monthly orders from January 2017 to August 2018, rising from 800 to a peak of 7,544 in November 2017, then flat around 6,000 to 7,000."
      />
    );
  if (id === "yulu")
    return (
      <>
        <div className="mb-3">
          <Legend
            items={[
              { label: "Working day", color: SERIES[0] },
              { label: "Weekend or holiday", color: SERIES[1] },
            ]}
          />
        </div>
        <LineChart
          data={yuluHourly}
          x="hour"
          area={false}
          series={[
            { key: "workingDay", label: "Working day", color: SERIES[0] },
            { key: "nonWorkingDay", label: "Weekend or holiday", color: SERIES[1] },
          ]}
          formatX={fmtHour}
          xTickEvery={4}
          annotations={[{ index: 17, label: "5pm commute · 529" }]}
          ariaLabel="Line chart of average Yulu rentals by hour. Working days peak at 8am (480) and 5pm (529); weekends peak around 1pm (388)."
        />
      </>
    );
  return (
    <BarChart
      data={netflixTvShare}
      x="year"
      y="tv"
      maxOverride={50}
      formatY={(v) => `${Math.round(v * 10) / 10}%`}
      colorFor={(d) => (d.year >= 2018 ? SERIES[0] : "#475569")}
      tipRows={(d) => [{ label: "TV share of additions", value: `${d.tv}%` }]}
      ariaLabel="Bar chart of TV shows as a share of Netflix additions by year: 2015 31.7%, 2016 41.0%, 2017 29.4%, 2018 25.0%, 2019 29.4%, 2020 31.7%, 2021 33.7%."
    />
  );
}

export function InsightLab() {
  const [active, setActive] = useState(tabs[0].id);
  const tab = tabs.find((t) => t.id === active)!;

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-3 md:p-4">
      <div role="tablist" aria-label="Analyses" className="grid gap-1 p-1 sm:grid-cols-2 lg:grid-cols-4">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={t.id === active}
            onClick={() => setActive(t.id)}
            className={`relative rounded-xl px-4 py-2.5 text-left text-sm transition-colors ${
              t.id === active ? "text-white" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {t.id === active && (
              <motion.span
                layoutId="lab-tab"
                className="absolute inset-0 rounded-xl border border-indigo-500/40 bg-gradient-to-br from-indigo-950/80 to-slate-900"
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              />
            )}
            <span className="relative flex items-start gap-2">
              <span
                className={`mt-0.5 shrink-0 rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold ${
                  t.tool === "SQL" ? "bg-pink-500/15 text-pink-300" : "bg-indigo-500/15 text-indigo-300"
                }`}
              >
                {t.tool}
              </span>
              {t.question}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="mt-3 grid gap-4 lg:grid-cols-[1fr_1.1fr]"
        >
          <div className="order-2 min-w-0 lg:order-1">
            <CodeBlock code={tab.code} lang={tab.lang} title={tab.file} />
          </div>
          <div className="order-1 flex min-w-0 flex-col rounded-2xl border border-slate-800 bg-slate-950/60 p-5 lg:order-2">
            <div className="text-xs text-slate-500">{tab.dataset}</div>
            <h3 className="mt-1 text-lg font-semibold">{tab.question}</h3>
            <div className="mt-4">
              <TabChart id={tab.id} />
            </div>
            <div className="mt-4 rounded-xl border border-pink-500/25 bg-pink-500/5 p-4">
              <div className="font-mono text-[10px] font-semibold tracking-[0.18em] text-pink-400 uppercase">Insight</div>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{tab.insight}</p>
            </div>
            <Link href={tab.href} className="mt-4 w-fit text-sm text-indigo-300 hover:text-white">
              Read the full case study →
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
