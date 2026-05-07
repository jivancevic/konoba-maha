'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Language } from '@/types';
import { translations } from '@/lib/translations';

interface HeroProps {
  lang: Language;
}

export default function Hero({ lang }: HeroProps) {
  const [loaded, setLoaded] = useState(false);
  const t = translations[lang].hero;

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative h-screen min-h-[680px] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.jpg"
          alt="Konoba Maha — Korčula Island"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: 'center 45%' }}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(10,7,4,0.50) 0%, rgba(14,10,6,0.46) 35%, rgba(12,8,5,0.54) 65%, rgba(8,5,3,0.62) 100%)',
          }}
        />
        {/* Center vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 48%, rgba(0,0,0,0.35) 0%, transparent 70%)',
          }}
        />
        {/* Warm light */}
        <div
          className="absolute"
          style={{
            top: '-10%', left: '-5%', width: '60%', height: '80%',
            background: 'radial-gradient(ellipse, rgba(180,120,55,0.18) 0%, transparent 65%)',
            filter: 'blur(60px)',
          }}
        />
        {/* Cool depth */}
        <div
          className="absolute bottom-0 right-0"
          style={{
            width: '60%', height: '60%',
            background: 'radial-gradient(ellipse, rgba(40,60,55,0.25) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      {/* CTAs — anchored at 20% from the bottom (~75% from the top) */}
      <div
        className="absolute z-[2] flex justify-center"
        style={{ bottom: '25%', left: 0, right: 0 }}
      >
        <div
          className="flex gap-4 flex-wrap justify-center"
          style={{
            padding: '0 2rem',
            maxWidth: '860px',
            width: '100%',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'none' : 'translateY(20px)',
            transition: 'opacity 0.9s ease 0.6s, transform 0.9s ease 0.6s',
          }}
        >
          <HeroBtn primary href="https://bookmeatable.com/restaurants/konoba-maha-8" newTab>
            {t.cta}
          </HeroBtn>
          <HeroBtn href={`/${lang}/menu`}>{t.ctaMenu}</HeroBtn>
          <HeroBtn onClick={() => scrollTo('story')}>{t.ctaDiscover} ↓</HeroBtn>
        </div>
      </div>

      {/* Scroll line indicator */}
      <div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center"
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 1s ease 2s' }}
      >
        <div className="w-px h-[60px] animate-scroll-drop" style={{ background: 'linear-gradient(to bottom, rgba(245,245,240,0.6), transparent)' }} />
      </div>

      {/* Bottom fade to page background */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[180px] z-[1] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #F5F5F0)' }}
      />
    </section>
  );
}

interface HeroBtnProps {
  children: React.ReactNode;
  onClick?: () => void;
  primary?: boolean;
  href?: string;
  newTab?: boolean;
}

function HeroBtn({ children, onClick, primary, href, newTab }: HeroBtnProps) {
  const [hov, setHov] = useState(false);

  const style: React.CSSProperties = {
    background: primary ? (hov ? '#F5F5F0' : 'transparent') : 'transparent',
    border: primary ? '1px solid #F5F5F0' : '1px solid rgba(245,245,240,0.35)',
    color: primary ? (hov ? '#1A1A1A' : '#F5F5F0') : 'rgba(245,245,240,0.7)',
    fontFamily: 'var(--font-montserrat-sans)',
    fontSize: '0.65rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    padding: '15px 36px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    transform: hov ? 'translateY(-2px)' : 'none',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
  };

  if (href) {
    if (href.startsWith('http')) {
      return (
        <a href={href} target={newTab ? '_blank' : '_self'} rel={newTab ? 'noopener noreferrer' : undefined}
          onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={style}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={style}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={style}>
      {children}
    </button>
  );
}
