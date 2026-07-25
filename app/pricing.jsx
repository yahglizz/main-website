/* Section 2: Services / Pricing — tabbed offer layout */

// ── DATA ──────────────────────────────────────────────────

const WEBSITE_PLANS = [
  {
    id: 'web-starter',
    title: 'Starter',
    price: '$500',
    timeline: '3–5 days',
    accent: '#DEDBC8',
    cta: 'Get started',
    features: [
      '1-page high-converting website',
      'Mobile responsive design',
      'Lead capture form',
      'Clean modern UI',
      'Fast turnaround',
    ],
  },
  {
    id: 'web-growth',
    title: 'Growth',
    price: '$1,200',
    timeline: '1–2 weeks',
    accent: '#DEDBC8',
    featured: true,
    cta: 'Start this build',
    features: [
      '3–5 page website',
      'CRM integration',
      'Lead capture system',
      'Booking / calendar setup',
      'Conversion-focused design',
    ],
  },
  {
    id: 'web-premium',
    title: 'Premium',
    price: '$2,000+',
    timeline: '2–3 weeks',
    accent: '#DEDBC8',
    cta: 'Request a quote',
    features: [
      'Fully custom website',
      'Advanced UI/UX design',
      'Funnel-ready structure',
      'Optimized performance',
      'Priority delivery',
    ],
  },
];

const ADS_PLANS = [
  {
    id: 'ads-starter',
    title: 'Starter Ads',
    price: '$300',
    priceSub: 'setup + $300/mo',
    timeline: 'Live in 3–5 days',
    accent: '#C9A8FF',
    cta: 'Launch ads',
    features: [
      'Campaign setup & launch',
      '1–2 ad creatives',
      'Basic audience targeting',
      'Monthly performance report',
    ],
  },
  {
    id: 'ads-growth',
    title: 'Growth Ads',
    price: '$500',
    priceSub: 'setup + $500/mo',
    timeline: 'Live in 5–7 days',
    accent: '#C9A8FF',
    featured: true,
    cta: 'Start growing',
    features: [
      'Multiple ad creatives',
      'Retargeting setup',
      'Conversion tracking',
      'Weekly optimization',
      'Audience A/B testing',
    ],
  },
  {
    id: 'ads-scale',
    title: 'Scale Ads',
    price: '$1,000+/mo',
    timeline: 'Custom timeline',
    accent: '#C9A8FF',
    cta: "Let's scale",
    features: [
      'Full campaign system',
      'Funnel integration',
      'Advanced creative testing',
      'Scaling strategy',
      'Dedicated ad manager',
    ],
  },
];

const AUTO_PLANS = [
  {
    id: 'auto-basic',
    title: 'Basic Automation',
    price: '$300–$500',
    timeline: '3–5 days',
    accent: '#7FE0B9',
    cta: 'Get automated',
    features: [
      'SMS / email follow-up system',
      'Lead capture automation',
      'Basic workflow setup',
      'Notification alerts',
    ],
  },
  {
    id: 'auto-growth',
    title: 'Growth Automation',
    price: '$800–$1,500',
    timeline: '1–2 weeks',
    accent: '#7FE0B9',
    featured: true,
    cta: 'Build my system',
    features: [
      'CRM pipeline setup',
      'Multi-step follow-up sequences',
      'Booking + reminder system',
      'Lead nurturing workflows',
      'Missed call text-back',
    ],
  },
  {
    id: 'auto-advanced',
    title: 'Advanced Systems',
    price: '$2,000+',
    timeline: '2–4 weeks',
    accent: '#7FE0B9',
    cta: 'Request a build',
    features: [
      'AI chatbot integration',
      'Full backend automation',
      'Custom workflow architecture',
      'System & API integrations',
      'Ongoing optimization',
    ],
  },
];

