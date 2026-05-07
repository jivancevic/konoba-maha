'use client';

import { useState, useEffect } from 'react';
import type { Language } from '@/types';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Story from '@/components/Story';
import Food from '@/components/Food';
import MenuHighlights from '@/components/MenuHighlights';
import Weddings from '@/components/Weddings';
import Contact from '@/components/Contact';

const SECTIONS = ['hero', 'story', 'food', 'menu', 'weddings', 'contact'] as const;

export default function HomeClient({ lang }: { lang: Language }) {
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const onScroll = () => {
      let current = 'hero';
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 110) current = id;
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <Navbar lang={lang} activeSection={activeSection} />
      <main>
        <Hero lang={lang} />
        <Story lang={lang} />
        <Food lang={lang} />
        <MenuHighlights lang={lang} />
        <Weddings lang={lang} />
        <Contact lang={lang} />
      </main>
    </>
  );
}
