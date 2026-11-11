import { Reveal } from "@/components/reveal";

export function SectionTitle({ kicker, title, intro }: { kicker: string; title: string; intro?: string }) {
  return (
    <Reveal>
      <p className="font-mono text-xs font-semibold tracking-[0.18em] text-pink-400 uppercase">{kicker}</p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
      {intro && <p className="mt-3 max-w-2xl text-slate-400">{intro}</p>}
    </Reveal>
  );
}
