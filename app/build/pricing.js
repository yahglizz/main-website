/* Section 2: Services / Pricing — tabbed offer layout */

// ── DATA ──────────────────────────────────────────────────

const WEBSITE_PLANS = [{
  id: 'web-starter',
  title: 'Starter',
  price: '$300',
  timeline: 'Under 1 week',
  accent: '#DEDBC8',
  bestFor: 'Get found and start collecting leads.',
  cta: 'Get started',
  features: ['1-page high-converting website', 'Mobile responsive design', 'Lead capture form', 'Clean modern UI', 'Free hosting setup']
}, {
  id: 'web-growth',
  title: 'Growth',
  price: '$700',
  timeline: 'Under 1 week',
  accent: '#DEDBC8',
  featured: true,
  inherits: 'Starter',
  bestFor: 'Turn the traffic you already get into booked jobs.',
  cta: 'Start this build',
  features: ['3–5 page website', 'CRM integration', 'Booking / calendar setup', 'Automated lead follow-up', 'Google Business + reviews wired in']
}, {
  id: 'web-premium',
  title: 'Premium',
  price: '$1,400',
  timeline: 'Under 1 week',
  accent: '#DEDBC8',
  inherits: 'Growth',
  bestFor: 'A site built around your business, not a template.',
  cta: 'Request a quote',
  features: ['Fully custom design — no template', 'Unlimited pages', 'Funnel-ready structure', 'Copywriting included', '30 days of edits after launch']
}];
const ADS_PLANS = [{
  id: 'ads-starter',
  title: 'Starter Ads',
  price: '$250',
  priceSub: 'per month · management',
  timeline: 'Live in under 1 week',
  accent: '#C9A8FF',
  spendNote: true,
  bestFor: 'One campaign, run properly, without you touching it.',
  cta: 'Launch ads',
  features: ['Campaign setup & launch', '2 ad creatives per month', 'Audience targeting & setup', 'Monthly performance report']
}, {
  id: 'ads-growth',
  title: 'Growth Ads',
  price: '$450',
  priceSub: 'per month · management',
  timeline: 'Live in under 1 week',
  accent: '#C9A8FF',
  featured: true,
  inherits: 'Starter Ads',
  spendNote: true,
  bestFor: 'Actively managed against cost per lead, every week.',
  cta: 'Start growing',
  features: ['4–6 fresh creatives per month', 'Retargeting campaigns', 'Conversion tracking setup', 'Weekly optimization', 'Lead follow-up automation included']
}, {
  id: 'ads-scale',
  title: 'Scale Ads',
  price: '$750',
  priceSub: 'per month · management',
  timeline: 'Live in under 1 week',
  accent: '#C9A8FF',
  inherits: 'Growth Ads',
  spendNote: true,
  bestFor: 'Multi-campaign spend that needs a hand on it daily.',
  cta: "Let's scale",
  features: ['Unlimited creative testing', 'Multi-campaign / multi-audience', 'Full funnel integration', 'Direct line for same-day changes', 'Bi-weekly strategy call']
}];
const AUTO_PLANS = [{
  id: 'auto-basic',
  title: 'Basic Automation',
  price: '$250',
  priceSub: 'one-time build',
  timeline: 'Under 1 week',
  accent: '#7FE0B9',
  bestFor: 'Stop losing leads you never got back to.',
  cta: 'Get automated',
  features: ['Instant SMS / email reply to new leads', 'Lead capture automation', 'Missed-call text-back', 'Notification alerts to your phone']
}, {
  id: 'auto-growth',
  title: 'Growth Automation',
  price: '$550',
  priceSub: 'one-time build',
  timeline: 'Under 1 week',
  accent: '#7FE0B9',
  featured: true,
  inherits: 'Basic Automation',
  bestFor: 'A system that chases the quiet ones for you.',
  cta: 'Build my system',
  features: ['CRM pipeline setup', 'Multi-step follow-up sequences', 'Booking + reminder system', 'Review request automation', 'Lead nurturing workflows']
}, {
  id: 'auto-advanced',
  title: 'Advanced Systems',
  price: '$1,100',
  priceSub: 'one-time build',
  timeline: 'Under 1 week',
  accent: '#7FE0B9',
  inherits: 'Growth Automation',
  bestFor: 'Custom back-office plumbing for how you actually work.',
  cta: 'Request a build',
  features: ['AI chat / receptionist integration', 'Custom workflow architecture', 'Connections to your existing tools', 'Reporting dashboard', '30 days of tuning after launch']
}];
const ADDONS = [{
  id: 'retainer',
  title: 'Monthly Care Plan',
  price: '$75–$200/mo',
  icon: Layers,
  accent: '#DEDBC8',
  description: 'Keep your site running, updated, and converting every month — without lifting a finger.',
  features: ['Hosting & uptime monitoring', 'Content & maintenance updates', 'Priority support', 'Automation tweaks included']
}, {
  id: 'revamp',
  title: 'Website Revamp',
  price: '$250–$500',
  icon: Sparkles,
  accent: '#9FC6FF',
  description: 'Your old site is costing you customers. We redesign it for speed, trust, and conversions.',
  features: ['Full visual redesign', 'Mobile & speed optimization', 'Updated copy & structure', 'Delivered in under 1 week']
}];
const BUNDLE_FEATURES = ['New website build (3–5 pages)', 'Logo & branding refresh', 'CRM setup & configuration', 'Full automation system', 'Ad campaign setup', 'Lead capture + follow-up system'];
const BRAND_FEATURES = ['Custom website (up to 3 pages)', 'Professional logo design', 'Business flyers (2–3 designs)', 'Brand color palette & style guide', 'Social media graphics kit', 'Delivered in under 1 week'];

