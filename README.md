# mustapha-portfolio

An interactive portfolio site built as a game-like floor exploration experience. Navigate a sprite-based environment to discover projects and learn more.

## Tech Stack

- **[KAPLAY](https://kaplayjs.com/)** — lightweight game engine
- **[kaplay-plugin-tiled](https://github.com/kaplayjs/kaplay-plugin-tiled)** — Tiled map loader for floor scenes
- **[Vite](https://vitejs.dev/)** — fast build tooling and dev server

## Getting Started

```bash
npm install
npm run dev      # Start dev server on http://localhost:5173
npm run build    # Build for production to dist/
npm run preview  # Preview production build locally
```

## Project Structure

- `src/main.js` — app entry point; initializes KAPLAY and loads the first floor scene
- `src/floors/` — floor scenes (maps, tilesets, entities, interactive objects)
- `src/objects/` — reusable game entities (player sprite, movement logic)
- `src/ui/` — interface components (textbox, markdown renderer, touch controls)
- `content/projects/` — portfolio projects as markdown files
- `art/` — source art and Tiled map files (not shipped in production)
- `public/` — static assets served as-is

## Deployment

Automatically deploys to [GitHub Pages](https://haadimn.github.io/mustapha-portfolio/) on every push to `main` via GitHub Actions.
