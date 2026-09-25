import Link from 'next/link';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import type { Dictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/lib/i18n-config';

/**
 * Sekcje strony głównej pisane pod wyszukiwarki: usługi (linkowanie
 * wewnętrzne do stron lądujących) + FAQ (spójne z danymi FAQPage w JSON-LD).
 * Komponent serwerowy, bez animacji — treść jest w HTML od pierwszego renderu.
 */
export function HomeSeo({ lang, dict }: { lang: Locale; dict: Dictionary['homeSeo'] }) {
  return (
    <>
      <section id="uslugi" className="relative py-24 md:py-32">
        <div className="container-x">
          <span className="badge w-fit">
            <span className="badge-dot" />
            <span>{dict.servicesEyebrow}</span>
          </span>
          <h2 className="mt-4 max-w-3xl font-display text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
            {dict.servicesTitle}
          </h2>
          <p className="mt-4 max-w-2xl text-balance text-lg text-fg-muted">
            {dict.servicesDescription}
          </p>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {dict.services.map((s) => (
              <Link
                key={s.href}
                href={`/${lang}${s.href}`}
                className="group flex flex-col rounded-2xl border border-white/[0.06] bg-ink-800/40 p-7 backdrop-blur-xl transition-colors hover:border-white/[0.15]"
              >
                <h3 className="font-display text-xl font-semibold text-fg">{s.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-fg-muted">{s.body}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm text-fg transition-colors group-hover:text-brand-teal">
                  {s.cta}
                  <ArrowUpRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="relative py-24 md:py-32">
        <div className="container-x max-w-4xl">
          <h2 className="font-display text-balance text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
            {dict.faqTitle}
          </h2>
          <div className="mt-10 grid gap-4">
            {dict.faq.map((f) => (
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
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
