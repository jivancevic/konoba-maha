import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { Language } from '@/types';
import MenuClient from '@/components/MenuClient';

const LOCALES: string[] = ['en', 'hr'];

const meta = {
  en: {
    title: 'Our Menu — Konoba Maha | Korčula Restaurant',
    description:
      'Explore the full menu at Konoba Maha — food, wine list, tasting menu, and group menus. Traditional Dalmatian cuisine on the island of Korčula.',
    ogTitle: 'Our Menu — Konoba Maha',
    ogDesc: 'Food, wine, tasting, and group menus at Konoba Maha, Korčula.',
    locale: 'en_US',
  },
  hr: {
    title: 'Naš Jelovnik — Konoba Maha | Restoran Korčula',
    description:
      'Istražite puni jelovnik Konobe Maha — hrana, vinska lista, degustacijski meni i grupni meniji. Tradicionalna dalmatinska kuhinja na otoku Korčuli.',
    ogTitle: 'Naš Jelovnik — Konoba Maha',
    ogDesc: 'Hrana, vino, degustacijski i grupni meniji u Konobi Maha, Korčula.',
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
  const url = `https://konobamaha.com/${lang}/menu`;

  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: url,
      languages: {
        en: 'https://konobamaha.com/en/menu',
        hr: 'https://konobamaha.com/hr/menu',
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

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!LOCALES.includes(lang)) notFound();

  return <MenuClient lang={lang as Language} />;
}
