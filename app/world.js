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
    body: 'Fast, mobile-first builds with lead capture, booking and CRM wired in from day one — not bolted on later.',
    tags: ['Lead capture', 'Booking', 'Live in 3–5 days'],
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

function driveWordmark(node) {
  const clamp = (x) => Math.min(1, Math.max(0, x));
  let ticking = false;

  const read = () => {
    const vh = window.innerHeight || 1;
    const y = (window.scrollY || window.pageYOffset) / vh;   // in viewport heights
    const op = clamp((WORDMARK_HOLD - y) / WORDMARK_FADE);
    node.style.opacity = op;
    // Slow lift + shrink so it reads as sitting in the world rather than on
    // the glass, and gets out of the way as the city fills the frame.
    node.style.transform = `translate(-50%, calc(-50% - ${(y * 3.2).toFixed(2)}vh)) scale(${(1 - y * 0.035).toFixed(4)})`;
    node.style.visibility = op < 0.01 ? 'hidden' : 'visible';
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
    hint: 'scroll to fly in',
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

  driveWordmark(buildWordmark(el));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountClientForgeWorld);
} else {
  mountClientForgeWorld();
}
