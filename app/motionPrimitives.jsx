/* Motion primitives — uses framer-motion UMD which exposes window.Motion */
const { motion, AnimatePresence, useInView, useScroll, useTransform, useMotionValue, useSpring } = window.Motion || window.FramerMotion || {};

/** WordsPullUp: splits text by spaces, each word slides up from y:20. */
function WordsPullUp({ text, className = '', delay = 0, stagger = 0.06, once = true }) {
  const words = String(text).split(' ');
  const ref = React.useRef(null);
  const inView = useInView(ref, { once, margin: '-10% 0px' });
  return (
    <span ref={ref} className={`inline-block ${className}`} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-baseline" style={{ paddingBottom: '0.08em' }}>
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            animate={inView ? { y: 0 } : { y: '110%' }}
            transition={{ delay: delay + i * stagger, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {w}
            {i < words.length - 1 && '\u00A0'}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** WordsPullUpMultiStyle: array of { text, className } segments. */
function WordsPullUpMultiStyle({ segments, className = '', delay = 0, stagger = 0.05, once = true }) {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once, margin: '-10% 0px' });

  // Flatten into words with their classNames, preserving segment-level breaks
  const flat = [];
  segments.forEach((seg, si) => {
    const words = seg.text.split(' ').filter(Boolean);
    words.forEach((w, wi) => {
      flat.push({ word: w, cn: seg.className || '', lineBreakAfter: seg.breakAfter && wi === words.length - 1 });
    });
  });

  return (
    <span ref={ref} className={className}>
      {flat.map((item, i) => (
        <React.Fragment key={i}>
          <span className="inline-block overflow-hidden align-baseline" style={{ paddingBottom: '0.08em' }}>
            <motion.span
              className={`inline-block ${item.cn}`}
              initial={{ y: '110%' }}
              animate={inView ? { y: 0 } : { y: '110%' }}
              transition={{ delay: delay + i * stagger, duration: 0.85, ease: [0.2, 0.8, 0.2, 1] }}
            >
              {item.word}
              {!item.lineBreakAfter && '\u00A0'}
            </motion.span>
          </span>
          {item.lineBreakAfter && <br />}
        </React.Fragment>
      ))}
    </span>
  );
}

/** FadeUp: simple in-view fade + rise */
function FadeUp({ children, delay = 0, y = 20, className = '', once = true, duration = 0.7 }) {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once, margin: '-10% 0px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ delay, duration, ease: [0.22, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

Object.assign(window, { WordsPullUp, WordsPullUpMultiStyle, FadeUp, motion, AnimatePresence, useInView, useScroll, useTransform, useMotionValue, useSpring });
