// Matches Tiled objects (not tiles) with class "prop" — props live on their own
// object layer but draw from the tileset sprite like any other tile.
export function propObjectRules(k, tilesetSpriteKey) {
  return [
    {
      match: { type: "prop" },
      comps: ({ name, width, height, properties }) => [
        k.sprite(tilesetSpriteKey, { frame: properties.frame ?? 0 }),
        k.area({ shape: new k.Rect(k.vec2(), width, height) }),
        k.body({ isStatic: true }),
        "prop",
        { propName: name },
      ],
    },
  ];
}