/* The two hero cards aren't tiers, but the checkout modal only needs this
   shape — so they open it exactly like a plan does. */
const BRAND_PACKAGE = {
  id: 'brand-package',
  title: 'Complete Brand Setup Package',
  price: '$600',
  timeline: 'Under 1 week',
  cta: 'Get my brand package',
  features: BRAND_FEATURES
};
const BUNDLE_PACKAGE = {
  id: 'bundle-package',
  title: 'Business Rebuild System',
  price: '$1,200',
  timeline: 'Under 1 week',
  cta: 'Build my business system',
  features: BUNDLE_FEATURES
};
const TABS = [{
  id: 'websites',
  label: 'Websites',
  icon: Globe,
  accent: '#DEDBC8',
  tag: '01',
  description: 'High-converting websites built fast. Mobile-first, lead-capture-ready, and designed to make your business look like the obvious choice.',
  plans: WEBSITE_PLANS
}, {
  id: 'ads',
  label: 'Ad Campaigns',
  icon: Zap,
  accent: '#C9A8FF',
  tag: '02',
  description: 'Paid ads that bring in real customers, not just clicks. We set up, manage, and optimize so you can focus on running your business.',
  plans: ADS_PLANS
}, {
  id: 'automation',
  label: 'AI Automation',
  icon: Cpu,
  accent: '#7FE0B9',
  tag: '03',
  description: 'Systems that follow up, book appointments, and nurture leads while you sleep. Stop chasing — let automation do the heavy lifting.',
  plans: AUTO_PLANS
}, {
  id: 'addons',
  label: 'Add-Ons',
  icon: Layers,
  accent: '#E5C580',
  tag: '04',
  description: 'Bolt-on services to maintain, refresh, or supercharge what you\'ve already built.'
}];

// ── CARD COMPONENTS ───────────────────────────────────────

/* ── SWIPE TO CONFIRM ──────────────────────────────────────
   The plan CTA is a swipe control rather than a button: committing to a build
   should take a deliberate gesture. Drag the handle across and it fires. But
   a plain tap anywhere on the track runs the same swipe — nobody should be
   forced to drag, and on a mouse dragging a 300px track is a chore. Enter and
   Space do it too.

   Pointer events are handled directly instead of through framer-motion drag:
   this control sits inside the deck, which is itself draggable, and two
   nested drag handlers fighting over the same gesture is a mess. A manual
   handler with stopPropagation keeps the two apart cleanly. */

const SWIPE_COMMIT = 0.72; // fraction of the track that counts as committed

