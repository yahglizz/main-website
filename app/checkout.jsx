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

const { useState: useStateCo, useEffect: useEffectCo, useRef: useRefCo } = React;

const CHECKOUT_FORM_KEY = '3af7cccb-3c24-448c-9e36-5c587250dfcc';   // same Web3Forms inbox as Contact

function CoField({ label, required, error, children }) {
  return (
    <label className="block">
      <div className="co-label">
        {label}{required && <span className="text-gold">*</span>}
        {error && <span className="co-error">{error}</span>}
      </div>
      {children}
    </label>
  );
}

function CheckoutModal({ plan, mode, onClose }) {
  const isShowcase = mode === 'showcase';
  const [form, setForm] = useStateCo({ name: '', email: '', phone: '', note: '' });
  const [errors, setErrors] = useStateCo({});
  const [sending, setSending] = useStateCo(false);
  const [sent, setSent] = useStateCo(false);
  const [failed, setFailed] = useStateCo('');
  const panelRef = useRefCo(null);
  const returnFocusRef = useRefCo(null);

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  // Esc to close, focus into the dialog, and put focus back where it was.
  useEffectCo(() => {
    returnFocusRef.current = document.activeElement;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
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

  const submit = async (e) => {
    e.preventDefault();
    if (sending || !validate()) return;
    setSending(true);
    setFailed('');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: CHECKOUT_FORM_KEY,
          subject: isShowcase
            ? `Showcase call request — ${plan.title}`
            : `New order — ${plan.title} (${plan.price})`,
          from_name: 'ClientForge site',
          name: form.name,
          email: form.email,
          phone: form.phone,
          package: `${plan.title} — ${plan.price}${plan.priceSub ? ' (' + plan.priceSub + ')' : ''}`,
          timeline: plan.timeline || '',
          request_type: isShowcase ? 'Showcase call' : 'Package reservation',
          ad_spend: plan.spendNote ? 'Client pays ad spend directly — this is management fee only' : '',
          message: form.note,
        }),
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      setSent(true);
    } catch (err) {
      setFailed("Couldn't send that — email us directly and we'll pick it up.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="co-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div
        ref={panelRef}
        className="co-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="co-title"
        tabIndex={-1}
      >
        <button type="button" className="co-close" onClick={onClose} aria-label="Close">
          <X size={16} />
        </button>

        {/* Header plate */}
        <div className="co-head">
          <div className="co-kicker">{isShowcase ? 'Book a showcase' : 'Start this build'}</div>
          <h3 id="co-title" className="co-title">{plan.title}</h3>
          {/* Mirrors the card: the modal must not present as a fixed quote a
              number the card called a starting point. */}
          {!isShowcase && <div className="price-from">Starting at</div>}
          <div className="co-price">
            {isShowcase ? 'Free · 15 minutes' : plan.price}
            {!isShowcase && plan.priceSub && <span className="co-price__sub">{plan.priceSub}</span>}
          </div>
          {!isShowcase && (
            <div className="co-promise">
              <Check size={12} strokeWidth={3} />
              Delivered in under 1 week — guaranteed
            </div>
          )}
        </div>

        {sent ? (
          <div className="co-done">
            <span className="co-done__mark"><Check size={22} strokeWidth={3} /></span>
            <div className="co-done__title">
              {isShowcase ? 'Call request sent' : 'Reserved'}
            </div>
            <p className="co-done__body">
              {isShowcase
                ? "We'll reach out within one business day with a couple of times, and bring work that looks like yours."
                : "Nothing has been charged. We'll confirm scope by email within one business day and send a payment link once you're happy with it."}
            </p>
            <button type="button" className="co-btn co-btn--primary" onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            {!isShowcase && (
              <>
                {plan.inherits && (
                  <div className="co-inherits">Everything in {plan.inherits}, plus:</div>
                )}
                <ul className="co-includes">
                  {plan.features.map((f, i) => (
                    <li key={i}><Check size={11} strokeWidth={3} /><span>{f}</span></li>
                  ))}
                </ul>
                {plan.spendNote && (
                  <div className="co-spend">
                    <strong>Ad spend is separate.</strong> You pay Meta directly with your
                    own card, so you keep control of the budget and can change it any
                    time. This price is the monthly management fee.
                  </div>
                )}
              </>
            )}

            <form onSubmit={submit} className="co-form" noValidate>
              <CoField label="Name" required error={errors.name}>
                <input className="co-input" value={form.name} onChange={set('name')} autoComplete="name" />
              </CoField>
              <CoField label="Email" required error={errors.email}>
                <input className="co-input" type="email" value={form.email} onChange={set('email')} autoComplete="email" />
              </CoField>
              <CoField label="Phone" >
                <input className="co-input" type="tel" value={form.phone} onChange={set('phone')} autoComplete="tel" />
              </CoField>
              <CoField label={isShowcase ? 'What would you like to see?' : 'Anything we should know?'}>
                <textarea className="co-input" rows={3} value={form.note} onChange={set('note')} />
              </CoField>

              {failed && <div className="co-fail">{failed}</div>}

              <button type="submit" className="co-btn co-btn--primary" disabled={sending}>
                {sending ? 'Sending…' : (isShowcase ? 'Request my call' : 'Reserve this build')}
              </button>

              {!isShowcase && (
                <>
                  {/* ── STRIPE SLOT ──────────────────────────────────────
                      To turn this on: create a Checkout Session server-side
                      for this plan's price id, then redirect to session.url.
                      Nothing client-side should ever hold a secret key.
                      Until that exists this stays visibly disabled — the
                      button must not suggest a card was taken. */}
                  <button type="button" className="co-btn co-btn--ghost" disabled>
                    Pay by card — coming soon
                  </button>
                  <p className="co-fineprint">
                    No card is taken here. We confirm the scope first, then send a payment link.
                  </p>
                </>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* The lead form as a pop-up. Every "book a call" button on the page opens
   this instead of scrolling to Contact, so the form is one tap away from
   wherever the visitor decided. Same Web3Forms inbox as everything else. */
const LEAD_TOPICS = ['Website', 'Ads', 'AI Automation', 'Full System', 'Custom App', 'Not sure'];

function LeadModal({ topic, onClose }) {
  const [form, setForm] = useStateCo({ name: '', email: '', phone: '', help: LEAD_TOPICS.includes(topic) ? topic : '', note: '' });
  const [errors, setErrors] = useStateCo({});
  const [sending, setSending] = useStateCo(false);
  const [sent, setSent] = useStateCo(false);
  const [failed, setFailed] = useStateCo('');
  const panelRef = useRefCo(null);
  const firstRef = useRefCo(null);

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  useEffectCo(() => {
    const back = document.activeElement;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    // Straight into the first field: the visitor came here to type.
    (firstRef.current || panelRef.current)?.focus({ preventScroll: true });
    return () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = prev;
      if (back && back.focus) back.focus({ preventScroll: true });
    };
  }, [onClose]);

  const submit = async (e) => {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = 'required';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email.trim())) err.email = 'valid email needed';
    if (!form.help) err.help = 'pick one';
    setErrors(err);
    if (sending || Object.keys(err).length) return;
    setSending(true);
    setFailed('');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: CHECKOUT_FORM_KEY,
          subject: `New lead — ${form.help} — ${form.name}`,
          from_name: 'ClientForge site',
          name: form.name,
          email: form.email,
          replyto: form.email,
          phone: form.phone,
          interested_in: form.help,
          source: 'Pop-up form',
          message: form.note || '(no message)',
          botcheck: '',
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success === false) throw new Error(data.message || 'HTTP ' + res.status);
      setSent(true);
    } catch {
      setFailed(`Couldn't send that. Email us at ${CONTACT_EMAIL} and we'll pick it up.`);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="co-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div ref={panelRef} className="co-panel lead-panel" role="dialog" aria-modal="true" aria-labelledby="lead-title" tabIndex={-1}>
        <button type="button" className="co-close" onClick={onClose} aria-label="Close">
          <X size={16} />
        </button>

        <div className="co-head">
          <div className="co-kicker">Free · 20 minutes · No pressure</div>
          <h3 id="lead-title" className="co-title">Get your free growth plan</h3>
          <div className="co-promise">
            <Check size={12} strokeWidth={3} />
            We reply within the business day, usually within 4 hours
          </div>
        </div>

        {sent ? (
          <div className="co-done">
            <span className="co-done__mark"><Check size={22} strokeWidth={3} /></span>
            <div className="co-done__title">Got it, {form.name.trim().split(' ')[0]}.</div>
            <p className="co-done__body">
              Your request is in. Check {form.email}: we'll reply with a plan or a call
              invite within the business day.
            </p>
            <button type="button" className="co-btn co-btn--primary" onClick={onClose}>Close</button>
          </div>
        ) : (
          <form onSubmit={submit} className="co-form" noValidate>
            <CoField label="Name" required error={errors.name}>
              <input ref={firstRef} className="co-input" value={form.name} onChange={set('name')} autoComplete="name" />
            </CoField>
            <CoField label="Email" required error={errors.email}>
              <input className="co-input" type="email" value={form.email} onChange={set('email')} autoComplete="email" />
            </CoField>
            <CoField label="Phone">
              <input className="co-input" type="tel" value={form.phone} onChange={set('phone')} autoComplete="tel" />
            </CoField>
            <div>
              <div className="co-label">
                What do you need?<span className="text-gold">*</span>
                {errors.help && <span className="co-error">{errors.help}</span>}
              </div>
              <div className="lead-topics" role="group" aria-label="What do you need?">
                {LEAD_TOPICS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={'lead-topic' + (form.help === t ? ' is-on' : '')}
                    aria-pressed={form.help === t}
                    onClick={() => setForm(f => ({ ...f, help: t }))}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <CoField label="What are you trying to grow or fix?">
              <textarea className="co-input" rows={3} value={form.note} onChange={set('note')} />
            </CoField>

            {failed && <div className="co-fail">{failed}</div>}

            <button type="submit" className="co-btn co-btn--primary" disabled={sending}>
              {sending ? 'Sending…' : 'Send my request'}
            </button>
            <p className="co-fineprint">No spam, no sales pressure. A real person replies.</p>
          </form>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { CheckoutModal, LeadModal });
