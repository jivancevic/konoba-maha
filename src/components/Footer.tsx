'use client';

import Image from 'next/image';
import type { Language } from '@/types';
import { translations } from '@/lib/translations';

interface FooterProps {
  lang: Language;
}

export default function Footer({ lang }: FooterProps) {
  const t = translations[lang].footer;

  return (
    <footer
      className="mt-[clamp(4rem,8vw,7rem)]"
      style={{ borderTop: '1px solid rgba(26,26,26,0.1)', padding: '2.5rem clamp(1.5rem,5vw,4rem)' }}
    >
      <div
        className="flex justify-between items-center flex-wrap gap-4"
        style={{ maxWidth: '1240px', margin: '0 auto' }}
      >
        <Image
          src="/images/maha-logo-transparent.png"
          alt="Konoba Maha"
          width={220}
          height={88}
          style={{
            height: '48px',
            width: 'auto',
            filter: 'sepia(0.4) saturate(1.2) brightness(0.65)',
          }}
        />
        <div className="flex items-center gap-6 flex-wrap">
          <span
            style={{
              fontFamily: 'var(--font-montserrat-sans)',
              fontSize: '0.6rem',
              letterSpacing: '0.1em',
              color: '#9B9390',
            }}
          >
            {t.rights}
          </span>
          <span
            className="uppercase"
            style={{
              fontFamily: 'var(--font-montserrat-sans)',
              fontSize: '0.55rem',
              letterSpacing: '0.2em',
              color: '#9B9390',
            }}
          >
            {t.location}
          </span>
        </div>
        <span
          style={{
            fontFamily: 'var(--font-montserrat-sans)',
            fontSize: '0.6rem',
            letterSpacing: '0.1em',
            color: '#9B9390',
          }}
        >
          Developed by:{' '}
          <a
            href="https://www.linkedin.com/in/josipivancevic/"
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline"
            style={{ color: 'inherit', transition: 'color 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#9B8060'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#9B9390'; }}
          >
            Josip Ivančević
          </a>
        </span>
      </div>
    </footer>
  );
}
