/* Section 2: Services / Pricing — one offer per tab.

   Each tab shows a single "starting at" offer on its own pixel-art scene,
   rather than a ladder of tiers. Scope moves the final number; the card says
   where it starts and what that start includes. */

// ── DATA ──────────────────────────────────────────────────

/* Every offer opens the checkout modal, which only needs id, title, price,
   priceSub, timeline, cta and features. The rest is card copy. */
const OFFERS = {
  websites: {
    id: 'brand-package',
    badge: 'Recommended · Start here',
    title: 'Complete Brand Setup Package',
    price: '$800',
    timeline: 'Under 1 week',
    terms: 'One-time · Delivered in under 1 week, guaranteed',
    pitch: 'Everything your business needs to look professional from day one — website, logo, flyers, brand colors, and social graphics. No hunting down five different freelancers. We handle it all, start to finish.',
    cta: 'Get my brand package',
    features: ['Custom website (up to 3 pages)', 'Professional logo design', 'Business flyers (2–3 designs)', 'Brand color palette & style guide', 'Social media graphics kit', 'Delivered in under 1 week'],
    chips: ['From $800', 'Revisions included', 'Delivered in under 1 week'],
    fine: 'Starting price · No hidden fees · Revisions included',
    bg: 'assets/hero/pricing-forge-bg.png',
    video: 'assets/vid/pricing-forge.mp4'
  },
  ads: {
    id: 'ads-management',
    badge: 'Meta Ads · Managed for you',
    title: 'Ad Campaign Management',
    price: '$250',
    priceSub: 'per month · management',
    timeline: 'Live in under 1 week',
    terms: 'Per month · Live in under 1 week',
    pitch: 'Facebook and Instagram ads that bring in real customers, not just clicks. We build the campaign, write the creative, target your area and report back, so you can run your business.',
    cta: 'Launch my ads',
    features: ['Campaign setup & launch', '2 ad creatives per month', 'Audience targeting & setup', 'Monthly performance report', 'Live in under 1 week', 'Retargeting & weekly optimization as you scale'],
    chips: ['From $250/mo', 'No lock-in', 'Live in under 1 week'],
    fine: 'Starting price · Management fee only',
    spendNote: true,
    bg: 'assets/hero/pricing-ads-bg.png',
    video: 'assets/vid/pricing-ads.mp4'
  },
  automation: {
    id: 'automation-build',
    badge: 'AI Automation · Works while you sleep',
    title: 'Lead Follow-Up Automation',
    price: '$250',
    priceSub: 'one-time build',
    timeline: 'Under 1 week',
    terms: 'One-time build · Delivered in under 1 week',
    pitch: 'Stop losing leads you never got back to. Every new inquiry gets an instant reply, missed calls get a text back, and you get pinged the second someone is ready to book.',
    cta: 'Get automated',
    features: ['Instant SMS / email reply to new leads', 'Lead capture automation', 'Missed-call text-back', 'Notification alerts to your phone', 'Delivered in under 1 week', 'Add CRM, booking & AI receptionist as you grow'],
    chips: ['From $250', 'One-time build', 'Delivered in under 1 week'],
    fine: 'Starting price · No hidden fees · No retainer',
    bg: 'assets/hero/pricing-automation-bg.png'
  },
  system: {
    id: 'bundle-package',
    badge: 'Business Rebuild System',
    best: true,
    title: 'Complete Business Package',
    price: '$1,200',
    timeline: 'Under 1 week',
    terms: 'One-time · Delivered in under 1 week',
    pitch: 'The complete system to get your business visible online, capturing leads automatically, and following up without you lifting a finger. Website, branding, CRM, automation, and ads — all built together.',
    cta: 'Build my business system',
    features: ['New website build (3–5 pages)', 'Logo & branding refresh', 'CRM setup & configuration', 'Full automation system', 'Ad campaign setup', 'Lead capture + follow-up system'],
    chips: ['Upfront pricing', 'No retainer lock-in', 'Delivered in under 1 week'],
    fine: 'Free 20-min strategy call · Fixed scope · No surprises',
    bg: 'assets/hero/pricing-bundle-bg.png'
  }
};
const TABS = [{
  id: 'websites',
  label: 'Websites',
  icon: Globe,
  accent: '#DEDBC8',
  tag: '01',
  description: 'High-converting websites built fast. Mobile-first, lead-capture-ready, and designed to make your business look like the obvious choice.'
}, {
  id: 'ads',
  label: 'Ad Campaigns',
  icon: Zap,
  accent: '#C9A8FF',
  tag: '02',
  description: 'Paid ads that bring in real customers, not just clicks. We set up, manage, and optimize so you can focus on running your business.'
}, {
  id: 'automation',
  label: 'AI Automation',
  icon: Cpu,
  accent: '#7FE0B9',
  tag: '03',
  description: 'Systems that follow up, book appointments, and nurture leads while you sleep. Stop chasing — let automation do the heavy lifting.'
}, {
  id: 'system',
  label: 'Full System',
  icon: Layers,
  accent: '#E5C580',
  tag: '04',
  description: 'Website, branding, CRM, automation and ads built together as one system, for businesses ready to rebuild properly.'
}];

