import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Guntuku Hariprasad | Data Analyst",
  description:
    "Portfolio of Guntuku Hariprasad, a Data Analyst who turns data into decisions with SQL, Python, Excel, Power BI, Tableau and statistics.",
  keywords: ["Data Analyst", "SQL", "Python", "Power BI", "Tableau", "Excel", "Statistics", "Portfolio"],
  openGraph: {
    title: "Guntuku Hariprasad | Data Analyst",
    description: "SQL, Python, statistics and dashboards that turn data into decisions.",
    type: "website",
    url: site.url,
    siteName: "Guntuku Hariprasad",
  },
  twitter: {
    card: "summary",
    title: "Guntuku Hariprasad | Data Analyst",
    description: "SQL, Python, statistics and dashboards that turn data into decisions.",
  },
};

export const viewport: Viewport = {
  themeColor: "#020617",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth bg-slate-950 antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
