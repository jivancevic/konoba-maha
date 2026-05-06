# CLAUDE.md

@AGENTS.md

## Commands

```bash
npm run dev    # Dev server at localhost:3000
npm run build  # Production build (Turbopack)
npm run lint   # ESLint
```

No test framework configured.

## Stack

- **Next.js** App Router — read `node_modules/next/dist/docs/` before writing code
- **React 19**, **TypeScript** (strict)
- **Tailwind CSS v4** — `@import "tailwindcss"` + `@theme inline {}`, not v3 directives
- **Framer Motion** — scroll-reveal via `src/components/Reveal.tsx`
- **Lucide React** — icons in Contact

## Architecture

`src/` only. Alias: `@/*` → `./src/*`.

**Pages:** `app/page.tsx` (landing, `lang`+`activeSection`), `app/menu/page.tsx` (menu, `lang`+`tab`), `app/layout.tsx` (fonts)

**Components:** `Navbar`, `Hero`, `Story` (+ `SectionLabel`/`SectionHeading`/`BodyText`), `Food` (+ `CTAButton`), `MenuHighlights`, `Weddings`, `Contact` (+ `Footer`), `Reveal`; menu tabs: `menu/FoodTab`, `menu/WineTab`, `menu/TastingTab`, `menu/GroupTab`

**Data:** `lib/translations.ts` (EN/HR copy), `lib/menuData.ts` (menu + `getHighlights`), `types/index.ts`

**Assets:** `public/images/`, `public/documents/` (EN + HR wedding brochures)

## Design Tokens

- **Colors:** `#F5F5F0` cream · `#EFEFEA` cream-alt · `#1A1A1A` charcoal · `#9B8060` gold · `#6B6560` muted
- **Fonts:** `--font-playfair-display` (headings/italic) · `--font-montserrat-sans` (body/labels/uppercase)
- **Reserve URL:** `https://bookmeatable.com/restaurants/konoba-maha-8`
- **Brochure:** `t.weddings.brochureFile` resolves correct `/documents/` path per locale

## Work plan

I want you to operate in a 'Plan-First' mode. For every task, start by providing a detailed Plan of Action. Once the plan is presented, you have my permission to proceed with file writes and minor edits automatically. However, you must stop and ask for permission if a command is potentially destructive (like rm, git reset) or if you need to install new npm packages.
