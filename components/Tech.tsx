'use client';

import { motion } from 'framer-motion';
import { AnimatedHeading } from './ui/AnimatedHeading';
import type { Dictionary } from '@/lib/get-dictionary';

const STACK = [
  { label: 'React 19',      hue: 'text-brand-blue' },
  { label: 'Next.js 15',    hue: 'text-fg' },
  { label: 'TypeScript',    hue: 'text-brand-blue' },
  { label: 'Node.js',       hue: 'text-brand-green' },
  { label: 'PostgreSQL',    hue: 'text-brand-blue' },
  { label: 'Redis',         hue: 'text-brand-red' },
  { label: 'Claude API',    hue: 'text-brand-orange' },
  { label: 'OpenAI',        hue: 'text-brand-green' },
  { label: 'LangGraph',     hue: 'text-brand-teal' },
  { label: 'Vector DB',     hue: 'text-brand-yellow' },
  { label: 'Tailwind',      hue: 'text-brand-teal' },
  { label: 'Framer Motion', hue: 'text-brand-orange' },
  { label: 'Docker',        hue: 'text-brand-blue' },
  { label: 'Kubernetes',    hue: 'text-brand-blue' },
  { label: 'GitHub Actions', hue: 'text-fg' },
  { label: 'Vercel',        hue: 'text-fg' },
  { label: 'Cloudflare',    hue: 'text-brand-orange' },
  { label: 'Render',        hue: 'text-brand-teal' },
];

export function Tech({ dict }: { dict: Dictionary['tech'] }) {
  return (
    <section id="stack" className="relative py-24 md:py-32">
      <div className="container-x">
        <AnimatedHeading
          eyebrow={dict.eyebrow}
          description={dict.description}
        >
          {dict.titlePre} <span className="text-gradient">{dict.titleGradient}</span><br />{dict.titlePost}
        </AnimatedHeading>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div className="grid gap-5">
            {dict.capabilities.map((c, i) => (
              <motion.div
                key={c.n}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group flex gap-5 border-l border-white/[0.08] pl-6 transition-colors hover:border-brand-teal/60"
              >
                <span className="font-mono text-xs text-fg-subtle group-hover:text-brand-teal transition-colors">
                  {c.n}
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-fg">
                    {c.title}
                  </h3>
                  <p className="mt-1 text-sm text-fg-muted">{c.body}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-8 rounded-3xl bg-gradient-brand opacity-[0.08] blur-3xl"
            />
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative flex flex-wrap gap-2 rounded-2xl border border-white/[0.06] bg-ink-900/60 p-6 backdrop-blur-xl"
            >
              {STACK.map((s, i) => (
                <motion.span
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.02 }}
                  className={`rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1.5 font-mono text-xs ${s.hue} hover:bg-white/[0.06] hover:border-white/20 transition-all cursor-default`}
                >
                  {s.label}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
