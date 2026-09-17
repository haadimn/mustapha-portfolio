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

## Subagents

Prefer delegating to subagents (the Agent tool) over doing multi-step or exploratory work inline — use `fork` for research/investigation that doesn't need to stay in main context, and parallel Agent calls for independent tasks.