function SwipeAction({
  label,
  doneLabel,
  onComplete,
  featured
}) {
  const trackRef = React.useRef(null);
  const maxRef = React.useRef(1); // travel in px
  const startRef = React.useRef(0);
  const movedRef = React.useRef(false);
  const pRef = React.useRef(0); // progress, mirrored for event handlers
  const [p, setP] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const setProgress = v => {
    pRef.current = v;
    setP(v);
  };
  const measure = React.useCallback(() => {
    const t = trackRef.current;
    if (!t) return;
    const handle = t.querySelector('[data-handle]');
    if (!handle) return;
    maxRef.current = Math.max(1, t.clientWidth - handle.offsetWidth - 8);
  }, []);
  React.useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, [measure]);

  // Clean up the timers if the card unmounts mid-animation (tab switch).
  const timers = React.useRef([]);
  React.useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const finish = () => {
    if (done) return;
    setDone(true);
    setProgress(1);
    // Let the handle land before acting, then reset so the card isn't stuck
    // in its completed state if the visitor scrolls back.
    timers.current.push(setTimeout(() => onComplete && onComplete(), 420));
    timers.current.push(setTimeout(() => {
      setDone(false);
      setProgress(0);
    }, 1800));
  };
  const onPointerDown = e => {
    if (done) return;
    e.stopPropagation(); // don't let the deck start a drag
    measure();
    startRef.current = e.clientX;
    movedRef.current = false;
    setDragging(true);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (err) {}
  };
  const onPointerMove = e => {
    if (!dragging || done) return;
    const dx = e.clientX - startRef.current;
    if (Math.abs(dx) > 3) movedRef.current = true;
    setProgress(Math.min(1, Math.max(0, dx / maxRef.current)));
  };
  const endDrag = e => {
    if (!dragging) return;
    setDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (err) {}
    // A press that never moved is a tap — run the whole swipe for them.
    if (!movedRef.current) {
      finish();
      return;
    }
    if (pRef.current >= SWIPE_COMMIT) finish();else setProgress(0);
  };
  const travel = maxRef.current * p || 0;
  return /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "button",
    tabIndex: 0,
    "aria-label": label,
    onPointerDown: onPointerDown,
    onPointerMove: onPointerMove,
    onPointerUp: endDrag,
    onPointerCancel: endDrag,
    onKeyDown: e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        finish();
      }
    },
    className: ['swipe-track', featured ? 'swipe-track--featured' : '', dragging ? 'is-dragging' : '', done ? 'is-done' : ''].join(' ')
  }, /*#__PURE__*/React.createElement("span", {
    className: "swipe-fill",
    style: {
      width: `${p * 100}%`
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "swipe-label"
  }, done ? doneLabel || "Let's go" : label), /*#__PURE__*/React.createElement("span", {
    className: "swipe-chevrons",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null)), /*#__PURE__*/React.createElement("span", {
    "data-handle": true,
    className: "swipe-handle",
    style: {
      transform: `translateX(${travel}px)`
    }
  }, done ? /*#__PURE__*/React.createElement(Check, {
    size: 16,
    strokeWidth: 3
  }) : /*#__PURE__*/React.createElement(ArrowRight, {
    size: 16
  })));
}
function CardCheck({
  color
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: "mt-[2px] w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 border border-white/10",
    style: {
      background: 'rgba(0,0,0,0.55)',
      color: color || '#DEDBC8'
    }
  }, /*#__PURE__*/React.createElement(Check, {
    size: 9,
    strokeWidth: 2.6
  }));
}
function PlanCard({
  plan,
  i,
  active,
  onPick
}) {
  const isFeatured = plan.featured;
  return /*#__PURE__*/React.createElement(motion.div, {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0
    },
    transition: {
      delay: i * 0.08,
      duration: 0.55,
      ease: [0.22, 0.8, 0.2, 1]
    },
    className: ['relative grain rounded-2xl md:rounded-3xl p-6 md:p-8 flex flex-col h-full', 'border transition-colors', isFeatured ? 'bg-gradient-to-b from-[#282621] to-[#1a1917] border-primary/35' : 'bg-card border-white/5 hover:border-white/15',
    // In the deck, the front card is called out with a gold plate edge.
    active ? 'deck-card-active' : ''].join(' ')
  }, isFeatured && /*#__PURE__*/React.createElement("span", {
    className: "absolute -top-3 left-6 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] bg-primary text-black px-3 py-1 rounded-full font-bold"
  }, "Most Popular"), /*#__PURE__*/React.createElement("div", {
    className: "mb-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] uppercase tracking-[0.24em] text-primary/45"
  }, plan.title)), /*#__PURE__*/React.createElement("div", {
    className: "mb-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-4xl md:text-5xl font-medium tracking-tighter text-ink"
  }, plan.price)), plan.priceSub && /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-primary/40 mt-1"
  }, plan.priceSub), plan.bestFor && /*#__PURE__*/React.createElement("p", {
    className: "mt-3 text-sm leading-snug text-primary/55"
  }, plan.bestFor), /*#__PURE__*/React.createElement("div", {
    className: "h-px bg-white/5 my-5"
  }), plan.inherits && /*#__PURE__*/React.createElement("div", {
    className: "plan-inherits"
  }, /*#__PURE__*/React.createElement(Check, {
    size: 11,
    strokeWidth: 3
  }), "Everything in ", plan.inherits, ", plus:"), /*#__PURE__*/React.createElement("ul", {
    className: "space-y-3 flex-1 mb-6"
  }, plan.features.map((f, k) => /*#__PURE__*/React.createElement("li", {
    key: k,
    className: "flex items-start gap-3 text-sm text-primary/78"
  }, /*#__PURE__*/React.createElement(CardCheck, {
    color: plan.accent
  }), /*#__PURE__*/React.createElement("span", null, f)))), plan.spendNote && /*#__PURE__*/React.createElement("div", {
    className: "plan-spend"
  }, "You pay Meta directly for ad spend. This is the management fee \u2014 we never touch your budget."), /*#__PURE__*/React.createElement(SwipeAction, {
    label: 'Swipe to ' + plan.cta.charAt(0).toLowerCase() + plan.cta.slice(1),
    doneLabel: "Opening checkout\u2026",
    featured: isFeatured,
    onComplete: () => onPick && onPick(plan, 'checkout')
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "showcase-btn",
    onClick: e => {
      e.stopPropagation();
      onPick && onPick(plan, 'showcase');
    }
  }, "See work first \u2014 book a 15-min call"));
}

