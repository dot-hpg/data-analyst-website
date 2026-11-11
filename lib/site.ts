// All the text on the site lives here. Edit this file to update your portfolio.
// Anything marked TODO is a placeholder: replace it with your own details (see README.md).

export type Project = {
  title: string;
  desc: string;
  tags: string[];
  // Featured projects span the full width and show their highlights.
  featured?: boolean;
  // Replaces the "Featured project" label on the card.
  badge?: string;
  // Internal page with the full write-up, e.g. "/case-studies/target-brazil".
  caseStudy?: string;
  highlights?: { value: string; label: string }[];
  links?: { label: string; href: string }[];
};

export type Dashboard = {
  slug: string;
  title: string;
  tool: "Power BI" | "Tableau";
  domain: string;
  desc: string;
  // What the dashboard lets a business user answer.
  questions: string[];
  features: string[];
  images: { src: string; width: number; height: number; alt: string }[];
  links: { label: string; href: string }[];
};

export type SkillGroup = {
  name: string;
  icon: "sql" | "python" | "excel" | "powerbi" | "tableau" | "stats";
  summary: string;
  items: string[];
};

const PBI = "https://github.com/dot-hpg/power-BI-projects-data-analysis/blob/main";
const TAB = "https://github.com/dot-hpg/tableau-projects-data-analysis";

