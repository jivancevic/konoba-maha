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
      // Wedding-planning intent → Valnea (the planner brand). See ADR-0002.
      // Repointed from the brochure PDF now that Valnea is live at a stable URL.
      {
        source: '/hr/vjencanja',
        destination: 'https://valneaweddings.com/hr',
        statusCode: 301, // explicit 301 (not 308) for cross-domain equity transfer
      },

      // English legacy URLs
      { source: '/en/homepage', destination: '/en', permanent: true },
      { source: '/en/food', destination: '/en/menu', permanent: true },
      { source: '/en/group-menu', destination: '/en/menu', permanent: true },
      { source: '/en/tasting-menu', destination: '/en/menu', permanent: true },
      { source: '/en/wine-list', destination: '/en/menu', permanent: true },
      { source: '/en/contact', destination: '/en#contact', permanent: true },
      // Wedding-planning intent → Valnea (the planner brand). See ADR-0002.
      // Repointed from the brochure PDF now that Valnea is live at a stable URL.
      {
        source: '/en/weddings',
        destination: 'https://valneaweddings.com/en',
        statusCode: 301, // explicit 301 (not 308) for cross-domain equity transfer
      },

      // Legacy WordPress-era wedding URL (non-localised). Held prior SEO equity
      // and currently 404s — 301 it to Valnea (EN-primary). Note: the PRD's
      // "weddings.konobamaha.com" subdomain never existed in DNS or the archive;
      // this bare /weddings path is the real legacy entry point. See ADR-0002.
      { source: '/weddings', destination: 'https://valneaweddings.com/en', statusCode: 301 },

      // Other
      { source: '/cookie-policy-eu', destination: '/hr', permanent: true },
    ];
  },
};

export default nextConfig;
