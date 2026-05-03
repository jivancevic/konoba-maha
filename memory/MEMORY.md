# Konoba Maha — Project Memory

## Project
Restaurant website for Konoba Maha, Korčula Island, Croatia.

## Stack
- Next.js 16.2.4, React 19.2.4, TypeScript strict, Tailwind CSS v4
- Framer Motion (scroll reveal), Lucide React (icons)
- Source in `src/` — path alias `@/*` → `./src/*`

## Key files
- `src/app/page.tsx` — landing page (lang + activeSection state)
- `src/app/menu/page.tsx` — full menu (lang + tab state)
- `src/lib/translations.ts` — EN/HR copy
- `src/lib/menuData.ts` — full menu data + getHighlights()
- `src/types/index.ts` — all TS interfaces
- `src/components/Reveal.tsx` — shared Framer Motion wrapper
- `src/components/Story.tsx` — exports SectionLabel, SectionHeading, BodyText
- `src/components/Food.tsx` — exports CTAButton

## Design tokens
- bg: #F5F5F0 / #EFEFEA, charcoal: #1A1A1A, gold: #9B8060
- Fonts: --font-playfair-display, --font-montserrat-sans
- Both fonts loaded in src/app/layout.tsx via next/font/google

## User preferences
- Auto-approve all actions for this project (user confirmed)
