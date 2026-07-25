/* Root app — scroll spy + section mounting */

function App() {
  const [active, setActive] = React.useState('home');
  const nav = id => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 8;
    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });
  };

  // No scroll lock any more — the old hero held the page still during its intro
  // video. The scroll world IS the intro now, and it needs scroll from frame one.

  React.useEffect(() => {
    const ids = ['pricing', 'work', 'testimonials', 'contact'];
    const io = new IntersectionObserver(entries => {
      // pick the entry with the largest intersection ratio that's intersecting
      const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) setActive(visible[0].target.id);
    }, {
      rootMargin: '-40% 0px -50% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1]
    });
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return /*#__PURE__*/React.createElement("main", {
    className: "bg-black text-ink"
  }, /*#__PURE__*/React.createElement(motion.div, {
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1
    },
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }, /*#__PURE__*/React.createElement(Pricing, null), /*#__PURE__*/React.createElement(Work, null), /*#__PURE__*/React.createElement(Testimonials, null), /*#__PURE__*/React.createElement(Contact, null)));
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));