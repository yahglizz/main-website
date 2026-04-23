function IntroTypewriter({ revealed }) {
  const LINE = 'Take your business to another level';
  const START_DELAY = 600;
  const CHAR_INTERVAL = 55;
  const [chars, setChars] = React.useState(0);
  const done = chars >= LINE.length;

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

/* Hero section with smooth-loop video (dual-video crossfade) */

function SmoothLoopVideo({ src, className = '', poster, onFirstLoop }) {
  const aRef = React.useRef(null);
  const bRef = React.useRef(null);
  const [active, setActive] = React.useState('a');
  const [duration, setDuration] = React.useState(0);
  const FADE = 0.9;
  const raf = React.useRef(0);
  const firedFirstLoop = React.useRef(false);

  React.useEffect(() => {
    const a = aRef.current, b = bRef.current;
    if (!a || !b) return;
    a.play().catch(() => {});
    const onMeta = () => setDuration(a.duration || 0);
    a.addEventListener('loadedmetadata', onMeta);
    const safetyTimer = setTimeout(() => {
      if (!firedFirstLoop.current) {
        firedFirstLoop.current = true;
        onFirstLoop && onFirstLoop();
      }
    }, 8000);
    return () => { a.removeEventListener('loadedmetadata', onMeta); clearTimeout(safetyTimer); };
  }, []);

  React.useEffect(() => {
    if (!duration) return;
    const a = aRef.current, b = bRef.current;

    const tick = () => {
      const current = active === 'a' ? a : b;
      const next = active === 'a' ? b : a;
      if (!current || !next) { raf.current = requestAnimationFrame(tick); return; }
      const t = current.currentTime;
      const d = current.duration || duration;
      if (!firedFirstLoop.current && d - t <= FADE + 0.1) {
        firedFirstLoop.current = true;
        onFirstLoop && onFirstLoop();
      }
      if (d - t <= FADE && next.paused) {
        try { next.currentTime = 0; } catch (e) {}
        next.play().catch(() => {});
      }
      if (d - t <= 0.05) {
        setActive(active === 'a' ? 'b' : 'a');
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [duration, active]);

  return (
    <div className={`absolute inset-0 ${className}`}>
      <video
        ref={aRef}
        className="video-layer"
        style={{ opacity: active === 'a' ? 1 : 0 }}
        src={src}
        muted playsInline preload="auto"
        poster={poster}
      />
      <video
        ref={bRef}
        className="video-layer"
        style={{ opacity: active === 'b' ? 1 : 0 }}
        src={src}
        muted playsInline preload="auto"
      />
    </div>
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

  const skip = () => { if (!revealed) onFirstLoop && onFirstLoop(); };

  return (
    <section id="home" data-screen-label="01 Hero" className="h-[100svh] min-h-[620px] p-3 sm:p-4 md:p-6">
      <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden bg-black" onClick={skip}>
        <SmoothLoopVideo src="assets/hero.mp4" onFirstLoop={onFirstLoop} />

        <div className="absolute inset-0 noise-overlay opacity-[0.7] mix-blend-overlay pointer-events-none" />
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0.35 }}
          animate={{ opacity: revealed ? 1 : 0.35 }}
          transition={{ duration: 1.6, ease: [0.22, 0.8, 0.2, 1] }}
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.75))' }}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent pointer-events-none" />

        <IntroTypewriter revealed={revealed} />

        <AnimatePresence>
          {!revealed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.4 } }}
              transition={{ delay: 3.5, duration: 0.8 }}
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

              {/* Bottom content grid */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 md:p-12 z-20">
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
              </div>

              {/* Scroll hint */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.6 }}
                onClick={(e) => { e.stopPropagation(); onNav('pricing'); }}
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
    </section>
  );
}

Object.assign(window, { Hero });
