import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n, type Locale } from './lib/i18n-config';

function getLocale(request: NextRequest): Locale {
  // 1. Cookie wins (explicit choice from LanguageSwitcher)
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value as Locale | undefined;
  if (cookieLocale && (i18n.locales as readonly string[]).includes(cookieLocale)) {
    return cookieLocale;
  }

  // 2. Accept-Language header — match first preferred locale we support
  const accept = request.headers.get('accept-language') ?? '';
  const preferred = accept
    .split(',')
    .map((part) => part.trim().split(';')[0].toLowerCase().split('-')[0]);

  for (const code of preferred) {
    if ((i18n.locales as readonly string[]).includes(code)) {
      return code as Locale;
    }
  }

  // 3. Fallback
  return i18n.defaultLocale;
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
  return NextResponse.redirect(url);
}

export const config = {
  // Run on all paths except static assets / API
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)',
  ],
};
