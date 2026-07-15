'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Language } from '@/types';
import { translations } from '@/lib/translations';
import Reveal from '@/components/Reveal';
import { SectionLabel, SectionHeading, BodyText } from '@/components/Story';

interface FoodProps {
  lang: Language;
}

export default function Food({ lang }: FoodProps) {
  const t = translations[lang].food;
  const p = t.peka;

  return (
    <section id="food" style={{ background: '#EFEFEA', padding: 'clamp(5rem,10vw,9rem) 0' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1.5rem,5vw,4rem)' }}>

        {/* Intro row */}
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: 'clamp(3rem,8vw,6rem)', alignItems: 'start', marginBottom: 'clamp(4rem,8vw,7rem)' }}
        >
          {/* Left — text */}
          <div>
            <Reveal>
              <SectionLabel>{t.label}</SectionLabel>
              <SectionHeading>{t.headline}</SectionHeading>
            </Reveal>
            <Reveal delay={150}><BodyText>{t.p1}</BodyText></Reveal>
            <Reveal delay={250}><BodyText>{t.p2}</BodyText></Reveal>
            <Reveal delay={350}>
              <div className="flex gap-4 flex-wrap mt-8">
                <CTAButton href={`/${lang}/menu`}>{t.cta}</CTAButton>
              </div>
            </Reveal>
          </div>

          {/* Right — food images */}
          <Reveal delay={120} direction="right">
            <div className="flex flex-col gap-4">
              <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                <Image
                  src="/images/carpaccio.jpg"
                  alt="Shrimp carpaccio"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover transition-transform duration-[600ms] hover:scale-[1.03]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                  <Image
                    src="/images/plata.jpg"
                    alt="Dalmatian charcuterie board"
                    fill
                    sizes="(max-width: 768px) 50vw, 20vw"
                    className="object-cover object-top transition-transform duration-[600ms] hover:scale-[1.03]"
                  />
                </div>
                <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                  <Image
                    src="/images/wine.jpg"
                    alt="Wine service at Konoba Maha"
                    fill
                    sizes="(max-width: 768px) 50vw, 20vw"
                    className="object-cover object-top transition-transform duration-[600ms] hover:scale-[1.03]"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Peka — full-width dark feature block */}
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ background: '#1A1A1A' }}>
            {/* Image — objectPosition focuses on the octopus */}
            <div className="relative overflow-hidden" style={{ minHeight: '480px' }}>
              <Image
                src="/images/peka.jpg"
                alt="Peka cooking on open fire — Konoba Maha"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                style={{ objectPosition: 'center 60%' }}
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 100%)' }}
              />
            </div>

            {/* Text */}
            <div style={{ padding: 'clamp(3rem,5vw,5rem)' }}>
              <div
                className="flex items-center gap-4 mb-6 uppercase"
                style={{
                  fontFamily: 'var(--font-montserrat-sans)',
                  fontSize: '0.55rem',
                  letterSpacing: '0.28em',
                  color: '#9B8060',
                }}
              >
                <span className="block flex-shrink-0" style={{ width: 20, height: 1, background: '#9B8060' }} />
                {p.label}
              </div>
              <h3
                className="leading-none mb-2"
                style={{
                  fontFamily: 'var(--font-playfair-display)',
                  fontSize: 'clamp(3rem,5vw,4.5rem)',
                  fontWeight: 400,
                  color: '#F5F5F0',
                  letterSpacing: '0.02em',
                }}
              >
                {p.title}
              </h3>
              <div
                className="uppercase mb-8"
                style={{
                  fontFamily: 'var(--font-montserrat-sans)',
                  fontSize: '0.62rem',
                  letterSpacing: '0.15em',
                  color: '#9B8060',
                }}
              >
                {p.sub}
              </div>
              <p
                className="mb-8"
                style={{
                  fontFamily: 'var(--font-montserrat-sans)',
                  fontSize: '0.8rem',
                  lineHeight: 2,
                  color: 'rgba(245,245,240,0.65)',
                  fontWeight: 300,
                  letterSpacing: '0.02em',
                }}
              >
                {p.desc}
              </p>
              <div
                className="pl-4"
                style={{
                  fontFamily: 'var(--font-montserrat-sans)',
                  fontSize: '0.62rem',
                  letterSpacing: '0.1em',
                  color: '#9B8060',
                  borderLeft: '2px solid #9B8060',
                }}
              >
                {p.note}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Shared CTA button ── */
export function CTAButton({
  children,
  onClick,
  href,
  light,
  primary,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  light?: boolean;
  primary?: boolean;
}) {
  const [hov, setHov] = useState(false);

  // Base outline button inverts to filled on hover. `primary` swaps that: filled
  // by default, outline on hover — to emphasise one CTA among several.
  const accent = light ? '#F5F5F0' : '#1A1A1A';
  const contrast = light ? '#1A1A1A' : '#F5F5F0';
  const filled = primary ? !hov : hov;

  const style: React.CSSProperties = {
    background: filled ? accent : 'transparent',
    border: light ? '1px solid rgba(245,245,240,0.5)' : '1px solid #1A1A1A',
    color: filled ? contrast : accent,
    fontFamily: 'var(--font-montserrat-sans)',
    fontSize: '0.62rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    padding: '14px 32px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
  };

  if (href) {
    if (href.startsWith('/')) {
      return (
        <Link href={href} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={style}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={style}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={style}>
      {children}
    </button>
  );
}
