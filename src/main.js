import kaplay from "kaplay";
import { tiledPlugin } from "kaplay-plugin-tiled";
import { registerFloorScene } from "./floors/floorScene.js";
import { floors } from "./floors/index.js";
import { createTouchControls } from "./ui/touchControls.js";
import { promptPlayerName } from "./ui/nameEntry.js";
import "./ui/nameEntry.css";

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
  background: "#2b1b3d",
  buttons: {
    left: { keyboard: ["left", "a"] },
    right: { keyboard: ["right", "d"] },
    up: { keyboard: ["up", "w"] },
    down: { keyboard: ["down", "s"] },
    interact: { keyboard: ["enter"] },
    cancel: { keyboard: ["escape"] },
  },
});

createTouchControls(k);
registerFloorScene(k);
promptPlayerName().then(() => k.go("floor", floors.about));
