import tilesetUrl from "./tilesets/neo_zero_exterior_03_purple_yellow.png";
import { createPlayer } from "../objects/player.js";
import { addFloorBounds, wallTileRules } from "./walls.js";
import { loadProps, propObjectRules } from "./props.js";

export function registerFloorScene(k) {
  k.scene("floor", (def) => {
    k.setBackground(20, 20, 20);
    k.loadSprite("tileset", tilesetUrl);
    loadProps(k);
    k.addTiledMap(def.mapData, {
      sprite: "tileset",
      tiles: wallTileRules(k),
      objects: propObjectRules(k),
    });
    addFloorBounds(k, def.mapData);
    const player = createPlayer(k);

    let nearbyProp = null;
    player.onCollideUpdate("prop", (prop) => (nearbyProp = prop));
    player.onCollideEnd("prop", () => (nearbyProp = null));
    // ponytail: logs only, no dialog/UI system yet. Add one when a prop needs to show content.
    k.onKeyPress("space", () => nearbyProp && console.log("interacted with prop"));
  });
}
