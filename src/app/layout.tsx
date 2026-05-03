import type { Metadata } from 'next';
import { Playfair_Display, Montserrat } from 'next/font/google';
import './globals.css';

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

export const metadata: Metadata = {
  title: "Konoba Maha — Since 2003",
  description:
    "A family restaurant on the island of Korčula, Croatia. Traditional Dalmatian cuisine, fresh local ingredients, and the scent of the Mediterranean.",
  keywords: [
    "Konoba Maha",
    "Korčula",
    "Croatia",
    "restaurant",
    "Dalmatian cuisine",
    "peka",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${montserrat.variable}`}
    >
      <body className="min-h-full flex flex-col" style={{ fontFamily: 'var(--font-montserrat-sans), Montserrat, sans-serif' }} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
