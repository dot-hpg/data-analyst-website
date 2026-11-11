"use client";

import { useMemo, useState } from "react";
import { LineChart, RankedBars, SERIES } from "@/components/charts";
import { CountUp } from "@/components/count-up";
import {
  targetLateRate,
  targetMonthlyOrders,
  targetPaymentShare,
  targetStateScorecard,
  targetTopCategories,
} from "@/lib/showcase-data";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const fmtMonth = (v: string | number) => {
  const [y, m] = String(v).split("-");
  return `${MONTHS[Number(m) - 1]} ${y.slice(2)}`;
};

const metrics = {
  days: { label: "Avg delivery days", format: (v: number) => `${v.toFixed(1)}d`, worstFirst: true },
  pctLate: { label: "% delivered late", format: (v: number) => `${v.toFixed(1)}%`, worstFirst: true },
  freight: { label: "Avg freight (R$)", format: (v: number) => `R$${v.toFixed(0)}`, worstFirst: true },
  orders: { label: "Delivered orders", format: (v: number) => v.toLocaleString("en-US"), worstFirst: false },
} as const;
type Metric = keyof typeof metrics;

const BIG3 = new Set(["SP", "RJ", "MG"]);

function Panel({ title, sub, children, className = "" }: { title: string; sub?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-slate-800 bg-slate-900/60 p-5 ${className}`}>
      <h3 className="font-semibold">{title}</h3>
      {sub && <p className="mt-0.5 text-xs text-slate-500">{sub}</p>}
      <div className="mt-4">{children}</div>
    </div>
  );
}

export function TargetDashboard() {
  const [metric, setMetric] = useState<Metric>("days");
  const [order, setOrder] = useState<"top" | "bottom">("top");

  const states = useMemo(() => {
    const sorted = [...targetStateScorecard].sort((a, b) => b[metric] - a[metric]);
    const list = order === "top" ? sorted : sorted.reverse();
    return list.slice(0, 10);
  }, [metric, order]);

  const totalDelivered = targetStateScorecard.reduce((n, s) => n + s.orders, 0);
  const lateOrders = targetStateScorecard.reduce((n, s) => n + (s.orders * s.pctLate) / 100, 0);
  const avgDays = targetStateScorecard.reduce((n, s) => n + s.orders * s.days, 0) / totalDelivered;

  const kpis = [
    { value: 99441, label: "Orders, Sep 2016 to Oct 2018" },
    { value: totalDelivered, label: "Delivered orders" },
    { value: avgDays, decimals: 1, suffix: " days", label: "Average delivery time" },
    { value: (lateOrders / totalDelivered) * 100, decimals: 1, suffix: "%", label: "Delivered after the estimate" },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">
            <div className="text-2xl font-bold text-white md:text-3xl">
              <CountUp value={k.value} decimals={k.decimals} suffix={k.suffix} />
            </div>
            <div className="mt-1 text-sm text-slate-400">{k.label}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Orders per month" sub="Strong growth through 2017, a Black Friday spike, then a plateau.">
          <LineChart
            data={targetMonthlyOrders}
            x="month"
            series={[{ key: "orders", label: "Orders", color: SERIES[0] }]}
            formatX={fmtMonth}
            formatY={(v) => (v >= 1000 ? `${(v / 1000).toFixed(v % 1000 ? 1 : 0)}k` : String(v))}
            xTickEvery={5}
            height={230}
            annotations={[{ index: 10, label: "Black Friday" }]}
            ariaLabel="Line chart of monthly Target orders from January 2017 to August 2018."
          />
        </Panel>
        <Panel title="Share of orders delivered late" sub="Lateness spikes after demand peaks: Nov 2017 and Feb-Mar 2018.">
          <LineChart
            data={targetLateRate}
            x="month"
            series={[{ key: "pctLate", label: "Delivered late", color: SERIES[1] }]}
            formatX={fmtMonth}
            formatY={(v) => `${Math.round(v)}%`}
            xTickEvery={5}
            height={230}
            annotations={[{ index: 14, label: "19% late · Mar 18" }]}
            ariaLabel="Line chart of the monthly share of orders delivered late, peaking at 19% in March 2018."
          />
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Panel title="State scorecard" sub="Pick a measure. SP, RJ and MG, home to two in three customers, are highlighted.">
          <div className="flex flex-wrap items-center gap-2">
            {(Object.keys(metrics) as Metric[]).map((m) => (
              <button
                key={m}
                onClick={() => setMetric(m)}
                aria-pressed={metric === m}
                className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                  metric === m
                    ? "border-indigo-400/60 bg-indigo-500/15 text-white"
                    : "border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white"
                }`}
              >
                {metrics[m].label}
              </button>
            ))}
            <button
              onClick={() => setOrder((o) => (o === "top" ? "bottom" : "top"))}
              className="ml-auto rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300 hover:border-slate-500 hover:text-white"
            >
              {order === "top" ? "Highest 10 ↓" : "Lowest 10 ↑"}
            </button>
          </div>
          <div className="mt-5">
            <RankedBars
              key={`${metric}-${order}`}
              data={states}
              label="state"
              value={metric}
              format={metrics[metric].format}
              highlight={(d) => BIG3.has(d.state)}
              detail={(d) =>
                `${d.state}: ${d.orders.toLocaleString("en-US")} orders · ${d.days} days · ${d.pctLate}% late · R$${d.freight} freight`
              }
            />
          </div>
        </Panel>
        <div className="grid gap-4">
          <Panel title="How customers pay" sub="Share of orders by payment type.">
            <RankedBars data={targetPaymentShare} label="type" value="pct" format={(v) => `${v.toFixed(1)}%`} />
          </Panel>
          <Panel title="Top categories by revenue" sub="Share of total item revenue.">
            <RankedBars
              data={targetTopCategories.slice(0, 5).map((c) => ({ ...c, category: c.category.toLowerCase().replace(/\b\w/g, (m) => m.toUpperCase()) }))}
              label="category"
              value="pct"
              color={SERIES[2]}
              format={(v) => `${v.toFixed(1)}%`}
            />
          </Panel>
        </div>
      </div>
      <p className="text-center text-xs text-slate-500">
        Every number comes from the query results in the repo&apos;s outputs/results folder. Hover a chart for details.
      </p>
    </div>
  );
}
