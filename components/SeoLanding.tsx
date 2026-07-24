import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Check, Sparkles } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ParticleField } from '@/components/ui/ParticleField';
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/lib/i18n-config';

/** Wspólny kształt treści strony lądującej (contivoAi / contivoAlt). */
export interface LandingContent {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  back: string;
  badge: string;
  h1Pre: string;
  h1Gradient: string;
  h1Post: string;
  lead: string;
  ctaPrimary: string;
  ctaSecondary: string;
  sections: Array<{
    eyebrow?: string;
    title: string;
    body?: string;
    points?: Array<{ t: string; d: string }>;
  }>;
  faqTitle: string;
  faq: Array<{ q: string; a: string }>;
  note?: string;
  ctaBannerTitle: string;
  ctaBannerBody: string;
  ctaBannerButton: string;
}

export async function SeoLanding({
  lang,
  content,
  slug,
}: {
  lang: Locale;
  content: LandingContent;
  slug: string;
}) {
  const dict = await getDictionary(lang);
  const c = content;
  const pageUrl = `https://codentra.pl/${lang}/contivo/${slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        name: c.metaTitle,
        description: c.metaDescription,
        url: pageUrl,
        inLanguage: lang === 'pl' ? 'pl-PL' : 'en',
        isPartOf: { '@type': 'WebSite', name: 'Codentra', url: 'https://codentra.pl' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Codentra', item: `https://codentra.pl/${lang}` },
          { '@type': 'ListItem', position: 2, name: 'Contivo', item: `https://codentra.pl/${lang}/contivo` },
          { '@type': 'ListItem', position: 3, name: c.ogTitle, item: pageUrl },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: c.faq.map((f) => ({
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
        {/* -------------------------------------------------------------- HERO */}
        <section className="relative overflow-hidden pb-16 pt-44 md:pt-52">
          <div className="absolute inset-0 grid-bg" aria-hidden />
          <ParticleField density={45} className="opacity-50" />
          <div
            aria-hidden
            className="absolute left-1/2 top-1/3 h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-brand-teal/15 blur-[120px]"
          />

          <div className="container-x relative max-w-4xl">
            <Link
              href={`/${lang}/contivo`}
              className="mb-8 inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
            >
              <ArrowLeft size={14} />
              {c.back}
            </Link>

            <span className="badge w-fit !text-brand-teal">
              <Sparkles size={12} />
              {c.badge}
            </span>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance md:text-5xl">
              {c.h1Pre ? `${c.h1Pre} ` : ''}
              <span className="text-gradient">{c.h1Gradient}</span>
              {c.h1Post}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-fg-muted">{c.lead}</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href={`/${lang}/contivo`} className="btn-primary">
                {c.ctaPrimary}
                <ArrowUpRight size={16} />
              </Link>
              <a
                href="https://contivo.pl"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                {c.ctaSecondary}
              </a>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- SEKCJE */}
        {c.sections.map((s) => (
          <section key={s.title} className="relative py-14 md:py-16">
            <div className="container-x max-w-4xl">
              {s.eyebrow && (
                <span className="section-label text-brand-teal">{s.eyebrow}</span>
              )}
              <h2 className="mt-3 font-display text-2xl font-semibold leading-tight tracking-tight md:text-3xl">
                {s.title}
              </h2>
              {s.body && (
                <p className="mt-4 max-w-3xl text-pretty leading-relaxed text-fg-muted">
                  {s.body}
                </p>
              )}
              {s.points && (
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {s.points.map((pt) => (
                    <div
                      key={pt.t}
                      className="rounded-2xl border border-white/[0.06] bg-ink-800/40 p-6 backdrop-blur-xl transition-colors hover:border-white/[0.15]"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-green/15 text-brand-green">
                          <Check size={12} strokeWidth={3} />
                        </span>
                        <h3 className="font-display text-base font-semibold text-fg">
                          {pt.t}
                        </h3>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                        {pt.d}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        ))}

        {/* ------------------------------------------------------------- FAQ */}
        <section className="relative py-16 md:py-20">
          <div className="container-x max-w-4xl">
            <h2 className="font-display text-2xl font-semibold leading-tight tracking-tight md:text-3xl">
              {c.faqTitle}
            </h2>
            <div className="mt-8 grid gap-4">
              {c.faq.map((f) => (
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
            {c.note && (
              <p className="mt-6 max-w-3xl text-xs text-fg-subtle">{c.note}</p>
            )}
          </div>
        </section>

        {/* -------------------------------------------------------- CTA BANNER */}
        <section className="relative py-16">
          <div className="container-x">
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-900/60 p-10 backdrop-blur-xl md:p-16">
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-brand opacity-[0.08]"
              />
              <div className="relative flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="font-display text-3xl font-semibold leading-tight md:text-4xl whitespace-pre-line">
                    {c.ctaBannerTitle}
                  </h2>
                  <p className="mt-3 max-w-xl text-fg-muted">{c.ctaBannerBody}</p>
                </div>
                <a
                  href="https://contivo.pl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary shrink-0"
                >
                  {c.ctaBannerButton}
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
