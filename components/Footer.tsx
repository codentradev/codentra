import Image from 'next/image';
import Link from 'next/link';
import type { Dictionary } from '@/lib/get-dictionary';

export function Footer({ dict }: { dict: Dictionary['footer'] }) {
  return (
    <footer className="relative border-t border-white/[0.06]">
      <div className="container-x grid gap-10 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <Link href="/" aria-label="Codentra" className="w-fit">
            <Image
              src="/logo.png"
              alt="Codentra"
              width={520}
              height={100}
              className="h-10 w-auto"
            />
          </Link>
          <p className="max-w-xs text-sm text-fg-muted">{dict.description}</p>
        </div>

        <FooterCol
          title={dict.colProducts}
          links={[
            { label: dict.links.contivo,     href: 'https://contivo.pl' },
            { label: dict.links.nextProject, href: '#produkty' },
          ]}
        />
        <FooterCol
          title={dict.colCompany}
          links={[
            { label: dict.links.about,   href: '#o-nas' },
            { label: dict.links.stack,   href: '#stack' },
            { label: dict.links.process, href: '#proces' },
            { label: dict.links.contact, href: '#kontakt' },
          ]}
        />
        <FooterCol
          title={dict.colOperator}
          links={[
            { label: dict.links.operatorName, href: '#kontakt' },
            { label: dict.links.operatorTax,  href: '#kontakt' },
            { label: dict.links.operatorCity, href: '#kontakt' },
          ]}
        />
      </div>

      <div className="border-t border-white/[0.04]">
        <div className="container-x flex flex-col items-start justify-between gap-3 py-6 text-xs text-fg-muted md:flex-row md:items-center">
          <div>
            © {new Date().getFullYear()} {dict.links.operatorName} {dict.copyright}
          </div>
          <div className="font-mono text-fg-subtle">{dict.tagline}</div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title, links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-xs font-mono uppercase tracking-widest text-fg-subtle">
        {title}
      </h4>
      <ul className="flex flex-col gap-2 text-sm">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="text-fg-muted transition-colors hover:text-fg"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
