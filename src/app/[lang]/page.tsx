import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { Language } from '@/types';
import HomeClient from '@/components/HomeClient';

const LOCALES: string[] = ['en', 'hr'];

const meta = {
  en: {
    title: 'Konoba Maha — Restaurant Korčula | Since 2003',
    description:
      'A family restaurant on the island of Korčula, Croatia. Traditional Dalmatian cuisine, fresh local ingredients, and the scent of the Mediterranean.',
    keywords: ['Konoba Maha', 'Korčula', 'Croatia', 'restaurant', 'Dalmatian cuisine', 'peka'],
    ogTitle: 'Konoba Maha — Restaurant Korčula',
    ogDesc: 'A family restaurant on the island of Korčula with traditional Dalmatian cuisine, fresh local ingredients.',
    locale: 'en_US',
  },
  hr: {
    title: 'Konoba Maha — Restoran Korčula | Od 2003.',
    description:
      'Obiteljski restoran na otoku Korčuli, Hrvatska. Tradicionalna dalmatinska kuhinja, svježi lokalni sastojci i miris Mediterana.',
    keywords: ['Konoba Maha', 'Korčula', 'Hrvatska', 'restoran', 'dalmatinska kuhinja', 'peka'],
    ogTitle: 'Konoba Maha — Restoran Korčula',
    ogDesc: 'Obiteljski restoran na otoku Korčuli s tradicionalnom dalmatinskom kuhinjom i svježim lokalnim sastojcima.',
    locale: 'hr_HR',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const m = meta[lang as Language] ?? meta.en;
  const url = `https://konobamaha.com/${lang}`;

  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords,
    alternates: {
      canonical: url,
      languages: {
        en: 'https://konobamaha.com/en',
        hr: 'https://konobamaha.com/hr',
      },
    },
    openGraph: {
      title: m.ogTitle,
      description: m.ogDesc,
      url,
      siteName: 'Konoba Maha',
      images: [
        {
          url: 'https://konobamaha.com/images/hero.jpg',
          width: 1200,
          height: 630,
          alt: 'Konoba Maha — Restaurant Korčula',
        },
      ],
      locale: m.locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: m.ogTitle,
      description: m.ogDesc,
      images: ['https://konobamaha.com/images/hero.jpg'],
    },
  };
}

const restaurantSchema = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'Konoba Maha',
  url: 'https://konobamaha.com',
  image: 'https://konobamaha.com/images/hero.jpg',
  description:
    'A family restaurant on the island of Korčula, Croatia. Traditional Dalmatian cuisine, fresh local ingredients, Peka speciality.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Vrsi bb',
    addressLocality: 'Žrnovo',
    addressRegion: 'Korčula',
    postalCode: '20275',
    addressCountry: 'HR',
  },
  telephone: '+38598494389',
  priceRange: '€€€',
  servesCuisine: ['Croatian', 'Mediterranean', 'Meat dishes', 'Traditional Dalmatian'],
  openingHours: 'Mo-Su 17:00-23:00',
  menu: 'https://konobamaha.com/menu',
  knowsAbout: ['Peka', 'Slow cooking', 'Local organic ingredients', 'Korčula wine'],
};

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!LOCALES.includes(lang)) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
      />
      <HomeClient lang={lang as Language} />
    </>
  );
}
