import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Mail, Sparkles } from 'lucide-react';
import { OG_IMAGE } from '@/lib/seo';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { LegalText } from '@/components/mimi/LegalText';
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
  const p = dict.mimiSupport;
  const url = `https://codentra.pl/${lang}/mimi/pomoc`;

  return {
    title: p.metaTitle,
    description: p.metaDescription,
    alternates: {
      canonical: url,
      languages: {
        pl: 'https://codentra.pl/pl/mimi/pomoc',
        en: 'https://codentra.pl/en/mimi/pomoc',
        'x-default': 'https://codentra.pl/mimi/pomoc',
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

export default async function MimiSupportPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = await resolveLang(rawLang);
  const dict = await getDictionary(lang);
  const p = dict.mimiSupport;

  // Strona pomocy jest też stroną FAQ dla wyszukiwarek — te same treści,
  // żadnych dodatkowych do utrzymania.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: p.topics.map((t) => ({
      '@type': 'Question',
      name: t.q,
      acceptedAnswer: { '@type': 'Answer', text: t.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation lang={lang} dict={dict.nav} />

      <main className="relative">
        <section className="relative overflow-hidden pb-12 pt-40 md:pt-48">
          <div className="absolute inset-0 grid-bg opacity-60" aria-hidden />
          <div
            aria-hidden
            className="absolute left-1/2 top-0 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-brand-teal/10 blur-[120px]"
          />

          <div className="container-x relative max-w-3xl">
            <Link
              href={`/${lang}/mimi`}
              className="mb-8 inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
            >
              <ArrowLeft size={14} />
              {p.back}
            </Link>

            <div className="flex items-center gap-4">
              <Image
                src="/mimi-icon.png"
                alt="Mimi"
                width={56}
                height={56}
                className="h-12 w-12 rounded-2xl ring-1 ring-white/10"
              />
              <span className="section-label text-brand-teal">{p.eyebrow}</span>
            </div>

            <h1 className="mt-6 font-display text-3xl font-semibold leading-tight tracking-tight text-balance md:text-4xl">
              {p.title}
            </h1>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-fg-muted">
              <LegalText>{p.lead}</LegalText>
            </p>
          </div>
        </section>

        {/* ------------------------------------------------- TYPOWE PROBLEMY */}
        <section className="relative pb-16">
          <div className="container-x max-w-3xl">
            <h2 className="font-display text-xl font-semibold text-fg">
              {p.topicsTitle}
            </h2>

            <div className="mt-6 grid gap-3">
              {p.topics.map((t) => (
                <details
                  key={t.q}
                  className="group rounded-2xl border border-white/[0.06] bg-ink-800/40 p-5 backdrop-blur-xl [&_summary::-webkit-details-marker]:hidden md:p-6"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-semibold text-fg">
                    {t.q}
                    <span className="shrink-0 text-brand-teal transition-transform group-open:rotate-45">
                      <Sparkles size={16} />
                    </span>
                  </summary>
                  <p className="mt-3 text-pretty leading-relaxed text-fg-muted">
                    <LegalText>{t.a}</LegalText>
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- KONTAKT */}
        <section className="relative pb-24">
          <div className="container-x max-w-3xl">
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-900/60 p-8 backdrop-blur-xl md:p-10">
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-brand opacity-[0.07]"
              />
              <div className="relative">
                <h2 className="font-display text-2xl font-semibold text-fg">
                  {p.contactTitle}
                </h2>
                <p className="mt-3 max-w-xl text-pretty leading-relaxed text-fg-muted">
                  {p.contactBody}
                </p>
                <a
                  href={`mailto:${p.contactEmail}`}
                  className="btn-primary mt-6 w-fit"
                >
                  <Mail size={16} />
                  {p.contactEmail}
                </a>
                <p className="mt-6 font-mono text-xs text-fg-subtle">
                  {p.contactOperator}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} dict={dict.footer} />
    </>
  );
}
