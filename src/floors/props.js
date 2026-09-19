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

// Same idiom as propObjectRules but with no sprite — an invisible collider
// for blocking off small areas without touching the underlying tileset art.
// A barrier with a `text` property also doubles as a textbox trigger, same
// as project markers but showing its own text instead of project content.
export function barrierObjectRules(k) {
  return [
    {
      match: { type: "barrier" },
      comps: ({ width, height, properties }) => [
        k.area({ shape: new k.Rect(k.vec2(), width, height) }),
        k.body({ isStatic: true }),
        "barrier",
        ...(properties.text ? ["barrier-text", { text: properties.text }] : []),
      ],
    },
  ];
}
