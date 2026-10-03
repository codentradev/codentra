// Codzienny test dostępności stron dla Google (uruchamiany z GitHub Actions).
//
// Sprawdza, czy codentra.pl i contivo.pl:
//   - nie blokują Googlebota w robots.txt (Disallow: / dla * lub Googlebot),
//   - odpowiadają 200 na kluczowych stronach (bez błędów 5xx),
//   - nie mają noindex (nagłówek X-Robots-Tag ani <meta name="robots">),
//   - serwują sitemapę.
//
// Po incydencie z 25.09.2026, gdy Google przez kilka dni dostawał
// `Disallow: /`, choć kod strony nigdy go nie zawierał.
// Każdy błąd jest ponawiany, żeby pojedyncza czkawka sieci nie robiła alarmu.

const UA = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';
const RETRIES = 3;
const RETRY_DELAY_MS = 20_000;

const SITES = [
  {
    origin: 'https://codentra.pl',
    pages: ['/pl', '/en', '/pl/contivo', '/pl/oprogramowanie-dedykowane', '/pl/wdrozenia-ai'],
  },
  {
    origin: 'https://contivo.pl',
    pages: ['/'],
  },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function get(url) {
  const res = await fetch(url, {
    headers: { 'user-agent': UA },
    redirect: 'follow',
    signal: AbortSignal.timeout(30_000),
  });
  return { status: res.status, headers: res.headers, body: await res.text(), url: res.url };
}

/** Zwraca opis problemu albo null, jeśli robots.txt blokuje całą stronę dla Google. */
function robotsBlocksGoogle(text) {
  // Grupy: kolejne linie User-agent, potem reguły — wg specyfikacji robots.txt.
  const groups = [];
  let current = null;
  let lastWasAgent = false;
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.replace(/#.*/, '').trim();
    if (!line) continue;
    const [key, ...rest] = line.split(':');
    const field = key.trim().toLowerCase();
    const value = rest.join(':').trim();
    if (field === 'user-agent') {
      if (!lastWasAgent) groups.push((current = { agents: [], rules: [] }));
      current.agents.push(value.toLowerCase());
      lastWasAgent = true;
    } else {
      lastWasAgent = false;
      if (current && (field === 'allow' || field === 'disallow')) {
        current.rules.push({ field, value });
      }
    }
  }

  // Googlebot stosuje grupę „googlebot", a gdy jej nie ma — grupę „*".
  const forGoogle = groups.filter((g) => g.agents.includes('googlebot'));
  const applicable = forGoogle.length ? forGoogle : groups.filter((g) => g.agents.includes('*'));
  for (const g of applicable) {
    const blocksRoot = g.rules.some((r) => r.field === 'disallow' && (r.value === '/' || r.value === '/*'));
    const allowsRoot = g.rules.some((r) => r.field === 'allow' && (r.value === '/' || r.value === '/*'));
    if (blocksRoot && !allowsRoot) {
      return `robots.txt blokuje całą stronę dla Googlebota (grupa: ${g.agents.join(', ')})`;
    }
  }
  return null;
}

async function checkSite({ origin, pages }) {
  const problems = [];

  const robots = await get(`${origin}/robots.txt`);
  if (robots.status >= 500) {
    problems.push(`robots.txt: błąd serwera ${robots.status} (Google wstrzymuje wtedy skanowanie)`);
  } else if (robots.status === 200) {
    const blocked = robotsBlocksGoogle(robots.body);
    if (blocked) problems.push(blocked);
  }

  const sitemap = await get(`${origin}/sitemap.xml`);
  if (sitemap.status !== 200 || !sitemap.body.includes('<url')) {
    problems.push(`sitemap.xml: status ${sitemap.status} lub brak adresów`);
  }

  for (const path of pages) {
    const page = await get(`${origin}${path}`);
    if (page.status !== 200) {
      problems.push(`${path}: status ${page.status}`);
      continue;
    }
    if (/noindex/i.test(page.headers.get('x-robots-tag') ?? '')) {
      problems.push(`${path}: nagłówek X-Robots-Tag zawiera noindex`);
    }
    const meta = page.body.match(/<meta[^>]+name=["'](?:robots|googlebot)["'][^>]*>/gi) ?? [];
    if (meta.some((m) => /noindex/i.test(m))) {
      problems.push(`${path}: <meta robots> zawiera noindex`);
    }
  }

  return problems;
}

let failed = false;
for (const site of SITES) {
  let problems = [];
  for (let attempt = 1; attempt <= RETRIES; attempt++) {
    try {
      problems = await checkSite(site);
    } catch (err) {
      problems = [`błąd połączenia: ${err.message}`];
    }
    if (!problems.length) break;
    if (attempt < RETRIES) {
      console.log(`${site.origin}: próba ${attempt} nieudana (${problems.join('; ')}), ponawiam…`);
      await sleep(RETRY_DELAY_MS);
    }
  }

  if (problems.length) {
    failed = true;
    console.log(`::error title=${site.origin} niedostępna dla Google::${problems.join(' | ')}`);
  } else {
    console.log(`✓ ${site.origin}: OK`);
  }
}

process.exit(failed ? 1 : 0);
