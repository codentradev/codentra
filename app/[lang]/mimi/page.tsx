import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Smartphone,
  Sparkles,
  CalendarDays,
  PhoneCall,
  MapPin,
  NotebookPen,
  Timer,
  Contact,
  Music,
  HeartPulse,
  Camera,
  AppWindow,
  ShieldCheck,
  KeyRound,
  FileText,
  Scale,
  LifeBuoy,
} from 'lucide-react';
import { OG_IMAGE } from '@/lib/seo';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ParticleField } from '@/components/ui/ParticleField';
import { GlowCard } from '@/components/ui/GlowCard';
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/lib/i18n-config';

/**
 * Adres aplikacji w App Store.
 *
 * `null`, dopóki Apple jej nie opublikuje — wtedy przycisk jest nieaktywny
 * i opatrzony informacją „wkrótce". Po publikacji wystarczy wkleić tu adres
 * (https://apps.apple.com/pl/app/...), a przycisk sam stanie się odnośnikiem.
 */
const APP_STORE_URL: string | null = null;

const FEATURE_ICONS = [
  CalendarDays,
  PhoneCall,
  MapPin,
  NotebookPen,
  Timer,
  Contact,
  Music,
  HeartPulse,
  Camera,
  AppWindow,
] as const;

const FEATURE_ACCENTS = [
  'text-brand-blue',
  'text-brand-teal',
  'text-brand-green',
  'text-brand-lime',
  'text-brand-yellow',
  'text-brand-orange',
  'text-brand-red',
  'text-brand-teal',
  'text-brand-blue',
  'text-brand-green',
] as const;

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
  const p = dict.mimiPage;
  const url = `https://codentra.pl/${lang}/mimi`;

  return {
    title: p.metaTitle,
    description: p.metaDescription,
    keywords: p.keywords,
    alternates: {
      canonical: url,
      languages: {
        pl: 'https://codentra.pl/pl/mimi',
        en: 'https://codentra.pl/en/mimi',
        'x-default': 'https://codentra.pl/mimi',
      },
    },
    openGraph: {
      title: p.ogTitle,
      description: p.ogDescription,
      url,
      type: 'website',
      siteName: 'Codentra',
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      images: [OG_IMAGE.url],
      title: p.ogTitle,
      description: p.ogDescription,
    },
  };
}

