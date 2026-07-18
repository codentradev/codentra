import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { ScrollShowcase } from '@/components/ScrollShowcase';
import { Products } from '@/components/Products';
import { Tech } from '@/components/Tech';
import { Process } from '@/components/Process';
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

  return (
    <>
      <Navigation lang={lang} dict={dict.nav} />
      <main className="relative">
        <Hero dict={dict.hero} />
        <About dict={dict.about} />
        <ScrollShowcase dict={dict.showcase} />
        <Products lang={lang} dict={dict.products} />
        <Tech dict={dict.tech} />
        <Process dict={dict.process} />
        <Contact dict={dict.contact} />
      </main>
      <Footer dict={dict.footer} />
    </>
  );
}
