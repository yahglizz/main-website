/* Section 02: The math — what leaking leads cost a business, without a
   follow-up system vs with one. Every number is the visitor's own: they set
   leads, sale value, close rate and leak rate; we only do the arithmetic. */

// Starting points only — the visitor drags them to match their business.
const LEAK_PRESETS = [{
  id: 'home',
  label: 'Home services',
  leads: 40,
  value: 1200,
  close: 25,
  slip: 30
}, {
  id: 'health',
  label: 'Health & beauty',
  leads: 80,
  value: 250,
  close: 35,
  slip: 30
}, {
  id: 'pro',
  label: 'Pro services',
  leads: 25,
  value: 2500,
  close: 20,
  slip: 30
}, {
  id: 'retail',
  label: 'Shops & food',
  leads: 150,
  value: 90,
  close: 30,
  slip: 30
}, {
  id: 'realty',
  label: 'Real estate',
  leads: 30,
  value: 7500,
  close: 8,
  slip: 30
}];
const WIN_BACK = 0.5; // the estimate assumes we win back half the leak, and says so
const SYSTEM_PRICE = 1200; // Full System starting price — keep in sync with pricing.jsx
const LEAK_STILL = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const LEAK_HOLES = ['Missed call', 'Late reply', 'No follow-up', 'Site that loses them'];
const SEALS = ['Instant text-back', 'Reply in seconds', 'Auto follow-up', 'Site that books'];
// Of 10 leads in the pipe, these three fall out (one per hole, 30% — the default leak).
const LEAKERS = {
  2: 1,
  5: 2,
  8: 3
};
const money = n => '$' + Math.round(n).toLocaleString('en-US');

