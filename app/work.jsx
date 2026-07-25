/* Section 3: Our Work — reel gallery.

   Was one long filterable grid of eleven cards, which read as a wall. Now it's
   a small number of tracks (Websites, Automations), each holding a row of
   phone-reel-shaped tiles, so each track is a glanceable set rather than a
   scroll.

   ── HOW TO ADD A REEL ───────────────────────────────────────────────────
   Drop a vertical (9:16) video at  assets/reels/<name>.mp4  and point a slot's
   `src` at it. A slot whose file is missing degrades to a pixel "coming soon"
   frame rather than a broken player, so a half-filled track still looks
   deliberate. Add a whole track by adding one entry to REEL_TRACKS.
   ─────────────────────────────────────────────────────────────────────────

   Hook aliases are prefixed (useStateW/useRefW) — every .jsx here shares one
   global scope after Babel. */

const { useState: useStateW, useRef: useRefW } = React;

const REEL_TRACKS = [
  {
    id: 'websites',
    label: 'Websites',
    tag: '01',
    blurb: 'Sites built to turn visitors into booked jobs — each one live in under a week.',
    reels: [
      { id: 'barbershop', title: 'Barbershop Brand & Booking', stat: '2× online bookings', src: 'more%20previews/barbershop.mov' },
      { id: 'childcare', title: 'Childcare Center', stat: '3× inquiry volume', src: 'more%20previews/childcare.mov' },
      { id: 'daycare', title: 'Daycare Facility', stat: 'Waitlist filled in 2 weeks', src: 'more%20previews/daycare.mp4' },
      { id: 'rental', title: 'Short-Term Rental', stat: '+85% direct bookings', src: 'more%20previews/rental.mov' },
      { id: 'service', title: 'Home Services', stat: '+40% quote requests', src: 'more%20previews/service.mov' },
    ],
  },
  {
    id: 'automations',
    label: 'Automations',
    tag: '02',
    blurb: 'The systems behind the site — follow-up, booking, dispatch and reviews, running without you.',
    reels: [
      { id: 'followup', title: 'AI Follow-Up for Realtors', stat: 'Reply time: 9.2 hrs → 47 s', src: 'assets/reels/followup.mp4' },
      { id: 'medspa', title: 'Med Spa Booking Funnel', stat: '48% booking conversion', src: 'assets/reels/medspa.mp4' },
      { id: 'dispatch', title: 'Home Services Dispatch', stat: '14 hrs/week saved', src: 'assets/reels/dispatch.mp4' },
      { id: 'dashboard', title: 'Client Ops Dashboard', stat: '30 agents onboarded', src: 'assets/reels/dashboard.mp4' },
    ],
  },
];

// The modal only needs this shape; a showcase request has no price or scope.
const WORK_SHOWCASE = {
  id: 'work-showcase',
  title: 'See more of our work',
  price: '',
  timeline: '',
  features: [],
};

function ReelTile({ reel, i }) {
  const videoRef = useRefW(null);
  const [playing, setPlaying] = useStateW(false);
  const [broken, setBroken] = useStateW(false);

  const toggle = () => {
    const v = videoRef.current;
    if (!v || broken) return;
    if (v.paused) v.play().then(() => setPlaying(true)).catch(() => setBroken(true));
    else { v.pause(); setPlaying(false); }
  };

  return (
    // Entrance is a CSS animation with `both` fill, not a framer one. Two
    // reasons: whileInView would strand tiles parked off the right of a
    // horizontal row at opacity 0, and a JS-driven fade leaves the content
    // invisible in any environment that isn't running rAF. CSS lands visible
    // on its own.
    <div className="reel" style={{ '--d': (i * 70) + 'ms' }}>
      <button
        type="button"
        className="reel__frame"
        onClick={toggle}
        // Hover previews on desktop; the click is what actually commits, so
        // touch devices (which never hover) are not left without a way in.
        onMouseEnter={() => { const v = videoRef.current; if (v && !broken) v.play().catch(() => {}); }}
        onMouseLeave={() => { const v = videoRef.current; if (v && !playing) { v.pause(); v.currentTime = 0; } }}
        aria-label={(playing ? 'Pause ' : 'Play ') + reel.title}
      >
        {broken ? (
          <span className="reel__empty">
            <span className="reel__empty-mark">▢</span>
            Reel coming soon
          </span>
        ) : (
          <video
            ref={videoRef}
            className="reel__video"
            src={reel.src}
            muted
            loop
            playsInline
            preload="metadata"
            onError={() => setBroken(true)}
          />
        )}
        {!broken && <span className={'reel__play' + (playing ? ' is-playing' : '')}>{playing ? '❚❚' : '▶'}</span>}
        <span className="reel__scan" aria-hidden="true" />
      </button>

      <div className="reel__stat">{reel.stat}</div>
      <div className="reel__title">{reel.title}</div>
    </div>
  );
}

function ReelAsk({ onAsk }) {
  return (
    <div className="reel">
      <div className="reel__frame reel__frame--ask">
        <div className="reel__ask-body">
          <div className="reel__ask-title">Want to see more?</div>
          <p className="reel__ask-copy">
            We'll walk you through the builds closest to your business on a quick call.
          </p>
          <button type="button" className="reel__ask-btn" onClick={onAsk}>
            Book a 15-min call
          </button>
        </div>
        <span className="reel__scan" aria-hidden="true" />
      </div>
      <div className="reel__stat">Free · 15 minutes</div>
      <div className="reel__title">Request a showcase</div>
    </div>
  );
}

function Work() {
  const [track, setTrack] = useStateW(REEL_TRACKS[0].id);
  const [asking, setAsking] = useStateW(false);
  const active = REEL_TRACKS.find(t => t.id === track) || REEL_TRACKS[0];

  return (
    <section id="work" data-screen-label="03 Work" className="relative bg-black py-24 md:py-32">
      <div className="absolute inset-0 bg-noise opacity-70 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">

        <div className="flex items-center justify-between mb-10 md:mb-14">
          <div className="flex items-center gap-3 text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary/55">
            <span className="inline-block w-6 h-px bg-primary/30" />
            <span>03 · Work we did before</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-10">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[0.95] text-ink">
            <WordsPullUpMultiStyle segments={[{ text: 'Our Work.', className: '' }]} />
          </h2>
          <FadeUp delay={0.2}>
            <p className="max-w-md text-primary/60 text-sm md:text-base leading-relaxed">
              Real builds for real operators — home services, health, real estate and
              education. Pick a track, tap any reel to watch it run.
            </p>
          </FadeUp>
        </div>

        {/* Track tabs — two small sets instead of one wall of eleven. */}
        <div className="reel-tabs">
          {REEL_TRACKS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTrack(t.id)}
              className={'reel-tab' + (t.id === track ? ' is-active' : '')}
            >
              <span className="reel-tab__tag">{t.tag}</span>
              {t.label}
            </button>
          ))}
        </div>

        <p className="reel-blurb">{active.blurb}</p>

        {/* One row per track. Scrolls sideways when it doesn't fit, with snap
            points so a reel lands whole rather than half cut off. Keyed on the
            track so switching remounts the tiles and replays their entrance. */}
        <div className="reel-row no-scrollbar" key={active.id}>
          {active.reels.map((r, i) => (
            <ReelTile key={r.id} reel={r} i={i} />
          ))}
          <ReelAsk onAsk={() => setAsking(true)} />
        </div>

      </div>

      {asking && (
        <CheckoutModal plan={WORK_SHOWCASE} mode="showcase" onClose={() => setAsking(false)} />
      )}
    </section>
  );
}

Object.assign(window, { Work });
