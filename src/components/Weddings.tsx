'use client';

import Image from 'next/image';
import type { Language } from '@/types';
import { translations } from '@/lib/translations';
import Reveal from '@/components/Reveal';
import { SectionLabel, SectionHeading, BodyText } from '@/components/Story';
import { CTAButton } from '@/components/Food';

interface WeddingsProps {
  lang: Language;
}

export default function Weddings({ lang }: WeddingsProps) {
  const t = translations[lang].weddings;

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' });
  };

  return (
    <section id="weddings" style={{ background: '#1A1A1A', padding: 'clamp(5rem,10vw,9rem) 0' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1.5rem,5vw,4rem)' }}>
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: 'clamp(3rem,8vw,6rem)', alignItems: 'start' }}
        >
          {/* Left — images: sticky on desktop, static on mobile */}
          <div className="md:sticky md:top-[100px]">
            <Reveal direction="left">
              <div className="flex flex-col gap-4">
                {/* Wide top image */}
                <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                  <Image
                    src="/images/table02.jpg"
                    alt="Wedding dinner setup — Konoba Maha terrace"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                {/* Two square images below */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative overflow-hidden" style={{ aspectRatio: '1' }}>
                    <Image
                      src="/images/table01.jpg"
                      alt="Wedding ceremony bench — Korčula"
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="relative overflow-hidden" style={{ aspectRatio: '1' }}>
                    <Image
                      src="/images/bride.jpg"
                      alt="Wedding celebration at Konoba Maha"
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover"
                      style={{ objectPosition: 'center 20%' }}
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right — text */}
          <div>
            <Reveal>
              <SectionLabel>{t.label}</SectionLabel>
              <SectionHeading light>{t.headline}</SectionHeading>
              <BodyText light>{t.sub}</BodyText>
            </Reveal>

            {/* Feature list */}
            <div className="flex flex-col my-10">
              {t.features.map((f, i) => (
                <Reveal key={i} delay={100 + i * 80}>
                  <div
                    className="grid py-6"
                    style={{
                      gridTemplateColumns: '3rem 1fr',
                      gap: '1rem',
                      borderBottom: '1px solid rgba(245,245,240,0.07)',
                      alignItems: 'start',
                    }}
                  >
                    <div
                      className="font-semibold pt-1"
                      style={{
                        fontFamily: 'var(--font-montserrat-sans)',
                        fontSize: '0.58rem',
                        letterSpacing: '0.1em',
                        color: '#9B8060',
                      }}
                    >
                      {f.num}
                    </div>
                    <div>
                      <div
                        className="mb-[0.4rem]"
                        style={{
                          fontFamily: 'var(--font-playfair-display)',
                          fontSize: '1.05rem',
                          color: '#F5F5F0',
                        }}
                      >
                        {f.title}
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-montserrat-sans)',
                          fontSize: '0.72rem',
                          lineHeight: 1.75,
                          color: 'rgba(245,245,240,0.55)',
                          fontWeight: 300,
                        }}
                      >
                        {f.desc}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* CTAs */}
            <Reveal delay={400}>
              <div className="flex flex-wrap gap-4">
                <CTAButton onClick={scrollToContact} light>{t.cta}</CTAButton>
                <CTAButton href={t.brochureFile} light>{t.brochure}</CTAButton>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