export const site = {
  name: "Guntuku Hariprasad",
  shortName: "Hariprasad",
  // The live address of this site, used for link previews, the sitemap and search engines.
  url: "https://data-analyst-website-henna.vercel.app",
  role: "Data Analyst",
  // Shown in the badge above your name. Set to "" to hide it.
  availability: "Open to new roles",
  tagline:
    "I turn messy data into clear answers: SQL to dig, Python to test, and dashboards that help people make better decisions.",
  about: [
    "Hi, I'm Hariprasad, a Data Analyst. I start with the business question, find the data that answers it, and finish with a recommendation someone can act on.",
    "My work spans SQL, Python, statistics and BI. I wrote 30 BigQuery queries to explain why late deliveries sink Target's reviews in Brazil, used confidence intervals on 550,068 Walmart transactions to show product mix explains the whole gender spending gap, and built Power BI and Tableau dashboards for audit, education, HR, supplier and call-centre teams.",
    "I care about clean data, honest statistics and charts that make the point in seconds. Every project ends with what the business should do next.",
  ],
  // Headline numbers in the strip under the hero. Each counts up when it scrolls into view.
  stats: [
    { value: 1.2, decimals: 1, suffix: "M+", label: "Records analysed across case studies" },
    { value: 8, suffix: "", label: "End-to-end business case studies" },
    { value: 7, suffix: "", label: "Power BI & Tableau dashboards" },
    { value: 50, suffix: "+", label: "Data-backed recommendations" },
  ],
  skillGroups: [
    {
      name: "SQL",
      icon: "sql",
      summary: "Joins across many tables, CTEs and window functions to answer business questions straight from the warehouse.",
      items: ["BigQuery", "MySQL", "PostgreSQL", "DuckDB", "CTEs", "Window functions", "Joins & aggregation"],
    },
    {
      name: "Python",
      icon: "python",
      summary: "Cleaning, feature engineering and exploratory analysis in notebooks that rerun end to end.",
      items: ["pandas", "NumPy", "matplotlib", "Seaborn", "SciPy", "statsmodels", "scikit-learn", "Jupyter"],
    },
    {
      name: "Excel",
      icon: "excel",
      summary: "Fast answers and stakeholder-ready workbooks when a full pipeline would be overkill.",
      items: ["Pivot tables", "XLOOKUP", "Power Query", "Conditional formatting", "What-if analysis", "Charts"],
    },
    {
      name: "Power BI",
      icon: "powerbi",
      summary: "Interactive reports with a clean data model, DAX measures and drill-downs for operations teams.",
      items: ["Power Query", "DAX", "Data modelling", "Key influencers", "Drill-through", "KPI cards"],
    },
    {
      name: "Tableau",
      icon: "tableau",
      summary: "Dashboards that let people slice HR, sales and service data by any dimension in a click.",
      items: ["Calculated fields", "LOD expressions", "Parameters", "Filters & actions", "Tableau Public"],
    },
    {
      name: "Statistics",
      icon: "stats",
      summary: "Choosing the right test, checking its assumptions and explaining the result in plain words.",
      items: ["Hypothesis testing", "A/B testing", "Confidence intervals", "CLT & bootstrap", "ANOVA", "Regression"],
    },
  ] as SkillGroup[],
  // Simple chips shown on the About page.
  skills: [
    "SQL (BigQuery, MySQL, PostgreSQL)",
    "Python (pandas, NumPy)",
    "Excel",
    "Power BI & DAX",
    "Tableau",
    "Statistics & hypothesis testing",
    "A/B testing",
    "Data cleaning",
    "Exploratory data analysis",
    "Data storytelling",
    "KPI reporting",
    "Customer segmentation (RFM)",
    "Cohort analysis",
    "Forecasting",
    "Git & GitHub",
  ],
  projects: [
    {
      title: "Target Brazil — E-commerce Operations in SQL",
      desc: "What drives growth, delivery performance and customer satisfaction for Target in Brazil? An end-to-end SQL analysis of 99,441 orders from 2016 to 2018. 30 BigQuery queries answer every question in the brief, then six deep-dives of my own explain why: late deliveries destroy reviews, same-state sellers ship twice as fast, and almost nobody comes back. It ends with eight ranked, evidence-backed recommendations, and one script rebuilds every result from the raw data.",
      tags: ["SQL", "BigQuery", "CTEs", "Window functions", "DuckDB", "Python", "Business analytics"],
      featured: true,
      badge: "Flagship SQL case study",
      caseStudy: "/case-studies/target-brazil",
      highlights: [
        { value: "99,441", label: "Orders analysed across 8 tables" },
        { value: "4.32 → 1.70", label: "Review score, very early vs very late orders" },
        { value: "2x faster", label: "Same-state delivery, with 43% lower freight" },
      ],
      links: [
        { label: "View on GitHub", href: "https://github.com/dot-hpg/target-brazil-sql-case-study" },
        {
          label: "Read the report (PDF)",
          href: "https://github.com/dot-hpg/target-brazil-sql-case-study/blob/main/report/Target_SQL_Case_Study_Guntuku_Hariprasad.pdf",
        },
      ],
    },
    {
      title: "Walmart — Black Friday Spending Analysis",
      desc: "Do women spend more than men on Black Friday? I applied the Central Limit Theorem and bootstrap confidence intervals to 550,068 transactions, at three sample sizes and three confidence levels, for gender, marital status and age. Men spend about 8% more per transaction, but product mix explains the whole gap: within the same category, women pay the same. I also built a Tableau dashboard for the customer insights.",
      tags: ["Statistics", "Confidence intervals", "CLT", "Python", "pandas", "Tableau"],
      featured: true,
      caseStudy: "/case-studies/walmart",
      highlights: [
        { value: "550,068", label: "Transactions analysed" },
        { value: "8%", label: "More spent per transaction by men" },
        { value: "100%", label: "Of the gender gap explained by product mix" },
      ],
      links: [
        { label: "View on GitHub", href: "https://github.com/dot-hpg/walmart-black-friday-clt-analysis" },
        {
          label: "Open the Tableau dashboard",
          href: "https://public.tableau.com/views/WalmartAnalysis_17822994672750/Customer_Insights_Dashboard",
        },
      ],
    },
    {
      title: "Netflix — Content Strategy Analysis",
      desc: "What should Netflix produce next, and where should it grow? I cleaned a catalogue of 8,807 titles, un-nested actors, directors, countries and genres, and analysed trends, markets and launch timing across 23 charts. It shows a pivot to TV, a family-content gap, each country's content personality and fast-rising markets, and ends with ten recommendations.",
      tags: ["EDA", "Python", "pandas", "Seaborn", "Feature engineering", "Data storytelling"],
      featured: true,
      caseStudy: "/case-studies/netflix",
      highlights: [
        { value: "25% → 34%", label: "TV's share of new additions, 2018 to 2021" },
        { value: "67%", label: "TV shows with exactly one season" },
        { value: "59%", label: "Titles from the US, India and the UK" },
      ],
      links: [{ label: "View on GitHub", href: "https://github.com/dot-hpg/netflix-content-insights" }],
    },
    {
      title: "Customer Analytics — RFM, Cohorts & CLV",
      desc: "Which customers drive revenue, and when do they stop buying? Using e-commerce transactions, I segmented customers with RFM scores, tracked retention by monthly cohort and summarised customer lifetime value. Loyal customers bring in over 75% of revenue, and retention drops sharply after the second month, so the recommendations focus on onboarding and win-back campaigns.",
      tags: ["RFM analysis", "Cohort analysis", "CLV", "Python", "pandas", "Segmentation"],
      featured: true,
      badge: "Customer analytics",
      highlights: [
        { value: "1,306", label: "Loyal customers identified" },
        { value: "75%+", label: "Of revenue from loyal customers" },
        { value: "Month 2", label: "Where retention falls off sharply" },
      ],
      links: [{ label: "View on GitHub", href: "https://github.com/dot-hpg/crm-analytics-python" }],
    },
    {
      title: "Yulu — What Drives E-Cycle Demand",
      desc: "10,886 hourly rental records, tested with t-tests, ANOVA and chi-square. Weather and season swing demand by 40-50%, and hour of day is the main driver.",
      tags: ["Hypothesis testing", "ANOVA", "Python"],
      caseStudy: "/case-studies/yulu",
    },
    {
      title: "Aerofit — Treadmill Customer Profiling",
      desc: "Marginal and conditional probabilities on 180 buyers show who buys the premium KP781: income, usage and fitness decide it.",
      tags: ["Probability", "Customer profiling", "Python"],
      caseStudy: "/case-studies/aerofit",
    },
    {
      title: "Retail Sales Forecasting",
      desc: "Forecasts daily sales for 365 stores 61 days ahead, and measures a 33% sales lift from discounts.",
      tags: ["Time series", "LightGBM", "Python"],
      links: [{ label: "View on GitHub", href: "https://github.com/dot-hpg/sales-forecasting" }],
    },
  ] as Project[],
  dashboards: [
    {
      slug: "supplier-sla",
      title: "Supplier Performance & SLA Optimisation",
      tool: "Power BI",
      domain: "Operations",
      desc: "Tracks how well each supplier meets its service-level agreement across store sizes and regions, so the operations team knows which contracts to renegotiate. Consumables hit 99.3% SLA compliance for the year, while uniforms lagged at 89.5% and dipped further in August.",
      questions: [
        "Which suppliers miss their SLA, and in which months?",
        "How do store takings and headcount vary by region and store size?",
        "Where should supplier reviews focus first?",
      ],
      features: ["SLA by supplier and quarter", "Regional store takings", "Month-by-month compliance", "Written findings"],
      images: [
        { src: "/dashboards/powerbi-supplier-1.jpg", width: 1800, height: 1026, alt: "Power BI page with store counts and weekly takings by region and store size" },
        { src: "/dashboards/powerbi-supplier-3.jpg", width: 1800, height: 1026, alt: "Power BI page with SLA by supplier and monthly compliance" },
        { src: "/dashboards/powerbi-supplier-2.jpg", width: 1800, height: 1026, alt: "Power BI page with store headcount, guards and cleaning hours by region" },
        { src: "/dashboards/powerbi-supplier-4.jpg", width: 1800, height: 1026, alt: "Power BI page with written findings on supplier performance" },
      ],
      links: [
        { label: "Download the .pbix", href: `${PBI}/Supplier%20Performance%20and%20SLA%20Optimization/Supplier%20Performance%20Enhancement%20and%20SLA%20Optimization%20Initiative.pbix` },
        { label: "View the PDF", href: `${PBI}/Supplier%20Performance%20and%20SLA%20Optimization/Supplier%20Performance%20Enhancement%20and%20SLA%20Optimization%20Initiative.pdf` },
      ],
    },
    {
      slug: "audit-efficiency",
      title: "Audit Efficiency & Effectiveness",
      tool: "Power BI",
      domain: "Audit & compliance",
      desc: "Shows how many audits fall due each month, how often they run remotely and how hours are spread across auditors and countries. A key-influencers visual explains what makes an audit more likely to be booked on time, and the data points planning towards the United Kingdom, which has the most operating hours and orders.",
      questions: [
        "How many audits are due, by year and by month?",
        "Which auditors carry the most operating hours?",
        "Which countries should audit planning prioritise?",
      ],
      features: ["Key influencers (AI visual)", "Due audits waterfall", "Auditor heat strip", "Country breakdown"],
      images: [
        { src: "/dashboards/powerbi-audit-1.jpg", width: 1800, height: 1026, alt: "Power BI page with key influencers and audits due by year and month" },
        { src: "/dashboards/powerbi-audit-2.jpg", width: 1800, height: 1026, alt: "Power BI page with remote audits, auditor count and operating hours by auditor" },
        { src: "/dashboards/powerbi-audit-3.jpg", width: 1800, height: 1026, alt: "Power BI page with operating hours and orders by country" },
      ],
      links: [
        { label: "Download the .pbix", href: `${PBI}/Audit%20Efficiency%20and%20Effectiveness/Audit%20Efficiency%20and%20Effectiveness%20Enhancement%20Strategic%20Focus%20and%20Optimization.pbix` },
        { label: "View the PDF", href: `${PBI}/Audit%20Efficiency%20and%20Effectiveness/Audit%20Efficiency%20and%20Effectiveness%20Enhancement%20Strategic%20Focus%20and%20Optimization%20.pdf` },
      ],
    },
    {
      slug: "education-insights",
      title: "Education Data Insights",
      tool: "Power BI",
      domain: "Education",
      desc: "Compares subject scores across academies and between disadvantaged and non-disadvantaged students, then ranks schools on the Basics 5+ measure. It challenges the assumption that the gap is the same everywhere, and surfaces Basics 5+ as a strong single metric for comparing schools.",
      questions: [
        "How do test scores differ by subject and school?",
        "How large is the gap for disadvantaged students?",
        "Which schools lead on the Basics 5+ measure?",
      ],
      features: ["Power Query cleaning", "Subject statistics", "Disadvantaged vs not", "School ranking"],
      images: [
        { src: "/dashboards/powerbi-education-2.jpg", width: 1800, height: 1026, alt: "Power BI page comparing disadvantaged and non-disadvantaged students" },
        { src: "/dashboards/powerbi-education-1.jpg", width: 1467, height: 849, alt: "Power BI page with subject statistics by school" },
        { src: "/dashboards/powerbi-education-3.jpg", width: 1800, height: 1026, alt: "Power BI page ranking schools by Basics 5+ with written findings" },
      ],
      links: [
        { label: "Download the .pbix", href: `${PBI}/Education%20Data%20Insights/Education%20Data%20Insights%20Challenging%20Assumptions%20and%20Discovering%20Key%20Metrics.pbix` },
        { label: "View the PDF", href: `${PBI}/Education%20Data%20Insights/Education%20Data%20Insights%20Challenging%20Assumptions%20and%20Discovering%20Key%20Metrics.pdf` },
      ],
    },
    {
      slug: "deprivation-index",
      title: "Index of Multiple Deprivation 2019",
      tool: "Power BI",
      domain: "Public sector",
      desc: "Maps deprivation across districts and breaks it into income, employment, crime and barriers to housing and services. Decile views show where income deprivation hits children and older people hardest, to help target local policies.",
      questions: [
        "Which districts score worst on deprivation?",
        "How do income and employment change by decile?",
        "Where do crime and access barriers overlap?",
      ],
      features: ["District map", "Decile drill-downs", "Domain sub-scores", "Summary matrix"],
      images: [
        { src: "/dashboards/powerbi-deprivation-1.jpg", width: 1800, height: 1026, alt: "Power BI page with a district map and deprivation scores" },
        { src: "/dashboards/powerbi-deprivation-2.jpg", width: 1800, height: 1026, alt: "Power BI page with income, employment and crime scores by decile" },
      ],
      links: [
        { label: "Download the .pbix", href: `${PBI}/Index%20of%20Multiple%20Deprivation/Index%20of%20multiple%20deprivation.pbix` },
        { label: "View the PDF", href: `${PBI}/Index%20of%20Multiple%20Deprivation/Index%20of%20Multiple%20Deprivation.pdf` },
      ],
    },
    {
      slug: "call-center",
      title: "Call Centre Performance",
      tool: "Tableau",
      domain: "Customer service",
      desc: "One view of 32,941 calls: sentiment, reasons for calling, response time against SLA and volume by centre and channel. Billing questions drive 71% of calls, 63% are answered within SLA, and Los Angeles handles the most volume.",
      questions: [
        "Why are customers calling, and how do they feel?",
        "How many calls are answered within SLA?",
        "How do centres and channels compare?",
      ],
      features: ["KPI header", "Sentiment breakdown", "SLA response bands", "Channel treemap"],
      images: [{ src: "/dashboards/tableau-callcenter.jpg", width: 1410, height: 689, alt: "Tableau dashboard of call volume, sentiment, reasons and response time" }],
      links: [{ label: "View on GitHub", href: `${TAB}/tree/main/CallCenter_Data%20Analysis` }],
    },
    {
      slug: "employee-trends",
      title: "Employee Trends (HR Analytics)",
      tool: "Tableau",
      domain: "HR",
      desc: "Brings HR data into one view: headcount by department, degree and gender, travel patterns, and job satisfaction by education field. It helps HR see where attrition risk and satisfaction gaps sit.",
      questions: [
        "How is headcount spread across departments and roles?",
        "Which education fields report the lowest satisfaction?",
        "How do demographics differ across the business?",
      ],
      features: ["Department breakdown", "Satisfaction overlay", "Demographic filters", "Travel mix"],
      images: [{ src: "/dashboards/tableau-employee.jpg", width: 1410, height: 689, alt: "Tableau HR dashboard with department, degree, gender and satisfaction views" }],
      links: [{ label: "View on GitHub", href: `${TAB}/tree/main/Analyzing%20Employee%20Trends` }],
    },
    {
      slug: "automotive",
      title: "Automotive Market Trends",
      tool: "Tableau",
      domain: "Retail & pricing",
      desc: "Explores used-car listings: price trends over time, how fuel type and transmission affect price and mileage, and the mix of seller and owner types. Automatic cars sell for about four times the price of manuals on average.",
      questions: [
        "How have used-car prices moved over time?",
        "How do fuel type and transmission change price?",
        "Who is selling: dealers, individuals or trusted dealers?",
      ],
      features: ["Price trend area chart", "Fuel & transmission splits", "Owner bubble chart", "Seller mix"],
      images: [{ src: "/dashboards/tableau-automotive.jpg", width: 1410, height: 689, alt: "Tableau dashboard of used car prices by year, fuel type and transmission" }],
      links: [{ label: "View on GitHub", href: `${TAB}/tree/main/Exploring%20Trends%20in%20the%20Automotive%20Industry` }],
    },
  ] as Dashboard[],
  // How I approach an analysis, shown on the home page.
  process: [
    { title: "Ask", desc: "Pin down the decision the analysis must support, and the metric that will show it worked." },
    { title: "Prepare", desc: "Profile, clean and join the data, and write down every assumption." },
    { title: "Analyse", desc: "Query, explore and test, checking that each result holds up statistically." },
    { title: "Visualise", desc: "Pick the chart that makes the point in seconds, then build the dashboard." },
    { title: "Recommend", desc: "Turn findings into ranked actions with the evidence and the expected impact." },
  ],
  // Newest first. Entries with placeholder: true are hidden on the site until you fill them in
  // and delete the flag. TODO: add your real job or internship experience.
  experience: [
    {
      period: "Training",
      title: "Data Science & Machine Learning Program",
      org: "Scaler",
      desc: "Business case studies in SQL, statistics, EDA and machine learning for Target, Walmart, Netflix, Aerofit, Yulu, Delhivery and more, each ending in recommendations for the business.",
      tags: ["SQL", "Python", "Statistics", "EDA"],
    },
    {
      period: "TODO: Start — End",
      title: "TODO: Your job title",
      org: "TODO: Company name",
      desc: "TODO: One or two lines on what you analysed, the tools you used and the impact it had (for example, a report that saved hours each week).",
      tags: ["TODO", "Your", "Tools"],
      placeholder: true,
    },
    {
      period: "Projects",
      title: "BI dashboard projects",
      org: "Independent",
      desc: "Built Power BI reports for audit, education, public-sector and supplier data, and Tableau dashboards for HR, call-centre and automotive data.",
      tags: ["Power BI", "DAX", "Tableau"],
    },
  ] as { period: string; title: string; org: string; desc: string; tags: string[]; placeholder?: boolean }[],
  // TODO: add your degree and any certifications (placeholder entries are hidden until filled).
  education: [
    { title: "Data Science & Machine Learning Program", org: "Scaler", period: "" },
    { title: "TODO: Your degree", org: "TODO: University", period: "TODO: Year", placeholder: true },
  ] as { title: string; org: string; period: string; placeholder?: boolean }[],
  // Business cases from the Scaler program, shown on the /case-studies page in this order.
  caseStudies: [
    {
      title: "Target Brazil — E-commerce Operations SQL Case Study",
      desc: "An end-to-end SQL analysis of 99,441 orders placed with Target in Brazil between September 2016 and October 2018. 30 BigQuery queries answer every question in the brief, then go further with six deep-dives into lateness and reviews, local vs cross-state fulfilment, seller coverage, categories, retention and peak-season delays. The work ends with eight ranked, evidence-backed recommendations, and one script rebuilds every result from the raw data.",
      tags: ["SQL", "BigQuery", "DuckDB", "Python", "pandas", "matplotlib", "Business analytics"],
      caseStudy: "/case-studies/target-brazil",
      highlights: [
        { value: "+137%", label: "Order value, Jan-Aug 2018 vs 2017" },
        { value: "4.32 → 1.70", label: "Review score, very early vs very late orders" },
        { value: "2x faster", label: "Same-state delivery, with 43% lower freight" },
      ],
      links: [
        { label: "View on GitHub", href: "https://github.com/dot-hpg/target-brazil-sql-case-study" },
        {
          label: "Read the report (PDF)",
          href: "https://github.com/dot-hpg/target-brazil-sql-case-study/blob/main/report/Target_SQL_Case_Study_Guntuku_Hariprasad.pdf",
        },
      ],
    },
    {
      title: "Netflix — Content Strategy Analysis",
      desc: "What should Netflix produce next, and where should it grow? An end-to-end exploratory analysis of 8,807 movies and TV shows. I cleaned the catalogue, engineered features, un-nested actors, directors, countries and genres, then analysed trends, markets and launch timing across 23 charts. It shows a pivot to TV, a family-content gap, each country's content personality and fast-rising markets, and ends with ten recommendations.",
      tags: ["EDA", "Python", "pandas", "Seaborn", "Feature engineering", "Data storytelling"],
      caseStudy: "/case-studies/netflix",
      highlights: [
        { value: "25% → 34%", label: "TV's share of new additions, 2018 to 2021" },
        { value: "67%", label: "TV shows with exactly one season" },
        { value: "59%", label: "Titles from the US, India and the UK" },
      ],
      links: [
        { label: "View on GitHub", href: "https://github.com/dot-hpg/netflix-content-insights" },
        {
          label: "Read the report (PDF)",
          href: "https://github.com/dot-hpg/netflix-content-insights/blob/main/reports/Netflix_EDA_Case_Study.pdf",
        },
      ],
    },
    {
      title: "Walmart — Black Friday Spending Analysis",
      desc: "Do women spend more than men on Black Friday? Confidence intervals and the Central Limit Theorem applied to 550,068 transactions. I ran bootstrap experiments at three sample sizes and built 90%, 95% and 99% intervals for gender, marital status and age. Men spend about 8% more per transaction, but product mix explains the whole gap: within the same category, women pay the same. It ends with ten recommendations for Walmart.",
      tags: ["Statistics", "Central Limit Theorem", "Confidence intervals", "Python", "pandas", "SciPy"],
      caseStudy: "/case-studies/walmart",
      highlights: [
        { value: "550,068", label: "Transactions analysed" },
        { value: "8%", label: "More spent per transaction by men" },
        { value: "100%", label: "Of the gender gap explained by product mix" },
      ],
      links: [
        { label: "View on GitHub", href: "https://github.com/dot-hpg/walmart-black-friday-clt-analysis" },
        {
          label: "Read the report (PDF)",
          href: "https://github.com/dot-hpg/walmart-black-friday-clt-analysis/blob/main/reports/Walmart_CLT_Case_Study.pdf",
        },
      ],
    },
    {
      title: "Aerofit — Treadmill Customer Profiling",
      desc: "Who buys which treadmill, and how should Aerofit recommend the right one? An exploratory analysis and probability study of 180 customers across three products. Using contingency tables, marginal and conditional probabilities, a Bayes check and chi-square tests, I profiled the buyer of each model. Income, usage and fitness decide who buys the premium KP781, while age and marital status don't change the choice.",
      tags: ["Probability", "Python", "pandas", "SciPy", "Seaborn", "Chi-square", "Customer profiling"],
      caseStudy: "/case-studies/aerofit",
      highlights: [
        { value: "100%", label: "Bought the KP781 when income was above $80K" },
        { value: "80.8%", label: "Bought the KP781 when running 5-7 days a week" },
        { value: "31.7% vs 9.2%", label: "Men vs women buying the KP781" },
      ],
      links: [
        { label: "View on GitHub", href: "https://github.com/dot-hpg/aerofit-treadmill-customer-profiling" },
        {
          label: "Read the report (PDF)",
          href: "https://github.com/dot-hpg/aerofit-treadmill-customer-profiling/blob/main/reports/Aerofit_Case_Study.pdf",
        },
      ],
    },
    {
      title: "Yulu — What Drives E-Cycle Demand",
      desc: "Yulu saw a dip in revenue, so this project uses 10,886 hourly rental records to find which factors really affect demand. I used t-tests, ANOVA, chi-square and regression, checked each parametric test's assumptions and confirmed results with non-parametric tests. Weather and season swing demand by 40-50%, hour of day is the dominant driver, and a regression on these drivers explains most of the variation.",
      tags: ["Hypothesis testing", "Python", "SciPy", "statsmodels", "ANOVA", "Regression"],
      caseStudy: "/case-studies/yulu",
      highlights: [
        { value: "R² 0.93", label: "How well the drivers explain demand" },
        { value: "−42%", label: "Rentals in light rain vs clear weather" },
        { value: "~81%", label: "Rides from registered users" },
      ],
      links: [
        { label: "View on GitHub", href: "https://github.com/dot-hpg/yulu-hypothesis-testing" },
        {
          label: "Read the report (PDF)",
          href: "https://github.com/dot-hpg/yulu-hypothesis-testing/blob/main/reports/Yulu_Hypothesis_Testing.pdf",
        },
      ],
    },
    {
      title: "Delhivery — Feature Engineering on Trip Data",
      desc: "Turns 144,867 raw logistics rows into a clean, analysis-ready table of 14,817 delivery trips. I rebuilt each trip with a two-stage merge, engineered features from facility names, time and routes, capped outliers, and encoded and scaled the data into 67 features. Paired hypothesis tests show real trips take about 2.1 times as long as the routing engine plans.",
      tags: ["Data cleaning", "Feature engineering", "Python", "pandas", "SciPy", "Hypothesis testing"],
      caseStudy: "/case-studies/delhivery",
      highlights: [
        { value: "2.1x", label: "Actual trip time vs routing engine's plan" },
        { value: "14,817", label: "Clean trips from 144,867 raw rows" },
        { value: "67", label: "Analysis-ready features" },
      ],
      links: [
        { label: "View on GitHub", href: "https://github.com/dot-hpg/delhivery-feature-engineering" },
        {
          label: "Read the report (PDF)",
          href: "https://github.com/dot-hpg/delhivery-feature-engineering/blob/main/reports/Delhivery_Feature_Engineering.pdf",
        },
      ],
    },
    {
      title: "Jamboree — Graduate Admission Drivers",
      desc: "What decides an applicant's chance of getting into a top college abroad? A linear regression on 500 applicant profiles for Jamboree Education. I read coefficients and p-values with an OLS model and tested the assumptions of linear regression, including multicollinearity with VIF. CGPA, GRE and TOEFL matter most, while SOP and University Rating add little once the others are known.",
      tags: ["Regression", "Python", "statsmodels", "VIF", "Seaborn"],
      caseStudy: "/case-studies/jamboree",
      highlights: [
        { value: "0.82", label: "R² on the test set" },
        { value: "0.043", label: "Test MAE (about 4 percentage points)" },
        { value: "0.88", label: "Correlation of CGPA with admission" },
      ],
      links: [{ label: "Read the report (PDF)", href: "/case-studies/reports/jamboree-report.pdf" }],
    },
    {
      title: "LoanTap — Credit Risk Assessment",
      desc: "Should LoanTap extend a credit line to a given person? A logistic regression on 396,030 loan records. I explored the data, removed outliers, engineered and encoded features, then judged the model on precision and recall as well as accuracy. Interest rate, debt-to-income ratio and income are the strongest signals. Accuracy is 81%, but recall on defaulters is only 7%, and the page explains why and what to do next.",
      tags: ["Logistic regression", "Python", "scikit-learn", "ROC AUC", "Credit risk"],
      caseStudy: "/case-studies/loantap",
      highlights: [
        { value: "396,030", label: "Loan records analysed" },
        { value: "0.70", label: "ROC AUC on the test set" },
        { value: "19%", label: "Loans charged off" },
      ],
      links: [{ label: "Read the report (PDF)", href: "/case-studies/reports/loantap-report.pdf" }],
    },
  ] as Project[],
  email: "connect.hpg@gmail.com",
  // TODO: put your résumé at public/resume.pdf and set this to "/resume.pdf" to show a download button.
  resume: "",
  location: "India",
  socials: [
    { label: "GitHub", href: "https://github.com/dot-hpg" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/dot-hpg" },
    { label: "Tableau Public", href: "https://public.tableau.com/views/WalmartAnalysis_17822994672750/Customer_Insights_Dashboard" },
  ],
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/#projects" },
  { label: "Case studies", href: "/case-studies" },
  { label: "Dashboards", href: "/dashboards" },
  { label: "Contact", href: "/#contact" },
];
