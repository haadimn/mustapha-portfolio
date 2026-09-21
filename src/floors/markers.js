// Matches any Tiled "prop" object that carries a `slug` property and layers
// an invisible, proximity-triggerable marker on top of it — same idiom as
// wallTileRules() adding a collision-only entity alongside a rendered one.
// Keyed on `slug`, not on the object's name, so any prop can become a
// project marker just by setting that property in Tiled.
// Reads a named Tiled "spawn" object straight from the raw map JSON (not via
// addTiledMap's object rules) so the player's start position is known before
// the scene adds anything else.
export function findSpawnPos(mapData, name) {
  for (const layer of mapData.layers) {
    if (layer.type !== "objectgroup") continue;
    const obj = layer.objects.find((o) => o.type === "spawn" && o.name === name);
    if (obj) return { x: obj.x, y: obj.y };
  }
  return null;
}

export function markerObjectRules(k) {
  return [
    {
      match: { type: "prop" },
      comps: ({ width, height, properties }) =>
        properties.slug
          ? [
              k.area({ shape: new k.Rect(k.vec2(), width, height) }),
              "project-marker",
              { slug: properties.slug },
            ]
          : [],
    },
    {
      match: { type: "prop" },
      comps: ({ width, height, properties }) =>
        properties.dashboard
          ? [
              k.area({ shape: new k.Rect(k.vec2(), width, height) }),
              "dashboard-marker",
              { slug: properties.dashboard },
            ]
          : [],
    },
  ];
}
