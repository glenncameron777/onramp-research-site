# Onramp Research Site Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build an Astro static site that converts 7 Onramp Bitcoin institutional research PDFs into SEO-optimised, native HTML web pages with a shared design system.

**Architecture:** Astro 5 with MDX content collections. Each report is an MDX file with frontmatter metadata. Reusable Astro components mirror the proof-of-concept design (stat cards, callouts, data tables, allocation charts, etc.). Global CSS extracted from the HTML proof-of-concept. Deployed to Vercel as static output.

**Tech Stack:** Astro 5, MDX, TypeScript, Vercel adapter (static), vanilla JS for scroll animations.

---

## Report Inventory

| # | Slug | Title | Subtitle | Pages |
|---|------|-------|----------|-------|
| 1 | bitcoin-family-offices | Bitcoin as a Strategic Asset for Family Offices | Preserving Wealth, Growing Capital, Safeguarding Legacy | 26 |
| 2 | bitcoin-sovereign-wealth-funds | Bitcoin as a Strategic Asset for Sovereign Wealth Funds | (Executive Summary / governance-ready proposal) | 17 |
| 3 | bitcoin-endowments | Discipline & Duration: Bitcoin in the Endowment Portfolio | (Executive Brief) | 21 |
| 4 | bitcoin-defined-benefit-pensions | Bitcoin in Defined Benefit Pension Portfolios | A Fiduciary Framework for 1-5% Strategic Allocations | 29 |
| 5 | bitcoin-401k | The 401(k) Upgrade: Bitcoin for Inflation, Diversification, and Longevity | Modern glide paths, institutional custody, and growth that lasts from 65 to 95 | 30 |
| 6 | bitcoin-reinsurance | Harnessing Bitcoin in the Offshore (Re)insurer's Surplus Portfolio | Using a 1-3% Surplus Allocation to Improve ROE | 30 |
| 7 | bitcoin-rias | Why Leading RIAs Are Embracing Bitcoin | A Blueprint for RIAs to Drive AUM Growth | 25 |

---

## Task 1: Scaffold Astro Project

**Files:**
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Replace: `package.json`

**Steps:**
1. Initialize Astro project with `npm create astro@latest` (or manual setup)
2. Install dependencies: `@astrojs/mdx`, `@astrojs/vercel`, `@astrojs/sitemap`
3. Configure `astro.config.mjs` with MDX, sitemap, Vercel static adapter
4. Verify `npm run dev` starts successfully

---

## Task 2: Global Styles & Design Tokens

**Files:**
- Create: `src/styles/global.css`

Extract all CSS from `bitcoin-family-offices.html` into global.css:
- CSS custom properties (--forest, --gold, --cream, etc.)
- Typography (Cormorant Garamond + DM Sans via Google Fonts)
- Base reset, body styles
- All component styles: .hero, .page-layout, .sidebar, .toc, .content, .callout, .stat-row, .stat-card, .table-wrap, .alloc-chart, .case-grid, .download-banner, .checklist, .efficiency-grid, .corr-row, .values-grid, footer
- Responsive breakpoints
- .fade-up animation class
- Print styles

---

## Task 3: Base Layout

**Files:**
- Create: `src/layouts/BaseLayout.astro`

Includes:
- HTML head with Google Fonts preconnect
- Slot for page-specific head content (meta tags, JSON-LD)
- Site header/nav
- Footer
- Global CSS import

---

## Task 4: Report Layout

**Files:**
- Create: `src/layouts/ReportLayout.astro`

Extends BaseLayout. Adds:
- Hero section (gradient background, label, h1, subtitle, meta row, CTA)
- Page layout grid (sidebar + main content)
- Sticky TOC sidebar generated from frontmatter `sections` array
- SEO: meta title, description, OG tags, Twitter cards, JSON-LD Article schema
- Scroll animation script (IntersectionObserver for .fade-up)
- TOC active highlighting script
- All driven by frontmatter props

---

## Task 5: MDX Components

**Files:**
- Create: `src/components/StatRow.astro`
- Create: `src/components/StatCard.astro`
- Create: `src/components/Callout.astro`
- Create: `src/components/DataTable.astro`
- Create: `src/components/AllocChart.astro`
- Create: `src/components/CaseGrid.astro`
- Create: `src/components/CaseCard.astro`
- Create: `src/components/EfficiencyGrid.astro`
- Create: `src/components/EfficiencyCard.astro`
- Create: `src/components/CorrBadge.astro`
- Create: `src/components/CorrRow.astro`
- Create: `src/components/ValuesGrid.astro`
- Create: `src/components/ValueCard.astro`
- Create: `src/components/DownloadBanner.astro`
- Create: `src/components/Checklist.astro`
- Create: `src/components/ChecklistGroup.astro`
- Create: `src/components/Section.astro`
- Create: `src/components/Lead.astro`

Each component mirrors the HTML patterns from the proof-of-concept.

---

## Task 6: Content Collection Schema

**Files:**
- Create: `src/content.config.ts`

Define `reports` collection with schema:
- title, subtitle, description, slug
- metaTitle, metaDescription, ogImage
- category (label shown in hero), date, pages, readTime
- pdfFile (path to PDF for download)
- sections: array of { id, label } for TOC generation

---

## Task 7: Report Dynamic Route

**Files:**
- Create: `src/pages/research/[slug].astro`

Dynamic route that:
- Queries the reports content collection
- Passes frontmatter to ReportLayout
- Renders MDX body content

---

## Task 8: First Content - Family Offices Report (MDX)

**Files:**
- Create: `src/content/reports/bitcoin-family-offices.mdx`

Convert the proof-of-concept HTML body content into MDX using components.
This is the reference implementation - all other reports follow this pattern.

---

## Task 9: Research Index Page

**Files:**
- Create: `src/pages/research/index.astro`

Lists all reports as cards with:
- Title, subtitle, category label
- Page count, read time
- Link to /research/[slug]
- PDF download link

---

## Task 10: Homepage

**Files:**
- Create: `src/pages/index.astro`

Simple landing page with:
- Hero section introducing Onramp Research
- Featured reports grid
- Link to /research

---

## Task 11: PDF Download Setup

**Files:**
- Copy PDFs to `public/pdfs/` with clean filenames

Rename PDFs to match slugs:
- `bitcoin-family-offices.pdf`
- `bitcoin-sovereign-wealth-funds.pdf`
- `bitcoin-endowments.pdf`
- `bitcoin-defined-benefit-pensions.pdf`
- `bitcoin-401k.pdf`
- `bitcoin-reinsurance.pdf`
- `bitcoin-rias.pdf`

---

## Task 12: Vercel Configuration

**Files:**
- Create: `vercel.json` (if needed for routing)

Ensure static output builds and deploys correctly.

---

## Tasks 13-18: Remaining 6 Report MDX Files

Each report gets its own MDX file with full content extracted from PDF.
These are large content tasks - each requires reading the full PDF and converting to MDX with appropriate components.

---

## Execution Order

**Phase 1 (Framework):** Tasks 1-7 - Get the site running with empty content
**Phase 2 (Reference):** Task 8 - Family Offices as the template report
**Phase 3 (Pages):** Tasks 9-10 - Index and homepage
**Phase 4 (Assets):** Task 11-12 - PDFs and deployment config
**Phase 5 (Content):** Tasks 13-18 - Convert remaining 6 PDFs
