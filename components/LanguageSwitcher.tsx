'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Languages } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { i18n, localeNames, type Locale } from '@/lib/i18n-config';

export function LanguageSwitcher({
  lang,
  compact = false,
}: {
  lang: Locale;
  compact?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname() ?? '/';
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const switchTo = (next: Locale) => {
    if (next === lang) {
      setOpen(false);
      return;
    }
    // Persist choice for middleware
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;

    // Replace the first segment of the pathname
    const segments = pathname.split('/');
    if (segments[1] && (i18n.locales as readonly string[]).includes(segments[1])) {
      segments[1] = next;
    } else {
      segments.splice(1, 0, next);
    }
    const target = segments.join('/') || `/${next}`;
    setOpen(false);
    router.push(target);
    router.refresh();
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Language"
        aria-expanded={open}
        className={`inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-fg-muted transition-all hover:border-white/20 hover:bg-white/[0.06] hover:text-fg ${
          compact ? '' : 'min-w-[64px] justify-center'
        }`}
      >
        <Languages size={12} />
        {lang}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+8px)] z-50 min-w-[140px] overflow-hidden rounded-xl border border-white/10 bg-ink-800/95 backdrop-blur-xl shadow-glow-brand"
        >
          {i18n.locales.map((code) => (
            <button
              key={code}
              role="menuitemradio"
              aria-checked={code === lang}
              onClick={() => switchTo(code)}
              className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                code === lang
                  ? 'bg-white/[0.04] text-fg'
                  : 'text-fg-muted hover:bg-white/[0.04] hover:text-fg'
              }`}
            >
              <span>{localeNames[code]}</span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-fg-subtle">
                {code}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
