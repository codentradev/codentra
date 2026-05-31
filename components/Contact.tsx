'use client';

import { motion } from 'framer-motion';
import { useState, type FormEvent } from 'react';
import { Mail, MapPin, Send, Check } from 'lucide-react';
import { AnimatedHeading } from './ui/AnimatedHeading';
import type { Dictionary } from '@/lib/get-dictionary';

export function Contact({ dict }: { dict: Dictionary['contact'] }) {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 800);
  };

  return (
    <section id="kontakt" className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-900/60 backdrop-blur-xl">
          <div aria-hidden className="absolute inset-0 bg-gradient-brand opacity-[0.07]" />
          <div aria-hidden className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand-blue/20 blur-3xl" />
          <div aria-hidden className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-brand-red/15 blur-3xl" />

          <div className="relative grid gap-10 p-8 md:grid-cols-[1fr_1.1fr] md:gap-16 md:p-12 lg:p-16">
            <div className="flex flex-col gap-8">
              <AnimatedHeading
                eyebrow={dict.eyebrow}
                description={dict.description}
              >
                {dict.titlePre}<br />
                <span className="text-gradient">{dict.titleGradient}</span>{dict.titlePost}
              </AnimatedHeading>

              <div className="flex flex-col gap-3 text-sm">
                <a
                  href="mailto:hello@codentra.pl"
                  className="group flex items-center gap-3 text-fg-muted transition-colors hover:text-fg"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-brand-teal group-hover:border-brand-teal/40">
                    <Mail size={15} />
                  </span>
                  hello@codentra.pl
                </a>
                <div className="flex items-center gap-3 text-fg-muted">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-brand-orange">
                    <MapPin size={15} />
                  </span>
                  {dict.operatorCity}
                </div>
              </div>

              <div className="mt-auto rounded-2xl border border-white/[0.06] bg-ink-950/60 p-5 font-mono text-xs leading-relaxed text-fg-muted">
                <div className="text-fg-subtle">{dict.operatorLabel}</div>
                <div className="mt-1 text-fg">{dict.operatorName}</div>
                <div className="text-fg-muted">
                  {dict.operatorTax} <span className="text-fg">{dict.operatorTaxValue}</span>
                </div>
                <div className="text-fg-muted">{dict.operatorCity}</div>
              </div>
            </div>

            <motion.form
              onSubmit={onSubmit}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-4 rounded-2xl border border-white/[0.08] bg-ink-950/60 p-6 backdrop-blur-xl md:p-8"
            >
              <Field
                label={dict.form.name}
                name="name"
                placeholder={dict.form.namePlaceholder}
              />
              <Field
                label={dict.form.email}
                name="email"
                type="email"
                placeholder={dict.form.emailPlaceholder}
              />
              <Field
                label={dict.form.company}
                name="company"
                placeholder={dict.form.companyPlaceholder}
                required={false}
                optionalLabel={dict.form.optional}
              />
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-fg-muted">
                  {dict.form.message}
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder={dict.form.messagePlaceholder}
                  className="resize-none rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-sm text-fg placeholder:text-fg-faint outline-none transition-all focus:border-brand-teal/50 focus:bg-white/[0.04] focus:ring-2 focus:ring-brand-teal/20"
                />
              </div>
              <button
                type="submit"
                disabled={sending || sent}
                className="btn-primary mt-2 disabled:opacity-70"
              >
                {sent ? (
                  <>
                    <Check size={16} />
                    {dict.form.sent}
                  </>
                ) : sending ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink-950/30 border-t-ink-950" />
                    {dict.form.sending}
                  </>
                ) : (
                  <>
                    {dict.form.submit}
                    <Send size={14} />
                  </>
                )}
              </button>
              <p className="text-[11px] text-fg-subtle">{dict.form.privacy}</p>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label, name, type = 'text', placeholder, required = true, optionalLabel,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  optionalLabel?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-mono uppercase tracking-wider text-fg-muted">
        {label}
        {!required && optionalLabel && (
          <span className="ml-1 text-fg-subtle normal-case">{optionalLabel}</span>
        )}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-sm text-fg placeholder:text-fg-faint outline-none transition-all focus:border-brand-teal/50 focus:bg-white/[0.04] focus:ring-2 focus:ring-brand-teal/20"
      />
    </div>
  );
}
