import propsUrl from "./tilesets/neo_zero_props_03_03_purple_yellow.png";

export function loadProps(k) {
  k.loadSprite("props", propsUrl, { sliceX: 20, sliceY: 15 });
}

// Matches Tiled objects (not tiles) with class "prop" — props live on their own
// object layer so they can pull sprites from a different tileset than the floor.
export function propObjectRules(k, tilesetSpriteKey) {
  return [
    {
      match: { type: "prop" },
      comps: ({ width, height, properties }) => [
        k.sprite(properties.sheet === "tileset" ? tilesetSpriteKey : "props", { frame: properties.frame ?? 0 }),
        k.area({ shape: new k.Rect(k.vec2(), width, height) }),
        k.body({ isStatic: true }),
        "prop",
      ],
    },
  ];
}
