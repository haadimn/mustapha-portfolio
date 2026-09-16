import kaplay from "kaplay";
import { tiledPlugin } from "kaplay-plugin-tiled";
import { floor1 } from "./scenes/floor1.js";

const k = kaplay({ plugins: [tiledPlugin] });

floor1(k);
k.go("floor1");
