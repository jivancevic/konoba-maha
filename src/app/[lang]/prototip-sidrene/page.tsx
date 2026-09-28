/* =========================================================================
 * PROTOTIP — NIJE PRODUKCIJSKI KOD. Obrisati nakon odluke.
 *
 * Pitanje na koje odgovara: kako prikazati sidrenu (dodatnu) cijenu iz
 * Odluke NN 101/2026 uz postojeće cijene, a da vizualno što manje smeta.
 *
 * Tri varijante, prebacivanje preko ?v=A|B|C ili donje trake.
 * Sve sidrene cijene su JEDNAKE trenutačnima (cjenik nepromijenjen od
 * 10.09.2026.) — prototip namjerno prikazuje taj degenerirani slučaj,
 * jer je to stvarno stanje.
 * ========================================================================= */
'use client';

import { useEffect, useState } from 'react';
import { menuPageData } from '@/lib/menuData';
import type { DishItem, WineItem, PricePoint } from '@/types';

type Variant = 'A' | 'B' | 'C';

const ANCHOR_DATE = '10.09.2026.';

/** Sidrena cijena = trenutačna, bez jedinice ("45,00 € / p.p." -> "45,00 €"). */
function anchorOf(price: string): string {
  return price.split('/')[0].trim();
}

/* ── zajednički atomi ────────────────────────────────────────────────── */

const microStyle: React.CSSProperties = {
  fontFamily: 'var(--font-montserrat-sans)',
  fontSize: '0.55rem',
  fontWeight: 300,
  letterSpacing: '0.03em',
  color: '#C0BBB5',
  whiteSpace: 'nowrap',
};

/** Varijanta A — zaseban redak ispod cijene. */
function AnchorBelow({ price }: { price: string }) {
  return (
    <div style={{ ...microStyle, marginTop: '0.15rem', textAlign: 'right' }}>
      {ANCHOR_DATE} — {anchorOf(price)}
    </div>
  );
}

/** Varijanta B — inline u zagradi, isti redak. */
function AnchorInline({ price }: { price: string }) {
  return (
    <span style={{ ...microStyle, marginLeft: '0.5rem' }}>
      ({ANCHOR_DATE}: {anchorOf(price)})
    </span>
  );
}

/* ── FOOD: obična jela ───────────────────────────────────────────────── */

function DishRow({ item, last, v }: { item: DishItem; last: boolean; v: Variant }) {
  return (
    <div
      className="flex justify-between items-start gap-6 py-[1.1rem] -mx-3 px-3"
      style={{ borderBottom: last ? 'none' : '1px solid rgba(26,26,26,0.06)' }}
    >
      <div className="flex-1">
        <div style={{ fontFamily: 'var(--font-playfair-display)', fontSize: '1.05rem', color: '#1A1A1A', marginBottom: item.desc ? '0.3rem' : 0 }}>
          {item.name}
        </div>
        {item.desc && (
          <div style={{ fontFamily: 'var(--font-montserrat-sans)', fontSize: '0.7rem', color: '#9B9390', lineHeight: 1.65, letterSpacing: '0.03em', fontWeight: 300 }}>
            {item.desc}
          </div>
        )}
      </div>

      {v === 'C' ? (
        <>
          <div style={{ ...priceStyle, width: '4.2rem', textAlign: 'right' }}>{item.price}</div>
          <div style={{ ...microStyle, width: '4.2rem', textAlign: 'right', paddingTop: '3px' }}>
            {anchorOf(item.price)}
          </div>
        </>
      ) : (
        <div className="flex-shrink-0 pt-[2px]" style={{ textAlign: 'right' }}>
          <span style={priceStyle}>{item.price}</span>
          {v === 'B' && <AnchorInline price={item.price} />}
          {v === 'A' && <AnchorBelow price={item.price} />}
        </div>
      )}
    </div>
  );
}

const priceStyle: React.CSSProperties = {
  fontFamily: 'var(--font-montserrat-sans)',
  fontSize: '0.88rem',
  fontWeight: 600,
  color: '#1A1A1A',
};

/** Zaglavlje stupaca — samo varijanta C. */
function ColumnHeader({ left, cols }: { left: string; cols: string[] }) {
  return (
    <div className="flex justify-between gap-6 px-3 pb-2">
      <span className="uppercase flex-1" style={{ ...labelStyle }}>{left}</span>
      {cols.map((c) => (
        <span key={c} className="uppercase text-right" style={{ ...labelStyle, width: '4.2rem' }}>
          {c}
        </span>
      ))}
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-montserrat-sans)',
  fontSize: '0.5rem',
  letterSpacing: '0.2em',
  color: '#C0BBB5',
};

