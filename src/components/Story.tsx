'use client';

import Image from 'next/image';
import type { Language } from '@/types';
import { translations } from '@/lib/translations';
import Reveal from '@/components/Reveal';
import StoryCarousel from '@/components/StoryCarousel';

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

          {/* Right — editorial mosaic: family left, archive pair + netflix right */}
          <Reveal delay={100} direction="right">
            <div className="grid gap-3 md:gap-4" style={{ gridTemplateColumns: '1fr 1fr' }}>

              {/* Left: family portrait — stretches to match right column height */}
              <div className="relative overflow-hidden" style={{ minHeight: '120px' }}>
                <Image
                  src="/images/family.jpg"
                  alt="The Maha family preparing food"
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  className="object-cover object-top"
                />
              </div>

              {/* Right: archive pair on top, Netflix below */}
              <div className="flex flex-col gap-3 md:gap-4">
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div className="relative overflow-hidden" style={{ aspectRatio: '4/5' }}>
                    <Image
                      src="/images/old-kitchen.jpg"
                      alt="Konoba Maha kitchen — the early years"
                      fill
                      sizes="(max-width: 768px) 25vw, 10vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="relative overflow-hidden" style={{ aspectRatio: '4/5' }}>
                    <Image
                      src="/images/beginning.jpg"
                      alt="The beginning — Konoba Maha 2003"
                      fill
                      sizes="(max-width: 768px) 25vw, 10vw"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                  <Image
                    src="/images/netflix.jpg"
                    alt="Somebody Feed Phil — Netflix visit to Konoba Maha"
                    fill
                    sizes="(max-width: 768px) 50vw, 20vw"
                    className="object-cover"
                    style={{ objectPosition: 'center 30%' }}
                  />
                </div>
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

      {/* Photo carousel — full viewport width */}
      <Reveal delay={100} style={{ marginTop: 'clamp(3rem,6vw,5rem)' }}>
        <StoryCarousel />
      </Reveal>
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
