# Floor architecture — known shortfalls

Notes from reviewing `src/floors/` and `src/main.js` for multi-floor scaling, before adding floor #2+.

## 1. Tileset hardcoded in the scene, not per-floor

`src/floors/floorScene.js:1,8` imports one tileset (`neo_zero_exterior_03_purple_yellow.png`) and always loads it as sprite `"tileset"`, regardless of which floor's `def` is passed to the scene.

- **Why it's a problem:** the moment a second floor uses different art, the scene either loads the wrong tileset or needs ad-hoc handling to swap sprites mid-scene.
- **Fix:** move `tilesetUrl` (and the sprite key) onto each floor's entry in `floors/index.js`, and have `floorScene.js` read it off `def` instead of a static import.
- **Status:** not yet hit — only one floor exists today.

## 2. Canvas sized to `floors.about` specifically

`src/main.js:6-8` derives the kaplay canvas width/height from `floors.about.mapData` at module-load time. Already flagged in-code with a `ponytail:` comment.

- **Why it's a problem:** canvas size is fixed at init, so floors with a different pixel size than `about` won't fit correctly.
- **Fix (per existing comment):** derive canvas size per-scene from the active floor's `mapData` if floor sizes vary.
- **Status:** correctness/architecture question, deliberately out of scope until it's decided whether floors will vary in size.

## What already generalizes fine (no action needed)

- `floors/index.js` — plain registry (`{ id, mapData }`); adding a floor is just adding a key.
- `floors/walls.js` — `addFloorBounds` and `wallTileRules` derive everything from the passed `mapData`, no per-floor assumptions baked in.
- `floorScene.js`'s single `k.scene("floor", def)` — reused per floor via `k.go("floor", floors.X)`.

## Not a gap (YAGNI, correctly deferred)

No floor-to-floor transition (doors/triggers) exists yet. Nothing to generalize here until there are ≥2 floors to move between.
