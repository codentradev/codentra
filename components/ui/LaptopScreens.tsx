'use client';

import { motion } from 'framer-motion';
import { Check, Cpu, FileText, GitBranch, Zap } from 'lucide-react';
import type { Dictionary } from '@/lib/get-dictionary';

type UI = Dictionary['showcase']['ui'];

/** Wysokości słupków — stała tablica, żeby SSR i klient renderowały to samo. */
const BARS = [38, 52, 44, 68, 57, 79, 63, 88, 72, 94, 81, 100];

const KPI = [
  { key: 'revenue' as const, value: '284 120 zł', delta: '+12,4%', hue: 'text-brand-green' },
  { key: 'documents' as const, value: '1 847', delta: '+318', hue: 'text-brand-teal' },
  { key: 'clients' as const, value: '96', delta: '+4', hue: 'text-brand-blue' },
];

const ROWS = [
  { id: 'FV/2026/07/318', client: 'Nordkalk Sp. z o.o.', amount: '12 480,00', done: true },
  { id: 'FV/2026/07/319', client: 'Alt-Bud S.A.', amount: '3 090,50', done: true },
  { id: 'FV/2026/07/320', client: 'Wektor Consulting', amount: '8 745,20', done: false },
];

/** 01 — pulpit biura rachunkowego */
export function DashboardScreen({ ui }: { ui: UI }) {
  return (
    <div className="flex h-full">
      <aside className="hidden w-11 flex-col items-center gap-4 border-r border-white/[0.06] py-4 sm:flex">
        <span className="h-5 w-5 rounded-md bg-gradient-brand" />
        {[FileText, Cpu, GitBranch].map((Icon, i) => (
          <Icon key={i} size={13} className={i === 0 ? 'text-fg' : 'text-fg-subtle'} />
        ))}
      </aside>

      <div className="flex min-w-0 flex-1 flex-col gap-3 p-3 sm:p-4">
        <div className="flex items-center justify-between">
          <span className="font-display text-[11px] font-semibold text-fg sm:text-sm">
            {ui.revenue} · {ui.thisMonth}
          </span>
          <span className="badge !px-2 !py-0.5 !text-[8px] !text-brand-green sm:!text-[10px]">
            <span className="badge-dot !h-1 !w-1" />
            {ui.live}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {KPI.map((k) => (
            <div
              key={k.key}
              className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-2 py-1.5 sm:px-3 sm:py-2"
            >
              <div className="truncate text-[7px] uppercase tracking-wider text-fg-subtle sm:text-[9px]">
                {ui[k.key]}
              </div>
              <div className="mt-0.5 truncate font-display text-[10px] font-semibold text-fg sm:text-[13px]">
                {k.value}
              </div>
              <div className={`text-[7px] sm:text-[9px] ${k.hue}`}>{k.delta}</div>
            </div>
          ))}
        </div>

        <div className="flex min-h-0 flex-1 items-end gap-1 rounded-lg border border-white/[0.06] bg-white/[0.02] p-2 sm:gap-1.5 sm:p-3">
          {BARS.map((h, i) => (
            <motion.span
              key={i}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: [0.21, 0.47, 0.32, 0.98] }}
              style={{ height: `${h}%`, transformOrigin: 'bottom' }}
              className="flex-1 rounded-sm bg-gradient-to-t from-brand-blue/70 via-brand-teal/70 to-brand-green/70"
            />
          ))}
        </div>

        <div className="hidden flex-col gap-1 sm:flex">
          {ROWS.map((r) => (
            <div
              key={r.id}
              className="flex items-center gap-2 rounded-md border border-white/[0.04] bg-white/[0.015] px-2.5 py-1.5"
            >
              <span className="font-mono text-[9px] text-fg-subtle">{r.id}</span>
              <span className="truncate text-[10px] text-fg-muted">{r.client}</span>
              <span className="ml-auto font-mono text-[10px] text-fg">{r.amount}</span>
              <span
                className={`rounded px-1.5 py-0.5 text-[8px] ${
                  r.done
                    ? 'bg-brand-green/15 text-brand-green'
                    : 'bg-brand-yellow/15 text-brand-yellow'
                }`}
              >
                {r.done ? ui.booked : ui.processing}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** 02 — potok AI przetwarzający dokument */
export function PipelineScreen({ ui }: { ui: UI }) {
  const stages = [
    { label: ui.queue, icon: FileText, hue: 'text-brand-blue', ring: 'border-brand-blue/40' },
    { label: ui.extract, icon: Zap, hue: 'text-brand-teal', ring: 'border-brand-teal/40' },
    { label: ui.classify, icon: Cpu, hue: 'text-brand-yellow', ring: 'border-brand-yellow/40' },
    { label: ui.match, icon: GitBranch, hue: 'text-brand-orange', ring: 'border-brand-orange/40' },
    { label: ui.post, icon: Check, hue: 'text-brand-green', ring: 'border-brand-green/40' },
  ];

  return (
    <div className="flex h-full flex-col gap-3 p-3 sm:gap-4 sm:p-5">
      <div className="flex items-center gap-2">
        <span className="font-mono text-[8px] text-fg-subtle sm:text-[10px]">
          pipeline · document-intake
        </span>
        <span className="ml-auto font-mono text-[8px] text-brand-teal sm:text-[10px]">
          1 847 / {ui.thisMonth}
        </span>
      </div>

      <div className="relative flex items-center justify-between gap-1 px-1">
        <div className="absolute left-4 right-4 top-[13px] h-px bg-white/[0.08] sm:top-[17px]" />
        <motion.div
          className="absolute left-4 top-[13px] h-px bg-gradient-to-r from-brand-teal to-transparent sm:top-[17px]"
          initial={{ width: 0 }}
          animate={{ width: ['0%', '88%'] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        {stages.map((s, i) => (
          <div key={s.label} className="relative z-10 flex w-1/5 flex-col items-center gap-1.5">
            <motion.span
              className={`flex h-[26px] w-[26px] items-center justify-center rounded-full border bg-ink-950 sm:h-[34px] sm:w-[34px] ${s.ring}`}
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.42 }}
            >
              <s.icon size={12} className={s.hue} />
            </motion.span>
            <span className="text-center text-[6.5px] leading-tight text-fg-muted sm:text-[9px]">
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <div className="min-h-0 flex-1 rounded-lg border border-white/[0.06] bg-ink-950/60 p-2.5 font-mono text-[8px] leading-relaxed sm:p-3.5 sm:text-[10px]">
        <div className="text-fg-subtle">→ inbox: faktura_nordkalk_07.pdf</div>
        <div className="text-fg-muted">
          → extract: <span className="text-brand-teal">14 pozycji</span> · netto{' '}
          <span className="text-fg">10 146,34</span> · VAT{' '}
          <span className="text-fg">2 333,66</span>
        </div>
        <div className="text-fg-muted">
          → classify: <span className="text-brand-yellow">4-01 Amortyzacja</span> ·{' '}
          <span className="text-brand-yellow">4-02 Zużycie materiałów</span>
        </div>
        <div className="text-fg-muted">
          → match: <span className="text-brand-orange">Nordkalk Sp. z o.o.</span>{' '}
          <span className="text-fg-subtle">(NIP 8971834412)</span>
        </div>
        <div className="mt-1 text-brand-green">✓ posted · 1,8s</div>
      </div>
    </div>
  );
}

/** 03 — wdrożenie na produkcję */
export function DeployScreen({ ui }: { ui: UI }) {
  const steps = [
    { label: ui.build, time: '24s', done: true },
    { label: ui.tests, time: `312 ${ui.passed}`, done: true },
    { label: ui.deploy, time: '41s', done: true },
  ];

  return (
    <div className="flex h-full flex-col gap-3 p-3 sm:gap-4 sm:p-5">
      <div className="flex items-center gap-2">
        <GitBranch size={11} className="text-fg-subtle" />
        <span className="font-mono text-[8px] text-fg-muted sm:text-[10px]">
          main <span className="text-fg-subtle">·</span>{' '}
          <span className="text-brand-teal">66a8412</span>
        </span>
        <span className="badge ml-auto !px-2 !py-0.5 !text-[8px] !text-brand-green sm:!text-[10px]">
          <span className="badge-dot !h-1 !w-1" />
          {ui.live}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {steps.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.12 }}
            className="rounded-lg border border-brand-green/20 bg-brand-green/[0.04] px-2 py-1.5 sm:px-3 sm:py-2"
          >
            <div className="flex items-center gap-1.5">
              <Check size={9} className="shrink-0 text-brand-green" />
              <span className="truncate text-[8px] text-fg sm:text-[10px]">{s.label}</span>
            </div>
            <div className="mt-0.5 truncate font-mono text-[7px] text-fg-subtle sm:text-[9px]">
              {s.time}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="min-h-0 flex-1 rounded-lg border border-white/[0.06] bg-ink-950/60 p-2.5 font-mono text-[8px] leading-relaxed sm:p-3.5 sm:text-[10px]">
        <div className="text-fg-subtle">$ codentra deploy --env=production</div>
        <div className="text-fg-muted">→ building next.js bundle…</div>
        <div className="text-fg-muted">
          → uploading <span className="text-fg">18 assets</span> · edge cache warmed
        </div>
        <div className="text-brand-green">✓ https://contivo.pl · 200 OK · TTFB 87ms</div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          { k: 'p95', v: '112 ms', hue: 'text-brand-teal' },
          { k: 'uptime', v: '99,98%', hue: 'text-brand-green' },
          { k: 'error rate', v: '0,02%', hue: 'text-brand-blue' },
        ].map((m) => (
          <div key={m.k} className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-2 py-1.5">
            <div className="text-[7px] uppercase tracking-wider text-fg-subtle sm:text-[9px]">
              {m.k}
            </div>
            <div className={`font-display text-[10px] font-semibold sm:text-[13px] ${m.hue}`}>
              {m.v}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
