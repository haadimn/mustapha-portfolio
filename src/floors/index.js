import aboutMap from "./maps/about.json";
import aboutTileset from "./tilesets/neo_zero_exterior_03_purple_yellow.png";

export const floors = {
  // spawn: not consumed yet — wired up in the spawn-point step.
  about: { id: "about", mapData: aboutMap, tilesetUrl: aboutTileset, spawn: "default" },
};
