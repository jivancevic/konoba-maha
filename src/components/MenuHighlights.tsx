'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Language, HighlightItem } from '@/types';
import { translations } from '@/lib/translations';
import { getHighlights } from '@/lib/menuData';
import Reveal from '@/components/Reveal';
import { SectionLabel, SectionHeading } from '@/components/Story';

interface MenuHighlightsProps {
  lang: Language;
}

export default function MenuHighlights({ lang }: MenuHighlightsProps) {
  const t = translations[lang].menu;
  const highlights = getHighlights(lang);

  return (
    <section id="menu" style={{ background: '#F5F5F0', padding: 'clamp(5rem,10vw,9rem) 0' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1.5rem,5vw,4rem)' }}>

        {/* Header */}
        <Reveal>
          <div className="text-center mb-16">
            <SectionLabel centered>{t.label}</SectionLabel>
            <SectionHeading centered>{t.headline}</SectionHeading>
            <p
              className="mx-auto"
              style={{
                fontFamily: 'var(--font-montserrat-sans)',
                fontSize: '0.78rem',
                lineHeight: 1.9,
                color: '#6B6560',
                fontWeight: 300,
                maxWidth: '480px',
              }}
            >
              {t.subtext}
            </p>
          </div>
        </Reveal>

        {/* Highlights grid */}
        <div
          className="grid mb-14"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '1px',
            background: 'rgba(26,26,26,0.07)',
          }}
        >
          {highlights.map((item, i) => (
            <Reveal key={i} delay={i * 50} style={{ height: '100%' }}>
              <HighlightCard item={item} />
            </Reveal>
          ))}
        </div>

        {/* Full menu CTA */}
        <Reveal delay={100}>
          <div className="text-center">
            <Link
              href="/menu"
              className="inline-flex items-center gap-3 no-underline transition-opacity duration-300 hover:opacity-80"
              style={{
                background: '#1A1A1A',
                color: '#F5F5F0',
                fontFamily: 'var(--font-montserrat-sans)',
                fontSize: '0.65rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                padding: '18px 44px',
              }}
            >
              {t.cta}
              <span style={{ fontSize: '0.8rem' }}>→</span>
            </Link>
            <p
              className="mt-5"
              style={{
                fontFamily: 'var(--font-montserrat-sans)',
                fontSize: '0.6rem',
                letterSpacing: '0.1em',
                color: '#C0BBB5',
              }}
            >
              {t.ctaSub}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function HighlightCard({ item }: { item: HighlightItem }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="p-7 transition-colors duration-200 cursor-default h-full"
      style={{ background: hov ? '#EFEFEA' : '#F5F5F0' }}
    >
      <div
        className="uppercase font-semibold mb-[0.6rem]"
        style={{
          fontFamily: 'var(--font-montserrat-sans)',
          fontSize: '0.5rem',
          letterSpacing: '0.22em',
          color: '#9B8060',
        }}
      >
        {item.tag}
      </div>
      <div className="flex justify-between items-baseline gap-4" style={{ marginBottom: item.desc ? '0.4rem' : 0 }}>
        <div
          style={{
            fontFamily: 'var(--font-playfair-display)',
            fontSize: '1.05rem',
            fontWeight: 400,
            color: '#1A1A1A',
          }}
        >
          {item.name}
        </div>
        <div
          className="font-semibold flex-shrink-0"
          style={{
            fontFamily: 'var(--font-montserrat-sans)',
            fontSize: '0.85rem',
            color: '#1A1A1A',
          }}
        >
          {item.price}
        </div>
      </div>
      {item.desc && (
        <div
          style={{
            fontFamily: 'var(--font-montserrat-sans)',
            fontSize: '0.7rem',
            lineHeight: 1.7,
            color: '#8A8480',
            fontWeight: 300,
          }}
        >
          {item.desc}
        </div>
      )}
    </div>
  );
}
