import kaplay from "kaplay";
import { tiledPlugin } from "kaplay-plugin-tiled";
import { registerFloorScene } from "./floors/floorScene.js";
import { floors } from "./floors/index.js";
import { createTouchControls } from "./ui/touchControls.js";

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    window.location.reload();
  });
}

// ponytail: fixed to the "about" floor's pixel size, letterboxed to fill the window.
// upgrade path: derive per-scene from the active floor's mapData if floors vary in size.
const { width, height, tilewidth, tileheight } = floors.about.mapData;

const k = kaplay({
  plugins: [tiledPlugin],
  width: width * tilewidth,
  height: height * tileheight,
  stretch: true,
  letterbox: true,
  buttons: {
    left: { keyboard: ["left", "a"] },
    right: { keyboard: ["right", "d"] },
    up: { keyboard: ["up", "w"] },
    down: { keyboard: ["down", "s"] },
    interact: { keyboard: ["space"] },
  },
});

createTouchControls(k);
registerFloorScene(k);
k.go("floor", floors.about);
