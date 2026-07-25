/* ============================================================
   HERO — scroll-driven cloud ascent.
   A tall section with a sticky stage. Four stacked frames
   crossfade and push as you scroll, so the page reads as a
   climb from under the storm deck to the edge of the atmosphere.
   ============================================================ */

const HERO_FRAMES = [
  { src: 'assets/hero/01-below.png',           alt: 'Beneath a heavy overcast cloud deck',        kicker: 'Ground level',     line: 'Most businesses run under the deck.',         ft: 0 },
  { src: 'assets/hero/02-through.png',         alt: 'Breaking through a towering wall of cloud',  kicker: 'Breaking through', line: 'We build the systems that punch through it.', ft: 12000 },
  { src: 'assets/hero/03-above.png',           alt: 'Above an endless sea of cloud tops',         kicker: 'Clear air',        line: 'This is where we work.',                      ft: 34000 },
  { src: 'assets/hero/05-dept-web.png',        alt: 'The web building floor of the sky agency',   kicker: 'Websites',         line: 'Sites built to convert, not just to look good.', ft: 41000 },
  { src: 'assets/hero/06-dept-automation.png', alt: 'The automation floor of the sky agency',     kicker: 'Automation',       line: 'Follow-up that never sleeps.',                ft: 48000 },
  { src: 'assets/hero/07-dept-ads.png',        alt: 'The ads and campaign floor of the sky agency', kicker: 'Ads',            line: 'Campaigns run by people who watch the numbers.', ft: 55000 },
  { src: 'assets/hero/08-dept-apps.png',       alt: 'The app development floor of the sky agency', kicker: 'Apps',            line: 'Custom tools your business actually owns.',    ft: 62000 },
  { src: 'assets/hero/04-edge.png',            alt: 'The curve of the earth from the edge of the atmosphere', kicker: 'Altitude', line: 'Then you scale.',                        ft: 78000 },
];

const HERO_LAST = HERO_FRAMES.length - 1;
const HERO_SEG = 1 / HERO_LAST;

function useHeroReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

/* One backdrop frame in the stack. Fades in across its own slot and
   pushes slightly forward, so the ascent has depth rather than being
   a flat dissolve. Frame 0 holds from the top, the last holds to the end. */
function HeroFrame({ frame, index, progress, reduced }) {
  const at = index * HERO_SEG;
  const first = index === 0;
  const last = index === HERO_LAST;

  const stops = first ? [0, HERO_SEG * 0.85]
    : last ? [at - HERO_SEG * 0.85, at]
    : [at - HERO_SEG * 0.85, at, at + HERO_SEG * 0.85];
  const values = first ? [1, 0]
    : last ? [0, 1]
    : [0, 1, 0];

  const opacity = useTransform(progress, stops, values);
  const scale = useTransform(
    progress,
    [Math.max(0, at - HERO_SEG), at, Math.min(1, at + HERO_SEG)],
    reduced ? [1, 1, 1] : [1.16, 1.03, 0.97]
  );
  const y = useTransform(
    progress,
    [Math.max(0, at - HERO_SEG), Math.min(1, at + HERO_SEG)],
    reduced ? ['0%', '0%'] : ['5%', '-5%']
  );

  return (
    <motion.div className="absolute inset-0" style={{ opacity, willChange: 'opacity' }} aria-hidden={!first}>
      <motion.img
        src={frame.src}
        alt={first ? frame.alt : ''}
        className="absolute inset-0 w-full h-full object-cover pixelated"
        style={{ scale, y, willChange: 'transform' }}
        loading={first ? 'eager' : 'lazy'}
        decoding="async"
        draggable="false"
      />
    </motion.div>
  );
}

