/* Section 04: About — the promo video plus a short account of how the shop
   actually operates, so a first-time visitor understands the company before
   they hit the price list.

   Two columns on desktop: the story on the left, the film on the right. The
   video carries a poster frame (the brand card, ~3s in) so the slot reads as
   a deliberate title card rather than a black rectangle before playback. */

function About() {
  return /*#__PURE__*/React.createElement("section", {
    id: "about",
    "data-screen-label": "04 About",
    className: "relative bg-black py-16 md:py-32"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-noise opacity-70 pointer-events-none"
  }), /*#__PURE__*/React.createElement("div", {
    className: "relative max-w-6xl mx-auto px-5 sm:px-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-12 md:mb-16"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary/55"
  }, /*#__PURE__*/React.createElement("span", {
    className: "inline-block w-6 h-px bg-primary/30"
  }), /*#__PURE__*/React.createElement("span", null, "04 \xB7 About Us")), /*#__PURE__*/React.createElement("div", {
    className: "hidden sm:flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-[0.22em] text-primary/35"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-1.5 h-1.5 rounded-full bg-primary/40"
  }), "Two minutes \xB7 The whole operation")), /*#__PURE__*/React.createElement("div", {
    className: "ab-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[0.95] text-ink"
  }, /*#__PURE__*/React.createElement(WordsPullUpMultiStyle, {
    segments: [{
      text: 'About our',
      className: ''
    }, {
      text: 'company.',
      className: 'font-serif italic text-primary/80',
      breakAfter: true
    }]
  })), /*#__PURE__*/React.createElement(FadeUp, {
    delay: 0.15
  }, /*#__PURE__*/React.createElement("p", {
    className: "mt-6 text-primary/55 text-sm md:text-base leading-relaxed"
  }, "ClientForge builds the websites, ad campaigns and automations small operators actually need \u2014 then hands them over working. No retainers to decode, no hourly billing, no six-week discovery phase before anything ships.")), /*#__PURE__*/React.createElement("ol", {
    className: "ab-steps"
  }, /*#__PURE__*/React.createElement("li", {
    className: "ab-step",
    style: {
      '--d': '80ms'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ab-step__n"
  }, "01"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    className: "ab-step__t"
  }, "Tell us what you need"), /*#__PURE__*/React.createElement("span", {
    className: "ab-step__d"
  }, "A 20-minute call, sometimes a written plan. We scope the whole job before anyone pays anything."))), /*#__PURE__*/React.createElement("li", {
    className: "ab-step",
    style: {
      '--d': '170ms'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ab-step__n"
  }, "02"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    className: "ab-step__t"
  }, "We build it"), /*#__PURE__*/React.createElement("span", {
    className: "ab-step__d"
  }, "Fixed scope, fixed price. You approve the direction \u2014 we handle the design, the copy and the setup."))), /*#__PURE__*/React.createElement("li", {
    className: "ab-step",
    style: {
      '--d': '260ms'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ab-step__n"
  }, "03"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    className: "ab-step__t"
  }, "It goes live"), /*#__PURE__*/React.createElement("span", {
    className: "ab-step__d"
  }, "Under one week, guaranteed. You own it outright \u2014 the site, the hosting, the accounts, all of it.")))), /*#__PURE__*/React.createElement("p", {
    className: "ab-nudge"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ab-nudge__gem",
    "aria-hidden": "true"
  }, "\u25C6"), "Watch the film for the full walkthrough \u2014 how we work, and exactly what it costs."), /*#__PURE__*/React.createElement("div", {
    className: "hero-cta mt-8"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "hero-cta__go",
    "data-lead": ""
  }, /*#__PURE__*/React.createElement("span", null, "Tell us what you need"), /*#__PURE__*/React.createElement(ArrowRight, {
    size: 16
  })))), /*#__PURE__*/React.createElement("div", {
    className: "ab-media"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ab-watch"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ab-watch__label"
  }, "Watch me"), /*#__PURE__*/React.createElement("span", {
    className: "ab-watch__arrow",
    "aria-hidden": "true"
  })), /*#__PURE__*/React.createElement("div", {
    className: "pv-frame ab-frame"
  }, /*#__PURE__*/React.createElement("video", {
    className: "pv-frame__video",
    src: "assets/vid/promo.mp4",
    poster: "assets/vid/promo-poster.jpg",
    controls: true,
    playsInline: true,
    preload: "metadata"
  })), /*#__PURE__*/React.createElement("div", {
    className: "pv-foot"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pv-foot__stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pv-foot__icon",
    "aria-hidden": "true"
  }, "\u25B6"), "2 min 22 s"), /*#__PURE__*/React.createElement("span", {
    className: "pv-foot__title"
  }, "Build \xB7 Automate \xB7 Grow"))))));
}
Object.assign(window, {
  About
});