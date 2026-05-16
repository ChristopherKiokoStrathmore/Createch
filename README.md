# Createch Architects — Website

Production-grade Next.js 14 website for Createch Architects, a premium architecture and interiors firm based in Nairobi, Kenya.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 14 (App Router) | Framework |
| TypeScript | Type safety |
| Tailwind CSS v3 | Styling + brand tokens |
| Framer Motion v11 | Layout, scroll, page transitions |
| Anime.js v3 | SVG draw, counters, text scramble |
| Lenis v1.3 | Smooth scroll inertia |
| lucide-react | Icons |

> **Fonts** — Playfair Display + Inter loaded via `<link>` tag in `app/layout.tsx` (not `next/font`).

## Project Structure

```
app/
  layout.tsx          — LenisProvider, CustomCursor, ScrollProgress, fonts
  page.tsx            — Section composition
  globals.css         — cursor:none, grain overlay, marquee keyframes

components/
  ui/
    CustomCursor.tsx  — Magnetic spring cursor with view/hover states
    ScrollProgress.tsx — Gold progress bar tied to scroll
    MagneticButton.tsx — Physics-based magnetic hover
    TextReveal.tsx    — Clip-mask text slide reveals
    ImageParallax.tsx — Scroll-linked parallax wrapper

  sections/
    Preloader.tsx     — Logo stamp + slide-up exit
    Navbar.tsx        — Transparent → white on scroll, scramble links
    Hero.tsx          — Full viewport, staggered line reveals
    Marquee.tsx       — CSS infinite ticker
    Services.tsx      — 3 disciplines, anime.js border draw
    ProjectGrid.tsx   — 5-card asymmetric layout
    FeaturedProject.tsx — Single hero showcase with parallax
    About.tsx         — Stats + studio image
    Values.tsx        — 4 principals with SVG circle draw
    Process.tsx       — Horizontal sticky scroll (desktop)
    Testimonials.tsx  — Paginated quote carousel
    CtaBanner.tsx     — Gold full-width CTA
    Contact.tsx       — Form with animated borders
    Footer.tsx        — 4-col grid with social links

lib/
  animations.ts       — Shared Framer Motion variants
  data.ts             — Static content (projects, services, values)
  lenis.tsx           — LenisProvider context
  utils.ts            — cn() utility
```

## Deployment (Vercel)

Connect the GitHub repo in the Vercel dashboard — no configuration required. Vercel auto-detects Next.js.

```bash
# Or via CLI
npm i -g vercel
vercel --prod
```

## Domain Setup

To point `createch.co.ke` to Vercel:

1. Vercel project → **Settings** → **Domains** → add `createch.co.ke`
2. In your DNS provider:

| Type | Name | Value |
|------|------|-------|
| A | @ | `76.76.21.21` |
| CNAME | www | `cname.vercel-dns.com` |

DNS propagation: 15 min – 48 hours.

## Environment Variables

None required. This is a static marketing site with no external APIs or databases.

## Brand Tokens

| Token | Value |
|-------|-------|
| Gold | `#EF9F27` |
| Ink | `#0D0D0D` |
| Chalk | `#FAFAF8` |
| Stone | `#F5F4F0` |
| Heading font | Playfair Display 400/700/900 |
| Body font | Inter 300/400/500 |
