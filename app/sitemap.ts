import type { MetadataRoute } from 'next';
import { i18n } from '@/lib/i18n-config';

const BASE = 'https://codentra.pl';

// Ścieżki (bez prefiksu języka) wraz z priorytetem i częstotliwością zmian.
const PATHS: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }> = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/contivo', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/contivo/ksiegowosc-ai', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/contivo/alternatywa-dla-optima-enova-symfonia', priority: 0.8, changeFrequency: 'monthly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return PATHS.flatMap(({ path, priority, changeFrequency }) =>
    i18n.locales.map((locale) => ({
      url: `${BASE}/${locale}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
      alternates: {
        languages: Object.fromEntries(
          i18n.locales.map((l) => [l, `${BASE}/${l}${path}`]),
        ),
      },
    })),
  );
}
