// A tiny syntax highlighter for the SQL and Python snippets on the site. No dependencies.

const SQL_KW =
  /\b(?:WITH|AS|SELECT|FROM|JOIN|ON|WHERE|AND|OR|NOT|NULL|IS|GROUP|BY|ORDER|CASE|WHEN|THEN|ELSE|END|OVER|ROWS|BETWEEN|PRECEDING|CURRENT|ROW|DESC|ASC|LIMIT|LEFT|INNER|DISTINCT|PARTITION)\b/;
const SQL_FN = /\b(?:COUNT|SUM|AVG|ROUND|LAG|LEAD|MAX|MIN|NULLIF|TIMESTAMP_DIFF|FORMAT_TIMESTAMP|DAY)\b/;
const PY_KW = /\b(?:import|from|as|def|return|for|in|if|else|lambda|True|False|None)\b/;
const PY_FN = /\b(?:read_csv|groupby|mean|round|unstack|size|sum|value_counts|query|assign|plot|dt|hour|pivot_table|sort_values|reset_index)\b/;

type Lang = "sql" | "python";

function highlight(line: string, lang: Lang) {
  const comment = lang === "sql" ? line.indexOf("--") : line.indexOf("#");
  const code = comment >= 0 ? line.slice(0, comment) : line;
  const rest = comment >= 0 ? line.slice(comment) : "";
  const kw = lang === "sql" ? SQL_KW : PY_KW;
  const fn = lang === "sql" ? SQL_FN : PY_FN;
  const re = new RegExp(`('[^']*'|"[^"]*"|${kw.source}|${fn.source}|\\b\\d+(?:\\.\\d+)?\\b)`, "g");
  const parts = code.split(re).filter((p) => p !== undefined && p !== "");
  return (
    <>
      {parts.map((p, i) => {
        let cls = "";
        if (/^['"]/.test(p)) cls = "text-emerald-300";
        else if (new RegExp(`^${kw.source}$`).test(p)) cls = "text-pink-400";
        else if (new RegExp(`^${fn.source}$`).test(p)) cls = "text-indigo-300";
        else if (/^\d/.test(p)) cls = "text-amber-300";
        return cls ? (
          <span key={i} className={cls}>
            {p}
          </span>
        ) : (
          p
        );
      })}
      {rest && <span className="text-slate-500 italic">{rest}</span>}
    </>
  );
}

export function CodeBlock({ code, lang, title }: { code: string; lang: Lang; title?: string }) {
  const lines = code.split("\n");
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/80">
      <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-900/80 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-slate-700" />
        <span className="size-2.5 rounded-full bg-slate-700" />
        <span className="size-2.5 rounded-full bg-slate-700" />
        <span className="ml-2 truncate font-mono text-xs text-slate-400">{title}</span>
        <span className="ml-auto rounded bg-slate-800 px-2 py-0.5 font-mono text-[10px] tracking-wider text-slate-400 uppercase">
          {lang}
        </span>
      </div>
      <pre className="max-h-[20rem] overflow-auto lg:max-h-[30rem] p-4 font-mono text-[12px] leading-relaxed text-slate-300 md:text-[13px]">
        <code>
          {lines.map((l, i) => (
            <div key={i} className="flex">
              <span className="mr-4 inline-block w-5 shrink-0 text-right text-slate-600 select-none">{i + 1}</span>
              <span className="whitespace-pre">{highlight(l, lang)}</span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}
