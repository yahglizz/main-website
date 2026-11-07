/* Root app — section order, the pop-up lead form, and the sticky CTA.

   Order: hero (static HTML) → Pricing → The Math → Our Work → About →
   Contact → FAQ (static HTML, slotted in by hero.js) → footer. */

/* Any link to #contact, or any element with data-lead="<topic>", opens the
   pop-up form instead of scrolling. One listener on the document covers the
   static hero and FAQ markup too, which React never rendered. */
function useLeadTriggers(open) {
  React.useEffect(() => {
    const onClick = e => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const el = e.target.closest('a[href="#contact"], [data-lead]');
      if (!el) return;
      e.preventDefault();
      open(el.dataset.lead || '');
    };
    document.addEventListener('click', onClick);
    window.openLead = open;
    return () => {
      document.removeEventListener('click', onClick);
      delete window.openLead;
    };
  }, [open]);
}

/* Shows once the hero is off screen; hides while the Contact form is on
   screen, since the form is already right there. */
function StickyCta({
  hidden
}) {
  const [past, setPast] = React.useState(false);
  const [nearForm, setNearForm] = React.useState(false);
  React.useEffect(() => {
    const ios = [];
    const watch = (id, fn, threshold) => {
      const el = document.getElementById(id);
      if (!el) return;
      const io = new IntersectionObserver(([e]) => fn(e.isIntersecting), {
        threshold
      });
      io.observe(el);
      ios.push(io);
    };
    watch('top', on => setPast(!on), 0);
    watch('contact', setNearForm, 0.15);
    return () => ios.forEach(io => io.disconnect());
  }, []);
  const show = past && !nearForm && !hidden;
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: 'cf-sticky' + (show ? ' is-on' : ''),
    "data-lead": "",
    "aria-hidden": !show,
    tabIndex: show ? 0 : -1
  }, /*#__PURE__*/React.createElement("span", {
    className: "cf-sticky__dot",
    "aria-hidden": "true"
  }), "Get my free growth plan", /*#__PURE__*/React.createElement(ArrowRight, {
    size: 16
  }));
}
function App() {
  const [lead, setLead] = React.useState(null); // null = closed, string = topic
  const openLead = React.useCallback(topic => setLead(topic || ''), []);
  const closeLead = React.useCallback(() => setLead(null), []);
  useLeadTriggers(openLead);
  return /*#__PURE__*/React.createElement("main", {
    className: "bg-black text-ink"
  }, /*#__PURE__*/React.createElement(Guardian, null), /*#__PURE__*/React.createElement(motion.div, {
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1
    },
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }, /*#__PURE__*/React.createElement(Pricing, null), /*#__PURE__*/React.createElement(RoiMath, null), /*#__PURE__*/React.createElement(Work, null), /*#__PURE__*/React.createElement(About, null), /*#__PURE__*/React.createElement(Contact, null), /*#__PURE__*/React.createElement(SiteFooter, null)), /*#__PURE__*/React.createElement(StickyCta, {
    hidden: lead !== null
  }), lead !== null && /*#__PURE__*/React.createElement(LeadModal, {
    topic: lead,
    onClose: closeLead
  }));
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));