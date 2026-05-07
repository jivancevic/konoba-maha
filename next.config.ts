import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Croatian legacy URLs
      { source: '/hr/pocetna', destination: '/hr', permanent: true },
      { source: '/hr/hrana', destination: '/hr/menu', permanent: true },
      { source: '/hr/grupni-meni', destination: '/hr/menu', permanent: true },
      { source: '/hr/degustacijski-meni', destination: '/hr/menu', permanent: true },
      { source: '/hr/vinska-lista', destination: '/hr/menu', permanent: true },
      { source: '/hr/kontakt', destination: '/hr#contact', permanent: true },
      {
        source: '/hr/vjencanja',
        destination: '/documents/Konoba-Maha-Ponuda-Za-Vjencanje.pdf',
        permanent: true,
      },

      // English legacy URLs
      { source: '/en/homepage', destination: '/en', permanent: true },
      { source: '/en/food', destination: '/en/menu', permanent: true },
      { source: '/en/group-menu', destination: '/en/menu', permanent: true },
      { source: '/en/tasting-menu', destination: '/en/menu', permanent: true },
      { source: '/en/wine-list', destination: '/en/menu', permanent: true },
      { source: '/en/contact', destination: '/en#contact', permanent: true },
      {
        source: '/en/weddings',
        destination: '/documents/Konoba-Maha-Wedding-Brochure.pdf',
        permanent: true,
      },

      // Other
      { source: '/cookie-policy-eu', destination: '/hr', permanent: true },
    ];
  },
};

export default nextConfig;
