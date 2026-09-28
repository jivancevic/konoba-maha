import type { PriceUnit } from '@/types';

const eurFormatter = new Intl.NumberFormat('hr-HR', {
  style: 'currency',
  currency: 'EUR',
});

const wholeFormatter = new Intl.NumberFormat('hr-HR', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/**
 * Renders an amount the way the menu has always rendered it: `21` → `21,00 €`,
 * `1100` → `1.100,00 €`. `Intl` puts a non-breaking space before the symbol while
 * the hand-written strings it replaces used a regular one — normalise so the
 * rendered text stays byte-for-byte identical to today's.
 *
 * `whole: true` drops the decimals (`145 €`) — only the Tasting/Group cards use it.
 */
export function formatPrice(amount: number, opts?: { whole?: boolean }): string {
  const f = opts?.whole ? wholeFormatter : eurFormatter;
  return f.format(amount).replace('\u00A0', ' ');
}

/* The `/ p.p.` and `/ kg` suffixes the peka prices used to carry inside their strings.
   The menu has always used the same two labels in both languages. */
const UNIT_LABELS: Record<PriceUnit, string> = { pp: '/ p.p.', kg: '/ kg' };

export function unitLabel(unit: PriceUnit): string {
  return UNIT_LABELS[unit];
}
