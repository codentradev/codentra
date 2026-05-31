'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Code2 } from 'lucide-react';
import { ParticleField } from './ui/ParticleField';
import type { Dictionary } from '@/lib/get-dictionary';

const CODE_LINES = [
  { p: '$ ',           t: 'codentra ', c: 'text-brand-blue' },
  { p: '',             t: 'init --stack=ai --target=production', c: 'text-fg' },
  { p: '→ ',           t: 'analyzing domain...        ', c: 'text-fg-muted', s: 'OK' },
  { p: '→ ',           t: 'wiring LLM pipelines...    ', c: 'text-fg-muted', s: 'OK' },
  { p: '→ ',           t: 'shipping to production...  ', c: 'text-fg-muted', s: 'OK' },
  { p: '',             t: '',                            c: 'text-fg-muted' },
  { p: '✓ ',           t: 'ready in 4.2s', c: 'text-brand-green' },
];

export function Hero({ dict }: { dict: Dictionary['hero'] }) {
  return (
    <section className="relative overflow-hidden pb-24 pt-44 md:pb-32 md:pt-52">
      <div className="absolute inset-0 grid-bg" aria-hidden />
      <ParticleField className="opacity-70" density={70} />

      <div
        aria-hidden
        className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-brand-blue/15 blur-[120px]"
      />
      <div
        aria-hidden
        className="absolute -right-32 top-1/4 h-[400px] w-[400px] rounded-full bg-brand-red/10 blur-[100px]"
      />

      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div className="flex flex-col gap-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="badge w-fit"
          >
            <Sparkles size={12} className="text-brand-yellow" />
            <span>{dict.badge}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="font-display text-5xl font-semibold leading-[0.95] tracking-tight text-balance md:text-6xl lg:text-7xl"
          >
            {dict.titlePre} <br className="hidden sm:block" />
            <span className="text-gradient-animated">{dict.titleGradient}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-xl text-pretty text-lg text-fg-muted md:text-xl"
          >
            {dict.descriptionPre}
            <a
              href="#produkty"
              className="text-fg underline decoration-brand-teal/60 decoration-2 underline-offset-4 hover:decoration-brand-teal"
            >
              {dict.descriptionLink}
            </a>
            {dict.descriptionPost}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-wrap items-center gap-3"
          >
            <a href="#kontakt" className="btn-primary">
              {dict.ctaPrimary}
              <ArrowRight size={16} />
            </a>
            <a href="#produkty" className="btn-ghost">
              <Code2 size={16} />
              {dict.ctaSecondary}
            </a>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-4 grid max-w-md grid-cols-3 gap-6 border-t border-white/[0.06] pt-6"
          >
            {dict.stats.map((s) => (
              <div key={s.v}>
                <dt className="font-display text-2xl font-semibold text-gradient">
                  {s.k}
                </dt>
                <dd className="mt-1 text-xs text-fg-muted">{s.v}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative"
        >
          <div
            aria-hidden
            className="absolute -inset-6 rounded-3xl bg-gradient-brand opacity-20 blur-2xl"
          />
          <div className="ring-gradient relative rounded-2xl bg-ink-900/90 p-1 shadow-glow-brand">
            <div className="overflow-hidden rounded-[14px] bg-ink-950">
              <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-brand-red/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-brand-yellow/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-brand-green/80" />
                </div>
                <span className="font-mono text-[11px] text-fg-subtle">
                  ~/codentra · zsh
                </span>
                <span className="h-2 w-2" />
              </div>
              <div className="px-5 py-5 font-mono text-[13px] leading-7">
                {CODE_LINES.map((l, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 + i * 0.18 }}
                    className="flex items-center"
                  >
                    <span className="text-fg-subtle">{l.p}</span>
                    <span className={l.c}>{l.t}</span>
                    {l.s && (
                      <span className="ml-auto rounded bg-brand-green/15 px-1.5 py-0.5 text-[10px] text-brand-green">
                        {l.s}
                      </span>
                    )}
                  </motion.div>
                ))}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.5 }}
                  className="inline-block h-4 w-2 translate-y-[3px] bg-brand-teal animate-blink"
                />
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="absolute -bottom-6 -left-6 hidden rounded-xl border border-white/10 bg-ink-800/90 px-4 py-3 backdrop-blur-xl md:block"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <span className="absolute inset-0 animate-ping rounded-full bg-brand-green/40" />
                <span className="relative block h-2.5 w-2.5 rounded-full bg-brand-green" />
              </div>
              <div>
                <div className="text-[11px] text-fg-muted">{dict.deployLabel}</div>
                <div className="font-mono text-xs text-fg">
                  contivo.pl · <span className="text-brand-green">{dict.deployStatus}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