/* ── PLAN DECK ─────────────────────────────────────────────
   The plans are a swipeable deck rather than a static grid. Three ways in,
   because people reach for different ones: drag it, tap it, or use the arrows
   (and the arrow keys once it has focus). Neighbours stay partly on screen so
   it still reads as a set of tiers you can compare, not a slideshow that hides
   two thirds of the pricing.

   Motion is quantised with a stepped easing curve — the slide lands in visible
   increments instead of gliding, which is what makes it feel of a piece with
   the pixel art rather than like a stock carousel. */

// Deliberately coarse: 8 visible increments across the travel.
const DECK_STEPS = t => Math.round(t * 8) / 8;
function PlanDeck({
  plans,
  onPick
}) {
  // Open on the featured tier — that's the one worth landing on.
  const [idx, setIdx] = React.useState(() => {
    const f = plans.findIndex(p => p.featured);
    return f < 0 ? 0 : f;
  });
  const [metrics, setMetrics] = React.useState({
    step: 0,
    offset: 0
  });
  const wrapRef = React.useRef(null);
  // A drag ends with a click event on whatever was under the finger. Without
  // this the swipe would advance once, then the trailing click would advance
  // it again.
  const draggedRef = React.useRef(false);
  const n = plans.length;
  const go = d => setIdx(i => Math.min(n - 1, Math.max(0, i + d)));

  // The step is a measured pixel distance, not a percentage: the slides are
  // sized in vw-ish units that change per breakpoint, and a percentage
  // translate on the track would be relative to the track's own width.
  React.useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const measure = () => {
      const slide = wrap.querySelector('[data-slide]');
      const track = wrap.querySelector('[data-track]');
      if (!slide || !track) return;
      const w = slide.offsetWidth;
      const cs = getComputedStyle(track);
      const gap = parseFloat(cs.columnGap || cs.gap) || 0;
      setMetrics({
        step: w + gap,
        offset: (wrap.offsetWidth - w) / 2
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [n]);
  const x = metrics.offset - idx * metrics.step;
  const onDragEnd = (_e, info) => {
    if (!metrics.step) return;
    // Fold velocity into the decision so a quick flick counts even when the
    // finger barely travelled.
    const throw_ = info.offset.x + info.velocity.x * 0.16;
    if (throw_ < -metrics.step * 0.22) go(1);else if (throw_ > metrics.step * 0.22) go(-1);
    // Clear on the next tick — after the click this drag is about to produce.
    setTimeout(() => {
      draggedRef.current = false;
    }, 0);
  };
  const onSlideClick = (e, i) => {
    if (draggedRef.current) return;
    // Never hijack a real control — the CTA inside the card has its own job.
    if (e.target.closest('button, a')) return;
    if (i === idx) go(1); // tap the front card to move on
    else setIdx(i); // tap a neighbour to bring it forward
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "relative",
    role: "group",
    "aria-roledescription": "carousel",
    "aria-label": "Plans",
    tabIndex: 0,
    onKeyDown: e => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(1);
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(-1);
      }
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: wrapRef,
    className: "overflow-hidden -mx-5 sm:-mx-8 px-0 pt-4 pb-2"
  }, /*#__PURE__*/React.createElement(motion.div, {
    "data-track": true,
    className: "flex gap-4 md:gap-6 items-stretch cursor-grab active:cursor-grabbing",
    drag: "x",
    dragElastic: 0.12,
    onDragStart: () => {
      draggedRef.current = true;
    },
    dragConstraints: {
      left: metrics.offset - (n - 1) * metrics.step,
      right: metrics.offset
    },
    onDragEnd: onDragEnd,
    animate: {
      x
    },
    transition: {
      duration: 0.42,
      ease: DECK_STEPS
    }
  }, plans.map((p, i) => /*#__PURE__*/React.createElement(motion.div, {
    "data-slide": true,
    key: p.id,
    onClick: e => onSlideClick(e, i),
    className: "flex-none w-[82%] sm:w-[58%] lg:w-[34%] xl:w-[30%]",
    animate: {
      scale: i === idx ? 1 : 0.93,
      opacity: i === idx ? 1 : 0.5
    },
    transition: {
      duration: 0.42,
      ease: DECK_STEPS
    },
    "aria-hidden": i === idx ? undefined : true
  }, /*#__PURE__*/React.createElement(PlanCard, {
    plan: p,
    i: i,
    active: i === idx,
    onPick: onPick
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "mt-7 flex items-center justify-between gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2.5"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => go(-1),
    disabled: idx === 0,
    "aria-label": "Previous plan",
    className: "deck-arrow"
  }, /*#__PURE__*/React.createElement(ArrowRight, {
    size: 15,
    style: {
      transform: 'rotate(180deg)'
    }
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => go(1),
    disabled: idx === n - 1,
    "aria-label": "Next plan",
    className: "deck-arrow"
  }, /*#__PURE__*/React.createElement(ArrowRight, {
    size: 15
  })), /*#__PURE__*/React.createElement("span", {
    className: "deck-count ml-1",
    "aria-live": "polite"
  }, String(idx + 1).padStart(2, '0'), " / ", String(n).padStart(2, '0'))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "deck-hint"
  }, "Tap or swipe", /*#__PURE__*/React.createElement("i", {
    className: "pixel-caret ml-2"
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1.5"
  }, plans.map((p, i) => /*#__PURE__*/React.createElement("button", {
    key: p.id,
    type: "button",
    onClick: () => setIdx(i),
    "aria-label": `Show ${p.title}`,
    "aria-current": i === idx ? 'true' : undefined,
    className: 'deck-dot' + (i === idx ? ' is-active' : '')
  }))))));
}
function AddonCard({
  addon,
  i
}) {
  const Icon = addon.icon;
  return /*#__PURE__*/React.createElement(motion.div, {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0
    },
    transition: {
      delay: i * 0.08,
      duration: 0.55,
      ease: [0.22, 0.8, 0.2, 1]
    },
    className: "grain bg-card rounded-2xl md:rounded-3xl border border-white/5 hover:border-white/15 transition-colors p-6 md:p-8 flex flex-col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start gap-4 mb-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-10 h-10 rounded-xl bg-black/60 border border-white/8 flex items-center justify-center flex-shrink-0",
    style: {
      color: addon.accent
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    size: 18
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] uppercase tracking-[0.22em] text-primary/45 mb-1"
  }, addon.title), /*#__PURE__*/React.createElement("div", {
    className: "text-2xl md:text-3xl font-medium tracking-tight text-ink"
  }, addon.price))), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-primary/58 leading-relaxed mb-5"
  }, addon.description), /*#__PURE__*/React.createElement("ul", {
    className: "space-y-2.5 flex-1 mb-7"
  }, addon.features.map((f, k) => /*#__PURE__*/React.createElement("li", {
    key: k,
    className: "flex items-center gap-3 text-sm text-primary/72"
  }, /*#__PURE__*/React.createElement(Check, {
    size: 12,
    className: "text-primary/40 flex-shrink-0"
  }), /*#__PURE__*/React.createElement("span", null, f)))), /*#__PURE__*/React.createElement("button", {
    onClick: () => document.getElementById('contact')?.scrollIntoView({
      behavior: 'smooth'
    }),
    className: "group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary/60 hover:text-ink transition-colors"
  }, "Get started ", /*#__PURE__*/React.createElement(ArrowRight, {
    size: 11
  })));
}
function BundleCard({
  onPick
}) {
  return /*#__PURE__*/React.createElement(motion.div, {
    initial: {
      opacity: 0,
      y: 24
    },
    animate: {
      opacity: 1,
      y: 0
    },
    transition: {
      delay: 0.18,
      duration: 0.65,
      ease: [0.22, 0.8, 0.2, 1]
    },
    className: "relative mt-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute -inset-[1px] rounded-3xl pointer-events-none",
    style: {
      background: 'linear-gradient(135deg, rgba(229,197,128,0.55), rgba(222,219,200,0.08) 50%, rgba(229,197,128,0.35))'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "relative grain rounded-3xl overflow-hidden p-8 md:p-12",
    style: {
      background: 'linear-gradient(135deg, #1d1b10, #161510 50%, #1a1913)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none",
    style: {
      background: 'radial-gradient(circle at center, rgba(229,197,128,0.09), transparent 65%)',
      transform: 'translate(30%, -30%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "mb-7"
  }, /*#__PURE__*/React.createElement("span", {
    className: "inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] px-3 py-1.5 rounded-full border font-medium",
    style: {
      background: 'rgba(229,197,128,0.1)',
      color: '#E5C580',
      borderColor: 'rgba(229,197,128,0.25)'
    }
  }, /*#__PURE__*/React.createElement(Star, {
    size: 9
  }), "Best Value \xB7 Business Rebuild System")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] uppercase tracking-[0.24em] mb-3",
    style: {
      color: 'rgba(229,197,128,0.55)'
    }
  }, "Complete Business Package"), /*#__PURE__*/React.createElement("div", {
    className: "text-4xl md:text-5xl font-medium tracking-tighter text-ink mb-2",
    style: {
      lineHeight: 1
    }
  }, "$1,200"), /*#__PURE__*/React.createElement("div", {
    className: "text-sm mb-6",
    style: {
      color: 'rgba(222,219,200,0.4)'
    }
  }, "One-time \xB7 Delivered in under 1 week"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm md:text-base leading-relaxed mb-8",
    style: {
      color: 'rgba(222,219,200,0.7)'
    }
  }, "The complete system to get your business visible online, capturing leads automatically, and following up without you lifting a finger. Website, branding, CRM, automation, and ads \u2014 all built together."), /*#__PURE__*/React.createElement("div", {
    className: "hero-cta"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "hero-cta__go",
    onClick: () => onPick && onPick(BUNDLE_PACKAGE, 'checkout')
  }, /*#__PURE__*/React.createElement("span", null, "Build My Business System"), /*#__PURE__*/React.createElement(ArrowRight, {
    size: 16
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "hero-cta__see",
    onClick: () => onPick && onPick(BUNDLE_PACKAGE, 'showcase')
  }, "See work first")), /*#__PURE__*/React.createElement("p", {
    className: "text-[11px] mt-4",
    style: {
      color: 'rgba(222,219,200,0.32)'
    }
  }, "Free 20-min strategy call \xB7 Fixed scope \xB7 No surprises")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] uppercase tracking-[0.24em] mb-5",
    style: {
      color: 'rgba(229,197,128,0.5)'
    }
  }, "Everything included"), /*#__PURE__*/React.createElement("ul", {
    className: "grid grid-cols-1 sm:grid-cols-2 gap-3.5"
  }, BUNDLE_FEATURES.map((f, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    className: "flex items-start gap-3 text-sm",
    style: {
      color: 'rgba(222,219,200,0.82)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mt-[2px] w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0",
    style: {
      background: 'rgba(229,197,128,0.12)',
      color: '#E5C580'
    }
  }, /*#__PURE__*/React.createElement(Check, {
    size: 10,
    strokeWidth: 2.5
  })), /*#__PURE__*/React.createElement("span", null, f)))), /*#__PURE__*/React.createElement("div", {
    className: "mt-8 pt-6 border-t flex items-center gap-6 text-xs flex-wrap",
    style: {
      borderColor: 'rgba(229,197,128,0.12)',
      color: 'rgba(222,219,200,0.38)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement(Check, {
    size: 10
  }), " Fixed pricing"), /*#__PURE__*/React.createElement("span", {
    className: "flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement(Check, {
    size: 10
  }), " No retainer lock-in"), /*#__PURE__*/React.createElement("span", {
    className: "flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement(Check, {
    size: 10
  }), " Delivered in under 1 week"))))));
}
function BrandPackageCard({
  onPick
}) {
  return /*#__PURE__*/React.createElement(motion.div, {
    initial: {
      opacity: 0,
      y: 24
    },
    animate: {
      opacity: 1,
      y: 0
    },
    transition: {
      duration: 0.6,
      ease: [0.22, 0.8, 0.2, 1]
    },
    className: "relative mb-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute -inset-[1px] rounded-3xl pointer-events-none",
    style: {
      background: 'linear-gradient(135deg, rgba(229,197,128,0.6), rgba(222,219,200,0.08) 50%, rgba(229,197,128,0.4))'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "relative grain rounded-3xl overflow-hidden p-8 md:p-10",
    style: {
      background: 'linear-gradient(135deg, #1d1b10, #161510 50%, #1a1913)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute top-0 right-0 w-[460px] h-[460px] pointer-events-none",
    style: {
      background: 'radial-gradient(circle at center, rgba(229,197,128,0.1), transparent 65%)',
      transform: 'translate(25%, -30%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "mb-6"
  }, /*#__PURE__*/React.createElement("span", {
    className: "inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] px-3 py-1.5 rounded-full border font-bold",
    style: {
      background: 'rgba(229,197,128,0.12)',
      color: '#E5C580',
      borderColor: 'rgba(229,197,128,0.28)'
    }
  }, /*#__PURE__*/React.createElement(Star, {
    size: 9
  }), "Best Value \xB7 Most Recommended")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] uppercase tracking-[0.24em] mb-3",
    style: {
      color: 'rgba(229,197,128,0.55)'
    }
  }, "Complete Brand Setup Package"), /*#__PURE__*/React.createElement("div", {
    className: "text-5xl md:text-6xl font-medium tracking-tighter text-ink mb-1",
    style: {
      lineHeight: 1
    }
  }, "$800"), /*#__PURE__*/React.createElement("div", {
    className: "text-sm mb-5",
    style: {
      color: 'rgba(222,219,200,0.4)'
    }
  }, "One-time \xB7 Delivered in under 1 week, guaranteed"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm md:text-base leading-relaxed mb-7",
    style: {
      color: 'rgba(222,219,200,0.72)'
    }
  }, "Everything your business needs to look professional from day one \u2014 website, logo, flyers, brand colors, and social graphics. No hunting down five different freelancers. We handle it all, start to finish."), /*#__PURE__*/React.createElement("div", {
    className: "hero-cta"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "hero-cta__go",
    onClick: () => onPick && onPick(BRAND_PACKAGE, 'checkout')
  }, /*#__PURE__*/React.createElement("span", null, "Get My Brand Package"), /*#__PURE__*/React.createElement(ArrowRight, {
    size: 16
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "hero-cta__see",
    onClick: () => onPick && onPick(BRAND_PACKAGE, 'showcase')
  }, "See work first")), /*#__PURE__*/React.createElement("p", {
    className: "text-[11px] mt-4",
    style: {
      color: 'rgba(222,219,200,0.3)'
    }
  }, "Fixed price \xB7 No hidden fees \xB7 Revisions included")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] uppercase tracking-[0.24em] mb-4",
    style: {
      color: 'rgba(229,197,128,0.5)'
    }
  }, "What's included"), /*#__PURE__*/React.createElement("ul", {
    className: "grid grid-cols-1 sm:grid-cols-2 gap-3"
  }, BRAND_FEATURES.map((f, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    className: "flex items-start gap-3 text-sm",
    style: {
      color: 'rgba(222,219,200,0.85)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mt-[2px] w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0",
    style: {
      background: 'rgba(229,197,128,0.13)',
      color: '#E5C580'
    }
  }, /*#__PURE__*/React.createElement(Check, {
    size: 10,
    strokeWidth: 2.5
  })), /*#__PURE__*/React.createElement("span", null, f)))), /*#__PURE__*/React.createElement("div", {
    className: "mt-7 pt-5 border-t flex items-center gap-5 text-xs flex-wrap",
    style: {
      borderColor: 'rgba(229,197,128,0.12)',
      color: 'rgba(222,219,200,0.38)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement(Check, {
    size: 10
  }), " Fixed $800"), /*#__PURE__*/React.createElement("span", {
    className: "flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement(Check, {
    size: 10
  }), " Revisions included"), /*#__PURE__*/React.createElement("span", {
    className: "flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement(Check, {
    size: 10
  }), " Delivered in under 1 week"))))));
}

