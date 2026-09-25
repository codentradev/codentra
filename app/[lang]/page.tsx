import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { ScrollShowcase } from '@/components/ScrollShowcase';
import { Products } from '@/components/Products';
import { Tech } from '@/components/Tech';
import { Process } from '@/components/Process';
import { HomeSeo } from '@/components/HomeSeo';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/lib/i18n-config';

export default async function Home({
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
  const pageUrl = `https://codentra.pl/${lang}`;

  // Dane strukturalne: firma (Organization + ProfessionalService), serwis i FAQ.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'ProfessionalService'],
        '@id': 'https://codentra.pl/#organization',
        name: 'Codentra',
        legalName: 'Codentra Sp. z o.o.',
        url: 'https://codentra.pl',
        logo: 'https://codentra.pl/logo.png',
        image: 'https://codentra.pl/logo.png',
        description: dict.meta.description,
        email: 'hello@codentra.pl',
        taxID: '9571129766',
        vatID: 'PL9571129766',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Świdnica',
          addressCountry: 'PL',
        },
        areaServed: { '@type': 'Country', name: 'Polska' },
        knowsAbout: dict.homeSeo.knowsAbout,
        brand: { '@type': 'Brand', name: 'Contivo', url: 'https://contivo.pl' },
        makesOffer: dict.homeSeo.services.map((s) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: s.title,
            description: s.body,
            url: `${pageUrl}${s.href}`,
          },
        })),
      },
      {
        // Contivo — produkt Codentra (osobna domena contivo.pl).
        '@type': 'SoftwareApplication',
        '@id': 'https://contivo.pl/#software',
        name: 'Contivo',
        applicationCategory: 'BusinessApplication',
        applicationSubCategory: 'AccountingSoftware',
        operatingSystem: 'Web',
        url: 'https://contivo.pl',
        description: dict.products.contivoDescription,
        publisher: { '@id': 'https://codentra.pl/#organization' },
        subjectOf: { '@type': 'WebPage', url: `${pageUrl}/contivo` },
      },
      {
        '@type': 'WebSite',
        '@id': 'https://codentra.pl/#website',
        name: 'Codentra',
        url: 'https://codentra.pl',
        inLanguage: lang === 'pl' ? 'pl-PL' : 'en',
        publisher: { '@id': 'https://codentra.pl/#organization' },
      },
      {
        '@type': 'FAQPage',
        url: pageUrl,
        mainEntity: dict.homeSeo.faq.map((f) => ({
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
        <Hero lang={lang} dict={dict.hero} />
        <About dict={dict.about} />
        <ScrollShowcase dict={dict.showcase} />
        <Products lang={lang} dict={dict.products} />
        <Tech dict={dict.tech} />
        <Process dict={dict.process} />
        <HomeSeo lang={lang} dict={dict.homeSeo} />
        <Contact dict={dict.contact} />
      </main>
      <Footer lang={lang} dict={dict.footer} />
    </>
  );
}
