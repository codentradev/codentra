'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export function AnimatedHeading({
  eyebrow,
  children,
  description,
  align = 'left',
}: {
  eyebrow?: string;
  children: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
}) {
  const alignCls = align === 'center' ? 'text-center items-center' : 'text-left items-start';
  return (
    <div className={`flex flex-col gap-4 ${alignCls}`}>
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
          className="badge"
        >
          <span className="badge-dot" />
          <span>{eyebrow}</span>
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="font-display text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl"
      >
        {children}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl text-balance text-lg text-fg-muted"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
