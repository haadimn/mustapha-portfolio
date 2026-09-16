import kaplay from "kaplay";
import { tiledPlugin } from "kaplay-plugin-tiled";
import { registerFloorScene } from "./floors/floorScene.js";
import { floors } from "./floors/index.js";

// ponytail: fixed to the "about" floor's pixel size, letterboxed to fill the window.
// upgrade path: derive per-scene from the active floor's mapData if floors vary in size.
const { width, height, tilewidth, tileheight } = floors.about.mapData;

const k = kaplay({
  plugins: [tiledPlugin],
  width: width * tilewidth,
  height: height * tileheight,
  stretch: true,
  letterbox: true,
});

registerFloorScene(k);
k.go("floor", floors.about);
