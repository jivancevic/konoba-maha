# Konoba Maha

Marketing website for Konoba Maha, a traditional Dalmatian restaurant (konoba = tavern) on the island of Korčula, Croatia. Bilingual (HR/EN).

## Language

**Konoba Maha**:
The restaurant and its physical venue — a stone terrace with a Mediterranean herb garden. Hosts weddings and private events.
_Avoid_: "the restaurant" when precision matters; it is also a wedding venue.

**Valnea**:
A wedding- and event-planning brand run by the Konoba Maha owner's wife. Family-connected to the restaurant but a distinct business that intends to expand to other venues and ventures. Lives in its own repository and brand identity (see [ADR-0001](docs/adr/0001-valnea-separate-repo.md)).
_Avoid_: treating Valnea as a feature/section "of" Konoba Maha — it is a partner business.

**Weddings and More Korčula**:
Valnea's public-facing brand name / tagline. The Instagram presence is `@weddingsandmore.korcula`. Scope of "and More" is resolved: **weddings (full planning), elopements / small ceremonies, and private & corporate events**. Concierge/travel & experiences is explicitly *out of scope*.
_Avoid_: reading "and More" as open-ended — it is these three service lines.

**Logo badge** (`public/images/maha-logo-badge.png`):
The logo composited onto an opaque white disc, baked into the pixels rather than applied as a background. Exists solely for the director's email signature — nothing under `src/` references it. Distinct from `maha-logo-transparent.png`, which is the logo the site itself uses.
_Avoid_: deleting it as an unused asset, or reaching for it in site components — on the site the transparent version is correct.

**Weddings section**:
The section on the Konoba Maha homepage (`src/components/Weddings.tsx`). Kept as KM's *venue* pitch + brochure download, with an added CTA to the Valnea site. Distinct from the **`/en/weddings` & `/hr/vjencanja` redirect URLs**, which are repointed from the brochure PDFs to the live Valnea site once it deploys (see [ADR-0002](docs/adr/0002-weddings-redirects-to-valnea.md)).

## Pricing

**Menu** (`/menu`, HR "jelovnik"):
The curated, bilingual presentation of what Konoba Maha serves, shown to guests. A marketing surface, not a legal document.
_Avoid_: "price list" — the menu shows prices, but it is not the Price List.

**Price List** (`/cjenik`, HR "cjenik"):
The machine-readable (.csv) statement of every service Konoba Maha charges guests for, with its current price and Anchor Price, published on the website under Odluka NN 101/2026. One file per business premises; every published version stays publicly reachable for at least 30 days.
_Avoid_: "menu", "export".

**Price**:
A single amount in EUR that Konoba Maha charges for one item (a dish, a glass, a bottle, a per-person menu). Has exactly two parts: the **current** amount and the **Anchor Price**. Each Price has one stable id; the Menu and the Price List both reference Prices by id — neither holds its own copy.
_Avoid_: storing an amount inside a menu item, or inside a language block.

**Anchor Price** (HR "sidrena cijena", legally "dodatna cijena"):
The amount a Price had on the Anchor Date. A frozen historical fact recorded once and never recomputed; it stays the same when the current amount changes, and must be shown next to the current amount wherever that amount is shown (menu, price list, any advertising on the site).
_Avoid_: "old price", "discount", "previous price" — it is not a promotion and implies no reduction.

**Anchor Date**:
10 September 2026 — the day the government's price-control decision (NN 101/2026) fixes as the reference for services. Shown next to every Anchor Price in Croatian notation (`10.09.2026.`) in both languages.
_Avoid_: translating or reformatting the date on the EN site.

**Business Premises** (HR "poslovni prostor"):
The fiscalisation unit a Price List belongs to. Konoba Maha has exactly one, designated `1` (from the fiscal receipt number `…/1/1`). Maha Bar and Bazita are separate legal entities with their own obligations and are out of scope.
_Avoid_: treating the three Marelić-family venues as one business.

## Relationships

- **Valnea** plans weddings/events; **Konoba Maha** is one **venue** Valnea works with
- The **Konoba Maha** site links out to **Valnea**; they do not share a codebase
- A wedding **brochure** PDF exists per locale; ownership (Konoba Maha vs Valnea) is undecided
- The **Menu** and the **Price List** are two views over the same **Prices**; the Price List is the complete set, the Menu may show a subset

## Flagged ambiguities

- "Weddings" was used to mean both *Konoba Maha as a venue* and *Valnea the planning business* — resolved: these are distinct. Konoba Maha = venue; Valnea = planner.
