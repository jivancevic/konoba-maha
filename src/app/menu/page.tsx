'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Language } from '@/types';
import { menuPageData } from '@/lib/menuData';
import Reveal from '@/components/Reveal';
import FoodTab from '@/components/menu/FoodTab';
import WineTab from '@/components/menu/WineTab';
import TastingTab from '@/components/menu/TastingTab';
import GroupTab from '@/components/menu/GroupTab';

export default function MenuPage() {
  const [lang, setLang] = useState<Language>('en');
  const [tab, setTab] = useState<number>(0);
  const [scrolled, setScrolled] = useState(false);
  const subNavRef = useRef<HTMLDivElement>(null);
  const d = menuPageData[lang];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  /* Scroll active tab button into view */
  useEffect(() => {
    if (subNavRef.current) {
      const btns = subNavRef.current.querySelectorAll<HTMLButtonElement>('.subnav-btn');
      btns[tab]?.scrollIntoView({ inline: 'center', block: 'nearest' });
    }
  }, [tab]);

  const tabContent: React.ReactNode[] = [
    <FoodTab key="food" sections={d.food.sections} />,
    <WineTab key="wine" sections={d.wine.sections} />,
    <TastingTab key="tasting" data={d.tasting} />,
    <GroupTab key="group" data={d.group} />,
  ];

  return (
    <>
      {/* Top nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-[100] h-16 flex items-center justify-between transition-all duration-[400ms]"
        style={{
          padding: '0 clamp(1.5rem,5vw,4rem)',
          background: scrolled ? 'rgba(245,245,240,0.96)' : '#F5F5F0',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: '1px solid rgba(26,26,26,0.08)',
          boxShadow: scrolled ? '0 2px 20px rgba(26,26,26,0.06)' : 'none',
        }}
      >
        <Link
          href="/"
          className="no-underline flex items-center gap-2 font-medium"
          style={{
            fontFamily: 'var(--font-montserrat-sans)',
            fontSize: '0.6rem',
            letterSpacing: '0.15em',
            color: '#9B8060',
          }}
        >
          {d.back}
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/" className="no-underline flex items-center">
            <Image
              src="/images/maha-logo-transparent.png"
              alt="Konoba Maha"
              width={220}
              height={88}
              style={{
                height: '36px',
                width: 'auto',
                filter: 'sepia(0.4) saturate(1.2) brightness(0.65)',
              }}
            />
          </Link>
          <button
            onClick={() => setLang((l) => (l === 'en' ? 'hr' : 'en'))}
            className="cursor-pointer bg-transparent font-semibold"
            style={{
              border: '1px solid rgba(26,26,26,0.2)',
              fontFamily: 'var(--font-montserrat-sans)',
              fontSize: '0.6rem',
              letterSpacing: '0.18em',
              color: '#1A1A1A',
              padding: '6px 12px',
            }}
          >
            {lang === 'en' ? 'HR' : 'EN'}
          </button>
        </div>
      </nav>

      {/* Page content */}
      <div style={{ paddingTop: '64px', background: '#F5F5F0' }}>

        {/* Page hero */}
        <div
          className="text-center mx-auto"
          style={{ padding: 'clamp(3.5rem,7vw,6rem) clamp(1.5rem,5vw,4rem) 0', maxWidth: '680px' }}
        >
          <Reveal>
            <div
              className="flex items-center justify-center gap-4 mb-4 uppercase"
              style={{
                fontFamily: 'var(--font-montserrat-sans)',
                fontSize: '0.58rem',
                letterSpacing: '0.3em',
                color: '#9B8060',
              }}
            >
              <span className="block" style={{ width: 24, height: 1, background: '#9B8060' }} />
              Konoba Maha · Korčula
              <span className="block" style={{ width: 24, height: 1, background: '#9B8060' }} />
            </div>
            <h1
              className="italic mb-4"
              style={{
                fontFamily: 'var(--font-playfair-display)',
                fontSize: 'clamp(2.6rem,5vw,4rem)',
                fontWeight: 400,
                color: '#1A1A1A',
                lineHeight: 1.1,
              }}
            >
              {lang === 'en' ? 'Our Menu' : 'Naš Jelovnik'}
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-montserrat-sans)',
                fontSize: '0.78rem',
                lineHeight: 1.9,
                color: '#6B6560',
                fontWeight: 300,
                letterSpacing: '0.03em',
              }}
            >
              {lang === 'en'
                ? 'Local ingredients, traditional methods, contemporary craft.'
                : 'Lokalni sastojci, tradicionalne metode, suvremeni pristup.'}
            </p>
          </Reveal>
        </div>

        {/* Sticky sub-nav */}
        <div
          className="sticky z-[90] mt-10"
          style={{
            top: '64px',
            background: 'rgba(245,245,240,0.97)',
            backdropFilter: 'blur(16px)',
            borderBottom: '1px solid rgba(26,26,26,0.09)',
          }}
        >
          <div
            ref={subNavRef}
            className="subnav-bar"
            style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 clamp(1.5rem,5vw,4rem)' }}
          >
            {d.tabs.map((label, i) => (
              <button
                key={i}
                className={`subnav-btn flex-shrink-0 cursor-pointer bg-transparent whitespace-nowrap font-medium${tab === i ? ' active' : ''}`}
                onClick={() => setTab(i)}
                style={{
                  fontFamily: 'var(--font-montserrat-sans)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  padding: '1.1rem 2rem',
                  border: 'none',
                  borderBottom: tab === i ? '2px solid #1A1A1A' : '2px solid transparent',
                  color: tab === i ? '#1A1A1A' : '#9B9390',
                  transition: 'all 0.25s ease',
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div
          key={`${tab}-${lang}`}
          className="animate-fade-up"
          style={{ padding: 'clamp(3rem,6vw,5rem) clamp(1.5rem,5vw,4rem)', minHeight: '60vh' }}
        >
          {tabContent[tab]}
        </div>

        {/* Footer */}
        <footer
          style={{
            borderTop: '1px solid rgba(26,26,26,0.1)',
            padding: '2.5rem clamp(1.5rem,5vw,4rem)',
            background: '#EFEFEA',
          }}
        >
          <div
            className="flex justify-between items-center flex-wrap gap-4"
            style={{ maxWidth: '1100px', margin: '0 auto' }}
          >
            <Image
              src="/images/maha-logo-transparent.png"
              alt="Konoba Maha"
              width={220}
              height={88}
              style={{ height: '40px', width: 'auto', filter: 'sepia(0.4) saturate(1.2) brightness(0.65)' }}
            />
            <span
              style={{
                fontFamily: 'var(--font-montserrat-sans)',
                fontSize: '0.6rem',
                letterSpacing: '0.1em',
                color: '#9B9390',
              }}
            >
              © 2026 Konoba Maha. All rights reserved.
            </span>
            <Link
              href="/"
              className="no-underline font-medium"
              style={{
                fontFamily: 'var(--font-montserrat-sans)',
                fontSize: '0.6rem',
                letterSpacing: '0.15em',
                color: '#9B8060',
              }}
            >
              {d.back}
            </Link>
          </div>
        </footer>
      </div>
    </>
  );
}
