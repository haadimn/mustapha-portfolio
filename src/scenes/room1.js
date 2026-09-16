import { createPlayer } from "../objects/player.js";

export function room1(k) {
  k.scene("room1", () => {
    k.setBackground(20, 20, 20);
    createPlayer(k);
  });
}
