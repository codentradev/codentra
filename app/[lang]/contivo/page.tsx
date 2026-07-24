import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Minus,
  Sparkles,
  Brain,
  FileText,
  Scale,
  BellRing,
  Workflow,
  GraduationCap,
  Landmark,
} from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ParticleField } from '@/components/ui/ParticleField';
import { GlowCard } from '@/components/ui/GlowCard';
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
  const p = dict.contivoPage;
  const url = `https://codentra.pl/${lang}/contivo`;
  return {
    title: p.metaTitle,
    description: p.metaDescription,
    keywords: p.keywords,
    alternates: {
      canonical: url,
      languages: {
        pl: 'https://codentra.pl/pl/contivo',
        en: 'https://codentra.pl/en/contivo',
      },
    },
    openGraph: {
      title: p.ogTitle,
      description: p.ogDescription,
      url,
      type: 'website',
      siteName: 'Codentra',
    },
    twitter: {
      card: 'summary_large_image',
      title: p.ogTitle,
      description: p.ogDescription,
    },
  };
}

const AI_ICONS = [FileText, Scale, BellRing, Workflow, GraduationCap, Landmark] as const;

export default async function ContivoPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = await resolveLang(rawLang);
  const dict = await getDictionary(lang);
  const p = dict.contivoPage;

  // Dane strukturalne dla wyszukiwarek — produkt (SoftwareApplication) + FAQ.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Contivo',
        applicationCategory: 'BusinessApplication',
        applicationSubCategory: 'AccountingSoftware',
        operatingSystem: 'Web',
        url: 'https://contivo.pl',
        inLanguage: 'pl-PL',
        description: p.metaDescription,
        featureList: p.modules.map((m) => m.name),
        offers: { '@type': 'Offer', category: 'SaaS' },
        publisher: {
          '@type': 'Organization',
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
            className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-brand-orange/15 blur-[120px]"
          />

          <div className="container-x relative">
            <Link
              href={`/${lang}`}
              className="mb-8 inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
            >
              <ArrowLeft size={14} />
              {p.back}
            </Link>

            <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
              <div className="flex flex-col gap-6">
                <Image
                  src="/contivo-logo.png"
                  alt="Contivo — system księgowy AI-Native"
                  width={248}
                  height={52}
                  priority
                  className="h-9 w-auto max-w-full self-start object-contain md:h-10"
                />
                <span className="badge w-fit !text-brand-yellow">
                  <Sparkles size={12} />
                  {p.badge}
                </span>
                <h1 className="font-display text-4xl font-semibold leading-[1.02] tracking-tight text-balance md:text-6xl">
                  {p.titlePre}{' '}
                  <span className="text-gradient">{p.titleGradient}</span>
                  {p.titlePost}
                </h1>
                <p className="max-w-xl text-lg text-fg-muted">{p.lead}</p>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="https://contivo.pl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    {p.ctaOpen}
                    <ArrowUpRight size={16} />
                  </a>
                  <a href={`/${lang}#kontakt`} className="btn-ghost">
                    {p.ctaContact}
                  </a>
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

        {/* ------------------------------------------------- PIERWSZY / AI-NATIVE */}
        <section className="relative py-20 md:py-28">
          <div className="container-x">
            <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
              <div className="flex flex-col items-start gap-4">
                <span className="section-label text-brand-teal">
                  {p.firstEyebrow}
                </span>
                <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
                  {p.firstTitlePre}{' '}
                  <span className="text-gradient">{p.firstTitleGradient}</span>
                </h2>
                <p className="text-pretty text-fg-muted">{p.firstBody}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {p.firstPoints.map((pt, i) => {
                  const accents = [
                    'text-brand-blue',
                    'text-brand-teal',
                    'text-brand-green',
                    'text-brand-orange',
                  ];
                  return (
                    <div
                      key={pt.t}
                      className="rounded-2xl border border-white/[0.06] bg-ink-800/40 p-6 backdrop-blur-xl transition-colors hover:border-white/[0.15]"
                    >
                      <div
                        className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] ${accents[i] ?? ''}`}
                      >
                        <Brain size={18} />
                      </div>
                      <h3 className="font-display text-base font-semibold text-fg">
                        {pt.t}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                        {pt.d}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- PORÓWNANIE */}
        <section className="relative py-20 md:py-24">
          <div className="container-x">
            <div className="flex max-w-3xl flex-col items-start gap-4">
              <span className="badge">
                <span className="badge-dot" /> {p.compareEyebrow}
              </span>
              <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
                {p.compareTitlePre}{' '}
                <span className="text-gradient">{p.compareTitleGradient}</span>
              </h2>
              <p className="text-pretty text-fg-muted">{p.compareIntro}</p>
            </div>

            <div className="mt-12 overflow-x-auto">
              <table className="w-full min-w-[640px] border-separate border-spacing-0 text-left text-sm">
                <thead>
                  <tr>
                    <th className="w-[34%] pb-4 pr-4" />
                    <th className="w-[33%] rounded-tl-xl border-b border-white/[0.08] bg-white/[0.02] px-5 py-4 align-bottom font-display text-sm font-semibold text-fg-muted whitespace-pre-line">
                      {p.compareColLegacy}
                    </th>
                    <th className="w-[33%] rounded-t-xl border-b border-brand-teal/40 bg-brand-teal/[0.07] px-5 py-4 align-bottom font-display text-sm font-semibold text-fg">
                      {p.compareColContivo}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {p.compareRows.map((row, i) => {
                    const last = i === p.compareRows.length - 1;
                    return (
                      <tr key={row.f}>
                        <th
                          scope="row"
                          className="border-b border-white/[0.05] py-4 pr-4 text-left align-top font-medium text-fg"
                        >
                          {row.f}
                        </th>
                        <td className="border-b border-white/[0.05] bg-white/[0.02] px-5 py-4 align-top text-fg-muted">
                          <span className="flex items-start gap-2">
                            <Minus
                              size={15}
                              className="mt-0.5 shrink-0 text-fg-subtle"
                            />
                            {row.a}
                          </span>
                        </td>
                        <td
                          className={`border-b border-brand-teal/20 bg-brand-teal/[0.07] px-5 py-4 align-top text-fg ${last ? 'rounded-b-xl' : ''}`}
                        >
                          <span className="flex items-start gap-2">
                            <Check
                              size={15}
                              strokeWidth={3}
                              className="mt-0.5 shrink-0 text-brand-green"
                            />
                            {row.b}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="mt-5 max-w-3xl text-xs text-fg-subtle">
              {p.compareNote}
            </p>
          </div>
        </section>

        {/* --------------------------------------------------------- AI W PRAKTYCE */}
        <section className="relative py-20 md:py-24">
          <div
            aria-hidden
            className="absolute inset-0 bg-grid-faint opacity-20"
            style={{ backgroundSize: '60px 60px' }}
          />
          <div className="container-x relative">
            <div className="flex max-w-3xl flex-col items-start gap-4">
              <span className="section-label text-brand-teal">{p.aiEyebrow}</span>
              <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
                {p.aiTitlePre}{' '}
                <span className="text-gradient">{p.aiTitleGradient}</span>
              </h2>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {p.aiItems.map((it, i) => {
                const Icon = AI_ICONS[i] ?? Brain;
                return (
                  <div
                    key={it.t}
                    className="group rounded-2xl border border-white/[0.06] bg-ink-800/40 p-6 backdrop-blur-xl transition-all hover:border-white/[0.15] hover:-translate-y-1"
                  >
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] text-brand-teal">
                      <Icon size={18} />
                    </div>
                    <h3 className="font-display text-base font-semibold text-fg">
                      {it.t}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                      {it.d}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- MODUŁY */}
        <section className="relative py-20 md:py-24">
          <div className="container-x">
            <div className="flex flex-col items-start gap-4">
              <span className="badge">
                <span className="badge-dot" /> {p.modulesEyebrow}
              </span>
              <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
                {p.modulesTitlePre}
                <br />
                <span className="text-gradient">{p.modulesTitleGradient}</span>
              </h2>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {p.modules.map((m, i) => (
                <div
                  key={m.name}
                  className="group rounded-2xl border border-white/[0.06] bg-ink-800/40 p-6 backdrop-blur-xl transition-all hover:border-white/[0.15] hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-fg-subtle">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-teal/60 transition-all group-hover:bg-brand-teal group-hover:shadow-[0_0_12px_rgba(15,194,192,0.6)]" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-fg">
                    {m.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                    {m.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------------- FAQ */}
        <section className="relative py-20 md:py-24">
          <div className="container-x">
            <div className="flex flex-col items-start gap-4">
              <span className="section-label text-brand-teal">{p.faqEyebrow}</span>
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
                    <span className="text-brand-teal transition-transform group-open:rotate-45">
                      <Sparkles size={16} />
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- POWIĄZANE */}
        <section className="relative py-16 md:py-20">
          <div className="container-x">
            <h2 className="font-display text-2xl font-semibold leading-tight tracking-tight md:text-3xl">
              {p.relatedTitle}
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {[
                {
                  href: `/${lang}/contivo/ksiegowosc-ai`,
                  label: p.relatedAiLabel,
                  desc: p.relatedAiDesc,
                },
                {
                  href: `/${lang}/contivo/alternatywa-dla-optima-enova-symfonia`,
                  label: p.relatedAltLabel,
                  desc: p.relatedAltDesc,
                },
              ].map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="group flex items-start justify-between gap-4 rounded-2xl border border-white/[0.06] bg-ink-800/40 p-6 backdrop-blur-xl transition-all hover:border-white/[0.15] hover:-translate-y-1"
                >
                  <div>
                    <h3 className="font-display text-lg font-semibold text-fg">
                      {r.label}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                      {r.desc}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="mt-1 shrink-0 text-fg-subtle transition-colors group-hover:text-brand-teal"
                  />
                </Link>
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
                  <h2 className="font-display text-3xl font-semibold leading-tight md:text-4xl whitespace-pre-line">
                    {p.ctaBannerTitle}
                  </h2>
                  <p className="mt-3 max-w-xl text-fg-muted">{p.ctaBannerBody}</p>
                </div>
                <a
                  href="https://contivo.pl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary shrink-0"
                >
                  {p.ctaBannerButton}
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer dict={dict.footer} />
    </>
  );
}