// ── OFFER CARD ────────────────────────────────────────────

const GOLD = '#E5C580';
const INK = a => `rgba(222,219,200,${a})`;
const STILL_ONLY = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* The scene behind the card. A short looping clip when there is one (and the
   visitor hasn't asked for less motion), otherwise the still it started from. */
function OfferArt({
  offer
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "pricing-art",
    "aria-hidden": "true"
  }, offer.video && !STILL_ONLY ? /*#__PURE__*/React.createElement("video", {
    key: offer.video,
    src: offer.video,
    poster: offer.bg,
    autoPlay: true,
    muted: true,
    loop: true,
    playsInline: true,
    preload: "auto"
  }) : /*#__PURE__*/React.createElement("img", {
    src: offer.bg,
    alt: "",
    loading: "lazy",
    decoding: "async"
  }));
}
function OfferCard({
  offer,
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
    className: 'relative' + (offer.best ? ' offer-best' : '')
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute -inset-[1px] rounded-3xl pointer-events-none",
    style: {
      background: 'linear-gradient(135deg, rgba(229,197,128,0.6), rgba(222,219,200,0.08) 50%, rgba(229,197,128,0.4))'
    }
  }), offer.best && /*#__PURE__*/React.createElement("div", {
    className: "best-sticker",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", {
    className: "best-sticker__star"
  }), /*#__PURE__*/React.createElement("span", {
    className: "best-sticker__main"
  }, "Best value"), /*#__PURE__*/React.createElement("span", {
    className: "best-sticker__sub"
  }, "Everything in one build")), /*#__PURE__*/React.createElement("div", {
    className: 'pricing-featured relative grain rounded-3xl overflow-hidden ' + (offer.best ? 'p-8 md:p-12 lg:py-16' : 'p-8 md:p-10')
  }, /*#__PURE__*/React.createElement(OfferArt, {
    offer: offer
  }), /*#__PURE__*/React.createElement("div", {
    className: "pricing-featured__veil",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "pricing-featured__content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-6"
  }, /*#__PURE__*/React.createElement("span", {
    className: "inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] px-3 py-1.5 rounded-full border font-bold",
    style: {
      background: 'rgba(229,197,128,0.12)',
      color: GOLD,
      borderColor: 'rgba(229,197,128,0.28)'
    }
  }, /*#__PURE__*/React.createElement(Star, {
    size: 9
  }), offer.badge)), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-[10px] uppercase tracking-[0.24em] mb-3 font-normal",
    style: {
      color: 'rgba(229,197,128,0.55)'
    }
  }, offer.title), /*#__PURE__*/React.createElement("div", {
    className: "price-from"
  }, "Starting at"), /*#__PURE__*/React.createElement("div", {
    className: (offer.best ? 'text-6xl md:text-8xl' : 'text-5xl md:text-6xl') + ' font-medium tracking-tighter text-ink mb-1',
    style: {
      lineHeight: 1
    }
  }, offer.price), /*#__PURE__*/React.createElement("div", {
    className: "text-sm mb-5",
    style: {
      color: INK(0.4)
    }
  }, offer.terms), /*#__PURE__*/React.createElement("p", {
    className: "text-sm md:text-base leading-relaxed mb-7",
    style: {
      color: INK(0.72)
    }
  }, offer.pitch), /*#__PURE__*/React.createElement("div", {
    className: "hero-cta"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "hero-cta__go",
    onClick: () => onPick(offer, 'checkout')
  }, /*#__PURE__*/React.createElement("span", null, offer.cta), /*#__PURE__*/React.createElement(ArrowRight, {
    size: 16
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "hero-cta__see",
    onClick: () => onPick(offer, 'showcase')
  }, "See work first")), /*#__PURE__*/React.createElement("p", {
    className: "text-[11px] mt-4",
    style: {
      color: INK(0.3)
    }
  }, offer.fine)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] uppercase tracking-[0.24em] mb-4",
    style: {
      color: 'rgba(229,197,128,0.5)'
    }
  }, "What's included"), /*#__PURE__*/React.createElement("ul", {
    className: "grid grid-cols-1 sm:grid-cols-2 gap-3"
  }, offer.features.map((f, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    className: "flex items-start gap-3 text-sm",
    style: {
      color: INK(0.85)
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mt-[2px] w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0",
    style: {
      background: 'rgba(229,197,128,0.13)',
      color: GOLD
    }
  }, /*#__PURE__*/React.createElement(Check, {
    size: 10,
    strokeWidth: 2.5
  })), /*#__PURE__*/React.createElement("span", null, f)))), offer.spendNote && /*#__PURE__*/React.createElement("div", {
    className: "plan-spend mt-6"
  }, "You pay Meta directly for ad spend. This is the management fee \u2014 we never touch your budget."), /*#__PURE__*/React.createElement("div", {
    className: "mt-7 pt-5 border-t flex items-center gap-5 text-xs flex-wrap",
    style: {
      borderColor: 'rgba(229,197,128,0.12)',
      color: INK(0.38)
    }
  }, offer.chips.map(c => /*#__PURE__*/React.createElement("span", {
    key: c,
    className: "flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement(Check, {
    size: 10
  }), " ", c))))))));
}

