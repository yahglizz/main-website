/* Section 3: Work We Did Before — interactive filterable grid */

const PROJECTS = [
  {
    id: 7,
    title: 'Barbershop Brand & Booking Site',
    description: 'Brand-forward site with online booking, service menu, stylist profiles, and gallery.',
    tags: ['Website', 'Branding'],
    stat: '2× online bookings',
    variant: 'video',
    videoSrc: 'more%20previews/barbershop.mov',
    accent: '#D4A574',
  },
  {
    id: 8,
    title: 'Childcare Center Website',
    description: 'Parent-first site with enrollment inquiry, staff bios, daily schedule, and virtual tour.',
    tags: ['Website'],
    stat: '3× inquiry volume',
    variant: 'video',
    videoSrc: 'more%20previews/childcare.mov',
    accent: '#FFD580',
  },
  {
    id: 9,
    title: 'Daycare Facility Website',
    description: 'Full-featured daycare site with program pages, photo gallery, pricing tiers, and waitlist capture.',
    tags: ['Website'],
    stat: 'Waitlist filled in 2 weeks',
    variant: 'video',
    videoSrc: 'more%20previews/daycare.mp4',
    accent: '#A8D8EA',
  },
  {
    id: 10,
    title: 'Short-Term Rental Website',
    description: 'Property showcase with availability calendar, photo galleries, and direct booking flow.',
    tags: ['Website', 'Funnel'],
    stat: '+85% direct bookings',
    variant: 'video',
    videoSrc: 'more%20previews/rental.mov',
    accent: '#B8E0B8',
  },
  {
    id: 11,
    title: 'Home Services Company Site',
    description: 'High-converting services site with instant quote calculator and automated dispatch trigger.',
    tags: ['Website', 'Funnel'],
    stat: '+40% quote requests',
    variant: 'video',
    videoSrc: 'more%20previews/service.mov',
    accent: '#9FC6FF',
  },
  {
    id: 1,
    title: 'Roofing Company Lead Gen Site',
    description: 'Single-page funnel with quote form, instant SMS to crew, and analytics hooks.',
    tags: ['Website', 'Funnel'],
    stat: '+162% qualified leads',
    variant: 'stripes-a',
    accent: '#DEDBC8',
  },
  {
    id: 2,
    title: 'Med Spa Booking Funnel',
    description: 'Service selector → time slots → deposit capture, wired to Google Calendar + Stripe.',
    tags: ['Website', 'Funnel', 'Automation'],
    stat: '48% booking conversion',
    variant: 'card-ui',
    accent: '#C9A8FF',
  },
  {
    id: 3,
    title: 'AI Follow-Up System for Realtors',
    description: 'LLM replies to new listings inquiries within 90s and routes hot leads to agents.',
    tags: ['AI Automation'],
    stat: 'Response time: 9.2 hrs → 47 s',
    variant: 'chat-ui',
    accent: '#7FE0B9',
  },
  {
    id: 4,
    title: 'Childcare Enrollment Website',
    description: 'Multi-step parent onboarding with document upload and state-licensing checks.',
    tags: ['Website', 'App'],
    stat: '4× enrollment volume',
    variant: 'stripes-b',
    accent: '#E5C580',
  },
  {
    id: 5,
    title: 'Home Services Automation Flow',
    description: 'Zapier-free backend orchestrating quotes, tech dispatch, and review requests.',
    tags: ['AI Automation', 'App'],
    stat: '14 hrs/wk saved',
    variant: 'flow-ui',
    accent: '#9FC6FF',
  },
  {
    id: 6,
    title: 'Custom Client Dashboard',
    description: 'Real-time ops dashboard with AI-summarized weekly performance digests.',
    tags: ['App', 'AI Automation', 'Branding'],
    stat: '30 agents onboarded',
    variant: 'dashboard',
    accent: '#E1E0CC',
  },
];

const ALL_TAGS = ['All', 'Website', 'App', 'AI Automation', 'Funnel', 'Branding'];

