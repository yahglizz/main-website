# AGENTS.md — ClientForge marketing site

Live at **clientforge.tech**. Static site, no bundler, no framework CLI. Read this
before touching anything; most of the rules below exist because breaking them
produces a **white screen**, not a build error.

---

## 1. What this is

A one-page marketing site for ClientForge (AI automations, apps and websites for
small operators). Stack, in full:

| Piece | What it is |
|-------|-----------|
| `index.html` | The whole shell. Loads fonts, Tailwind (CDN), React 18 UMD, framer-motion UMD, then every script in a fixed order. |
| `styles.css` | One plain stylesheet. Design tokens in `:root`, then hand-written component CSS. No preprocessor. |
| `app/*.jsx` | The React source. Compiled ahead of time — the browser never sees JSX. |
| `app/build/*.js` | **Generated.** This is what actually ships. Never hand-edit. |
| `app/world.js` + `app/scrub-engine.js` | Plain JS (not JSX, not compiled). The scroll-scrubbed hero "flight". Mounted outside React. |
| `assets/` | Video, pixel art, logo. |
| `more previews/` | Client walkthrough screen recordings used by the Work section. Folder name has a space — URL-encode it as `more%20previews/…`. |
| `vercel.json` | Tells Vercel there is no build: `outputDirectory: "."`, install/build are echo no-ops. |

There is **no dev server, no HMR, no test suite, no linter, no TypeScript**. Do not
add any of them without being asked.

---

## 2. The build step (the one thing you must not forget)

`app/build/` is what the browser loads. Editing a `.jsx` and stopping there ships
**stale code** — the page keeps rendering the old version and nothing warns you.

```bash
npm run build     # compile app/*.jsx -> app/build/*.js
npm run watch     # rebuild on save while working
npm run verify    # fails if app/build/ is out of sync with the sources
```

**After ANY `.jsx` edit: run `npm run build`, then `npm run verify`.** Commit the
regenerated `app/build/*.js` alongside the source. Both belong in the same commit.

`npm install` is only needed once (Babel CLI lives in devDependencies). Vercel
never installs or builds — it serves the repo root as-is.

### Preview locally

```bash
python3 -m http.server 8931
```

Then open `http://localhost:8931/`. Opening `index.html` via `file://` will not
work — the scripts are loaded by relative path and the videos need HTTP ranges.

---

## 3. Hard rules — a violation is a white screen

Everything in `app/build/` is concatenated into **one global scope** by the
browser. There are no modules, no imports, no bundler scoping.

1. **Unique hook aliases per file.** Every `.jsx` that uses hooks destructures
   them under its own suffix, at the top of the file:

   ```js
   const { useState: useStateW, useRef: useRefW, useEffect: useEffectW } = React;   // work.jsx
   const { useState: useStateCo, useEffect: useEffectCo, useRef: useRefCo } = React; // checkout.jsx
   ```

   Two files declaring `const { useState }` at top level = `SyntaxError:
   Identifier 'useState' has already been declared` = blank page. Pick a new
   suffix for a new file. Other files may use `React.useState(...)` inline
   instead — also fine.

2. **Unique top-level names, prefixed by file.** Same reason. `const CARD_W` in
   two files kills the page. Prefix or scope it.

3. **No computed JSX tags.** `<Icons[name] />` does not compile. Resolve first:

   ```js
   const Ico = Icons[name] || Icons.Bot;
   return <Ico />;
   ```

4. **Export through `window`.** Each component file ends with
   `Object.assign(window, { Work });`. A component is only reachable by another
   file if it is on `window` and its `<script>` tag comes **earlier** in
   `index.html`.

5. **Script order in `index.html` is a dependency graph.** Current order:
   `scrub-engine → world → icons → motionPrimitives → checkout → pricing → work
   → testimonials → contact → app`. `app.js` renders last because it consumes
   everything above. A new component file gets a `<script>` tag before `app.js`.

---

## 4. Design system

Tokens are declared twice on purpose — CSS custom properties in `styles.css`
`:root`, and the same values in the inline `tailwind.config` in `index.html`.
**Change one, change the other.**

| Token | Value | Use |
|-------|-------|-----|
| `--void` | `#1B2836` | Page background |
| `--surface` | `#223546` | Raised panels |
| `--card` | `#2C4157` | Cards |
| `--ink` | `#E1E0CC` | Body text |
| `--gold` | `#E3B65C` | The single accent — CTAs, stats, active states |

A muted steel-blue `rgba(127, 180, 201, …)` is used for secondary/label text in
the pixel UI. It is not a token yet; match the existing literals.

**Type:** `Almarai` for prose (Tailwind `font-sans`), `Pixelify Sans` for all
pixel UI (`font-pixel`, and `font-serif` is aliased to it so existing
`font-serif` usages inherit the theme).

**The look is 16-bit pixel art.** That means, consistently:

- Square corners. A blanket radius knock-down already exists in `styles.css`.
- Hard stepped shadows (`4px 4px 0 rgba(0,0,0,0.45)`), never blurred.
- Transitions in `steps()`, not eased curves: `transition: transform 120ms
  steps(3, end)`. Motion snaps between whole pixels; it does not glide.
- No gradients on UI chrome (backdrops and skies are the exception).
- `image-rendering: pixelated` on any upscaled art or canvas.

