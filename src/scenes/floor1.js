import { createPlayer } from "../objects/player.js";

export function floor1(k) {
  k.scene("floor1", () => {
    k.setBackground(20, 20, 20);
    createPlayer(k);
  });
}
