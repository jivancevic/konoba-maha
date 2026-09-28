import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import type { Language } from '@/types';
import { readManifest } from '@/lib/cjenik';
import { translations } from '@/lib/translations';

const LOCALES: string[] = ['en', 'hr'];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const c = (translations[lang as Language] ?? translations.en).priceList;

  return {
    title: c.title,
    description: c.intro,
    // A compliance page, not a marketing page — keep it out of the index.
    robots: { index: false, follow: true },
    alternates: {
      canonical: `https://konobamaha.com/${lang}/cjenik`,
      languages: {
        en: 'https://konobamaha.com/en/cjenik',
        hr: 'https://konobamaha.com/hr/cjenik',
      },
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!LOCALES.includes(lang)) notFound();

  const c = translations[lang as Language].priceList;
  // Read at build time — the manifest is committed alongside the CSV files. Newest first.
  const entries = [...readManifest()].sort((a, b) => b.sequence - a.sequence);
  const dateFormat = new Intl.DateTimeFormat('hr-HR', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'Europe/Zagreb',
  });

  return (
    <>
      {/* Top nav — the menu page's pattern, without the tab bar */}
      <nav
        className="fixed top-0 left-0 right-0 z-[100] h-16 flex items-center justify-between"
        style={{
          padding: '0 clamp(1.5rem,5vw,4rem)',
          background: '#F5F5F0',
          borderBottom: '1px solid rgba(26,26,26,0.08)',
        }}
      >
        <Link
          href={`/${lang}`}
          className="no-underline flex items-center gap-2 font-medium"
          style={{
            fontFamily: 'var(--font-montserrat-sans)',
            fontSize: '0.6rem',
            letterSpacing: '0.15em',
            color: '#9B8060',
          }}
        >
          {c.back}
        </Link>
        <Link href={`/${lang}`} className="no-underline flex items-center">
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
      </nav>

      <div style={{ paddingTop: '64px', background: '#F5F5F0', minHeight: '100vh' }}>
        <div
          style={{
            maxWidth: 820,
            margin: '0 auto',
            padding: 'clamp(3.5rem,7vw,6rem) clamp(1.5rem,5vw,4rem) clamp(4rem,8vw,7rem)',
          }}
        >
          <div
            className="uppercase mb-4"
            style={{
              fontFamily: 'var(--font-montserrat-sans)',
              fontSize: '0.58rem',
              letterSpacing: '0.3em',
              color: '#9B8060',
            }}
          >
            {c.label}
          </div>
          <h1
            className="italic mb-5"
            style={{
              fontFamily: 'var(--font-playfair-display)',
              fontSize: 'clamp(2.2rem,4vw,3.2rem)',
              fontWeight: 400,
              color: '#1A1A1A',
              lineHeight: 1.1,
            }}
          >
            {c.heading}
          </h1>
          <p
            className="mb-12"
            style={{
              fontFamily: 'var(--font-montserrat-sans)',
              fontSize: '0.74rem',
              lineHeight: 1.9,
              fontWeight: 300,
              letterSpacing: '0.03em',
              color: '#6B6560',
            }}
          >
            {c.intro}
          </p>

          {entries.length === 0 ? (
            <p
              style={{
                fontFamily: 'var(--font-montserrat-sans)',
                fontSize: '0.72rem',
                color: '#9B9390',
                fontWeight: 300,
              }}
            >
              {c.empty}
            </p>
          ) : (
            <div>
              {entries.map((entry, i) => (
                <div
                  key={entry.file}
                  className="flex justify-between items-baseline gap-6 flex-wrap py-[1.1rem]"
                  style={{
                    borderBottom: i === entries.length - 1 ? 'none' : '1px solid rgba(26,26,26,0.06)',
                  }}
                >
                  <div>
                    <div
                      className="uppercase mb-1"
                      style={{
                        fontFamily: 'var(--font-montserrat-sans)',
                        fontSize: '0.5rem',
                        letterSpacing: '0.2em',
                        color: '#C0BBB5',
                      }}
                    >
                      {c.published}
                    </div>
                    <div className="flex items-center gap-3 flex-wrap mb-1">
                      <span
                        style={{
                          fontFamily: 'var(--font-playfair-display)',
                          fontSize: '1.05rem',
                          color: '#1A1A1A',
                        }}
                      >
                        {dateFormat.format(new Date(entry.publishedAt))}
                      </span>
                      {i === 0 && (
                        <span
                          className="uppercase font-semibold whitespace-nowrap"
                          style={{
                            fontFamily: 'var(--font-montserrat-sans)',
                            fontSize: '0.5rem',
                            letterSpacing: '0.18em',
                            color: '#9B8060',
                            border: '1px solid rgba(155,128,96,0.4)',
                            padding: '2px 8px',
                          }}
                        >
                          {c.current}
                        </span>
                      )}
                    </div>
                    <div
                      className="uppercase"
                      style={{
                        fontFamily: 'var(--font-montserrat-sans)',
                        fontSize: '0.55rem',
                        letterSpacing: '0.18em',
                        color: '#C0BBB5',
                      }}
                    >
                      {c.sequence} {String(entry.sequence).padStart(3, '0')}
                    </div>
                  </div>
                  <a
                    href={`/cjenik/${encodeURIComponent(entry.file)}`}
                    download={entry.file}
                    className="no-underline font-medium uppercase flex-shrink-0"
                    style={{
                      fontFamily: 'var(--font-montserrat-sans)',
                      fontSize: '0.58rem',
                      letterSpacing: '0.18em',
                      color: '#9B8060',
                    }}
                  >
                    {c.download}
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
