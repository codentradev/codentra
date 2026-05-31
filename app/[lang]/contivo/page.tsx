import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ParticleField } from '@/components/ui/ParticleField';
import { GlowCard } from '@/components/ui/GlowCard';
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/lib/i18n-config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const { i18n } = await import('@/lib/i18n-config');
  const lang = (i18n.locales as readonly string[]).includes(rawLang)
    ? (rawLang as Locale)
    : i18n.defaultLocale;
  const dict = await getDictionary(lang);
  return {
    title: dict.contivoPage.metaTitle,
    description: dict.contivoPage.metaDescription,
  };
}

export default async function ContivoPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const { i18n } = await import('@/lib/i18n-config');
  const lang = (i18n.locales as readonly string[]).includes(rawLang)
    ? (rawLang as Locale)
    : i18n.defaultLocale;
  const dict = await getDictionary(lang);
  const p = dict.contivoPage;

  return (
    <>
      <Navigation lang={lang} dict={dict.nav} />

      <main className="relative">
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
                  alt="Contivo"
                  width={200}
                  height={52}
                  priority
                  className="h-10 w-auto"
                />
                <h1 className="font-display text-5xl font-semibold leading-[0.95] tracking-tight text-balance md:text-6xl">
                  {p.titlePre}{' '}
                  <span className="text-gradient">{p.titleGradient}</span>
                  {p.titlePost}
                </h1>
                <p className="max-w-xl text-lg text-fg-muted">{p.description}</p>
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
                  <h3 className="font-display text-lg font-semibold text-fg">
                    {p.highlightsTitle}
                  </h3>
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

        <section className="relative py-24">
          <div className="container-x">
            <div className="flex flex-col items-start gap-4">
              <span className="badge">
                <span className="badge-dot" /> {p.modulesEyebrow}
              </span>
              <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
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

        <section className="relative py-20">
          <div className="container-x">
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-900/60 p-10 backdrop-blur-xl md:p-16">
              <div aria-hidden className="absolute inset-0 bg-gradient-brand opacity-[0.08]" />
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
