'use client';

import { useState } from 'react';
import type { WineSection, WineItem } from '@/types';
import Reveal from '@/components/Reveal';

interface WineTabProps {
  sections: WineSection[];
}

export default function WineTab({ sections }: WineTabProps) {
  return (
    <div style={{ maxWidth: 820, margin: '0 auto' }}>
      {sections.map((sec, si) => (
        <Reveal key={si} delay={si * 50}>
          <div className="mb-12">
            {/* Section header */}
            <div
              className="flex items-center gap-6 mb-6 pb-4"
              style={{ borderBottom: '1px solid rgba(26,26,26,0.1)' }}
            >
              <span className="block flex-shrink-0" style={{ width: 24, height: 1, background: '#9B8060' }} />
              <h3
                className="uppercase font-semibold"
                style={{
                  fontFamily: 'var(--font-montserrat-sans)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.28em',
                  color: '#9B8060',
                }}
              >
                {sec.label}
              </h3>
            </div>

            {/* Column headers */}
            <div className="flex justify-between gap-4 px-3 pb-2 mb-1">
              <span
                className="uppercase flex-1"
                style={{ fontFamily: 'var(--font-montserrat-sans)', fontSize: '0.5rem', letterSpacing: '0.2em', color: '#C0BBB5' }}
              >
                Wine
              </span>
              <div className="flex gap-10 flex-shrink-0">
                <span
                  className="uppercase text-right"
                  style={{ fontFamily: 'var(--font-montserrat-sans)', fontSize: '0.5rem', letterSpacing: '0.2em', color: '#C0BBB5', width: '3.5rem' }}
                >
                  0.125 l
                </span>
                <span
                  className="uppercase text-right"
                  style={{ fontFamily: 'var(--font-montserrat-sans)', fontSize: '0.5rem', letterSpacing: '0.2em', color: '#C0BBB5', width: '3.5rem' }}
                >
                  0.75 l
                </span>
              </div>
            </div>

            {sec.items.map((item, ii) => (
              <WineRow key={ii} item={item} last={ii === sec.items.length - 1} />
            ))}
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function WineRow({ item, last }: { item: WineItem; last: boolean }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="-mx-3 px-3 py-[0.9rem] cursor-default transition-colors duration-200"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
        flexWrap: 'wrap',
        borderBottom: last ? 'none' : '1px solid rgba(26,26,26,0.05)',
        background: hov ? 'rgba(155,128,96,0.04)' : 'transparent',
      }}
    >
      <div className="flex flex-1 items-center gap-4 flex-wrap">
        <span style={{ fontFamily: 'var(--font-playfair-display)', fontSize: '1rem', color: '#1A1A1A' }}>
          {item.name}
        </span>
        {item.tag && (
          <span
            className="uppercase font-semibold whitespace-nowrap"
            style={{
              fontFamily: 'var(--font-montserrat-sans)',
              fontSize: '0.5rem',
              letterSpacing: '0.15em',
              color: '#607B60',
              border: '1px solid rgba(96,123,96,0.4)',
              padding: '2px 8px',
            }}
          >
            {item.tag}
          </span>
        )}
      </div>

      {/* Prices — stack on mobile */}
      <div className="flex flex-wrap gap-10 flex-shrink-0 sm:flex-nowrap">
        <span
          className="text-right"
          style={{
            fontFamily: 'var(--font-montserrat-sans)',
            fontSize: '0.82rem',
            fontWeight: item.glass ? 500 : 300,
            color: item.glass ? '#1A1A1A' : '#C0BBB5',
            width: '3.5rem',
          }}
        >
          {item.glass ?? '—'}
        </span>
        <span
          className="font-semibold text-right"
          style={{
            fontFamily: 'var(--font-montserrat-sans)',
            fontSize: '0.82rem',
            color: '#9B8060',
            width: '3.5rem',
          }}
        >
          {item.bottle}
        </span>
      </div>
    </div>
  );
}
