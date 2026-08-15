import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n, type Locale } from './lib/i18n-config';

/**
 * Kraje obsługiwane po polsku. Wejście z każdego innego kraju trafia na wersję
 * angielską — nawet gdy przeglądarka gościa deklaruje polski.
 */
const PL_COUNTRIES = new Set(['PL']);

/**
 * Nagłówki z krajem klienta, w kolejności zaufania. Produkcja stoi za
 * Cloudflare (`cf-ipcountry`); pozostałe to zapasy na wypadek zmiany hostingu
 * i wygoda w testach.
 */
const COUNTRY_HEADERS = ['cf-ipcountry', 'x-vercel-ip-country', 'x-geo-country'] as const;

/** Wartości, którymi Cloudflare oznacza „nie wiem”: nieznany kraj i Tor. */
const UNKNOWN_COUNTRIES = new Set(['XX', 'T1']);

function getCountry(request: NextRequest): string | null {
  for (const header of COUNTRY_HEADERS) {
    const value = request.headers.get(header)?.trim().toUpperCase();
    if (value && value.length === 2 && !UNKNOWN_COUNTRIES.has(value)) return value;
  }
  return null;
}

function fromAcceptLanguage(request: NextRequest): Locale | null {
  const accept = request.headers.get('accept-language') ?? '';
  const preferred = accept
    .split(',')
    .map((part) => part.trim().split(';')[0].toLowerCase().split('-')[0]);

  for (const code of preferred) {
    if ((i18n.locales as readonly string[]).includes(code)) {
      return code as Locale;
    }
  }
  return null;
}

function getLocale(request: NextRequest): Locale {
  // 1. Cookie wygrywa — świadomy wybór z przełącznika języka.
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value as Locale | undefined;
  if (cookieLocale && (i18n.locales as readonly string[]).includes(cookieLocale)) {
    return cookieLocale;
  }

  // 2. Kraj z IP: Polska → polski, reszta świata → angielski.
  const country = getCountry(request);
  if (country) {
    return PL_COUNTRIES.has(country) ? 'pl' : 'en';
  }

  // 3. Bez geolokalizacji (dev, brak nagłówka CF) — język przeglądarki.
  return fromAcceptLanguage(request) ?? i18n.defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (pathnameHasLocale) return;

  const locale = getLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  const response = NextResponse.redirect(url);

  // Przekierowanie zależy od gościa (kraj, cookie, język przeglądarki), więc
  // nie może wylądować we wspólnym cache Cloudflare — inaczej pierwszy gość
  // z zagranicy przypiąłby /en wszystkim następnym.
  response.headers.set('Cache-Control', 'no-store, must-revalidate');
  response.headers.set('Vary', 'Accept-Language, Cookie, CF-IPCountry');
  return response;
}

export const config = {
  // Run on all paths except static assets / API
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)',
  ],
};