function VideoThumb({ src, accent }) {
  const videoRef = React.useRef(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="absolute inset-0 bg-[#0d0d0d]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src={src}
        muted
        playsInline
        loop
        preload="metadata"
      />
      {/* Bottom gradient so tags stay readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
      {/* Play hint — fades out on hover via group-hover */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 group-hover:opacity-0">
        <div
          className="w-12 h-12 rounded-full bg-black/55 backdrop-blur-sm border border-white/15 flex items-center justify-center"
          style={{ color: accent }}
        >
          <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor">
            <path d="M1 1.5l12 6.5-12 6.5V1.5z" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-5 left-5 text-[10px] uppercase tracking-[0.3em] text-primary/50 transition-opacity duration-300 group-hover:opacity-0 pointer-events-none">
        Hover to preview
      </div>
    </div>
  );
}

function Thumb({ project }) {
  const { variant, accent, videoSrc } = project;

  if (variant === 'video') {
    return <VideoThumb src={videoSrc} accent={accent} />;
  }

  if (variant === 'stripes-a') {
    return (
      <div className="absolute inset-0 stripe-fill">
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/60" />
        <div className="absolute left-5 top-5 right-5 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-400/70" />
          <div className="w-2 h-2 rounded-full bg-yellow-400/70" />
          <div className="w-2 h-2 rounded-full bg-green-400/70" />
          <div className="ml-3 h-5 flex-1 bg-white/5 rounded" />
        </div>
        <div className="absolute left-5 right-5 bottom-5">
          <div className="text-[10px] uppercase tracking-[0.3em] text-primary/50">Preview — Landing</div>
          <div className="mt-2 h-2 w-1/2 rounded-full" style={{ background: accent, opacity: 0.8 }} />
          <div className="mt-2 h-2 w-1/3 rounded-full bg-white/15" />
        </div>
      </div>
    );
  }
  if (variant === 'card-ui') {
    return (
      <div className="absolute inset-0 bg-[#131313]">
        <div className="absolute inset-0 dot-grid opacity-50" />
        <div className="absolute left-1/2 -translate-x-1/2 top-6 w-[70%] rounded-xl bg-[#1a1a1a] border border-white/5 p-3">
          <div className="text-[9px] uppercase tracking-[0.2em] text-primary/50">Book a session</div>
          <div className="mt-2 grid grid-cols-3 gap-1.5">
            {['9:00','9:30','10:00','10:30','11:00','11:30'].map((t,i) => (
              <div key={i} className={`text-[10px] text-center py-1 rounded ${i===2?'text-black':'text-primary/70 bg-white/5'}`} style={i===2?{background: accent}:{}}>{t}</div>
            ))}
          </div>
        </div>
        <div className="absolute left-5 right-5 bottom-5 text-[10px] uppercase tracking-[0.3em] text-primary/50">Preview — Booking</div>
      </div>
    );
  }
  if (variant === 'chat-ui') {
    return (
      <div className="absolute inset-0 bg-[#0e0e0e]">
        <div className="absolute inset-0 stripe-fill-3 opacity-50" />
        <div className="absolute left-5 right-5 top-5 bottom-14 flex flex-col justify-end gap-2">
          <div className="self-start max-w-[70%] bg-white/8 rounded-2xl rounded-bl-md px-3 py-2 text-[11px] text-primary/80">Hi, I'd like info on the 2bd listing on Cedar.</div>
          <div className="self-end max-w-[70%] rounded-2xl rounded-br-md px-3 py-2 text-[11px] text-black" style={{ background: accent }}>On it — pulling the sheet. What's your best number?</div>
          <div className="self-start max-w-[40%] bg-white/8 rounded-2xl rounded-bl-md px-3 py-2 text-[11px] text-primary/80">…</div>
        </div>
        <div className="absolute left-5 right-5 bottom-5 text-[10px] uppercase tracking-[0.3em] text-primary/50">Preview — AI agent</div>
      </div>
    );
  }
  if (variant === 'stripes-b') {
    return (
      <div className="absolute inset-0 stripe-fill-2">
        <div className="absolute inset-0 bg-gradient-to-tl from-black/30 via-transparent to-black/40" />
        <div className="absolute left-5 right-5 top-5 space-y-2">
          <div className="h-2 w-1/3 rounded-full bg-white/15" />
          <div className="h-2 w-2/3 rounded-full" style={{ background: accent, opacity: 0.7 }} />
        </div>
        <div className="absolute left-5 right-5 bottom-5 grid grid-cols-3 gap-2">
          <div className="aspect-square rounded-md bg-white/8 border border-white/5" />
          <div className="aspect-square rounded-md bg-white/8 border border-white/5" />
          <div className="aspect-square rounded-md bg-white/5 border border-white/5 flex items-center justify-center text-primary/40 text-[10px]">+3</div>
        </div>
      </div>
    );
  }
  if (variant === 'flow-ui') {
    return (
      <div className="absolute inset-0 bg-[#0e0e0e]">
        <div className="absolute inset-0 dot-grid opacity-40" />
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 240" preserveAspectRatio="none">
          <path d="M40 60 C 120 60, 120 180, 200 180 S 360 60, 360 60" fill="none" stroke={accent} strokeOpacity="0.6" strokeWidth="1.5" strokeDasharray="4 4"/>
        </svg>
        {[
          { x: '8%', y: '22%', l: 'Inquiry' },
          { x: '45%', y: '68%', l: 'AI Qualify' },
          { x: '82%', y: '22%', l: 'Dispatch' },
        ].map((n, i) => (
          <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2 bg-[#1a1a1a] border border-white/10 rounded-lg px-2.5 py-1 text-[10px] text-primary/85" style={{ left: n.x, top: n.y }}>{n.l}</div>
        ))}
        <div className="absolute left-5 right-5 bottom-5 text-[10px] uppercase tracking-[0.3em] text-primary/50">Preview — Flow</div>
      </div>
    );
  }
  // dashboard
  return (
    <div className="absolute inset-0 bg-[#0f0f0f]">
      <div className="absolute left-4 right-4 top-4 flex items-center justify-between text-[10px] text-primary/60">
        <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full" style={{background: accent}} /> Live</div>
        <div>This week</div>
      </div>
      <div className="absolute left-4 right-4 top-12 grid grid-cols-3 gap-2">
        {[
          { k: 'Leads', v: '184' },
          { k: 'Booked', v: '42' },
          { k: 'MRR', v: '$19k' },
        ].map((s, i) => (
          <div key={i} className="rounded-lg bg-white/5 border border-white/5 p-2">
            <div className="text-[9px] uppercase tracking-[0.18em] text-primary/50">{s.k}</div>
            <div className="text-sm mt-0.5">{s.v}</div>
          </div>
        ))}
      </div>
      <svg className="absolute left-4 right-4 bottom-4 h-16 w-[calc(100%-2rem)]" viewBox="0 0 300 60" preserveAspectRatio="none">
        <polyline points="0,50 30,40 60,44 90,28 120,34 150,18 180,22 210,12 240,18 270,6 300,10" fill="none" stroke={accent} strokeWidth="1.5" />
      </svg>
    </div>
  );
}

function ProjectCard({ project, i }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: (i % 3) * 0.08, duration: 0.6, ease: [0.22, 0.8, 0.2, 1] }}
      className="group relative bg-surface rounded-2xl md:rounded-3xl overflow-hidden border border-white/5 hover:border-white/15 transition-colors"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.03]">
          <Thumb project={project} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-4 right-4">
          <div className="w-9 h-9 rounded-full bg-black/70 backdrop-blur border border-white/10 flex items-center justify-center text-primary transition-transform group-hover:rotate-[45deg]">
            <ArrowUpRight size={16} />
          </div>
        </div>
        <div className="absolute left-4 bottom-4 right-4 flex flex-wrap gap-1.5">
          {project.tags.map(t => (
            <span key={t} className="text-[10px] uppercase tracking-[0.18em] bg-black/70 backdrop-blur border border-white/10 text-primary/85 px-2 py-0.5 rounded-full">{t}</span>
          ))}
        </div>
      </div>
      <div className="p-5 md:p-6">
        <div className="text-[10px] uppercase tracking-[0.22em] text-primary/50 mb-2">{project.stat}</div>
        <h3 className="text-lg md:text-xl font-medium text-ink leading-snug">{project.title}</h3>
        <p className="mt-2 text-sm text-primary/65 leading-relaxed">{project.description}</p>
        <button className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-primary/70 hover:text-ink transition-colors">
          View project <ArrowRight size={12} />
        </button>
      </div>
    </motion.article>
  );
}

