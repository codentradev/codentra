'use client';

import { motion } from 'framer-motion';
import { AnimatedHeading } from './ui/AnimatedHeading';
import { Brain, Rocket, Layers, ShieldCheck } from 'lucide-react';
import type { Dictionary } from '@/lib/get-dictionary';

const ICONS = [Brain, Rocket, Layers, ShieldCheck] as const;
const ACCENTS = ['text-brand-blue', 'text-brand-teal', 'text-brand-orange', 'text-brand-red'] as const;

export function About({ dict }: { dict: Dictionary['about'] }) {
  return (
    <section id="o-nas" className="relative py-24 md:py-32">
      <div className="container-x grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <AnimatedHeading
          eyebrow={dict.eyebrow}
          description={dict.description}
        >
          {dict.titlePre} <span className="text-gradient">{dict.titleGradient}</span>{dict.titlePost}
        </AnimatedHeading>

        <div className="grid gap-5 sm:grid-cols-2">
          {dict.principles.map((p, i) => {
            const Icon = ICONS[i] ?? Brain;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-ink-800/40 p-6 backdrop-blur-xl hover-lift hover:border-white/[0.15]"
              >
                <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] ${ACCENTS[i] ?? ''}`}>
                  <Icon size={20} />
                </div>
                <h3 className="font-display text-lg font-semibold text-fg">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                  {p.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
