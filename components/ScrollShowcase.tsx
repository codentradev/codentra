'use client';

import { useRef, type ReactNode } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import {
  DashboardScreen,
  DeployScreen,
  PipelineScreen,
} from './ui/LaptopScreens';
import type { Dictionary } from '@/lib/get-dictionary';

/**
 * Okna postępu scrolla (0–1 długości sekcji) dla kolejnych ekranów laptopa.
 * Klapa otwiera się w zakresie 0 → LID_OPEN, potem lecą ekrany.
 */
const LID_OPEN = 0.34;
const WINDOWS: Array<[number, number]> = [
  [0.40, 0.60],
  [0.62, 0.78],
  [0.80, 1.00],
];
/** Połowa przerwy między oknami — przenikanie mieści się dokładnie w luce. */
const FADE = 0.01;

/** Warstwa ekranu — sama liczy swoje opacity/y, żeby nie wołać hooków w pętli. */
function ScreenLayer({
  progress,
  from,
  to,
  children,
}: {
  progress: MotionValue<number>;
  from: number;
  to: number;
  children: ReactNode;
}) {
  // Wygaszanie musi zmieścić się w 0.02 przerwy między oknami — przy szerszym
  // zakresie dwa mockupy nakładają się na siebie i dają zjawę.
  const fade = FADE;
  const opacity = useTransform(
    progress,
    [from - fade, from, to, to + fade],
    [0, 1, 1, 0],
  );
  const y = useTransform(progress, [from - fade, from, to, to + fade], [8, 0, 0, -8]);

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 bg-ink-950">
      {children}
    </motion.div>
  );
}

/** Podpis pod laptopem, zsynchronizowany z aktywnym ekranem. */
function Caption({
  progress,
  from,
  to,
  screen,
}: {
  progress: MotionValue<number>;
  from: number;
  to: number;
  screen: Dictionary['showcase']['screens'][number];
}) {
  const fade = FADE;
  const opacity = useTransform(
    progress,
    [from - fade, from, to, to + fade],
    [0, 1, 1, 0],
  );
  const y = useTransform(progress, [from - fade, from, to, to + fade], [12, 0, 0, -12]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-x-0 top-0 mx-auto max-w-2xl px-6 text-center"
    >
      <div className="section-label !text-[10px] text-brand-teal">{screen.tag}</div>
      <h3 className="mt-2 font-display text-lg font-semibold text-fg sm:text-2xl">
        {screen.title}
      </h3>
      <p className="mx-auto mt-2 hidden max-w-xl text-pretty text-sm text-fg-muted sm:block">
        {screen.body}
      </p>
    </motion.div>
  );
}

