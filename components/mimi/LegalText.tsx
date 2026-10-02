import { Fragment, type ReactNode } from 'react';

/**
 * Zamienia adresy e-mail i adresy stron w zwykłym tekście na odnośniki.
 *
 * Dokumenty prawne Mimi trzymamy jako czysty tekst w słownikach, żeby dało się
 * je tłumaczyć bez dotykania kodu. Apple sprawdza przy recenzji, czy odnośniki
 * w regulaminie i polityce prywatności działają, więc adresy muszą być klikalne,
 * a nie tylko napisane.
 *
 * Domeny ograniczone są do zamkniętej listy końcówek — bez tego wyrażenie łapało
 * skróty w rodzaju „Sp. z o.o." i rwało zdania na pół.
 */
const TOKEN =
  /([\w.+-]+@[\w-]+(?:\.[\w-]+)+)|((?:https?:\/\/)?(?:[a-z0-9-]+\.)+(?:com|pl|org|net|io|me|app|dev)(?:\/[^\s,;)]*)?)/gi;

/** Znaki interpunkcyjne, które przykleiły się do adresu z końca zdania. */
const TRAILING = /[.,;:!?)]+$/;

export function LegalText({ children }: { children: string }) {
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  TOKEN.lastIndex = 0;
  while ((match = TOKEN.exec(children)) !== null) {
    if (match.index > lastIndex) {
      parts.push(children.slice(lastIndex, match.index));
    }

    const [raw, email] = match;

    // „…napisz na hello@codentra.pl." kończy zdanie kropką, a nie domeną.
    // Bez tego odnośnik prowadziłby pod mailto:hello@codentra.pl. — adres
    // z kropką na końcu, którego żaden klient poczty nie rozwiąże.
    const token = raw.replace(TRAILING, '');
    const tail = raw.slice(token.length);

    const href = email
      ? `mailto:${token}`
      : token.startsWith('http')
        ? token
        : `https://${token}`;

    parts.push(
      <a
        key={`${match.index}-${token}`}
        href={href}
        {...(email ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
        className="text-brand-teal underline decoration-brand-teal/30 underline-offset-2 transition-colors hover:decoration-brand-teal"
      >
        {token}
      </a>,
    );
    if (tail) parts.push(tail);

    lastIndex = match.index + raw.length;
  }

  if (lastIndex < children.length) parts.push(children.slice(lastIndex));

  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>{part}</Fragment>
      ))}
    </>
  );
}
