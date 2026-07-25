/* ============================================================================
   ClientForge — the scroll world.

   Architecture A (one continuous forward flight): each section's `clip` is the
   leg that FLIES INTO that scene, and every leg starts from the previous leg's
   actual last frame. There are no connector clips — the legs are the journey —
   so `connectors` is an empty array.

   Mounted outside React on purpose: the engine builds and owns its own DOM, and
   React reconciling those nodes underneath it would fight the scrub loop.
   ========================================================================== */

const WORLD_SECTIONS = [
  {
    id: 'city',
    label: 'The Agency',
    still: 'assets/hero/start-city.png',
    clip: 'assets/vid/leg1.mp4',
    accent: '#E3B65C',
    scroll: 1.5,
    linger: 0.4,
    eyebrow: 'ClientForge · AI Agency',
    title: 'We built a city in the clouds.',
    body: 'Four districts, one job: get your business more customers and take the busywork off your plate.',
    tags: ['Websites', 'Automation', 'Ads', 'Apps'],
  },
  {
    id: 'web',
    label: 'Websites',
    still: 'assets/hero/start-web.png',
    clip: 'assets/vid/leg2.mp4',
    accent: '#E3B65C',
    scroll: 1.4,
    linger: 0.45,
    eyebrow: 'The Build District',
    title: 'Sites built to convert.',
    body: 'Fast, mobile-first builds with lead capture, booking and CRM wired in from day one — delivered in under a week.',
    tags: ['Lead capture', 'Booking', 'Live in under 1 week'],
  },
  {
    id: 'automation',
    label: 'Automation',
    still: 'assets/hero/start-automation.png',
    clip: 'assets/vid/leg3.mp4',
    accent: '#E3B65C',
    scroll: 1.4,
    linger: 0.45,
    eyebrow: 'The Machine Works',
    title: 'Follow-up that never sleeps.',
    body: 'SMS and email systems that answer leads in seconds, chase the quiet ones, and hand you only the conversations worth having.',
    tags: ['SMS / email', 'Speed to lead', 'Workflows'],
  },
  {
    id: 'ads',
    label: 'Ads',
    still: 'assets/hero/start-ads.png',
    clip: 'assets/vid/leg4.mp4',
    accent: '#E3B65C',
    scroll: 1.4,
    linger: 0.45,
    eyebrow: 'The Broadcast District',
    title: 'Campaigns run by people who watch the numbers.',
    body: 'Creative, targeting and retargeting managed weekly against cost per lead — not impressions.',
    tags: ['Meta ads', 'Retargeting', 'Weekly optimization'],
  },
  {
    id: 'apps',
    label: 'Apps',
    still: 'assets/hero/start-apps.png',
    clip: 'assets/vid/leg5.mp4',
    accent: '#E3B65C',
    scroll: 1.7,
    linger: 0.5,
    eyebrow: 'The Workshop',
    title: 'Custom tools you actually own.',
    body: 'Dashboards, portals and internal apps built around how your business already works.',
    tags: ['Dashboards', 'Client portals', 'Internal tools'],
    cta: {
      primary: { label: 'Book a Strategy Call', href: '#contact' },
      secondary: { label: 'See pricing', href: '#pricing' },
    },
  },
];

/* ---------------------------------------------------------------------------
   The wordmark.

   A centred pixel-type title that types itself in on load and then HOLDS
   through the first two scenes — the cloud approach and the city arrival —
   because that stretch is the establishing shot. It fades out as the camera
   commits to the first district, handing the screen back to the section copy.
   Mounted alongside the engine rather than inside it: the engine owns the
   scenes, this is page furniture on top of them.
   ------------------------------------------------------------------------- */
const WORDMARK_TEXT = 'THE CLIENT FORGE';

// Hold for as long as the first two scenes scroll, then dissolve over the last
// stretch. Read off the section config so retiming a scene keeps this honest.
const WORDMARK_HOLD = (WORLD_SECTIONS[0].scroll || 1.4) + (WORLD_SECTIONS[1].scroll || 1.4);
const WORDMARK_FADE = 0.55;   // vh of scroll the fade-out takes

function buildWordmark(root) {
  const wrap = document.createElement('div');
  wrap.className = 'cf-wordmark';

  const line = document.createElement('div');
  line.className = 'cf-wordmark__line';

  // Per-word wrappers keep words from breaking mid-air; per-letter spans are
  // what the stagger animates.
  let i = 0;
  WORDMARK_TEXT.split(' ').forEach((word) => {
    const w = document.createElement('span');
    w.className = 'cf-wordmark__word';
    for (const ch of word) {
      const s = document.createElement('span');
      s.className = 'cf-wordmark__ch';
      s.textContent = ch;
      // A custom property, not `style.animationDelay` — these glyphs run two
      // animations and a single inline delay would overwrite the whole list.
      s.style.setProperty('--d', (i * 70) + 'ms');
      w.appendChild(s);
      i++;
    }
    line.appendChild(w);
  });

  const caret = document.createElement('span');
  caret.className = 'cf-wordmark__caret';
  caret.style.setProperty('--d', (i * 70) + 'ms');
  line.appendChild(caret);

  const sub = document.createElement('div');
  sub.className = 'cf-wordmark__sub';
  sub.textContent = 'websites · automation · ads · apps';
  sub.style.setProperty('--d', (i * 70 + 260) + 'ms');

  wrap.appendChild(line);
  wrap.appendChild(sub);
  root.appendChild(wrap);
  return wrap;
}

