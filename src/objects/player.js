import orangeCattoUrl from "./orange-catto-idle.png";

const SPEED = 150;

export function loadPlayerSprite(k) {
  k.loadSprite("orangeCatto", orangeCattoUrl);
}

export function createPlayer(k, pos = k.vec2(160, 120)) {
  const player = k.add([
    k.sprite("orangeCatto"),
    k.pos(pos),
    // addTiledMap gives each Tiled layer z(layerIndex), so the player needs a z
    // above the layer count or the floor and props draw over it.
    k.z(100),
    k.area(),
    k.body(),
    "player",
  ]);

  player.locked = false;

  k.onButtonDown("left", () => { if (!player.locked) player.move(-SPEED, 0); });
  k.onButtonDown("right", () => { if (!player.locked) player.move(SPEED, 0); });
  k.onButtonDown("up", () => { if (!player.locked) player.move(0, -SPEED); });
  k.onButtonDown("down", () => { if (!player.locked) player.move(0, SPEED); });

  return player;
}
