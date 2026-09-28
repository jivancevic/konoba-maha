/**
 * The single source of truth for every amount Konoba Maha charges.
 *
 * Each Price has one stable id; the Menu and the Price List both reference
 * Prices by id — neither holds its own copy. `anchor` is a frozen historical
 * fact, entered once and never derived from `current`. See ADR-0003.
 */

/** The Anchor Date in Croatian notation — shown to guests in both languages. */
export const ANCHOR_DATE_DISPLAY = '10.09.2026.';
/** The Anchor Date as ISO — used by the machine-readable Price List. */
export const ANCHOR_DATE_ISO = '2026-09-10';

export interface Price {
  /** EUR, current amount. */
  current: number;
  /** EUR, amount on ANCHOR_DATE. Frozen — never derived from `current`. See ADR-0003. */
  anchor: number;
}

export const prices = {
  /* ── Cold starters ── */
  'cold.garden-salad': { current: 10, anchor: 10 },
  'cold.vegetarian-carpaccio': { current: 20, anchor: 20 },
  'cold.beef-tartare': { current: 21, anchor: 21 },
  'cold.pesto-burrata': { current: 23, anchor: 23 },
  'cold.local-platter': { current: 26, anchor: 26 },
  'cold.gambero-rosso-carpaccio': { current: 28, anchor: 28 },

  /* ── Warm starters ── */
  'warm.zucchini-turmeric-cream-soup': { current: 11, anchor: 11 },
  'warm.grilled-broccoli': { current: 23, anchor: 23 },
  'warm.traditional-soparnik': { current: 24, anchor: 24 },
  'warm.grandmas-makaruni': { current: 25, anchor: 25 },
  'warm.wild-pesto-makaruni': { current: 27, anchor: 27 },

  /* ── Main courses ── */
  'mains.gnocchi-rustic-beef': { current: 36, anchor: 36 },
  'mains.grilled-octopus': { current: 38, anchor: 38 },
  'mains.grilled-lamb': { current: 40, anchor: 40 },
  'mains.monkfish-truffle-makaruni': { current: 42, anchor: 42 },
  'mains.dry-aged-rib-eye': { current: 45, anchor: 45 },

  /* ── Peka ── */
  'peka.lamb-veal-chicken': { current: 45, anchor: 45 },
  'peka.octopus': { current: 49, anchor: 49 },
  'peka.daily-catch-fish': { current: 99, anchor: 99 },

  /* ── Desserts ── */
  'desserts.sweet-of-the-day': { current: 11, anchor: 11 },
  'desserts.traditional-sweets-of-korcula': { current: 9, anchor: 9 },

  /* ── White wines ── */
  'wine.konoba-maha-posip.glass': { current: 8, anchor: 8 },
  'wine.konoba-maha-posip.bottle': { current: 38, anchor: 38 },
  'wine.sauvignon-soskic.bottle': { current: 35, anchor: 35 },
  'wine.posip-nerica.bottle': { current: 50, anchor: 50 },
  'wine.malvazija-kozlovic.bottle': { current: 52, anchor: 52 },
  'wine.debit-ante-sladic.bottle': { current: 52, anchor: 52 },
  'wine.marastina-markus.glass': { current: 12, anchor: 12 },
  'wine.marastina-markus.bottle': { current: 57, anchor: 57 },
  'wine.grk-radovanovic.glass': { current: 13, anchor: 13 },
  'wine.grk-radovanovic.bottle': { current: 60, anchor: 60 },
  'wine.posip-pavicic-sur-lie.bottle': { current: 66, anchor: 66 },
  'wine.chardonnay-sur-lie-barun.glass': { current: 15, anchor: 15 },
  'wine.chardonnay-sur-lie-barun.bottle': { current: 69, anchor: 69 },
  'wine.chablis-1er-cru.bottle': { current: 80, anchor: 80 },
  'wine.sancerre-silex.bottle': { current: 104, anchor: 104 },

  /* ── Rosé wines ── */
  'wine.rose-galic.bottle': { current: 41, anchor: 41 },
  'wine.miraval-chateau.bottle': { current: 67, anchor: 67 },

  /* ── Red wines ── */
  'wine.konoba-maha-plavac.glass': { current: 8, anchor: 8 },
  'wine.konoba-maha-plavac.bottle': { current: 39, anchor: 39 },
  'wine.plavac-single-barrel.bottle': { current: 49, anchor: 49 },
  'wine.masi-campofiorin.bottle': { current: 52, anchor: 52 },
  'wine.maha-bratinicevic-zinfandel.glass': { current: 12, anchor: 12 },
  'wine.maha-bratinicevic-zinfandel.bottle': { current: 57, anchor: 57 },
  'wine.degarra-bontera.glass': { current: 12, anchor: 12 },
  'wine.degarra-bontera.bottle': { current: 59, anchor: 59 },
  'wine.pinot-noir-barun.glass': { current: 14, anchor: 14 },
  'wine.pinot-noir-barun.bottle': { current: 67, anchor: 67 },
  'wine.pagan-reserva.bottle': { current: 82, anchor: 82 },
  'wine.babic-gracin.glass': { current: 18, anchor: 18 },
  'wine.babic-gracin.bottle': { current: 89, anchor: 89 },
  'wine.veliko-crno-markus.bottle': { current: 156, anchor: 156 },
  'wine.dingac-markus-pepeljuh.bottle': { current: 195, anchor: 195 },
  'wine.markus-franz-ferdinand.bottle': { current: 1100, anchor: 1100 },

  /* ── Sparkling ── */
  'wine.maha-elegance.glass': { current: 11, anchor: 11 },
  'wine.maha-elegance.bottle': { current: 55, anchor: 55 },
  'wine.barun-le-rose-pinot-noir.bottle': { current: 57, anchor: 57 },

  /* ── Champagne ── */
  'wine.taittinger-brut.bottle': { current: 117, anchor: 117 },
  'wine.leclerc-briant-reserve-brut-bio.bottle': { current: 150, anchor: 150 },

  /* ── Tasting menu ── */
  'tasting.menu': { current: 145, anchor: 145 },
  'tasting.menu-pairing': { current: 190, anchor: 190 },

  /* ── Group menu ── */
  'group.food-only': { current: 110, anchor: 110 },
  'group.food-wine-pairing': { current: 150, anchor: 150 },
} as const satisfies Record<string, Price>;

export type PriceId = keyof typeof prices;