function Work() {
  const [filter, setFilter] = React.useState('All');
  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.tags.includes(filter));
  return (
    <section id="work" data-screen-label="03 Work" className="relative bg-black py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between mb-10 md:mb-14">
          <div className="flex items-center gap-3 text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary/55">
            <span className="inline-block w-6 h-px bg-primary/30" />
            <span>03 · Work We Did Before</span>
          </div>
          <div className="hidden sm:block text-xs text-primary/40">{filtered.length} of {PROJECTS.length} projects</div>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-10">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[0.95] text-ink">
            <WordsPullUpMultiStyle
              segments={[
                { text: 'Our', className: '' },
                { text: 'Work.', className: 'font-serif italic text-primary/85' },
              ]}
            />
          </h2>
          <FadeUp delay={0.2}>
            <p className="max-w-md text-primary/60 text-sm md:text-base leading-relaxed">
              A look at systems, websites, and builds we've created for operators across home services,
              health, real estate, and education.
            </p>
          </FadeUp>
        </div>

        {/* Filter pills */}
        <FadeUp delay={0.25}>
          <div className="mt-10 flex flex-wrap gap-2">
            {ALL_TAGS.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={[
                  'text-xs uppercase tracking-[0.18em] px-3.5 py-2 rounded-full border transition-colors',
                  filter === t
                    ? 'bg-primary text-black border-primary'
                    : 'bg-transparent text-primary/70 border-white/10 hover:border-white/30 hover:text-ink',
                ].join(' ')}
              >
                {t}
              </button>
            ))}
          </div>
        </FadeUp>

        <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProjectCard key={p.id} project={p} i={i} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Work });
