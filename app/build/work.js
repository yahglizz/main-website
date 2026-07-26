/* Section 3: Our Work — "SELECT A PREVIEW" gallery.

   Was a horizontal row of phone-reel tiles. Now it's the arcade cabinet: a
   2×2 grid of big landscape preview cards (the walkthrough videos are all
   1920×1080, so 16:9 frames show them uncropped), each with a centered PLAY
   plate and a footer bar carrying the result stat + the build category. The
   fourth slot is Forge Quest — a playable canvas mini-game drawn procedurally
   (no sprite assets), themed on what ClientForge actually does: ship the
   client's site, dodge the bugs, collect the leads.

   ── HOW TO ADD A PREVIEW ────────────────────────────────────────────────
   Drop a landscape video and add an entry to a track's `slots`. A slot whose
   file is missing degrades to a pixel "coming soon" frame rather than a
   broken player. `game: true` renders Forge Quest in that slot instead.
   ─────────────────────────────────────────────────────────────────────────

   Hook aliases are prefixed (useStateW/useRefW/useEffectW) — every .jsx here
   shares one global scope after Babel. */

const {
  useState: useStateW,
  useRef: useRefW,
  useEffect: useEffectW
} = React;
const PREVIEW_TRACKS = [{
  id: 'websites',
  label: 'Websites',
  tag: '01',
  blurb: 'Sites built to turn visitors into booked jobs — each one live in under a week.',
  slots: [{
    id: 'barbershop',
    title: 'Barbershop Brand & Booking',
    stat: '2× Online Bookings',
    icon: '✂',
    src: 'more%20previews/barbershop.mov'
  }, {
    id: 'childcare',
    title: 'Childcare Center',
    stat: '3× Inquiry Volume',
    icon: '☀',
    src: 'more%20previews/childcare.mov'
  }, {
    id: 'rental',
    title: 'Short-Term Rental',
    stat: '+85% Direct Bookings',
    icon: '⌂',
    src: 'more%20previews/rental.mov'
  }, {
    id: 'forge-quest',
    title: 'Bonus Game Preview',
    stat: 'Featured Game Demo',
    icon: '▣',
    game: true
  }]
}, {
  id: 'automations',
  label: 'Automations',
  tag: '02',
  blurb: 'The systems behind the site — follow-up, booking, dispatch and reviews, running without you.',
  slots: [{
    id: 'followup',
    title: 'AI Follow-Up for Realtors',
    stat: 'Reply time: 9.2 hrs → 47 s',
    icon: '⚡',
    src: 'assets/reels/followup.mp4'
  }, {
    id: 'medspa',
    title: 'Med Spa Booking Funnel',
    stat: '48% Booking Conversion',
    icon: '✚',
    src: 'assets/reels/medspa.mp4'
  }, {
    id: 'dispatch',
    title: 'Home Services Dispatch',
    stat: '14 hrs/week Saved',
    icon: '🔧',
    src: 'assets/reels/dispatch.mp4'
  }, {
    id: 'dashboard',
    title: 'Client Ops Dashboard',
    stat: '30 Agents Onboarded',
    icon: '▦',
    src: 'assets/reels/dashboard.mp4'
  }]
}];

// The modal only needs this shape; a showcase request has no price or scope.
const WORK_SHOWCASE = {
  id: 'work-showcase',
  title: 'See more of our work',
  price: '',
  timeline: '',
  features: []
};

/* ── Forge Quest ─────────────────────────────────────────────────────────
   A one-button runner about the job itself: you're the ClientForge smith
   carrying a build to launch. Jump the bugs, collect the leads, and the
   client's site assembles in the background — fill it and the site ships,
   the level goes up, the week gets faster. Everything is fillRect on a
   320×180 canvas scaled up with image-rendering: pixelated, so no third-
   party art ships in this repo. */

