/* Checkout / booking modal — opens straight off a plan card.

   Two modes, one component, because they're the same shape:
     'checkout' — they picked a package and want to start it
     'showcase' — they want to see the work first and book a 15-min call

   Payment is NOT wired yet. The order is captured through the same Web3Forms
   endpoint the contact form already uses, so this is genuinely functional
   today — the request reaches the inbox and nobody is charged. The Stripe slot
   is marked below with exactly what has to happen there; until it exists, the
   modal must never imply a card was taken.

   Hook aliases are prefixed (useStateCo/useEffectCo/useRefCo) because every
   .jsx here shares one global scope after Babel. */

const {
  useState: useStateCo,
  useEffect: useEffectCo,
  useRef: useRefCo
} = React;
const CHECKOUT_FORM_KEY = '3af7cccb-3c24-448c-9e36-5c587250dfcc'; // same Web3Forms inbox as Contact

function CoField({
  label,
  required,
  error,
  children
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: "block"
  }, /*#__PURE__*/React.createElement("div", {
    className: "co-label"
  }, label, required && /*#__PURE__*/React.createElement("span", {
    className: "text-gold"
  }, "*"), error && /*#__PURE__*/React.createElement("span", {
    className: "co-error"
  }, error)), children);
}
function CheckoutModal({
  plan,
  mode,
  onClose
}) {
  const isShowcase = mode === 'showcase';
  const [form, setForm] = useStateCo({
    name: '',
    email: '',
    phone: '',
    note: ''
  });
  const [errors, setErrors] = useStateCo({});
  const [sending, setSending] = useStateCo(false);
  const [sent, setSent] = useStateCo(false);
  const [failed, setFailed] = useStateCo('');
  const panelRef = useRefCo(null);
  const returnFocusRef = useRefCo(null);
  const set = k => e => setForm(f => ({
    ...f,
    [k]: e.target.value
  }));

  // Esc to close, focus into the dialog, and put focus back where it was.
  useEffectCo(() => {
    returnFocusRef.current = document.activeElement;
    const onKey = e => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    if (panelRef.current) panelRef.current.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = prev;
      if (returnFocusRef.current && returnFocusRef.current.focus) returnFocusRef.current.focus();
    };
  }, [onClose]);
  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = 'required';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email.trim())) err.email = 'valid email needed';
    setErrors(err);
    return Object.keys(err).length === 0;
  };
  const submit = async e => {
    e.preventDefault();
    if (sending || !validate()) return;
    setSending(true);
    setFailed('');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: CHECKOUT_FORM_KEY,
          subject: isShowcase ? `Showcase call request — ${plan.title}` : `New order — ${plan.title} (${plan.price})`,
          from_name: 'ClientForge site',
          name: form.name,
          email: form.email,
          phone: form.phone,
          package: `${plan.title} — ${plan.price}${plan.priceSub ? ' (' + plan.priceSub + ')' : ''}`,
          timeline: plan.timeline || '',
          request_type: isShowcase ? 'Showcase call' : 'Package reservation',
          ad_spend: plan.spendNote ? 'Client pays ad spend directly — this is management fee only' : '',
          message: form.note
        })
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      setSent(true);
    } catch (err) {
      setFailed("Couldn't send that — email us directly and we'll pick it up.");
    } finally {
      setSending(false);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "co-backdrop",
    onMouseDown: e => {
      if (e.target === e.currentTarget) onClose();
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: panelRef,
    className: "co-panel",
    role: "dialog",
    "aria-modal": "true",
    "aria-labelledby": "co-title",
    tabIndex: -1
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "co-close",
    onClick: onClose,
    "aria-label": "Close"
  }, /*#__PURE__*/React.createElement(X, {
    size: 16
  })), /*#__PURE__*/React.createElement("div", {
    className: "co-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "co-kicker"
  }, isShowcase ? 'Book a showcase' : 'Start this build'), /*#__PURE__*/React.createElement("h3", {
    id: "co-title",
    className: "co-title"
  }, plan.title), /*#__PURE__*/React.createElement("div", {
    className: "co-price"
  }, isShowcase ? 'Free · 15 minutes' : plan.price, !isShowcase && plan.priceSub && /*#__PURE__*/React.createElement("span", {
    className: "co-price__sub"
  }, plan.priceSub)), !isShowcase && /*#__PURE__*/React.createElement("div", {
    className: "co-promise"
  }, /*#__PURE__*/React.createElement(Check, {
    size: 12,
    strokeWidth: 3
  }), "Delivered in under 1 week \u2014 guaranteed")), sent ? /*#__PURE__*/React.createElement("div", {
    className: "co-done"
  }, /*#__PURE__*/React.createElement("span", {
    className: "co-done__mark"
  }, /*#__PURE__*/React.createElement(Check, {
    size: 22,
    strokeWidth: 3
  })), /*#__PURE__*/React.createElement("div", {
    className: "co-done__title"
  }, isShowcase ? 'Call request sent' : 'Reserved'), /*#__PURE__*/React.createElement("p", {
    className: "co-done__body"
  }, isShowcase ? "We'll reach out within one business day with a couple of times, and bring work that looks like yours." : "Nothing has been charged. We'll confirm scope by email within one business day and send a payment link once you're happy with it."), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "co-btn co-btn--primary",
    onClick: onClose
  }, "Close")) : /*#__PURE__*/React.createElement(React.Fragment, null, !isShowcase && /*#__PURE__*/React.createElement(React.Fragment, null, plan.inherits && /*#__PURE__*/React.createElement("div", {
    className: "co-inherits"
  }, "Everything in ", plan.inherits, ", plus:"), /*#__PURE__*/React.createElement("ul", {
    className: "co-includes"
  }, plan.features.map((f, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, /*#__PURE__*/React.createElement(Check, {
    size: 11,
    strokeWidth: 3
  }), /*#__PURE__*/React.createElement("span", null, f)))), plan.spendNote && /*#__PURE__*/React.createElement("div", {
    className: "co-spend"
  }, /*#__PURE__*/React.createElement("strong", null, "Ad spend is separate."), " You pay Meta directly with your own card, so you keep control of the budget and can change it any time. This price is the monthly management fee.")), /*#__PURE__*/React.createElement("form", {
    onSubmit: submit,
    className: "co-form",
    noValidate: true
  }, /*#__PURE__*/React.createElement(CoField, {
    label: "Name",
    required: true,
    error: errors.name
  }, /*#__PURE__*/React.createElement("input", {
    className: "co-input",
    value: form.name,
    onChange: set('name'),
    autoComplete: "name"
  })), /*#__PURE__*/React.createElement(CoField, {
    label: "Email",
    required: true,
    error: errors.email
  }, /*#__PURE__*/React.createElement("input", {
    className: "co-input",
    type: "email",
    value: form.email,
    onChange: set('email'),
    autoComplete: "email"
  })), /*#__PURE__*/React.createElement(CoField, {
    label: "Phone"
  }, /*#__PURE__*/React.createElement("input", {
    className: "co-input",
    type: "tel",
    value: form.phone,
    onChange: set('phone'),
    autoComplete: "tel"
  })), /*#__PURE__*/React.createElement(CoField, {
    label: isShowcase ? 'What would you like to see?' : 'Anything we should know?'
  }, /*#__PURE__*/React.createElement("textarea", {
    className: "co-input",
    rows: 3,
    value: form.note,
    onChange: set('note')
  })), failed && /*#__PURE__*/React.createElement("div", {
    className: "co-fail"
  }, failed), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "co-btn co-btn--primary",
    disabled: sending
  }, sending ? 'Sending…' : isShowcase ? 'Request my call' : 'Reserve this build'), !isShowcase && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "co-btn co-btn--ghost",
    disabled: true
  }, "Pay by card \u2014 coming soon"), /*#__PURE__*/React.createElement("p", {
    className: "co-fineprint"
  }, "No card is taken here. We confirm the scope first, then send a payment link."))))));
}
Object.assign(window, {
  CheckoutModal
});