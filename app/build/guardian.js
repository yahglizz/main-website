/* The guardian — the winged anvil that rides along with the visitor.

   It is `position: fixed`, so it stays with the viewport for the whole page
   rather than belonging to any one section. Three nested layers, because each
   one wants `transform` and an element only gets one:

     .cf-guardian__lag    JS — trails behind the scroll, then catches up
     .cf-guardian__hover  CSS — the idle drift, so it is never perfectly still
     .cf-guardian__art    CSS — the wingbeat

   The rAF loop is not permanent: scrolling starts it, and it shuts itself off
   once the spring has settled. An always-on frame loop for a decoration that
   is motionless most of the time is rent nobody is paying. */

const {
  useRef: useRefGd,
  useEffect: useEffectGd
} = React;
function Guardian() {
  const lagRef = useRefGd(null);
  useEffectGd(() => {
    const el = lagRef.current;
    if (!el) return;
    // Honour the OS setting: the CSS drift is already disabled there, and a
    // scroll-linked spring is exactly the motion that setting is asking about.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let last = window.scrollY;
    let lag = 0,
      tilt = 0;
    let raf = 0,
      running = false;
    const tick = () => {
      const y = window.scrollY;
      const v = y - last;
      last = y;

      // Trail the scroll, then spring home. Clamped so a flung scroll can't
      // throw it off screen.
      const targetLag = Math.max(-70, Math.min(70, v * 1.6));
      const targetTilt = Math.max(-18, Math.min(18, v * 0.55));
      lag += (targetLag - lag) * 0.12;
      tilt += (targetTilt - tilt) * 0.1;
      el.style.transform = `translateY(${lag.toFixed(2)}px) rotate(${tilt.toFixed(2)}deg)`;

      // Settled and nothing moving? Stop until the next scroll wakes us.
      if (Math.abs(v) < 0.5 && Math.abs(lag) < 0.15 && Math.abs(tilt) < 0.15) {
        el.style.transform = 'translateY(0px) rotate(0deg)';
        running = false;
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('scroll', start, {
      passive: true
    });
    return () => {
      window.removeEventListener('scroll', start);
      cancelAnimationFrame(raf);
    };
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "cf-guardian",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cf-guardian__lag",
    ref: lagRef
  }, /*#__PURE__*/React.createElement("div", {
    className: "cf-guardian__hover"
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/logo/clientforge-mark.png",
    alt: "",
    className: "cf-guardian__art"
  }))));
}
Object.assign(window, {
  Guardian
});