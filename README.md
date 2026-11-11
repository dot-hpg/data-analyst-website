# Guntuku Hariprasad — Data Analyst Portfolio

A personal portfolio for Data Analyst roles, built with the same stack and look as
[dot-hpg/portfolio](https://github.com/dot-hpg/portfolio): **Next.js 16, Tailwind CSS 4, Framer Motion and shadcn/ui**,
dark slate with indigo-to-pink gradients.

**Live site:** https://dot-hpg.github.io/data-analyst-website/ (GitHub Pages, deployed on every push to `main`)

## What's inside

| Page | What it shows |
| --- | --- |
| `/` | Hero, animated KPI strip, skills (SQL, Python, Excel, Power BI, Tableau, Statistics), featured projects, an **Insight lab** (real SQL/Python next to the interactive chart it produces), dashboards, analysis process, experience and contact |
| `/about` | Bio, skills, experience and education |
| `/case-studies` | All eight business case studies (Target, Netflix, Walmart, Aerofit, Yulu, Delhivery, Jamboree, LoanTap) |
| `/case-studies/target-brazil` | Flagship SQL case study with an **interactive dashboard** rebuilt from the query results |
| `/case-studies/[slug]` | Full write-up for every other case study |
| `/dashboards` | Power BI and Tableau gallery with a full-screen, multi-page viewer |

Every number on the interactive charts is copied from the original project outputs (see `lib/showcase-data.ts`, which
notes the source file for each block). Charts are hand-written SVG in `components/charts.tsx`, with no chart library.

## Edit your content

All text lives in **`lib/site.ts`**; case-study write-ups live in `lib/case-studies.ts`.

### To fill in (TODO)

- [ ] **Work experience** — `site.experience`: replace the placeholder entry and delete `placeholder: true` (placeholder entries are hidden until you do).
- [ ] **Degree / certifications** — `site.education`: same as above.
- [ ] **Résumé** — add `public/resume.pdf` and set `resume: "/resume.pdf"` to show a download button.
- [ ] **Excel evidence** — the Excel skill card has no linked project yet; add one if you have a workbook to show.
- [ ] **Availability badge** — `availability` (set to `""` to hide "Open to new roles").
- [ ] **Location** — `location` (currently "India").
- [ ] **Email and socials** — `email` uses the address from your GitHub profile; check LinkedIn and Tableau Public links.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## Deploy

**GitHub Pages (set up):** `.github/workflows/deploy.yml` builds a static export (`GITHUB_PAGES=true`) and publishes it.
One-time step: repo **Settings → Pages → Source: GitHub Actions**.

**Vercel (like the original portfolio):** import the repo at [vercel.com/new](https://vercel.com/new). No settings
needed; without `GITHUB_PAGES` it builds as a normal Next.js app at the domain root.

```bash
GITHUB_PAGES=true npm run build   # static site in ./out, served under /data-analyst-website
npm run build                     # regular Next.js build (Vercel)
```
