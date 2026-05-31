import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import '../globals.css';
import { i18n, type Locale } from '@/lib/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
});

const space = Space_Grotesk({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-space',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales as readonly string[]).includes(rawLang)
    ? (rawLang as Locale)
    : i18n.defaultLocale;
  const dict = await getDictionary(lang);

  return {
    metadataBase: new URL('https://codentra.pl'),
    title: {
      default: dict.meta.title,
      template: '%s · Codentra',
    },
    description: dict.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        pl: '/pl',
        en: '/en',
        'x-default': '/pl',
      },
    },
    openGraph: {
      type: 'website',
      locale: lang === 'pl' ? 'pl_PL' : 'en_US',
      url: `https://codentra.pl/${lang}`,
      title: dict.meta.ogTitle,
      description: dict.meta.ogDescription,
      siteName: 'Codentra',
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.ogTitle,
      description: dict.meta.ogDescription,
    },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales as readonly string[]).includes(rawLang)
    ? (rawLang as Locale)
    : i18n.defaultLocale;
  return (
    <html lang={lang} className={`${inter.variable} ${space.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
