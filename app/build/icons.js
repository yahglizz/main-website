function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Minimal inline icon set — stroke-based, lucide-ish.
   All icons accept className, size, strokeWidth. */
const _iconProps = p => ({
  width: p.size || 20,
  height: p.size || 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: p.strokeWidth || 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  className: p.className || '',
  'aria-hidden': true
});
const ArrowRight = p => /*#__PURE__*/React.createElement("svg", _iconProps(p), /*#__PURE__*/React.createElement("path", {
  d: "M5 12h14"
}), /*#__PURE__*/React.createElement("path", {
  d: "m13 5 7 7-7 7"
}));
const ArrowUpRight = p => /*#__PURE__*/React.createElement("svg", _iconProps(p), /*#__PURE__*/React.createElement("path", {
  d: "M7 17 17 7"
}), /*#__PURE__*/React.createElement("path", {
  d: "M8 7h9v9"
}));
const Check = p => /*#__PURE__*/React.createElement("svg", _iconProps(p), /*#__PURE__*/React.createElement("path", {
  d: "M20 6 9 17l-5-5"
}));
const Star = p => /*#__PURE__*/React.createElement("svg", _extends({}, _iconProps(p), {
  fill: "currentColor",
  stroke: "none"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 2.5 14.9 8.6l6.6.9-4.8 4.6 1.2 6.6L12 17.6l-5.9 3.1 1.2-6.6L2.5 9.5l6.6-.9L12 2.5Z"
}));
const Sparkles = p => /*#__PURE__*/React.createElement("svg", _iconProps(p), /*#__PURE__*/React.createElement("path", {
  d: "M12 3v4"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 17v4"
}), /*#__PURE__*/React.createElement("path", {
  d: "M3 12h4"
}), /*#__PURE__*/React.createElement("path", {
  d: "M17 12h4"
}), /*#__PURE__*/React.createElement("path", {
  d: "m5.5 5.5 2.5 2.5"
}), /*#__PURE__*/React.createElement("path", {
  d: "m16 16 2.5 2.5"
}), /*#__PURE__*/React.createElement("path", {
  d: "m18.5 5.5-2.5 2.5"
}), /*#__PURE__*/React.createElement("path", {
  d: "m8 16-2.5 2.5"
}));
const Zap = p => /*#__PURE__*/React.createElement("svg", _iconProps(p), /*#__PURE__*/React.createElement("path", {
  d: "M13 2 4 14h7l-1 8 9-12h-7l1-8Z"
}));
const Layers = p => /*#__PURE__*/React.createElement("svg", _iconProps(p), /*#__PURE__*/React.createElement("path", {
  d: "m12 3 9 5-9 5-9-5 9-5Z"
}), /*#__PURE__*/React.createElement("path", {
  d: "m3 13 9 5 9-5"
}), /*#__PURE__*/React.createElement("path", {
  d: "m3 18 9 5 9-5"
}));
const Cpu = p => /*#__PURE__*/React.createElement("svg", _iconProps(p), /*#__PURE__*/React.createElement("rect", {
  x: "4",
  y: "4",
  width: "16",
  height: "16",
  rx: "2"
}), /*#__PURE__*/React.createElement("rect", {
  x: "9",
  y: "9",
  width: "6",
  height: "6"
}), /*#__PURE__*/React.createElement("path", {
  d: "M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"
}));
const Globe = p => /*#__PURE__*/React.createElement("svg", _iconProps(p), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "9"
}), /*#__PURE__*/React.createElement("path", {
  d: "M3 12h18"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 3a14 14 0 0 1 0 18"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 3a14 14 0 0 0 0 18"
}));
const Phone = p => /*#__PURE__*/React.createElement("svg", _iconProps(p), /*#__PURE__*/React.createElement("path", {
  d: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6 6l1.1-1.1a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2Z"
}));
const Mail = p => /*#__PURE__*/React.createElement("svg", _iconProps(p), /*#__PURE__*/React.createElement("rect", {
  x: "3",
  y: "5",
  width: "18",
  height: "14",
  rx: "2"
}), /*#__PURE__*/React.createElement("path", {
  d: "m3 7 9 6 9-6"
}));
const User = p => /*#__PURE__*/React.createElement("svg", _iconProps(p), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "8",
  r: "4"
}), /*#__PURE__*/React.createElement("path", {
  d: "M4 21a8 8 0 0 1 16 0"
}));
const Briefcase = p => /*#__PURE__*/React.createElement("svg", _iconProps(p), /*#__PURE__*/React.createElement("rect", {
  x: "3",
  y: "7",
  width: "18",
  height: "13",
  rx: "2"
}), /*#__PURE__*/React.createElement("path", {
  d: "M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"
}), /*#__PURE__*/React.createElement("path", {
  d: "M3 13h18"
}));
const Menu = p => /*#__PURE__*/React.createElement("svg", _iconProps(p), /*#__PURE__*/React.createElement("path", {
  d: "M3 6h18M3 12h18M3 18h18"
}));
const X = p => /*#__PURE__*/React.createElement("svg", _iconProps(p), /*#__PURE__*/React.createElement("path", {
  d: "m6 6 12 12M18 6 6 18"
}));
const Play = p => /*#__PURE__*/React.createElement("svg", _extends({}, _iconProps(p), {
  fill: "currentColor",
  stroke: "none"
}), /*#__PURE__*/React.createElement("path", {
  d: "M7 4v16l13-8Z"
}));
const Pause = p => /*#__PURE__*/React.createElement("svg", _iconProps(p), /*#__PURE__*/React.createElement("rect", {
  x: "6",
  y: "5",
  width: "4",
  height: "14",
  rx: "1"
}), /*#__PURE__*/React.createElement("rect", {
  x: "14",
  y: "5",
  width: "4",
  height: "14",
  rx: "1"
}));
const Volume = p => /*#__PURE__*/React.createElement("svg", _iconProps(p), /*#__PURE__*/React.createElement("path", {
  d: "M11 5 6 9H2v6h4l5 4V5Z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M16 9a4 4 0 0 1 0 6"
}), /*#__PURE__*/React.createElement("path", {
  d: "M19 6a8 8 0 0 1 0 12"
}));
const VolumeOff = p => /*#__PURE__*/React.createElement("svg", _iconProps(p), /*#__PURE__*/React.createElement("path", {
  d: "M11 5 6 9H2v6h4l5 4V5Z"
}), /*#__PURE__*/React.createElement("path", {
  d: "m23 9-6 6"
}), /*#__PURE__*/React.createElement("path", {
  d: "m17 9 6 6"
}));
const ChevronDown = p => /*#__PURE__*/React.createElement("svg", _iconProps(p), /*#__PURE__*/React.createElement("path", {
  d: "m6 9 6 6 6-6"
}));
const Circle = p => /*#__PURE__*/React.createElement("svg", _iconProps(p), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "9"
}));
const Dot = p => /*#__PURE__*/React.createElement("svg", _extends({}, _iconProps(p), {
  fill: "currentColor",
  stroke: "none"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "3"
}));
const Instagram = p => /*#__PURE__*/React.createElement("svg", _iconProps(p), /*#__PURE__*/React.createElement("rect", {
  x: "2",
  y: "2",
  width: "20",
  height: "20",
  rx: "5",
  ry: "5"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "4.5"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "17.5",
  cy: "6.5",
  r: "1",
  fill: "currentColor",
  stroke: "none"
}));
Object.assign(window, {
  ArrowRight,
  ArrowUpRight,
  Check,
  Star,
  Sparkles,
  Zap,
  Layers,
  Cpu,
  Globe,
  Phone,
  Mail,
  User,
  Briefcase,
  Menu,
  X,
  Play,
  Pause,
  Volume,
  VolumeOff,
  ChevronDown,
  Circle,
  Dot,
  Instagram
});