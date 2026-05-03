'use client';

import Image from 'next/image';
import type { Language } from '@/types';
import { translations } from '@/lib/translations';
import Reveal from '@/components/Reveal';

interface StoryProps {
  lang: Language;
}

export default function Story({ lang }: StoryProps) {
  const t = translations[lang].story;

  return (
    <section id="story" style={{ background: '#F5F5F0', padding: 'clamp(5rem,10vw,9rem) 0' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1.5rem,5vw,4rem)' }}>

        {/* Two-column: text | images */}
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 'clamp(3rem,8vw,7rem)', alignItems: 'center' }}>

          {/* Left — text */}
          <div>
            <Reveal>
              <SectionLabel>{t.label}</SectionLabel>
              <SectionHeading>{t.heading}</SectionHeading>
            </Reveal>
            <Reveal delay={150}><BodyText>{t.p1}</BodyText></Reveal>
            <Reveal delay={250}><BodyText>{t.p2}</BodyText></Reveal>
            <Reveal delay={350}><BodyText>{t.p3}</BodyText></Reveal>

            {/* Netflix badge */}
            <Reveal delay={450}>
              <div
                className="mt-10 pt-8 flex items-center gap-5"
                style={{ borderTop: '1px solid rgba(26,26,26,0.1)' }}
              >
                <div
                  className="font-black leading-none"
                  style={{
                    fontFamily: 'var(--font-montserrat-sans)',
                    fontSize: '2rem',
                    color: '#E50914',
                    letterSpacing: '-0.05em',
                  }}
                >
                  N
                </div>
                <div>
                  <div
                    className="uppercase mb-1"
                    style={{
                      fontFamily: 'var(--font-montserrat-sans)',
                      fontSize: '0.55rem',
                      letterSpacing: '0.22em',
                      color: '#9B9390',
                    }}
                  >
                    {t.netflix}
                  </div>
                  <div
                    className="italic"
                    style={{
                      fontFamily: 'var(--font-playfair-display)',
                      fontSize: '0.95rem',
                      color: '#1A1A1A',
                    }}
                  >
                    {t.show}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right — 3-image mosaic */}
          <Reveal delay={100} direction="right">
            <div
              className="grid gap-4"
              style={{ gridTemplateColumns: '1.15fr 1fr', gridTemplateRows: 'auto auto' }}
            >
              {/* Tall left image spanning 2 rows */}
              <div className="relative overflow-hidden" style={{ gridRow: '1 / span 2', minHeight: '480px' }}>
                <Image
                  src="/images/outside.jpg"
                  alt="Konoba Maha terrace"
                  fill
                  sizes="(max-width: 768px) 100vw, 30vw"
                  className="object-cover"
                />
              </div>
              {/* Top-right */}
              <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                <Image
                  src="/images/family.jpg"
                  alt="The Maha family preparing food"
                  fill
                  sizes="(max-width: 768px) 100vw, 20vw"
                  className="object-cover object-top"
                />
              </div>
              {/* Bottom-right */}
              <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                <Image
                  src="/images/netflix.jpg"
                  alt="Somebody Feed Phil — Netflix"
                  fill
                  sizes="(max-width: 768px) 100vw, 20vw"
                  className="object-cover"
                  style={{ objectPosition: 'center 20%' }}
                />
              </div>
            </div>
          </Reveal>
        </div>

        {/* Pull quote */}
        <Reveal
          delay={200}
          style={{
            marginTop: 'clamp(4rem,8vw,7rem)',
            paddingTop: '4rem',
            borderTop: '1px solid rgba(26,26,26,0.08)',
            textAlign: 'center',
          }}
        >
          <blockquote
            className="italic mx-auto"
            style={{
              fontFamily: 'var(--font-playfair-display)',
              fontSize: 'clamp(1.4rem,3vw,2.2rem)',
              fontWeight: 400,
              color: '#1A1A1A',
              maxWidth: '740px',
              lineHeight: 1.5,
              letterSpacing: '0.01em',
            }}
          >
            {t.quote}
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Shared primitives ── */
export function SectionLabel({ children, centered }: { children: React.ReactNode; centered?: boolean }) {
  return (
    <div
      className={`flex items-center gap-4 mb-5 uppercase ${centered ? 'justify-center' : ''}`}
      style={{
        fontFamily: 'var(--font-montserrat-sans)',
        fontSize: '0.58rem',
        letterSpacing: '0.3em',
        color: '#9B8060',
      }}
    >
      <span className="block flex-shrink-0" style={{ width: 28, height: 1, background: '#9B8060', opacity: 0.5 }} />
      {children}
    </div>
  );
}

export function SectionHeading({ children, centered, light }: { children: React.ReactNode; centered?: boolean; light?: boolean }) {
  const lines = typeof children === 'string' ? children.split('\n') : null;
  const content = lines
    ? lines.map((l, i) => (
        <span key={i} className="block">
          {i === 1 ? <em className="italic">{l}</em> : l}
        </span>
      ))
    : children;
  return (
    <h2
      className={`mb-6 leading-[1.1] ${centered ? 'text-center' : ''}`}
      style={{
        fontFamily: 'var(--font-playfair-display)',
        fontSize: 'clamp(2.4rem,4.5vw,3.8rem)',
        fontWeight: 400,
        color: light ? '#F5F5F0' : '#1A1A1A',
        letterSpacing: '-0.01em',
      }}
    >
      {content}
    </h2>
  );
}

export function BodyText({ children, centered, light }: { children: React.ReactNode; centered?: boolean; light?: boolean }) {
  return (
    <p
      className={`mb-5 ${centered ? 'text-center' : ''}`}
      style={{
        fontFamily: 'var(--font-montserrat-sans)',
        fontSize: '0.82rem',
        lineHeight: 1.95,
        color: light ? 'rgba(245,245,240,0.72)' : '#6B6560',
        letterSpacing: '0.02em',
        fontWeight: 300,
      }}
    >
      {children}
    </p>
  );
}
