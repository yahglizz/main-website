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
    still: 'assets/hero/city.png',
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
    still: 'assets/hero/dist-web.png',
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
    still: 'assets/hero/dist-automation.png',
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
    still: 'assets/hero/dist-ads.png',
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
    still: 'assets/hero/dist-apps.png',
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

function mountClientForgeWorld() {
  const el = document.getElementById('world');
  if (!el || typeof mountScrollWorld !== 'function') return;

  mountScrollWorld(el, {
    brand: { name: 'ClientForge', href: '#top' },
    hint: 'scroll to fly in',
    nav: true,
    atmosphere: true,
    diveScroll: 1.4,
    sections: WORLD_SECTIONS,
    connectors: [],   // architecture A — the legs are the journey
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountClientForgeWorld);
} else {
  mountClientForgeWorld();
}
