# Text Box System — Implementation Plan

## Decision recap
- Trigger: **proximity** (`area()` + `onCollide`/`onCollideEnd`), same idiom as `walls.js`.
- Rendering: **HTML/DOM overlay**, not `k.text()` — chosen for future flexibility and a real custom-fonting path (CSS `@font-face`, rich markup) that canvas text can't give us cheaply.
- Content source: `src/content-loader.js`'s existing `projects` array (slug + raw markdown).
- Fonting/typography itself is **out of scope for this pass** — this plan only needs to leave clean seams for it (see "Extension points" below). Do not pick or load a font in this pass.

## Repo conventions to follow
- New per-concern files live in their existing folder (`src/floors/`, `src/objects/`, `src/ui/` is new).
- Tag-driven rules mirror `walls.js`'s `wallTileRules()` pattern — write `markers.js` the same way.
- Keep `ponytail:` / `upgrade path:` comments for anything deliberately simple now (matches `walls.js`, `main.js` style).

---

## Phase 1 — DOM overlay scaffold
**Files:** `src/ui/textbox.js` (new), `src/ui/textbox.css` (new), `index.html`

1. In `index.html`, add a container div as a sibling of the canvas mount point, e.g. `<div id="textbox-root"></div>` inside `<body>`.
2. `textbox.css`: absolutely-positioned box, hidden by default (`display: none` or `opacity: 0` + `pointer-events: none`), padding, background, border — plain styling for now.
   - Define the box's typography as **CSS custom properties** on the root element (e.g. `--textbox-font-family`, `--textbox-font-size`, `--textbox-line-height`), set to sane browser defaults. This is the seam for future custom fonts — swapping later is a one-line variable change, not a rewrite.
3. `textbox.js`: exports `createTextBox()` returning `{ show(html), hide() }`.
   - `show` sets `innerHTML` (or `textContent` for v1, see Phase 4) and toggles visibility.
   - `hide` toggles visibility off.
   - No KAPLAY imports here — this module knows nothing about the game, only the DOM. Keeps it swappable/testable independent of KAPLAY.

**Positioning caveat (important):** `main.js` uses `stretch: true, letterbox: true`, so the canvas isn't 1:1 with the window. Position the overlay against the **canvas's own bounding rect**, not `100vw/100vh`:
   - On `show()`/on an app-level resize handler, read `canvas.getBoundingClientRect()` and size/position the div (or a wrapping container) to match.
   - Simplest robust option: wrap canvas + overlay in one positioned container div and make the overlay `position: absolute; inset: 0` inside it, letting CSS handle alignment instead of recomputing rects on every resize.

---

## Phase 2 — Project markers
**Files:** `src/floors/markers.js` (new), `src/floors/maps/about.json`, `art/basic floor.tmx`

1. `markers.js`, parallel to `wallTileRules()`:
   ```js
   export function markerTileRules(k, onEnter, onLeave) {
     return [{
       match: { properties: { marker: true } }, // or however Tiled objects tag it
       comps: (obj) => [k.area(), "project-marker", { slug: obj.properties.slug }],
     }];
   }
   ```
   Confirm against `kaplay-plugin-tiled`'s actual object/property API before finalizing — check how it exposes custom properties on matched tiles/objects (may differ from the shape above).
2. In Tiled, add an object layer (or tagged tiles, consistent with how `solid` is done for walls) with a `slug` custom property per marker, matching a slug in `content-loader.js`'s `projects` array.
3. Since `content/projects/*.md` doesn't appear to have any files yet, create at least one sample (`content/projects/example.md`) so there's something to display end-to-end.
4. Regenerate/update `about.json` from the `.tmx` (or hand-edit both — check whether this project's workflow re-exports `about.json` from Tiled or edits it directly; `walls.js`'s existing `solid` property suggests the latter has been done by hand before).

---

## Phase 3 — Wire it together
**Files:** `src/floors/floorScene.js`, `src/objects/player.js`

1. In `floorScene.js`, create the text box once per scene load (or hoist to `main.js` if you want it to persist across floor changes — `stay()` isn't relevant here since it's DOM, not a KAPLAY object, so a single module-level instance is fine either way).
2. Pass `showTextBox`/`hideTextBox` callbacks into wherever the player is created, or set up the collision handlers directly in `floorScene.js` after `createPlayer(k)`:
   ```js
   player.onCollide("project-marker", (marker) => {
     const project = projects.find(p => p.slug === marker.slug);
     if (project) textbox.show(renderProject(project));
   });
   player.onCollideEnd("project-marker", () => textbox.hide());
   ```
3. Handle overlap edge case: if two markers can be touched at once, decide now whether last-collided wins or first-collided wins (simplest: track a small `Set` of currently-touched slugs, always render the most recent).

---

## Phase 4 — Content pipeline (markdown → box content)
**Files:** `src/content-loader.js` (extend), possibly `src/ui/markdown.js` (new)

1. Add a `getProjectBySlug(slug)` helper to `content-loader.js` alongside the existing `projects` export.
2. For v1, keep formatting minimal: strip markdown syntax to plain paragraphs, or do a light manual conversion (`# heading` → `<h3>`, blank-line-separated blocks → `<p>`). Do **not** pull in a full markdown library yet unless you want to — this is exactly the kind of thing the DOM approach makes easy to upgrade later without touching Phases 1–3.
3. Keep this conversion in its own function so it's a clean swap point later (e.g. for a real markdown parser or custom rich-text styling).

---

## Phase 5 — Manual verification checklist
- [ ] `npm run dev`, walk player into a marker → box appears with the right project's content.
- [ ] Walk away → box disappears.
- [ ] Resize the browser window → box stays aligned with the (letterboxed) canvas, doesn't drift.
- [ ] Touch two markers in sequence without fully leaving the first → no stuck/duplicate box.
- [ ] `npm run build` still succeeds (CI runs this).

---

## Explicitly deferred (do not build now, but don't block on)
- Actual custom font loading (`@font-face` + variable swap in `textbox.css`).
- Typewriter/reveal animation.
- Rich markdown rendering (bold/links/images) beyond plain paragraphs.
- Branching/interactive dialogue (choices).

Each of these should be addable later by touching only `textbox.css`/`textbox.js` (fonting, animation) or the Phase 4 content pipeline (markdown richness) — if implementing this plan requires touching `floorScene.js`, `walls.js`-style marker logic, or `player.js` again to add any of the above, that's a signal the seam wasn't cut cleanly and is worth revisiting.
