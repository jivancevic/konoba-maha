# Spec: anchor prices (sidrene cijene) + machine-readable price list

Legal basis: Odluka o isticanju dodatne cijene and Odluka o objavi cjenika, NN 101/2026, in force **1 Oct 2026**. Anchor date for services: **10 Sep 2026**. Obligated party: Ugostiteljski obrt Konoba "MAHA", vl. Jakša Marelić, OIB 55002761353, Vrsi bb, 20275 Žrnovo. One business premises, designation `1`.

Read `CONTEXT.md` (section *Pricing*) and `docs/adr/0003-anchor-prices-are-frozen-data.md` first. Terms below are used exactly as defined there.

All anchor amounts equal current amounts today (the price list has not changed since before 10 Sep 2026). Enter them as literals anyway — see ADR-0003.

---

## 1. Data model

### 1.1 `src/lib/prices.ts` — the single source of truth for amounts

```ts
export const ANCHOR_DATE_DISPLAY = '10.09.2026.';   // shown to guests, both languages
export const ANCHOR_DATE_ISO = '2026-09-10';        // CSV

export interface Price {
  /** EUR, current amount. */
  current: number;
  /** EUR, amount on ANCHOR_DATE. Frozen — never derived from `current`. See ADR-0003. */
  anchor: number;
}

export const prices = {
  'cold.garden-salad':        { current: 10, anchor: 10 },
  'cold.vegetarian-carpaccio': { current: 20, anchor: 20 },
  // … one entry per priced thing on the menu …
  'wine.posip.glass':         { current: 8,  anchor: 8 },
  'wine.posip.bottle':        { current: 38, anchor: 38 },
  'tasting.menu':             { current: 145, anchor: 145 },
  'tasting.menu-pairing':     { current: 190, anchor: 190 },
} as const satisfies Record<string, Price>;

export type PriceId = keyof typeof prices;
```

- Id convention: `<section>.<slug>` for dishes, `wine.<slug>.glass|bottle` for wine, `tasting.*` / `group.*` for menus. Slugs are ASCII, lowercase, hyphenated, derived from the **English** name.
- Amounts are plain EUR numbers (`7.5`, not cents, not strings). Every amount currently in `menuData.ts` is `xx,00` except one: `"1.100 €"` at `menuData.ts:203` → `1100`.
- Because `PriceId` is `keyof typeof prices`, a menu item referencing a non-existent id is a **compile error**. Because `Price.anchor` is required, an entry without an anchor is a **compile error**. That is the guarantee ADR-0003 asks for; no runtime check needed for those two.

### 1.2 `src/lib/formatPrice.ts`

```ts
export function formatPrice(amount: number, opts?: { whole?: boolean }): string
```
- Default: `21` → `"21,00 €"`, `7.5` → `"7,50 €"`, `1100` → `"1.100,00 €"`. Use `Intl.NumberFormat('hr-HR', { style: 'currency', currency: 'EUR' })`. Verify output has the non-breaking space before `€` and that it matches the existing strings byte-for-byte for the common case; if `Intl` output differs from `"21,00 €"` (regular space vs NBSP), normalise so the rendered text is identical to today's.
- `whole: true`: `145` → `"145 €"` — used only by the Tasting/Group cards which today show whole numbers.

### 1.3 `src/types/index.ts` changes

```ts
export type PriceUnit = 'pp' | 'kg';   // per person / per kilogram (peka)

export interface DishItem {
  name: string;
  desc?: string;
  priceId: PriceId;
  unit?: PriceUnit;            // replaces the "/ p.p." and "/ kg" baked into strings
  tags?: DishTag[];
}

export interface WineItem {
  name: string;
  glassId?: PriceId;
  bottleId: PriceId;
  tag?: string;
}

export interface PricePoint {
  label: string;
  priceId: PriceId;
  sub: string;
}

export interface HighlightItem {  // price REMOVED — see §4
  name: string;
  desc: string;
  tag: string;
}
```
`price: string`, `glass: string`, `bottle: string`, `value: string` are deleted, not kept as optional.

Unit labels are language-dependent: EN `/ p.p.`, `/ kg`; HR `/ os.`, `/ kg` — check what the HR block in `menuData.ts` uses today (`menuData.ts:408-426`) and keep the current HR wording. Put the label lookup in `formatPrice.ts` as `unitLabel(unit, lang)`.

### 1.4 `src/lib/menuData.ts`

- Replace every `price: "…"`, `glass: "…"`, `bottle: "…"`, `value: "…"` with the corresponding id fields. The EN and HR blocks reference the **same ids**; names/descs stay per language.
- Peka items: `priceId` + `unit: 'pp' | 'kg'`. Strip the unit from the string.
- `getHighlights()`: remove `price` from every entry.
- Import `PriceId` type; do **not** import amounts here.

### 1.5 Build-time parity check — `scripts/check-prices.ts`

