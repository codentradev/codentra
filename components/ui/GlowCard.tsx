'use client';

import { useRef, type ReactNode, type MouseEvent } from 'react';
import clsx from 'clsx';

export function GlowCard({
  children,
  className,
  as: Tag = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'article' | 'section' | 'a';
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <Tag
      ref={ref as never}
      onMouseMove={handleMove}
      className={clsx(
        'group relative overflow-hidden rounded-2xl border border-white/[0.08]',
        'bg-gradient-to-b from-ink-800/60 to-ink-900/60 backdrop-blur-xl',
        'transition-all duration-300 hover:border-white/[0.18]',
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(380px circle at var(--mx) var(--my), rgba(15,194,192,0.18), transparent 50%)',
        }}
      />
      <div className="relative z-10">{children}</div>
    </Tag>
  );
}
