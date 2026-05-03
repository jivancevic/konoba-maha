'use client';

import { useState } from 'react';
import type { FoodSection, DishItem, DishTag } from '@/types';
import Reveal from '@/components/Reveal';

interface FoodTabProps {
  sections: FoodSection[];
}

export default function FoodTab({ sections }: FoodTabProps) {
  return (
    <div style={{ maxWidth: 820, margin: '0 auto' }}>
      {sections.map((sec, si) => (
        <Reveal key={sec.id} delay={si * 60}>
          <div className="mb-14">
            {sec.peka ? (
              /* Peka special block */
              <div
                className="relative mb-4"
                style={{ border: '1px solid #9B8060', padding: 'clamp(2rem,4vw,3rem)' }}
              >
                <div
                  className="absolute -top-px left-8 px-4 py-1"
                  style={{ background: '#9B8060' }}
                >
                  <span
                    className="uppercase font-semibold"
                    style={{
                      fontFamily: 'var(--font-montserrat-sans)',
                      fontSize: '0.55rem',
                      letterSpacing: '0.25em',
                      color: '#F5F5F0',
                    }}
                  >
                    Pre-Order Only
                  </span>
                </div>
                <div className="flex items-baseline gap-6 mb-2 pt-2">
                  <h3
                    style={{
                      fontFamily: 'var(--font-playfair-display)',
                      fontSize: 'clamp(1.8rem,3vw,2.4rem)',
                      fontWeight: 400,
                      letterSpacing: '0.04em',
                      color: '#1A1A1A',
                    }}
                  >
                    Peka
                  </h3>
                </div>
                <div
                  className="flex items-center gap-3 mb-8"
                  style={{
                    fontFamily: 'var(--font-montserrat-sans)',
                    fontSize: '0.7rem',
                    color: '#9B8060',
                    letterSpacing: '0.1em',
                  }}
                >
                  <span className="inline-block flex-shrink-0" style={{ width: 20, height: 1, background: '#9B8060' }} />
                  {sec.note}
                </div>
                {sec.items.map((item, ii) => (
                  <div
                    key={ii}
                    className="flex justify-between items-baseline gap-4 py-[0.9rem]"
                    style={{ borderBottom: ii < sec.items.length - 1 ? '1px solid rgba(155,128,96,0.2)' : 'none' }}
                  >
                    <div>
                      <div style={{ fontFamily: 'var(--font-playfair-display)', fontSize: '1.05rem', fontWeight: 400, color: '#1A1A1A', marginBottom: '0.2rem' }}>
                        {item.name}
                      </div>
                      {item.desc && (
                        <div style={{ fontFamily: 'var(--font-montserrat-sans)', fontSize: '0.68rem', color: '#9B9390', letterSpacing: '0.04em', fontWeight: 300 }}>
                          {item.desc}
                        </div>
                      )}
                    </div>
                    <div
                      className="font-semibold flex-shrink-0"
                      style={{ fontFamily: 'var(--font-montserrat-sans)', fontSize: '0.88rem', color: '#9B8060' }}
                    >
                      {item.price}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Regular section */
              <div>
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
                <div>
                  {sec.items.map((item, ii) => (
                    <DishRow key={ii} item={item} last={ii === sec.items.length - 1} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function DishRow({ item, last }: { item: DishItem; last: boolean }) {
  const [hov, setHov] = useState(false);
  const tags = item.tags ?? [];

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="flex justify-between items-start gap-6 py-[1.1rem] -mx-3 px-3 cursor-default transition-colors duration-200"
      style={{
        borderBottom: last ? 'none' : '1px solid rgba(26,26,26,0.06)',
        background: hov ? 'rgba(155,128,96,0.04)' : 'transparent',
      }}
    >
      <div className="flex-1">
        <div className="flex items-center gap-3 flex-wrap" style={{ marginBottom: item.desc ? '0.3rem' : 0 }}>
          <span style={{ fontFamily: 'var(--font-playfair-display)', fontSize: '1.05rem', fontWeight: 400, color: '#1A1A1A' }}>
            {item.name}
          </span>
          {hov && renderTags(tags)}
        </div>
        {item.desc && (
          <div style={{ fontFamily: 'var(--font-montserrat-sans)', fontSize: '0.7rem', color: '#9B9390', lineHeight: 1.65, letterSpacing: '0.03em', fontWeight: 300 }}>
            {item.desc}
          </div>
        )}
      </div>
      <div
        className="font-semibold flex-shrink-0 pt-[2px]"
        style={{ fontFamily: 'var(--font-montserrat-sans)', fontSize: '0.88rem', color: '#1A1A1A' }}
      >
        {item.price}
      </div>
    </div>
  );
}

function renderTags(tags: DishTag[]) {
  const els: React.ReactNode[] = [];
  if (tags.includes('chef')) {
    els.push(<DishTag key="chef" color="#9B8060" border="rgba(155,128,96,0.4)">Chef&apos;s Pick</DishTag>);
  } else if (tags.includes('local')) {
    els.push(<DishTag key="local" color="#6B8060" border="rgba(107,128,96,0.4)">Local</DishTag>);
  }
  if (tags.includes('vegetarian')) {
    els.push(<DishTag key="veg" color="#607B60" border="rgba(96,123,96,0.4)">Vegetarian</DishTag>);
  }
  return els;
}

function DishTag({ children, color, border }: { children: React.ReactNode; color: string; border: string }) {
  return (
    <span
      className="uppercase font-medium whitespace-nowrap"
      style={{
        fontFamily: 'var(--font-montserrat-sans)',
        fontSize: '0.5rem',
        letterSpacing: '0.18em',
        color,
        border: `1px solid ${border}`,
        padding: '2px 8px',
      }}
    >
      {children}
    </span>
  );
}
