import aboutMap from "./maps/about.json";
import aboutTileset from "../../art/fused_tileset_master.png";

export const floors = {
  // spawn: not consumed yet — wired up in the spawn-point step.
  about: { id: "about", mapData: aboutMap, tilesetUrl: aboutTileset, spawn: "default" },
};
