import { createPlayer, loadPlayerSprite } from "../objects/player.js";
import { addFloorBounds, wallTileRules } from "./walls.js";
import { propObjectRules, barrierObjectRules } from "./props.js";
import { markerObjectRules, findSpawnPos } from "./markers.js";
import { floors } from "./index.js";
import { createTextBox } from "../ui/textbox.js";
import { createGifOverlay } from "../ui/gifOverlay.js";
import { renderMarkdown } from "../ui/markdown.js";
import { projects } from "../content-loader.js";
import { propConfig as aboutPropConfig } from "./config/about.js";

const floorPropConfigs = {
  about: aboutPropConfig,
};

function renderProject(project) {
  return renderMarkdown(project.raw);
}

function tilesetKey(floorId) {
  return floorId + "-tileset";
}

// Same image as tilesetKey, sliced into frames. Needed as a separate sprite:
// the map plugin draws tile layers with drawSprite({quad}) normalized to the
// whole image, and KAPLAY multiplies that quad by frames[0] — so the sprite
// addTiledMap uses must stay unsliced or every tile samples cell 0.
function tilesetFrameKey(floorId) {
  return floorId + "-tileset-frames";
}

export function registerFloorScene(k) {
  // Loaded once at registration, not per scene entry — k.scene() callbacks
  // re-run on every k.go(), so loading here would re-decode the same art
  // each time a floor is re-entered. Keyed per floor id so distinct floors'
  // tilesets don't collide under one shared sprite name.
  for (const floor of Object.values(floors)) {
    // Tiled re-embeds every tileset open in its panel on each save, but
    // addTiledMap accepts exactly one. Keep the first (firstgid 1) — the only
    // one tile layers draw from; props resolve frames through props.js instead.
    // ponytail: throws "Tile gid outside the supported tileset range" if a tile
    // layer ever stamps from a second sheet. Merge the sheets if that happens.
    floor.mapData.tilesets.length = 1;
    const ts = floor.mapData.tilesets[0];
    k.loadSprite(tilesetKey(floor.id), floor.tilesetUrl);
    k.loadSprite(tilesetFrameKey(floor.id), floor.tilesetUrl, {
      sliceX: ts.columns,
      sliceY: ts.tilecount / ts.columns,
    });
  }
  loadPlayerSprite(k);

  k.scene("floor", (def) => {
    k.setBackground(20, 20, 20);
    k.addTiledMap(def.mapData, {
      sprite: tilesetKey(def.id),
      tiles: wallTileRules(k),
      objects: [
        ...propObjectRules(k, tilesetFrameKey(def.id)),
        ...markerObjectRules(k),
        ...barrierObjectRules(k),
      ],
    });
    addFloorBounds(k, def.mapData);
    const spawn = findSpawnPos(def.mapData, def.spawn);
    const player = createPlayer(k, spawn ? k.vec2(spawn.x, spawn.y) : undefined);
    const textbox = createTextBox();
    const gifOverlay = createGifOverlay();

    const propConfig = floorPropConfigs[def.id] ?? {};

    // Intro gate: re-armed every scene load (page load/refresh), no
    // persistence needed. Blocks every marker but the phone until answered.
    let phoneAnswered = false;
    textbox.show("The phone is ringing...", "rpg");

    // ponytail: Set of touched slugs so leaving one overlapping marker
    // doesn't hide the box while another is still touched; last-entered wins.
    const touchedSlugs = new Set();
    player.onCollide("project-marker", (marker) => {
      if (!phoneAnswered && marker.slug !== "phone") return;
      if (marker.slug === "phone") phoneAnswered = true;
      touchedSlugs.add(marker.slug);
      const project = projects.find((p) => p.slug === marker.slug);
      const config = propConfig[marker.slug] ?? {};
      if (project) textbox.show(renderProject(project), config.size ?? "large");
      if (config.gif) gifOverlay.show(config.gif);
    });
    player.onCollideEnd("project-marker", (marker) => {
      if (!phoneAnswered && marker.slug !== "phone") return;
      touchedSlugs.delete(marker.slug);
      if (touchedSlugs.size === 0) {
        textbox.hide();
        gifOverlay.hide();
      }
    });

    player.onCollide("barrier-text", (barrier) => textbox.show(barrier.text, "rpg"));
    player.onCollideEnd("barrier-text", () => textbox.hide());
  });
}
