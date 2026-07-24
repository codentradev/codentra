'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Sparkles, Lock } from 'lucide-react';
import { AnimatedHeading } from './ui/AnimatedHeading';
import { GlowCard } from './ui/GlowCard';
import type { Dictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/lib/i18n-config';

export function Products({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary['products'];
}) {
  return (
    <section id="produkty" className="relative py-24 md:py-32">
      <div className="container-x">
        <AnimatedHeading
          eyebrow={dict.eyebrow}
          description={dict.description}
        >
          {dict.titlePre} <span className="text-gradient">{dict.titleGradient}</span>{dict.titlePost}
        </AnimatedHeading>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          <GlowCard className="lg:col-span-2">
            <div className="relative grid gap-8 p-8 md:grid-cols-[1.1fr_1fr] md:p-10">
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <Image
                    src="/contivo-logo.png"
                    alt="Contivo"
                    width={153}
                    height={32}
                    className="h-7 w-auto"
                  />
                  <span className="badge !text-brand-green">
                    <span className="badge-dot" />
                    {dict.contivoStatus}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-semibold leading-tight md:text-3xl">
                  {dict.contivoTitlePre}{' '}
                  <span className="text-gradient">{dict.contivoTitleGradient}</span>
                </h3>
                <p className="text-pretty text-fg-muted">{dict.contivoDescription}</p>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="https://contivo.pl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary !py-2 !px-5 text-sm"
                  >
                    {dict.openContivo}
                    <ArrowUpRight size={14} />
                  </a>
                  <Link href={`/${lang}/contivo`} className="btn-ghost !py-2 !px-5 text-sm">
                    {dict.learnMore}
                  </Link>
                </div>
              </div>

              <ul className="grid grid-cols-1 gap-2 self-center rounded-2xl border border-white/[0.06] bg-ink-950/40 p-5 text-sm">
                {dict.contivoFeatures.map((f, i) => (
                  <motion.li
                    key={f}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="flex items-center gap-2.5 font-mono text-xs text-fg-muted"
                  >
                    <span className="text-brand-teal">▸</span>
                    {f}
                  </motion.li>
                ))}
              </ul>
            </div>
          </GlowCard>

          <GlowCard>
            <div className="flex h-full flex-col gap-4 p-8">
              <div className="flex items-center justify-between">
                <span className="badge">
                  <Sparkles size={12} className="text-brand-yellow" />
                  {dict.comingSoonBadge}
                </span>
                <Lock size={14} className="text-fg-subtle" />
              </div>
              <h3 className="font-display text-xl font-semibold leading-tight">
                {dict.comingSoonTitle}
              </h3>
              <p className="text-sm text-fg-muted">{dict.comingSoonBody}</p>
              <div className="mt-auto pt-4">
                <div className="rounded-xl border border-dashed border-white/10 bg-white/[0.02] p-4 text-center">
                  <div className="font-mono text-xs text-fg-subtle">
                    {dict.classifiedLabel}
                  </div>
                  <div className="mt-1 text-xs text-fg-muted">
                    {dict.classifiedNote}
                  </div>
                </div>
              </div>
            </div>
          </GlowCard>
        </div>
      </div>
    </section>
  );
}