// ── MAIN SECTION ──────────────────────────────────────────

function Pricing() {
  const [activeTab, setActiveTab] = React.useState('websites');
  // One modal for the whole section — the plan and mode decide what it shows.
  const [pick, setPick] = React.useState(null);
  const openPick = React.useCallback((plan, mode) => setPick({
    plan,
    mode
  }), []);
  const closePick = React.useCallback(() => setPick(null), []);
  const tab = TABS.find(t => t.id === activeTab);
  return /*#__PURE__*/React.createElement("section", {
    id: "pricing",
    "data-screen-label": "02 Pricing",
    className: "relative bg-black py-24 md:py-32"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-noise opacity-70 pointer-events-none"
  }), /*#__PURE__*/React.createElement("div", {
    className: "relative max-w-7xl mx-auto px-5 sm:px-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-12 md:mb-16"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary/55"
  }, /*#__PURE__*/React.createElement("span", {
    className: "inline-block w-6 h-px bg-primary/30"
  }), /*#__PURE__*/React.createElement("span", null, "02 \xB7 Services & Pricing")), /*#__PURE__*/React.createElement("div", {
    className: "hidden sm:flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-[0.22em] text-primary/35"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-1.5 h-1.5 rounded-full bg-primary/40"
  }), "Fixed-scope \xB7 No surprises")), /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl mb-12 md:mb-16"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[0.95] text-ink"
  }, /*#__PURE__*/React.createElement(WordsPullUpMultiStyle, {
    segments: [{
      text: 'Everything your business',
      className: ''
    }, {
      text: 'needs to grow.',
      className: 'font-serif italic text-primary/80',
      breakAfter: true
    }]
  })), /*#__PURE__*/React.createElement(FadeUp, {
    delay: 0.2
  }, /*#__PURE__*/React.createElement("p", {
    className: "mt-6 max-w-xl text-primary/55 text-sm md:text-base leading-relaxed"
  }, "Pick a service below. Every plan is fixed scope, delivered in under 1 week \u2014 guaranteed \u2014 and built to produce real results. More leads, more customers, more growth."), /*#__PURE__*/React.createElement("div", {
    className: "mt-5 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] px-3 py-1.5 rounded-full border border-emerald-500/25 text-emerald-400/80",
    style: {
      background: 'rgba(52,211,153,0.06)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"
  }), "Every build delivered in under 1 week \u2014 guaranteed"))), /*#__PURE__*/React.createElement(FadeUp, {
    delay: 0.25
  }, /*#__PURE__*/React.createElement("div", {
    className: "overflow-x-auto no-scrollbar mb-10 md:mb-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inline-flex gap-1.5 p-1.5 bg-white/[0.03] rounded-2xl border border-white/5 min-w-max"
  }, TABS.map(t => {
    const Icon = t.icon;
    const isActive = activeTab === t.id;
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      onClick: () => setActiveTab(t.id),
      className: "relative flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200 flex-shrink-0",
      style: {
        color: isActive ? '#000' : 'rgba(225,224,204,0.5)'
      }
    }, isActive && /*#__PURE__*/React.createElement(motion.div, {
      layoutId: "tab-active",
      className: "absolute inset-0 rounded-xl bg-primary",
      transition: {
        type: 'spring',
        bounce: 0.18,
        duration: 0.4
      }
    }), /*#__PURE__*/React.createElement("span", {
      className: "relative flex items-center gap-2"
    }, /*#__PURE__*/React.createElement(Icon, {
      size: 14
    }), /*#__PURE__*/React.createElement("span", {
      className: "hidden sm:inline"
    }, t.label), /*#__PURE__*/React.createElement("span", {
      className: "sm:hidden"
    }, t.label.split(' ')[0])));
  })))), /*#__PURE__*/React.createElement(AnimatePresence, {
    mode: "wait"
  }, /*#__PURE__*/React.createElement(motion.div, {
    key: activeTab,
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
      duration: 0.3,
      ease: [0.22, 0.8, 0.2, 1]
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start gap-4 mb-10 md:mb-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-9 h-9 rounded-xl border border-white/8 bg-black/50 flex items-center justify-center flex-shrink-0 mt-0.5",
    style: {
      color: tab.accent
    }
  }, /*#__PURE__*/React.createElement(tab.icon, {
    size: 16
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-[9px] uppercase tracking-[0.3em] text-primary/38 mb-1"
  }, tab.tag, " \xB7 ", tab.label), /*#__PURE__*/React.createElement("p", {
    className: "text-sm md:text-base text-primary/60 max-w-2xl leading-relaxed"
  }, tab.description))), activeTab === 'websites' && /*#__PURE__*/React.createElement(BrandPackageCard, {
    onPick: openPick
  }), tab.plans && /*#__PURE__*/React.createElement(PlanDeck, {
    plans: tab.plans,
    onPick: openPick
  }), activeTab === 'addons' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
  }, ADDONS.map((a, i) => /*#__PURE__*/React.createElement(AddonCard, {
    key: a.id,
    addon: a,
    i: i
  }))), /*#__PURE__*/React.createElement(BundleCard, {
    onPick: openPick
  })))), /*#__PURE__*/React.createElement("div", {
    className: "mt-14 md:mt-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-primary/38 border-t border-white/5 pt-7"
  }, /*#__PURE__*/React.createElement("div", null, "All plans include async communication, milestone check-ins, and a clean handoff package."), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-5 flex-wrap"
  }, /*#__PURE__*/React.createElement("span", {
    className: "flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement(Check, {
    size: 11
  }), " Fixed pricing"), /*#__PURE__*/React.createElement("span", {
    className: "flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement(Check, {
    size: 11
  }), " No retainer lock-in"), /*#__PURE__*/React.createElement("span", {
    className: "flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement(Check, {
    size: 11
  }), " Delivered in under 1 week")))), pick && /*#__PURE__*/React.createElement(CheckoutModal, {
    plan: pick.plan,
    mode: pick.mode,
    onClose: closePick
  }));
}
Object.assign(window, {
  Pricing
});