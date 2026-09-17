import orangeCattoUrl from "./orange-catto-idle.png";

const SPEED = 150;

export function loadPlayerSprite(k) {
  k.loadSprite("orangeCatto", orangeCattoUrl);
}

export function createPlayer(k) {
  const player = k.add([
    k.sprite("orangeCatto"),
    k.pos(160, 120),
    k.area(),
    k.body(),
    "player",
  ]);

  k.onButtonDown("left", () => player.move(-SPEED, 0));
  k.onButtonDown("right", () => player.move(SPEED, 0));
  k.onButtonDown("up", () => player.move(0, -SPEED));
  k.onButtonDown("down", () => player.move(0, SPEED));

  return player;
}
