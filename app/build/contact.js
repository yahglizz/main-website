/* Section 5: Contact form — powered by Web3Forms */

// atouchofblessing.com — singular. The plural spelling has no MX records at
// all, so every mailto: click and every reply-to on that domain bounced.
const CONTACT_EMAIL = 'yahjair@atouchofblessing.com';
const WEB3FORMS_KEY = '3af7cccb-3c24-448c-9e36-5c587250dfcc';
function Field({
  label,
  children,
  hint,
  required
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: "block"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] uppercase tracking-[0.22em] text-primary/55 mb-2 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", null, label, required && /*#__PURE__*/React.createElement("span", {
    className: "text-primary/60 ml-0.5"
  }, "*")), hint && /*#__PURE__*/React.createElement("span", {
    className: "text-primary/35 normal-case tracking-normal text-[10px]"
  }, hint)), children);
}
function Contact() {
  const [form, setForm] = React.useState({
    name: '',
    business: '',
    email: '',
    help: '',
    message: ''
  });
  const [submitted, setSubmitted] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [sendError, setSendError] = React.useState('');
  const [errors, setErrors] = React.useState({});
  const set = k => e => setForm(f => ({
    ...f,
    [k]: e.target.value
  }));
  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = 'required';
    if (!form.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) err.email = 'valid email needed';
    if (!form.help.trim()) err.help = 'required';
    setErrors(err);
    return Object.keys(err).length === 0;
  };
  const submit = async e => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    setSendError('');
    const messageBody = [`Name: ${form.name}`, form.business ? `Business: ${form.business}` : '', `Email: ${form.email}`, `Interested in: ${form.help}`, '', 'Message:', form.message || '(no message provided)'].filter(Boolean).join('\n');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New inquiry — ${form.help} — ${form.name}`,
          from_name: form.name,
          replyto: form.email,
          message: messageBody,
          /* auto-reply to the submitter */
          botcheck: ''
        })
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setSendError(`Something went wrong (${data.message || 'unknown error'}). Email us directly at ${CONTACT_EMAIL}`);
      }
    } catch {
      setSendError(`Network error — please email us directly at ${CONTACT_EMAIL}`);
    } finally {
      setSending(false);
    }
  };
  const reset = () => {
    setSubmitted(false);
    setSendError('');
    setForm({
      name: '',
      business: '',
      email: '',
      help: '',
      message: ''
    });
  };
  const fieldCls = 'field w-full rounded-xl px-4 py-3 text-sm placeholder-primary/35';
  return /*#__PURE__*/React.createElement("section", {
    id: "contact",
    "data-screen-label": "05 Contact",
    className: "relative bg-black pt-24 md:pt-32 pb-16"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-5 sm:px-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary/55 mb-10 md:mb-14"
  }, /*#__PURE__*/React.createElement("span", {
    className: "inline-block w-6 h-px bg-primary/30"
  }), /*#__PURE__*/React.createElement("span", null, "05 \xB7 Contact")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-5"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[0.95] text-ink"
  }, /*#__PURE__*/React.createElement(WordsPullUpMultiStyle, {
    segments: [{
      text: "Let's build",
      className: ''
    }, {
      text: 'something',
      className: ''
    }, {
      text: 'that grows',
      className: 'font-serif italic text-primary/85'
    }, {
      text: 'your business.',
      className: ''
    }]
  })), /*#__PURE__*/React.createElement(FadeUp, {
    delay: 0.2
  }, /*#__PURE__*/React.createElement("p", {
    className: "mt-6 text-primary/65 text-sm md:text-base max-w-md leading-relaxed"
  }, "Tell us what you need and we'll reach out with the best next step \u2014 usually a 20-minute call, sometimes a written plan.")), /*#__PURE__*/React.createElement(FadeUp, {
    delay: 0.3
  }, /*#__PURE__*/React.createElement("div", {
    className: "mt-10 space-y-4"
  }, [{
    icon: Mail,
    label: 'Email',
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`
  }, {
    icon: Instagram,
    label: 'Instagram',
    value: '@forgelabsx',
    href: 'https://www.instagram.com/forgelabsx/'
  }, {
    icon: Sparkles,
    label: 'Response time',
    value: 'Usually within 4 hours',
    href: null
  }].map((r, i) => {
    const Ic = r.icon;
    const inner = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "w-10 h-10 rounded-full bg-surface border border-white/5 flex items-center justify-center text-primary/80 group-hover:text-ink group-hover:border-white/20 transition-colors flex-shrink-0"
    }, /*#__PURE__*/React.createElement(Ic, {
      size: 16
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "text-[10px] uppercase tracking-[0.22em] text-primary/45"
    }, r.label), /*#__PURE__*/React.createElement("div", {
      className: "text-sm text-ink"
    }, r.value)));
    return r.href ? /*#__PURE__*/React.createElement("a", {
      key: i,
      href: r.href,
      target: r.href.startsWith('http') ? '_blank' : undefined,
      rel: "noopener noreferrer",
      className: "flex items-center gap-4 group"
    }, inner) : /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "flex items-center gap-4 group cursor-default"
    }, inner);
  }))), /*#__PURE__*/React.createElement(FadeUp, {
    delay: 0.4
  }, /*#__PURE__*/React.createElement("div", {
    className: "mt-10 rounded-2xl border border-white/5 bg-surface p-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-primary/55 mb-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"
  }), "What happens next"), /*#__PURE__*/React.createElement("ol", {
    className: "space-y-2.5 text-sm text-primary/80"
  }, ['We read your message within the business day.', 'You get a short reply — a plan, call invite, or question.', "If it's a fit, we send a fixed-scope quote within 48 hrs."].map((s, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    className: "flex gap-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-5 h-5 rounded-full bg-black border border-white/10 flex items-center justify-center text-[10px] text-primary/70 flex-shrink-0"
  }, i + 1), /*#__PURE__*/React.createElement("span", null, s))))))), /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-7"
  }, /*#__PURE__*/React.createElement(FadeUp, {
    delay: 0.2
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative bg-surface grain rounded-2xl md:rounded-3xl border border-white/5 p-6 md:p-10"
  }, /*#__PURE__*/React.createElement(AnimatePresence, {
    mode: "wait"
  }, submitted ? /*#__PURE__*/React.createElement(motion.div, {
    key: "thanks",
    initial: {
      opacity: 0,
      y: 14
    },
    animate: {
      opacity: 1,
      y: 0
    },
    exit: {
      opacity: 0,
      y: -10
    },
    className: "text-center py-8 md:py-16"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mx-auto w-14 h-14 rounded-full bg-primary text-black flex items-center justify-center mb-6"
  }, /*#__PURE__*/React.createElement(Check, {
    size: 24,
    strokeWidth: 2.4
  })), /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl md:text-3xl font-medium text-ink"
  }, "Got it, ", form.name.split(' ')[0] || 'friend', "."), /*#__PURE__*/React.createElement("p", {
    className: "mt-3 text-primary/65 text-sm max-w-md mx-auto"
  }, "Your message is on its way. Check ", /*#__PURE__*/React.createElement("span", {
    className: "text-ink"
  }, form.email), " \u2014 we'll be in touch within the business day."), /*#__PURE__*/React.createElement("button", {
    onClick: reset,
    className: "mt-8 text-xs uppercase tracking-[0.22em] text-primary/70 hover:text-ink transition-colors"
  }, "Send another message \u2192")) : /*#__PURE__*/React.createElement(motion.form, {
    key: "form",
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1
    },
    exit: {
      opacity: 0
    },
    onSubmit: submit,
    className: "grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5",
    noValidate: true
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Your name",
    required: true
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: form.name,
    onChange: set('name'),
    placeholder: "Jane Carter",
    className: fieldCls + (errors.name ? ' !border-red-400/60' : '')
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Business name"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: form.business,
    onChange: set('business'),
    placeholder: "Carter & Co.",
    className: fieldCls
  })), /*#__PURE__*/React.createElement("div", {
    className: "sm:col-span-2"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Your email",
    required: true
  }, /*#__PURE__*/React.createElement("input", {
    type: "email",
    value: form.email,
    onChange: set('email'),
    placeholder: "jane@carter.co",
    className: fieldCls + (errors.email ? ' !border-red-400/60' : '')
  }))), /*#__PURE__*/React.createElement("div", {
    className: "sm:col-span-2"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "What do you need help with?",
    required: true
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 md:grid-cols-4 gap-2"
  }, ['Website', 'AI Automation', 'Custom App', 'Not sure'].map(opt => /*#__PURE__*/React.createElement("button", {
    key: opt,
    type: "button",
    onClick: () => setForm(f => ({
      ...f,
      help: opt
    })),
    className: ['text-xs uppercase tracking-[0.18em] px-3 py-2.5 rounded-xl border transition-colors', form.help === opt ? 'bg-primary text-black border-primary' : 'bg-black/30 text-primary/70 border-white/10 hover:border-white/30 hover:text-ink'].join(' ')
  }, opt))), errors.help && /*#__PURE__*/React.createElement("div", {
    className: "mt-2 text-[11px] text-red-400/90"
  }, "Pick one so we can route your message."))), /*#__PURE__*/React.createElement("div", {
    className: "sm:col-span-2"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Message",
    hint: "what you're trying to grow, fix, or automate"
  }, /*#__PURE__*/React.createElement("textarea", {
    rows: 5,
    value: form.message,
    onChange: set('message'),
    placeholder: "We get about 40 inbound leads a week and most slip through the cracks. We'd like\u2026",
    className: fieldCls + ' resize-none'
  }))), sendError && /*#__PURE__*/React.createElement("div", {
    className: "sm:col-span-2 text-[12px] text-red-400/90 bg-red-400/5 border border-red-400/20 rounded-xl px-4 py-3"
  }, sendError), /*#__PURE__*/React.createElement("div", {
    className: "sm:col-span-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-[11px] text-primary/40 max-w-xs"
  }, "We reply to every message. No spam, no sales pressure \u2014 just a real human picking up the thread."), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    disabled: sending,
    className: "group w-full sm:w-auto inline-flex items-center justify-between gap-3 bg-primary text-black rounded-full pl-6 pr-1.5 py-1.5 font-medium text-sm hover:bg-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
  }, /*#__PURE__*/React.createElement("span", null, sending ? 'Sending…' : 'Start Your Project'), /*#__PURE__*/React.createElement("span", {
    className: "bg-black rounded-full w-10 h-10 flex items-center justify-center text-primary transition-transform group-hover:scale-110"
  }, sending ? /*#__PURE__*/React.createElement(motion.span, {
    animate: {
      rotate: 360
    },
    transition: {
      repeat: Infinity,
      duration: 0.8,
      ease: 'linear'
    },
    className: "block w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full"
  }) : /*#__PURE__*/React.createElement(ArrowRight, {
    size: 16
  })))))))))), /*#__PURE__*/React.createElement("div", {
    className: "mt-20 md:mt-28 pt-8 border-t border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-primary/45"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "inline-block w-1.5 h-1.5 rounded-full bg-primary"
  }), /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-primary/80"
  }, "ClientForge"), /*#__PURE__*/React.createElement("span", null, "\xB7 AI automations, apps & websites")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-6"
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://www.instagram.com/forgelabsx/",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "flex items-center gap-1.5 hover:text-ink transition-colors"
  }, /*#__PURE__*/React.createElement(Instagram, {
    size: 13
  }), /*#__PURE__*/React.createElement("span", null, "@forgelabsx")), /*#__PURE__*/React.createElement("a", {
    href: "#home",
    className: "hover:text-ink transition-colors"
  }, "Back to top \u2191"), /*#__PURE__*/React.createElement("span", null, "\xA9 ", new Date().getFullYear(), " ClientForge")))));
}
Object.assign(window, {
  Contact
});