const ADDONS = [
  {
    id: 'retainer',
    title: 'Monthly Retainer',
    price: '$97–$297/mo',
    icon: Layers,
    accent: '#DEDBC8',
    description: 'Keep your site running, updated, and converting every month — without lifting a finger.',
    features: [
      'Hosting & uptime monitoring',
      'Content & maintenance updates',
      'Priority support',
      'Automation tweaks included',
    ],
  },
  {
    id: 'revamp',
    title: 'Website Revamp',
    price: '$300–$800',
    icon: Sparkles,
    accent: '#9FC6FF',
    description: 'Your old site is costing you customers. We redesign it for speed, trust, and conversions.',
    features: [
      'Full visual redesign',
      'Mobile & speed optimization',
      'Updated copy & structure',
      'Fast turnaround',
    ],
  },
];

const BUNDLE_FEATURES = [
  'New website build (3–5 pages)',
  'Logo & branding refresh',
  'CRM setup & configuration',
  'Full automation system',
  'Ad campaign setup',
  'Lead capture + follow-up system',
];

const BRAND_FEATURES = [
  'Custom website (up to 3 pages)',
  'Professional logo design',
  'Business flyers (2–3 designs)',
  'Brand color palette & style guide',
  'Social media graphics kit',
  'Fast 1–2 week delivery',
];

const TABS = [
  {
    id: 'websites',
    label: 'Websites',
    icon: Globe,
    accent: '#DEDBC8',
    tag: '01',
    description: 'High-converting websites built fast. Mobile-first, lead-capture-ready, and designed to make your business look like the obvious choice.',
    plans: WEBSITE_PLANS,
  },
  {
    id: 'ads',
    label: 'Ad Campaigns',
    icon: Zap,
    accent: '#C9A8FF',
    tag: '02',
    description: 'Paid ads that bring in real customers, not just clicks. We set up, manage, and optimize so you can focus on running your business.',
    plans: ADS_PLANS,
  },
  {
    id: 'automation',
    label: 'AI Automation',
    icon: Cpu,
    accent: '#7FE0B9',
    tag: '03',
    description: 'Systems that follow up, book appointments, and nurture leads while you sleep. Stop chasing — let automation do the heavy lifting.',
    plans: AUTO_PLANS,
  },
  {
    id: 'addons',
    label: 'Add-Ons',
    icon: Layers,
    accent: '#E5C580',
    tag: '04',
    description: 'Bolt-on services to maintain, refresh, or supercharge what you\'ve already built.',
  },
];

// ── CARD COMPONENTS ───────────────────────────────────────

function CardCheck({ color }) {
  return (
    <span
      className="mt-[2px] w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 border border-white/10"
      style={{ background: 'rgba(0,0,0,0.55)', color: color || '#DEDBC8' }}
    >
      <Check size={9} strokeWidth={2.6} />
    </span>
  );
}

