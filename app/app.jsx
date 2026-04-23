/* Root app — scroll spy + section mounting */

function App() {
  const [active, setActive] = React.useState('home');
  const [revealed, setRevealed] = React.useState(false);

  const nav = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 8;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  const handleFirstLoop = React.useCallback(() => setRevealed(true), []);

  // Lock scroll until the site is revealed so the intro is purely the video
  React.useEffect(() => {
    if (revealed) {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    } else {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [revealed]);

  React.useEffect(() => {
    const ids = ['home', 'pricing', 'work', 'testimonials', 'contact'];
    const io = new IntersectionObserver(
      (entries) => {
        // pick the entry with the largest intersection ratio that's intersecting
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <main className="bg-black text-ink">
      <Hero onNav={nav} activeSection={active} revealed={revealed} onFirstLoop={handleFirstLoop} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: revealed ? 1 : 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        aria-hidden={!revealed}
        style={{ pointerEvents: revealed ? 'auto' : 'none' }}
      >
        <Pricing />
        <Work />
        <Testimonials />
        <Contact />
      </motion.div>
    </main>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