/* ---------------------------------------------------------------------------
   Scroll driver: the wordmark, and the world's exit.

   Every layer the engine builds is `position: fixed`, which is what lets the
   camera hold still while scroll drives time — but it also means the world
   would stay pinned over the sections below it forever. So once the flight is
   done, the whole thing dissolves and hands the screen to the page.

   The fade is applied to each fixed layer rather than to the container,
   deliberately: an opacity below 1 on the container would make it a containing
   block for its own fixed descendants, and every layer would jump out of place
   mid-fade. These layers' children are absolute, so fading them is safe.
   ------------------------------------------------------------------------- */
function driveWorld(root, wordmark) {
  const clamp = (x) => Math.min(1, Math.max(0, x));
  const track = root.querySelector('.sw-track');
  // Layers to dissolve. The hint is left out — the engine drives its opacity
  // every frame and would overwrite us (it's long gone by this point anyway).
  const layers = ['.sw-sky', '.sw-scrollbar', '.sw-topbar', '.sw-stage', '.sw-copylayer', '.sw-route']
    .map(sel => root.querySelector(sel))
    .filter(Boolean);
  let ticking = false;

  const read = () => {
    const vh = window.innerHeight || 1;
    const y = window.scrollY || window.pageYOffset;
    const yv = y / vh;                                  // in viewport heights

    // --- wordmark ---
    const wop = clamp((WORDMARK_HOLD - yv) / WORDMARK_FADE);
    wordmark.style.opacity = wop;
    // Slow lift + shrink so it reads as sitting in the world rather than on
    // the glass, and gets out of the way as the city fills the frame.
    wordmark.style.transform = `translate(-50%, calc(-50% - ${(yv * 3.2).toFixed(2)}vh)) scale(${(1 - yv * 0.035).toFixed(4)})`;

    // --- world exit ---
    // The engine sizes the track one viewport taller than the flight needs.
    // That trailing viewport is exactly the handoff: the last frame is already
    // reached when it starts, and the page below has fully arrived when it
    // ends. Dissolve across it.
    // Document-space bottom edge of the scroll track. Measured off the rect
    // rather than offsetTop, which is relative to whatever the offsetParent
    // happens to be.
    const worldEnd = track ? track.getBoundingClientRect().bottom + y : 0;
    const exit = clamp((y - (worldEnd - vh)) / vh);
    const wop2 = wop * (1 - exit);

    for (const n of layers) {
      n.style.opacity = String(1 - exit);
      // Let clicks through to the page below as soon as the world is on its
      // way out — the nav and route rail are interactive and would otherwise
      // swallow taps aimed at the sections underneath.
      n.style.pointerEvents = exit > 0.5 ? 'none' : '';
      n.style.visibility = exit >= 1 ? 'hidden' : '';
    }
    wordmark.style.opacity = wop2;
    wordmark.style.visibility = wop2 < 0.01 ? 'hidden' : 'visible';
    ticking = false;
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(read);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  read();
}

/* ---------------------------------------------------------------------------
   Frame locks.

   Each leg FLIES INTO its district, so the card is only fully up at the END of
   that leg (see the copy phase in scrub-engine). A fast flick sails straight
   through that window and the visitor never sees the service at all.

   So: a snap anchor parked at every arrival. `proximity` rather than
   `mandatory` — a deliberate slow scroll still passes through freely, and the
   flight is never a trap — but `scroll-snap-stop: always` means one fling can't
   leap over a district. The page settles ON a card instead of mid-transition.

   Offsets are written in vh units, so they stay correct through a resize with
   no JS recalculation: one segment of `scroll: 1.5` is 1.5 viewport heights,
   which is 150vh.
   ------------------------------------------------------------------------- */
function buildFrameLocks(root) {
  const track = root.querySelector('.sw-track');
  if (!track) return;
  let cum = 0;
  WORLD_SECTIONS.forEach((s, i) => {
    cum += (s.scroll || 1.4);
    // The last district's CTA holds from its arrival onward, and the world
    // starts dissolving right after — locking there keeps the CTA on screen
    // rather than half-faded.
    const lock = document.createElement('i');
    lock.className = 'sw-lock';
    lock.dataset.lock = s.id;
    lock.style.top = (cum * 100) + 'vh';
    track.appendChild(lock);
  });
  root.classList.add('has-frame-locks');
}

function mountClientForgeWorld() {
  const el = document.getElementById('world');
  if (!el || typeof mountScrollWorld !== 'function') return;

  // The world is a ~7vh scroll track, so a browser restoring the previous
  // scroll position drops you into the middle of the flight with no context.
  // The film has to start at frame one. A real deep link (#pricing) is still
  // honoured — that's a deliberate destination, not restored state.
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  if (!window.location.hash) window.scrollTo(0, 0);

  mountScrollWorld(el, {
    brand: { name: 'ClientForge', href: '#top' },
    hint: 'Scroll — the city is working below',
    nav: true,
    atmosphere: true,
    diveScroll: 1.4,
    sections: WORLD_SECTIONS,
    connectors: [],   // architecture A — the legs are the journey
  });

  // The engine lazy-loads every scene poster, which is right for scenes four
  // deep but wrong for the one on screen at load — it has to paint immediately
  // or the landing is empty until the clip decodes.
  const first = el.querySelector('.sw-scene__still');
  if (first) {
    first.loading = 'eager';
    first.setAttribute('fetchpriority', 'high');
  }

  buildFrameLocks(el);
  driveWorld(el, buildWordmark(el));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountClientForgeWorld);
} else {
  mountClientForgeWorld();
}
