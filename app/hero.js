/* ============================================================================
   ClientForge — the hero film.

   The hero used to be a scroll-scrubbed flight (scrub-engine.js). It is now one
   seamless loop (assets/vid/flight-loop.mp4: the five legs joined end to end,
   the last HERO_SHIFT seconds cross-faded into the opening so the loop has no
   freeze and no jump, keyframe every second so district jumps land instantly). The markup lives in index.html so crawlers read it without JS; this
   file only plays the film and keeps the caption in step with what's on screen.
   ========================================================================== */

// Each leg is 4.04s and FLIES INTO its district, so a district is only on
// screen near the end of its own leg. The caption switches LEAD seconds into
// the leg — while the district is approaching — and holds until the next one.
// Retime the film? Change these two numbers, nothing else.
const HERO_LEG = 4.041667;
const HERO_LEAD = 1.6;
// The loop file starts HERO_SHIFT seconds into leg 1 (that slice became the
// cross-fade at the end), so film time = video time + HERO_SHIFT.
const HERO_SHIFT = 0.75;

function mountHero() {
  const hero = document.querySelector('.cf-hero');
  if (!hero) return;
  const video = hero.querySelector('.cf-hero__video');
  const scenes = [...hero.querySelectorAll('.cf-scene')];
  const steps = [...hero.querySelectorAll('[data-go]')];
  const toggle = hero.querySelector('.cf-rail__toggle');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current = 0;
  let userPaused = reduce;   // reduced motion: the film waits for a tap

  const sceneAt = (t) => Math.min(scenes.length - 1, Math.max(0, Math.floor((t + HERO_SHIFT - HERO_LEAD) / HERO_LEG)));

  function show(i) {
    if (i === current) return;
    scenes[current].classList.remove('is-on');
    steps[current].classList.remove('is-on');
    scenes[i].classList.add('is-on');
    steps[i].classList.add('is-on');
    current = i;
  }

  function setPaused(p) {
    userPaused = p;
    toggle.setAttribute('aria-pressed', String(p));
    toggle.setAttribute('aria-label', p ? 'Play the film' : 'Pause the film');
    hero.classList.toggle('is-paused', p);
    if (p) video.pause();
    else video.play().catch(() => setPaused(true));   // autoplay refused: show the play button
  }

  // timeupdate fires ~4x a second, which is plenty for a caption that changes
  // every four seconds and costs nothing compared with a rAF loop.
  video.addEventListener('timeupdate', () => show(sceneAt(video.currentTime)));

  steps.forEach((b) => b.addEventListener('click', () => {
    const i = +b.dataset.go;
    // Land just after the caption switch, so the district is flying in.
    video.currentTime = Math.max(0, i * HERO_LEG + HERO_LEAD + 0.05 - HERO_SHIFT);
    show(i);
    if (userPaused) setPaused(false);
  }));

  toggle.addEventListener('click', () => setPaused(!userPaused));

  // No point decoding 1080p video nobody can see.
  new IntersectionObserver(([e]) => {
    if (userPaused) return;
    if (e.isIntersecting) video.play().catch(() => {});
    else video.pause();
  }, { threshold: 0.15 }).observe(hero);

  setPaused(userPaused);
}

/* The FAQ is static HTML after #root so it's crawlable without JS. It sits
   at the bottom of the page, after Contact and above the footer: once React
   has rendered the footer, slot the FAQ in front of it. */
function placeFaq() {
  const faq = document.getElementById('faq');
  const root = document.getElementById('root');
  if (!faq || !root) return;
  const move = () => {
    const foot = document.getElementById('site-footer');
    if (!foot) return false;
    foot.parentNode.insertBefore(faq, foot);
    return true;
  };
  if (move()) return;
  const mo = new MutationObserver(() => { if (move()) mo.disconnect(); });
  mo.observe(root, { childList: true, subtree: true });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => { mountHero(); placeFaq(); });
} else {
  mountHero();
  placeFaq();
}
