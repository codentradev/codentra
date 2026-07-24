import type { Metadata } from 'next';
import { SeoLanding, type LandingContent } from '@/components/SeoLanding';
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/lib/i18n-config';

const SLUG = 'alternatywa-dla-optima-enova-symfonia';

async function resolveLang(rawLang: string): Promise<Locale> {
  const { i18n } = await import('@/lib/i18n-config');
  return (i18n.locales as readonly string[]).includes(rawLang)
    ? (rawLang as Locale)
    : i18n.defaultLocale;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = await resolveLang(rawLang);
  const c = (await getDictionary(lang)).contivoAlt;
  const url = `https://codentra.pl/${lang}/contivo/${SLUG}`;
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    keywords: c.keywords,
    alternates: {
      canonical: url,
      languages: {
        pl: `https://codentra.pl/pl/contivo/${SLUG}`,
        en: `https://codentra.pl/en/contivo/${SLUG}`,
      },
    },
    openGraph: {
      title: c.ogTitle,
      description: c.ogDescription,
      url,
      type: 'article',
      siteName: 'Codentra',
    },
    twitter: { card: 'summary_large_image', title: c.ogTitle, description: c.ogDescription },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = await resolveLang(rawLang);
  const content = (await getDictionary(lang)).contivoAlt as LandingContent;
  return <SeoLanding lang={lang} content={content} slug={SLUG} />;
}