function PlanCard({ plan, i, active }) {
  const isFeatured = plan.featured;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.08, duration: 0.55, ease: [0.22, 0.8, 0.2, 1] }}
      className={[
        'relative grain rounded-2xl md:rounded-3xl p-6 md:p-8 flex flex-col h-full',
        'border transition-colors',
        isFeatured
          ? 'bg-gradient-to-b from-[#282621] to-[#1a1917] border-primary/35'
          : 'bg-card border-white/5 hover:border-white/15',
        // In the deck, the front card is called out with a gold plate edge.
        active ? 'deck-card-active' : '',
      ].join(' ')}
    >
      {isFeatured && (
        <span className="absolute -top-3 left-6 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] bg-primary text-black px-3 py-1 rounded-full font-bold">
          Most Popular
        </span>
      )}

      <div className="mb-6">
        <div className="text-[10px] uppercase tracking-[0.24em] text-primary/45">{plan.title}</div>
      </div>

      <div className="mb-1">
        <span className="text-4xl md:text-5xl font-medium tracking-tighter text-ink">{plan.price}</span>
      </div>
      {plan.priceSub && (
        <div className="text-xs text-primary/40 mb-4 mt-1">{plan.priceSub}</div>
      )}

      <div className="h-px bg-white/5 my-5" />

      <ul className="space-y-3 flex-1 mb-8">
        {plan.features.map((f, k) => (
          <li key={k} className="flex items-start gap-3 text-sm text-primary/78">
            <CardCheck color={plan.accent} />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        className={[
          'group inline-flex items-center justify-between rounded-full transition-colors w-full',
          isFeatured
            ? 'bg-primary text-black pl-5 pr-1.5 py-1.5 hover:bg-white'
            : 'bg-black/50 border border-white/10 text-ink pl-5 pr-1.5 py-1.5 hover:border-white/25',
        ].join(' ')}
      >
        <span className="text-sm font-medium">{plan.cta}</span>
        <span className={[
          'w-9 h-9 rounded-full flex items-center justify-center transition-transform group-hover:scale-110',
          isFeatured ? 'bg-black text-primary' : 'bg-primary text-black',
        ].join(' ')}>
          <ArrowRight size={14} />
        </span>
      </button>
    </motion.div>
  );
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
const DECK_STEPS = (t) => Math.round(t * 8) / 8;

function PlanDeck({ plans }) {
  // Open on the featured tier — that's the one worth landing on.
  const [idx, setIdx] = React.useState(() => {
    const f = plans.findIndex(p => p.featured);
    return f < 0 ? 0 : f;
  });
  const [metrics, setMetrics] = React.useState({ step: 0, offset: 0 });
  const wrapRef = React.useRef(null);
  // A drag ends with a click event on whatever was under the finger. Without
  // this the swipe would advance once, then the trailing click would advance
  // it again.
  const draggedRef = React.useRef(false);
  const n = plans.length;

  const go = (d) => setIdx(i => Math.min(n - 1, Math.max(0, i + d)));

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
      setMetrics({ step: w + gap, offset: (wrap.offsetWidth - w) / 2 });
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
    if (throw_ < -metrics.step * 0.22) go(1);
    else if (throw_ > metrics.step * 0.22) go(-1);
    // Clear on the next tick — after the click this drag is about to produce.
    setTimeout(() => { draggedRef.current = false; }, 0);
  };

  const onSlideClick = (e, i) => {
    if (draggedRef.current) return;
    // Never hijack a real control — the CTA inside the card has its own job.
    if (e.target.closest('button, a')) return;
    if (i === idx) go(1);       // tap the front card to move on
    else setIdx(i);             // tap a neighbour to bring it forward
  };

  return (
    <div
      className="relative"
      role="group"
      aria-roledescription="carousel"
      aria-label="Plans"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
      }}
    >
      <div ref={wrapRef} className="overflow-hidden -mx-5 sm:-mx-8 px-0 pt-4 pb-2">
        <motion.div
          data-track
          className="flex gap-4 md:gap-6 items-stretch cursor-grab active:cursor-grabbing"
          drag="x"
          dragElastic={0.12}
          onDragStart={() => { draggedRef.current = true; }}
          dragConstraints={{
            left: metrics.offset - (n - 1) * metrics.step,
            right: metrics.offset,
          }}
          onDragEnd={onDragEnd}
          animate={{ x }}
          transition={{ duration: 0.42, ease: DECK_STEPS }}
        >
          {plans.map((p, i) => (
            <motion.div
              data-slide
              key={p.id}
              onClick={(e) => onSlideClick(e, i)}
              className="flex-none w-[82%] sm:w-[58%] lg:w-[34%] xl:w-[30%]"
              animate={{ scale: i === idx ? 1 : 0.93, opacity: i === idx ? 1 : 0.5 }}
              transition={{ duration: 0.42, ease: DECK_STEPS }}
              aria-hidden={i === idx ? undefined : true}
            >
              <PlanCard plan={p} i={i} active={i === idx} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Controls */}
      <div className="mt-7 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={idx === 0}
            aria-label="Previous plan"
            className="deck-arrow"
          >
            <ArrowRight size={15} style={{ transform: 'rotate(180deg)' }} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={idx === n - 1}
            aria-label="Next plan"
            className="deck-arrow"
          >
            <ArrowRight size={15} />
          </button>
          <span className="deck-count ml-1" aria-live="polite">
            {String(idx + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="deck-hint">
            Tap or swipe<i className="pixel-caret ml-2" />
          </span>
          <div className="flex items-center gap-1.5">
            {plans.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setIdx(i)}
                aria-label={`Show ${p.title}`}
                aria-current={i === idx ? 'true' : undefined}
                className={'deck-dot' + (i === idx ? ' is-active' : '')}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AddonCard({ addon, i }) {
  const Icon = addon.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.08, duration: 0.55, ease: [0.22, 0.8, 0.2, 1] }}
      className="grain bg-card rounded-2xl md:rounded-3xl border border-white/5 hover:border-white/15 transition-colors p-6 md:p-8 flex flex-col"
    >
      <div className="flex items-start gap-4 mb-5">
        <div
          className="w-10 h-10 rounded-xl bg-black/60 border border-white/8 flex items-center justify-center flex-shrink-0"
          style={{ color: addon.accent }}
        >
          <Icon size={18} />
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-[0.22em] text-primary/45 mb-1">{addon.title}</div>
          <div className="text-2xl md:text-3xl font-medium tracking-tight text-ink">{addon.price}</div>
        </div>
      </div>
      <p className="text-sm text-primary/58 leading-relaxed mb-5">{addon.description}</p>
      <ul className="space-y-2.5 flex-1 mb-7">
        {addon.features.map((f, k) => (
          <li key={k} className="flex items-center gap-3 text-sm text-primary/72">
            <Check size={12} className="text-primary/40 flex-shrink-0" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary/60 hover:text-ink transition-colors"
      >
        Get started <ArrowRight size={11} />
      </button>
    </motion.div>
  );
}

function BundleCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.18, duration: 0.65, ease: [0.22, 0.8, 0.2, 1] }}
      className="relative mt-5"
    >
      <div
        className="absolute -inset-[1px] rounded-3xl pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(229,197,128,0.55), rgba(222,219,200,0.08) 50%, rgba(229,197,128,0.35))' }}
      />
      <div
        className="relative grain rounded-3xl overflow-hidden p-8 md:p-12"
        style={{ background: 'linear-gradient(135deg, #1d1b10, #161510 50%, #1a1913)' }}
      >
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at center, rgba(229,197,128,0.09), transparent 65%)', transform: 'translate(30%, -30%)' }}
        />
        <div className="mb-7">
          <span
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] px-3 py-1.5 rounded-full border font-medium"
            style={{ background: 'rgba(229,197,128,0.1)', color: '#E5C580', borderColor: 'rgba(229,197,128,0.25)' }}
          >
            <Star size={9} />
            Best Value · Business Rebuild System
          </span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <div className="text-[10px] uppercase tracking-[0.24em] mb-3" style={{ color: 'rgba(229,197,128,0.55)' }}>Complete Business Package</div>
            <div className="text-4xl md:text-5xl font-medium tracking-tighter text-ink mb-2" style={{ lineHeight: 1 }}>$1,500–$3,000</div>
            <div className="text-sm mb-6" style={{ color: 'rgba(222,219,200,0.4)' }}>One-time investment · Fast delivery</div>
            <p className="text-sm md:text-base leading-relaxed mb-8" style={{ color: 'rgba(222,219,200,0.7)' }}>
              The complete system to get your business visible online, capturing leads automatically, and following up without you lifting a finger. Website, branding, CRM, automation, and ads — all built together.
            </p>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group inline-flex items-center gap-3 rounded-full pl-6 pr-1.5 py-1.5 font-medium text-sm transition-colors"
              style={{ background: '#E5C580', color: '#000' }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#fff'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#E5C580'}
            >
              <span>Build My Business System</span>
              <span className="rounded-full w-10 h-10 flex items-center justify-center transition-transform group-hover:scale-110" style={{ background: '#000', color: '#E5C580' }}>
                <ArrowRight size={16} />
              </span>
            </button>
            <p className="text-[11px] mt-4" style={{ color: 'rgba(222,219,200,0.32)' }}>Free 20-min strategy call · Fixed scope · No surprises</p>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.24em] mb-5" style={{ color: 'rgba(229,197,128,0.5)' }}>Everything included</div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {BUNDLE_FEATURES.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-sm" style={{ color: 'rgba(222,219,200,0.82)' }}>
                  <span className="mt-[2px] w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(229,197,128,0.12)', color: '#E5C580' }}>
                    <Check size={10} strokeWidth={2.5} />
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-6 border-t flex items-center gap-6 text-xs flex-wrap" style={{ borderColor: 'rgba(229,197,128,0.12)', color: 'rgba(222,219,200,0.38)' }}>
              <span className="flex items-center gap-1.5"><Check size={10} /> Fixed pricing</span>
              <span className="flex items-center gap-1.5"><Check size={10} /> No retainer lock-in</span>
              <span className="flex items-center gap-1.5"><Check size={10} /> Delivered in 1 week or less</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function BrandPackageCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 0.8, 0.2, 1] }}
      className="relative mb-5"
    >
      {/* Gradient border ring */}
      <div
        className="absolute -inset-[1px] rounded-3xl pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(229,197,128,0.6), rgba(222,219,200,0.08) 50%, rgba(229,197,128,0.4))' }}
      />

      {/* Card body */}
      <div
        className="relative grain rounded-3xl overflow-hidden p-8 md:p-10"
        style={{ background: 'linear-gradient(135deg, #1d1b10, #161510 50%, #1a1913)' }}
      >
        {/* Radial glow */}
        <div
          className="absolute top-0 right-0 w-[460px] h-[460px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at center, rgba(229,197,128,0.1), transparent 65%)', transform: 'translate(25%, -30%)' }}
        />

        {/* Badge */}
        <div className="mb-6">
          <span
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] px-3 py-1.5 rounded-full border font-bold"
            style={{ background: 'rgba(229,197,128,0.12)', color: '#E5C580', borderColor: 'rgba(229,197,128,0.28)' }}
          >
            <Star size={9} />
            Best Value · Most Recommended
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">

          {/* Left — pitch + CTA */}
          <div>
            <div className="text-[10px] uppercase tracking-[0.24em] mb-3" style={{ color: 'rgba(229,197,128,0.55)' }}>
              Complete Brand Setup Package
            </div>
            <div className="text-5xl md:text-6xl font-medium tracking-tighter text-ink mb-1" style={{ lineHeight: 1 }}>
              $800
            </div>
            <div className="text-sm mb-5" style={{ color: 'rgba(222,219,200,0.4)' }}>
              One-time · Delivered in 1 week or less, guaranteed
            </div>
            <p className="text-sm md:text-base leading-relaxed mb-7" style={{ color: 'rgba(222,219,200,0.72)' }}>
              Everything your business needs to look professional from day one — website, logo, flyers, brand colors, and social graphics. No hunting down five different freelancers. We handle it all, start to finish.
            </p>

            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group inline-flex items-center gap-3 rounded-full pl-6 pr-1.5 py-1.5 font-medium text-sm transition-colors"
              style={{ background: '#E5C580', color: '#000' }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#fff'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#E5C580'}
            >
              <span>Get My Brand Package</span>
              <span
                className="rounded-full w-10 h-10 flex items-center justify-center transition-transform group-hover:scale-110"
                style={{ background: '#000', color: '#E5C580' }}
              >
                <ArrowRight size={16} />
              </span>
            </button>

            <p className="text-[11px] mt-4" style={{ color: 'rgba(222,219,200,0.3)' }}>
              Fixed price · No hidden fees · Revisions included
            </p>
          </div>

          {/* Right — feature list */}
          <div>
            <div className="text-[10px] uppercase tracking-[0.24em] mb-4" style={{ color: 'rgba(229,197,128,0.5)' }}>
              What's included
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BRAND_FEATURES.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-sm" style={{ color: 'rgba(222,219,200,0.85)' }}>
                  <span
                    className="mt-[2px] w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(229,197,128,0.13)', color: '#E5C580' }}
                  >
                    <Check size={10} strokeWidth={2.5} />
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <div
              className="mt-7 pt-5 border-t flex items-center gap-5 text-xs flex-wrap"
              style={{ borderColor: 'rgba(229,197,128,0.12)', color: 'rgba(222,219,200,0.38)' }}
            >
              <span className="flex items-center gap-1.5"><Check size={10} /> Fixed $800</span>
              <span className="flex items-center gap-1.5"><Check size={10} /> Revisions included</span>
              <span className="flex items-center gap-1.5"><Check size={10} /> Delivered in 1 week or less</span>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}