// ── MAIN SECTION ──────────────────────────────────────────

function Pricing() {
  const [activeTab, setActiveTab] = React.useState('websites');
  // One modal for the whole section — the offer and mode decide what it shows.
  const [pick, setPick] = React.useState(null);
  const openPick = React.useCallback((plan, mode) => setPick({
    plan,
    mode
  }), []);
  const closePick = React.useCallback(() => setPick(null), []);
  const tab = TABS.find(t => t.id === activeTab);
  // "See the Full System" in The Math section opens that tab.
  React.useEffect(() => {
    const onOffer = e => {
      if (OFFERS[e.detail]) setActiveTab(e.detail);
    };
    window.addEventListener('cf:offer', onOffer);
    return () => window.removeEventListener('cf:offer', onOffer);
  }, []);
  return /*#__PURE__*/React.createElement("section", {
    id: "pricing",
    "data-screen-label": "01 Pricing",
    className: "relative bg-black py-16 md:py-32"
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
  }), /*#__PURE__*/React.createElement("span", null, "01 \xB7 Services & Pricing")), /*#__PURE__*/React.createElement("div", {
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
  }, "Pick a service below. Every build is fixed scope, delivered in under 1 week \u2014 guaranteed \u2014 and built to produce real results. More leads, more customers, more growth."), /*#__PURE__*/React.createElement("div", {
    className: "mt-5 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] px-3 py-1.5 rounded-full border border-emerald-500/25 text-emerald-400/80",
    style: {
      background: 'rgba(52,211,153,0.06)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"
  }), "Every build delivered in under 1 week \u2014 guaranteed"))), /*#__PURE__*/React.createElement(FadeUp, {
    delay: 0.25
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-10 md:mb-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 sm:inline-flex gap-1.5 p-1.5 bg-white/[0.03] rounded-2xl border border-white/5"
  }, TABS.map(t => {
    const Icon = t.icon;
    const isActive = activeTab === t.id;
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      onClick: () => setActiveTab(t.id),
      className: "relative flex items-center justify-center sm:justify-start gap-2 px-3 sm:px-5 py-3 sm:py-2.5 rounded-xl text-sm font-medium transition-colors duration-200 flex-shrink-0",
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
    }), /*#__PURE__*/React.createElement("span", null, t.label)), OFFERS[t.id].best && /*#__PURE__*/React.createElement("span", {
      className: "tab-best"
    }, "Best value"));
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
  }, tab.description))), /*#__PURE__*/React.createElement(OfferCard, {
    offer: OFFERS[activeTab],
    onPick: openPick
  }), /*#__PURE__*/React.createElement("div", {
    className: "cta-nudge"
  }, /*#__PURE__*/React.createElement("span", null, "Not sure which one fits your business?"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "hero-cta__see",
    "data-lead": "Not sure"
  }, "Get a free plan")))), /*#__PURE__*/React.createElement("div", {
    className: "mt-14 md:mt-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-primary/38 border-t border-white/5 pt-7"
  }, /*#__PURE__*/React.createElement("div", null, "Every build includes async communication, milestone check-ins, and a clean handoff package."), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-5 flex-wrap"
  }, /*#__PURE__*/React.createElement("span", {
    className: "flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement(Check, {
    size: 11
  }), " Upfront pricing"), /*#__PURE__*/React.createElement("span", {
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