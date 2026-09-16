import kaplay from "kaplay";
import { tiledPlugin } from "kaplay-plugin-tiled";
import { room1 } from "./scenes/room1.js";

const k = kaplay({ plugins: [tiledPlugin] });

room1(k);
k.go("room1");
