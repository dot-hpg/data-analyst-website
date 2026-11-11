import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/case-studies";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/about", "/case-studies", "/case-studies/target-brazil", "/dashboards", ...caseStudies.map((c) => `/case-studies/${c.slug}`)];
  return paths.map((p) => ({ url: `${site.url}${p === "/" ? "" : p}`, changeFrequency: "monthly", priority: p === "/" ? 1 : 0.7 }));
}