// ── MAIN SECTION ──────────────────────────────────────────

function Pricing() {
  const [activeTab, setActiveTab] = React.useState('websites');
  const tab = TABS.find(t => t.id === activeTab);

  return (
    <section id="pricing" data-screen-label="02 Pricing" className="relative bg-black py-24 md:py-32">
      <div className="absolute inset-0 bg-noise opacity-70 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">

        {/* Section label */}
        <div className="flex items-center justify-between mb-12 md:mb-16">
          <div className="flex items-center gap-3 text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary/55">
            <span className="inline-block w-6 h-px bg-primary/30" />
            <span>02 · Services & Pricing</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-[0.22em] text-primary/35">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
            Fixed-scope · No surprises
          </div>
        </div>

        {/* Headline */}
        <div className="max-w-4xl mb-12 md:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[0.95] text-ink">
            <WordsPullUpMultiStyle
              segments={[
                { text: 'Everything your business', className: '' },
                { text: 'needs to grow.', className: 'font-serif italic text-primary/80', breakAfter: true },
              ]}
            />
          </h2>
          <FadeUp delay={0.2}>
            <p className="mt-6 max-w-xl text-primary/55 text-sm md:text-base leading-relaxed">
              Pick a service below. Every plan is fixed scope, delivered in 1 week or less — guaranteed — and built to produce real results. More leads, more customers, more growth.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] px-3 py-1.5 rounded-full border border-emerald-500/25 text-emerald-400/80" style={{ background: 'rgba(52,211,153,0.06)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Delivered in 1 week or less — guaranteed
            </div>
          </FadeUp>
        </div>

        {/* ── TAB BAR ── */}
        <FadeUp delay={0.25}>
          <div className="overflow-x-auto no-scrollbar mb-10 md:mb-12">
            <div className="inline-flex gap-1.5 p-1.5 bg-white/[0.03] rounded-2xl border border-white/5 min-w-max">
              {TABS.map((t) => {
                const Icon = t.icon;
                const isActive = activeTab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className="relative flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200 flex-shrink-0"
                    style={{ color: isActive ? '#000' : 'rgba(225,224,204,0.5)' }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="tab-active"
                        className="absolute inset-0 rounded-xl bg-primary"
                        transition={{ type: 'spring', bounce: 0.18, duration: 0.4 }}
                      />
                    )}
                    <span className="relative flex items-center gap-2">
                      <Icon size={14} />
                      <span className="hidden sm:inline">{t.label}</span>
                      <span className="sm:hidden">{t.label.split(' ')[0]}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </FadeUp>

        {/* ── TAB CONTENT (animated on switch) ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 0.8, 0.2, 1] }}
          >
            {/* Tab description header */}
            <div className="flex items-start gap-4 mb-10 md:mb-12">
              <div
                className="w-9 h-9 rounded-xl border border-white/8 bg-black/50 flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ color: tab.accent }}
              >
                <tab.icon size={16} />
              </div>
              <div>
                <div className="text-[9px] uppercase tracking-[0.3em] text-primary/38 mb-1">
                  {tab.tag} · {tab.label}
                </div>
                <p className="text-sm md:text-base text-primary/60 max-w-2xl leading-relaxed">
                  {tab.description}
                </p>
              </div>
            </div>

            {/* Brand package hero card — top of Websites tab only */}
            {activeTab === 'websites' && <BrandPackageCard />}

            {/* Plan cards — a swipeable deck (drag, tap, arrows, arrow keys) */}
            {tab.plans && <PlanDeck plans={tab.plans} />}

            {/* Add-ons tab — 2 addon cards + bundle */}
            {activeTab === 'addons' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {ADDONS.map((a, i) => (
                    <AddonCard key={a.id} addon={a} i={i} />
                  ))}
                </div>
                <BundleCard />
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Fine print */}
        <div className="mt-14 md:mt-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-primary/38 border-t border-white/5 pt-7">
          <div>All plans include async communication, milestone check-ins, and a clean handoff package.</div>
          <div className="flex items-center gap-5 flex-wrap">
            <span className="flex items-center gap-1.5"><Check size={11} /> Fixed pricing</span>
            <span className="flex items-center gap-1.5"><Check size={11} /> No retainer lock-in</span>
            <span className="flex items-center gap-1.5"><Check size={11} /> US based</span>
          </div>
        </div>

      </div>
    </section>
  );
}

Object.assign(window, { Pricing });