const FQ = {
  W: 320,
  H: 180,
  GROUND: 150,
  GRAVITY: 900,
  JUMP: -330,
  BASE_SPEED: 120,
  SPEED_PER_LVL: 14,
  SECTIONS: 5,
  SCORE_PER_SECTION: 120,
  COLORS: {
    skyTop: '#0B141E',
    skyBot: '#10202E',
    ridge: '#0E1B27',
    ridge2: '#13232F',
    ground: '#1A2B38',
    groundEdge: '#E3B65C',
    dash: 'rgba(225,224,204,0.25)',
    ink: '#E1E0CC',
    gold: '#E3B65C',
    bug: '#C4523F',
    bugDark: '#8E3527',
    site: 'rgba(227,182,92,0.16)',
    siteOn: 'rgba(227,182,92,0.55)',
    heart: '#C4523F',
    skin: '#D9A066',
    body: '#2E4356'
  }
};
function ForgeGame() {
  const canvasRef = useRefW(null);
  const hostRef = useRefW(null);
  const [phase, setPhase] = useStateW('boot'); // boot | run | over
  const [bootStage, setBootStage] = useStateW('closed');
  const [finalScore, setFinalScore] = useStateW(0);
  const [best, setBest] = useStateW(0);
  const phaseRef = useRefW('boot');
  phaseRef.current = phase;

  // All mutable game state lives in one ref so the rAF loop never re-renders.
  const g = useRefW(null);
  const reset = () => {
    g.current = {
      t: 0,
      last: 0,
      dist: 0,
      coins: 0,
      lvl: 1,
      hearts: 3,
      y: FQ.GROUND,
      vy: 0,
      grounded: true,
      inv: 0,
      runFrame: 0,
      bugs: [],
      leads: [],
      spawnBug: 1.4,
      spawnLead: 0.9,
      shipped: 0,
      flash: 0
    };
  };
  const score = s => Math.floor(s.dist / 8) + s.coins * 25;
  const jump = () => {
    const s = g.current;
    if (phaseRef.current !== 'run' || !s) return;
    if (s.grounded) {
      s.vy = FQ.JUMP;
      s.grounded = false;
    }
  };

  // Focus the container, not the button: the button unmounts the moment the
  // run starts, and focus would go with it — leaving Space dead until the
  // player clicked the canvas.
  const start = (focus = true) => {
    reset();
    setPhase('run');
    if (focus && hostRef.current) hostRef.current.focus();
  };

  // Boot only when the card reaches the viewport. Starting on page load would
  // leave the unattended runner dead before most visitors scroll down to it.
  useEffectW(() => {
    const host = hostRef.current;
    if (!host) return;
    const laptop = host.closest('.pv-laptop');
    let openTimer;
    let terminalTimer;
    let launchTimer;
    const boot = () => {
      if (laptop) laptop.classList.add('is-open');
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        start(false);
        return;
      }
      openTimer = window.setTimeout(() => setBootStage('desktop'), 700);
      terminalTimer = window.setTimeout(() => setBootStage('terminal'), 2100);
      launchTimer = window.setTimeout(() => start(false), 4900);
    };
    if (!('IntersectionObserver' in window)) {
      boot();
      return () => {
        clearTimeout(openTimer);
        clearTimeout(terminalTimer);
        clearTimeout(launchTimer);
      };
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      boot();
    }, {
      threshold: 0.35
    });
    observer.observe(laptop || host);
    return () => {
      observer.disconnect();
      clearTimeout(openTimer);
      clearTimeout(terminalTimer);
      clearTimeout(launchTimer);
    };
  }, []);
  useEffectW(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    const C = FQ.COLORS;
    const px = (x, y, w, h, c) => {
      ctx.fillStyle = c;
      ctx.fillRect(Math.round(x), Math.round(y), w, h);
    };
    const drawBackdrop = s => {
      const grad = ctx.createLinearGradient(0, 0, 0, FQ.H);
      grad.addColorStop(0, C.skyTop);
      grad.addColorStop(1, C.skyBot);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, FQ.W, FQ.H);
      // Stars — fixed pseudo-random field, drifts slowly.
      ctx.fillStyle = 'rgba(225,224,204,0.35)';
      for (let i = 0; i < 18; i++) {
        const sx = (i * 53 + 11 - (s ? s.dist * 0.04 : 0)) % FQ.W;
        ctx.fillRect((sx + FQ.W) % FQ.W, (i * 37 + 9) % 70, 1, 1);
      }
      // Two parallax skyline ridges.
      const off1 = s ? s.dist * 0.18 % 80 : 0;
      ctx.fillStyle = C.ridge;
      for (let x = -80; x < FQ.W + 80; x += 80) {
        const bx = x - off1;
        ctx.fillRect(bx, 96, 34, 54);
        ctx.fillRect(bx + 42, 110, 26, 40);
      }
      const off2 = s ? s.dist * 0.35 % 100 : 0;
      ctx.fillStyle = C.ridge2;
      for (let x = -100; x < FQ.W + 100; x += 100) {
        const bx = x - off2;
        ctx.fillRect(bx, 118, 40, 32);
        ctx.fillRect(bx + 52, 128, 30, 22);
      }
    };

    // The client's site assembling in the background — the build meter IS the
    // scenery. header / hero / two cards / footer light up as score grows.
    const drawSite = s => {
      // Sits below the HUD row so the score/coin readout never overlaps it.
      const bx = 226,
        by = 48,
        bw = 78,
        bh = 62;
      px(bx - 3, by - 10, bw + 6, bh + 13, 'rgba(14,24,34,0.85)');
      ctx.strokeStyle = 'rgba(227,182,92,0.4)';
      ctx.lineWidth = 1;
      ctx.strokeRect(bx - 2.5, by - 9.5, bw + 5, bh + 12);
      px(bx - 3, by - 10, bw + 6, 7, 'rgba(227,182,92,0.25)');
      px(bx, by - 8, 3, 3, C.bug);
      px(bx + 5, by - 8, 3, 3, C.gold);
      px(bx + 10, by - 8, 3, 3, C.ink);
      // Progress through the CURRENT build; resets after each ship (new client).
      const built = s ? Math.min(FQ.SECTIONS, Math.floor(score(s) % FQ.SCORE_PER_SECTION / (FQ.SCORE_PER_SECTION / FQ.SECTIONS))) : 0;
      const rects = [[bx, by, bw, 8],
      // header
      [bx, by + 11, bw, 20],
      // hero
      [bx, by + 34, 37, 16],
      // card L
      [bx + 41, by + 34, 37, 16],
      // card R
      [bx, by + 53, bw, 6] // footer
      ];
      rects.forEach((r, i) => px(r[0], r[1], r[2], r[3], i < built ? C.siteOn : C.site));
      if (s && s.flash > 0) {
        ctx.fillStyle = 'rgba(227,182,92,' + Math.min(0.8, s.flash) + ')';
        ctx.font = '10px "Pixelify Sans", monospace';
        ctx.fillText('SITE SHIPPED!', bx - 4, by + bh + 12);
      }
    };
    const drawGroundStrip = s => {
      px(0, FQ.GROUND + 18, FQ.W, FQ.H - FQ.GROUND - 18, C.ground);
      px(0, FQ.GROUND + 18, FQ.W, 2, C.groundEdge);
      const off = s ? s.dist % 24 : 0;
      for (let x = -24; x < FQ.W + 24; x += 24) px(x - off, FQ.GROUND + 26, 10, 2, C.dash);
    };
    const drawSmith = s => {
      const x = 42,
        y = s.y;
      if (s.inv > 0 && Math.floor(s.t * 12) % 2 === 0) return; // hit-blink
      const legA = s.grounded && Math.floor(s.t * 10) % 2 === 0;
      // legs
      px(x + 2, y + 12, 3, 6, C.body);
      px(x + 7, y + 12, 3, 6, C.body);
      if (legA) {
        px(x + 1, y + 16, 4, 2, C.body);
        px(x + 8, y + 14, 3, 4, C.body);
      }
      // torso + apron
      px(x, y + 2, 12, 10, C.body);
      px(x + 3, y + 6, 6, 6, 'rgba(227,182,92,0.5)');
      // head + helm
      px(x + 2, y - 6, 8, 8, C.skin);
      px(x + 1, y - 8, 10, 4, C.gold);
      px(x + 7, y - 4, 2, 2, '#10202E'); // eye
      // hammer arm — raised mid-air, swung on ground
      if (s.grounded) {
        px(x + 11, y + 4, 6, 2, C.skin);
        px(x + 16, y + 1, 3, 7, C.gold);
      } else {
        px(x + 11, y - 2, 2, 6, C.skin);
        px(x + 9, y - 8, 7, 4, C.gold);
      }
    };
    const drawBug = b => {
      const wob = Math.floor(b.t * 14) % 2;
      px(b.x, FQ.GROUND + 10, 10, 7, C.bug);
      px(b.x + 2, FQ.GROUND + 8, 6, 3, C.bugDark);
      px(b.x + 1, FQ.GROUND + 17, 2, 2 - wob, C.bugDark);
      px(b.x + 4, FQ.GROUND + 17, 2, 1 + wob, C.bugDark);
      px(b.x + 7, FQ.GROUND + 17, 2, 2 - wob, C.bugDark);
      px(b.x + 8, FQ.GROUND + 11, 2, 2, '#10202E'); // eye
    };
    const drawLead = l => {
      const bob = Math.sin(l.t * 6) * 2;
      const y = l.y + bob;
      px(l.x + 2, y, 4, 8, C.gold);
      px(l.x, y + 2, 8, 4, C.gold);
      px(l.x + 3, y + 2, 2, 4, '#B8860B');
    };
    const drawHUD = s => {
      ctx.font = '9px "Pixelify Sans", monospace';
      for (let i = 0; i < 3; i++) {
        const on = i < s.hearts;
        px(8 + i * 11, 8, 8, 7, on ? C.heart : 'rgba(225,224,204,0.15)');
        px(9 + i * 11, 6, 2, 2, on ? C.heart : 'rgba(225,224,204,0.15)');
        px(13 + i * 11, 6, 2, 2, on ? C.heart : 'rgba(225,224,204,0.15)');
      }
      ctx.fillStyle = C.ink;
      ctx.fillText('LVL ' + s.lvl, 8, 28);
      const sc = 'SCORE ' + String(score(s)).padStart(6, '0');
      ctx.fillStyle = C.ink;
      ctx.fillText(sc, FQ.W - ctx.measureText(sc).width - 8, 14);
      ctx.fillStyle = C.gold;
      const lc = '◈ ' + s.coins;
      ctx.fillText(lc, FQ.W - ctx.measureText(lc).width - 8, 26);
    };
    const step = dt => {
      const s = g.current;
      s.t += dt;
      s.inv = Math.max(0, s.inv - dt);
      s.flash = Math.max(0, s.flash - dt);
      const speed = FQ.BASE_SPEED + (s.lvl - 1) * FQ.SPEED_PER_LVL;
      s.dist += speed * dt;

      // physics
      s.vy += FQ.GRAVITY * dt;
      s.y += s.vy * dt;
      if (s.y >= FQ.GROUND) {
        s.y = FQ.GROUND;
        s.vy = 0;
        s.grounded = true;
      }

      // spawns
      s.spawnBug -= dt;
      if (s.spawnBug <= 0) {
        s.bugs.push({
          x: FQ.W + 12,
          t: 0
        });
        s.spawnBug = 1.1 + Math.random() * 1.2 - Math.min(0.5, s.lvl * 0.06);
      }
      s.spawnLead -= dt;
      if (s.spawnLead <= 0) {
        s.leads.push({
          x: FQ.W + 12,
          y: FQ.GROUND - 20 - Math.random() * 45,
          t: 0
        });
        s.spawnLead = 0.8 + Math.random() * 0.9;
      }

      // move + collide. Player box: x 42..54, y s.y-8 .. s.y+18.
      const pl = 42,
        pr = 54,
        pt = s.y - 8,
        pb = s.y + 18;
      s.bugs.forEach(b => {
        b.x -= speed * dt;
        b.t += dt;
      });
      s.leads.forEach(l => {
        l.x -= speed * dt;
        l.t += dt;
      });
      s.bugs = s.bugs.filter(b => {
        if (b.x < -14) return false;
        if (s.inv <= 0 && b.x < pr && b.x + 10 > pl && pb > FQ.GROUND + 8) {
          s.hearts -= 1;
          s.inv = 1.2;
          if (s.hearts <= 0) {
            const sc = score(s);
            setFinalScore(sc);
            setBest(p => Math.max(p, sc));
            setPhase('over');
          }
          return false;
        }
        return true;
      });
      s.leads = s.leads.filter(l => {
        if (l.x < -10) return false;
        if (l.x < pr && l.x + 8 > pl && l.y < pb && l.y + 8 > pt) {
          s.coins += 1;
          return false;
        }
        return true;
      });

      // ship the site → level up
      const shippedNow = Math.floor(score(s) / FQ.SCORE_PER_SECTION);
      if (shippedNow > s.shipped) {
        s.shipped = shippedNow;
        s.lvl += 1;
        s.flash = 1.6;
      }
    };
    const frame = ts => {
      const s = g.current;
      const running = phaseRef.current === 'run' && s;
      if (running) {
        if (!s.last) s.last = ts;
        const dt = Math.min(0.05, (ts - s.last) / 1000);
        s.last = ts;
        step(dt);
      }
      drawBackdrop(running ? s : null);
      drawSite(running ? s : null);
      drawGroundStrip(running ? s : null);
      if (running) {
        s.leads.forEach(drawLead);
        s.bugs.forEach(drawBug);
        drawSmith(s);
        drawHUD(s);
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    // Pause cleanly when the tab hides: drop the timestamp so dt doesn't spike.
    const onVis = () => {
      const s = g.current;
      if (s) s.last = 0;
    };
    document.addEventListener('visibilitychange', onVis);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);
  const onKey = e => {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
      e.preventDefault();
      if (phaseRef.current === 'run') jump();else if (phaseRef.current === 'over') start();
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: hostRef,
    className: "pv-game",
    tabIndex: 0,
    role: "application",
    "aria-label": "Forge Quest mini-game. Space or tap to jump.",
    onKeyDown: onKey,
    onPointerDown: () => {
      if (phaseRef.current === 'run') jump();
    }
  }, /*#__PURE__*/React.createElement("canvas", {
    ref: canvasRef,
    width: FQ.W,
    height: FQ.H,
    className: "pv-game__canvas"
  }), /*#__PURE__*/React.createElement("span", {
    className: "reel__scan",
    "aria-hidden": "true"
  }), phase === 'boot' && /*#__PURE__*/React.createElement("div", {
    className: "pv-boot",
    role: "status",
    "aria-label": "Opening Forge Quest"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pv-boot__bar"
  }, /*#__PURE__*/React.createElement("span", null, "CLIENTFORGE OS"), /*#__PURE__*/React.createElement("span", null, "09:41")), /*#__PURE__*/React.createElement("div", {
    className: "pv-boot__desktop"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pv-boot__icon"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pv-boot__folder",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("i", null)), /*#__PURE__*/React.createElement("small", null, "FORGE QUEST")), bootStage === 'desktop' && /*#__PURE__*/React.createElement("span", {
    className: "pv-boot__cursor",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("b", null)), bootStage === 'terminal' && /*#__PURE__*/React.createElement("div", {
    className: "pv-terminal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pv-terminal__bar"
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\u25A0 \u25A0 \u25A0"), /*#__PURE__*/React.createElement("span", null, "TERMINAL")), /*#__PURE__*/React.createElement("div", {
    className: "pv-terminal__body"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pv-terminal__prompt"
  }, "clientforge@studio:~$ ", /*#__PURE__*/React.createElement("span", {
    className: "pv-terminal__command"
  }, "forge-quest --launch")), /*#__PURE__*/React.createElement("span", {
    className: "pv-terminal__result pv-terminal__result--1"
  }, "BUILD CHECK................OK"), /*#__PURE__*/React.createElement("span", {
    className: "pv-terminal__result pv-terminal__result--2"
  }, "CONTROLS: SPACE / TAP TO JUMP"), /*#__PURE__*/React.createElement("span", {
    className: "pv-terminal__result pv-terminal__result--3"
  }, "OPENING GAME...", /*#__PURE__*/React.createElement("i", {
    "aria-hidden": "true"
  })))))), phase === 'over' && /*#__PURE__*/React.createElement("div", {
    className: "pv-game__overlay"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pv-game__title"
  }, "SITE CRASHED!"), /*#__PURE__*/React.createElement("div", {
    className: "pv-game__sub"
  }, 'SCORE ' + finalScore + (best > finalScore ? ' · BEST ' + best : ' · NEW BEST!')), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "pv-game__btn",
    onClick: start
  }, "\u21BB RETRY"), /*#__PURE__*/React.createElement("div", {
    className: "pv-game__hint"
  }, "SPACE / TAP TO JUMP")));
}