Run via `"prebuild": "node scripts/check-prices.ts"` in `package.json` (Node 25, native TS — no new packages). Fails (exit 1, clear message) if:

1. Any `PriceId` in `prices` is referenced by neither the EN nor the HR menu block (orphan amount).
2. The set of ids referenced by the EN block ≠ the set referenced by the HR block (language divergence).
3. Any amount is not a finite number ≥ 0.
4. The latest CSV in `public/cjenik/manifest.json` does not match what `generateCsv()` produces now, byte-for-byte **ignoring the header line that carries the generation timestamp** (see §3.3) — i.e. someone changed a price and forgot `npm run cjenik`.

Also expose the check as `"check:prices"` script.

---

## 2. Menu UI — variant A

Design decision (prototyped, chosen by the owner): the anchor price is a **separate line directly below the current price**, right-aligned with it, in the existing muted colour. Nothing on hover, nothing collapsed, nothing behind interaction — the law requires "clearly, visibly and legibly".

### 2.1 `src/components/menu/AnchorPrice.tsx`

```tsx
<AnchorPrice amount={number} align="right" | "center" />
```
Renders `10.09.2026. — 21,00 €` with:
```
fontFamily: var(--font-montserrat-sans); fontSize: 0.55rem; fontWeight: 300;
letterSpacing: 0.03em; color: #C0BBB5; whiteSpace: nowrap; marginTop: 0.15rem
```
Never renders the unit. Uses `formatPrice(amount)` (never `whole`) so the anchor always shows decimals, even under a card that shows `145 €`.

### 2.2 Where it goes

| Component | Current price rendering | Anchor placement |
|---|---|---|
| `FoodTab.tsx` `DishRow` (`:150-155`) | right column `0.88rem` | wrap price in a right-aligned block; `<AnchorPrice>` directly below |
| `FoodTab.tsx` peka block (`:80-86`) | gold `0.88rem`, with unit | same; current shows `45,00 € / p.p.`, anchor shows `10.09.2026. — 45,00 €` (no unit) |
| `WineTab.tsx` `WineRow` (`:115-140`) | two fixed `3.5rem` columns glass/bottle | **one** line below the whole row, right-aligned: `10.09.2026. — 8,00 € / 38,00 €` (glass first if present, else bottle only). Column widths untouched. |
| `TastingTab.tsx` cards (`:112-144`) | `p.value` big Playfair | under `p.sub`: `<AnchorPrice align="center">` |
| `GroupTab.tsx` cards (`:107-139`) | identical copy of Tasting cards | same as Tasting |

Row hover behaviour, tags, `Reveal` wrappers, section headers: unchanged.

### 2.3 Footnote — `MenuClient.tsx`

Between the tab-content `div` and the `<footer>`, inside the same `maxWidth: 820` rhythm as the tabs, add one paragraph (`0.62rem`, Montserrat, weight 300, `#9B9390`, centered, generous top margin):

- HR: `Uz cijene je istaknuta i dodatna (sidrena) cijena na dan 10.09.2026., sukladno Odluci Vlade RH (NN 101/2026).`
- EN: `Alongside each price we show the anchor price as of 10.09.2026., as required by the Croatian Government's price-control decision (NN 101/2026).`

Put both strings in `translations.ts` under a new `menu.anchorNote` key (both `en` and `hr` blocks; the `Translations` type must gain the field).

---

## 3. Machine-readable price list

### 3.1 Files

- `public/cjenik/<filename>.csv` — one file per published version. Committed to the repo. **Never deleted by code**; the owner removes files older than 30 days by hand (documented in §5).
- `public/cjenik/manifest.json` — `Array<{ file: string; publishedAt: string /* ISO */; sequence: number }>`, newest last. Read by the `/cjenik` page and by `check-prices.ts`.

### 3.2 Filename

Prescribed pattern: `<vrsta objekta>_<adresa>_<oznaka objekta>_<broj pohrane>_<datum i vrijeme>`. Official example: `servis_Vukovarska 20 Osijek_U-03_015_01.10.2026_07:45`.

Ours: `konoba_Vrsi bb 20275 Žrnovo_1_<NNN>_<DD.MM.YYYY>_<HH.MM>.csv`

- `NNN` = zero-padded sequence = `manifest.length + 1`.
- Time uses `.` instead of `:` (`07.45`) — `:` is not a legal filename character on all systems and breaks static hosting. This is the only deviation from the official example; keep spaces and diacritics.
- Timestamp = generation time in `Europe/Zagreb`.

### 3.3 CSV format

- UTF-8 **with BOM** (Excel on Windows), CRLF line endings, `;` separator, decimal comma.
- Line 1: a comment-free header row of column names (no timestamp anywhere inside the file — the timestamp lives in the filename and manifest so the parity check can compare file bodies directly).
- Columns, in this order:

