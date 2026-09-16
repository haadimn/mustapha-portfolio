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

  k.onKeyDown("left", () => player.move(-SPEED, 0));
  k.onKeyDown("right", () => player.move(SPEED, 0));
  k.onKeyDown("up", () => player.move(0, -SPEED));
  k.onKeyDown("down", () => player.move(0, SPEED));

  return player;
}
