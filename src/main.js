import kaplay from "kaplay";

const k = kaplay();

k.setBackground(20, 20, 20);

const player = k.add([
  k.rect(24, 24),
  k.pos(160, 120),
  k.color(255, 255, 255),
  k.area(),
  k.body(),
  "player",
]);

const SPEED = 200;

k.onKeyDown("left", () => player.move(-SPEED, 0));
k.onKeyDown("right", () => player.move(SPEED, 0));
k.onKeyDown("up", () => player.move(0, -SPEED));
k.onKeyDown("down", () => player.move(0, SPEED));
