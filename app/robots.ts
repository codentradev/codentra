import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://codentra.pl/sitemap.xml',
    host: 'https://codentra.pl',
  };
}
