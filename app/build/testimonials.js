/* Section 4: Testimonials — interactive carousel + grid */

const TESTIMONIALS = [{
  quote: "ClientForge helped us look more professional online and brought in more leads almost immediately. The site feels like it was built for our business, not a template slapped on top.",
  name: 'Marcus Hale',
  role: 'Owner, Hale Roofing Co.',
  initials: 'MH',
  rating: 5,
  metric: '+162% leads in 60 days'
}, {
  quote: "The automation saved us hours every week. Our front desk doesn't chase no-shows anymore — the system handles it, and it's smoother than what we had before.",
  name: 'Priya Ramaswamy',
  role: 'Director, Luma Med Spa',
  initials: 'PR',
  rating: 5,
  metric: '14 hrs/week reclaimed'
}, {
  quote: "Our new website finally feels like a real business asset. Parents enroll online in one sitting and it's cut our admin calls in half.",
  name: 'Daniel Okafor',
  role: 'Founder, BrightPath Childcare',
  initials: 'DO',
  rating: 5,
  metric: '4× enrollment volume'
}, {
  quote: "The AI follow-up hits leads in under a minute. My agents only get calls that are already warm — that alone paid for the build twice over.",
  name: 'Sasha Alvarez',
  role: 'Broker, Rincon Realty',
  initials: 'SA',
  rating: 5,
  metric: 'Response: 9 hrs → 47 s'
}, {
  quote: "They treat the work like it's their own company. Weekly demos, clean handoff, no mystery. That's rare.",
  name: 'Trevor Lin',
  role: 'COO, Ridgeline Home Services',
  initials: 'TL',
  rating: 5,
  metric: 'Shipped in 4 weeks'
}];
function StarRow({
  n = 5
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "flex gap-0.5 text-primary/90"
  }, Array.from({
    length: n
  }).map((_, i) => /*#__PURE__*/React.createElement(Star, {
    key: i,
    size: 12
  })));
}
function Avatar({
  initials,
  accent = '#DEDBC8'
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "w-11 h-11 rounded-full flex items-center justify-center text-black font-bold text-xs flex-shrink-0",
    style: {
      background: accent
    }
  }, initials);
}
function Testimonials() {
  const [idx, setIdx] = React.useState(0);
  const total = TESTIMONIALS.length;
  React.useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % total), 6000);
    return () => clearInterval(t);
  }, [total]);
  const current = TESTIMONIALS[idx];
  return /*#__PURE__*/React.createElement("section", {
    id: "testimonials",
    "data-screen-label": "04 Testimonials",
    className: "relative bg-black py-24 md:py-32"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-noise opacity-70 pointer-events-none"
  }), /*#__PURE__*/React.createElement("div", {
    className: "relative max-w-7xl mx-auto px-5 sm:px-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary/55 mb-10 md:mb-14"
  }, /*#__PURE__*/React.createElement("span", {
    className: "inline-block w-6 h-px bg-primary/30"
  }), /*#__PURE__*/React.createElement("span", null, "04 \xB7 What Clients Say")), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-10 mb-12 md:mb-16"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[0.95] text-ink"
  }, /*#__PURE__*/React.createElement(WordsPullUpMultiStyle, {
    segments: [{
      text: 'What clients',
      className: ''
    }, {
      text: 'say.',
      className: 'font-serif italic text-primary/85'
    }]
  })), /*#__PURE__*/React.createElement(FadeUp, {
    delay: 0.2
  }, /*#__PURE__*/React.createElement("p", {
    className: "max-w-md text-primary/60 text-sm md:text-base leading-relaxed"
  }, "Real feedback from businesses we've helped grow. Quotes shared with permission."))), /*#__PURE__*/React.createElement(FadeUp, {
    delay: 0.25
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative bg-surface grain rounded-2xl md:rounded-3xl border border-white/5 p-8 md:p-14"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute top-6 right-8 text-[10px] uppercase tracking-[0.3em] text-primary/45"
  }, String(idx + 1).padStart(2, '0'), " / ", String(total).padStart(2, '0')), /*#__PURE__*/React.createElement("div", {
    className: "absolute top-8 left-8 md:top-10 md:left-10 font-serif italic text-primary/15 text-[120px] md:text-[180px] leading-none select-none pointer-events-none"
  }, "\u201C"), /*#__PURE__*/React.createElement(AnimatePresence, {
    mode: "wait"
  }, /*#__PURE__*/React.createElement(motion.div, {
    key: idx,
    initial: {
      opacity: 0,
      y: 14
    },
    animate: {
      opacity: 1,
      y: 0
    },
    exit: {
      opacity: 0,
      y: -10
    },
    transition: {
      duration: 0.45,
      ease: [0.22, 0.8, 0.2, 1]
    },
    className: "relative"
  }, /*#__PURE__*/React.createElement(StarRow, {
    n: current.rating
  }), /*#__PURE__*/React.createElement("p", {
    className: "mt-5 text-xl md:text-3xl lg:text-4xl font-medium tracking-tight leading-tight text-ink max-w-4xl"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-serif italic text-primary/60"
  }, "\u201C"), current.quote, /*#__PURE__*/React.createElement("span", {
    className: "font-serif italic text-primary/60"
  }, "\u201D")), /*#__PURE__*/React.createElement("div", {
    className: "mt-8 flex items-center justify-between flex-wrap gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4"
  }, /*#__PURE__*/React.createElement(Avatar, {
    initials: current.initials
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-sm font-bold text-ink"
  }, current.name), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-primary/55"
  }, current.role))), /*#__PURE__*/React.createElement("div", {
    className: "text-xs uppercase tracking-[0.22em] text-primary/55 border border-white/10 rounded-full px-3 py-1.5"
  }, current.metric)))), /*#__PURE__*/React.createElement("div", {
    className: "mt-10 flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex gap-1.5"
  }, TESTIMONIALS.map((_, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => setIdx(i),
    className: "h-1 rounded-full transition-all",
    style: {
      width: i === idx ? 32 : 10,
      background: i === idx ? '#DEDBC8' : 'rgba(225,224,204,0.18)'
    },
    "aria-label": `Show testimonial ${i + 1}`
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setIdx(i => (i - 1 + total) % total),
    className: "w-9 h-9 rounded-full border border-white/10 text-primary/80 hover:text-ink hover:border-white/30 transition-colors flex items-center justify-center rotate-180"
  }, /*#__PURE__*/React.createElement(ArrowRight, {
    size: 14
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => setIdx(i => (i + 1) % total),
    className: "w-9 h-9 rounded-full border border-white/10 text-primary/80 hover:text-ink hover:border-white/30 transition-colors flex items-center justify-center"
  }, /*#__PURE__*/React.createElement(ArrowRight, {
    size: 14
  })))))), /*#__PURE__*/React.createElement("div", {
    className: "mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
  }, TESTIMONIALS.slice(0, 3).map((t, i) => /*#__PURE__*/React.createElement(motion.div, {
    key: i,
    initial: {
      opacity: 0,
      y: 20
    },
    whileInView: {
      opacity: 1,
      y: 0
    },
    viewport: {
      once: true
    },
    transition: {
      delay: i * 0.08,
      duration: 0.6
    },
    className: "bg-card rounded-2xl p-6 border border-white/5 hover:border-white/15 transition-colors"
  }, /*#__PURE__*/React.createElement(StarRow, null), /*#__PURE__*/React.createElement("p", {
    className: "mt-4 text-sm text-primary/80 leading-relaxed"
  }, "\"", t.quote.split('. ')[0], ".\""), /*#__PURE__*/React.createElement("div", {
    className: "mt-5 flex items-center gap-3"
  }, /*#__PURE__*/React.createElement(Avatar, {
    initials: t.initials
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-sm font-bold text-ink"
  }, t.name), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-primary/55"
  }, t.role))))))));
}
Object.assign(window, {
  Testimonials
});