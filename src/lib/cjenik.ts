/**
 * The machine-readable Price List (`/cjenik`) required by Odluka o objavi cjenika,
 * NN 101/2026. One row per Price, named in Croatian, with the current amount and
 * the Anchor Price side by side.
 *
 * `generateCsv()` is pure — the generator script wraps it with filename, manifest
 * and file write, and the prebuild parity check compares its output against the
 * latest published file.
 *
 * Relative `.ts` specifiers (not the `@/` alias) so Node can run this directly.
 */
import { menuPageData } from './menuData.ts';
import { prices, ANCHOR_DATE_DISPLAY } from './prices.ts';
import type { PriceId } from './prices.ts';

/** UTF-8 BOM — Excel on Windows needs it to read the diacritics. */
export const CSV_BOM = '\uFEFF';

const CSV_HEADER =
  'naziv_usluge;cijena;valuta;posebni_oblik_prodaje;sidrena_cijena;datum_sidrenja';

/** One published version of the Price List. `public/cjenik/manifest.json` is an array of these, newest last. */
export interface CjenikManifestEntry {
  file: string;
  /** ISO timestamp of generation. */
  publishedAt: string;
  sequence: number;
}

export interface PriceListRow {
  /** The service name as a guest reads it on the Croatian menu, disambiguated. */
  name: string;
  priceId: PriceId;
}

/** Decimal comma, two places, no thousands separator — this is a data file. */
function csvAmount(amount: number): string {
  return amount.toFixed(2).replace('.', ',');
}

/**
 * Every Price exactly once, in menu order: food sections (peka among them),
 * desserts, wine sections, tasting menu, group menu.
 */
export function priceListRows(): PriceListRow[] {
  const d = menuPageData.hr;
  const rows: PriceListRow[] = [];

  for (const sec of d.food.sections) {
    for (const item of sec.items) {
      // A peka row carries several Prices across the menu, so the unit goes in the name;
      // the section label keeps "Riba (po kg)" readable on its own.
      const base = sec.peka ? `${sec.label} – ${item.name}` : item.name;
      const unit = item.unit === 'kg' ? ' (po kg)' : item.unit === 'pp' ? ' (po osobi)' : '';
      rows.push({ name: `${base}${unit}`, priceId: item.priceId });
    }
  }

  for (const sec of d.wine.sections) {
    for (const item of sec.items) {
      if (item.glassId) rows.push({ name: `${item.name} 0,125 l`, priceId: item.glassId });
      rows.push({ name: `${item.name} 0,75 l`, priceId: item.bottleId });
    }
  }

  for (const p of [d.tasting.price1, d.tasting.price2]) {
    rows.push({ name: `${d.tasting.title} (${p.label})`, priceId: p.priceId });
  }

  for (const p of [d.group.price1, d.group.price2]) {
    rows.push({ name: `${d.group.title} (${p.label})`, priceId: p.priceId });
  }

  return rows;
}

/**
 * The full CSV body: BOM, header line, one line per Price, CRLF throughout.
 * No timestamp anywhere inside — that lives in the filename and the manifest,
 * so the parity check can compare bodies byte-for-byte.
 */
export function generateCsv(): string {
  const lines = [CSV_HEADER];

  for (const row of priceListRows()) {
    const price = prices[row.priceId];
    lines.push(
      [
        row.name,
        csvAmount(price.current),
        'EUR',
        '', // posebni_oblik_prodaje — always empty, we run no promotions
        csvAmount(price.anchor),
        ANCHOR_DATE_DISPLAY,
      ].join(';'),
    );
  }

  return CSV_BOM + lines.map((l) => `${l}\r\n`).join('');
}
