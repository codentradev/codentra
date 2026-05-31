'use client';

import { motion } from 'framer-motion';
import { AnimatedHeading } from './ui/AnimatedHeading';
import type { Dictionary } from '@/lib/get-dictionary';

const ACCENTS = [
  { accent: 'from-brand-blue/30 to-brand-teal/20',    dot: 'bg-brand-blue' },
  { accent: 'from-brand-teal/30 to-brand-green/20',   dot: 'bg-brand-teal' },
  { accent: 'from-brand-green/30 to-brand-yellow/20', dot: 'bg-brand-green' },
  { accent: 'from-brand-orange/30 to-brand-red/20',   dot: 'bg-brand-orange' },
] as const;

export function Process({ dict }: { dict: Dictionary['process'] }) {
  return (
    <section id="proces" className="relative py-24 md:py-32">
      <div
        aria-hidden
        className="absolute inset-0 bg-grid-faint opacity-30"
        style={{ backgroundSize: '60px 60px' }}
      />
      <div className="container-x relative">
        <AnimatedHeading
          align="center"
          eyebrow={dict.eyebrow}
          description={dict.description}
        >
          {dict.titlePre} <span className="text-gradient">{dict.titleGradient}</span>{dict.titlePost}
        </AnimatedHeading>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {dict.steps.map((s, i) => {
            const a = ACCENTS[i] ?? ACCENTS[0];
            return (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative"
              >
                <div className={`absolute -inset-px rounded-2xl bg-gradient-to-b ${a.accent} opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100`} />
                <div className="relative h-full rounded-2xl border border-white/[0.06] bg-ink-800/40 p-6 backdrop-blur-xl">
                  <div className="mb-4 flex items-center gap-2">
                    <span className={`h-1.5 w-1.5 rounded-full ${a.dot}`} />
                    <span className="font-mono text-xs text-fg-subtle">{s.n}</span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-fg">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                    {s.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
