import kaplay from "kaplay";
import { room1 } from "./scenes/room1.js";

const k = kaplay();

room1(k);
k.go("room1");