```
naziv_usluge;cijena;valuta;posebni_oblik_prodaje;sidrena_cijena;datum_sidrenja
Vrtna salata;10,00;EUR;;10,00;10.09.2026.
Peka – janjetina / teletina / piletina (po osobi);45,00;EUR;;45,00;10.09.2026.
Konoba Maha Pošip 0,125 l;8,00;EUR;;8,00;10.09.2026.
Konoba Maha Pošip 0,75 l;38,00;EUR;;38,00;10.09.2026.
Degustacijski meni (po osobi);145,00;EUR;;145,00;10.09.2026.
```

- `naziv_usluge` = the **HR** name from `menuData.hr`, plus a disambiguator where one menu row carries several Prices: wine → ` 0,125 l` / ` 0,75 l`; peka → ` (po osobi)` / ` (po kg)`; tasting/group → the HR `label` in parentheses.
- `posebni_oblik_prodaje` is always empty (no promotions).
- Rows in menu order: food sections, peka, desserts, wine sections, tasting, group. Every `PriceId` appears exactly once.

### 3.4 Generator — `scripts/generate-cjenik.ts`

`"cjenik": "node scripts/generate-cjenik.ts"`. Pure function `generateCsv(): string` exported from `src/lib/cjenik.ts` (importable by both the script and the check); the script wraps it with filename/manifest/write. Idempotent: if the body is identical to the latest manifest entry's file, print "unchanged" and write nothing.

### 3.5 `/cjenik` page — `src/app/[lang]/cjenik/page.tsx`

Server component, static. Lists manifest entries **newest first**: publication date/time (HR locale), sequence number, link to the file (`/cjenik/<encoded filename>`). Marks the first entry as current. One-line intro (HR/EN) saying what this is and citing NN 101/2026. Same visual language as the menu page (cream background, Montserrat labels, Playfair heading) — reuse the top-nav pattern from `MenuClient.tsx` or extract it; keep it minimal. Add `generateMetadata` with `noindex` (it's a compliance page, not a marketing page) and HR/EN alternates.

`generateStaticParams` on `[lang]/layout.tsx` already yields `en`/`hr`; the page must `notFound()` for other langs like `menu/page.tsx` does.

### 3.6 Links

- `src/components/Footer.tsx` (landing): add a text link `Cjenik` / `Price list` next to `t.location`, same style. Strings in `translations.ts` → `footer.priceList`.
- `MenuClient.tsx` footer: same link next to the back link.

---

## 4. Landing highlights — remove price

- `HighlightItem.price` removed from the type and from `getHighlights()`.
- `MenuHighlights.tsx:120-137`: delete the price `div`; the name keeps its row. Nothing else in the card changes.

---

## 5. Docs

`docs/cjenik-postupak.md` (Croatian — it is for the owner/maintainer):
1. Cijena se mijenja **samo** u `src/lib/prices.ts`, polje `current`. Polje `anchor` se **ne dira** (ADR-0003).
2. `npm run cjenik` → nova datoteka u `public/cjenik/` + manifest.
3. `npm run build` mora proći (prebuild provjera).
4. Commit + deploy **prije 8:00** na dan kad nova cijena vrijedi.
5. Datoteke starije od 30 dana brisati ručno iz `public/cjenik/` i iz `manifest.json` (nikad zadnju).
6. Nova stavka: dodati u `prices.ts` s `anchor` = cijena pri prvom uvrštenju, dodati u oba jezična bloka `menuData.ts`.

Also update `CLAUDE.md` *Data* line to mention `lib/prices.ts`, `lib/cjenik.ts`, and fix the two stale page paths (`app/[lang]/page.tsx`, `app/[lang]/menu/page.tsx`).

---

## 6. Out of scope (do not do)

- Drinks / coffee / spirits — awaiting the owner's POS export. Leave the structure ready (nothing special needed; they will be a new food section + price ids).
- Any change to the physical/printed menu.
- Maha Bar, Bazita.
- Re-styling anything beyond what §2 lists.
- Deleting the `proto/sidrene-cijene` branch.

## 7. Acceptance

- `npm run build` passes, including `prebuild`.
- `npm run lint` passes.
- `/hr/menu` and `/en/menu`: every price has an anchor line beneath it; wine rows have one anchor line; tasting/group cards have one centered anchor line; footnote present.
- Landing highlights show no prices.
- `/hr/cjenik` lists exactly one file, linked and downloadable; the CSV opens in Excel with correct diacritics and decimal commas.
- Changing any `current` in `prices.ts` without running `npm run cjenik` makes `npm run build` fail with a message that names the fix.
- Removing any `anchor` field is a TypeScript error.
- Commit on `feat/sidrene-cijene` in small, logical commits (data model → UI → price list → docs). Commit messages in English. Do not commit `.claude/`, `.agents/`, `help/`, `skills-lock.json`, `memory/`. **Do** commit `CONTEXT.md`, `docs/adr/`, `docs/sidrene-cijene-spec.md`.