export default async function MimiPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = await resolveLang(rawLang);
  const dict = await getDictionary(lang);
  const p = dict.mimiPage;

  const docs = [
    {
      href: `/${lang}/mimi/prywatnosc`,
      Icon: FileText,
      label: p.docPrivacy,
      desc: p.docPrivacyDesc,
    },
    {
      href: `/${lang}/mimi/warunki`,
      Icon: Scale,
      label: p.docTerms,
      desc: p.docTermsDesc,
    },
    {
      href: `/${lang}/mimi/pomoc`,
      Icon: LifeBuoy,
      label: p.docSupport,
      desc: p.docSupportDesc,
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MobileApplication',
        '@id': 'https://codentra.pl/mimi#app',
        name: 'Mimi',
        applicationCategory: 'ProductivityApplication',
        operatingSystem: 'iOS 17.0 or later',
        url: 'https://codentra.pl/mimi',
        inLanguage: 'pl-PL',
        description: p.metaDescription,
        featureList: p.features.map((f) => f.t),
        publisher: {
          '@type': 'Organization',
          '@id': 'https://codentra.pl/#organization',
          name: 'Codentra Sp. z o.o.',
          url: 'https://codentra.pl',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Świdnica',
            addressCountry: 'PL',
          },
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: p.faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation lang={lang} dict={dict.nav} />

      <main className="relative">
        {/* ---------------------------------------------------------------- HERO */}
        <section className="relative overflow-hidden pb-20 pt-44 md:pt-52">
          <div className="absolute inset-0 grid-bg" aria-hidden />
          <ParticleField density={50} className="opacity-60" />
          <div
            aria-hidden
            className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-brand-teal/15 blur-[120px]"
          />

          <div className="container-x relative">
            <Link
              href={`/${lang}#produkty`}
              className="mb-8 inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
            >
              <ArrowLeft size={14} />
              {p.back}
            </Link>

            <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <Image
                    src="/mimi-icon.png"
                    alt={p.logoAlt}
                    width={96}
                    height={96}
                    priority
                    className="h-16 w-16 rounded-[1.25rem] ring-1 ring-white/10 md:h-20 md:w-20"
                  />
                  <div className="flex flex-col gap-1.5">
                    <span className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
                      Mimi
                    </span>
                    <span className="badge w-fit !text-brand-teal">
                      <Sparkles size={12} />
                      {p.badge}
                    </span>
                  </div>
                </div>

                <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance md:text-5xl">
                  {p.titlePre}{' '}
                  <span className="text-gradient">{p.titleGradient}</span>
                  {p.titlePost}
                </h1>

                <p className="max-w-xl text-pretty text-lg text-fg-muted">
                  {p.lead}
                </p>

                {/* Przycisk App Store — aktywny dopiero po publikacji aplikacji. */}
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-3">
                    {APP_STORE_URL ? (
                      <a
                        href={APP_STORE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                      >
                        <Smartphone size={16} />
                        {p.appStoreButton}
                      </a>
                    ) : (
                      <span
                        aria-disabled="true"
                        className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full border border-dashed border-white/15 bg-white/[0.03] px-6 py-3 font-medium text-fg-muted"
                      >
                        <Smartphone size={16} />
                        {p.appStoreTitle}
                      </span>
                    )}
                    <a href={`#dokumenty`} className="btn-ghost">
                      {p.ctaDocs}
                    </a>
                  </div>
                  {APP_STORE_URL ? null : (
                    <p className="max-w-md text-xs text-fg-subtle">
                      {p.appStoreNote}
                    </p>
                  )}
                </div>
              </div>

              <GlowCard className="relative">
                <div className="p-8">
                  <h2 className="font-display text-lg font-semibold text-fg">
                    {p.highlightsTitle}
                  </h2>
                  <ul className="mt-5 flex flex-col gap-3">
                    {p.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-3 text-sm text-fg-muted"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-green/15 text-brand-green">
                          <Check size={12} strokeWidth={3} />
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </GlowCard>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ FUNKCJE */}
        <section className="relative py-20 md:py-28">
          <div className="container-x">
            <div className="flex max-w-3xl flex-col items-start gap-4">
              <span className="section-label text-brand-teal">
                {p.featuresEyebrow}
              </span>
              <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
                {p.featuresTitlePre}{' '}
                <span className="text-gradient">{p.featuresTitleGradient}</span>
              </h2>
              <p className="text-pretty text-fg-muted">{p.featuresIntro}</p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {p.features.map((f, i) => {
                const Icon = FEATURE_ICONS[i] ?? Sparkles;
                return (
                  <div
                    key={f.t}
                    className="group flex flex-col rounded-2xl border border-white/[0.06] bg-ink-800/40 p-6 backdrop-blur-xl transition-all hover:border-white/[0.15] hover:-translate-y-1"
                  >
                    <div
                      className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] ${FEATURE_ACCENTS[i] ?? 'text-brand-teal'}`}
                    >
                      <Icon size={18} />
                    </div>
                    <h3 className="font-display text-base font-semibold text-fg">
                      {f.t}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                      {f.d}
                    </p>
                    <p className="mt-4 rounded-lg border border-white/[0.05] bg-ink-950/50 px-3 py-2 font-mono text-xs leading-relaxed text-fg-subtle">
                      {f.ex}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------ PIERWSZE KROKI */}
        <section className="relative py-20 md:py-24">
          <div
            aria-hidden
            className="absolute inset-0 bg-grid-faint opacity-20"
            style={{ backgroundSize: '60px 60px' }}
          />
          <div className="container-x relative">
            <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
              <div className="flex flex-col items-start gap-4">
                <span className="section-label text-brand-teal">
                  {p.startEyebrow}
                </span>
                <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
                  {p.startTitlePre}{' '}
                  <span className="text-gradient">{p.startTitleGradient}</span>
                </h2>
                <p className="text-pretty text-fg-muted">{p.startIntro}</p>
                <p className="mt-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-sm leading-relaxed text-fg-subtle">
                  {p.startNote}
                </p>
              </div>

              <ol className="flex flex-col gap-4">
                {p.startSteps.map((s, i) => (
                  <li
                    key={s.t}
                    className="flex gap-5 rounded-2xl border border-white/[0.06] bg-ink-800/40 p-6 backdrop-blur-xl"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-brand font-display text-sm font-semibold text-ink-950">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-base font-semibold text-fg">
                        {s.t}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                        {s.d}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- CARPLAY */}
        <section className="relative py-20 md:py-24">
          <div className="container-x">
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-900/60 p-10 backdrop-blur-xl md:p-16">
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-brand opacity-[0.06]"
              />
              <div className="relative grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
                <div className="flex flex-col items-start gap-4">
                  <span className="section-label text-brand-orange">
                    {p.carEyebrow}
                  </span>
                  <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
                    {p.carTitlePre}{' '}
                    <span className="text-gradient">{p.carTitleGradient}</span>
                  </h2>
                  <p className="text-pretty leading-relaxed text-fg-muted">
                    {p.carBody}
                  </p>
                </div>
                <ul className="flex flex-col gap-3 self-center">
                  {p.carPoints.map((c) => (
                    <li
                      key={c}
                      className="flex items-start gap-3 text-sm text-fg-muted"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-orange/15 text-brand-orange">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- KLUCZ API */}
        <section className="relative py-20 md:py-24">
          <div className="container-x">
            <div className="flex max-w-3xl flex-col items-start gap-4">
              <span className="badge">
                <KeyRound size={12} className="text-brand-yellow" />
                {p.keyEyebrow}
              </span>
              <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
                {p.keyTitlePre}{' '}
                <span className="text-gradient">{p.keyTitleGradient}</span>
              </h2>
              <p className="text-pretty text-fg-muted">{p.keyBody}</p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {p.keyPoints.map((k) => (
                <div
                  key={k.t}
                  className="rounded-2xl border border-white/[0.06] bg-ink-800/40 p-6 backdrop-blur-xl"
                >
                  <h3 className="font-display text-base font-semibold text-fg">
                    {k.t}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                    {k.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- PRYWATNOŚĆ */}
        <section className="relative py-20 md:py-24">
          <div className="container-x">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
              <div className="flex flex-col items-start gap-4">
                <span className="badge">
                  <ShieldCheck size={12} className="text-brand-green" />
                  {p.privacyEyebrow}
                </span>
                <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
                  {p.privacyTitlePre}{' '}
                  <span className="text-gradient">
                    {p.privacyTitleGradient}
                  </span>
                </h2>
                <p className="text-pretty leading-relaxed text-fg-muted">
                  {p.privacyBody}
                </p>
                <Link
                  href={`/${lang}/mimi/prywatnosc`}
                  className="btn-ghost !py-2 !px-5 text-sm"
                >
                  {p.docPrivacy}
                  <ArrowUpRight size={14} />
                </Link>
              </div>

              <ul className="grid gap-2.5 self-center rounded-2xl border border-white/[0.06] bg-ink-950/40 p-6">
                {p.privacyPoints.map((pt) => (
                  <li
                    key={pt}
                    className="flex items-start gap-3 font-mono text-xs leading-relaxed text-fg-muted"
                  >
                    <span className="mt-0.5 text-brand-green">▸</span>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- DOKUMENTY */}
        <section id="dokumenty" className="relative scroll-mt-28 py-20 md:py-24">
          <div className="container-x">
            <div className="flex flex-col items-start gap-4">
              <span className="section-label text-brand-teal">
                {p.docsEyebrow}
              </span>
              <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
                {p.docsTitle}
              </h2>
              <p className="text-pretty text-fg-muted">{p.docsIntro}</p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {docs.map(({ href, Icon, label, desc }) => (
                <Link
                  key={href}
                  href={href}
                  className="group flex flex-col rounded-2xl border border-white/[0.06] bg-ink-800/40 p-6 backdrop-blur-xl transition-all hover:border-white/[0.15] hover:-translate-y-1"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] text-brand-teal">
                    <Icon size={18} />
                  </div>
                  <h3 className="flex items-center justify-between gap-3 font-display text-base font-semibold text-fg">
                    {label}
                    <ArrowUpRight
                      size={16}
                      className="shrink-0 text-fg-subtle transition-colors group-hover:text-brand-teal"
                    />
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                    {desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------------- FAQ */}
        <section className="relative py-20 md:py-24">
          <div className="container-x">
            <div className="flex flex-col items-start gap-4">
              <span className="section-label text-brand-teal">
                {p.faqEyebrow}
              </span>
              <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
                {p.faqTitle}
              </h2>
            </div>

            <div className="mx-auto mt-10 grid max-w-4xl gap-4">
              {p.faq.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-2xl border border-white/[0.06] bg-ink-800/40 p-6 backdrop-blur-xl [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-semibold text-fg">
                    {f.q}
                    <span className="shrink-0 text-brand-teal transition-transform group-open:rotate-45">
                      <Sparkles size={16} />
                    </span>
                  </summary>
                  <p className="mt-3 text-pretty text-sm leading-relaxed text-fg-muted">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- CTA BANNER */}
        <section className="relative py-20">
          <div className="container-x">
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-900/60 p-10 backdrop-blur-xl md:p-16">
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-brand opacity-[0.08]"
              />
              <div className="relative flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="font-display text-3xl font-semibold leading-tight md:text-4xl">
                    {p.ctaBannerTitle}
                  </h2>
                  <p className="mt-3 max-w-xl text-fg-muted">
                    {p.ctaBannerBody}
                  </p>
                </div>
                <Link
                  href={`/${lang}/mimi/pomoc`}
                  className="btn-primary shrink-0"
                >
                  {p.ctaBannerButton}
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} dict={dict.footer} />
    </>
  );
}
