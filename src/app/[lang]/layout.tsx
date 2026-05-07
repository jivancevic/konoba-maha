import { Playfair_Display, Montserrat } from 'next/font/google';
import '../globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  style: ['normal', 'italic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat-sans',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'hr' }];
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return (
    <html lang={lang} className={`${playfair.variable} ${montserrat.variable}`}>
      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: 'var(--font-montserrat-sans), Montserrat, sans-serif' }}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
