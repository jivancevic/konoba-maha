# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Production build (Turbopack)
npm run lint     # Run ESLint
```

No test framework is configured.

## Stack

- **Next.js 16.2.4** with App Router — APIs differ from earlier versions; read `node_modules/next/dist/docs/` before writing code
- **React 19.2.4**
- **TypeScript** (strict mode)
- **Tailwind CSS v4** — uses `@import "tailwindcss"` and `@theme inline {}` blocks, not v3's `@tailwind` directives; configured via `@tailwindcss/postcss`
- **Framer Motion** — used for scroll-reveal animations via `src/components/Reveal.tsx`
- **Lucide React** — icons used in Contact section

## Architecture

All source lives under `src/`. Path alias `@/*` → `./src/*`.

### Pages
- `src/app/page.tsx` — Landing page (Client Component; manages `lang` + `activeSection` state)
- `src/app/menu/page.tsx` — Full menu page (Client Component; manages `lang` + `tab` state)
- `src/app/layout.tsx` — Root layout: loads Playfair Display + Montserrat via `next/font/google`

### Components
- `src/components/Navbar.tsx` — Sticky nav with scroll-opacity transition + mobile drawer
- `src/components/Hero.tsx` — Full-screen hero with background image + CTA buttons
- `src/components/Story.tsx` — Two-column layout; also exports `SectionLabel`, `SectionHeading`, `BodyText` shared primitives
- `src/components/Food.tsx` — Food intro + full-width Peka dark block; also exports `CTAButton`
- `src/components/MenuHighlights.tsx` — 6-item à la carte grid + link to `/menu`
- `src/components/Weddings.tsx` — Sticky image column (desktop) + features list + brochure download
- `src/components/Contact.tsx` — Map SVG, contact info, enquiry form; renders `Footer` inline
- `src/components/Footer.tsx` — Logo + copyright + location
- `src/components/Reveal.tsx` — Framer Motion fade-in-up wrapper (props: `delay`, `direction`, `className`, `style`)
- `src/components/menu/FoodTab.tsx` — Full food menu with Peka special block
- `src/components/menu/WineTab.tsx` — Wine list with glass/bottle columns
- `src/components/menu/TastingTab.tsx` — Timeline courses + pricing cards
- `src/components/menu/GroupTab.tsx` — Group event courses + pricing + disclaimer

### Data
- `src/lib/translations.ts` — All EN/HR copy; exported as `translations: Record<Language, Translations>`
- `src/lib/menuData.ts` — Full menu data (`menuPageData`) + `getHighlights(lang)` for highlights section
- `src/types/index.ts` — All TypeScript interfaces

### Assets
- `public/images/` — All site images (hero.jpg, peka.jpg, outside.jpg, family.jpg, netflix.jpg, carpaccio.jpg, plata.jpg, wine.jpg, table01.jpg, table02.jpg, bride.jpg, cutlery.jpg, table.jpg, maha-logo-transparent.png)
- `public/documents/` — Wedding brochures: `Konoba-Maha-Wedding-Brochure.pdf` (EN) and `Konoba-Maha-Ponuda-Za-Vjencanje.pdf` (HR)

## Key Design Details

- **Colors**: `#F5F5F0` (bg-cream), `#EFEFEA` (bg-cream-alt), `#1A1A1A` (charcoal), `#9B8060` (gold/accent), `#6B6560` (muted text)
- **Fonts**: `--font-playfair-display` (headings, italic), `--font-montserrat-sans` (body, labels, uppercase tracking)
- **Peka image**: `objectPosition: 'center 60%'` — focuses the frame on the octopus
- **Wedding images**: `md:sticky md:top-[100px]` — sticky on desktop, static scroll on mobile
- **Reserve CTA URL**: `https://bookmeatable.com/restaurants/konoba-maha-8`
- **Brochure PDF**: language-dependent — `t.weddings.brochureFile` resolves to the correct `/documents/` path per locale
