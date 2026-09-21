# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server (http://localhost:5173)
- `npm run build` — build production bundle to `dist/`
- `npm run preview` — preview production build locally

No `test` or `lint` scripts are configured.

## Architecture

Entry point `src/main.js` initializes KAPLAY, registers touch controls, and loads the first floor scene. Modular organization:

- `src/floors/` — scene definitions and floor registry; `floorScene.js` loads Tiled maps, tilesets, entities, and interactive markers
- `src/objects/` — reusable game entities (`player.js` handles sprite and movement)
- `src/ui/` — textbox system, markdown rendering, mobile touch controls
- `src/content-loader.js` — loads portfolio content from `content/projects/` (markdown files)

Maps are defined in Tiled and exported as JSON; the tileset image is `art/fused_tileset_master.png`, imported via `src/floors/index.js` and referenced by `src/floors/maps/about.json`. Production build outputs to `dist/`, deployed to GitHub Pages via CI/CD.

### Popups

Two interaction patterns trigger DOM overlay popups (rendered through the shared `TextboxManager` singleton in `src/ui/textbox-manager.js`, not KAPLAY canvas objects):

- **Project markers** — a Tiled `prop` object with a `slug` property becomes a `project-marker` collider (`src/floors/markers.js`). Colliding with the player opens either a plain textbox or, for multi-part projects, the keyboard-navigable list/topic menu (`src/ui/interactive-textbox.js`).
- **Dashboards** — a Tiled `prop` object with a `dashboard` property becomes a `dashboard-marker` collider, independent of project markers. Colliding opens a grid of image tiles (`src/ui/dashboard.js`), navigable with the movement keys (fixed column count, wraps at edges); selecting a tile currently has no action. Per-floor tile content (`image`, `label`, `cols`) lives in `dashboardConfig`, e.g. `src/floors/config/about.js`, keyed by the marker's `dashboard` slug — same registry pattern as `propConfig`.

Both popup types lock player movement while open (`player.locked`) and close only via the shared `cancel` button handler in `src/floors/floorScene.js`.

## Subagents

Prefer delegating to subagents (the Agent tool) over doing multi-step or exploratory work inline — use `fork` for research/investigation that doesn't need to stay in main context, and parallel Agent calls for independent tasks.
