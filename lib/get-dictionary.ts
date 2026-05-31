import 'server-only';
import type { Locale } from './i18n-config';

const dictionaries = {
  pl: () => import('@/dictionaries/pl.json').then((m) => m.default),
  en: () => import('@/dictionaries/en.json').then((m) => m.default),
};

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)['pl']>>;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const loader = dictionaries[locale] ?? dictionaries.pl;
  return loader();
}
