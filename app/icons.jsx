/* Minimal inline icon set — stroke-based, lucide-ish.
   All icons accept className, size, strokeWidth. */
const _iconProps = (p) => ({
  width: p.size || 20,
  height: p.size || 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: p.strokeWidth || 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  className: p.className || '',
  'aria-hidden': true,
});

const ArrowRight = (p) => (
  <svg {..._iconProps(p)}><path d="M5 12h14"/><path d="m13 5 7 7-7 7"/></svg>
);
const ArrowUpRight = (p) => (
  <svg {..._iconProps(p)}><path d="M7 17 17 7"/><path d="M8 7h9v9"/></svg>
);
const Check = (p) => (
  <svg {..._iconProps(p)}><path d="M20 6 9 17l-5-5"/></svg>
);
const Star = (p) => (
  <svg {..._iconProps(p)} fill="currentColor" stroke="none"><path d="M12 2.5 14.9 8.6l6.6.9-4.8 4.6 1.2 6.6L12 17.6l-5.9 3.1 1.2-6.6L2.5 9.5l6.6-.9L12 2.5Z"/></svg>
);
const Sparkles = (p) => (
  <svg {..._iconProps(p)}><path d="M12 3v4"/><path d="M12 17v4"/><path d="M3 12h4"/><path d="M17 12h4"/><path d="m5.5 5.5 2.5 2.5"/><path d="m16 16 2.5 2.5"/><path d="m18.5 5.5-2.5 2.5"/><path d="m8 16-2.5 2.5"/></svg>
);
const Zap = (p) => (
  <svg {..._iconProps(p)}><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/></svg>
);
const Layers = (p) => (
  <svg {..._iconProps(p)}><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/><path d="m3 18 9 5 9-5"/></svg>
);
const Cpu = (p) => (
  <svg {..._iconProps(p)}><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"/></svg>
);
const Globe = (p) => (
  <svg {..._iconProps(p)}><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18"/><path d="M12 3a14 14 0 0 0 0 18"/></svg>
);
const Phone = (p) => (
  <svg {..._iconProps(p)}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6 6l1.1-1.1a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2Z"/></svg>
);
const Mail = (p) => (
  <svg {..._iconProps(p)}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
);
const User = (p) => (
  <svg {..._iconProps(p)}><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>
);
const Briefcase = (p) => (
  <svg {..._iconProps(p)}><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><path d="M3 13h18"/></svg>
);
const Menu = (p) => (
  <svg {..._iconProps(p)}><path d="M3 6h18M3 12h18M3 18h18"/></svg>
);
const X = (p) => (
  <svg {..._iconProps(p)}><path d="m6 6 12 12M18 6 6 18"/></svg>
);
const Play = (p) => (
  <svg {..._iconProps(p)} fill="currentColor" stroke="none"><path d="M7 4v16l13-8Z"/></svg>
);
const Pause = (p) => (
  <svg {..._iconProps(p)}><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
);
const Volume = (p) => (
  <svg {..._iconProps(p)}><path d="M11 5 6 9H2v6h4l5 4V5Z"/><path d="M16 9a4 4 0 0 1 0 6"/><path d="M19 6a8 8 0 0 1 0 12"/></svg>
);
const VolumeOff = (p) => (
  <svg {..._iconProps(p)}><path d="M11 5 6 9H2v6h4l5 4V5Z"/><path d="m23 9-6 6"/><path d="m17 9 6 6"/></svg>
);
const ChevronDown = (p) => (
  <svg {..._iconProps(p)}><path d="m6 9 6 6 6-6"/></svg>
);
const Circle = (p) => (
  <svg {..._iconProps(p)}><circle cx="12" cy="12" r="9"/></svg>
);
const Dot = (p) => (
  <svg {..._iconProps(p)} fill="currentColor" stroke="none"><circle cx="12" cy="12" r="3"/></svg>
);
const Instagram = (p) => (
  <svg {..._iconProps(p)}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4.5"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
);

Object.assign(window, {
  ArrowRight, ArrowUpRight, Check, Star, Sparkles, Zap, Layers, Cpu,
  Globe, Phone, Mail, User, Briefcase, Menu, X, Play, Pause, Volume, VolumeOff, ChevronDown, Circle, Dot, Instagram,
});