/* ── FOOD: peka ──────────────────────────────────────────────────────── */

function PekaBlock({ items, note, v }: { items: DishItem[]; note?: string; v: Variant }) {
  return (
    <div className="relative mb-4" style={{ border: '1px solid #9B8060', padding: 'clamp(2rem,4vw,3rem)' }}>
      <div className="absolute -top-px left-8 px-4 py-1" style={{ background: '#9B8060' }}>
        <span className="uppercase font-semibold" style={{ fontFamily: 'var(--font-montserrat-sans)', fontSize: '0.55rem', letterSpacing: '0.25em', color: '#F5F5F0' }}>
          Samo uz narudžbu
        </span>
      </div>
      <h3 style={{ fontFamily: 'var(--font-playfair-display)', fontSize: 'clamp(1.8rem,3vw,2.4rem)', letterSpacing: '0.04em', color: '#1A1A1A', paddingTop: '0.5rem' }}>
        Peka
      </h3>
      <div className="flex items-center gap-3 mb-8 mt-2" style={{ fontFamily: 'var(--font-montserrat-sans)', fontSize: '0.7rem', color: '#9B8060', letterSpacing: '0.1em' }}>
        <span className="inline-block flex-shrink-0" style={{ width: 20, height: 1, background: '#9B8060' }} />
        {note}
      </div>

      {v === 'C' && <ColumnHeader left="Jelo" cols={['Cijena', ANCHOR_DATE]} />}

      {items.map((item, ii) => (
        <div
          key={ii}
          className="flex justify-between items-baseline gap-4 py-[0.9rem]"
          style={{ borderBottom: ii < items.length - 1 ? '1px solid rgba(155,128,96,0.2)' : 'none' }}
        >
          <div className="flex-1">
            <div style={{ fontFamily: 'var(--font-playfair-display)', fontSize: '1.05rem', color: '#1A1A1A', marginBottom: '0.2rem' }}>
              {item.name}
            </div>
            {item.desc && (
              <div style={{ fontFamily: 'var(--font-montserrat-sans)', fontSize: '0.68rem', color: '#9B9390', letterSpacing: '0.04em', fontWeight: 300 }}>
                {item.desc}
              </div>
            )}
          </div>

          {v === 'C' ? (
            <>
              <div style={{ ...priceStyle, color: '#9B8060', width: '4.2rem', textAlign: 'right' }}>{item.price}</div>
              <div style={{ ...microStyle, width: '4.2rem', textAlign: 'right' }}>{anchorOf(item.price)}</div>
            </>
          ) : (
            <div className="flex-shrink-0" style={{ textAlign: 'right' }}>
              <span style={{ ...priceStyle, color: '#9B8060' }}>{item.price}</span>
              {v === 'B' && <AnchorInline price={item.price} />}
              {v === 'A' && <AnchorBelow price={item.price} />}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ── WINE ────────────────────────────────────────────────────────────── */

function WineRow({ item, last, hasGlass, v }: { item: WineItem; last: boolean; hasGlass: boolean; v: Variant }) {
  const glassCell = (
    <span style={{ fontFamily: 'var(--font-montserrat-sans)', fontSize: '0.82rem', fontWeight: item.glass ? 500 : 300, color: item.glass ? '#1A1A1A' : '#C0BBB5', width: '3.5rem', textAlign: 'right' }}>
      {item.glass ?? '—'}
    </span>
  );
  const bottleCell = (
    <span style={{ fontFamily: 'var(--font-montserrat-sans)', fontSize: '0.82rem', fontWeight: 600, color: '#9B8060', width: '3.5rem', textAlign: 'right' }}>
      {item.bottle}
    </span>
  );

  return (
    <div
      className="-mx-3 px-3 py-[0.9rem]"
      style={{ borderBottom: last ? 'none' : '1px solid rgba(26,26,26,0.05)' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <div className="flex flex-1 items-center gap-4 flex-wrap">
          <span style={{ fontFamily: 'var(--font-playfair-display)', fontSize: '1rem', color: '#1A1A1A' }}>{item.name}</span>
          {item.tag && (
            <span className="uppercase font-semibold whitespace-nowrap" style={{ fontFamily: 'var(--font-montserrat-sans)', fontSize: '0.5rem', letterSpacing: '0.15em', color: '#607B60', border: '1px solid rgba(96,123,96,0.4)', padding: '2px 8px' }}>
              {item.tag}
            </span>
          )}
        </div>

        <div className="flex gap-10 flex-shrink-0">
          {hasGlass && glassCell}
          {bottleCell}
          {v === 'C' && (
            <span style={{ ...microStyle, width: '3.5rem', textAlign: 'right' }}>
              {hasGlass && item.glass ? `${anchorOf(item.glass)} / ` : ''}
              {anchorOf(item.bottle)}
            </span>
          )}
          {v === 'B' && (
            <span style={{ ...microStyle, width: '7rem', textAlign: 'right' }}>
              ({ANCHOR_DATE}: {item.glass ? `${anchorOf(item.glass)} / ` : ''}{anchorOf(item.bottle)})
            </span>
          )}
        </div>
      </div>

      {v === 'A' && (
        <div style={{ ...microStyle, textAlign: 'right', marginTop: '0.2rem' }}>
          {ANCHOR_DATE}: {item.glass ? `${anchorOf(item.glass)} / ` : ''}{anchorOf(item.bottle)}
        </div>
      )}
    </div>
  );
}

/* ── TASTING kartice ─────────────────────────────────────────────────── */

function PriceCards({ prices, v }: { prices: PricePoint[]; v: Variant }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {prices.map((p, i) => (
        <div
          key={i}
          className="text-center p-8"
          style={{
            border: `1px solid ${i === 1 ? '#9B8060' : 'rgba(26,26,26,0.12)'}`,
            background: i === 1 ? 'rgba(155,128,96,0.04)' : 'transparent',
          }}
        >
          <div className="uppercase mb-3" style={{ fontFamily: 'var(--font-montserrat-sans)', fontSize: '0.58rem', letterSpacing: '0.22em', color: '#9B9390' }}>
            {p.label}
          </div>
          <div style={{ fontFamily: 'var(--font-playfair-display)', fontSize: 'clamp(2rem,3vw,2.6rem)', color: i === 1 ? '#9B8060' : '#1A1A1A', marginBottom: '0.25rem' }}>
            {p.value}
            {v === 'B' && <AnchorInline price={p.value} />}
          </div>
          <div style={{ fontFamily: 'var(--font-montserrat-sans)', fontSize: '0.6rem', letterSpacing: '0.12em', color: '#C0BBB5' }}>
            {p.sub}
          </div>
          {(v === 'A' || v === 'C') && (
            <div style={{ ...microStyle, marginTop: '0.5rem', textAlign: 'center' }}>
              {ANCHOR_DATE} — {anchorOf(p.value)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ── stranica ────────────────────────────────────────────────────────── */

export default function PrototipSidrene() {
  const [v, setV] = useState<Variant>('A');
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get('v');
    if (p === 'A' || p === 'B' || p === 'C') setV(p);
  }, []);

  function pick(next: Variant) {
    setV(next);
    const u = new URL(window.location.href);
    u.searchParams.set('v', next);
    window.history.replaceState(null, '', u);
  }

  const d = menuPageData.hr;
  const cold = d.food.sections.find((s) => !s.peka) ?? d.food.sections[0];
  const peka = d.food.sections.find((s) => s.peka);
  const wineSec = d.wine.sections.find((s) => s.items.some((i) => i.glass != null)) ?? d.wine.sections[0];
  const hasGlass = wineSec.items.some((i) => i.glass != null);

  return (
    <div style={{ background: '#F5F5F0', minHeight: '100vh', paddingBottom: '7rem' }}>
      <div style={{ maxWidth: narrow ? 390 : 820, margin: '0 auto', padding: '3rem 1.5rem', transition: 'max-width 0.2s' }}>
        <div style={{ ...labelStyle, color: '#9B8060', marginBottom: '2.5rem' }} className="uppercase">
          Prototip · varijanta {v} · {narrow ? 'mobitel 390px' : 'desktop 820px'}
        </div>

        {/* obična sekcija */}
        <div className="mb-14">
          <div className="flex items-center gap-6 mb-6 pb-4" style={{ borderBottom: '1px solid rgba(26,26,26,0.1)' }}>
            <span className="block flex-shrink-0" style={{ width: 24, height: 1, background: '#9B8060' }} />
            <h3 className="uppercase font-semibold" style={{ fontFamily: 'var(--font-montserrat-sans)', fontSize: '0.6rem', letterSpacing: '0.28em', color: '#9B8060' }}>
              {cold.label}
            </h3>
          </div>
          {v === 'C' && <ColumnHeader left="Jelo" cols={['Cijena', ANCHOR_DATE]} />}
          {cold.items.map((item, ii) => (
            <DishRow key={ii} item={item} last={ii === cold.items.length - 1} v={v} />
          ))}
        </div>

        {/* peka */}
        {peka && (
          <div className="mb-14">
            <PekaBlock items={peka.items} note={peka.note} v={v} />
          </div>
        )}

        {/* vina */}
        <div className="mb-14">
          <div className="flex items-center gap-6 mb-6 pb-4" style={{ borderBottom: '1px solid rgba(26,26,26,0.1)' }}>
            <span className="block flex-shrink-0" style={{ width: 24, height: 1, background: '#9B8060' }} />
            <h3 className="uppercase font-semibold" style={{ fontFamily: 'var(--font-montserrat-sans)', fontSize: '0.6rem', letterSpacing: '0.28em', color: '#9B8060' }}>
              {wineSec.label}
            </h3>
          </div>
          <div className="flex justify-between gap-4 px-3 pb-2 mb-1">
            <span className="uppercase flex-1" style={labelStyle}>Vino</span>
            <div className="flex gap-10 flex-shrink-0">
              {hasGlass && <span className="uppercase text-right" style={{ ...labelStyle, width: '3.5rem' }}>0.125 l</span>}
              <span className="uppercase text-right" style={{ ...labelStyle, width: '3.5rem' }}>0.75 l</span>
              {v === 'C' && <span className="uppercase text-right" style={{ ...labelStyle, width: '3.5rem' }}>{ANCHOR_DATE}</span>}
              {v === 'B' && <span style={{ width: '7rem' }} />}
            </div>
          </div>
          {wineSec.items.slice(0, 8).map((item, ii, arr) => (
            <WineRow key={ii} item={item} last={ii === arr.length - 1} hasGlass={hasGlass} v={v} />
          ))}
        </div>

        {/* degustacijski kartice */}
        <div className="mb-14">
          <div className="flex items-center gap-6 mb-6 pb-4" style={{ borderBottom: '1px solid rgba(26,26,26,0.1)' }}>
            <span className="block flex-shrink-0" style={{ width: 24, height: 1, background: '#9B8060' }} />
            <h3 className="uppercase font-semibold" style={{ fontFamily: 'var(--font-montserrat-sans)', fontSize: '0.6rem', letterSpacing: '0.28em', color: '#9B8060' }}>
              Degustacijski meni
            </h3>
          </div>
          <PriceCards prices={[d.tasting.price1, d.tasting.price2]} v={v} />
        </div>
      </div>

      {/* donja traka */}
      <div
        style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, display: 'flex', justifyContent: 'center',
          gap: '0.5rem', padding: '0.9rem', background: 'rgba(26,26,26,0.92)', backdropFilter: 'blur(6px)',
        }}
      >
        {(['A', 'B', 'C'] as Variant[]).map((x) => (
          <button
            key={x}
            onClick={() => pick(x)}
            style={{
              fontFamily: 'var(--font-montserrat-sans)', fontSize: '0.65rem', letterSpacing: '0.18em',
              padding: '0.5rem 1.4rem', cursor: 'pointer',
              border: `1px solid ${v === x ? '#9B8060' : 'rgba(245,245,240,0.3)'}`,
              background: v === x ? '#9B8060' : 'transparent',
              color: '#F5F5F0',
            }}
          >
            {x}
          </button>
        ))}
        <button
          onClick={() => setNarrow((n) => !n)}
          style={{
            fontFamily: 'var(--font-montserrat-sans)', fontSize: '0.65rem', letterSpacing: '0.18em',
            padding: '0.5rem 1.4rem', cursor: 'pointer', marginLeft: '1.5rem',
            border: '1px solid rgba(245,245,240,0.3)', background: 'transparent', color: '#F5F5F0',
          }}
        >
          {narrow ? 'DESKTOP' : 'MOBITEL'}
        </button>
      </div>
    </div>
  );
}
