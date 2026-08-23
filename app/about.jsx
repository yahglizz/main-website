/* Section 01: About — the promo video plus a short account of how the shop
   actually operates, so a first-time visitor understands the company before
   they hit the price list.

   Two columns on desktop: the story on the left, the film on the right. The
   video carries a poster frame (the brand card, ~3s in) so the slot reads as
   a deliberate title card rather than a black rectangle before playback. */

function About() {
  return (
    <section id="about" data-screen-label="01 About" className="relative bg-black py-24 md:py-32">
      <div className="absolute inset-0 bg-noise opacity-70 pointer-events-none" />


      <div className="relative max-w-6xl mx-auto px-5 sm:px-8">

        {/* Section label — matches the numbered rhythm of the sections below. */}
        <div className="flex items-center justify-between mb-12 md:mb-16">
          <div className="flex items-center gap-3 text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary/55">
            <span className="inline-block w-6 h-px bg-primary/30" />
            <span>01 · About Us</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-[0.22em] text-primary/35">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
            Two minutes · The whole operation
          </div>
        </div>

        <div className="ab-grid">

          {/* ── The story ── */}
          <div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[0.95] text-ink">
              <WordsPullUpMultiStyle
                segments={[
                  { text: 'About our', className: '' },
                  { text: 'company.', className: 'font-serif italic text-primary/80', breakAfter: true },
                ]}
              />
            </h2>

            <FadeUp delay={0.15}>
              <p className="mt-6 text-primary/55 text-sm md:text-base leading-relaxed">
                ClientForge builds the websites, ad campaigns and automations small
                operators actually need — then hands them over working. No retainers to
                decode, no hourly billing, no six-week discovery phase before anything
                ships.
              </p>
            </FadeUp>

            {/* CSS entrance with `backwards` fill rather than an in-view
                framer wrapper: this sits low enough in the section that the
                in-view margin can strand it at opacity 0 on a short viewport.
                See AGENTS.md §5. */}
            <ol className="ab-steps">
                <li className="ab-step" style={{ '--d': '80ms' }}>
                  <span className="ab-step__n">01</span>
                  <span>
                    <span className="ab-step__t">Tell us what you need</span>
                    <span className="ab-step__d">A 20-minute call, sometimes a written plan. We scope the whole job before anyone pays anything.</span>
                  </span>
                </li>
                <li className="ab-step" style={{ '--d': '170ms' }}>
                  <span className="ab-step__n">02</span>
                  <span>
                    <span className="ab-step__t">We build it</span>
                    <span className="ab-step__d">Fixed scope, fixed price. You approve the direction — we handle the design, the copy and the setup.</span>
                  </span>
                </li>
                <li className="ab-step" style={{ '--d': '260ms' }}>
                  <span className="ab-step__n">03</span>
                  <span>
                    <span className="ab-step__t">It goes live</span>
                    <span className="ab-step__d">Under one week, guaranteed. You own it outright — the site, the hosting, the accounts, all of it.</span>
                  </span>
                </li>
            </ol>

            <p className="ab-nudge">
              <span className="ab-nudge__gem" aria-hidden="true">◆</span>
              Watch the film for the full walkthrough — how we work, and exactly what it costs.
            </p>
          </div>

          {/* ── The film ── */}
          <div className="ab-media">
            <div className="ab-watch">
              <span className="ab-watch__label">Watch me</span>
              <span className="ab-watch__arrow" aria-hidden="true" />
            </div>

            <div className="pv-frame ab-frame">
              <video
                className="pv-frame__video"
                src="assets/vid/promo.mp4"
                poster="assets/vid/promo-poster.jpg"
                controls
                playsInline
                preload="metadata"
              />
            </div>

            <div className="pv-foot">
              <span className="pv-foot__stat">
                <span className="pv-foot__icon" aria-hidden="true">▶</span>
                2 min 22 s
              </span>
              <span className="pv-foot__title">Build · Automate · Grow</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

Object.assign(window, { About });
