const SPEED = 200;

export function createPlayer(k) {
  const player = k.add([
    k.rect(24, 24),
    k.pos(160, 120),
    k.color(255, 255, 255),
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
