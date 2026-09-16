import tilesetUrl from "./tilesets/neo_zero_exterior_03_purple_yellow.png";
import { createPlayer } from "../objects/player.js";
import { addFloorBounds, wallTileRules } from "./walls.js";

export function registerFloorScene(k) {
  k.scene("floor", (def) => {
    k.setBackground(20, 20, 20);
    k.loadSprite("tileset", tilesetUrl);
    k.addTiledMap(def.mapData, { sprite: "tileset", tiles: wallTileRules(k) });
    addFloorBounds(k, def.mapData);
    createPlayer(k);
  });
}
