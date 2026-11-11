import Link from "next/link";
import { AnimatedBackground } from "@/components/animated-background";
import { SiteFooter, SiteNav } from "@/components/site-nav";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col bg-slate-950 text-white">
      <div className="relative flex-1">
        <AnimatedBackground trendLine={false} />
        <SiteNav />
        <section className="relative z-10 flex flex-col items-center px-6 pt-24 pb-36 text-center">
          <p className="font-mono text-sm text-pink-400">SELECT * FROM pages WHERE url = this_one;</p>
          <h1 className="mt-6 text-6xl font-extrabold tracking-tight md:text-8xl">
            <span className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">0 rows</span>
          </h1>
          <p className="mt-6 max-w-md text-lg text-slate-400">That page doesn&apos;t exist. Let&apos;s get you back to the data.</p>
          <Link href="/" className="mt-10 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-200">
            Back home →
          </Link>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
