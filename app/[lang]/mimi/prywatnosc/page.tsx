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
  const p = dict.mimiPrivacy;
  const url = `https://codentra.pl/${lang}/mimi/prywatnosc`;

  return {
    title: p.metaTitle,
    description: p.metaDescription,
    alternates: {
      canonical: url,
      languages: {
        pl: 'https://codentra.pl/pl/mimi/prywatnosc',
        en: 'https://codentra.pl/en/mimi/prywatnosc',
        'x-default': 'https://codentra.pl/mimi/prywatnosc',
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

export default async function MimiPrivacyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = await resolveLang(rawLang);
  const dict = await getDictionary(lang);
  const p = dict.mimiPrivacy;

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
    >
      {/* Tabela uprawnień przed sekcjami — to pierwsze, o co pytają użytkownicy
          i pierwsze, co sprawdza recenzent przy aplikacji z tyloma dostępami. */}
      <div className="mb-12 rounded-2xl border border-white/[0.06] bg-ink-800/40 p-6 backdrop-blur-xl md:p-8">
        <h2 className="font-display text-xl font-semibold text-fg">
          {p.permissionsTitle}
        </h2>
        <p className="mt-3 text-pretty leading-relaxed text-fg-muted">
          {p.permissionsIntro}
        </p>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[460px] border-separate border-spacing-0 text-left text-sm">
            <thead>
              <tr>
                <th className="w-[38%] border-b border-white/[0.08] pb-3 pr-4 font-display text-xs font-semibold uppercase tracking-wider text-fg-subtle">
                  {p.permissionsColName}
                </th>
                <th className="border-b border-white/[0.08] pb-3 font-display text-xs font-semibold uppercase tracking-wider text-fg-subtle">
                  {p.permissionsColUse}
                </th>
              </tr>
            </thead>
            <tbody>
              {p.permissions.map((row) => (
                <tr key={row.name}>
                  <th
                    scope="row"
                    className="border-b border-white/[0.05] py-3 pr-4 text-left align-top font-medium text-fg"
                  >
                    {row.name}
                  </th>
                  <td className="border-b border-white/[0.05] py-3 align-top text-fg-muted">
                    {row.use}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </LegalPage>
  );
}