/* Eases a number toward its target so totals roll instead of jump. */
function useTween(target, ms = 700) {
  const [v, setV] = React.useState(target);
  const cur = React.useRef(target);
  React.useEffect(() => {
    if (LEAK_STILL) {
      cur.current = target;
      setV(target);
      return;
    }
    const a = cur.current,
      t0 = performance.now();
    let raf;
    const step = t => {
      const p = Math.min(1, (t - t0) / ms);
      cur.current = a + (target - a) * (1 - Math.pow(1 - p, 3));
      setV(cur.current);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return v;
}

/* The motion graphic: leads (pixels) run a pipe into the "Booked" bin.
   Without a system three fall out through the holes; with one, every hole
   is plated over and they all land. */
function LeakPipe({
  sealed
}) {
  const labels = sealed ? SEALS : LEAK_HOLES;
  return /*#__PURE__*/React.createElement("div", {
    className: 'leak-pipe' + (sealed ? ' is-sealed' : ''),
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "leak-lane"
  }, /*#__PURE__*/React.createElement("div", {
    className: "leak-tube"
  }), labels.map((l, i) => /*#__PURE__*/React.createElement("span", {
    key: l,
    className: 'leak-hole' + (i % 2 ? ' is-low' : ''),
    style: {
      left: `${(i + 1) * 20}%`
    }
  }, /*#__PURE__*/React.createElement("em", null, l))), Array.from({
    length: 10
  }).map((_, i) => {
    const hole = !sealed && LEAKERS[i];
    return /*#__PURE__*/React.createElement("span", {
      key: i,
      className: 'leak-run' + (hole ? ' is-lost' : ''),
      style: {
        '--i': i,
        animationName: hole ? `leak-drop-${hole}` : 'leak-run',
        animationDelay: `-${(i * 0.42).toFixed(2)}s`
      }
    }, /*#__PURE__*/React.createElement("i", null));
  })), /*#__PURE__*/React.createElement("div", {
    className: "leak-bin"
  }, /*#__PURE__*/React.createElement("b", null, sealed ? '10/10' : '7/10'), /*#__PURE__*/React.createElement("span", null, "Booked")));
}
function LeakSlider({
  label,
  hint,
  value,
  min,
  max,
  step,
  fmt,
  onChange
}) {
  const id = React.useId();
  const pct = (value - min) / (max - min) * 100;
  return /*#__PURE__*/React.createElement("div", {
    className: "leak-slider"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    className: "leak-slider__top"
  }, /*#__PURE__*/React.createElement("span", null, label), /*#__PURE__*/React.createElement("b", null, fmt(value))), /*#__PURE__*/React.createElement("input", {
    id: id,
    type: "range",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(+e.target.value),
    style: {
      '--p': pct + '%'
    }
  }), hint && /*#__PURE__*/React.createElement("small", null, hint));
}
function RoiMath() {
  const [preset, setPreset] = React.useState('home');
  const [n, setN] = React.useState(LEAK_PRESETS[0]);
  const ref = React.useRef(null);
  const seen = useInView(ref, {
    once: true,
    amount: 0.25
  });
  const set = k => v => {
    setPreset(null);
    setN(s => ({
      ...s,
      [k]: v
    }));
  };
  const pick = p => {
    setPreset(p.id);
    setN(p);
  };
  const lostLeads = n.leads * (n.slip / 100);
  const monthLeak = lostLeads * (n.close / 100) * n.value;
  const yearLeak = monthLeak * 12;
  const yearBack = yearLeak * WIN_BACK;
  const payback = yearBack > 0 ? Math.ceil(SYSTEM_PRICE / (yearBack / 365)) : Infinity;

  // Totals roll up from zero the first time the section scrolls into view.
  const tMonth = useTween(seen ? monthLeak : 0);
  const tYearLeak = useTween(seen ? yearLeak : 0);
  const tBack = useTween(seen ? yearBack : 0);
  const showSystem = () => window.dispatchEvent(new CustomEvent('cf:offer', {
    detail: 'system'
  }));
  return /*#__PURE__*/React.createElement("section", {
    id: "math",
    "data-screen-label": "02 The Math",
    className: "relative bg-black py-16 md:py-32",
    ref: ref
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-noise opacity-70 pointer-events-none"
  }), /*#__PURE__*/React.createElement("div", {
    className: "relative max-w-7xl mx-auto px-5 sm:px-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary/55 mb-10 md:mb-14"
  }, /*#__PURE__*/React.createElement("span", {
    className: "inline-block w-6 h-px bg-primary/30"
  }), /*#__PURE__*/React.createElement("span", null, "02 \xB7 The Math")), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-10 mb-10 md:mb-14"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[0.95] text-ink"
  }, /*#__PURE__*/React.createElement(WordsPullUpMultiStyle, {
    segments: [{
      text: 'Every missed lead has a',
      className: ''
    }, {
      text: 'price.',
      className: 'font-serif italic text-primary/85'
    }]
  })), /*#__PURE__*/React.createElement(FadeUp, {
    delay: 0.2
  }, /*#__PURE__*/React.createElement("p", {
    className: "max-w-md text-primary/60 text-sm md:text-base leading-relaxed"
  }, "Most businesses don't have a lead problem. They have a leak. Calls hit voicemail, replies come a day late, quotes never get a second message. Put in your numbers and see what that leak costs you."))), /*#__PURE__*/React.createElement(FadeUp, {
    delay: 0.15
  }, /*#__PURE__*/React.createElement("div", {
    className: "leak-controls"
  }, /*#__PURE__*/React.createElement("div", {
    className: "leak-presets",
    role: "group",
    "aria-label": "Start from a business type"
  }, /*#__PURE__*/React.createElement("span", {
    className: "leak-presets__label"
  }, "Start from"), LEAK_PRESETS.map(p => /*#__PURE__*/React.createElement("button", {
    key: p.id,
    type: "button",
    className: 'leak-chip' + (preset === p.id ? ' is-on' : ''),
    "aria-pressed": preset === p.id,
    onClick: () => pick(p)
  }, p.label))), /*#__PURE__*/React.createElement("div", {
    className: "leak-sliders"
  }, /*#__PURE__*/React.createElement(LeakSlider, {
    label: "Leads a month",
    hint: "Calls, texts, DMs, form fills",
    value: n.leads,
    min: 5,
    max: 300,
    step: 5,
    fmt: v => v,
    onChange: set('leads')
  }), /*#__PURE__*/React.createElement(LeakSlider, {
    label: "Average sale",
    hint: "What one new customer is worth",
    value: n.value,
    min: 20,
    max: 10000,
    step: 10,
    fmt: money,
    onChange: set('value')
  }), /*#__PURE__*/React.createElement(LeakSlider, {
    label: "Close rate",
    hint: "Of leads you reach, how many buy",
    value: n.close,
    min: 5,
    max: 60,
    step: 1,
    fmt: v => v + '%',
    onChange: set('close')
  }), /*#__PURE__*/React.createElement(LeakSlider, {
    label: "Leads that slip today",
    hint: "No answer, slow answer, or no follow-up",
    value: n.slip,
    min: 5,
    max: 60,
    step: 5,
    fmt: v => v + '%',
    onChange: set('slip')
  })))), /*#__PURE__*/React.createElement("div", {
    className: "leak-grid"
  }, /*#__PURE__*/React.createElement(motion.article, {
    className: "leak-card leak-card--without",
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
      duration: 0.6
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "leak-card__tag"
  }, "Without a system"), /*#__PURE__*/React.createElement(LeakPipe, {
    sealed: false
  }), /*#__PURE__*/React.createElement("div", {
    className: "leak-card__label"
  }, "Walking out the door"), /*#__PURE__*/React.createElement("div", {
    className: "leak-card__big leak-card__big--loss"
  }, "\u2212", money(tMonth), /*#__PURE__*/React.createElement("span", null, "/month")), /*#__PURE__*/React.createElement("p", {
    className: "leak-card__line"
  }, "About ", /*#__PURE__*/React.createElement("b", null, Math.round(lostLeads), " leads a month"), " never get a real answer. That's ", /*#__PURE__*/React.createElement("b", null, money(tYearLeak)), " a year going to whoever picked up first.")), /*#__PURE__*/React.createElement(motion.article, {
    className: "leak-card leak-card--with",
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
      duration: 0.6,
      delay: 0.12
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "leak-card__tag"
  }, "With ClientForge"), /*#__PURE__*/React.createElement(LeakPipe, {
    sealed: true
  }), /*#__PURE__*/React.createElement("div", {
    className: "leak-card__label"
  }, "Back in your pocket, if we win back just half"), /*#__PURE__*/React.createElement("div", {
    className: "leak-card__big leak-card__big--win"
  }, "+", money(tBack), /*#__PURE__*/React.createElement("span", null, "/year")), /*#__PURE__*/React.createElement("p", {
    className: "leak-card__line"
  }, payback <= 365 ? /*#__PURE__*/React.createElement(React.Fragment, null, "The Full System (", money(SYSTEM_PRICE), " one-time) pays for itself in about ", /*#__PURE__*/React.createElement("b", null, payback, " days"), ".") : /*#__PURE__*/React.createElement(React.Fragment, null, "At these numbers the Full System (", money(SYSTEM_PRICE), " one-time) takes over a year to pay back. Book a call and we'll tell you straight if it's worth it.")))), /*#__PURE__*/React.createElement(FadeUp, {
    delay: 0.1
  }, /*#__PURE__*/React.createElement("div", {
    className: "leak-cta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "leak-cta__proof"
  }, /*#__PURE__*/React.createElement("b", null, "7\xD7"), /*#__PURE__*/React.createElement("span", null, "Businesses that answered a web lead within an hour were about seven times as likely to qualify it as those that waited longer. The average reply in the study took 42 hours.", /*#__PURE__*/React.createElement("em", null, "Harvard Business Review, 2011, an audit of 2,241 US companies"))), /*#__PURE__*/React.createElement("div", {
    className: "leak-cta__ask"
  }, /*#__PURE__*/React.createElement("div", {
    className: "leak-cta__head"
  }, "Your leak: about ", /*#__PURE__*/React.createElement("b", null, money(yearLeak)), " a year. Let's plug it."), /*#__PURE__*/React.createElement("div", {
    className: "hero-cta"
  }, /*#__PURE__*/React.createElement("a", {
    className: "hero-cta__go",
    href: "#contact",
    "data-lead": "Full System"
  }, /*#__PURE__*/React.createElement("span", null, "Book a free 20-min call"), /*#__PURE__*/React.createElement(ArrowRight, {
    size: 16
  })), /*#__PURE__*/React.createElement("a", {
    className: "hero-cta__see",
    href: "#pricing",
    onClick: showSystem
  }, "See the Full System")))), /*#__PURE__*/React.createElement("p", {
    className: "leak-fine"
  }, "An estimate, not a promise. It uses your numbers at your current close rate and assumes half the slipped leads are won back. Real results depend on your market, your offer and your follow-through."))));
}
Object.assign(window, {
  RoiMath
});