/* Right rail altitude readout — climbs with the scroll. */
function HeroAltitude({ progress }) {
  const [ft, setFt] = React.useState(0);

  React.useEffect(() => {
    const unsub = progress.on('change', (p) => {
      const t = Math.min(HERO_LAST, Math.max(0, p * HERO_LAST));
      const i = Math.min(HERO_LAST - 1, Math.floor(t));
      const v = HERO_FRAMES[i].ft + (HERO_FRAMES[i + 1].ft - HERO_FRAMES[i].ft) * (t - i);
      setFt(Math.round(v / 100) * 100);
    });
    return unsub;
  }, [progress]);

  const height = useTransform(progress, [0, 1], ['0%', '100%']);

  return (
    <div className="absolute right-5 md:right-8 top-1/2 -translate-y-1/2 z-20 hidden lg:flex items-center gap-3 pointer-events-none">
      <div className="text-right">
        <div className="text-primary/80 text-xs tabular-nums tracking-tight">{ft.toLocaleString()} ft</div>
        <div className="text-primary/35 text-[9px] uppercase tracking-[0.3em] mt-1">altitude</div>
      </div>
      <div className="relative w-px h-40 bg-primary/15 overflow-hidden">
        <motion.div className="absolute bottom-0 left-0 w-full bg-primary/70" style={{ height }} />
      </div>
    </div>
  );
}

