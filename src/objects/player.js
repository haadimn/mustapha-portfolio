import orangeCattoUrl from "./orange-catto-idle.png";

const SPEED = 150;

export function loadPlayerSprite(k) {
  k.loadSprite("orangeCatto", orangeCattoUrl);
}

export function createPlayer(k) {
  const player = k.add([
    k.sprite("orangeCatto"),
    k.pos(160, 120),
    // addTiledMap gives each Tiled layer z(layerIndex), so the player needs a z
    // above the layer count or the floor and props draw over it.
    k.z(100),
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