/* ── Preview cards ──────────────────────────────────────────────────────── */

function PreviewCard({
  slot,
  i
}) {
  const videoRef = useRefW(null);
  const [playing, setPlaying] = useStateW(false);
  const [broken, setBroken] = useStateW(false);
  const toggle = () => {
    const v = videoRef.current;
    if (!v || broken) return;
    if (v.paused) v.play().then(() => setPlaying(true)).catch(() => setBroken(true));else {
      v.pause();
      setPlaying(false);
    }
  };
  return (
    /*#__PURE__*/
    // CSS entrance with `backwards` fill (not framer): lands visible even if
    // the animation never runs, and staggers off one custom property.
    React.createElement("div", {
      className: "pv-card",
      style: {
        '--d': i * 90 + 'ms'
      }
    }, slot.game ? /*#__PURE__*/React.createElement("div", {
      className: "pv-frame pv-frame--game"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pv-laptop"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pv-laptop__lid"
    }, /*#__PURE__*/React.createElement("img", {
      src: "assets/game/forge-laptop-lid.png",
      className: "pv-laptop__art",
      alt: "",
      draggable: "false"
    }), /*#__PURE__*/React.createElement("div", {
      className: "pv-laptop__display"
    }, /*#__PURE__*/React.createElement(ForgeGame, null))), /*#__PURE__*/React.createElement("img", {
      src: "assets/game/forge-laptop-base.png",
      className: "pv-laptop__base",
      alt: "",
      draggable: "false"
    }))) : /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "pv-frame",
      onClick: toggle,
      onMouseEnter: () => {
        const v = videoRef.current;
        if (v && !broken) v.play().catch(() => {});
      },
      onMouseLeave: () => {
        const v = videoRef.current;
        if (v && !playing) {
          v.pause();
          v.currentTime = 0;
        }
      },
      "aria-label": (playing ? 'Pause ' : 'Play ') + slot.title
    }, broken ? /*#__PURE__*/React.createElement("span", {
      className: "reel__empty"
    }, /*#__PURE__*/React.createElement("span", {
      className: "reel__empty-mark"
    }, "\u25A2"), "Preview coming soon") : /*#__PURE__*/React.createElement("video", {
      ref: videoRef,
      className: "pv-frame__video",
      src: slot.src,
      muted: true,
      loop: true,
      playsInline: true,
      preload: "metadata",
      onError: () => setBroken(true)
    }), !broken && /*#__PURE__*/React.createElement("span", {
      className: 'pv-play' + (playing ? ' is-playing' : '')
    }, playing ? '❚❚' : 'PLAY'), /*#__PURE__*/React.createElement("span", {
      className: "reel__scan",
      "aria-hidden": "true"
    })), /*#__PURE__*/React.createElement("div", {
      className: "pv-foot"
    }, /*#__PURE__*/React.createElement("span", {
      className: "pv-foot__stat"
    }, /*#__PURE__*/React.createElement("span", {
      className: "pv-foot__icon",
      "aria-hidden": "true"
    }, slot.icon), slot.stat), /*#__PURE__*/React.createElement("span", {
      className: "pv-foot__title"
    }, slot.title)))
  );
}
function Work() {
  const [track, setTrack] = useStateW(PREVIEW_TRACKS[0].id);
  const [asking, setAsking] = useStateW(false);
  const active = PREVIEW_TRACKS.find(t => t.id === track) || PREVIEW_TRACKS[0];
  return /*#__PURE__*/React.createElement("section", {
    id: "work",
    "data-screen-label": "03 Work",
    className: "relative bg-black py-24 md:py-32"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-noise opacity-70 pointer-events-none"
  }), /*#__PURE__*/React.createElement("div", {
    className: "relative max-w-6xl mx-auto px-5 sm:px-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary/55 mb-8"
  }, /*#__PURE__*/React.createElement("span", {
    className: "inline-block w-6 h-px bg-primary/30"
  }), /*#__PURE__*/React.createElement("span", null, "03 \xB7 Our Work")), /*#__PURE__*/React.createElement("div", {
    className: "pv-marquee"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pv-marquee__flag",
    "aria-hidden": "true"
  }, "\u25B6"), /*#__PURE__*/React.createElement("h2", {
    className: "pv-marquee__title"
  }, "Select a Preview"), /*#__PURE__*/React.createElement(FadeUp, {
    delay: 0.2
  }, /*#__PURE__*/React.createElement("span", {
    className: "pv-marquee__spec"
  }, "Website demos and walkthroughs"))), /*#__PURE__*/React.createElement("div", {
    className: "reel-tabs"
  }, PREVIEW_TRACKS.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    type: "button",
    onClick: () => setTrack(t.id),
    className: 'reel-tab' + (t.id === track ? ' is-active' : '')
  }, /*#__PURE__*/React.createElement("span", {
    className: "reel-tab__tag"
  }, t.tag), t.label))), /*#__PURE__*/React.createElement("div", {
    className: "pv-strip"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pv-strip__gem",
    "aria-hidden": "true"
  }, "\u25C6"), active.blurb), /*#__PURE__*/React.createElement("div", {
    className: "pv-grid",
    key: active.id
  }, active.slots.map((s, i) => /*#__PURE__*/React.createElement(PreviewCard, {
    key: s.id,
    slot: s,
    i: i
  }))), /*#__PURE__*/React.createElement("div", {
    className: "pv-cta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pv-cta__copy"
  }, "Want a build like these for your business?"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "reel__ask-btn pv-cta__btn",
    onClick: () => setAsking(true)
  }, "Book a 15-min call"))), asking && /*#__PURE__*/React.createElement(CheckoutModal, {
    plan: WORK_SHOWCASE,
    mode: "showcase",
    onClose: () => setAsking(false)
  }));
}
Object.assign(window, {
  Work
});