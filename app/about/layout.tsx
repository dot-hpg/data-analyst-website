import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Guntuku Hariprasad",
  description: "About Guntuku Hariprasad, a Data Analyst working with SQL, Python, Excel, Power BI, Tableau and statistics.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
