import type { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { LegalText } from './LegalText';
import type { Dictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/lib/i18n-config';

export type LegalSection = {
  h: string;
  body: string[];
  list: string[];
};

/**
 * Wspólny układ dokumentów aplikacji Mimi (polityka prywatności, warunki).
 *
 * Dokumenty są czytane nie tylko przez użytkowników, ale i przez recenzenta App
 * Review, który sprawdza, czy adres w App Store Connect prowadzi do działającej,
 * publicznie dostępnej strony. Stąd zwykły, wysoki kontrast i brak animacji —
 * ma się dać przeczytać, a nie zrobić wrażenie.
 */
export function LegalPage({
  lang,
  dict,
  backHref,
  back,
  eyebrow,
  title,
  updated,
  lead,
  sections,
  children,
}: {
  lang: Locale;
  dict: Dictionary;
  backHref: string;
  back: string;
  eyebrow: string;
  title: string;
  updated: string;
  lead: string;
  sections: readonly LegalSection[];
  children?: ReactNode;
}) {
  return (
    <>
      <Navigation lang={lang} dict={dict.nav} />

      <main className="relative">
        <section className="relative overflow-hidden pb-12 pt-40 md:pt-48">
          <div className="absolute inset-0 grid-bg opacity-60" aria-hidden />
          <div
            aria-hidden
            className="absolute left-1/2 top-0 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-brand-blue/10 blur-[120px]"
          />

          <div className="container-x relative max-w-3xl">
            <Link
              href={backHref}
              className="mb-8 inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
            >
              <ArrowLeft size={14} />
              {back}
            </Link>

            <div className="flex items-center gap-4">
              <Image
                src="/mimi-icon.png"
                alt="Mimi"
                width={56}
                height={56}
                className="h-12 w-12 rounded-2xl ring-1 ring-white/10"
              />
              <span className="section-label text-brand-teal">{eyebrow}</span>
            </div>

            <h1 className="mt-6 font-display text-3xl font-semibold leading-tight tracking-tight text-balance md:text-4xl">
              {title}
            </h1>

            {updated ? (
              <p className="mt-3 font-mono text-xs text-fg-subtle">{updated}</p>
            ) : null}

            <p className="mt-6 text-pretty text-lg leading-relaxed text-fg-muted">
              <LegalText>{lead}</LegalText>
            </p>
          </div>
        </section>

        <section className="relative pb-24">
          <div className="container-x max-w-3xl">
            {children}

            <div className="flex flex-col gap-10">
              {sections.map((s) => (
                <section key={s.h}>
                  <h2 className="font-display text-xl font-semibold leading-snug text-fg">
                    {s.h}
                  </h2>

                  {s.body.map((p) => (
                    <p
                      key={p}
                      className="mt-3 text-pretty leading-relaxed text-fg-muted"
                    >
                      <LegalText>{p}</LegalText>
                    </p>
                  ))}

                  {s.list.length > 0 ? (
                    <ul className="mt-4 flex flex-col gap-2.5">
                      {s.list.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-pretty leading-relaxed text-fg-muted"
                        >
                          <span
                            aria-hidden
                            className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal/70"
                          />
                          <span>
                            <LegalText>{item}</LegalText>
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} dict={dict.footer} />
    </>
  );
}
