'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';
import type { Dictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/lib/i18n-config';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Navigation({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary['nav'];
}) {
  const { scrollYProgress } = useScroll();
  const readProgress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 30,
    mass: 0.3,
  });

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const links = [
    { href: '#o-nas',    label: dict.about },
    { href: '#produkty', label: dict.products },
    { href: '#stack',    label: dict.stack },
    { href: '#proces',   label: dict.process },
    { href: '#kontakt',  label: dict.contact },
  ];

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  return (
    <header
      className={clsx(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled
          ? 'border-b border-white/[0.06] bg-ink-950/70 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      {/* Pasek postępu czytania — rośnie wraz z przewijaniem strony */}
      <motion.div
        aria-hidden
        style={{ scaleX: readProgress }}
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-brand"
      />

      <nav className="container-x flex h-32 items-center justify-between md:h-40">
        <Link href={`/${lang}`} className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="Codentra"
            width={620}
            height={120}
            priority
            className="h-11 w-auto md:h-16"
          />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-4 py-2 text-sm text-fg-muted transition-colors hover:text-fg"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher lang={lang} />
          <a href="#kontakt" className="btn-primary !py-2 !px-5 text-sm">
            {dict.cta}
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher lang={lang} compact />
          <button
            aria-label={dict.menu}
            className="rounded-lg p-2 text-fg-muted hover:bg-white/5"
            onClick={() => setOpen(v => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-white/[0.06] bg-ink-950/95 backdrop-blur-xl md:hidden">
          <ul className="container-x flex flex-col py-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  onClick={() => setOpen(false)}
                  href={l.href}
                  className="block py-3 text-sm text-fg-muted hover:text-fg"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a onClick={() => setOpen(false)} href="#kontakt" className="btn-primary w-full !py-2">
                {dict.cta}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