---

## 5. Animation rules (learned the hard way)

- **Entrance animations use CSS with `backwards` fill, not framer `whileInView`,
  for anything in a grid or a horizontal row.** With framer, tiles parked
  off-screen stay stranded at `opacity: 0`, and content that depends on an
  animation completing is content that can fail to appear. CSS `backwards` fill
  lands on the element's own visible styles no matter what. See `.pv-card` /
  `.reel` and the `reel-in` keyframes.
- **`WordsPullUpMultiStyle` is for prose headings only.** Do not use it on
  Pixelify Sans display type — the per-word transform strands letters mid-flight
  and the pixel face reads as broken glyphs. Plain text for pixel headings.
- Every animation needs a `@media (prefers-reduced-motion: reduce)` escape.
  The document also carries `scroll-snap-type: y proximity`, disabled under
  reduced motion.

---

## 6. Section map

Sections are numbered in the UI (`01 …`, `03 · Our Work`) and mounted in
`app/app.jsx` in this order:

| File | Section | Notes |
|------|---------|-------|
| `world.js` | Hero | Scroll-scrubbed flight through four "districts". Owns its own DOM outside React — do not reconcile it with React. Config is the `WORLD_SECTIONS` array. |
| `pricing.jsx` | Pricing | The value ladder. Opens `CheckoutModal`. |
| `work.jsx` | **Our Work → "Select a Preview"** | See below. |
| `testimonials.jsx` | What clients say | |
| `contact.jsx` | Contact | Web3Forms submit. |
| `checkout.jsx` | Modal | Shared by pricing, work and hero cards. `mode="showcase"` renders the no-price variant. |

### `work.jsx` in detail

Laid out like an arcade cabinet select screen: pixel marquee, cartridge tabs
(Websites / Automations), a spec strip, then a **2×2 grid of 16:9 preview
cards** — frame with a centered PLAY plate, footer bar with the result stat in
gold on the left and the build category in steel-blue on the right.

- Data lives in `PREVIEW_TRACKS`. To add a preview, add a slot:
  `{ id, title, stat, icon, src }`. A slot whose video 404s degrades to a
  "coming soon" frame rather than a broken player — half-filled tracks still
  look deliberate.
- Videos are **landscape 16:9** here. The old layout was 9:16 phone tiles and
  center-cropped every desktop walkthrough; don't go back to that without
  re-shooting the footage vertically.
- `{ game: true }` on a slot renders **Forge Quest** instead of a video.

### Forge Quest

A one-button canvas runner in the fourth slot, themed on the actual business:
you are the ClientForge smith carrying a build to launch — jump the bugs,
collect the leads, and the client's site assembles in the background (header →
hero → cards → footer). Complete it and the site ships, the level goes up, the
run speeds up.

- **Everything is `fillRect` on a 320×180 canvas**, upscaled with
  `image-rendering: pixelated`. No sprite sheets, no game library, no
  third-party art — this repo is public and ships no borrowed assets. Keep it
  that way.
- Tunables live in the `FQ` constant (dimensions, gravity, jump impulse, speed
  ramp, colors). Prefer changing those over editing the draw calls.
- All mutable per-frame state lives in one ref (`g.current`) so the rAF loop
  never triggers a re-render. Do not lift game state into React state.
- Input: pointer-down and Space/ArrowUp. `start()` focuses the container
  because the PLAY button unmounts on start and focus would go with it.

---

## 7. Forms and secrets

Contact, package reservation and showcase-call requests all POST to
**Web3Forms** (`https://api.web3forms.com/submit`) with a public access key
hardcoded client-side in `app/contact.jsx` and `app/checkout.jsx`. That key is
public by design — it only permits submissions to one destination inbox, which
is configured in the Web3Forms dashboard, not in this repo.

**There is no backend and no server-side secret in this repository.** Do not add
an API key, token, or `.env` value to any file here — everything in this repo is
served publicly and the repo itself is public. A Stripe/Resend serverless
function is planned but not built; if you are asked for one, it needs Vercel
environment variables and a `api/` function, never client-side keys.

---

## 8. Deploying

Vercel deploys from `origin/main` (`github.com/yahglizz/main-website`). Since
`app/build/` is committed and there is no build step, **a push is a deploy** —
whatever is in the repo is what goes live within about a minute.

Therefore:

- Run `npm run build && npm run verify` before committing. A commit whose
  `app/build/` is stale ships a site that silently ignores your change.
- Check the page actually renders before pushing. A scoping violation (§3)
  throws at parse time and blanks the entire page — including sections you
  didn't touch.
- **Do not push or deploy without the owner asking.** This is a live commercial
  site. Commit locally, report what changed, let the owner ship it.

---

## 9. Working style here

- Additive edits. This site is live and converting; don't refactor sections you
  weren't asked to touch.
- Match the surrounding code. Comments here explain **why** a non-obvious choice
  was made (why CSS instead of framer, why a ref instead of state) — keep that
  habit; skip comments that restate the code.
- No new dependencies. No build tooling. If something can be done with the
  stdlib, plain CSS, or a native browser feature, do that instead.
- Verify visually, not just by compiling. `npm run build` succeeding proves
  nothing about whether the section renders.