export function ScrollShowcase({ dict }: { dict: Dictionary['showcase'] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 32,
    mass: 0.35,
  });

  const p = smooth;

  const lidAngle = useTransform(p, [0, LID_OPEN], [-88, 0], { clamp: true });
  const rigScale = useTransform(p, [0, LID_OPEN, 1], [0.86, 1, 1.02]);
  // Klapa obraca się wokół dolnej krawędzi, więc zamknięty laptop „osiada”
  // na dole pudełka layoutu — podnosimy go, żeby stał na środku kadru.
  const rigY = useTransform(p, [0, LID_OPEN], ['-32%', '0%'], { clamp: true });
  const screenOn = useTransform(p, [LID_OPEN * 0.62, LID_OPEN], [0, 1], { clamp: true });
  const glow = useTransform(p, [LID_OPEN * 0.62, LID_OPEN], [0, 1], { clamp: true });
  const headOpacity = useTransform(p, [0, 0.06, 0.2], [1, 1, 0], { clamp: true });
  const headY = useTransform(p, [0, 0.2], [0, -24], { clamp: true });
  const hintOpacity = useTransform(p, [0, 0.05], [1, 0], { clamp: true });

  const screens = [DashboardScreen, PipelineScreen, DeployScreen];

  // Przy prefers-reduced-motion nie ma sensu przypinać sceny do scrolla: bez
  // animacji użytkownik utknąłby na jednym ekranie i kilku ekranach pustego
  // przewijania. Pokazujemy wszystkie trzy widoki statycznie, jeden pod drugim.
  if (reduce) {
    return (
      <section id="w-akcji" className="relative py-24 md:py-32">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <div className="section-label">{dict.eyebrow}</div>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
              {dict.titlePre}{' '}
              <span className="text-gradient">{dict.titleGradient}</span>
              {dict.titlePost}
            </h2>
          </div>

          <div className="mt-16 grid gap-14">
            {dict.screens.map((s, i) => {
              const Screen = screens[i];
              return (
                <figure key={s.tag} className="mx-auto w-full max-w-3xl">
                  <div
                    aria-hidden
                    className="ring-gradient rounded-2xl bg-ink-800 p-[6px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] sm:p-[9px]"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-ink-950">
                      {Screen ? <Screen ui={dict.ui} /> : null}
                    </div>
                  </div>
                  <figcaption className="mt-5 text-center">
                    <div className="section-label !text-[10px] text-brand-teal">
                      {s.tag}
                    </div>
                    <h3 className="mt-2 font-display text-lg font-semibold text-fg sm:text-2xl">
                      {s.title}
                    </h3>
                    <p className="mx-auto mt-2 max-w-xl text-pretty text-sm text-fg-muted">
                      {s.body}
                    </p>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="w-akcji" ref={trackRef} className="relative h-[300vh] md:h-[420vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-grid-faint opacity-20"
          style={{ backgroundSize: '60px 60px' }}
        />

        {/* Nagłówek sekcji — znika, gdy klapa się otwiera */}
        <motion.div
          style={{ opacity: headOpacity, y: headY }}
          className="absolute inset-x-0 top-[14vh] z-20 px-6 text-center"
        >
          <div className="section-label">{dict.eyebrow}</div>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
            {dict.titlePre}{' '}
            <span className="text-gradient">{dict.titleGradient}</span>
            {dict.titlePost}
          </h2>
          <motion.div
            style={{ opacity: hintOpacity }}
            className="mt-6 inline-flex items-center gap-2 font-mono text-xs text-fg-subtle"
          >
            {dict.hint}
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            >
              <ChevronDown size={14} />
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Laptop */}
        <motion.div
          style={{
            scale: rigScale,
            y: rigY,
            // Laptop skalowany także wysokością okna, żeby razem z podpisami
            // mieścił się w kadrze na niskich ekranach.
            width: 'min(88vw, 760px, max(300px, calc((100vh - 300px) * 1.6)))',
          }}
          className="relative z-10 mt-[6vh]"
        >
          <div style={{ perspective: 2200 }} aria-hidden>
            {/* Klapa z ekranem */}
            <motion.div
              style={{
                rotateX: lidAngle,
                transformOrigin: '50% 100%',
                transformStyle: 'preserve-3d',
              }}
              className="relative"
            >
              <motion.div
                style={{ opacity: glow }}
                aria-hidden
                className="absolute -inset-4 rounded-[32px] bg-gradient-brand opacity-[0.10] blur-2xl"
              />

              {/* Obudowa klapy */}
              <div className="ring-gradient relative rounded-t-2xl rounded-b-md bg-ink-800 p-[6px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] sm:p-[9px]">
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-ink-950">
                  {/* Zawartość ekranu — zapala się dopiero przy otwieraniu */}
                  <motion.div style={{ opacity: screenOn }} className="absolute inset-0">
                    {screens.map((Screen, i) => (
                      <ScreenLayer
                        key={i}
                        progress={p}
                        from={WINDOWS[i][0]}
                        to={WINDOWS[i][1]}
                      >
                        <Screen ui={dict.ui} />
                      </ScreenLayer>
                    ))}
                  </motion.div>

                  {/* Refleks na szkle */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.07] via-transparent to-transparent"
                  />
                </div>

                {/* Światło na górnej krawędzi — dzięki niemu zamknięty laptop
                    czyta się jako obiekt, a nie ciemna plama */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
                />

                {/* Kamerka */}
                <span
                  aria-hidden
                  className="absolute left-1/2 top-[3px] h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-white/20 sm:top-[4px]"
                />
              </div>
            </motion.div>

            {/* Podstawa z klawiaturą */}
            <div className="relative mx-auto -mt-[2px] w-[104%] -translate-x-[2%]">
              <div
                className="h-[10px] rounded-b-lg border-x border-b border-white/[0.06] bg-gradient-to-b from-ink-700 to-ink-800 sm:h-[15px]"
                style={{ clipPath: 'polygon(1.2% 0, 98.8% 0, 100% 100%, 0 100%)' }}
              >
                <span className="mx-auto block h-[3px] w-[12%] translate-y-[1px] rounded-b-md bg-ink-900/80" />
              </div>
              {/* Cień rzucany na blat */}
              <div
                aria-hidden
                className="mx-auto mt-3 h-8 w-[80%] rounded-[50%] bg-black/60 blur-2xl"
              />
            </div>
          </div>
        </motion.div>

        {/* Podpisy ekranów */}
        <div className="absolute inset-x-0 bottom-[7vh] z-20 h-28">
          {dict.screens.slice(0, WINDOWS.length).map((s, i) => (
            <Caption
              key={s.tag}
              progress={p}
              from={WINDOWS[i][0]}
              to={WINDOWS[i][1]}
              screen={s}
            />
          ))}
        </div>

        {/* Wskaźnik postępu */}
        <div className="absolute bottom-[3vh] left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
          {WINDOWS.map(([from, to], i) => (
            <Dot key={i} progress={p} from={from} to={to} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Dot({
  progress,
  from,
  to,
}: {
  progress: MotionValue<number>;
  from: number;
  to: number;
}) {
  const opacity = useTransform(
    progress,
    [from - 0.05, from, to, to + 0.05],
    [0.25, 1, 1, 0.25],
  );
  const width = useTransform(progress, [from - 0.05, from, to, to + 0.05], [6, 22, 22, 6]);

  return (
    <motion.span
      style={{ opacity, width }}
      className="h-1.5 rounded-full bg-gradient-brand"
    />
  );
}