/* Per-frame caption — visible only inside its own slot. */
function HeroCaption({ frame, index, progress }) {
  const at = index * HERO_SEG;
  const opacity = useTransform(
    progress,
    [at - HERO_SEG * 0.5, at - HERO_SEG * 0.15, at + HERO_SEG * 0.15, at + HERO_SEG * 0.5],
    [0, 1, 1, 0]
  );
  const y = useTransform(progress, [at - HERO_SEG * 0.5, at + HERO_SEG * 0.5], [30, -30]);

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 flex items-center justify-center px-6 pointer-events-none">
      <div className="max-w-3xl text-center">
        <div className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-primary/55 mb-4">{frame.kicker}</div>
        <p
          className="font-serif italic text-primary/90"
          style={{ fontSize: 'clamp(24px, 4.2vw, 58px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}
        >
          {frame.line}
        </p>
      </div>
    </motion.div>
  );
}

function IntroTypewriter({ revealed, onDone }) {
  const LINE = 'Take your business to another level';
  const START_DELAY = 600;
  const CHAR_INTERVAL = 55;
  const [chars, setChars] = React.useState(0);
  const done = chars >= LINE.length;

  // Hand off to the site once the line has landed, plus a beat to read it.
  React.useEffect(() => {
    if (!done || revealed) return;
    const t = setTimeout(() => onDone && onDone(), 1100);
    return () => clearTimeout(t);
  }, [done, revealed, onDone]);

  React.useEffect(() => {
    if (revealed) return;
    let i = 0;
    const startTimer = setTimeout(() => {
      const iv = setInterval(() => {
        i += 1;
        setChars(i);
        if (i >= LINE.length) clearInterval(iv);
      }, CHAR_INTERVAL);
      startTimer._iv = iv;
    }, START_DELAY);
    return () => {
      clearTimeout(startTimer);
      if (startTimer._iv) clearInterval(startTimer._iv);
    };
  }, [revealed]);

  return (
    <AnimatePresence>
      {!revealed && (
        <motion.div
          key="intro-line"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -10,
            filter: 'blur(6px)',
            transition: { duration: 0.7, ease: [0.22, 0.8, 0.2, 1] },
          }}
          className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none px-6"
        >
          <div className="text-center max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-primary/55 mb-5 md:mb-8"
            >
              ClientForge · AI Agency
            </motion.div>
            <h2
              className="font-medium text-ink"
              style={{
                letterSpacing: '-0.04em',
                lineHeight: 1.05,
                fontSize: 'clamp(28px, 5.5vw, 84px)',
              }}
            >
              <span className="font-serif italic text-primary/90">{LINE.slice(0, chars)}</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }}
                className="inline-block w-[0.08em] h-[0.9em] align-middle ml-1"
                style={{ background: '#E1E0CC', transform: 'translateY(-0.05em)' }}
              />
            </h2>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: done ? 1 : 0, scaleX: done ? 1 : 0 }}
              transition={{ duration: 0.8, ease: [0.22, 0.8, 0.2, 1] }}
              style={{ transformOrigin: 'center' }}
              className="mt-8 md:mt-10 mx-auto h-px w-24 bg-primary/40"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Navbar({ active, onNav }) {
  const [open, setOpen] = React.useState(false);

  const items = [
    { id: 'home', label: 'Home' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'work', label: 'Work' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNav = (id) => {
    setOpen(false);
    onNav(id);
  };

  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30">
      {/* Pill bar */}
      <nav className="bg-black/95 backdrop-blur rounded-b-2xl md:rounded-b-3xl px-3 sm:px-5 md:px-8 py-2 md:py-2.5 flex items-center gap-1 sm:gap-2 md:gap-5 border border-t-0 border-white/5">
        {/* Brand — always visible */}
        <button
          onClick={() => handleNav('home')}
          className="flex items-center gap-1.5 pr-2 md:pr-3 mr-1 md:mr-2 border-r border-white/10"
          aria-label="ClientForge home"
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary" />
          <span className="text-primary text-[10px] sm:text-xs md:text-sm font-bold tracking-tight">ClientForge</span>
        </button>

        {/* Desktop nav items */}
        {items.map((it) => (
          <button
            key={it.id}
            onClick={() => handleNav(it.id)}
            className="relative hidden md:block px-1.5 md:px-3 py-1 text-xs md:text-sm transition-colors"
            style={{ color: active === it.id ? '#E1E0CC' : 'rgba(225,224,204,0.7)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#E1E0CC'}
            onMouseLeave={(e) => e.currentTarget.style.color = active === it.id ? '#E1E0CC' : 'rgba(225,224,204,0.7)'}
          >
            {it.label}
            {active === it.id && (
              <motion.span layoutId="nav-dot" className="absolute left-1/2 -bottom-0.5 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
            )}
          </button>
        ))}

        {/* Mobile hamburger button */}
        <button
          onClick={() => setOpen(o => !o)}
          className="md:hidden flex flex-col items-center justify-center gap-[4px] w-8 h-8 rounded-lg border border-white/10 ml-1 flex-shrink-0"
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <motion.span
            animate={open ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 0.8, 0.2, 1] }}
            className="block w-[14px] h-[1.5px] bg-primary/85 rounded-full origin-center"
          />
          <motion.span
            animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.15 }}
            className="block w-[14px] h-[1.5px] bg-primary/85 rounded-full"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 0.8, 0.2, 1] }}
            className="block w-[14px] h-[1.5px] bg-primary/85 rounded-full origin-center"
          />
        </button>
      </nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -6, scaleY: 0.92 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -6, scaleY: 0.92 }}
            transition={{ duration: 0.2, ease: [0.22, 0.8, 0.2, 1] }}
            style={{ transformOrigin: 'top center' }}
            className="md:hidden absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 bg-black/96 backdrop-blur-xl rounded-2xl border border-white/8 overflow-hidden shadow-2xl"
          >
            {items.map((it) => (
              <button
                key={it.id}
                onClick={() => handleNav(it.id)}
                className="w-full flex items-center justify-between px-5 py-3.5 text-sm border-b border-white/5 last:border-0 transition-colors hover:bg-white/5"
                style={{ color: active === it.id ? '#E1E0CC' : 'rgba(225,224,204,0.6)' }}
              >
                <span>{it.label}</span>
                {active === it.id && (
                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Hero({ onNav, activeSection, revealed, onFirstLoop }) {
  const year = new Date().getFullYear();
  const reduced = useHeroReducedMotion();
  const sectionRef = React.useRef(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4, restDelta: 0.0005 });

  // The title lockup owns the first frame, then hands off to the captions.
  const titleOpacity = useTransform(progress, [0, 0.13, 0.22], [1, 1, 0]);
  const titleY = useTransform(progress, [0, 0.22], [0, reduced ? 0 : -60]);
  // The CTA returns at the summit.
  const outroOpacity = useTransform(progress, [0.8, 0.92], [0, 1]);
  const outroY = useTransform(progress, [0.8, 0.92], [reduced ? 0 : 30, 0]);
  const vignette = useTransform(progress, [0, 0.5, 1], [0.85, 0.55, 0.9]);

  // No hero video any more — the intro line drives the reveal (or a tap).
  // Safety net in case the typewriter never completes.
  React.useEffect(() => {
    if (revealed) return;
    const t = setTimeout(() => onFirstLoop && onFirstLoop(), 9000);
    return () => clearTimeout(t);
  }, [revealed, onFirstLoop]);

  const skip = () => { if (!revealed) onFirstLoop && onFirstLoop(); };

  return (
    <section
      id="home"
      ref={sectionRef}
      data-screen-label="01 Hero"
      className="relative"
      style={{ height: `${HERO_FRAMES.length * 100}svh` }}
    >
      <div className="sticky top-0 h-[100svh] min-h-[620px] p-3 sm:p-4 md:p-6">
        <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden bg-black" onClick={skip}>

          {/* Backdrop stack */}
          {HERO_FRAMES.map((f, i) => (
            <HeroFrame key={f.src} frame={f} index={i} progress={progress} reduced={reduced} />
          ))}

          {/* Grade — no film grain: it fights the pixel art. Kept light so
              the sprite detail survives, tinted to the art's slate void. */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: vignette,
              background: 'linear-gradient(to bottom, rgba(27,40,54,0.55), rgba(27,40,54,0) 40%, rgba(27,40,54,0.8))',
            }}
          />

          <IntroTypewriter revealed={revealed} onDone={onFirstLoop} />

          <AnimatePresence>
            {!revealed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.4 } }}
                transition={{ delay: 3.2, duration: 0.8 }}
                className="absolute bottom-5 md:bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
              >
                <motion.div
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
                  className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-primary/60"
                >
                  tap to skip
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {revealed && (
              <motion.div
                key="hero-ui"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                {/* Navbar */}
                <motion.div
                  initial={{ y: -40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.9, ease: [0.22, 0.8, 0.2, 1] }}
                  className="absolute top-0 left-0 right-0"
                >
                  <Navbar active={activeSection} onNav={onNav} />
                </motion.div>

                {/* Floating meta tags */}
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.7 }}
                  className="absolute top-5 md:top-8 left-5 md:left-8 z-20 flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.22em] text-primary/70"
                >
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Open for Q{Math.ceil(((new Date().getMonth()+1))/3)} · {year}</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55, duration: 0.7 }}
                  className="absolute top-5 md:top-8 right-5 md:right-8 z-20 text-right text-[10px] sm:text-xs uppercase tracking-[0.22em] text-primary/70"
                >
                  <div>AI Agency / 001</div>
                  <div className="text-primary/40 mt-1">Websites · Apps · Automation</div>
                </motion.div>

                {/* Altitude rail */}
                <HeroAltitude progress={progress} />

                {/* Mid-climb captions — frame 0 belongs to the title lockup */}
                {HERO_FRAMES.slice(1).map((f, i) => (
                  <HeroCaption key={f.src} frame={f} index={i + 1} progress={progress} />
                ))}

                {/* Title lockup — owns frame 01 */}
                <motion.div style={{ opacity: titleOpacity, y: titleY }} className="absolute inset-x-0 bottom-0 p-5 sm:p-8 md:p-12 z-20">
                  <div className="grid grid-cols-12 gap-4 md:gap-8 items-end">
                    <div className="col-span-12 md:col-span-8">
                      <h1
                        className="font-medium text-ink"
                        style={{
                          letterSpacing: '-0.07em',
                          lineHeight: 0.85,
                          fontSize: 'clamp(64px, 19vw, 340px)',
                        }}
                      >
                        <WordsPullUp text="Client" stagger={0.08} delay={0.2} />
                        <span className="inline-block w-[0.12em]" />
                        <span className="inline-block">
                          <WordsPullUp text="Forge." delay={0.38} />
                        </span>
                      </h1>
                    </div>
                    <div className="col-span-12 md:col-span-4 flex flex-col gap-5 md:pb-4">
                      <FadeUp delay={0.75}>
                        <p className="text-primary/75 text-xs sm:text-sm md:text-base max-w-sm" style={{ lineHeight: 1.2 }}>
                          ClientForge builds AI automations, apps, and websites that help businesses get more customers, streamline operations, and scale smarter.
                        </p>
                      </FadeUp>
                      <FadeUp delay={0.9}>
                        <button
                          onClick={(e) => { e.stopPropagation(); onNav('contact'); }}
                          className="group inline-flex items-center gap-2 hover:gap-3 transition-[gap] bg-primary text-black rounded-full pl-5 sm:pl-6 pr-1.5 py-1.5 font-medium text-sm sm:text-base w-fit"
                        >
                          <span>Book a Strategy Call</span>
                          <span className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-primary transition-transform group-hover:scale-110 group-hover:rotate-[-8deg]">
                            <ArrowRight size={18} />
                          </span>
                        </button>
                      </FadeUp>
                      <FadeUp delay={1.05}>
                        <div className="flex items-center gap-4 text-[10px] sm:text-xs text-primary/50 uppercase tracking-[0.18em]">
                          <span className="flex items-center gap-1.5"><Star size={10} /> 5.0 avg client rating</span>
                          <span className="hidden sm:inline">·</span>
                          <span className="hidden sm:inline">30+ systems shipped</span>
                        </div>
                      </FadeUp>
                    </div>
                  </div>
                </motion.div>

                {/* Summit CTA — arrives on the last frame */}
                <motion.div
                  style={{ opacity: outroOpacity, y: outroY }}
                  className="absolute inset-x-0 bottom-0 p-5 sm:p-8 md:p-12 z-20 flex flex-col items-center gap-5 text-center"
                >
                  <button
                    onClick={(e) => { e.stopPropagation(); onNav('contact'); }}
                    className="group inline-flex items-center gap-2 hover:gap-3 transition-[gap] bg-primary text-black rounded-full pl-5 sm:pl-6 pr-1.5 py-1.5 font-medium text-sm sm:text-base w-fit"
                  >
                    <span>Book a Strategy Call</span>
                    <span className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-primary transition-transform group-hover:scale-110 group-hover:rotate-[-8deg]">
                      <ArrowRight size={18} />
                    </span>
                  </button>
                  <div className="flex items-center gap-4 text-[10px] sm:text-xs text-primary/50 uppercase tracking-[0.18em]">
                    <span className="flex items-center gap-1.5"><Star size={10} /> 5.0 avg client rating</span>
                    <span className="hidden sm:inline">·</span>
                    <span className="hidden sm:inline">30+ systems shipped</span>
                  </div>
                </motion.div>

                {/* Scroll hint — only while still on the ground */}
                <motion.button
                  style={{ opacity: titleOpacity }}
                  onClick={(e) => { e.stopPropagation(); window.scrollBy({ top: window.innerHeight, behavior: 'smooth' }); }}
                  className="absolute bottom-5 md:bottom-8 left-1/2 -translate-x-1/2 z-20 text-primary/50 hover:text-primary transition-colors hidden lg:flex flex-col items-center gap-1"
                >
                  <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
                  <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
                    <ChevronDown size={16} />
                  </motion.span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Hero, HERO_FRAMES });
