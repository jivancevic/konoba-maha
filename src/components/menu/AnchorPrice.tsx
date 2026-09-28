'use client';

import { ANCHOR_DATE_DISPLAY } from '@/lib/prices';
import { formatPrice } from '@/lib/formatPrice';

interface AnchorPriceProps {
  amount: number;
  /** Second amount on the same line — the wine rows show glass and bottle together. */
  secondAmount?: number;
  align?: 'right' | 'center';
}

/**
 * The Anchor Price line that must sit next to every price we show (NN 101/2026).
 * Never renders a unit, and always shows decimals — even under a card whose
 * current price is a whole number.
 */
export default function AnchorPrice({ amount, secondAmount, align = 'right' }: AnchorPriceProps) {
  return (
    <div
      style={{
        fontFamily: 'var(--font-montserrat-sans)',
        fontSize: '0.55rem',
        fontWeight: 300,
        letterSpacing: '0.03em',
        color: '#C0BBB5',
        whiteSpace: 'nowrap',
        marginTop: '0.15rem',
        textAlign: align,
      }}
    >
      {ANCHOR_DATE_DISPLAY} — {formatPrice(amount)}
      {secondAmount != null && ` / ${formatPrice(secondAmount)}`}
    </div>
  );
}
