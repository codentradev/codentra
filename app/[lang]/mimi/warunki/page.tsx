import type { Metadata } from 'next';
import { OG_IMAGE } from '@/lib/seo';
import { LegalPage } from '@/components/mimi/LegalPage';
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/lib/i18n-config';

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
  const dict = await getDictionary(lang);
  const p = dict.mimiTerms;
  const url = `https://codentra.pl/${lang}/mimi/warunki`;

  return {
    title: p.metaTitle,
    description: p.metaDescription,
    alternates: {
      canonical: url,
      languages: {
        pl: 'https://codentra.pl/pl/mimi/warunki',
        en: 'https://codentra.pl/en/mimi/warunki',
        'x-default': 'https://codentra.pl/mimi/warunki',
      },
    },
    openGraph: {
      title: p.metaTitle,
      description: p.metaDescription,
      url,
      type: 'article',
      siteName: 'Codentra',
      images: [OG_IMAGE],
    },
  };
}

export default async function MimiTermsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = await resolveLang(rawLang);
  const dict = await getDictionary(lang);
  const p = dict.mimiTerms;

  return (
    <LegalPage
      lang={lang}
      dict={dict}
      backHref={`/${lang}/mimi`}
      back={p.back}
      eyebrow={p.eyebrow}
      title={p.title}
      updated={p.updated}
      lead={p.lead}
      sections={p.sections}
    />
  );
}
