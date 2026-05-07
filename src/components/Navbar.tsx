'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { Language } from '@/types';
import { translations } from '@/lib/translations';

interface NavbarProps {
  lang: Language;
  activeSection: string;
}

export default function Navbar({ lang, activeSection }: NavbarProps) {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const t = translations[lang].nav;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' });
    setMenuOpen(false);
  };

  const links = [
    { id: 'story', label: t.story },
    { id: 'food', label: t.food },
    { id: 'menu', label: t.menu },
    { id: 'weddings', label: t.weddings },
    { id: 'contact', label: t.contact },
  ];

  const textColor = scrolled ? '#1A1A1A' : '#F5F5F0';
  const accentColor = scrolled ? '#9B8060' : '#F5F5F0';

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[100] h-[72px] flex items-center justify-between transition-all duration-500"
        style={{
          padding: '0 clamp(1.5rem, 5vw, 4rem)',
          background: scrolled ? 'rgba(245,245,240,0.95)' : 'rgba(245,245,240,0)',
          backdropFilter: scrolled ? 'blur(20px) saturate(150%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(150%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(26,26,26,0.08)' : '1px solid transparent',
          boxShadow: scrolled ? '0 2px 30px rgba(26,26,26,0.06)' : 'none',
        }}
      >
        {/* Logo */}
        <button onClick={() => scrollTo('hero')} className="border-none bg-transparent cursor-pointer p-0">
          <Image
            src="/images/maha-logo-transparent.png"
            alt="Konoba Maha"
            width={220}
            height={88}
            priority
            style={{
              height: '44px',
              width: 'auto',
              filter: scrolled
                ? 'sepia(0.4) saturate(1.2) brightness(0.65)'
                : 'brightness(0) invert(1)',
              transition: 'filter 0.5s ease',
            }}
          />
        </button>

        {/* Desktop links — centred */}
        <div className="hidden md:flex gap-10 absolute left-1/2 -translate-x-1/2">
          {links.map((link) => (
            <NavLink
              key={link.id}
              onClick={() => scrollTo(link.id)}
              active={activeSection === link.id}
              textColor={textColor}
              accentColor={accentColor}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Right cluster */}
        <div className="flex items-center gap-6">
          {/* Language toggle */}
          <button
            onClick={() => router.push(`/${lang === 'en' ? 'hr' : 'en'}`)}
            className="bg-transparent cursor-pointer transition-all duration-300"
            style={{
              border: `1px solid ${scrolled ? 'rgba(26,26,26,0.2)' : 'rgba(245,245,240,0.4)'}`,
              color: textColor,
              fontFamily: 'var(--font-montserrat-sans)',
              fontSize: '0.6rem',
              letterSpacing: '0.18em',
              fontWeight: 600,
              padding: '6px 12px',
            }}
          >
            {t.lang}
          </button>

          {/* Reserve CTA — desktop */}
          <a
            href="https://bookmeatable.com/restaurants/konoba-maha-8"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center no-underline transition-opacity duration-300 hover:opacity-80"
            style={{
              background: scrolled ? '#1A1A1A' : 'rgba(245,245,240,0.15)',
              border: `1px solid ${scrolled ? '#1A1A1A' : 'rgba(245,245,240,0.6)'}`,
              color: '#F5F5F0',
              fontFamily: 'var(--font-montserrat-sans)',
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              padding: '11px 24px',
            }}
          >
            {t.reserve}
          </a>

          {/* Hamburger — mobile */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden bg-transparent border-none cursor-pointer p-2 flex flex-col gap-[5px]"
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block w-[22px] h-[1.5px] transition-all duration-300 origin-center"
                style={{
                  background: textColor,
                  transform: menuOpen
                    ? i === 0 ? 'rotate(45deg) translate(5px,5px)'
                    : i === 2 ? 'rotate(-45deg) translate(5px,-5px)'
                    : 'scaleX(0)'
                    : 'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        onClick={() => setMenuOpen(false)}
        className="fixed inset-0 z-[150] transition-opacity duration-300"
        style={{
          background: 'rgba(26,26,26,0.4)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
        }}
      />

      {/* Mobile drawer */}
      <div
        className="fixed top-0 right-0 h-screen z-[200] flex flex-col"
        style={{
          width: 'min(340px, 88vw)',
          background: '#F5F5F0',
          padding: '2.5rem',
          borderLeft: '1px solid rgba(26,26,26,0.1)',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.45s cubic-bezier(0.77,0,0.175,1)',
        }}
      >
        <div
          className="text-[1.6rem] font-bold mb-12 tracking-[0.05em]"
          style={{ fontFamily: 'var(--font-playfair-display)', color: '#1A1A1A' }}
        >
          MAHA
        </div>

        {links.map((link, i) => (
          <button
            key={link.id}
            onClick={() => scrollTo(link.id)}
            className="bg-transparent border-none text-left cursor-pointer flex items-baseline gap-4 py-[0.6rem]"
            style={{
              borderBottom: '1px solid rgba(26,26,26,0.08)',
              fontFamily: 'var(--font-playfair-display)',
              fontSize: '1.8rem',
              fontWeight: 400,
              color: '#1A1A1A',
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'none' : 'translateX(20px)',
              transition: `opacity 0.4s ease ${i * 60}ms, transform 0.4s ease ${i * 60}ms`,
            }}
          >
            <span
              className="font-semibold"
              style={{
                fontFamily: 'var(--font-montserrat-sans)',
                fontSize: '0.55rem',
                letterSpacing: '0.2em',
                color: '#9B8060',
              }}
            >
              0{i + 1}
            </span>
            {link.label}
          </button>
        ))}

        <div className="mt-auto flex flex-col gap-4">
          <button
            onClick={() => { router.push(`/${lang === 'en' ? 'hr' : 'en'}`); setMenuOpen(false); }}
            className="self-start cursor-pointer bg-transparent"
            style={{
              border: '1px solid rgba(26,26,26,0.2)',
              fontFamily: 'var(--font-montserrat-sans)',
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              fontWeight: 600,
              color: '#1A1A1A',
              padding: '10px',
            }}
          >
            {t.lang}
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="cursor-pointer border-none"
            style={{
              background: '#1A1A1A',
              color: '#F5F5F0',
              fontFamily: 'var(--font-montserrat-sans)',
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              padding: '14px',
            }}
          >
            {t.reserve}
          </button>
        </div>
      </div>
    </>
  );
}

interface NavLinkProps {
  children: React.ReactNode;
  onClick: () => void;
  active: boolean;
  textColor: string;
  accentColor: string;
}

function NavLink({ children, onClick, active, textColor, accentColor }: NavLinkProps) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="bg-transparent border-none cursor-pointer transition-colors duration-[400ms] py-1"
      style={{
        fontFamily: 'var(--font-montserrat-sans)',
        fontSize: '0.65rem',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: active || hov ? accentColor : textColor,
        fontWeight: active ? 600 : 400,
      }}
    >
      {children}
    </button>
  );
}
