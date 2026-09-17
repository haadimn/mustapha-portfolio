// Matches any Tiled "prop" object that carries a `slug` property and layers
// an invisible, proximity-triggerable marker on top of it — same idiom as
// wallTileRules() adding a collision-only entity alongside a rendered one.
// Keyed on `slug`, not on the object's name, so any prop can become a
// project marker just by setting that property in Tiled.
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
  ];
}
