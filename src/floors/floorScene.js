import { createPlayer, loadPlayerSprite } from "../objects/player.js";
import { addFloorBounds, wallTileRules } from "./walls.js";
import { loadProps, propObjectRules } from "./props.js";
import { markerObjectRules } from "./markers.js";
import { floors } from "./index.js";
import { createTextBox } from "../ui/textbox.js";
import { renderMarkdown } from "../ui/markdown.js";
import { projects } from "../content-loader.js";

function renderProject(project) {
  return renderMarkdown(project.raw);
}

function tilesetKey(floorId) {
  return floorId + "-tileset";
}

export function registerFloorScene(k) {
  // Loaded once at registration, not per scene entry — k.scene() callbacks
  // re-run on every k.go(), so loading here would re-decode the same art
  // each time a floor is re-entered. Keyed per floor id so distinct floors'
  // tilesets don't collide under one shared sprite name.
  for (const floor of Object.values(floors)) {
    k.loadSprite(tilesetKey(floor.id), floor.tilesetUrl);
  }
  loadProps(k);
  loadPlayerSprite(k);

  k.scene("floor", (def) => {
    k.setBackground(20, 20, 20);
    k.addTiledMap(def.mapData, {
      sprite: tilesetKey(def.id),
      tiles: wallTileRules(k),
      objects: [...propObjectRules(k), ...markerObjectRules(k)],
    });
    addFloorBounds(k, def.mapData);
    const player = createPlayer(k);
    const textbox = createTextBox();

    let nearbyProp = null;
    player.onCollideUpdate("prop", (prop) => (nearbyProp = prop));
    player.onCollideEnd("prop", () => (nearbyProp = null));
    // ponytail: logs only, no dialog/UI system yet. Add one when a prop needs to show content.
    k.onButtonPress("interact", () => nearbyProp && console.log("interacted with prop"));

    // ponytail: Set of touched slugs so leaving one overlapping marker
    // doesn't hide the box while another is still touched; last-entered wins.
    const touchedSlugs = new Set();
    player.onCollide("project-marker", (marker) => {
      touchedSlugs.add(marker.slug);
      const project = projects.find((p) => p.slug === marker.slug);
      if (project) textbox.show(renderProject(project));
    });
    player.onCollideEnd("project-marker", (marker) => {
      touchedSlugs.delete(marker.slug);
      if (touchedSlugs.size === 0) textbox.hide();
    });
  });
}
