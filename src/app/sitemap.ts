import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://konobamaha.com';
  const now = new Date();

  return [
    { url: `${base}/hr`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/en`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/hr/menu`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/en/menu`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ];
}
